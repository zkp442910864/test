react

    https://zh-hans.reactjs.org/docs/hooks-reference.html#usecallback
    hooks api
        useState
        useEffect
        useContext

        useReducer
        useCallback
        useMemo
        useRef
        useImperativeHandle
        useLayoutEffect
        useDebugValue

    性能优化
        class
            https://zh-hans.reactjs.org/docs/optimizing-performance.html
            shouldComponentUpdate: () => boolean; 返回 true更新 false不更新 来阻止是否更新

        hooks
            useCallback  缓存函数
            useMemo      缓存组件

ReactDOM
    element/child   react组件
    container       dom元素

    ReactDOM.render(element, container[, callback]) 渲染组件
        在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。
        后调用的会覆盖前面的

    ReactDOM.hydrate(element, container[, callback])
        针对服务端渲染使用的

    ReactDOM.unmountComponentAtNode(container) 移除组件
        从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。如果指定容器上没有对应已挂载的组件，
        这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。

    ReactDOM.findDOMNode(component)

    ReactDOM.createPortal(child, container)
        创建 portal。Portal 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。
        返回的是一个 reactVNode
        https://zh-hans.reactjs.org/docs/portals.html

    createPortal 与 render 类似，但不能直接渲染，只能包裹起来，然后和其他组件一样的使用方式（主要是把组件内容做移动）。
    但 render 是可以直接渲染到外层dom上，当相关的父级context 会获取不到，createPortal应该是可以获取到的（可以自己独立把组件渲染出来）。
