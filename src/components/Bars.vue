<template>
  <button @click="items=shuffleArray(items)">shuffle</button>
  <Flip :mutation="items" :animate-option="{duration:200}">
    <div class="bar" v-for="item in items" :key="item.id">{{item.name}}</div>
  </Flip>
</template>
<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'

const items=ref([
  {
    id: 1,
    name: 'box1'
  },
   {
    id: 2,
    name: 'box2'
  },
   {
    id: 3,
    name: 'box3'
  },
   {
    id: 4,
    name: 'box4'
  },
   {
    id: 5,
    name: 'box5'
  },
])

function shuffleArray(array) {
  // 创建副本避免修改原数组
  const result = [...array];
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
.bar{
  background-color: cyan;
  width: 200px;
  height: 40px;
  margin-bottom: 10px;
}
</style>
