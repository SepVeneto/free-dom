---
title: 尺寸同步
---

# 尺寸同步

初次渲染时，如果没有设置`width`和`height`，组件本身会自动计算匿名插槽内元素的大小作为宽高。但是由于浏览器的渲染行为是异步的，所以存在计算完尺寸之后触发了重绘导致元素大小又一次变化，在这种情况下就需要手动触发元素大小的计算。

## 非等宽字体

如果网页有设置其它字体，在加载完css样式表时，会有一个下载并重新渲染字体的操作，目前测试发现当使用的字体是`非等宽字体`时，初始渲染计算的大小与加载完字体之后的大小有误差。

可以通过设置`fix-non-monospaced`来进一步延迟自动计算的时间直到字体加载完成，而不是默认的元素挂载到dom上。

:::demo
free-dom/sync-size/non-monospaced-fonts
:::

## 异步加载

对于拖曳缩放的元素是图片这类无法在加载时确定大小的，可以通过暴露的方法`syncSize`，在图片加载完成后，手动触发元素大小的计算。

:::warning
使用手动触发时务必关闭自动计算`auto-size`，否则会导致大小自动被设置为最小宽高
:::

:::info
可能会由于缓存的原因导致demo无法正常表现，需要在控制台禁用缓存
:::

:::demo
free-dom/sync-size/async-load
:::
