<template>
  <div class="cart">
    <div class="cart-header">
      <span>Powered by</span>
      <img src="assets/logo-hotmart.png" alt="Hotmart">
    </div>

    <div class="cart-content">
      <span class="cart-security-badge">Compra 100% Segura</span>
      <div class="cart-change-country">
        <a href="#">Alterar País</a>
      </div>

      <div class="cart-product">
        <h1 class="cart-product-name">{{ product.productName }}</h1>
        <p class="cart-product-disclaimer">Este é um produto digital, você receberá os dados para acessá-lo via internet.</p>

        <div class="cart-product-info">
          <img src="https://test-hotmart.s3.amazonaws.com/product_pictures/3d3f188a-b637-427f-900d-06ec9a2bf96a/lunchtime.jpeg" class="cart-product-image" alt="Teste Hotpay">

          <div class="cart-product-author">
            <div><strong>Autor</strong>: {{ product.authorName }}</div>
            <a :href="'mailto:' + product.authorEmail">Contato do vendedor</a>
          </div>
        </div>
      </div>

      <div class="cart-payment">
        <strong class="cart-payment-price">{{ productPayment.offerFullPrice.label }}</strong>

        <div class="cart-payment-discount">
          <a href="">Possui um cupom de desconto?</a>
        </div>

        <div class="cart-payment-creditcard">
          <img src="assets/icon-master.png" alt="MasterCard" title="MasterCard">
          <img src="assets/icon-visa.png" alt="Visa" title="Visa">
          <img src="assets/icon-amex.png" alt="American Express" title="American Express">
          <img src="assets/icon-elo.png" alt="Elo" title="Elo">
          <img src="assets/icon-hipercard.png" alt="Hipercard" title="Hipercard">
          <img src="assets/icon-diners.png" alt="Diners" title="Diners">
        </div>

        <div class="cart-payment-direct">
          <img src="assets/icon-boleto.png" alt="Boleto" title="Boleto">
          <img src="assets/icon-paypal.png" alt="PayPal" title="PayPal">
        </div>

        <p class="cart-payment-disclaimer">Hotmart está processando este pedido à serviço de Amazing W., ao prosseguir você está concordando com os <a href="">Termos de compra</a></p>

        <p class="cart-payment-installment">*Parcelamento com tarifa de 2.49% a.m</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';

  .cart {
    max-width: 350px;
    border-radius: 3px;
    border: 1px solid $color-dark-grey;
    color: #999;
  }

  .cart-header {
    height: 64px;
    padding: $baseline-space;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: $color-grey;
    border-bottom: 1px solid $color-dark-grey;
    color: #bbb;
    text-align: right;
    text-transform: uppercase;

    span {
      margin: 6px 8px 0;
      font-size: 10px;
    }

    img {
      opacity: .3;
    }
  }

  .cart-content {
    padding: 0 $baseline-space $baseline-space;
    position: relative;
    font-size: 12px;
  }

  .cart-security-badge {
    padding: $baseline-space / 2 16px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: $color-positive;
    transform: translate(-$baseline-space / 2, -$baseline-space / 2);
    color: #fff;
    font-size: 13px;
    font-weight: 700;

    &:before {
      position: absolute;
      bottom: -$baseline-space / 2;
      left: 0;
      border: 0 solid transparent;
      border-top: $baseline-space / 2 solid #56a03f;
      border-bottom: $baseline-space / 2;
      border-left-width: $baseline-space / 2;
      content: " ";
    }

    &:after {
      width: 16px;
      height: 16px;
      margin-left: 8px;
      display: inline-block;
      background: url(~assets/icon-lock.svg) no-repeat center;
      background-size: 100%;
      content: " ";
      vertical-align: sub;
    }
  }

  .cart-change-country {
    text-align: right;

    a {
      padding: 6px 0;
      display: inline-block;
      position: relative;
      vertical-align: middle;

      &:after {
        width: 16px;
        height: 16px;
        margin-left: 5px;
        display: inline-block;
        background: url(~assets/icon-earth.svg) no-repeat center;
        background-size: 100%;
        opacity: .45;
        content: " ";
        vertical-align: sub;
      }
    }
  }

  .cart-product + .cart-payment {
    margin-top: 40px;
    padding-top: 40px;
    position: relative;
    border-top: 1px solid $color-dark-grey;

    &:before {
      $size: 18px;

      width: $size;
      height: $size;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #999;
      border-radius: 100%;
      color: #fff;
      content: " $ ";
      font-size: 14px;
      font-weight: 700;
      line-height: $size;
      text-align: center;
    }
  }

  .cart-product-name {
    color: #555;
    font-size: 22px;
  }

  .cart-product-disclaimer {
    font-size: 14px;
  }

  .cart-product-info {
    display: flex;
  }

  .cart-product-image {
    width: 40px;
    max-height: 40px;
    margin-right: 8px;
    border-radius: 3px;
    border: 1px solid $color-dark-grey;
  }

  .cart-product-author {
    display: flex;
    flex-direction: column;
    color: #999;
  }

  .cart-payment-price {
    color: #555;
    font-size: 26px;
  }

  .cart-payment-discount {
    margin: 16px 0;

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

  .cart-payment-creditcard,
  .cart-payment-direct {
    img {
      height: 21px;

      + img {
        margin-left: 6px;
      }
    }
  }

  .cart-payment-creditcard {
    margin-top: 20px;
  }

  .cart-payment-direct {
    margin-top: 10px;
  }
</style>

<script>
  import PaymentService from 'services/PaymentService'

  export default {
    name: 'cart',
    computed: {
      payment() {
        return PaymentService.info
      },
      product() {
        return PaymentService.info.products && PaymentService.info.products[0]
      },
      productPayment() {
        return this.product && this.product.offer.paymentInfoResponse
      }
    }
  }
</script>
