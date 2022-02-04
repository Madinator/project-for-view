import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Mask from 'maska'
import App from './App.vue'
import './index.css'
import './styles/main.scss';
import BaseButton from './components/base/BaseButton.vue'
import BaseCheckbox from './components/base/BaseCheckbox.vue'
import BaseInput from './components/base/BaseInput.vue'
import BaseSelect from './components/base/BaseSelect.vue'
import BaseTable from './components/base/BaseTable.vue'
import ModalError from './components/modals/ModalError.vue'
import ModalInfo from './components/modals/ModalInfo.vue'
import ModalQuestion from './components/modals/ModalQuestion.vue'


const app = createApp(App);

app.component('BaseButton', BaseButton)
app.component('BaseCheckbox', BaseCheckbox)
app.component('BaseInput', BaseInput)
app.component('BaseSelect', BaseSelect)
app.component('BaseTable', BaseTable)
app.component('ModalError', ModalError)
app.component('ModalInfo', ModalInfo)
app.component('ModalQuestion', ModalQuestion)

app.use(createPinia())
app.use(Mask)
app.mount('#app')
