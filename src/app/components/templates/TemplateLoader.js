import Axios from 'axios'
import Default from './Default'
import Mobile from './Mobile'
import Custom from './Custom'
import PaymentService from 'services/PaymentService'

export default function(resolve) {
  setTimeout(() => {
    const templateName = window.location.hash.replace('#', '')
    let template = Default
    let resource = 'loadDefault'

    if (templateName === 'mobile') {
      template = Mobile
      resource = 'loadMobile'
    } else if (templateName === 'custom') {
      template = Custom
      resource = 'loadCustom'
    }

    Axios.get(resource, {
      data: null
    }).then(response => {
      PaymentService.info = response.data

      resolve({
        name: 'app',
        render: mount => mount(template),
        mounted() {
          this.$emit('resolved', template.name)
        }
      })
    })

  }, 1000)
}
