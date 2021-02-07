import { createApp } from 'vue'
import App from './App.vue'

// 创建一个app的实例  解决了vue2上的直接在 vue对象上修改属性 
// 现在需要修改的话z 都可以直接操作 App 对象就可以
 
createApp(App).mount('#app')

/**
 * vue3 使用了 es6的 模块 import 和 export 这样是为了更好的使用 
 * 像webpack 的tree-shaking 来减小打包的代码大小。
 */
