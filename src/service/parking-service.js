import { prismaClient } from "../application/database.js";
import { validate } from "../validation/validation.js";
import { ResponseError } from "../error/response-error.js";
import {
  createParkingValidation,
  updateParkingValidation,
  getParkingValidation,
} from "../validation/parking-validation.js";
import { createTransaction } from "./midtransService.js";
import { nanoid } from "nanoid";
import { PAID, PENDING_PAYMENT, CANCELED } from "../utils/constant.js";

const formatRequest = (data) => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.replace(/\s+/g, "").toUpperCase()]; // hilang spasi dan UPPERCASE
      }
      return [key, value];
    })
  );
};

const parkingIn = async (reqParking) => {
  // Sanitize and format the request data
  const sanitizedParking = formatRequest(reqParking);

  // Validate the sanitized request data
  const parking = validate(createParkingValidation, sanitizedParking);

  const existingParking = await prismaClient.parking.findFirst({
    where: {
      code: parking.code,
      status: "start",
    },
  });

  if (existingParking) {
    throw new ResponseError(
      404,
      `Parking with code ${parking.code} is already in progress.`
    );
  }

  const createParkingIn = await prismaClient.parking.create({
    data: {
      code: parking.code,
      parkingin: parking.parkingin,
      parkingout: parking.parkingout,
      totaltime: parking.totaltime,
      status: "start",
    },
    select: {
      parkingId: true,
      code: true,
      parkingin: true,
      parkingout: true,
      status: true,
      totaltime: true,
    },
  });

  return { createParkingIn };
};

const parkingOut = async (reqParking) => {
  // Sanitize and format the request data
  const sanitizedParking = formatRequest(reqParking);

  // Validate the sanitized request data
  const parking = validate(updateParkingValidation, sanitizedParking);

  // const parking = validate(createParkingValidation, reqParking);

  const dateUpdate = new Date();

  const countParking = await prismaClient.parking.findFirst({
    where: {
      code: parking.code,
      status: "start",
    },
  });

  if (!countParking) {
    throw new ResponseError(
      404,
      `Parking with code ${parking.code} not found.`
    );
  }

  const timeIn = new Date(countParking.parkingin);
  const totalTimeInHours = (dateUpdate - timeIn) / (1000 * 60 * 60);

  const rateRecord = await prismaClient.price.findFirst({
    select: {
      price: true,
    },
  });

  if (!rateRecord || !rateRecord.price) {
    throw new ResponseError(
      404,
      "Failed to fetch the rate per hour from the database."
    );
  }

  const ratePerHour = rateRecord.price;

  let totalPrice = 0;
  const newTransaksiId = `TRX-${nanoid(4)}-${nanoid(8)}`;

  if (totalTimeInHours === 0) {
    totalPrice = ratePerHour;
  } else if (totalTimeInHours > 0 && totalTimeInHours <= 12) {
    totalPrice = ratePerHour; // jika <= 12 jam harga 1 kali ratePerHour
  } else if (totalTimeInHours > 12 && totalTimeInHours <= 24) {
    totalPrice = ratePerHour * 2; // jika antara 12 dan 24 jam harga 2 kali ratePerHour
  } else {
    const extraDays = Math.ceil((totalTimeInHours - 24) / 24); // Hitung hari ekstra
    totalPrice = ratePerHour * (2 + extraDays); // untuk 24 jam pertama harga 2 kali ratePerHour, tambah 2 kali ratePerHour setiap 24 jam setelahnya
  }

  const updatedParking = await prismaClient.parking.update({
    where: {
      parkingId: countParking.parkingId,
    },
    data: {
      code: parking.code,
      parkingout: dateUpdate,
      totaltime: totalTimeInHours,
      status: "end",
    },
    select: {
      parkingId: true,
      code: true,
      parkingin: true,
      parkingout: true,
      status: true,
      totaltime: true,
    },
  });

  // Create payment transaction
  const transactionDetails = {
    enabled_payments: ["other_qris"],
    transaction_details: {
      order_id: newTransaksiId,
      gross_amount: totalPrice,
    },
    item_details: [
      {
        id: updatedParking.parkingId,
        price: totalPrice, // Use the calculated total price
        quantity: 1, // Set quantity to 1 if the totalPrice is for one item
        name: "Parking Fee",
      },
    ],
    callbacks: {
      // finish: `http://localhost:5000/api/callback-transaction`,
      finish: `${process.env.FRONTEND_URL}payment`,
    },
  };

  const transaction = await createTransaction(transactionDetails);
  const savedTransaction = await prismaClient.transaction.create({
    data: {
      transactionId: newTransaksiId,
      parkingId: updatedParking.parkingId,
      totalprice: totalPrice,
      transactionstatus: PENDING_PAYMENT,
      snap_token: transaction.token,
      snap_redirect_url: transaction.redirect_url,
      payment_method: "other_qris",
      // paymentResponse: transaction, // Save the response for auditing
    },
    select: {
      transactionId: true,
      parkingId: true,
      totalprice: true,
      transactionstatus: true,
      snap_token: true,
      snap_redirect_url: true,
      payment_method: true,
    },
  });

  return { updatedParking, savedTransaction, paymentResponse: transaction };
};

