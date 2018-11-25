new Vue({
  el: '#app',
  data: {
    input: '# hello',
    tmp: " "
  },
  computed: {
    compiledMarkdown: function () {
      tmp = marked(this.input, { sanitize: true })
      return tmp
    }
  },
  methods: {

    update:
      _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
    test: function () {
      axios
        .post('http://localhost:8080/rewrite', { user: 'user', context: tmp })
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) })
    }


  }

})