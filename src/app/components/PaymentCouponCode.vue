<template>
  <div class="payment-coupon-code" v-if="productCustomization.showCouponOption">
    <a href="">Possui um cupom de desconto?</a>
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';

  .payment-coupon-code {
    margin: $baseline-space 0;
    font-size: 12px;

    &:before {
      width: 18px;
      height: 18px;
      margin-right: 5px;
      display: inline-block;
      background: url(~assets/icon-coupon.svg) no-repeat center;
      background-size: 100%;
      opacity: .45;
      content: " ";
      vertical-align: middle;
    }
  }
</style>

<script>
  import PaymentService from 'services/PaymentService'

  export default {
    name: 'payment-coupon-code',
    computed: {
      productCustomization() {
        return PaymentService.productCustomization
      }
    }
  }
</script>
