# vue-flip
[![npm version](https://img.shields.io/npm/v/vue-flip)](https://www.npmjs.com/package/vue-flip)
[![license](https://img.shields.io/npm/l/vue-flip)](https://github.com/your-repo/vue-flip/blob/main/LICENSE)

#### 功能介绍
基于 FLIP 动画思想封装的 vue 组件，帮你快速实现德芙般丝滑的动画效果

![demo](https://raw.githubusercontent.com/qianyuanjia/vue-flip/refs/heads/main/src/assets/demo1.gif)

#### 安装教程

```bash
npm install vue-flip
```

#### 使用说明

1.  引入 Flip组件

```js
// vue 2.x
import { Vue2Flip } from 'vue-flip';

// vue 3.x
import { Flip } from 'vue-flip';
```

2.  Flip 组件使用方式

```vue
<Flip :mutation="styles" :styles="['backgroundColor']" :animate-option="{duration: 1000}">
    <div class="box" @click="handleClick" :style="{height:styles.height,
      background:styles.bgColor
    }"></div>
  </Flip>
```
Flip组件支持默认的插槽，会自动获取插槽内部的直接子元素参与动画效果。也可以通过`selector`传入自定义选择器，指定需要参与动画的元素。
- 参数 `selector` 是可选的，自定义选择器指定参与动画元素, 会使用flip容器的querySelectorAll(`selector`)获取下面指定的元素。
- 参数 `mutation` 是必传的，用于指定动画触发的时机。由于是基于数据驱动的设计，所以传入的是vue的响应式数据结构，内部会深度监听响应式数据，在变更时触发动画。
- 参数 `styles` 是可选的，默认`width`,`height`, `transform`, `position(位置)`样式属性会参与动画，styles数组中指定的其他样式属性也会参与动画，styles的元素值和vue style的属性名类同，可以通过`getComputedStyle(element)`查看。
- 参数 `animateOption` 是可选的，用于指定动画的配置，具体如下
- delay（延迟） 可选
    - 动画开始前的延迟时间（毫秒），默认为0。

- direction（方向） 可选
    控制动画播放方向：
    - "normal"：正向播放（默认）
    - "reverse"：反向播放
    - "alternate"：交替正反向
    - "alternate-reverse"：先反向再交替

- duration（持续时间） 可选
    单次动画周期的毫秒数。虽然技术上可选，但设为0会导致动画失效，默认为0。

- easing（缓动函数） 可选
    动画变化速率曲线，支持：
    - "linear"：线性（默认）
    - "ease-in"：缓入
    - "step-end"：步进结束
    - "cubic-bezier(0.42, 0, 0.58, 1)"：贝塞尔曲线等

- endDelay（结束延迟） 可选
    动画结束后保持最终状态的毫秒数（多用于动画序列编排），默认为0。

- fill（填充模式） 可选
    控制动画外显状态：
    - "backwards"：播放前保持第一帧
    - "forwards"：结束后保持末帧
    - "both"：双向保持
    - "none"：不保持（默认）

- iterationStart（迭代起点） 可选
设置动画开始的迭代进度点（0.0-1.0）。例如0.5表示从第一次迭代的中段开始，默认为0.0。

- iterations（迭代次数） 可选
动画重复次数，默认为1。设为Infinity表示无限循环。

- composite（复合操作） 可选
控制多动画叠加方式：
    - "add"：叠加效果（如位移+旋转）
    - "accumulate"：智能累加（如模糊2+5=7）
    - "replace"：替换前值（默认）

- iterationComposite（迭代复合） 可选
控制跨迭代累积方式，可选"accumulate"或"replace"（同上），默认为"replace"。

- pseudoElement（伪元素） 可选
指定目标伪元素选择器（如"::before"），将效果应用于目标元素的伪元素而非元素本身。


#### 示例

这是上面 demo 的代码

```js
import { Flip } from "./flip";

const btn = document.querySelector('button')!;
const ul = document.querySelector('ul')!;
const lis = Array.from(ul.children);
btn.addEventListener('click', function() {

  const flip = new Flip(lis as HTMLElement[], 1000, ['backgroundColor', 'width']);
  lis.sort(() => Math.random() - 0.5).forEach((item) => {
    (item as HTMLElement).style.backgroundColor = getRandomColor();
    (item as HTMLElement).style.width = getRandomNumber(100, 300) + 'px';
    ul.appendChild(item);
  });

  await flip.animate();
  console.log('Animation finished');
  flip.destroy();
});

function getRandomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

也支持同时包含其他复杂 transform 变化（旋转，缩放）的动画，例如：

![demo2](./demo2.gif)
