<template>
  <div class="payment-default">
    <form novalidate @submit.stop.prevent="processPayment" class="form-content">
      <form-stepper :steps="steps" :last-completed="currentStep">
        <div class="form-step" id="personal-data">
        </div>

        <div class="form-step" id="payment-data">
        </div>

        <div class="form-step" id="user-feedback">
        </div>
      </form-stepper>
    </form>

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
    data() {
      return {
        steps: [
          {
            name: 'Dados Pessoais',
            target: '#personal-data'
          },
          {
            name: 'Pagamento',
            target: '#payment-data'
          },
          {
            name: 'Obrigado!',
            target: '#user-feedback'
          }
        ],
        currentStep: 1
      }
    },
    methods: {
      processPayment() {

      }
    }
  }
</script>
