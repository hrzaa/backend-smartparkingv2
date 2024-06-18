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


const getTransactionById = async (transactionId) => {
  const transaction = await prismaClient.transaction.findUnique({
    where: {
      transactionId: transactionId,
    },
    select: {
        transactionId:true,
        parkingId:true,
        totalprice:true
    }
   
  });

  if (!transaction) {
    throw new ResponseError(404, `Transaction ID not found`);
  }

  return transaction;
};

const updateTransactionStatus = async (transactionId, transactionstatus, payment_method = null) => {
   const transaction = await prismaClient.transaction.update({
     where: {
       transactionId: transactionId,
     },
     data: {
       transactionstatus: transactionstatus,
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


export default { getTransaction, getTransactionById, updateTransactionStatus };