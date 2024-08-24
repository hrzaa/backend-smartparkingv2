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
    throw new ResponseError(404, `Transactions not found`);
  }

  return transaction;
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
       updated_at: new Date(), 
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

const sumTransactions = async () => {
  try {
    // Menghitung total nilai totalprice dari transaksi dengan status "PAID"
    const {
      _sum: { totalprice: totalPrice },
    } = await prismaClient.transaction.aggregate({
      _sum: {
        totalprice: true, // Field yang akan dijumlahkan
      },
      where: {
        transactionstatus: "PAID", // Kondisi untuk memilih transaksi dengan status "PAID"
      },
    });

    // Mengembalikan nilai total totalprice atau 0 jika undefined/null
    return totalPrice || 0;
  } catch (error) {
    console.error("Error calculating sum of paid transactions:", error);
    throw new Error("Unable to calculate total price of paid transactions");
  }
};



export default {
  getTransaction,
  getTransactionById,
  updateTransactionStatus,
  sumTransactions,
};