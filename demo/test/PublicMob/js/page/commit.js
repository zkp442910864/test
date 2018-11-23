define([
  'common',
], function (common) {
  new Vue({
    el: '#app',
    data() {
      const self = this;
      return {
        detailBox: {
          open: false,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }]
        },
        timeBox: {
          open: false,
          cur: undefined,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }]
        },
        inBox: {
          open: false,
          cur: undefined,
          list: [{ text: '150以下', value: 1 }, { text: '150-300', value: 2 }, { text: '300-450', value: 3 }]
        }
      }
    },
    methods: {},
    mounted() {}
  });  
});