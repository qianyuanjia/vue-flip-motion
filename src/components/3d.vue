<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'
const active = ref(false)
const handleClick = ()=>{
  active.value=true
}
</script>

<template>
  <Flip :mutation="active" :animate-option="{duration: 2000}" selector=".box" :styles="['position-x','position-y','transform']">
    <div class="box-wrapper">
      <div class="box" :class="{active}" @click="handleClick"></div>
    </div>
  </Flip>
</template>

<style  scoped>
.box-wrapper{
  perspective: 800px;
}
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transform: rotateX(45deg);
  &.active{
      transform: translate3d(100px,100px,300px) rotateX(45deg);
  }
}
</style>
