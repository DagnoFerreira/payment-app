import PaymentService from 'services/PaymentService'

export default function(resolve) {
  setTimeout(() => {
    const templateName = window.location.hash.replace('#', '')
    let template
    let resource

    if (templateName === 'mobile') {
      template = (resolve) => require(['./Mobile'], resolve)
      resource = 'loadMobile'
    } else if (templateName === 'custom') {
      template = (resolve) => require(['./Custom'], resolve)
      resource = 'loadCustom'
    } else {
      template = (resolve) => require(['./Default'], resolve)
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

  }, 1000)
}
