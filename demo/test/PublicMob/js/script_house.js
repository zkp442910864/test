window.onload = function(){
	window.screen.width>1200?'':document.body.style.fontSize = parseInt(window.screen.width/320 * 12) + 'px';
	console.log(document.body.style.fontSize)
	console.log(parseInt(window.screen.width/320 * 12));
}


//处理日期格式
var manage_date = function(d){
	var f_index = d.indexOf('-');
	if(d.indexOf('-') > -1){
		d = d.substr(5);
		d = d.replace('-','月');
		d = d.split('');
		d.push('日');
		d = d.join('');
	}else if(d.indexOf('/') > -1){
		d = d.substr(5);
		d = d.replace('/','月');
		d = d.split('');
		d.push('日');
		d = d.join('');
	}

	return d;
}

//弹窗
var z_alert = function(app){
	/*
		<zalert v-if="is_alert" :alert_title="alert_title" :alert_msg="alert_msg" :isbtn="isbtn"></zalert>
		is_alert:false,    是否弹出窗口
		alert_title:'xxx', 窗口的title
		alert_msg:'ssss',  窗口的msg
		isbtn:0,		   窗口的按钮，默认0，1是一个按钮
		app.alert()		   通过这函数调用
	*/
	var alertfun = '', alertfunClose = '',
		style = `.alert{position: fixed;background: rgba(0, 0, 0, 0.8) none repeat scroll 0 0; width: 100%;height: 100%;top: 0;z-index: 1000;-webkit-transition-duration: 400ms;transition-duration: 400ms;opacity: 0;}
				.alert_show{opacity: 1;}
				.alertbox{background: #fff;width: 70%;margin: 18em auto 0 auto;text-align: center;border-radius: 0.35em;padding-top: 0.3em;overflow: hidden;
					-webkit-transition-duration: 300ms;transition-duration: 300ms;transform: translate3d(0, 0, 0) scale(1.2);-webkit-transform: translate3d(0, 0, 0) scale(1.2);}
				.alertbox_show{transform: translate3d(0, 0, 0) scale(1);-webkit-transform: translate3d(0, 0, 0) scale(1);}
				.alertbox_hide{transform: translate3d(0, 0, 0) scale(.6);-webkit-transform: translate3d(0, 0, 0) scale(.6);opacity:0;}
				.alert_title{padding: .2rem .5em;font-weight: 400;}
				.alert_msg{padding: .4rem .8em;color: #888;}
				.alert_button{position: relative;margin-top: .5em;}
				.alert_button span{color: #666;line-height: 2.6em; display: block;}
				.alert_button::after {content: " ";position: absolute;left: 0;top: 0;width: 100%;height: .05em;border-top: 1px solid #D5D5D6;}
				.alert_button span:nth-child(2)::before {content: " ";position: absolute;left: 50%;top: 0;width: .05em;height: 100%;border-left: 1px solid #D5D5D6;}`;

	$('head').append('<style>'+style+'</style>');

	Vue.component('zalert',{
		props:['alert_title','alert_msg','isbtn', 'no', 'yes'],
		template:`<div class="alert">
					<div class="alertbox">
						<div>
							<h3 class="alert_title" v-html="alert_title"></h3>
							<p class="alert_msg" v-html="alert_msg"></p>
						</div>
						<div class="flex alert_button">
							<span class="f-all-width" @click="close" v-if="!isbtn">{{no || '取消'}}</span>
							<span class="f-all-width" @click="ok">{{yes || '确认'}}</span>
						</div>
					</div>
				</div>`,
		methods:{
			anim:function(){
				$('.alertbox').addClass('alertbox_hide');
				$('.alert').removeClass('alert_show');
				setTimeout(function(){
					app.is_alert = false;
				}, 300);
			},
			close:function(){
				alertfunClose ? alertfunClose(this.anim) : this.anim();
			},
			ok:function(){
				alertfun?alertfun(this.anim):this.anim();
			}
		}

	});

	// app.$data.is_alert = false;
	app.$watch('is_alert',function(){
    	var self = this;
		if(self.is_alert){
			setTimeout(function(){
				$('.alert').addClass('alert_show');
				setTimeout(function(){
					$('.alertbox').addClass('alertbox_show');
				},10);
			},1);
		}
    });

    app.alert = function(title,msg,fun,btn,fun2){
    	this.is_alert = true;
    	this.alert_title = title?title:'提示';
    	this.alert_msg = msg?msg:'提示';
    	// console.log(fun);
    	this.isbtn = btn?btn:0;
			alertfun = fun;
			alertfunClose = fun2;
    }
}

