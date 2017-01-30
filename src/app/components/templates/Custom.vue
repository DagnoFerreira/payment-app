<template>
  <div class="payment-custom">
    <payment-form :stepper="false" @submit="processPayment" />
    <payment-footer />
  </div>
</template>

<style lang="scss">
  @import '~stylesheets/variables';

  .payment-custom {
    .form-stepper {
      margin: 0;
    }

    .form-step {
      height: auto;
      opacity: 1;

      + .form-step {
        margin-top: $baseline-space * 2;
      }

      &:not(.active) {
        position: relative;
      }
    }

    .form-personal-data .form-group {
      padding: 0;
    }

    .form-button {
      margin-bottom: 0;
    }

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
