const handler = function() {
  if (/\D/g.test(this.value)) {
    this.value = this.value.replace(/\D/g, '');
  }
}

export default {
  inserted($el) {
    $el.addEventListener('keyup', handler)
    $el.addEventListener('keypress', handler)
    $el.addEventListener('paste', handler)
    $el.addEventListener('contextmenu', handler)
    $el.addEventListener('input', handler)
  },
  unbind($el) {
    $el.removeEventListener('keyup', handler)
    $el.removeEventListener('keypress', handler)
    $el.removeEventListener('paste', handler)
    $el.removeEventListener('contextmenu', handler)
    $el.removeEventListener('input', handler)
  }
}
