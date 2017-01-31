<template>
  <div class="payment-default">
    <div class="form-content">
      <payment-form has-stepper has-card />
      <payment-footer />
    </div>

    <payment-cart has-coupon-code />
  </div>
</template>

<style lang="scss">
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-default {
    display: flex;
    align-items: flex-start;

    @include breakpoint-medium {
      flex-direction: column;
    }

    .payment-cart {
      margin-left: $baseline-space;

      @include breakpoint-medium {
        width: 100%;
        max-width: none;
        margin-bottom: $baseline-space;
        margin-left: 0;
      }
    }

    .cart-content {
      display: flex;
      flex-direction: column;

      @include breakpoint-medium {
        flex-direction: row;
      }

      @include breakpoint-small {
        flex-direction: column;
      }
    }

    .cart-product + .cart-payment {
      @include breakpoint-medium {
        margin-top: 0;
        padding-top: 0;
        margin-left: $baseline-space * 2;
        padding-left: $baseline-space * 2;
        border-top: none;
        border-left: 1px solid $color-dark-grey;

        &:before {
          top: 50%;
          left: 0;
        }
      }

      @include breakpoint-small {
        margin-top: $baseline-space * 2;
        padding-top: $baseline-space * 2;
        margin-left: 0;
        padding-left: 0;
        border-top: 1px solid $color-dark-grey;
        border-left: none;

        &:before {
          top: 0;
          left: 50%;
        }
      }
    }

    .form-content {
      flex: 1;

      @include breakpoint-medium {
        width: 100%;
        order: 2;
      }
    }
  }
</style>

<script>
  export default {
    name: 'payment-default'
  }
</script>
