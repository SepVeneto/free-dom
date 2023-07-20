# ＠sepveneto/free-dom

[在线预览](https://sepveneto.github.io/free-dom/)

vue2/3通用的自由拖拽dom的组件

支持独立使用和组合使用

独立使用可以提供最基本的位置移动及缩放功能

组合使用额外提供了拖拽区域的限制以及标线自动吸附功能

## 使用

### 安装
```bash
pnpm i @sepveneto/free-dom
yarn add @sepveneto/free-dom
npm i @sepveneto/free-dom
```
### 基本用法

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
import { freeDom } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
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
import { freeDom } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
import { ref } from 'vue'

const style = ref({ tranform: 'translate(50px, 50px)' })
</script>
```

2. 组合使用
vue2.6及以下
```html
<template>
  <free-scene style="width: 600px; height: 400px;" move scale>
    <free-dom
      :width.sync="rect.width"
      :height.sync="rect.height"
      :x.sync="rect.x"
      :y.sync="rect.y"
    >测试文本</free-dom>
  </free-scene>
</template>
<script>
import { freeDom, freeScene } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
export default {
  components: {
    freeDom,
    freeScene,
  },
  data() {
    return {
      rect: {}
    }
  }
}
</script>
```

vue2.7及以上
```html
<template>
  <free-scene style="width: 600px; height: 400px;" move scale>
    <free-dom
      v-model:width="rect.width"
      v-model:height="rect.height"
      v-model:x="rect.x"
      v-model:y="rect.y"
    >测试文本</free-dom>
  </free-scene>
</template>
<script setup>
import { freeDom, freeScene } from '@sepveneto/free-dom'
import '@sepveneto/free-dom/css'
import { ref } from 'vue'

const rect = ref({ })
</script>
```

## 组件说明

### [FreeDom](https://sepveneto.github.io/free-dom/#%E5%B1%9E%E6%80%A7)

### [FreeScene](https://sepveneto.github.io/free-dom/#free-scene-%E5%B1%9E%E6%80%A7)

### [GridLayout](https://sepveneto.github.io/free-dom/#%E5%B1%9E%E6%80%A7-1)


## 注意事项

1. `vue@2.6.14`及以下需要安装`@vue/composition-api`才可以正常使用
2. `custom-style`本身就是一个样式，只不过组件会通过`transform`的`translate`以及`width`和`height`控制插槽内容的位置及大小
3. 组合使用时，操作区域由`scene`决定，会自动忽略`limitHeight`和`limitWidth`
4. `limitHeight`和`limitWidth`必须同时设置
5. `preview`的优先级比其它操作属性要高
6. 不同的`vue`版本双向绑定的语法糖不一样，具体可以参考上面的使用说明
