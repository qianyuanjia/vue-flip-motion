<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'
const active = ref(false)
const roll=ref(false)
const handleClick = ()=>{
  roll.value=true
}
</script>

<template>
    <Flip :mutation="roll" :animate-option="{duration: 3000}" name="roll">
          <div class="box" :class="{active,roll}" @click="handleClick"></div>
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
    transform: translate(200px,100px);
  }
}
</style>
