<template>
  <div class="payment-default">
    <div class="form-content">
      <span>Default</span>
    </div>

    <payment-cart />
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';

  .payment-default {
    display: flex;
  }

  .form-content {
    flex: 1;
  }
</style>

<script>
  export default {
    name: 'payment-default'
  }
</script>
