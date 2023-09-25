import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from '../src/components/Navbar.vue'
import PostCard from '../src/components/PostCard.vue'
import BranchCard from '../src/components/BranchCard.vue'
import PostCardWatchlist from '../src/components/PostCardWatchlist.vue'
import InventoryCard from '../src/components/InventoryCard.vue'
import MultiSelect from 'vue-multiselect';
//import 'vue-multiselect/dist/vue3-multiselect.css';
import PostCardEmployee from '../src/components/PostCardEmployee.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";


createApp(App)
    .use(Toast)
    .use(router)
    .component('MultiSelect', MultiSelect)
    .component('PostCardWatchlist', PostCardWatchlist)
    .component('Navbar', Navbar)
    .component('InventoryCard', InventoryCard)
    .component('PostCard', PostCard)
    .component('PostCardEmployee', PostCardEmployee)
    .component('BranchCard', BranchCard)
    .mount('#app')
