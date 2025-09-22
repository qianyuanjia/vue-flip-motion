# vue-flip-motion

[![npm version](https://img.shields.io/npm/v/vue-flip-motion)](https://www.npmjs.com/package/vue-flip-motion)
[![license](https://img.shields.io/npm/l/vue-flip-motion)](https://github.com/your-repo/vue-flip-motion/blob/main/LICENSE)
[![downloads](https://img.shields.io/npm/dm/vue-flip-motion)](https://www.npmjs.com/package/vue-flip-motion)

基于 FLIP (First Last Invert Play) 动画技术封装的 Vue 组件，让您的动画效果如德芙般丝滑流畅！

![demo](https://raw.githubusercontent.com/qianyuanjia/vue-flip-motion/refs/heads/main/src/assets/demo1.gif)

## ✨ 特性

- **简单易用**：通过数据驱动的方式触发动画
- **性能优化**：使用 FLIP 技术减少布局抖动
- **高度可定制**：支持多种动画参数配置
- **跨版本支持**：同时支持 Vue 2.x 和 Vue 3.x
- **嵌套动画**：支持多层嵌套实现复杂动画效果

## 📦 安装

使用 npm 安装：

```bash
npm install vue-flip-motion
```

或使用 yarn：

```bash
yarn add vue-flip-motion
```

## 🔨 使用指南

### 基本用法

```js
// Vue 2.x
import { Vue2Flip } from 'vue-flip-motion';

// Vue 3.x
import { Flip } from 'vue-flip-motion';
```

```vue
<template>
  <Flip 
    :mutation="styles" 
    :styles="['backgroundColor']" 
    :animate-option="{duration: 1000}"
  >
    <div 
      class="box" 
      @click="handleClick" 
      :style="{
        height: styles.height,
        background: styles.bgColor
      }"
    ></div>
  </Flip>
</template>

<script>
import { Vue2Flip } from 'vue-flip-motion';
export default {
  components: {Flip: Vue2Flip},
  data() {
    return {
      styles: {
        height: '100px',
        bgColor: '#42b983'
      }
    }
  },
  methods: {
    handleClick() {
      this.styles = {
        height: '200px',
        bgColor: '#ff0000'
      }
    }
  }
}
</script>
```

## ⚙️ 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `mutation` | [Array, Object, Number, String, Boolean] | 是 | - | 触发动画的响应式数据 |
| `selector` | String | 否 | - | 自定义选择器, 会使用flip容器的querySelectorAll(`selector`)获取下面指定的元素。 |
| `styles` | Array | 否 | [] | 默认`width`,`height`, `transform`, `position(位置)`样式属性会参与动画，styles数组中指定的其他样式属性也会参与动画，styles的元素值和vue style的属性名类同，可以通过`getComputedStyle(element)`查看 |
| `animateOption` | Object | 否 | {} | 动画配置选项（详见下方） |

### 动画配置选项 (animateOption)

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `delay` | Number | 0 | 动画开始前的延迟时间(ms) |
| `duration` | Number | 0 | 单次动画周期时长(ms) |
| `easing` | String | "linear" | 动画缓动函数 |
| `direction` | String | "normal" | 动画播放方向 |
| `iterations` | Number/Infinity | 1 | 动画重复次数 |
| `fill` | String | "none" | 动画填充模式 |
| `endDelay` | Number | 0 | 动画结束后的延迟时间(ms) |
| `iterationStart` | Number | 0.0 | 动画开始的迭代进度点 |
| `composite` | String | "replace" | 多动画叠加方式 |
| `iterationComposite` | String | "replace" | 跨迭代累积方式 |
| `pseudoElement` | String | - | 目标伪元素选择器 |

## 🎛 高级用法

### 自定义选择器

```vue
<Flip 
  :mutation="state" 
  selector=".animated-item"
  :animate-option="{duration: 500}"
>
  <div>
    <div class="animated-item" v-for="item in list" :key="item.id">
      {{ item.text }}
    </div>
  </div>
</Flip>
```

### 嵌套动画

Flip组件可以嵌套使用，相当于叠加多个动画效果。

```vue
<Flip 
  :mutation="roll" 
  :animate-option="{duration: 3000}" 
  name="roll"
>
  <Flip 
    :mutation="active" 
    :styles="['backgroundColor']" 
    :animate-option="{duration: 2000}"
  >
    <div 
      class="box" 
      :class="{active, roll}" 
      @click="handleClick"
    ></div>
  </Flip>
</Flip>
```

## 📝 注意事项

1. `mutation` 参数是必须的，它是触发动画的关键
2. 默认会监听 `width`, `height`, `transform`, `position` 样式变化
3. 可以通过 `styles` 数组指定需要监听的额外样式
4. 嵌套使用时会产生叠加动画效果
5. 确保选择器能正确匹配到目标元素

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue！

## 📄 License

MIT