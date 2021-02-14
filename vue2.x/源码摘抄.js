/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 *
 * 使用函数字符串名称检查内置类型，
 * 因为一个简单的等式检查在运行时会失败
 * 跨不同的vm/iframe。
 *
 * 检测 props 里的 type 类型
 * fn = String
 * fn.toString().match(/^\s*function (\w+)/)
 * 输出： ["function String", "String", index: 0, input: "function String() { [native code] }", groups: undefined]
 *
 */
function getType (fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
}


// 一种缓存思路
{
    /**
     * 对一个函数进行包装，使其后续调用的计算结果进行缓存
     * @param {*} fn (val: string) => string
     */
    function cached (fn) {
        const cache = Object.create(null)
        return (function cachedFn (str) {
            const hit = cache[str]
            return hit || (cache[str] = fn(str))
        })
    }
    /**
     * demo
     * 连接一个camelCase字符串。
     */
    const hyphenateRE = /([^-])([A-Z])/g
    const hyphenate = cached((str) => {
        return str
            .replace(hyphenateRE, '$1-$2')
            .replace(hyphenateRE, '$1-$2')
            .toLowerCase()
    });
    hyphenate('camelCase');
    // camel-case
}