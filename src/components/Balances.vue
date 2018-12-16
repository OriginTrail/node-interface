<template>
  <div>
    <h2 >Node profile</h2>
    <el-row v-bind:class="[total_trac_changed ? 'changed' : '', 'balance-row']">
      <el-col :span="12" class="align-left">TOTAL</el-col>
      <el-col :span="12">{{total_trac | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row"
            v-bind:class="[locked_trac_changed ? 'changed' : '', 'balance-row']">
      <el-col :span="12" class="align-left">LOCKED</el-col>
      <el-col :span="12">{{locked_trac | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row">
      <el-col :span="12" class="align-left">MIN. STAKE</el-col>
      <el-col :span="12">{{minimum_stake | toTrac}} TRAC</el-col>
    </el-row>

    <el-row class="balance-row">
      <el-col :span="12" class="align-left">SAFE TO WITHDRAW</el-col>
      <el-col :span="12">{{safe_to_withdraw | toTrac}} TRAC</el-col>
    </el-row>

    <h2>Balances</h2>
    <h1>Operational wallet</h1>
    <h6>{{operationalWallet}}</h6>
    <el-row class="balance-row">
      <el-col :span="12" class="align-left">ETH</el-col>
      <el-col :span="12">{{ow_eth_balance}}</el-col>
    </el-row>

    <h1>Management wallet</h1>
    <h6>{{management_wallet}}</h6>
    <el-row class="balance-row">
      <el-col :span="12" class="align-left">ETH</el-col>
      <el-col :span="12">{{mw_eth_balance}}</el-col>
    </el-row>

    <el-row class="balance-row">
      <el-col :span="12" class="align-left">TRAC</el-col>
      <el-col :span="12">{{mw_trac_balance}}</el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ['profileStorageAddress', 'erc725', 'profileAddress', 'operationalWallet', 'tokenAddress'],
  name: 'Balances',
  data() {
    return {
      ow_eth_balance: 0,
      mw_eth_balance: 0,
      mw_trac_balance: 0,
      total_trac: 0,
      locked_trac: 0,
      minimum_stake: 0,
      management_wallet: '',
      total_trac_changed: false,
      locked_trac_changed: false,
    };
  },
  watch: {
    locked_trac(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        this.locked_trac_changed = true;
        setTimeout(() => {
          this.locked_trac_changed = false;
        }, 3000);
      } else {
        this.locked_trac_changed = false;
      }
    },
    total_trac(newVal, oldVal) {
      if (newVal.toString() !== oldVal.toString() && oldVal !== 0) {
        this.total_trac_changed = true;
        setTimeout(() => {
          this.total_trac_changed = false;
        }, 3000);
      } else {
        this.total_trac_changed = false;
      }
    },
  },
  computed: {
    safe_to_withdraw() {
      try {
        return this.total_trac.sub(this.locked_trac).sub(this.minimum_stake);
      } catch (e) {
        // console.log(e)
        return '';
      }
    },
  },
  filters: {
    toTrac(val) {
      const am = new window.Eth.BN(val);
      const base = new window.Eth.BN(10);
      const exponent = new window.Eth.BN(15);
      const multiply = base.pow(exponent);
      return (am.div(multiply).toNumber() < 0) ? 0 : am.div(multiply).toNumber() / 1000;
    },
  },
  mounted() {
    this.getAllBalances();
    window.EventBus.$on('loading-done', () => {
      this.getAllBalances();
    }, 5000);
    setInterval(() => {
      this.getAllBalances();
    }, 10000);
  },
  methods: {
    getAllBalances() {
      window.eth.getBalance(this.operationalWallet)
        .then((result) => {
          this.ow_eth_balance = Math.round(window.Eth.fromWei(result, 'ether') * 1000) / 1000;
        })
        .catch((error) => {
          console.log(error);
        });
      window.eth.accounts().then((result) => {
        this.management_wallet = result[0];
        window.eth.getBalance(this.management_wallet)
          .then((result) => {
            this.mw_eth_balance = Math.round(window.Eth.fromWei(result, 'ether') * 1000) / 1000;
          })
          .catch((error) => {
            console.log(error);
          });
        const tokenContract = window.eth.contract(window.tokenAbi).at(this.tokenAddress);
        tokenContract.balanceOf(this.management_wallet)
          .then((balance) => {
            this.mw_trac_balance = this.$options.filters.toTrac(balance[0].toString());
          })
          .catch((error) => {
            console.log(error);
          });
      });

      const profileStorageContract = window.eth.contract(window.profileStorageAbi)
        .at(this.profileStorageAddress);

      const profileContract = window.eth.contract(window.profileAbi)
        .at(this.profileAddress);

      profileStorageContract.getStake(this.erc725).then((result) => {
        this.total_trac = new window.Eth.BN(result[0]);
      });

      profileStorageContract.getStakeReserved(this.erc725).then((result) => {
        this.locked_trac = new window.Eth.BN(result[0]);
      });

      profileContract.minimalStake().then((result) => {
        this.minimum_stake = new window.Eth.BN(result[0]);
      });
    },
  },
};
</script>
<style>
  .align-left {
    text-align: left;
  }

  .balance-row {
    padding: 5px;
    margin: 5px 0;
    transition: 1s all;
  }

  .balance-row:nth-of-type(odd) {
    background-color: #220F50;
    color: white;
  }
  .balance-row  div:nth-child(2) {
    transition: 1s color;
  }
  .changed div:nth-child(2) {
    color:red;
    transition: 1s color;
  }

</style>
