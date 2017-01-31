import Vue from 'vue'

const PaymentService = new Vue({
  data: () => ({
    info: {}
  }),
  computed: {
    payment() {
      return this.info
    },
    product() {
      return this.info.products && this.info.products[0]
    },
    productPayment() {
      return this.product && this.product.offer.paymentInfoResponse
    },
    productCustomization() {
      return this.product && this.product.customizationResponse
    },
    productInstallments() {
      return this.productPayment && this.productPayment.installmentList
    },
    productPrice() {
      return this.productPayment && this.productPayment.offerFullPrice.label
    }
  },
  methods: {
    fetchPaymentData(resource) {
      return this.$http.get(resource, {
        data: null
      })
    }
  }
})

export default PaymentService
