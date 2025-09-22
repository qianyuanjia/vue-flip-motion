<template>
    <div class="wrap">
        <button @click="items=shuffleArray(items)" style="margin-bottom: 10px;">shuffle</button>
        <Flip :mutation="items" :styles="['backgroundColor']" :animate-option="{duration:500}" selector=".even,.odd">
            <div class="bar" v-for="item in items" :class="item.class" :key="item.id" :style="{
                backgroundColor: item.color,
                width: item.width+'px'
            }">{{item.name}}</div>
        </Flip>
    </div>
</template>
<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'

const items=ref(new Array(10).fill(0).map((item,index)=>{
    return {
        id: index,
        name: `item ${index+1}`,
        class:index % 2 === 0 ? 'even' : 'odd'
    }
}))
function getRandomColor() {
  return '#' + Math.random().toString(16).substring(2, 8);
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function shuffleArray(array) {
  // 创建副本避免修改原数组
  const result = [...array].map(item=>{
    item.color = getRandomColor();
    item.width = getRandomNumber(100, 300);
    return item
  });
  for (let i = result.length - 1; i > 0; i--) {
    // 生成随机索引(0到i)
    const j = Math.floor(Math.random() * (i + 1));
    // ES6解构交换元素
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
</script>
<style scoped>
.wrap{
    width: 500px;
    padding-left: 100px;
}
.bar{
  background-color: cyan;
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
