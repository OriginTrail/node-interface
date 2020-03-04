<template>
  <el-row class="intro-row">
    <el-col :span="14">
      <p class="regular-p">To manage tokens and ETH for your node, use the interface below. Additionally, you can add or change your management wallet using the "Manage Wallets" interface below.</p>
      <p class="bold-p">Note that performing actions on this page requires you to connect your management wallet via Metamask and spend a small amount of ETH, as it will interact with Ethereum smart contracts.</p>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'Introduction',
};
</script>

<style scoped lang="scss">
  .intro-row{
    text-align: left;
    .regular-p{
      font-size: 20px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      letter-spacing: normal;
      color: #131415;
    }
    .bold-p{
      font-size: 20px;
      font-weight: bold;
      font-stretch: normal;
      font-style: normal;
      line-height: 1.6;
      letter-spacing: normal;
      color: #131415;
    }
  }
</style>
