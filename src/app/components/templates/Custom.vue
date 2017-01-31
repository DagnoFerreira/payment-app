<template>
  <div class="payment-custom">
    <payment-form has-coupon-code has-price has-card />
    <payment-footer />
  </div>
</template>

<style lang="sass">
  @import '~stylesheets/variables';

  .payment-custom {
    .payment-footer {
      margin-left: 0;
      margin-right: 0;
    }
  }
</style>

<script>
  export default {
    name: 'payment-custom'
  }
</script>
