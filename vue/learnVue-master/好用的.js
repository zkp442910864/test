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
 * 
 */
function getType (fn) {
    const match = fn && fn.toString().match(/^\s*function (\w+)/)
    return match ? match[1] : ''
}

function isType (type, fn) {
    if (!Array.isArray(fn)) {
        return getType(fn) === getType(type)
    }
    for (let i = 0, len = fn.length; i < len; i++) {
        if (getType(fn[i]) === getType(type)) {
            return true
        }
    }
    /* istanbul ignore next */
    return false
}


/**
 * Create a cached version of a pure function.
 */
/*根据str得到fn(str)的结果，但是这个结果会被闭包中的cache缓存起来，下一次如果是同样的str则不需要经过fn(str)重新计算，而是直接得到结果*/
export function cached<F: Function> (fn: F): F {
    const cache = Object.create(null)
    return (function cachedFn (str: string) {
        const hit = cache[str]
        return hit || (cache[str] = fn(str))
    }: any)
}

/**
 * Hyphenate a camelCase string.
 */
/*连接一个camelCase字符串。*/
const hyphenateRE = /([^-])([A-Z])/g
export const hyphenate = cached((str: string): string => {
    return str
        .replace(hyphenateRE, '$1-$2')
        .replace(hyphenateRE, '$1-$2')
        .toLowerCase()
})
