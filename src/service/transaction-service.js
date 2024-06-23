import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const getTransaction = async () => {
  const transaction = await prismaClient.transaction.findFirst({
    where:{
      transactionstatus: "PENDING_PAYMENT"
    },
    orderBy: {
      created_at: "desc",
    },
  });

  if (!transaction) {
    throw new ResponseError(404, `Transactions Code not found`);
  }

  return transaction;
};

const sumPaidTransactions = async () => {
  // Menghitung total nilai totalprice dari transaksi dengan status "PAID"
  const {
    _sum: { totalprice: totalPrice },
  } = await prismaClient.transaction.aggregate({
    _sum: {
      totalprice: true, // Field yang akan dijumlahkan
    },
    where: {
      transactionstatus: "PAID", // Kondisi untuk memilih transaksi
    },
  });

  // Mengembalikan nilai total totalprice
  return totalPrice ?? 0; // Jika totalPrice undefined, kembalikan 0
};



const getTransactionById = async ({transactionId}) => {
  const transaction = await prismaClient.transaction.findUnique({
    where: {
      transactionId: transactionId,
    },
    select: {
      transactionId: true,
      parkingId: true,
      transactionstatus: true,
      totalprice: true,
      payment_method: true,
    },
  });

  if (!transaction) {
    throw new ResponseError(404, `Transaction ID not found`);
  }

  return transaction;
};

const updateTransactionStatus = async ({transactionId, transaction_status, payment_method = null}) => {
   const transaction = await prismaClient.transaction.update({
     where: {
       transactionId: transactionId,
     },
     data: {
       transactionstatus: transaction_status,
       payment_method: payment_method,
       updated_at: new Date(), // Optional but good practice
     },
   });

    if (!transaction) {
      throw new ResponseError(
        404,
        `Transaction not found for transactionId: ${transactionId}`
      );
    }

    return transaction;
};


export default {
  getTransaction,
  sumPaidTransactions,
  getTransactionById,
  updateTransactionStatus,
};