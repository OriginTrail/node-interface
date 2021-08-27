<template>
    <div id="app">
        <el-container>
            <el-header class="header-container">
                <el-container>
                    <el-aside width="300px">
                        <img alt="OriginTrail" src="./assets/ot-dark_purple.svg" class="logo">
                        </el-aside>
                </el-container>
            </el-header>

          <introduction v-if="submitted && !mobileTrue"
                        :selected_network="selected_network"
          ></introduction>

            <el-container v-if="submitted && !mobileTrue">

                <el-aside width="300px">
                    <balances
                            :profile-storage-address="profile_storage_address"
                            :profile-address="profile_address"
                            :erc725="erc_identity"
                            :operational-wallet="operational_wallet"
                            :token-address="token_contract"
                            :management_wallet_input="management_wallet_input"
                            :selected_network="selected_network"
                    ></balances>
                </el-aside>
                <el-main v-loading="loading"
                         :element-loading-text="loading_text">
                    <el-row>
                        <el-col :span="12">
                            <deposit-eth
                              :operational-wallet="operational_wallet"
                              :selected_network="selected_network"></deposit-eth>
                        </el-col>
                        <el-col :span="12">
                            <deposit-tokens
                                    :profile-address="profile_address"
                                    :token-address="token_contract"
                                    :erc725="erc_identity"
                                    :selected_network="selected_network">
                            </deposit-tokens>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <withdraw
                                    :erc725="erc_identity"
                                    :profile-address="profile_address"
                                    :selected_network="selected_network"
                            ></withdraw>
                        </el-col>
                        <el-col :span="12">
                            <manage-wallets
                                    :erc725="erc_identity"
                                    :selected_network="selected_network"
                            ></manage-wallets>
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
                            :selected_network="selected_network"
                    ></balances>
                </el-main>
            </el-container>
            <el-container v-else>
                <el-main>
                    <div class="select-blockchain-wrapper" >
                      <div class=" ethereum-blockchain-box" @click="selectNetwork('ETHEREUM')" v-on:click="isActive = !isActive" v-bind:class="{ active: selected_network === 'ETHEREUM' }">
                        <img src="./assets/ethereum.svg" alt="">
                        <h3>Ethereum</h3>
                        <p>Click here to manage your node decentralized identity on Ethereum</p>
                      </div>

                      <div class="xdai-blockchain-box" @click="selectNetwork('XDAI')" v-on:click="isActive = !isActive" v-bind:class="{ active: selected_network === 'XDAI' }">
                        <img src="./assets/xdai.svg" alt="">
                        <h3>xDai</h3>
                        <p>Click here to manage your node decentralized identity on xDAI</p>
                      </div>

                      <div class=" polygon-blockchain-box" @click="selectNetwork('POLYGON')" v-on:click="isActive = !isActive" v-bind:class="{ active: selected_network === 'POLYGON' }">
                        <img src="./assets/xdai.svg" alt="" id="hidden_id">
                        <h3>Polygon</h3>
                        <p>Click here to manage your node decentralized identity on Polygon</p>
                      </div>

                      <div class="blockchain-box-disabled">
                        <img src="./assets/starfleet.svg" alt="">
                        <h3>Starfleet</h3>
                        <p>Click here to manage your node decentralized identity on Starfleet</p>
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

                          <el-form v-if="selected_network == 'POLYGON'">
                            <h1>Polygon</h1>
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
import * as hubAbi from './abi/hub.json';


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

  },
  methods: {

    selectNetwork(network) {
      this.selected_network = network;
      if (window.ethereum) {
        window.web3 = new window.Web3(window.ethereum);
      }
      if (this.selected_network === 'ETHEREUM') {
        window.hubAddress = '0x89777F4D16F0a263F47EaD07cbCAb9497861aa79';
        window.keccakAddress = '0x7e1bbcd25507a6fcb6503a5be75795848dca32b7';
        window.eth = new window.Eth(new window.Eth.HttpProvider('https://mainnet.infura.io/v3/f8c3858f892d4199840f5354cc954713'));
      } else if (this.selected_network === 'XDAI') {
        window.hubAddress = '0xB4Cf5D3876FA929706A87F3B4042C741dcb3d688';
        window.keccakAddress = '0x470561DB00b4A21A35bD285c3e17e542DCa8B52c';
        window.eth = new window.Eth(new window.Eth.HttpProvider('https://rpc.xdaichain.com/origintrail/'));
      } else if (this.selected_network === 'POLYGON') {
        window.hubAddress = '0xe5FC9F71F8e378448c0BD0Fb8E1fb879654E3fbb';
        window.keccakAddress = '0x24800b1c2d4c48060d545bba2e199a0abd72a0d1'; //todo check this
        window.eth = new window.Eth(new window.Eth.HttpProvider('https://polygon-mainnet.infura.io/v3/f8c3858f892d4199840f5354cc954713'));
      }

      window.hub = window.eth.contract(hubAbi.default).at(window.hubAddress);
      window.ethereum.enable();

      if (localStorage.getItem('erc_identity') !== null) {
        this.erc_identity = localStorage.getItem('erc_identity');
      }

      if (localStorage.getItem('operational_wallet') !== null) {
        this.operational_wallet = localStorage.getItem('operational_wallet');
      }

      window.hub.tokenAddress().then((result) => {
        this.token_contract = result[0];
      });

      window.hub.getContractAddress('Profile').then((result) => {
        this.profile_address = result[0];
      });

      window.hub.getContractAddress('ProfileStorage').then((result) => {
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
    submitIdentity() {
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
    .header-container{
      padding: 0 20px;
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

  #hidden_id{
    visibility:hidden;
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
