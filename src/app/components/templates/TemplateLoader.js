import PaymentService from 'services/PaymentService'

export default function(resolve) {
  const templateName = window.location.hash.replace('#', '')
  let template
  let resource

  if (templateName === 'mobile') {
    template = require('./Mobile')
    resource = 'loadMobile'
  } else if (templateName === 'custom') {
    template = require('./Custom')
    resource = 'loadCustom'
  } else {
    template = require('./Default')
    resource = 'loadDefault'
  }

  PaymentService.fetchPaymentData(resource).then(response => {
    PaymentService.info = response.data

    resolve({
      name: 'template',
      render: mount => mount(template),
      mounted() {
        this.$emit('resolved', template.name)
      }
    })
  })
}
