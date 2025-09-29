<template>
    <Flip :styles="['backgroundColor']" :mutation="[left,right]" selector=".item" :animate-option="{duration:1000}">
        <Flip class="wrapper" :mutation="[left,right]" selector=".item" :animate-option="{duration:500}" :styles="['position-x','position-y']" @finish="enable=true">
            <div class="left">
                <div v-for="item in left" :key="item.id" class="item" @click="clickLeft(item)" :id="item.id" :data-flip-selector="`#${item.id}`"></div>
            </div>
            <div class="right">
                <div v-for="item in right" :key="item.id" class="item" @click="clickRight(item)" :id="item.id" :data-flip-selector="`#${item.id}`"></div>
            </div>
        </Flip>
    </Flip>
</template>
<script setup>
import {ref} from 'vue'
import Flip from './Flip/index.vue'
const left= ref(new Array(10).fill(0).map((_,index)=>{
    return {
        id:'box'+index,
    }
}))
const right=ref(new Array(3).fill(0).map((_,index)=>{
    return {
        id:'box'+(index+10),
    }
}))

const enable = ref(true)

const clickLeft=(item)=>{
    if(!enable.value) return;
    enable.value=false
    const index = left.value.indexOf(item)
    left.value.splice(index,1)
    right.value.push(item)
}
const clickRight=(item)=>{
    if(!enable.value) return;
    enable.value=false
    const index = right.value.indexOf(item)
    right.value.splice(index,1)
    left.value.unshift(item)
}
</script>
<style scoped>
.wrapper{
    display: flex;
    gap:80px;
    background-color: rgba(0,0,0, 0.8);
    height: 500px;
    padding: 100px;
}
.item{
    width: 200px;
    height: 40px;
    border-radius: 20px;
    margin: 10px;
}
.left{
    .item{
        background-color: #7e22ce;
    }
}
.right {
    .item{
        background-color: #db2777;
    }
}
</style>