//日历
var calendar = function(){
	/*
		<calendar :cont="['日', '一', '二', '三', '四', '五', '六']" :week_month="week_month"></calendar>
		week_month:[],月份数据
		calendar:'',接收返回对象
		is_sel_week:false,是否显示日期选择框
	 */

 	

	var obj = get_ls_date('date');
	if(!obj){
		var _date = new Date();
		var _date2 = new Date();
		_date2.setDate(_date2.getDate()+1);
		// var hotel_date = {"in_hotel":_date.toLocaleDateString(),"out_hotel":_date2.toLocaleDateString(),"hotel":1};
		set_ls_date({
			in_hotel:_date.getFullYear() + '-' + (_date.getMonth()+1) + '-' + _date.getDate(),
			out_hotel:_date2.getFullYear() + '-' + (_date2.getMonth()+1) + '-' + _date2.getDate(),
			hotel:1
		});
	}

	var style = `#week{text-align: center;position: fixed;height: 100%;width: 100%;z-index: 999999;top: 0;left: 0;}
				#week .day li{width:14.28%;height: 3em;line-height: 3em;}
				#week .cont{padding:.5em 0;}
				#week .cont span{width:14.28%;}
				#week h4{padding:.5em;}

				#week .week_top{background-color: #fff;border-bottom:1px solid #ddd;position: absolute;left:0;top:0;right:0;height: 6em;z-index: 2;}
				#week .week_bottom{background-color: #fff;padding-top: 6.5em;height: 100%;overflow:auto;box-sizing: border-box; }

				#week .week_top .flex h5{padding:1em 0;}
				#week .week_top .flex>i{font-size:1.5em;color:#888;    padding: 0 1em;padding-top:.5em 1em;}
				#week .disabled{color:#ccc;}
				#week .limit{color:#ccc;}
				#week .z_in,.z_out{background-color: #F7AD0E;color:#fff;border-radius:.6em;}
				#week button{position: fixed;width: 100%;bottom: 0;left: 0;margin-left: 0;border-radius: 0;z-index: 1;background: #F7AD0E;color: #fff;border: none;}`;

	$('head').append('<style>'+style+'</style>');

	Vue.component('calendar',{
		props:['cont','week_month'],
		template:`<div id="week">
					<div class="week_top">
						<div class="flex">
							<i class="z_close"><i class="fa fa-close" ></i></i>
							<h5 class="f-all-width week_title">请选择入住时间</h5>
							<i class="z_close"></i>
						</div>
						<div class="flex cont">
							<span v-for="c in cont">{{c}}</span>
						</div>
					</div>
					<div class="week_bottom">
						<div v-for="item in week_month" >
							<h4>{{item.date}}</h4>
							<ul class="flex f-w f-jc-l day">
								<li v-for="(day,index) in item.arr" :class="{disabled:day == 'false'}" :data-date="(day == 'false'||day == '')?'':item.date+'-'+day">{{(day === 'false')?(index+item.flag):day}}</li>
							</ul>
						</div>
					</div>
				</div>`
				//<i class="fa fa-check-square-o"></i>
				//<button class="z_clear zcbtn" style="display:none">重置</button>
	})


	var calendar = {
		date:new Date(),
		arr:[],//所有的数据
		_app:'',//vue
		z_in:'',//入住时间
		z_out:'',//离店时间
		max:'',//做多可连续住多久
		common:0,
		init:function(span,max,_app){
			var year = this.date.getFullYear(),
				month = this.date.getMonth();

			this._app = _app;
			this.arr = _app.week_month;
			this.max = max;
			this.getData(year,month,span);
			this.event();
		},
		event:function(){
			var self = this;

			var reset = function(){
				self.z_in = '';
				self.z_out = '';
				self.common = 0;
				is_title();
				$('.limit').removeClass('limit');
				$('#week').find('li').removeClass('z_in').removeClass('z_out');
			}

			$('#week').on('click','li',function(){
				var _this = $(this);
				if(_this.is('.disabled') || _this.is('.limit') || (self.z_in != '' && self.z_out != '') || _this.text() == ''){
					return;
				}

				if(_this.is('.z_in')){
					_this.removeClass('z_in');
					self.z_in = '';
					$('.limit').removeClass('limit');
					
				}else{
					if(self.z_in == ''){
						_this.addClass('z_in');
						self.z_in = _this.data('date');
						limit();
					}else{
						_this.addClass('z_out');
						self.z_out = _this.data('date');
						common();
						self._app.is_sel_week = false;
						// reset();
						$('.limit').removeClass('limit');
						$('#week').find('li').removeClass('z_in').removeClass('z_out');
						setTimeout(function(){
							self.z_in = '';
							self.z_out = '';
							self.common = 0;
							is_title();
						},500)
					}
				}

				is_title();
			});

			$('#week').on('click','.z_close',function(){
				self._app.is_sel_week = false;
			});

			$('#week').on('click','.z_clear',reset);

			var limit = function(){
				$('[data-date]').each(function(){
					var d = $(this).data('date');
					if(d != self.z_in){
						if(!$(this).is('.disabled') && $(this).text() != ''){
							$(this).addClass('limit');
						}
					}else{
						return false;
					}
				});

				var m = 0;
				$('[data-date]').each(function(){
					var d = $(this).data('date');
					if(!$(this).is('.disabled') && !$(this).is('.limit') && $(this).text() != ''){
						if(m > self.max){
							$(this).addClass('limit');
						}
						m++;
					}
				});
			}

			var common = function(){
				var c = 0;
				$('[data-date]').each(function(){
					var d = $(this).data('date');
					if(!$(this).is('.disabled') && !$(this).is('.limit') && $(this).text() != ''){
						var d = $(this).data('date');
						if(d == self.z_out){
							self.common = c;
							return;
						}
						c++;
					}
				});
			}

			var is_title = function(){
				if(self.z_in == ''){
					$('.week_title').text('请选择入住时间');
				}else if(self.z_out == ''){
					$('.week_title').text('请选择离店时间');
				}
				/*else{
					$('.week_title').text('重选点下角重置');
				}*/

				/*if(self.z_in && self.z_out){
					$('.zcbtn').show();
				}else{
					$('.zcbtn').hide();
				}*/
			}
		},
		getData:function(year,month,span){

			var start = new Date(year,month,1),
				n = 1 - start.getDay(),
				obj = {flag:n};

			var dfm = start.getMonth();

			start = new Date(year,month,n);
			var arr = [];


			for(var i = 0;i < 42;i++){
				var day = start.getDate();
				if(start.getMonth() == this.date.getMonth() && start.getMonth() == dfm){

					if(start.getDate() < this.date.getDate()){
						arr.push('false');
					}else{
						arr.push(day);
						span--;
					}
					
				}else if(start.getMonth() == dfm){
					if(span <= 0){
						arr.push('false');
					}else{
						arr.push(day);
						span--;
					}

				}else{
					arr.push('');
				}
				start.setDate(day+1);
			}
			obj['date'] = year+'-'+(month+1);
			obj['arr'] = arr;
			
			// console.log(obj);
			this.arr.push(obj);
			if(span<=0){
				return;
			}
			this.getData(start.getFullYear(),start.getMonth(),span);
		}
	};


	return calendar;
}

