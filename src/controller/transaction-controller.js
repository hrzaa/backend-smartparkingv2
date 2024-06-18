import transactionService from "../service/transaction-service.js";
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
  try {
    const result = await transactionService.getTransactionById(req.params.transactionId);
    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const updateTransactionStatus = async (req, res, next) => {
    const transactionId = req.params.transactionId;
    const {transactionstatus, payment_method} = req.body;
    try {
      const result = await transactionService.updateTransactionStatus(
        transactionId,
        transactionstatus, 
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
    let transactionStatus = data.transactionStatus;
    let fraudStatus = data.fraudStatus;

    if(transactionStatus == 'capture'){
        if(fraudStatus == 'accept'){
            const transaction = await transactionService.updateTransactionStatus({transactionId, status:PAID, payment_method:data.payment_type});
            responseData = transaction;
        }
    }else if(transactionStatus == 'settlement'){
        const transaction = await transactionService.updateTransactionStatus({transactionId, status:PAID, payment_method:data.payment_type});
        responseData = transaction;
    }else if(transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire'){
        const transaction = await transactionService.updateTransactionStatus({transactionId, status:CANCELED});
        responseData = transaction;
    }else if(transactionStatus == 'pending'){
        const transaction = await transactionService.updateTransactionStatus({transactionId, status:PENDING_PAYMENT});
        responseData = transaction;
    }

    return {
        status: 'success',
        data: responseData
    }
}

export const trxNotif = async(req, res, next) => {
    const data = req.body;

    transactionService.getTransactionById({transactionId:data.order_id}).then((transaction) => {
        if(transaction){
            updateStatusBasedOnMidtransResponse(transaction.id, data).then(result => {
                console.log('result', result)
            })
        }
    })
    res.status(200).json({
        status:'success', 
        message: 'OK'
    })
}


export default { getTransaction, getTransactionById, updateTransactionStatus, trxNotif };
