<template>
    <Flip class="wrapper" :mutation="components">
        <div
            v-for="item in components"
            :key="item.key"
            class='box'
            :style="{
                backgroundColor: item.bg
            }"
        ></div>,
    </Flip>
</template>
<script setup>
import { onMounted,ref } from 'vue'
import Flip from './Flip/index.vue'
const shuffle = function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const components = ref([
    {
        key: '1',
        bg:'#ec4899'
    },
    {
        key: '2',
        bg:'#9333ea'
    },
    {
        key: '3',
        bg:'#ef4444'
    },
    {
        key: '4',
        bg:'#60a5fa'
    },
])
onMounted(() => {
    setInterval(() => {
      components.value = shuffle([...components.value]);
    }, 1000);
  });
</script>
<style scoped>
.wrapper{
    width: 240px;
}
.box{
    width: 100px;
    height: 100px;
    margin: 10px;
    border-radius: 8px;
    display: inline-block;
}
</style>


