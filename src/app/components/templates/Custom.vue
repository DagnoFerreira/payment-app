<template>
  <div class="payment-custom">
    <payment-form has-coupon-code has-price has-card @submit="processPayment" />
    <payment-footer />
  </div>
</template>

<style lang="scss">
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
    name: 'payment-custom',
    methods: {
      processPayment(data) {
        console.log(data)
      }
    }
  }
</script>
