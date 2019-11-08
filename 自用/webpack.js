
// 动态获取目录下的文件
const files = require.context('./tpl', true, /.vue$/);
console.dir(files);
console.log(files.keys());
const tpl = {};
files.keys().forEach(item => {
    const child = files(item).default || files(item);
    console.log(child);
    tpl[child.name] = child;
});