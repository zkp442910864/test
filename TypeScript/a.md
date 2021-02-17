### 参考资料
```
    https://blog.csdn.net/qianyu6200430/article/details/111713951
```
### 在线typescript
```
    https://www.typescriptlang.org/zh/play
```


### 类型
```
    any         任意类型，啥都能分配和被分配
    unknown     未知类型，任何类型都能分配给 unknown，但 unknown 不能分配给其他基本类型
    never       一般表示哪些用户无法达到的类型
        例子:
            type TFn = () => never = ();
            const fn: TFn => {throw new Error('err')};
            const a = '123';
            fn();
            a.length; // Unreachable code detected
```
###### 注意点
```
    对于未知类型要进行类型收窄
    function getLen(value: unknown): number {
        if (typeof value === 'string') {
            // 因为类型保护的原因，此处 value 被判断为 string 类型
            return value.length
        }
        return 0
    }
```