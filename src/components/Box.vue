<script setup>
import { ref } from 'vue'
import Flip from './Flip/index.vue'
const style=ref({

})
// setTimeout(()=>{
//   style.value={
//     backgroundColor:'red'
//   }
// },3000)
</script>

<template>
  <Flip>
    <div class="box"></div>
  </Flip>
</template>

<style scoped>
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
  &:hover{
    width: 200px;
    height: 200px;
  }
}
</style>
