
# flutter

- [资料](https://dart.cn/guides/language/coming-from/js-to-dart#lists)
- Dart 虚拟机 (VM) 运行单个事件循环来处理所有 Dart 代码
- const 编译时常量
- final 运行时常量
    - 这确保该字段不能被另一个 覆盖，但它仍然允许修改Set/Map的大小或内容

###### 数组

    ```dart
        <!-- 创建 有默认值的固定长度列表 -->
        List.filled(10, 'a')
        <!-- 创建 固定长度列表 -->
        List.generate(3, (index) => 'a$index')

        <!-- 创建 -->
        final List<String> list1 = ['one'];
        <!-- 添加 -->
        list1.add('peach');
        list1.addAll(['kiwi', 'mango']);
        <!-- 插入 -->
        list1.insert(0, 'peach');
        list1.insertAll(0, ['kiwi', 'mango']);
        <!-- 索引取值 -->
        print(list1[0]);
        <!-- 删除 -->
        list1.remove('pear');
        list1.removeLast();
        list1.removeAt(1);
        list1.removeRange(1, 3);
        list1.removeWhere((ii) => ii.contains('p')); // 删除匹配项
        <!-- 为空 -->
        list1.isEmpty
        <!-- 非空 -->
        list1.isNotEmpty
        <!-- 长度 -->
        list1.length

        <!-- 解构 合并, 加问号表示可能为空 -->
        final list2 = ['0', ...list1];
        final list2 = ['0', ...?list1];

        <!-- 数组中的指定义 -->
        var nav = [
            'Home',
            'Furniture',
            'Plants',
            if (promoActive) 'Outlet',
        ];

        var listOfInts = [1, 2, 3];
        var listOfStrings = [
            '#0',
            for (var i in listOfInts) '#$i',
        ]; // [#0, #1, #2, #3]
    ```

###### Set

- Dart 以与列表相同的方式定义集合，但使用大括号而不是方括号
-

    ```dart
        final abc = {'a', 'b', 'c'};
        <!-- 创建空 Set 需要指定类型 -->
        final names = <String>{};

        <!-- 添加 -->
        names.add('peach');
        names.addAll(['kiwi', 'mango']);
        <!-- 删除 -->
        names.remove('pear');
        names.removeAll(['orange', 'apple']);
        names.removeWhere((fruit) => fruit.contains('p'));
        <!-- isEmpty isNotEmpty length 同数组 -->

        <!-- 解构 合并 -->
        var set1 = {'foo', 'bar'};
        var set2 = {'foo', 'baz', ...set1}; // {foo, baz, bar}
    ```

###### Map

- 将键与值相关联。如果`所有键都具有相同的类型，则键可以是任何对象类型。(?)`此规则也适用于值。每个键最多出现一次，但您可以多次使用相同的值。

```dart
    final gifts = {
        'first': 'partridge',
        'second': 'turtle doves',
        'fifth': 'golden rings'
    };
    <!-- 获取值/赋值 -->
    final gift = gifts['first'];
    gifts['first'] = '333';
    <!-- 使用该 addEntries 方法将其他条目添加到Map -->
    gifts.addEntries([
        MapEntry('second', 'turtle doves'),
        MapEntry('fifth', 'golden rings'),
    ]);
    <!-- 判断是否存在key -->
    gifts.containsKey('fifth');
    <!-- 添加 Map -->
    gifts.addAll({
        'second': 'turtle doves',
        'fifth': 'golden rings',
    });
    <!-- 删除 -->
    gifts.remove('first');
    gifts.removeWhere((key, value) => value == 'partridge');
    <!-- isEmpty isNotEmpty length 同数组 -->

    <!-- 解构 合并 -->
    var map1 = {'foo': 'bar', 'key': 'value'};
    var map2 = {'foo': 'baz', ...map1}; // {foo: bar, key: value}
```

###### 不可修改

    ```dart
        final _set = Set<String>.unmodifiable(['a', 'b', 'c']);
        final _list = List<String>.unmodifiable(['a', 'b', 'c']);
        final _map = Map<String, String>.unmodifiable({'foo': 'bar'});
    ```

###### 异步

- Future<> 响应类型
-

    ```dart
        <!-- 类似 js 中的实现 -->
        Future<String> httpResponseBody = func();
        httpResponseBody
            .then((String value) {
                print('Future resolved to a value: $value');
            })
            .catchError((err) {
                print( 'Future encountered an error before resolving.' );
            });

        <!-- 手动响应 Future 类型 -->
        String str = 'String Value';
        Future<String> strFuture = Future<String>.value(str);

        Future<String> fetchString() async {
            // Typically some other async
            // operations would be done here.
            var str = await func();
            return 'String Value';
        }
    ```
