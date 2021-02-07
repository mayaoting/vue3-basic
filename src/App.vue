<template>
  <h1>{{count}}</h1>
  <button @click="increase">+1</button>
  <h1>{{double}}</h1>
  <h1>X:{{x}}, Y{{y}}</h1>
  <h1 v-if="loading">Loading.......</h1>
  <!-- <img v-if="loaded" :src="result[0].url"> -->
  <ul>
    <li v-for="number in numbers" :key="number">
      {{number}}
    </li>
    {{person.name}}
  </ul>
  <button @click="updateGreeting">updated</button>
  <button @click="openModal">open Modal</button>
  <Modal :isOpen='modalIsOpen' @close-modal="onModalClose"/>
  <div>
    <Suspense>
    <template #default>
      <async-show></async-show>
    </template>
    <template #fallback>
      loading!!!!!
    </template>
  </Suspense>
  </div>
  
</template>

<script lang="ts">
import { ref,computed, reactive, toRefs, watch} from 'vue'
import useMousePosition from './hooks/useMousePosition'
import useURLLoaders from './hooks/useURLLoaders'
import Modal from './components/Modal.vue'
import AsyncShow from './components/AsyncShow.vue'

interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: {name?: string};
}
interface DogResult {
  messsage: string;
  status: string;
}
//泛型改造
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}


export default ({
  name: 'App',
  components: {
    Modal,AsyncShow
  },
  setup() {

    // 响应式对象 ref 
    // const count = ref(0)
    // const increase = () => {
    //   count.value++
    // }
    // const double = computed(() => {
    //   return count.value * 2
    // })
    const modalIsOpen = ref(false)
    const openModal = () => {
      modalIsOpen.value = true;
    }
    const onModalClose = () => {
      modalIsOpen.value = false
    }
    const { result, loading, loaded } = useURLLoaders<CatResult[]>('https://api.thecatapi.com/v1/images/search?limit=1')
    const {x, y} = useMousePosition()
    const greetings = ref('')
    const updateGreeting = () => {
      greetings.value += 'Hello'
    }
    
    const data: DataProps = reactive({
      count: 0,
      increase: () => {data.count ++},
      double: computed( () => data.count * 2),
      numbers: [0,1,2],
      person:{}
    })
    
    watch(result, () => {
      if(result.value) {
        console.log('value',result)
      }
    })
    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log('old',oldValue)
      console.log('new',newValue)
      document.title = 'updated' + greetings.value + data.count
    })
    data.numbers[0] = 5
    data.person.name = 'viking'
    const refData = toRefs(data)
    return {
      // ...data
      ...refData,
      greetings,
      updateGreeting,
      x,
      y,
      result,
      loaded,
      loading,
      modalIsOpen,
      openModal,
      onModalClose
      // count,
      // increase,
      // double
    }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
