import Vue from 'vue'

const PaymentService = new Vue({
  data: () => ({
    info: {}
  }),
  methods: {
    fetchPaymentData(resource) {
      return this.$http.get(resource, {
        data: null
      })
    }
  }
})

export default PaymentService
