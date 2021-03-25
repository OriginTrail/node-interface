<template>
  <div class="panel">
    <h1 v-if="selected_network == 'ETHEREUM'">Deposit ETH to your Node <el-popover
      placement="top-start"
      title="Deposit ETH"
      width="300"
      trigger="hover"
      content="ETH is required for your node to be able to publish transactions to the blockchain, which is handled by your node's operational wallet. This is mostly needed if you want to publish data sets on the network (as a DC node), but sometimes also required as a DH node. It is recommended to always have around 0.1 ETH on the node operational wallet.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <h1 v-if="selected_network == 'XDAI'">Deposit xDai to your Node <el-popover
      placement="top-start"
      title="Deposit xDai"
      width="300"
      trigger="hover"
      content="xDai is required for your node to be able to publish transactions to the blockchain, which is handled by your node's operational wallet. This is mostly needed if you want to publish data sets on the network (as a DC node), but sometimes also required as a DH node. It is recommended to always have around 0.1 xDai on the node operational wallet.">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p class="explanation-text" v-if="selected_network == 'ETHEREUM'">This will transfer ETH to your operational wallet.</p>
    <p class="explanation-text" v-if="selected_network == 'XDAI'">This will transfer xDai to your operational wallet.</p>
    <el-form :rules="rules" ref="formData" :model="formData">
      <el-form-item label="Wallet to deposit from (i.e. Management wallet)">
        <el-input v-model="wallet"></el-input>
      </el-form-item>
      <el-form-item>
        <p class="label">Please enter amount to deposit</p>
        <el-input-number v-model="formData.amount"
                         :precision="3" :step="0.01" :min="0"></el-input-number>
      </el-form-item>
      <el-button @click="depositEth" class="profile-btn" v-if="selected_network == 'ETHEREUM'">DEPOSIT ETH</el-button>
      <el-button @click="depositEth" class="profile-btn" v-if="selected_network == 'XDAI'">DEPOSIT xDai</el-button>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['operationalWallet', 'selected_network'],
  data() {
    return {
      formData: {
        amount: 0,
      },
      wallet: '',
      rules: {
        amount: [
          { required: true, message: 'Please enter amount', trigger: 'blur' },
          { min: 0.001, message: 'Amount cannot be less than 0.001', trigger: 'blur' },
        ],
      },
    };
  },
  mounted() {
    // window.eth.accounts().then((result) => {
    //   this.wallet = result[0];
    // });
    // window.ethereum.request({ method: 'eth_requestAccounts' });

    if (window.ethereum._state.accounts.length > 0) {
      this.wallet = window.ethereum._state.accounts[0];
    }

    window.EventBus.$on('management_wallet_changed', (managementWallet) => {
      console.log('MANAGEMENT WALLET CHANGED');
      this.wallet = managementWallet;
    });
  },
  methods: {
    depositEth() {
      console.log(window.eth.currentProvider)
      this.$refs.formData.validate((valid) => {
        if (valid) {
          const value = window.Eth.toWei(this.formData.amount, 'ether');
          window.ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: this.wallet,
                  to: this.operationalWallet,
                  gas: '3000000',
                  value: value.toNumber(),
                  data:
                    '0x',
                },
              ],
            })
            .then(async (hash) => {
              window.EventBus.$emit('loading');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
            })
            .catch((error) => {
              console.log(error);
            });

        } else {
          console.log('error submit!!');
          return false;
        }
      });
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
