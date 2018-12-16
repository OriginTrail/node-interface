export default {
  async getTransactionReceipt(hash) {
    let receipt = null;
    while (receipt === null) {
      // eslint-disable-next-line
      receipt = await this.getTransactionReceiptPromise(hash);
      // eslint-disable-next-line
      await this.wait(1000);
    }
    return receipt;
  },

  wait(milliseconds) {
    const start = new Date().getTime();
    for (let i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds) {
        break;
      }
    }
  },

  getTransactionReceiptPromise(hash) {
    return new Promise((resolve, reject) => {
      window.eth.getTransactionReceipt(hash)
        .then((data) => {
          resolve(data);
        }).catch((e) => {
          reject(e);
        });
    });
  },
};
