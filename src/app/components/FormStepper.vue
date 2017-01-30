<template>
  <div class="form-stepper">
    <div class="form-stepper-navigation">
      <button
        class="form-stepper-action"
        type="button"
        v-for="(step, counter) in steps"
        :key="step.target"
        :class="getActionClasses(counter + 1)"
        :disabled="lastCompleted < counter + 1"
        @click="changeStep(counter)">
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

  .form-stepper {
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
    padding: $baseline-space / 2 $baseline-space;
    flex: 1;
    position: relative;
    border: none;
    background-color: $color-grey;
    transition: .4s $transition-ease-out;
    transition-property: background-color, color;
    color: #ccc;
    font-size: 13px;
    text-align: left;

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

      .form-stepper-indicator {
        background-color: $color-neutral;
        font-size: 18px;
      }
    }

    &.completed {
      color: $color-positive;

      .form-stepper-indicator {
        background-color: $color-positive;
      }
    }
  }

  .form-stepper-indicator {
    $size: 32px;

    width: $size;
    height: $size;
    margin-right: 4px;
    display: inline-block;
    background-color: #ccc;
    border-radius: 100%;
    transition: .4s $transition-ease-out;
    transition-property: background-color, color;
    color: #fff;
    line-height: $size;
    text-align: center;
  }

  .form-stepper-content {
    margin-top: $baseline-space;
    position: relative;
  }

  .form-step {
    height: 0;
    overflow: hidden;
    opacity: 0;

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
    }
  }
</style>

<script>
  export default {
    name: 'form-stepper',
    props: {
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
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.setActiveStep(this.lastCompleted - 1 || 0)
      })
    }
  }
</script>
