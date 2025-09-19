<template>
    <div ref="flipRef">
        <slot />
    </div>
</template>
<script setup>
import {ref,onMounted} from 'vue'
import { Flip } from './index'
const flipRef = ref()

onMounted(()=>{
  const resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      console.log('新尺寸:', entry.contentRect)
      // console.log('新位置:', entry.target.getBoundingClientRect())
      requestAnimationFrame(()=>{
        entry.target.__flip.flip(entry.target).then(()=>{
          entry.target.__flip.captureFirstState(element)
        })
      })
    })
  })
  Array.from(flipRef.value.children).forEach(element=>{
    const flip = new Flip({
      duration:2000,
      action:['size']
    })
    flip.captureFirstState(element)
    element.__flip = flip
    resizeObserver.observe(element)
  })
})
</script>
