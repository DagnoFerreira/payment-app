import Vue from 'vue'

/* Components */
import TemplateLoader from './templates/TemplateLoader'
import PaymentStepper from './PaymentStepper'
import PaymentCart from './PaymentCart'
import PaymentCouponCode from './PaymentCouponCode'
import PaymentForm from './PaymentForm'
import PaymentFooter from './PaymentFooter'

Vue.component('template-loader', TemplateLoader)
Vue.component('payment-stepper', PaymentStepper)
Vue.component('payment-cart', PaymentCart)
Vue.component('payment-coupon-code', PaymentCouponCode)
Vue.component('payment-form', PaymentForm)
Vue.component('payment-footer', PaymentFooter)
