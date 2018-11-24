define([
  'common',
], function (common) {
  new Vue({
    el: '#app',
    data() {
      const self = this;
      return {
        /* max: 100,
        min: 0 */
        show2: false,
        show3: false,
        swipe: {
          current: 0,
          onChange(index) {
            self.swipe.current = index;
          }
        }
      }
    },
    methods: {},
    mounted() {}
  });  
});