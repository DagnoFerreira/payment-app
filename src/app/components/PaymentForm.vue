<template>
  <form class="payment-form" novalidate @submit.stop.prevent="validatePaymentData" ref="form">
    <payment-stepper :disabled="!hasStepper" :steps="steps" :last-completed="currentStep" @change="onStepChange">
      <div class="form-step form-personal-data" id="personal-data">
        <div class="form-group">
          <div class="form-row">
            <div class="form-field form-field-50">
              <label for="first-name">Nome</label>
              <input type="text" name="first-name" id="first-name" placeholder="Digite seu nome" v-model="formData.firstName" :class="getFormClasses('firstName', 'firstStep')" @change="$v.formData.firstName.$touch">
            </div>

            <div class="form-field form-field-50">
              <label for="last-name">Sobrenome</label>
              <input type="text" name="last-name" id="last-name" placeholder="Digite seu sobrenome" v-model="formData.lastName" :class="getFormClasses('lastName', 'firstStep')" @change="$v.formData.lastName.$touch">
            </div>
          </div>

          <div class="form-field" v-if="productCustomization.requestBuyerAddress">
            <label for="address">Endereço</label>
            <input type="text" name="address" id="address" placeholder="Digite o seu endereço completo" v-model="formData.address">
          </div>

          <div class="form-row">
            <div class="form-field form-field-50">
              <label for="email">Seu Email</label>
              <input type="email" name="email" id="email" placeholder="Digite o e-mail que receberá o produto" v-model="formData.email" :class="getFormClasses('email', 'firstStep')" @change="$v.formData.email.$touch">
            </div>

            <div class="form-field form-field-50" v-if="productCustomization.requiredPhoneOnBuy">
              <label for="phone">Telefone</label>
              <div class="form-field-wrapper">
                <input type="tel" name="phonePrefix" id="phonePrefix" class="small" maxlength="2" placeholder="**" v-only-number v-model="formData.phonePrefix" :class="getFormClasses('phonePrefix', 'firstStep')" @change="$v.formData.phonePrefix.$touch">
                <input type="tel" name="phone" id="phone" maxlength="9" placeholder="Somente números" v-only-number v-model="formData.phone" :class="getFormClasses('phone', 'firstStep')" @change="$v.formData.phone.$touch">
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-field form-field-33" v-if="productCustomization.requiredCpfOnBuy">
              <label for="document">CPF/CNPJ</label>
              <a href="" class="form-field-link">Por quê?</a>
              <input type="tel" name="document" id="document" maxlength="14" placeholder="Somente números" v-only-number v-model="formData.document" :class="getFormClasses('document', 'firstStep')" @change="$v.formData.document.$touch">
            </div>

            <div class="form-field form-field-33">
              <label for="cep">CEP</label>
              <a href="" class="form-field-link">Não sei meu CEP?</a>
              <input type="tel" name="cep" id="cep" maxlength="8" placeholder="Buscar CEP" v-only-number v-model="formData.cep" :class="getFormClasses('cep', 'firstStep')" @change="$v.formData.cep.$touch">
            </div>
          </div>

          <div class="form-button" v-if="hasStepper">
            <button type="button" class="button" @click="validatePersonalData">Próximo Passo</button>
          </div>
        </div>
      </div>

      <payment-coupon-code v-if="hasCouponCode" />

      <div class="form-step form-payment-data" id="payment-data">
        <p class="payment-options-label" v-if="hasStepper">Selecione a forma de pagamento abaixo</p>

        <div class="payment-toggle">
          <button type="button" class="button button-clean button-credit-card" :class="{ 'active': paymentSelected === 'CREDIT_CARD' }" @click="setSelectedPayment('CREDIT_CARD')" v-if="productCustomization.offerCreditCard">
            <span>Cartão de Crédito</span>
          </button>

          <button type="button" class="button button-clean button-billet" :class="{ 'active': paymentSelected === 'BILLET' }" @click="setSelectedPayment('BILLET')" v-if="productCustomization.offerBillet">
            <span>Boleto</span>
          </button>

          <button type="button" class="button button-clean button-paypal" :class="{ 'active': paymentSelected === 'PAYPAL' }" @click="setSelectedPayment('PAYPAL')" v-if="productCustomization.offerPaypal">
            <span>PayPal</span>
          </button>

          <button type="button" class="button button-clean button-debit" :class="{ 'active': paymentSelected === 'DIRECT_BEBIT' }" @click="setSelectedPayment('DIRECT_BEBIT')" v-if="productCustomization.offerDirectDebit">
            <span>Débito Bancário</span>
          </button>
        </div>

        <div class="payment-options">
          <transition name="fade">
            <div class="payment-type payment-credit-card" v-show="paymentSelected === 'CREDIT_CARD'" v-if="productCustomization.offerCreditCard">
              <div class="form-group">
                <div class="form-field">
                  <label for="card-number">Número do cartão</label>
                  <input type="tel" name="card-number" id="card-number" placeholder="Digite somente números" v-model="formData.cardNumber" :class="getFormClasses('cardNumber', 'secondStep')" @change="$v.formData.cardNumber.$touch">
                </div>

                <div class="form-field">
                  <label for="card-name">Nome no cartão</label>
                  <input type="text" name="card-name" id="card-name" placeholder="Digite o nome impresso no cartão" v-model="formData.cardName" :class="getFormClasses('cardName', 'secondStep')" @change="$v.formData.cardName.$touch">
                </div>

                <div class="form-row">
                  <div class="form-field form-field-50">
                    <label class="small" for="card-expiry-month">Data de validade</label>
                    <div class="form-field-wrapper">
                      <div>
                        <input type="tel" name="card-expiry-month" id="card-expiry-month" maxlength="2" placeholder="**" v-only-number v-model="formData.cardExpiryMonth" :class="getFormClasses('cardExpiryMonth', 'secondStep')" @change="$v.formData.cardExpiryMonth.$touch">
                      </div>

                      <div>
                        <input type="tel" name="card-expiry-year" id="card-expiry-year" maxlength="2" placeholder="**" v-only-number v-model="formData.cardExpiryYear" :class="getFormClasses('cardExpiryYear', 'secondStep')" @change="$v.formData.cardExpiryYear.$touch">
                      </div>
                    </div>
                  </div>

                  <div class="form-field form-field-50">
                    <label class="small" for="card-cvc">Código de segurança</label>
                    <input type="tel" name="card-cvc" id="card-cvc" maxlength="4" placeholder="3 ou 4 números" v-only-number v-model="formData.cardCvc" :class="getFormClasses('cardCvc', 'secondStep')" @change="$v.formData.cardCvc.$touch">
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-field">
                    <label for="card-installment">Parcelamento</label>
                    <select name="card-installment" id="card-installment" v-only-number v-model="formData.cardInstallment" :class="getFormClasses('cardInstallment', 'secondStep')" @change="$v.formData.cardInstallment.$touch">
                      <option v-for="(installment, key) in productInstallments" :key="key" :value="installment.installmentNumber" v-if="enableInstallment(installment)">{{ getInstallmentLabel(installment.installmentNumber, key) }}</option>
                    </select>
                  </div>
                </div>
              </div>

              <div class="payment-credit-card-holder" ref="card" v-if="hasCard"></div>
            </div>
          </transition>

          <transition name="fade">
            <div class="payment-type payment-billet" v-show="paymentSelected === 'BILLET'" v-if="productCustomization.offerBillet">
              <h2>Fique atento(a) aos detalhes:</h2>

              <ul>
                <li>Boleto (somente à vista)</li>
                <li>Pagamentos com Boleto Bancário levam <b>até 3 dias úteis</b> para serem compensados e então terem os produtos liberados</li>
                <li>Fique atento(a) ao vencimento do boleto. Você pode pagar o boleto em qualquer banco ou casa lotérica até o dia do vencimento</li>
                <li>Depois do pagamento, fique atento ao seu e-mail para receber os dados de acesso ao produto (verifique também a caixa de SPAM)</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div class="payment-type payment-paypal" v-show="paymentSelected === 'PAYPAL'" v-if="productCustomization.offerPaypal">
              <h2>Clique no botão abaixo para ser redirecionado para o PayPal e fique atento(a) aos detalhes:</h2>

              <ul>
                <li>O PayPal aceita apenas pagamentos com cartão de crédito MasterCard, Visa ou Amex.</li>
                <li>Após o pagamento, fique atento ao seu e-mail para receber os dados de acesso ao produto (verifique também a caixa de SPAM)</li>
              </ul>
            </div>
          </transition>

          <transition name="fade">
            <div class="payment-type payment-bank" v-show="paymentSelected === 'DIRECT_BEBIT'" v-if="productCustomization.offerDirectDebit">
              <h2>Fique atento(a) aos detalhes:</h2>

              <div align="center">
                <span class="beta-icon-logo-bb" title="Banco do Brasil"></span>
                <span class="beta-icon-logo-itau" title="Banco Itaú"></span>
                <span class="beta-icon-logo-bradesco" title="Banco Bradesco"></span>
                <span class="beta-icon-logo-banrisul" title="Banco Banrisul"></span>
              </div>

              <ul>
                <li>Ao prosseguir com esta opção, você será redirecionado para uma página segura de pagamentos via transferência bancária.</li>
                <li>Nesta página, você deverá efetuar o pagamento em até 20 minutos após o redirecionamento.</li>
                <li>Você também receberá instruções de pagamento, e deve inserir seus dados de acordo com o que for solicitado.</li>
              </ul>
            </div>
          </transition>
        </div>

        <div class="payment-price" v-if="hasPrice">
          <strong class="payment-price-label">Preço</strong>
          <strong class="payment-price-value">{{ productPrice }}</strong>
        </div>

        <div class="form-button">
          <button type="submit" class="button">
            <span v-if="paymentSelected === 'CREDIT_CARD'">Comprar Agora</span>
            <span v-if="paymentSelected === 'BILLET'">Gerar Boleto</span>
            <span v-if="paymentSelected === 'PAYPAL'">Pagar com PayPal</span>
            <span v-if="paymentSelected === 'DIRECT_BEBIT'">Ir para site de pagamento</span>
          </button>
        </div>
      </div>

      <div class="form-step user-feedback" id="user-feedback" v-if="submitSuccess">
        <div class="payment-success">
          <h3 class="payment-success-title">Pagamento efetuado com sucesso!</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore, quae, libero. Consequuntur deleniti maiores, veritatis?</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio aperiam, quidem voluptatem, tempore itaque, amet et ab, odit vitae id vel consectetur.</p>

          <button type="button" class="button button-secondary" @click="reloadApp">Ação 1</button>
          <a href="" class="button" @click="reloadApp">Ação 2</a>
        </div>
      </div>
    </payment-stepper>
  </form>
