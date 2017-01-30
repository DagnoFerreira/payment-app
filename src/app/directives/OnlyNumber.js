const handler = function() {
  if (/\D/g.test(this.value)) {
    this.value = this.value.replace(/\D/g, '');
  }
}

export default {
  inserted($el) {
    $el.addEventListener('paste', handler)
    $el.addEventListener('contextmenu', handler)
    $el.addEventListener('input', handler)
  },
  unbind($el) {
    $el.removeEventListener('paste', handler)
    $el.removeEventListener('contextmenu', handler)
    $el.removeEventListener('input', handler)
  }
}
