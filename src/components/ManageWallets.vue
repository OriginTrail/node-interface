<template>
  <div class="panel">
    <h1 v-if="selected_network == 'ETHEREUM'">Manage wallets <el-popover
      placement="top-start"
      title="Manage wallets"
      width="500"
      trigger="hover"
      content="The OriginTrail node identity is compatible with the ERC725 standard and utilizes it for key management.

It distinguishes two different types of keys in the identity contract:
- The operational wallet, whose private key is stored on the node itself and is used to perform a multitude of operations in the ODN (signing, execution, etc). It requires a small balance of ETH in order to be able to publish transactions to the blockchain, and it can be filled periodically. No TRAC tokens are required for this wallet
- The management wallet, whose private key is NOT stored on the node and is used to deal with the funds (TRAC rewards) and to manage the keys associated with the ERC725 identity. The management wallet can be any ERC20 supporting wallet (Trezor, Ledger, Metamask etc).
This approach is taken as a convenience measure to provide for flexibility with key management and to minimize the risk of loosing funds in case of the operational key stored on the node somehow gets compromised.
You can use this interface to manage your wallets (add/remove both). IMPORTANT NOTE: Only use this interface if you know what you are doing! With improper use, your node can stop operating and you can loose your rewards!">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>

    <h1 v-if="selected_network == 'XDAI'">Manage wallets <el-popover
      placement="top-start"
      title="Manage wallets"
      width="500"
      trigger="hover"
      content="The OriginTrail node identity is compatible with the ERC725 standard and utilizes it for key management.

It distinguishes two different types of keys in the identity contract:
- The operational wallet, whose private key is stored on the node itself and is used to perform a multitude of operations in the ODN (signing, execution, etc). It requires a small balance of xDai in order to be able to publish transactions to the blockchain, and it can be filled periodically. No xTRAC tokens are required for this wallet
- The management wallet, whose private key is NOT stored on the node and is used to deal with the funds (xTRAC rewards) and to manage the keys associated with the ERC725 identity. The management wallet can be any ERC20 supporting wallet (Trezor, Ledger, Metamask etc).
This approach is taken as a convenience measure to provide for flexibility with key management and to minimize the risk of loosing funds in case of the operational key stored on the node somehow gets compromised.
You can use this interface to manage your wallets (add/remove both). IMPORTANT NOTE: Only use this interface if you know what you are doing! With improper use, your node can stop operating and you can loose your rewards!">
      <i class="el-icon-info" slot="reference"></i>
    </el-popover></h1>
    <p class="explanation-text">Add/Remove wallets (Management & Operational)</p>

    <p class="explanation-text">
      Note: You cannot remove a management wallet if you only have one associated with your node. To change your existing management wallet, first add a new one and then proceed with removing the old wallet.
    </p>
    <el-form>
      <el-form-item>
        <p class="label">
          Wallet type to manage
        </p>
        <el-select v-model="selected_wallet_type" placeholder="Select" clearable>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <p class="label">Enter wallet</p>
        <el-input v-model="walletToAdd"></el-input>
      </el-form-item>
      <el-button @click="add" class="profile-btn">ADD WALLET</el-button>
      <el-button @click="remove" class="profile-btn-white">REMOVE WALLET</el-button>
    </el-form>

  </div>
</template>
<script>
export default {
  props: ['erc725', 'selected_network'],
  mounted() {
    if (window.ethereum._state.accounts.length > 0) {
      this.wallet = window.ethereum._state.accounts[0];
    }
    this.ercContract = new window.web3.eth.Contract(window.erc725Abi, this.erc725);
    this.keccakContract = new window.web3.eth.Contract(window.keccakAbi, this.keccakAddress);
  },
  data() {
    return {
      options: [
        { value: 'mv', label: 'Management Wallet' },
        { value: 'ov', label: 'Operational Wallet' },
      ],
      selected_wallet_type: 'mv',
      walletToAdd: '',
      wallet: '',
      ercContract: null,
      keccakContract: null,
    };
  },
  methods: {
    add() {
      const arr = (this.selected_wallet_type === 'mv') ? [1, 2, 3, 4] : [2, 4];
      this.keccakContract.methods
        .keccakAddress(this.walletToAdd).send({ from: this.wallet }).then(async (walletToAdd) => {
          this.ercContract.methods
            .addKey(walletToAdd[0], arr, 1).send({ from: this.wallet }).then(async (hash) => {
              window.EventBus.$emit('loading');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
            });
        });
    },
    remove() {
      this.keccakContract.methods
        .keccakAddress(this.walletToAdd).send({ from: this.wallet }).then((walletToRemove) => {
          this.ercContract.methods
            .removeKey(walletToRemove).send({ from: this.wallet }).then(async (hash) => {
              window.EventBus.$emit('loading');
              await window.Utilities.getTransactionReceipt(hash);
              window.EventBus.$emit('loading-done');
            });
        });
    },
  },
};
</script>
<style scoped lang="scss">
  .full {
    width: 100%;
  }

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

  .el-select-dropdown__item {
    font-family: 'Roboto', Arial, sans-serif;
  }
</style>
