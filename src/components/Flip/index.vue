<template>
    <div ref="flipRef">
        <slot />
    </div>
</template>
<script setup>
import {ref,watch,nextTick, computed} from 'vue'
import { Flip } from './index'
const props = defineProps({
  mutation:{
    type: [Array, Object, Number , String ,Boolean],
    default: undefined
  },
  animateOption:{
    type: Object,
    default: () => ({
      duration: 200
    })
  },
  styles:{
    type: Array,
    default: () => []
  }
})
const flipRef = ref()

watch(()=>props.mutation,()=>{
  Array.from(flipRef.value.children).forEach(element=>{
    if(!element.__flip){
      const flip = new Flip({
        animateOption:props.animateOption,
        styles:props.styles
      })
      element.__flip = flip
    }
    element.__flip.captureFirstState(element)
    nextTick(()=>{
      element.__flip.flip(element)
    })
  })
},{deep:true})
</script>
