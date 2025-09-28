
<template>
    <div class="wrapper">
        <h1>购物车抛物线动画</h1>
        <div class="container" id="animationArea">
            <div class="cart" ref="cartRef">购物车</div>
            <Flip :mutation="move" selector=".product-y" :animate-option="{duration,easing}" :styles="['position-y']" name="y">
                <Flip :mutation="move" :animate-option="{duration}" selector=".product" :styles="['position-x']">
                        <div class="product" ref="productRef" :style="{
                            transform: `translateX(${move.x}px)`
                        }">
                            <div :style="{
                                transform: `translateY(${move.y}px)`
                            }" class="product-y">
                        </div>
                    </div>
                </Flip>
            </Flip>
        </div>
        <div class="controls">
            <button @click="handleAdd">添加商品</button>
            <button @click="handleEase">更改抛物线</button>
        </div>
    </div>
</template>
<script setup>
import {onMounted,ref,reactive,nextTick} from 'vue'
import Flip from '../components/Flip/index.vue'

const cartRef = ref(null)
const productRef = ref(null)
const move = reactive({x:0,y:0})
const duration = ref(500)
const easing=ref('cubic-bezier(.73,.04,.93,.66)')
 const handleAdd = ()=>{
    const cart = cartRef.value.getBoundingClientRect()
    const product = productRef.value.getBoundingClientRect()
    move.x = cart.x - product.x
    move.y = cart.y - product.y
 }
 const handleEase=()=>{
   duration.value=0
   move.x=0
   move.y=0
   nextTick(()=>{
     easing.value = 'cubic-bezier(0.1, 0.8, 0.9, 0.2)'
     duration.value=500
     handleAdd()
   })
 }
</script>
<style scoped>
        .wrapper {
            font-family: 'Arial', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f5f5f5;
        }
        
        .container {
            position: relative;
            width: 800px;
            height: 500px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            overflow: hidden;
            margin-top: 30px;
        }
        
        .product {
            position: absolute;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
            cursor: pointer;
            user-select: none;
            z-index: 10;
        }
        .product-y{
            background: #ff6b6b;
            height: 100%;
            width: 100%;
            border-radius: 50%;
        }
        
        .cart {
            position: absolute;
            bottom: 20px;
            right: 50px;
            width: 80px;
            height: 60px;
            background: #4d96ff;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-weight: bold;
        }
        
        .controls {
            margin-top: 20px;
            display: flex;
            gap: 15px;
        }
        
        button {
            padding: 10px 20px;
            background: #4d96ff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background 0.3s;
        }
        
        button:hover {
            background: #3a7bd5;
        }
        
        .product-list {
            display: flex;
            gap: 10px;
            margin-top: 20px;
        }
    </style>

