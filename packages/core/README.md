# free-dom

[在线预览](https://sepveneto.github.io/free-dom/)

vue2/3通用的自由拖拽dom的组件

支持独立使用和组合使用

独立使用可以提供最基本的位置移动及缩放功能

组合使用额外提供了拖拽区域的限制以及标线自动吸附功能

## 使用

1. 独立使用
vue2.6及以下
```html
<template>
  <free-dom
    :custom-style.sync="style"
    move
    scale
  >测试文本</free-dom>
</template>
<script>
import { freeDom } from 'free-dom'
import 'free-dom/dist/theme.css'
export default {
  component: {
    freeDom
  },
  data() {
    return {
      style: { transform: 'translate(50px, 50px)' }
    }
  }
}
</script>
```

vue2.7及以上
```html
<template>
  <free-dom
    v-model:custom-style="style"
    move
    scale
  >测试文本</free-dom>
</template>
<script setup>
import { freeDom } from 'free-dom'
import 'free-dom/dist/theme.css'
import { ref } from 'vue'

const style = ref({ tranform: 'translate(50px, 50px)' })
</script>
```

2. 组合使用
vue2.6及以下
```html
<template>
  <free-scene style="width: 600px; height: 400px;" move scale>
    <free-dom :custom-style.sync="style">测试文本</free-dom>
  </free-scene>
</template>
<script>
import { freeDom, freeScene } from 'free-dom'
import 'free-dom/dist/theme.css'
export default {
  components: {
    freeDom,
    freeScene,
  },
  data() {
    return {
      style: {}
    }
  }
}
</script>
```

vue2.7及以上
```html
<template>
  <free-scene style="width: 600px; height: 400px;" move scale>
    <free-dom v-model:custom-style="style">测试文本</free-dom>
  </free-scene>
</template>
<script setup>
import { freeDom, freeScene } from 'free-dom'
import 'free-dom/dist/theme.css'
import { ref } from 'vue'

const style = ref({ tranform: 'translate(50px, 50px)' })
</script>
```

## 组件说明

### FreeScene
| 属性 | 类型 | 默认值 | 说明 |
| ---- | ----- | --- | ----- |
| move | boolean | false | 是否允许移动 |
| scale | boolean,Array | false | 是否允许缩放，可以通过数组控制缩放的方向 |
| preview | boolean | false | 屏蔽移动和缩放操作 |
| diff | number | 3 | 自动吸附的像素距离 |

### FreeDom
| 属性 | 类型 | 默认值 | 说明 |
| ---- | ----- | --- | ----- |
| custom-style | css properties | - | 通过`translate`,`width`,`height`控制dom的位置和大小 |
| limitWidth | number | - | 限制dom的可操作区域 |
| limitHeight | number | - | 限制dom的可操作区域 |
| move | boolean | false | 是否允许移动 |
| scale | boolean,Array | false | 是否允许缩放，可以通过数组控制缩放的方向 |
| preview | boolean | false | 屏蔽移动和缩放操作 |
| diff | number | 3 | 自动吸附的像素距离 |

| 事件 | 参数 | 说明 |
| --- | ---- | ---- |
| update:custom-style | css properties | 直接返回样式，不需要做转换 |
| select | \{ x: number, y: number, width: number, height: number \} | 当dom被选中时触发，参数包含相关的位置大小信息（`preview`时不会触发）

## 注意事项

1. `vue@2.6.14`及以下需要安装`@vue/composition-api`才可以正常使用
2. `custom-style`本身就是一个样式，只不过组件会通过`transform`的`translate`以及`width`和`height`控制插槽内容的位置及大小
3. 组合使用时，操作区域由`scene`决定，会自动忽略`limitHeight`和`limitWidth`
4. `limitHeight`和`limitWidth`必须同时设置
5. `preview`的优先级比其它操作属性要高
6. 不同的`vue`版本双向绑定的语法糖不一样，具体可以参考上面的使用说明