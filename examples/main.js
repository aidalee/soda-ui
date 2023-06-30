import { createApp } from 'vue'
import App from './layout/app.vue'
import router from './router'
import './styles/index.scss'
import DemoBlock from './layout/demo-block.vue'
import SodaUI from '@soda-f2e/ui'
// console.log('SodaUI', SodaUI)
import '@soda-f2e/ui/es/style.css'
const app = createApp(App)
app.component(DemoBlock.name, DemoBlock)
app.use(router)
app.use(SodaUI)
app.mount('#app')
