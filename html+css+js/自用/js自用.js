window.screen.width > 1200 ? '' : document.body.style.fontSize = parseInt(window.screen.width / 320 * 12) + 'px';//移动适配


//checkbox 复选框的全选
function fun2 (father, son) {
    $(father).click(function () {
        if ($(this).prop('checked')) {
            $(this).prop('checked', 'checked').attr('checked', 'checked');
            son.prop('checked', 'checked').attr('checked', 'checked');
        } else {
            $(this).removeProp('checked').removeAttr('checked');
            son.removeProp('checked').removeAttr('checked');
        }
    });
}


//随机生成字符串
var str = '0123456789';
alert(str.charAt(parseInt(Math.random() * parseInt(str.length))) + str.charAt(parseInt(Math.random() * parseInt(str.length))));



//select控件的使用
var _select = '<select name="" id="a">'
    + '<option value="1">s1</option>'
    + '<option value="2">s2</option>'
    + '<option value="3">s3</option>'
    + '<option value="4">s4</option>'
    + '</select>';

document.body.append(_select);
//主要是这部分
document.getElementById('a').onchange = function () {
    this.options//获取到select下所有的option,数组形式
    this.selectedIndex//每个option对应的index
    alert(this.options[this.selectedIndex].value);
}


// https://www.jianshu.com/p/bc94380c4a22
function press (r) {
	/* 百分比与角度的关系
	* 100%对应360度->1%=3.6deg
	* 角度与周长的关系
	* 360度对应长度为800->0.45deg=1px
	* 百分比与周长的关系
	* 100%对应周长800->0.125%=1px
	* ----->1%=8px
	* 45deg=100px(角度对应的周长)=50%(clip-path中的百分比)
	* ------->100%(百分比值)=400%(clip-path中的百分比)
	*/

    var r = r * 4;
    var k1 = "polygon(50% 50%,50% 0%,";
    var k2 = k1 + "100% 0%,";
    var k3 = k2 + "100% 100%,";
    var k4 = k3 + "0% 100%,";
    var k5 = k4 + "0% 0%,";

    let obj = {};
    if (r <= 50) {
        r += 50;
        obj = {"-webkit-clip-path": k1 + r + "% 0%)"};
    } else if ((r > 50) && (r <= 150)) {
        r -= 50;
        obj = {"-webkit-clip-path": k2 + "100% " + r + "%)"};
    } else if ((r > 150) && (r <= 250)) {
        r = 250 - r;
        obj = {"-webkit-clip-path": k3 + r + "% 100%)"};
    } else if ((r > 250) && (r <= 350)) {
        r = 350 - r;
        obj = {"-webkit-clip-path": k4 + "0% " + r + "%)"};
    } else if ((r > 350) && (r <= 400)) {
        r -= 350;
        obj = {"-webkit-clip-path": k5 + r + "% 0%)"};
    }
    return `-webkit-clip-path:${obj["-webkit-clip-path"]}`;

    /**
     * polygon(50% 50%, 0% 0%, 100% 0%,100% 100%,0% 100%,0% 0%)
     * polygon(50% 50%, 100% 100%,0% 100%,0% 0%)
     * polygon(50% 50%, 40% 0%, 100% 0%,100% 100%,0% 100%,0% 40%)
     * polygon(50% 50%, 100% 100%,0% 100%,0% 40%)
     */
}


// 根据 parentId 把数据归类
function fn2 (list) {

    const obj = {};

    list.forEach((item) => {
        const key = item.parentId;
        const id = item.id;

        // 创建每组数据
        obj[key] = obj[key] || [];
        obj[key].push(item);

        // 为每条数据 挂上对应的子 children
        obj[id] = obj[id] || [];
        item.children = obj[id];
    });

    // 删除多余的空数组
    list.forEach((item) => {
        if (item.children && !item.children.length) delete item.children;
    });

    return obj['0'];
}
























































