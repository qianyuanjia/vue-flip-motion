<script setup>
import { ref ,computed} from 'vue'
import Flip from './Flip/index.vue'
const styles = ref({})
const handleClick = ()=>{
  styles.value.height = '200px'
  styles.value.bgColor = 'red'
}
</script>

<template>
  <Flip :mutation="styles" :styles="['backgroundColor']" :animate-option="{duration: 2000}">
    <div class="box" @click="handleClick" :style="{height:styles.height,
      background:styles.bgColor
    }"></div>
  </Flip>
</template>

<style scoped>
.box {
  background-color: pink;
  width: 100px;
  height: 100px;
}
</style>
