import { DefineComponent } from 'vue'

/**
 * FLIP 动画配置选项
 */
interface FlipAnimationOptions {
    /** 动画持续时间（毫秒） */
    duration?: number
    /** 动画延迟时间（毫秒） */
    delay?: number
    /** 缓动函数 */
    easing?: string
    /** 动画方向 */
    direction?: 'normal' | 'reverse' | 'alternate' | 'alternate-reverse'
    /** 动画迭代次数 */
    iterations?: number | 'infinite'
    /** 填充模式 */
    fill?: 'none' | 'forwards' | 'backwards' | 'both'
    /** 结束延迟（毫秒） */
    endDelay?: number
    /** 迭代起点（0.0-1.0） */
    iterationStart?: number
    /** 复合操作 */
    composite?: 'replace' | 'add' | 'accumulate'
    /** 迭代复合 */
    iterationComposite?: 'replace' | 'accumulate'
    /** 伪元素选择器 */
    pseudoElement?: string
}

/**
 * Vue 3 FLIP 组件 Props
 */
interface FlipProps {
    /**
     * 触发动画的响应式数据
     * 可以是数组、对象、数字、字符串或布尔值
     */
    mutation?: any[] | object | number | string | boolean

    /**
     * 动画配置选项
     * @default { duration: 200 }
     */
    animateOption?: FlipAnimationOptions

    /**
     * 需要监听的样式属性
     * @default []
     */
    styles?: string[]

    /**
     * 自定义选择器，用于指定参与动画的元素
     * @default ''
     */
    selector?: string

    /**
     * 动画名称，用于调试
     * @default ''
     */
    name?: string
}

/**
 * Vue 2 FLIP 组件 Props
 */
interface Vue2FlipProps extends FlipProps { }

/**
 * Vue 3 FLIP 组件
 */
declare const Flip: DefineComponent<FlipProps>

/**
 * Vue 2 FLIP 组件
 */
declare const Vue2Flip: DefineComponent<Vue2FlipProps>

declare module 'vue-flip-motion' {
    export { Flip, Vue2Flip }
    export type { FlipAnimationOptions, FlipProps, Vue2FlipProps }
}