</template>

<style lang="scss">
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-options {
    .jp-card-container {
      @include breakpoint-xsmall {
        width: 100%;
      }
    }

    .jp-card {
      @include breakpoint-xsmall {
        min-width: 100%;
      }

      .jp-card-front,
      .jp-card-back {
        background-color: #7c7c7c;

        .jp-card-shiny {
          background-color: #a8a8a8;
        }

        .jp-card-display,
        .jp-card-lower .jp-card-expiry:before,
        .jp-card-lower .jp-card-expiry:after {
          opacity: .7;
        }
      }

      .jp-card-name {
        padding-right: 8px;
        white-space: inherit;
      }
    }
  }
</style>

<style lang="scss" scoped>
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-options-label {
    margin-top: 0;
    margin-bottom: 60px;
    font-size: 20px;
    text-align: center;
  }

  .payment-coupon-code {
    margin: $baseline-space * 2 0;
  }

  .payment-toggle {
    padding-bottom: $baseline-space * 2 + 1px;
    display: flex;
    overflow: hidden;

    .button {
      padding: $baseline-space;
      display: flex;
      justify-content: center;
      flex: 1;
      border: 1px solid $color-dark-grey;
      border-radius: 3px;
      box-shadow: inset 0 0 0 0 $color-neutral;
      transition: .5s $transition-ease-out;

      @include breakpoint-xsmall {
        padding: $baseline-space / 2;
        font-size: 12px;
      }

      &:hover,
      &:focus {
        border-color: $color-neutral;
        background-color: rgba($color-neutral, .1);
      }

      + .button {
        margin-left: $baseline-space;

        @include breakpoint-xsmall {
          margin-left: $baseline-space / 2;
        }
      }

      &.active {
        border-color: $color-neutral;
        box-shadow: inset 0 0 0 1px $color-neutral;

        &:before,
        &:after {
          transform: translate3d(0, 0, 0);
        }
      }

      &:before,
      &:after {
        margin-left: -15px;
        position: absolute;
        left: 50%;
        border: 15px solid transparent;
        border-top: 0;
        content: '';
        transform: translate3d(0, 100%, 0);
        transition: .5s $transition-ease-out;

        @include breakpoint-xsmall {
          display: none;
        }
      }

      &:before {
        border-bottom-color: #fff;
        bottom: -43px;
        z-index: 1;
      }

      &:after {
        border-bottom-color: $color-dark-grey;
        bottom: -41px;
      }

      span {
        display: inline-flex;
        align-items: center;
        text-align: left;

        @include breakpoint-small {
          text-align: center;
        }

        &:before {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          display: inline-block;
          background: no-repeat center;
          background-size: 100%;
          opacity: .45;
          content: " ";
          vertical-align: middle;

          @include breakpoint-small {
            display: none;
          }
        }
      }
    }

    .button-credit-card span:before {
      background-image: url(~assets/icon-card.svg);
    }

    .button-billet span:before {
      background-image: url(~assets/icon-barcode.svg);
    }

    .button-paypal span:before {
      background-image: url(~assets/icon-paypal-alt.png);
    }

    .button-debit span:before {
      background-image: url(~assets/icon-transfer.svg);
    }
  }

  .payment-options {
    margin-top: -1px;
    padding: $baseline-space;
    border: 1px solid $color-dark-grey;
    border-radius: 3px;

    @include breakpoint-xsmall {
      border: none;
      padding: 0;
    }

    .form-group {
      padding-left: 0;

      @include breakpoint-xsmall {
        padding-right: 0;
      }
    }
  }

  .payment-type {
    transition: opacity .7s $transition-ease-out;

    &.fade-leave-active {
      display: none;
    }

    &.fade-enter {
      opacity: 0;
      transform: translateZ(0);
    }

    h2 {
      margin-top: 0;
      font-size: 20px;
      line-height: 1.2em;
    }

    ul {
      font-size: 14px;
      line-height: 1.5em;

      li + li {
        margin-top: 4px;
      }
    }
  }

  .payment-credit-card {
    display: flex;

    @include breakpoint-small {
      flex-direction: column;
    }

    .form-group {
      flex: 1;
    }
  }

  .payment-credit-card-holder {
    margin-top: 30px;
  }

  .payment-price {
    margin-top: $baseline-space * 2;
    padding-bottom: 8px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dotted $color-dark-grey;
    color: rgba(#000, .87);
    font-size: 16px;
    text-transform: uppercase;
  }

  .payment-price-label {
    color: #999;
  }

  .payment-success {
    max-width: 500px;
    margin: auto;
    padding: $baseline-space * 2;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    background-color: #fff;
    text-align: center;
  }
</style>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email, minLength } from 'vuelidate/lib/validators'
  import CPF from 'gerador-validador-cpf'
  import CardValidator from 'card-validator'
  import Card from 'card'
  import PaymentService from 'services/PaymentService'

  export default {
    name: 'payment-form',
    props: {
      hasStepper: Boolean,
      hasCouponCode: Boolean,
      hasPrice: Boolean,
      hasCard: Boolean
    },
    mixins: [validationMixin],
    data() {
      return {
        steps: [
          {
            name: 'Dados Pessoais',
            target: '#personal-data'
          },
          {
            name: 'Pagamento',
            target: '#payment-data'
          },
          {
            name: 'Obrigado!',
            target: '#user-feedback'
          }
        ],
        currentStep: 1,
        creditCardIntance: null,
        paymentSelected: 'CREDIT_CARD',
        formData: {
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          phone: '',
          phonePrefix: '',
          document: '',
          cep: '',
          cardNumber: '',
          cardName: '',
          cardExpiryMonth: '',
          cardExpiryYear: '',
          cardCvc: '',
          cardInstallment: 1
        },
        submitSuccess: false
      }
    },
    computed: {
      payment() {
        return PaymentService.info
      },
      product() {
        return PaymentService.product
      },
      productPayment() {
        return PaymentService.productPayment
      },
      productPrice() {
        return PaymentService.productPrice
      },
      productInstallments() {
        return PaymentService.productInstallments
      },
      productCustomization() {
        return PaymentService.productCustomization
      }
    },
    validations: {
      firstStep: [
        'formData.firstName',
        'formData.lastName',
        'formData.email',
        'formData.phonePrefix',
        'formData.phone',
        'formData.document',
        'formData.cep'
      ],
      secondStep: [
        'formData.cardNumber',
        'formData.cardName',
        'formData.cardExpiryMonth',
        'formData.cardExpiryYear',
        'formData.cardCvc',
        'formData.cardInstallment'
      ],
      formData: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        email: {
          required,
          email
        },
        phonePrefix: {
          required
        },
        phone: {
          required
        },
        document: {
          required
        },
        cep: {
          required
        },
        cardNumber: {
          required
        },
        cardName: {
          required
        },
        cardExpiryMonth: {
          required
        },
        cardExpiryYear: {
          required
        },
        cardCvc: {
          required
        },
        cardInstallment: {
          required
        }
      }
    },
    methods: {
      onStepChange(step) {
        this.currentStep = step
      },
      getFormClasses(field, step) {
        const source = this.$v[step]['formData.' + field]

        if (source) {
          return {
            valid: !source.$invalid,
            invalid: source.$dirty && source.$invalid
          }
        }

        return ''
      },
      enableInstallment(installment) {
        return +installment.offerInstallmentPrice.value > +this.productCustomization.minPaymentperCreditCard.value
      },
      getInstallmentLabel(number, index) {
        let label = number + ' parcela'

        if (+number > 1) {
          label += 's'
        }

        label += ' - ' + this.productInstallments[index].offerInstallmentPrice.label

        return label
      },
      validatePersonalData() {
        const source = this.$v.firstStep

        if (!source.$invalid) {
          window.ht('send', 'checkoutFirstStep');
          this.currentStep = 2
        }

        source.$touch()

        return true
      },
      validatePaymentData() {
        const source = this.$v.secondStep

        if (this.validatePersonalData() && (!source.$invalid || this.paymentSelected !== 'CREDIT_CARD')) {
          this.submitFormData()
        }

        source.$touch()
      },
      submitFormData() {
        const data = {
          checkoutToken: this.payment.checkoutToken,
          shopper: {
            name: this.formData.firstName + ' ' + this.formData.lastName,
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            email: this.formData.email,
            document: this.formData.document,
            ddd: this.formData.phonePrefix,
            phone: this.formData.phone
          },
          paymentProfile: {
            paymentType: this.paymentSelected,
            currency: this.productPayment.offerCurrencyCode,
            creditCards: [
              {
                installments: this.formData.cardInstallment,
                cardBinCode: '525663'
              }
            ]
          },
          items: [
            {
              productName: this.product.productName,
              price: this.productPrice,
              payload: '{"offerCode":"3ie02n3c","affiliations":[{"reference":"G4370575B"}]}'
            }
          ]
        };

        this.$http.post('payment', data).then(response => {
          if (response.data.status === 'ok') {
            window.ht('send', 'checkoutFinal', data);
            this.submitSuccess = true
            this.currentStep = 3
          }
        })
      },
      reloadApp() {
        window.location.reload()
      },
      setSelectedPayment(method) {
        this.paymentSelected = method;
        window.ht('send', 'selectPaymentMethod', method);
      }
    },
    mounted() {
      if (this.hasCard) {
        this.$nextTick(() => {
          this.creditCardIntance = new Card({
            form: this.$refs.form,
            container: this.$refs.card,
            formSelectors: {
              numberInput: '#card-number',
              nameInput: '#card-first-name',
              expiryInput: '#card-expiry-month, #card-expiry-year',
              cvcInput: '#card-cvc'
            },
            messages: {
              validDate: 'valido\naté',
              monthYear: 'mês/ano'
            },
            placeholders: {
              number: '•••• •••• •••• ••••',
              name: 'Seu nome',
              expiry: '••/••••',
              cvc: '•••'
            }
          })
        })
      }
    }
  }
</script>
