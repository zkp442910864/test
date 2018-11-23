define([
  'common',
], function (common) {
  new Vue({
    el: '#app',
    data() {
      const self = this;
      return {
        list: [1],
        loading: false,
        finished: false,
      }
    },
    methods: {
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;
  
          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      }
    },
    mounted() {}
  });  
});