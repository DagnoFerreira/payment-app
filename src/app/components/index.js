import Vue from 'vue'

/* Components */
import TemplateLoader from './templates/TemplateLoader'
import FormStepper from './FormStepper'
import PaymentCart from './PaymentCart'
import PaymentForm from './PaymentForm'
import PaymentFooter from './PaymentFooter'

Vue.component('template-loader', TemplateLoader)
Vue.component('form-stepper', FormStepper)
Vue.component('payment-cart', PaymentCart)
Vue.component('payment-form', PaymentForm)
Vue.component('payment-footer', PaymentFooter)
