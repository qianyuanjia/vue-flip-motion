<template>
    <div ref="flipRef">
        <slot />
    </div>
</template>

<script>
import { Flip } from './index'

export default {
    props: {
        mutation: {
            type: [Array, Object, Number, String, Boolean],
            default: undefined
        },
        animateOption: {
            type: Object,
            default: () => ({
                duration: 200
            })
        },
        styles: {
            type: Array,
            default: undefined
        },
        selector:{
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ''
        }
    },
    
    data() {
        return {
            flipRef: null
        }
    },
    
    computed: {
        flipOption() {
            return {
                animateOption: this.animateOption,
                styles: this.styles,
                name: this.name
            }
        }
    },
    
    watch: {
        mutation: {
            handler() {
                let elements =[]
                if(this.selector){
                    elements= this.$refs.flipRef.querySelectorAll(this.selector);
                }else{
                    elements = Array.from(this.$refs.flipRef.children);
                }
                elements.forEach(element => {
                    const flip = new Flip(this.flipOption)
                    flip.captureFirstState(element)
                    this.$nextTick(() => {
                        flip.flip(element).then(()=>{
                           this.$emit('finish')
                        })
                    })
                })
            },
            deep: true
        }
    }
}
</script>