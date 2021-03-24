<template>
    <div id="app">
        <el-container>
            <el-header>
                <el-container>
                    <el-aside width="300px">
                        <img alt="OriginTrail" src="./assets/ot-dark_purple.svg" class="logo">
                        </el-aside>
                </el-container>
            </el-header>

          <introduction v-if="submitted && !mobileTrue"></introduction>

            <el-container v-if="submitted && !mobileTrue">

                <el-aside width="300px">
                    <balances
                            :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :management_wallet_input="management_wallet_input"
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
                        <el-col :span="12">
                            <withdraw
                                    :erc725="erc_identity"
                                    :profile-address="profile_address"
                            ></withdraw>
                        </el-col>
                        <el-col :span="12">
                            <manage-wallets
                                    :erc725="erc_identity"></manage-wallets>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
            <el-container v-else-if="submitted && mobileTrue">
                <el-main >
                    <balances
                            :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :management_wallet_input="management_wallet_input"
                    ></balances>
                </el-main>
            </el-container>
            <el-container v-else>
                <el-main>
                    <div class="select-blockchain-wrapper" >
                      <div class=" ethereum-blockchain-box" @click="selectNetwork('ETHEREUM')" v-on:click="isActive = !isActive" v-bind:class="{ active: selected_network === 'ETHEREUM' }">
                        <img src="./assets/ethereum.svg" alt="">
                        <h3>Ethereum</h3>
                        <p>Mainnet</p>
                      </div>

                      <div class=" xdai-blockchain-box" @click="selectNetwork('XDAI')" v-on:click="isActive = !isActive" v-bind:class="{ active: selected_network === 'XDAI' }">
                        <img src="./assets/xdai.svg" alt="">
                        <h3>xDai</h3>
                        <p>Mainnet</p>
                      </div>

                      <div class="blockchain-box-disabled">
                        <img src="./assets/starfleet.svg" alt="">
                        <h3>Starfleer</h3>
                        <p>Mainnet</p>
                      </div>
                    </div>

                    <div class="landing-page-form-wrapper">
                        <div class="landing-page-inner-wrapper">
                            <el-form v-if="selected_network == 'ETHEREUM'">
                              <h1>Ethereum</h1>
                                <el-form-item label="Please enter your ERC725 identity"
                                             >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="erc_identity"></el-input>
                                </el-form-item>
                                <el-form-item label="Please enter your operational wallet address"
                                >
                                    <el-input
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="operational_wallet"></el-input>
                                </el-form-item>
                                <el-form-item
                                        v-if="mobileTrue"
                                        label="Please enter your management wallet address"

                                >
                                    <el-input
                                            maxlength="42"
                                            minlength="42"
                                            type="textarea"
                                            :autosize="{ minRows: 1, maxRows: 2}"
                                            resize="none"
                                            v-model="management_wallet_input"></el-input>
                                </el-form-item>
                              <el-button class="landing-page-button" @click="submitIdentity">CONNECT</el-button>
                            </el-form>

                          <el-form v-if="selected_network == 'XDAI'">
                            <h1>xDai</h1>
                            <el-form-item label="Please enter your ERC725 identity"
                            >
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 2}"
                                resize="none"
                                v-model="erc_identity"></el-input>
                            </el-form-item>
                            <el-form-item label="Please enter your operational wallet address"
                            >
                              <el-input
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 2}"
                                resize="none"
                                v-model="operational_wallet"></el-input>
                            </el-form-item>
                            <el-form-item
                              v-if="mobileTrue"
                              label="Please enter your management wallet address"

                            >
                              <el-input
                                maxlength="42"
                                minlength="42"
                                type="textarea"
                                :autosize="{ minRows: 1, maxRows: 2}"
                                resize="none"
                                v-model="management_wallet_input"></el-input>
                            </el-form-item>
                            <el-button class="landing-page-button" @click="submitIdentity">CONNECT</el-button>
                          </el-form>
                        </div>
                    </div>
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
import Header from './components/Header.vue';
import Introduction from './components/Introduction';


export default {
  name: 'app',
  data() {
    return {
      token_contract: '',
      profile_address: '',
      profile_storage_address: '',
      submitted: 0,
      loading_text: 'Transaction in progress. Please wait for transaction to finish.',
      loading: false,
      mobileTrue: false,
      management_wallet_input: '',
      erc_identity: '',
      operational_wallet: '',
      selected_network: '',
      isActive: false,
      rules: {
        operational_wallet: [
          { required: true, message: 'Please input your operational wallet', trigger: 'blur' },
          { max: 42, message: 'Your wallet should not be more than 42 characters' },
          { min: 42, message: 'Your wallet should be at least 42 characters long' },
        ],
        erc_identity: [
          { required: true, message: 'Please input your ERC-Identity', trigger: 'blur' },
          { max: 42, message: 'Your ERC-Identity should not be more than 42 characters' },
          { min: 42, message: 'Your ERC-Identity should be at least 42 characters long' },
        ],
      },
    };
  },
  mounted() {
    console.log(localStorage.getItem('erc_identity'), 'erc_identity');

    if (localStorage.getItem('erc_identity') !== null) {
      this.erc_identity = localStorage.getItem('erc_identity');
    }

    if (localStorage.getItem('operational_wallet') !== null) {
      this.operational_wallet = localStorage.getItem('operational_wallet');
    }
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
    if (window.screen.width <= 770) {
      this.mobileTrue = true;
    }
  },
  methods: {

    selectNetwork(network) {
      this.selected_network = network;
    },
    submitIdentity() {
      // const erc = eth.contract(erc725Abi).at(this.erc_identity);
      // erc.getKeysByPurpose(1).then((result) => {
      //   console.log(result);
      // });


      localStorage.setItem('erc_identity', this.erc_identity);
      localStorage.setItem('operational_wallet', this.operational_wallet);
      this.submitted = 1;
    },
  },
  components: {
    Introduction,
    Header,
    Balances,
    DepositEth,
    DepositTokens,
    Withdraw,
    ManageWallets,
  },
};
</script>

<style lang="scss">

    @import "./scss/landig-page";

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
    text-align: left;
    background-color: #ffffff;
    margin: 10px;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1px solid #dfdfdf;
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

  .el-main {
    height: 100%;
  }
</style>
