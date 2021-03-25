<template>
  <div class="panel">
    <h1>Withdraw TRAC from your Node <el-popover
      placement="top-start"
      title="Withdraw TRAC"
      width="300"
      trigger="hover"
      content="You can always withdraw the amount of unstaked (not locked in a running job) TRAC from your node profile. This process is performed in a two-step fashion, with a 5min delay between steps. This is needed to avoid certain race conditions within the system functioning. Withdrawing TRAC from your node profile will send the TRAC to your management wallet.
The maximum amount of TRAC safe to withdraw is shown in the left sidebar. Keep in mind that if you withdraw all TRAC available, your node will not be able to respond to new offers because it will not be able to stake TRAC for the job. We recommend to always have some unlocked TRAC on the profile so that your node can receive new jobs.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p class="explanation-text">This will withdraw TRAC from your ODN node profile.</p>
    <el-form>
      <p class="label">Wallet to withdraw to - Management wallet</p>
      <el-form-item>
        <el-input v-model="wallet" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="label">Amount to withdraw</p>
        <el-input-number v-model="amount" :precision="3"
                         :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-button @click="startTokenWithdrawal" class="profile-btn">START WITHDRAWAL</el-button>

        <el-button @click="withdrawTokens" class="profile-btn-white">FINISH WITHDRAWAL</el-button>
      <el-tooltip class="item btn-tooltip" effect="dark" content="START WITHDRAWAL button will execute 2 blockchain transactions. If the second transaction fails, you can use this button to start it again. Use this button only for the second transaction." placement="top">
      <i class="el-icon-info"></i>
      </el-tooltip>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['profileAddress', 'erc725'],
  mounted() {
    if (window.ethereum._state.accounts.length > 0) {
      this.wallet = window.ethereum._state.accounts[0];
    }

    window.EventBus.$on('management_wallet_changed', (managementWallet) => {
      this.wallet = managementWallet;
    });
  },
  data() {
    return {
      amount: 0,
      wallet: '',
    };
  },
  methods: {
    startTokenWithdrawal() {
      this.$alert('This operation will require 2 transactions to blockchain. ', 'Important', {
        confirmButtonText: 'OK',
        callback: () => {
          const value = this.prepareNumber().toString();
          const profileContract = new window.web3.eth.Contract(window.profileAbi, this.profileAddress);
          profileContract.methods
            .startTokenWithdrawal(this.erc725, value).send({ from: this.wallet, gas: 500000 }).then(async (hash) => {
              window.EventBus.$emit('loading', 'First transaction in progress. Please wait.');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
              const countDownDate = new Date().getTime() + (5 * 65 * 1000);
              const x = setInterval(() => {
                window.EventBus.$emit('loading-done');
                const now = new Date().getTime();
                const distance = countDownDate - now;
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                window.EventBus.$emit('loading', `This operation will take another ${minutes} minutes and ${seconds} seconds. Please be patient and don't close the browser.`);
                if (distance < 0) {
                  clearInterval(x);
                }
              }, 1000);
              setTimeout(() => {
                window.EventBus.$emit('loading', 'Please approve second transaction');
                this.withdrawTokens(profileContract);
              }, (5 * 65 * 1000));
            });
        },
      });
    },
    withdrawTokens(profileContract) {
      profileContract.methods
        .withdrawTokens(this.erc725).send({ from: this.wallet, gas: 500000 }).then(async (hash) => {
          window.EventBus.$emit('loading', 'Second transaction in progress. Please wait.');
          await window.Utilities.getTransactionReceipt(hash);
          window.EventBus.$emit('loading-done');
        });
    },
    prepareNumber() {
      const am = new window.Eth.BN(this.amount * 1000);
      const base = new window.Eth.BN(10);
      const exponent = new window.Eth.BN(15);
      const multiply = base.pow(exponent);
      return am.mul(multiply);
    },
  },
};
</script>

<style scoped lang="scss">
  .profile-btn{
    background-color: #1d2667;
    color: #ffffff;
    border: #1d2667;
    &:hover{
      background-color: #1d2667;
      color: #ffffff;
      border: #1d2667;
      opacity: .8;
    }
    &:focus{
      background-color: #1d2667;
      color: #ffffff;
      border: #1d2667;
      opacity: .8;
    }
  }
  .profile-btn-white{
    margin-right: 10px;
  }
  .btn-tooltip{
    font-size: 22px;
  }
</style>
