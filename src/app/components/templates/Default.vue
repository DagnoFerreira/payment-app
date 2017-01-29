<template>
  <div class="payment-default">
    <form novalidate @submit.stop.prevent="processPayment" class="form-content">
      <form-stepper :steps="steps">
        <div class="form-step" id="personal-data">
          a
        </div>

        <div class="form-step" id="payment-data">
          b
        </div>

        <div class="form-step" id="user-feedback">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis accusantium beatae, non, totam nesciunt voluptas nobis explicabo. Aut iusto eaque expedita provident. Est tempore similique corrupti labore molestiae. Recusandae, aliquid!
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
        ]
      }
    },
    methods: {
      processPayment() {

      }
    }
  }
</script>