define([
	'vue',
	'vant',
	'jq'
], function (vue, Vant, $) {
	window.Vue = vue;
	window.$ = $;
	Vue.use(Vant);
	// console.log(Vant);

	/* const toast = Vant.Toast.loading({
		duration: 0,       // 持续展示 toast
		forbidClick: true, // 禁用背景点击
		loadingType: 'spinner',
		message: '获取数据中'
	});

	setTimeout(() => {
		toast.clear();
	}, 2000); */

	var common = {
		ajax({ isLoding = true, url = '', data = {}, timeout = '60000', method = 'post', isAction = '', dataType = 'json', errorFun = '', success = '' }) {
			// var l = '';
			let toast = '';
			if (isLoding) {
				toast = Vant.Toast.loading({
					duration: 0,       // 持续展示 toast
					forbidClick: true, // 禁用背景点击
					loadingType: 'spinner',
					message: '获取数据中'
				});
			}
			return $.ajax({
				url: url,
				type: method,
				dataType: dataType,
				data: data,
				timeout: timeout,
				beforeSend: function () {},
				success: function (res) {
					if (toast) toast.clear();
					if (!res) {
						alert('数据异常 -1');
					} else if (res.ErrCode != 0) {
						alert(res.ErrMsg || '数据异常 -1');
					} else if (res.Data.IsError) {
						alert(res.Data.ErrMsg || '数据异常 -1');
					} else if (success) {
						success(res);
					};
				},
				error: function (error) {
					if (toast) toast.clear();
					alert('数据异常 -2');
					if (errorFun) errorFun(error);
				}
			});
		},
		query (name, type = 'query') {
			if (type === 'query') {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]); return null;
			} else if (type === 'params') {
				var reg = new RegExp("(^|\/)" + name + "\/([^\/]*)(\/|$)", "i");
				var r = window.location.pathname.match(reg);
				if (r != null) return unescape(r[2]); return null;
			}
		},
		calendar,
		manage_date
	}

	return common;
});