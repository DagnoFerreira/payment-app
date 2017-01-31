<template>
  <div class="payment-stepper" :class="{ 'enabled': !disabled }">
    <div class="payment-stepper-navigation" v-if="!disabled">
      <button
        class="payment-stepper-action"
        type="button"
        v-for="(step, counter) in steps"
        :key="step.target"
        :class="getActionClasses(counter + 1)"
        :disabled="lastCompleted < counter + 1"
        @click="changeStep(counter)">
        <span class="payment-stepper-indicator">{{ counter + 1 }}</span>
        <span class="payment-stepper-label">{{ step.name }}</span>
      </button>
    </div>

    <div class="payment-stepper-content" ref="stepperContent">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  .payment-stepper {
    &.enabled {
      .form-step {
        height: 0;
        overflow: hidden;
        opacity: 0;

        &:empty {
          display: none;
        }

        &:not(.active) {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
        }

        &.active {
          height: auto;
          opacity: 1;
          transition: opacity .5s $transition-ease-out;

          .payment-success {
            position: relative;
          }
        }
      }
    }

    &:not(.enabled) {
      .form-step + .form-step:not(.user-feedback) {
        margin-top: $baseline-space * 2;
      }

      .form-group {
        padding: 0;
      }
    }
  }

  .payment-stepper-navigation {
    min-height: 64px;
    display: flex;
    overflow: hidden;
    border: 1px solid $color-dark-grey;
    border-radius: 3px;
    background-color: $color-grey;
  }

  .payment-stepper-action {
    padding: $baseline-space / 2 $baseline-space;
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
    border: none;
    background-color: $color-grey;
    transition: .4s $transition-ease-out;
    transition-property: background-color, color;
    color: #ccc;
    font-size: 13px;
    text-align: left;

    @include breakpoint-small {
      font-size: 12px;
    }

    @include breakpoint-xsmall {
      padding: $baseline-space / 2;
      flex-direction: column;
      text-align: center;
    }

    &:focus {
      outline: none;
    }

    &:not([disabled]) {
      cursor: pointer;
    }

    &:after,
    &:before {
      border: 15px solid transparent;
      position: absolute;
      top: 1px;
      opacity: 0;
      content: '';
    }

    &.active {
      background-image: linear-gradient(to right, rgba(#fff, 0) 0%, #f8f8f8  100%);
      background-color: #fff;
      color: $color-neutral;
      font-size: 16px;

      @include breakpoint-small {
        font-size: 13px;
      }

      &:after,
      &:before {
        opacity: 1;
        transition: opacity .4s $transition-ease-out;
      }

      &:after {
        border-top: 31px solid $color-grey;
        border-bottom: 31px solid $color-grey;
        border-right: 0;
        right: 0;
        content: '';
      }

      &:before {
        border-top: 31px solid #fff;
        border-bottom: 31px solid #fff;
        left: -15px;
      }

      .payment-stepper-indicator {
        background-color: $color-neutral;
        font-size: 18px;

        @include breakpoint-small {
          font-size: 13px;
        }
      }
    }

    &.completed {
      color: $color-positive;

      .payment-stepper-indicator {
        background-color: $color-positive;
      }
    }
  }

  .payment-stepper-indicator {
    $size: 32px;

    min-width: $size;
    height: $size;
    margin-right: 8px;
    display: inline-block;
    background-color: #ccc;
    border-radius: 100%;
    transition: .4s $transition-ease-out;
    transition-property: background-color, color;
    color: #fff;
    line-height: $size;
    text-align: center;

    @include breakpoint-xsmall {
      $size: 20px;

      min-width: $size;
      height: $size;
      margin-bottom: 8px;
      line-height: $size;
    }
  }

  .payment-stepper-content {
    margin-top: $baseline-space;
    position: relative;
  }
</style>

<script>
  export default {
    name: 'payment-stepper',
    props: {
      disabled: Boolean,
      steps: Array,
      lastCompleted: {
        type: Number,
        default: null
      }
    },
    data() {
      return {
        currentTarget: null
      }
    },
    watch: {
      lastCompleted(activeIndex) {
        this.changeStep(activeIndex - 1)
      }
    },
    methods: {
      getActionClasses(counter) {
        return {
          active: this.currentTarget === counter,
          completed: this.lastCompleted > counter
        }
      },
      setActiveStep(index) {
        if (this.steps[index]) {
          const step = this.$refs.stepperContent.querySelector(this.steps[index].target)

          this.currentTarget = index + 1

          if (step) {
            step.classList.add('active')
          }
        }
      },
      changeStep(index) {
        const steps = this.$refs.stepperContent.querySelectorAll('.form-step')

        Array.from(steps).forEach((step) => {
          step.classList.remove('active')
        })

        this.setActiveStep(index)
        this.$emit('change', index + 1)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setActiveStep(this.lastCompleted - 1 || 0)
      })
    }
  }
</script>
