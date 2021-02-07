<template>
  <h2>{{result}}</h2>
</template>

<script>
import {defineComponent} from 'vue'
export default defineComponent({
    setup() {
        return new Promise((reslove) => {
            setTimeout(() => {
               return reslove({
                   result:42
               })
            },3000)
        })
    }
})
</script>

<style>

</style>