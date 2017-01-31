<template>
  <div class="payment-footer" v-once>
    <div class="payment-footer-help">
      <span>Precisa de ajuda no preenchimento desta tela?</span>
      <a href="">Veja o email do suporte</a>
    </div>

    <div class="payment-footer-copyright">
      <span>Hotmart © {{ date.getFullYear() }} - Todos os direitos reservados</span>
      <span>REF.: j7j</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-footer {
    margin: $baseline-space * 2 $baseline-space;
    padding-top: $baseline-space * 2;
    display: flex;
    justify-content: space-between;
    border-top: 1px solid $color-dark-grey;
    color: #999;
    font-size: 10px;

    @include breakpoint-small {
      margin-top: 0;
      flex-direction: column;
    }
  }

  .payment-footer-help,
  .payment-footer-copyright {
    span {
      display: block;
    }
  }

  .payment-footer-copyright {
    text-align: right;

    @include breakpoint-small {
      margin-top: $baseline-space;
      text-align: left;
    }
  }
</style>

<script>
  export default {
    name: 'payment-footer',
    data: () => ({
      date: new Date()
    })
  }
</script>
