// var str = 'distJs' || 'js';


var urlArgs = 'v=2';

var baseUrl = '/demo/test/PublicMob/js/';

var vueUrl = baseUrl + '/quote/vue.min';

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  vueUrl = baseUrl + '/quote/vue';
  urlArgs = 'v=' + parseInt(Math.random() * 10000);
}
requirejs.config({
  // baseUrl: '/PublicMob/js',
  urlArgs: urlArgs, // 加版本号
  paths: {
    // vue: 'js/quote/vue',
    // vue: 'js/quote/vue.dev',
    vue: vueUrl,
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