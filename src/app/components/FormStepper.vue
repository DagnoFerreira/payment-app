<template>
  <div class="form-stepper">
    <div class="form-stepper-navigation">
      <button
        class="form-stepper-action"
        type="button"
        v-for="(step, counter) in steps"
        :key="step.target"
        :class="{ 'active': currentTarget === step.target }"
        @click="changeStep(step.target)">
        <span class="form-stepper-indicator">{{ counter + 1 }}</span>
        <span class="form-stepper-label">{{ step.name }}</span>
      </button>
    </div>

    <div class="form-stepper-content" ref="stepperContent">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';

  .form-stepper-navigation {
    margin-right: $baseline-space;
  }

  .form-stepper-navigation {
    height: 64px;
    display: flex;
    overflow: hidden;
    border: 1px solid $color-dark-grey;
    border-radius: 3px;
    background-color: $color-grey;
  }

  .form-stepper-action {
    padding: $baseline-space;
    flex: 1;
    position: relative;
    border: none;
    background-color: $color-grey;
    transition: background-color .4s $transition-ease-out;
    text-align: left;

    &:focus {
      outline: none;
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
    }
  }

  .form-stepper-content {
    margin-top: $baseline-space;
    position: relative;
  }

  .form-step {
    height: 0;
    overflow: hidden;
    opacity: 0;

    &.active {
      height: 600px;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      opacity: 1;
      transition: opacity .5s $transition-ease-out;
    }
  }
</style>

<script>
  export default {
    name: 'form-stepper',
    props: ['steps'],
    data() {
      return {
        currentTarget: this.steps[0].target
      }
    },
    methods: {
      setActiveStep(target) {
        const step = this.$refs.stepperContent.querySelector(target)

        this.currentTarget = target

        if (step) {
          step.classList.add('active')
        }
      },
      changeStep(target) {
        const steps = this.$refs.stepperContent.querySelectorAll('.form-step')

        Array.from(steps).forEach((step) => {
          step.classList.remove('active')
        })

        this.setActiveStep(target)
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setActiveStep(this.steps[0].target)
      })
    }
  }
</script>
