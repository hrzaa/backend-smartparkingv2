import transactionService from "../service/transaction-service.js";
import gatesService from "../service/gates-service.js";
import crypto from'crypto';
import{PAID, PENDING_PAYMENT, CANCELED} from "../utils/constant.js"

const getTransaction = async (req, res, next) => {
  try {
    const result = await transactionService.getTransaction();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getTransactionById = async (req, res, next) => {
  const { transactionId } = req.params;
  try {
    const result = await transactionService.getTransactionById({transactionId});
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateTransactionStatus = async (req, res, next) => {
    const { transactionId } = req.params;
    const {transaction_status, payment_method} = req.body;
    try {
      const result = await transactionService.updateTransactionStatus(
        transactionId,
        transaction_status,
        payment_method
      );
      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }

};

const updateStatusBasedOnMidtransResponse = async(transactionId, data) => {
    const hash = crypto
      .createHash("sha512")
      .update(
        `${transactionId}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`
      )
      .digest("hex");
    if(data.signature_key !== hash){
        return {
            status: 'error',
            message: 'Invalid Signature Key'
        }
    }

    let responseData = null;
    let transactionStatus = data.transaction_status;
    let fraudStatus = data.fraudStatus;

    if(transactionStatus == 'capture'){
        if(fraudStatus == 'accept'){
          const transaction = await transactionService.updateTransactionStatus({
            transactionId,
            transaction_status: PAID,
            payment_method: data.payment_type,
          });
          responseData = transaction;
          // Update gate status to true
          await gatesService.gateOut({ gateStatus: true });
        }
    }else if(transactionStatus == 'settlement'){
      const transaction = await transactionService.updateTransactionStatus({
        transactionId,
        transaction_status: PAID,
        payment_method: data.payment_type,
      });
      responseData = transaction;
      // Update gate status to true
      await gatesService.gateOut({ gateStatus: true });
    }else if(transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire'){
        const transaction = await transactionService.updateTransactionStatus({
          transactionId,
          transaction_status: CANCELED,
        });
        responseData = transaction;
    }else if(transactionStatus == 'pending'){
        const transaction = await transactionService.updateTransactionStatus({
          transactionId,
          transaction_status: PENDING_PAYMENT,
        });
        responseData = transaction;
    }

    return {
        status: 'success',
        data: responseData,
    }
}

export const trxNotif = async(req, res, next) => {
    const data = req.body;

    transactionService
      .getTransactionById({ transactionId: data.order_id })
      .then((result) => {
        if (result) {
          updateStatusBasedOnMidtransResponse(result.transactionId, data).then(
            (result) => {
              console.log("result", result);
            }
          );
        }
      });
    res.status(200).json({
        status:'success', 
        message: 'OK'
    })
}

const sumTransactions = async (req, res, next) => {
  try {
    const result = await transactionService.sumTransactions();
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};


export default {
  getTransaction,
  getTransactionById,
  updateTransactionStatus,
  trxNotif,
  sumTransactions,
};
