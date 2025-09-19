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
  },
  name:{
    type: String,
    default: ''
  }
})
const flipRef = ref()

const flipOption = computed(()=>({
  animateOption:props.animateOption,
  styles:props.styles,
  name:props.name
}))

watch(()=>props.mutation,()=>{
  Array.from(flipRef.value.children).forEach(element=>{
    const flip = new Flip(flipOption.value)
    flip.captureFirstState(element)
    nextTick(()=>{
      flip.flip(element)
    })
  })
},{deep:true})
</script>
