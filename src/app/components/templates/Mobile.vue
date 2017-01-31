<template>
  <div class="payment-mobile">
    <payment-cart />
    <payment-form />
    <payment-footer />
  </div>
</template>

<style lang="sass">
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-mobile {
    border-radius: 3px;
    border: 1px solid $color-dark-grey;

    .payment-cart {
      max-width: none;
      border: none;
    }

    .cart-header {
      display: none;
    }

    .cart-banner {
      padding-top: 25px;
    }

    .cart-security-badge {
      transform: translate(-10px, $baseline-space);
    }

    .cart-content {
      background-color: $color-grey;
    }

    .cart-product-name {
      padding-top: .7em;
    }

    .cart-product-image {
      border-bottom: none;
    }

    .cart-product-author {
      color: #555;
      font-size: 14px;
      font-weight: 500;
    }

    .cart-product-disclaimer,
    .cart-payment-disclaimer {
      display: none;
    }

    .cart-product + .cart-payment {
      margin-top: $baseline-space;
      padding: 0;
      border: none;

      &:before {
        display: none;
      }
    }

    .payment-stepper-content {
      margin: 0;
      padding: $baseline-space;

      @include breakpoint-xsmall {
        padding: $baseline-space / 2;
      }
    }

    .payment-toggle {
      .button {
        @include breakpoint-xsmall {
          padding: 8px;

          + .button {
            margin-left: 8px;
          }
        }
      }
    }
  }
</style>

<script>
  export default {
    name: 'payment-mobile'
  }
</script>
