import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
  isProduction: false, // Atur ke true untuk produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY,
});

const createTransaction = async (parameter) => {
  try {
    const transaction = await snap.createTransaction(parameter);
    return transaction;
  } catch (error) {
    throw new Error(`Gagal membuat transaksi Midtrans: ${error.message}`);
  }
};

export { createTransaction };