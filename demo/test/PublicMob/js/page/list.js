define([
  'common',
  'vueSlider'
], function (common) {
  new Vue({
    el: '#app',
    data() {
      const self = this;
      return {
        /* max: 100,
        min: 0 */
        list: [1],
        loading: false,
        finished: false,
        sort1: {
          open: false,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }],
          commitData: {},
          sliderVal (min, max, total) {
            self.$set(self.sort1.commitData, 'cur', undefined);
            self.sort1.commitData.min = min;
            self.sort1.commitData.max = max;
          },
          resetFun () {
            self.$set(self.sort1, 'commitData', {});
            self.$refs.slBlock.myDefault();
          }
        },
        sort2: {
          open: true,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }],
          cur: undefined
        }
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