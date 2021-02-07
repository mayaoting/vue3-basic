<template>
    <teleport to="#modal"> 
    <div class="content" v-if="isOpen">
        <h2>  this is a modal</h2>
        <button @click="buttonClick">close</button>
    </div>
  </teleport> 
</template>

<script>
import {defineComponent} from 'vue'
export default {
    props:{
        isOpen:Boolean,
    },
    emits:{ 
        'close-modal': null
    },
    setup(props,content) {
        const buttonClick = () => {
            content.emit('close-modal')
        }
        return {
            buttonClick
        }
    }
}
</script>

<style>
.content {
    width: 200px;
    height: 200px;
    border: 2px solid black;
    background: white;
    position: fixed;
    left: 50%;
    touch-action: 50%;
    margin-left: -100px;
    margin-top: -100px;
}

</style>