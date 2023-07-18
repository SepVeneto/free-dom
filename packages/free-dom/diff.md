---
title: 边缘吸附
---

# 边缘吸附

## 吸附距离

通过`diff`可以设置触发吸附的像素距离。

:::warning
`diff`同时也是解除吸附的值，`free-scene`解除吸附的条件是两次移动的差值大于`diff`，因此如果这个值设置的过大，会导致拖曳时很难解除吸附效果。
:::

:::demo
free-dom/diff/distance
:::

## 参考线

通过`show-line`可以将是否对齐的参考线隐藏

:::demo
free-dom/diff/markline
:::