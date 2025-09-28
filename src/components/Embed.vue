<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'
const active = ref(false)
const roll=ref(false)
const handleClick = ()=>{
  active.value=true
  roll.value=true
}
</script>

<template>
    <Flip :mutation="roll" :animate-option="{duration: 2000}" name="roll" selector=".box">
        <Flip :mutation="active" :styles="['backgroundColor','transform']" :animate-option="{duration: 2000}">
          <div class="box" :class="{active,roll}" @click="handleClick"></div>
        </Flip>
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
      transform: scale(1.5);
  }
  &.roll{
      /* transform: translateX(200px); */
    transform: translate(200px,100px) scale(1.5);
  }
}
</style>
