import Vue from 'vue';
import ElementUI from 'element-ui';
import * as profileAbi from './abi/profile.json';
import * as erc725Abi from './abi/erc725.json';
import * as tokenAbi from './abi/token.json';
import * as profileStorageAbi from './abi/profile-storage.json';
import * as keccakAbi from './abi/testingutils.json';
import * as hubAbi from './abi/hub.json';
import App from './App.vue';
import 'element-ui/lib/theme-chalk/index.css';
import Utilities from './Utilities';

window.Utilities = Utilities;

window.Eth = require('ethjs');

window.EventBus = new Vue();

window.profileAbi = profileAbi.default;
window.erc725Abi = erc725Abi.default;
window.tokenAbi = tokenAbi.default;
window.profileStorageAbi = profileStorageAbi.default;
window.keccakAbi = keccakAbi.default;

window.hubAddress = '0x0e5995FE34BfC9DB7a31fa318f7f1256Cf28FfCa';
window.keccakAddress = '0xfd010324268fec8868c663ce2cde2de8cb7d832a';


Vue.use(ElementUI);
if (typeof web3 !== 'undefined' && window.screen.width > 770) {
  // eslint-disable-next-line
    window.eth = new window.Eth(web3.currentProvider);
} else if (window.screen.width <= 770) {
  window.eth = new window.Eth(new window.Eth.HttpProvider('https://rinkeby.infura.io/1WRiEqAQ9l4SW6fGdiDt'));
} else {
  alert('Please install Metamask');
}
try {
  window.hub = window.eth.contract(hubAbi.default).at(window.hubAddress);
  window.ethereum.enable();
} catch (err) {
  console.log(err);
}


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
