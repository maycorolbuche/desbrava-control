const Text = {
  beauty(text) {
    return text?.replace(/\r?\n/g, '<br>').replace(/(^|<br>)(\s*)([a-z]\.)/gi, '$1$2<b>$3</b>')
  },
}

export default Text
