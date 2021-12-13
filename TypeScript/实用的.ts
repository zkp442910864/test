// keyof typeof 值  可以得到该值 key的枚举值

// @deprecated     注释里面加上这个，被标识为弃用

// Partial<T>          将 T 中的类型都变为可选。
// Pick<T, K>          从T中，选择一组键位于联合K中的属性
// ReadOnly<T>         将 T 中的类型都变为只读。
// Exclude<T, U>       从T中排除可分配给U的类型
// Extract<T, U>       提取 T 中可以赋值给 U 的类型。
// NonNullable<T>      从 T 中剔除 null 和 undefined。
// ReturnType<T>       获取函数返回值类型。
// InstanceType<T>     获取构造函数类型的实例类型。

/*

源码实现
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
type Partial<T> = {
    [P in keyof T]?: T[P];
};

 */


const config = {
    广告曝光: {color: '#5470c6', key: 'Impressions', index: 0, isNum: true, formatter: (val: string | number) => val},
    广告点击: {color: '#91cc75', key: 'Clicks', index: 1, isNum: true, formatter: (val: string | number) => val},
    广告售出: {color: '#fac858', key: 'Sales', index: 2, isNum: true, formatter: (val: string | number) => val},
    总售出: {color: '#ee6666', key: 'ListingQuantitySold', index: 3, isNum: true, formatter: (val: string | number) => val},
    平均费率: {color: '#abd9ec', key: 'BidPercentageAvg', index: 4, isNum: false, formatter: (val: string | number) => `${val}%`},
};

// 获取对象中的key 枚举
type TConfigKey = keyof typeof config;

// 排除某个字段
type a = Omit<{type: string, key: string}, 'type'>;

// 指定其中一个属性
type b = a['key'];

// T 受到 extends 后面参数的约束，必须包含它，和类的继承一样
// 这个可以用做类型检验 T extends string ? string : never
type fn = <T extends {a: 1}>(a: T) => T;

// keyof 的使用
type Tobj = {
  a: number
  b: 2
  c: 3
}
const o1: keyof Tobj = 'c';
// 等价于 const o1: 'a' | 'b' | 'c' = 'c';

// Exclude 使用
const o2: Exclude<'a' | 'b' | 'c', 'a' | 'b'> = 'c'

