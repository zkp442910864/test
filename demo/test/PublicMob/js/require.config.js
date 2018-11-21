// var str = 'distJs' || 'js';

var config = {
  urlArgs: 'v=1',
  vueUrl: 'quote/vue.min',
  jsBaseUrl: '/demo/test/PublicMob/js/dist/',
  cssBaseUrl: '/demo/test/PublicMob/css/dist/',
  rqBaseUrl: '/demo/test/PublicMob/js'
}

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  config.vueUrl = 'quote/vue';
  config.urlArgs = 'v=' + parseInt(Math.random() * 10000);
  config.jsBaseUrl = '/demo/test/PublicMob/js/page/';
  config.cssBaseUrl = '/demo/test/PublicMob/css/page/';
}

requirejs.config({
  baseUrl: config.rqBaseUrl,
  urlArgs: config.urlArgs,
  paths: {
    vue: config.vueUrl,
    vant: 'quote/vant.min',
    jq: 'quote/jquery.min',

    vueSlider: 'module/vue-slider',
    
    common: 'script_house',
  },
  map: {
    '*': {
      'css': 'quote/require-css.min',
    }
  },
  shim: {
    /* vant: {
      deps: ['css!../css/vant_index', 'vue']
    }, */
    jq: {exports: '$'},
    vue: {deps: ['jq'], exports: 'vue'},
    vant: { deps: ['vue'], exports: 'vant' },
    vueSlider: { deps: ['vue'] },
    script_house: { deps: ['jq', 'vue', 'vant'], exports: 'common'},
  },
  priority: ['vue']
})