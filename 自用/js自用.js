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
























































