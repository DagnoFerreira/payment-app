<template>
  <div class="payment-default">
    <div class="form-content">
      <payment-form @submit="processPayment" />
      <payment-footer />
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
    name: 'payment-default',
    methods: {
      processPayment(data) {
        console.log(data)
      }
    }
  }
</script>
