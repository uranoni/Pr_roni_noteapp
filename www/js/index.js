// 新增vue的實例
new Vue({
  // 新增要控制誰用id來操作
  el: '#app',
  // 資料
  data: {
    //起始值
    input: '# hello',
    tmp: " "
  },
  // 計算功能
  computed: {
    // 轉譯功能的function 吐回到data.tmp
    compiledMarkdown: function () {
      tmp = marked(this.input, { sanitize: true })
      return tmp
    }
  },
  // 方法作用控制function的事件(點擊或是輸入更新)
  methods: {
    //即時更新把左邊的markdown語法轉換到右邊
    update:
      _.debounce(function (e) {
        this.input = e.target.value
      }, 300),
    // 把資料傳到後端
    test: function () {
      // 傳送資料到後端的方法
      // post 後面接url  第二個參數接資料
      
      axios
        .post('http://localhost:8787/rewrite', { user: 'user', context: tmp })
        .then(res => { console.log(res) })
        .catch(err => { console.log(err) })
    }


  }

})