<template>
  <div class="container">
    <transition name="fade">
      <span class="page-loading" v-if="loading">
        <span class="page-loading-spinner"></span>
      </span>
    </transition>

    <template-loader @resolved="loading = false" />
  </div>
</template>

<style lang="scss" scoped>
  @import '~stylesheets/variables';
  @import '~stylesheets/mixins';

  $viewport-size: 1135px;

  .container {
    width: $viewport-size + $baseline-space * 2;
    padding: $baseline-space;
    max-width: 100%;
    margin: 0 auto;

    @include breakpoint-xsmall {
      padding: $baseline-space / 2;
    }
  }

  .page-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(#fff, .4);
    transition: opacity .4s $transition-ease-out;

    &.fade-leave-active {
      opacity: 0;
      transform: scale(1.5) translateZ(0);
    }
  }

  .page-loading-spinner {
    width: 56px;
    height: 56px;
    background-color: #87d66e;
    border-radius: 100%;
    transform: scale(0) translateZ(0);
    animation: page-loading 1s infinite $transition-ease-out;
  }

  @keyframes page-loading {
    to {
      transform: scale(1) translateZ(0);
      opacity: 0;
    }
  }
</style>

<style lang="scss" src="stylesheets/main.scss"></style>

<script>
  export default {
    name: 'app',
    data: () => ({
      loading: true
    })
  }
</script>
