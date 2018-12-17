<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-container>
          <el-aside width="300px">
            <img alt="OriginTrail" src="./assets/ot-dark_purple.svg" class="logo"></el-aside>
          <h1 style="padding-left: 10px;">Profile Management Interface</h1>
        </el-container>
      </el-header>
      <el-container v-if="submitted">
        <el-aside width="300px">
          <balances
            :profile-storage-address="profile_storage_address"
            :profile-address="profile_address"
            :erc725="erc_identity"
            :operational-wallet="operational_wallet"
            :token-address="token_contract"
          ></balances>
        </el-aside>
        <el-main v-loading="loading"
                 :element-loading-text="loading_text">
          <el-row>
            <el-col :span="12">
              <deposit-eth :operational-wallet="operational_wallet"></deposit-eth>
            </el-col>
            <el-col :span="12">
              <deposit-tokens
                :profile-address="profile_address"
                :token-address="token_contract"
                :erc725="erc_identity">
              </deposit-tokens>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12"><withdraw
              :erc725="erc_identity"
              :profile-address="profile_address"
            ></withdraw></el-col>
            <el-col :span="12"><manage-wallets
              :erc725="erc_identity"></manage-wallets></el-col>
          </el-row>
        </el-main>
      </el-container>
      <el-container v-else>
        <el-main>
          <el-form class="panel panel-form">
            <el-form-item label="Please enter your ERC725 identity">
              <el-input v-model="erc_identity"></el-input>
            </el-form-item>

            <el-form-item label="Please enter your operational wallet address">
              <el-input v-model="operational_wallet"></el-input>
            </el-form-item>

            <el-button @click="submitIdentity">Submit</el-button>
          </el-form>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Balances from './components/Balances.vue';
import DepositEth from './components/DepositEth.vue';
import DepositTokens from './components/DepositTokens.vue';
import Withdraw from './components/Withdraw.vue';
import ManageWallets from './components/ManageWallets.vue';

export default {
  name: 'app',
  data() {
    return {
      erc_identity: '0x50069ef13456ca8856fe1b9e3ec1a6e12ad037a6',
      token_contract: '',
      profile_address: '',
      profile_storage_address: '',
      operational_wallet: '0xeBeF83A03F87d810234Dd1BbDfa75EE3322929e4',
      submitted: 0,
      loading_text: 'Transaction in progress. Please wait for transaction to finish.',
      loading: false,
    };
  },
  mounted() {
    window.hub.tokenAddress().then((result) => {
      this.token_contract = result[0];
    });

    window.hub.profileAddress().then((result) => {
      this.profile_address = result[0];
    });

    window.hub.profileStorageAddress().then((result) => {
      this.profile_storage_address = result[0];
    });

    window.EventBus.$on('loading', (msg) => {
      this.loading = true;
      this.loading_text = msg || 'Transaction in progress. Please wait for transaction to finish.';
    });

    window.EventBus.$on('loading-done', () => {
      this.loading = false;
    });
  },
  methods: {
    submitIdentity() {
      // const erc = eth.contract(erc725Abi).at(this.erc_identity);
      // erc.getKeysByPurpose(1).then((result) => {
      //   console.log(result);
      // });
      this.submitted = 1;
    },
  },
  components: {
    Balances,
    DepositEth,
    DepositTokens,
    Withdraw,
    ManageWallets,
  },
};
</script>

<style lang="scss">
  #app {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .logo {
    margin-top: 13px;

  }
  .el-aside {
     text-align: left;
  }
  .panel {
    background-color: #f3f3f3;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 8px;
  }

  .panel-form {
    width: 400px;
    margin: 100px auto;
  }

  .el-message-box {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }

  .el-popover {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }

  .el-message__content {
    font-family: 'Roboto', Helvetica, Arial, sans-serif;
  }
</style>
