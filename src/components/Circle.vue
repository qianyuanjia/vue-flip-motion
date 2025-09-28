<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'
const active = ref(false)
const handleClick = ()=>{
  active.value=true
}
</script>

<template>
  <Flip :mutation="active" :styles="['backgroundColor','transform']" :animate-option="{duration: 2000}">
    <div class="box" :class="{active}" @click="handleClick"></div>
  </Flip>
</template>

<style  scoped>
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  &.active{
      background-color: green;
      transform: scale(2);
  }
}
</style>
