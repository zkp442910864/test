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
        sort: {
          open: false,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }],
          commitData: {},
          sliderVal (min, max, total) {
            self.$set(self.sort.commitData, 'cur', undefined);
            self.sort.commitData.min = min;
            self.sort.commitData.max = max;
          },
          resetFun () {
            self.$set(self.sort, 'commitData', {});
            self.$refs.slBlock.myDefault()
          }
        }
      }
    },
    methods: {},
    mounted() { }
  });
});