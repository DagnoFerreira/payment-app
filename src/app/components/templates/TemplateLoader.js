import PaymentService from 'services/PaymentService'

export default async(resolve) => {
  const templateName = window.location.hash.replace('#', '')
  let template
  let resource

  if (templateName === 'mobile') {
    template = await import('./Mobile')
    resource = 'loadMobile'
  } else if (templateName === 'custom') {
    template = await import('./Custom')
    resource = 'loadCustom'
  } else {
    template = await import('./Default')
    resource = 'loadDefault'
  }

  const payment = await PaymentService.fetchPaymentData(resource)

  PaymentService.info = payment.data

  resolve({
    name: 'template',
    render: mount => mount(template.default),
    mounted() {
      this.$emit('resolved', template.name)
    }
  })
}
