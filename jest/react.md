
### 使用的是 react-testing-library

(学习)[https://www.cnblogs.com/qianxiaox/p/13750472.html]

```
jest 注意
    不能使用 require.context （没找到解决方案 https://www.coder.work/article/6517339）
    使用 redux 时候，注意 <Provider>，缺少的话会报错
```

### [jest api](https://jestjs.io/zh-Hans/docs/api)
```
// afterEach    每次执行后，执行
// describe     测试套件（test suite）
// test         测试用例（test case）, test 关键字也可以写成 it
// expect       断言 值是否等于结果
//      expect(true).toBe(true)
//      expect(val).toBeInTheDocument();
// 生成的快照会进行比较，不一样的话会不通过，有需要更新的命令行加 -u，应该也可以直接删掉
```

### React Testing Library
```
// RTL 提供了不同的函数去定位元素。定位后的元素可用于『断言』或者是『用户交互』
// AAA模式：编排（Arrange），执行（Act），断言（Assert）
// 通过 screen 获取各个节点
// 通过 fireEvent 触发各种事件
// 最后通过 expect 进行值比较，是否符合预期效果

import {render, screen, fireEvent, cleanup, waitFor} from '@testing-library/react';
// render 渲染dom， fireEvent 触发事件， cleanup 清理内存空间， waitFor 等待异步完成

// screen.debug(); dom节点 快照
// screen 提供了一系列获取 dom元素 的函数
//   getByLabelText:搜索与作为参数传递的给定文本匹配的标签，然后查找与该标签关联的元素。
//   getByText:搜索具有文本节点的所有元素，其中的textContent与作为参数传递的给定文本匹配。
//   getByTitle:返回具有与作为参数传递的给定文本匹配的title属性的元素。
//   getByPlaceholderText:搜索具有占位符属性的所有元素，并找到与作为参数传递的给定文本相匹配的元素。
//   一个特定的查询有很多变体:
//   getBy:返回查询的第一个匹配节点，如果没有匹配的元素或找到多个匹配，则抛出一个错误。
//   getAllBy:返回一个查询中所有匹配节点的数组，如果没有匹配的元素，则抛出一个错误。
//   queryBy:返回查询的第一个匹配节点，如果没有匹配的元素，则返回null。这对于断言不存在的元素非常有用。
//   queryAllBy:返回一个查询的所有匹配节点的数组，如果没有匹配的元素，则返回一个空数组([])。
//   findBy：返回一个promise，该promise将在找到与给定查询匹配的元素时解析。如果未找到任何元素，或者在默认超时时间为4500毫秒后找到了多个元素，则承诺将被拒绝。
//   findAllBy：返回一个promise，当找到与给定查询匹配的任何元素时，该promise将解析为元素数组。

// 生成快照文件
// ./__snapshots__/*.snap
describe('组件 Test', () => {
    test('点击效果', () => {
        const {asFragment} = render(<div />);
        expect(asFragment()).toMatchSnapshot();
    });
});

```



