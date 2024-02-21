
### 指定声明文件

- 不需要后缀，可以加路径:
    - [资料](https://ts.xcatliu.com/basics/declaration-files.html#%E5%A3%B0%E6%98%8E%E6%96%87%E4%BB%B6%E4%B8%AD%E7%9A%84%E4%BE%9D%E8%B5%96)
    - `/// <reference types="jquery" />`
    - `/// <reference types="../../global" />`

内置
    ReadOnly<T>         将 T 中的类型都变为只读。
    Partial<T>          将 T 中的类型都变为可选。
        源码实现
        type Partial<T> = {
            [P in keyof T]?: T[P];
        };

    Record<T, K>        创建对象类型
    Exclude<T, U>       从 T 中剔除可以赋值给 U 的类型。
    Extract<T, U>       提取 T 中可以赋值给 U 的类型。
    NonNullable<T>      从 T 中剔除 null 和 undefined。
    ReturnType<T>       获取函数返回值类型。
    InstanceType<T>     获取构造函数类型的实例类型。
    Pick<T, K>          从T中，选择一组键位于联合K中的属性 (指定需要的属性
        源码实现
        type Pick<T, K extends keyof T> = {
            [P in K]: T[P];
        };

    typeof              js对象 转 ts类型
    keyof               ts类型 转 key枚举
    keyof typeof        js对象 转 key枚举

TypeScript 基础
	基础类型
		let isDone: boolean = false;
		let decLiteral: number = 6;
		let name: string = "bob";

		let list: number[] = [1, 2, 3];
		let list: Array<number> = [1, 2, 3];

		Object
			let list: object = {};

		any
			不清楚类型的变量指定一个类型，使用这个
			let name: any = "bob";
			name = 4; name = true;
			let name: any[] = ['1', 2, true];

		Void
			void类型像是与any类型相反，它表示没有任何类型。
			声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null
			let unusable: void = undefined;

		Null 和 Undefined
			let u: undefined = undefined;
			let n: null = null;

		Never
			never类型表示的是那些永不存在的值的类型。

		类型断言
			确切的知道该变量属于什么类型时使用

			let someValue: any = "this is a string";

			写法1
			let strLength: number = (<string>someValue).length;

			写法2
			let strLength: number = (someValue as string).length;

		枚举
			enum类型是对JavaScript标准数据类型的一个补充。
	类
		继承
			extends

		修饰符（在 构造函数 加修饰符，会影响类的使用方式）
			public 			公共的
			protected		私有的，类里可调用（包括派生类）（构造函数上使用后类只能被继承）
			private			私有的，类里可调用

		只读
			readonly		声明只读属性，必须在声明时或构造函数里被初始化。

		get/set 存取器
			首先，存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。
			其次，只带有 get不带有 set的存取器自动被推断为 readonly。
			在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

			针对于私有属性的
			private _a: string;
			get a () {}
			set a () {}

		抽象类
			abstract
			抽象类做为其它派生类的基类使用。抽象类不能进行实例化
			抽象方法必须包含 abstract关键字并且包含可访问修饰符（这个方法就必须在派生类中实现）。

	函数
		返回值类型是函数类型的必要部分，如果函数没有返回任何值，你也必须指定返回值类型为 void而不能留空。

		推断类型
			const newAdd: (x: number, y: number) => number = (x, y) => { return x * y };

		可选参数和默认参数
			可选的必须带有 ?
			默认的进行赋值
			const newAdd: (x: number, y?: number) => number = (x, y = 5) => { return x * y };

		剩余参数
			const newFun: (x: number, ...arr: string[]) => string = (x, ...arr) => { return `${x}-${arr.join()}` };

	泛型
		泛型名不一定是 T，可用其它字母代替
		主要是限制 传参和返回值 的数据类型
		类使用可以统一的使用一个类型

		function identity<T>            (arg: T): T { return arg }

		这两个等价
		function loggingIdentity<T>         (arr: T[]): T[] { return arr }
		function loggingIdentity<T>         (arr: Array<T>          : Array<T>      { return arr }

		class GNumber<T>            { val: T; add: (x: T, y: T) => T; }

		// 写法一 手动指定 T 的类型
		console.log(identity<string>('123'));
		// 写法二 即编译器会根据传入的参数自动地帮助我们确定T的类型
		console.log(identity('123'));

		console.log(loggingIdentity([1, 'q', '3', true]));

		// 这样限制了 number，重写的属性和方法（有 T 的）就必须是 number 类型了。
		const gn = new GNumber<number>();

		泛型约束
			就是给 T 加上限制，这样传入的参数就必须包含 length 属性。
			interface IContain { length: number; }
			function custor<T extends IContain> (val: T): T { return val }













1.创建项目 cnpm init

2.在目录下创建 tsconfig.json
	{
		"compilerOptions": {
				"module": "commonjs",
				"target": "es6",
				"noImplicitAny": false,
				"sourceMap": true,
				"allowJs": true
		},
		"exclude": [
				"node_modules"
		]
	}
	target：编译之后生成的JavaScript文件需要遵循的标准。有三个候选项：es3、es5、es2015。
	noImplicitAny：为false时，如果编译器无法根据变量的使用来判断类型时，将用any类型代替。为true时，将进行强类型检查，无法推断类型时，提示错误。
	module：遵循的JavaScript模块规范。主要的候选项有：commonjs、AMD和es6。
	removeComments：编译生成的JavaScript文件是否移除注释。
	sourceMap：编译时是否生成对应的source map文件。这个文件主要用于前端调试。当前端js文件被压缩引用后，出错时可借助同名的source map文件查找源文件中错误位置。
	outDir：编译输出JavaScript文件存放的文件夹。
	include、exclude：编译时需要包含/剔除的文件夹。

3.运行
	1) vs code 任务->配置任务->监视tsconfig.json
		vs code 插件
			Auto Import : 对于一堆组件的我们来说，这货简直贴心，支持JSX和typescript，还有一些细致化的配置参数
			exports autocomplete : 和上个功能类似但是不等同，相当实用
			TypeLens : 类型引用索引展示，用过visual studio的都看到过，相当强大的一个功能；换个名词可能更多人知道，peek file
			TypeScript Import : 专门处理TS内模块导入的，和第一个互补；
			Typings : 这个就是用来处理d.ts的
			AngularDoc for Visual Studio Code : 这个插件可以分析整个项目的依赖生成一个类似思维导图的（经常嗝屁，用了懒加载之后基本不全），
																					但是有另外一个相当实用的功能就是可以调用angular-cli的新建指令，在侧边栏右键可以直接看到;
	2) 控制台输入
		tsc && node ./greeter    './greeter'是ts文件路径，不需要后缀
		tsc greeter.ts
		tsc --watch -p 文件   监听文件的变化生成