// var str = 'distJs' || 'js';

// var vueUrl = '/quote/vue.min';
var urlArgs = 'v=2';
/* if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  vueUrl = 'js/quote/vue.dev';
  urlArgs = 'v=' + parseInt(Math.random() * 10000);
} */
var baseUrl = '/PublicMob/js/';
requirejs.config({
  // baseUrl: '/PublicMob/js',
  urlArgs: urlArgs, // 加版本号
  paths: {
    // vue: 'js/quote/vue',
    // vue: 'js/quote/vue.dev',
    vue: baseUrl + '/quote/vue.min',
    vant: baseUrl + '/quote/vant.min',
    jq: baseUrl + '/quote/jquery.min',

    vueSlider: baseUrl + '/module/vue-slider',
    
    common: baseUrl + '/script_house',
  },
  map: {
  },
  shim: {
    jq: {exports: '$'},
    vue: {deps: ['jq'], exports: 'vue'},
    vant: { deps: ['vue'], exports: 'vant' },
    vueSlider: { deps: ['vue'] },
    script_house: { deps: ['jq', 'vue', 'vant'], exports: 'common'},
  },
  priority: ['vue']
})