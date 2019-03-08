window.screen.width>1200?'':document.body.style.fontSize = parseInt(window.screen.width/320 * 12) + 'px';//移动适配


//checkbox 复选框的全选
function fun2(father,son){
	$(father).click(function(){
		if($(this).prop('checked')){
			$(this).prop('checked','checked').attr('checked','checked');
			son.prop('checked','checked').attr('checked','checked');
		}else{
			$(this).removeProp('checked').removeAttr('checked');
			son.removeProp('checked').removeAttr('checked');
		}
	});
}


//随机生成字符串
var str = '0123456789';
alert(str.charAt(parseInt(Math.random()*parseInt(str.length)))+str.charAt(parseInt(Math.random()*parseInt(str.length))));



//select控件的使用
var _select= '<select name="" id="a">'
	+ '<option value="1">s1</option>'
	+ '<option value="2">s2</option>'
	+ '<option value="3">s3</option>'
	+ '<option value="4">s4</option>'
	+ '</select>';

document.body.append(_select);
//主要是这部分
document.getElementById('a').onchange = function(){
    this.options//获取到select下所有的option,数组形式
    this.selectedIndex//每个option对应的index
    alert(this.options[this.selectedIndex].value);
}


/**
 * 	<img usemap="#man" ng-src="{{img}}" class="portrait" alt="" id="z-images">
 * 	<map name="man" id="man">
		<area shape="rect" coords="{{calculate('168,56,218,76')}}" ng-click="rq({bodyPart: '眼'})" />
	</map>
 * 计算图片缩放比例，放大缩小图上坐标点
 * 以图片大小为标准
 * 页面显示图片大小为参照物
 * 		大的 / 小的，得到比例
 * 		再去处理坐标点 （注意大于和小于不同的处理方法）
 * @param {*} valstr 
 */
function calculate (valstr) {
	var arr = valstr.split(',');
	$scope.imagesDom = document.getElementById('z-images');

	if (!$scope.imagesDom) {
		return valstr;
	}
	
	var width = $scope.imagesDom.offsetWidth;
	// var height = 739 - $scope.imagesDom.offsetHeight;
	// var proportion = (width / height).toFixed(2);
	var proportion = null;
	var arr2 = [];

	if (389 >= width) {
		proportion = 389 / width;
		for (var i in arr) {
			arr2[i] = parseInt(Number(arr[i]) / Number(proportion));
		}
	} else {
		proportion = width / 389;
		for (var i in arr) {
			arr2[i] = parseInt(Number(arr[i]) * Number(proportion));
		}
	}

	return arr2.join();
}























































