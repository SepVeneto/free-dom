---
title: '首页'
---


# @sepveneto/free-dom

## [free-dom](./free-dom/introduction)

主要用于快速实现dom元素的拖曳和缩放功能，利用`FreeScene`可以额外实现边缘吸附和区域限制功能。

### 属性

| 名称 | 类型 | 必填 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ----- | ----- | --- |
| v-model/model-value | object | ❌ | - | - | 元素的位置及尺寸
| lock-aspect-ratio | boolean | ❌ | false | - | 缩放时是否按当前宽高比计算
| handle | string | ❌ | - | - | 通过class或id指定允许触发拖曳的元素
| dragStartFn | <Desc desc="(evt, coreData) => void">CoreFnCallback</Desc> | ❌ | - | - | 拖曳开始的回调函数 |
| dragFn | <Desc desc="(evt, coreData) => void">CoreFnCallback</Desc> | ❌ | - | - | 拖曳时的回调函数 |
| dragStopFn | <Desc desc="(evt, coreData) => void">CoreFnCallback</Desc> | ❌ | - | - | 拖曳结束的回调函数 |
| resizeStartFn | <Desc desc="(evt, resizeData) => void">ResizeFnCallback</Desc> | ❌ | - | - | 缩放开始的回调函数 |
| resizeFn | <Desc desc="(evt, resizeData) => void">ResizeFnCallback</Desc> | ❌ | - | - | 缩放时的回调函数 |
| resizeStopFn | <Desc desc="(evt, resizeData) => void">ResizeFnCallback</Desc> | ❌ | - | - | 缩放结束的回调函数 |
| auto-size | boolean | ❌ | true | - | 是否在初次渲染时根据当时的元素尺寸自动计算宽高
| min-width | number | ❌ | 50 | - | 缩放的最小宽度，单位px
| min-height | number | ❌ | 50 | - | 缩放的最小高度，单位px
| disabled-drag | boolean | ❌ | false | - | 是否禁用拖曳功能
| disabled-resize | boolean | ❌ | false | - | 是否禁用缩放功能
| scale | array | ❌ | - | <Desc desc="'t' \| 'r' \| 'l' \| 'b' \| 'lt' \| 'lb' \| 'rt' \| 'rb'">enum</Desc> | 允许缩放的方向
| fix-non-monospaced | boolean | ❌ | false | - | 是否在初次渲染是等待字体加载完成再计算尺寸（主要是针对非等宽字体）

### 方法

| 名称 | 参数 | 说明 |
| --- | ----  | --- |
| syncSize | - | 重新根据内部元素大小计算宽高（需要关闭`auto-size`） |

### free-scene 属性

| 名称 | 类型 | 必填 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ----- | ----- | --- |
| diff | number | ❌ | 2 | - | 触发吸附的距离，单位px
| show-line | boolean | ❌ | true | - | 显示对齐参考线
| min-width | number | ❌ | 50 | - | 元素缩放的最小宽度，单位px
| min-height | number | ❌ | 50 | - | 元素缩放的最小高度，单位px
| fix-non-monospaced | boolean | ❌ | false | - | 所有元素是否在初次渲染是等待字体加载完成再计算尺寸（主要是针对非等宽字体）
| disabled-drag | boolean | ❌ | false | - | 是否禁用所有元素的拖曳功能
| disabled-resize | boolean | ❌ | false | - | 是否禁用所有元素的缩放功能
| scale | array | ❌ | - | ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] | 所有元素允许缩放的方向
| lock-aspect-ratio | boolean | ❌ | false | - | 所有元素缩放时是否按当前宽高比计算

## [grid-layout](./grid-layout/introduction)

严重参考了[react-grid-layout](https://github.com/react-grid-layout/react-grid-layout)的代码，同时只实现了部分功能。

### 属性

| 名称 | 类型 | 必填 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ----- | ----- | --- |
| v-model/model-value | object | ✔️️ | - | - | 布局参数 |
| cols | number | ❌ | 12 | - | 栅格的列数
| max-rows | number | ❌ | Infinity | - | 栅格的行数 
| min-w | number | ❌ | 1 | - | 元素缩放的最小宽度
| min-h | number | ❌ | 1 | - | 元素缩放的最小高度
| row-height | number | ❌ | 150 | - | 栅格的行高
| margin | number[] | ❌ | [10, 10] | - | 元素之间的间隔，[水平方向，垂直方向]
| container-padding | number[] | ❌ | - | - | 布局的内边距，[水平方向，垂直方向]
| disabled-drag | boolean | ❌ | false | - | 禁用元素拖曳
| disabled-resize | boolean | ❌ | false | - | 禁用元素缩放
| collision | boolean | ❌ | false | - | 启用元素碰撞

### item属性
| 名称 | 类型 | 必填 | 默认值 | 可选值 | 说明 |
| ---- | ---- | ---- | ----- | ----- | --- |
| i | string \| number | ✔️ | - | - | 布局元素的唯一标识
| x | number | ✔ | - | - | x轴的位置
| y | number | ✔ | - | - | y轴的位置
| w | number | ✔ | - | - | 宽度
| h | number | ✔ | - | - | 高度 
| static | boolean | ❌ | - | - | 是否为静态元素
| scale | array | ❌ | ['rb'] | ['t', 'r', 'l', 'b', 'lt', 'lb', 'rt', 'rb'] | 元素允许缩放的方向