const getAllParking = async (request) => {
  const parkings = await prismaClient.parking.findMany({
    include: {
      transactions: true,
    },
    orderBy: {
      parkingin: "asc",
    },
  });

  if (!parkings) {
    throw new ResponseError(404, `Parking Code not found`);
  }

  return parkings;
};

const getAllParkingById = async (id) => {
  // const { id } = request.params;
  const parkings = await prismaClient.parking.findUnique({
    where: {
      parkingId: id,
    },
    include: {
      transactions: true,
    },
  });

  if (!parkings) {
    throw new ResponseError(404, `Parking Code not found`);
  }

  return parkings;
};

const removeParking = async (parkingId) => {
  const validatedId = validate(getParkingValidation, { parkingId });

  const totalInDatabase = await prismaClient.parking.count({
    where: {
      parkingId: validatedId.parkingId,
    },
  });

  if (totalInDatabase !== 1) {
    throw new ResponseError(404, `Parking Code not found`);
  }

  return prismaClient.parking.delete({
    where: {
      parkingId: validatedId.parkingId,
    },
  });
};

// const callback = async (orderId, orderStatus) => {
//   // Define status mapping based on the orderStatus
//   let transactionStatus;
//   switch (orderStatus) {
//     case "settlement":
//       transactionStatus = "PAID";
//       break;
//     case "pending":
//       transactionStatus = "PENDING_PAYMENT";
//       break;
//     case "expire":
//     case "cancel":
//     case "deny":
//       transactionStatus = "CANCELED";
//       break;
//     default:
//       throw new Error(`Invalid order status: ${orderStatus}`);
//   }

//   // Update transaction status in the database
//   const updatedTransaction = await prismaClient.transaction.update({
//     where: { parkingId: orderId },
//     data: { transactionstatus: transactionStatus },
//     select: {
//       transactionId: true,
//       parkingId: true,
//       totalprice: true,
//       transactionstatus: true,
//     },
//   });

//   // Return the updated order details
//   return {
//     orderId: updatedTransaction.parkingId,
//     orderStatus: updatedTransaction.transactionstatus,
//   };
// };

// const callback = async (orderId, orderStatus) => {
//   return { orderId, orderStatus };
// };

// const callback = async (request) => {
//   const serverKey = process.env.MIDTRANS_SERVER_KEY;

//   // Concatenate order_id, status_code, and gross_amount
//   const payload = `${request.order_id}${request.status_code}${request.gross_amount}${serverKey}`;

//   // Compute SHA512 hash
//   const hash = crypto.createHash("sha512").update(payload).digest("hex");

//   // Compare the computed hash with the signature key from Midtrans
//   if (hash === request.signature_key) {
//     let updateData = {};

//     if (
//       request.transaction_status === "capture" ||
//       request.transaction_status === "settlement"
//     ) {
//       updateData.transactionstatus = "PAID";
//     } else if (request.transaction_status === "pending") {
//       updateData.transactionstatus = "PENDING_PAYMENT";
//     } else if (
//       ["cancel", "expire", "deny"].includes(request.transaction_status)
//     ) {
//       updateData.transactionstatus = "CANCELED";
//     }

//     if (Object.keys(updateData).length > 0) {
//       await prismaClient.transaction.update({
//         where: {
//           parkingId: request.order_id,
//         },
//         data: updateData,
//       });
//     }
//   } else {
//     throw new Error("Invalid signature");
//   }
// };




// const getTransaction = async () => {
//   // const { id } = request.params;
//   const transaction = await prismaClient.transaction.findFirst({
//     where:{
//       transactionstatus: "PENDING_PAYMENT"
//     },
//     orderBy: {
//       created_at: "desc",
//     },
//   });

//   if (!transaction) {
//     throw new ResponseError(404, `Transactions Code not found`);
//   }

//   return transaction;
// };




export default {
  parkingIn,
  parkingOut,
  getAllParking,
  getAllParkingById,
  removeParking,
  // getTransaction,
  // callback,
};
