<template>
  <div class="panel">
    <h1  v-if="selected_network == 'ETHEREUM'">Deposit TRAC to Your Node <el-popover
      placement="top-start"
      title="Deposit TRAC"
      width="300"
      trigger="hover"
      content="For the node to operate within the rules of the OriginTrail protocol, your node needs TRAC on it's network profile smart contract. This TRAC is used to reimburse DH nodes for their services (if you are publishing data sets as a DC node), to provide collateral (stake) as a DH node, and to provide the initial stake to join the network. Your node might from time to time respond to holding requests, which might lock in additional TRAC if it gets picked for the job (you can observe the available TRAC in the left sidebar), which will get unlocked once the job is completed. For each job, your node will be compensated in additional TRAC, which will be shown on your profile once the job is complete.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p v-if="selected_network == 'ETHEREUM'" class="explanation-text">This will deposit TRAC to your profile</p>
    <h1  v-if="selected_network == 'XDAI'">Deposit xTRAC to Your Node <el-popover
      placement="top-start"
      title="Deposit TRAC"
      width="300"
      trigger="hover"
      content="For the node to operate within the rules of the OriginTrail protocol, your node needs xTRAC on it's network profile smart contract. This xTRAC is used to reimburse DH nodes for their services (if you are publishing data sets as a DC node), to provide collateral (stake) as a DH node, and to provide the initial stake to join the network. Your node might from time to time respond to holding requests, which might lock in additional xTRAC if it gets picked for the job (you can observe the available xTRAC in the left sidebar), which will get unlocked once the job is completed. For each job, your node will be compensated in additional xTRAC, which will be shown on your profile once the job is complete.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p v-if="selected_network == 'XDAI'" class="explanation-text">This will deposit xTRAC to your profile</p>
    <h1  v-if="selected_network == 'POLYGON'">Deposit pTRAC to Your Node <el-popover
      placement="top-start"
      title="Deposit TRAC"
      width="300"
      trigger="hover"
      content="For the node to operate within the rules of the OriginTrail protocol, your node needs xTRAC on it's network profile smart contract. This xTRAC is used to reimburse DH nodes for their services (if you are publishing data sets as a DC node), to provide collateral (stake) as a DH node, and to provide the initial stake to join the network. Your node might from time to time respond to holding requests, which might lock in additional xTRAC if it gets picked for the job (you can observe the available xTRAC in the left sidebar), which will get unlocked once the job is completed. For each job, your node will be compensated in additional xTRAC, which will be shown on your profile once the job is complete.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p v-if="selected_network == 'POLYGON'" class="explanation-text">This will deposit pTRAC to your profile</p>
    <el-form>
      <el-form-item label="Depositing from Management Wallet:">
        <el-input v-model="wallet" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="label">Please enter amount to deposit</p>
        <el-input-number v-model="amount" :precision="3" :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-button @click="increaseApproval" class="profile-btn" v-if="selected_network == 'ETHEREUM'">DEPOSIT TRAC</el-button>
      <el-button @click="increaseApproval" class="profile-btn" v-if="selected_network == 'XDAI'">DEPOSIT xTRAC</el-button>
      <el-button @click="increaseApproval" class="profile-btn" v-if="selected_network == 'POLYGON'">DEPOSIT pTRAC</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['profileAddress', 'tokenAddress', 'erc725', 'selected_network'],
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
    async increaseApproval() {
      console.log(this.selected_network);
      const value = this.prepareNumber().toString();
      this.$alert('This operation will require 2 transactions to blockchain.', 'Important', {
        confirmButtonText: 'OK',
        callback: () => {
          if (this.selected_network === 'POLYGON'){
            const polygonTokenContract = new window.web3.eth.Contract(window.polygonTokenAbi, this.tokenAddress);
            window.EventBus.$emit('loading', 'First transaction in progress. Please wait.');
            polygonTokenContract.methods
              .increaseAllowance(this.profileAddress, value).send({ from: this.wallet }).then(async (hash) => {
              // await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading', 'Please approve second transaction');
              this.depositToken(value);
            }).catch((error) => {
              console.log(error);
              window.EventBus.$emit('loading-done');
            });
          } else {
            const tokenContract = new window.web3.eth.Contract(window.tokenAbi, this.tokenAddress);
            window.EventBus.$emit('loading', 'First transaction in progress. Please wait.');
            tokenContract.methods
              .increaseApproval(this.profileAddress, value).send({ from: this.wallet }).then(async (hash) => {
              // await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading', 'Please approve second transaction');
              this.depositToken(value);
            }).catch((error) => {
              console.log(error);
              window.EventBus.$emit('loading-done');
            });
          }
        },
      });
    },
    depositToken(value) {
      const profileContract = new window.web3.eth.Contract(window.profileAbi, this.profileAddress);
      profileContract.methods
        .depositTokens(this.erc725, value).send({ from: this.wallet }).then(async (hash) => {
          window.EventBus.$emit('loading', 'Second transaction in progress. Please wait.');
          // await window.Utilities.getTransactionReceipt(hash);
          window.EventBus.$emit('loading-done');
        }).catch((error) => {
          console.log(error);
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

</style>
