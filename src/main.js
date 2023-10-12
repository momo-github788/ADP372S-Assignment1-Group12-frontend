import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Navbar from '../src/components/Navbar.vue'
import PostCard from '../src/components/PostCard.vue'
import BranchCard from '../src/components/BranchCard.vue'
import PostCardWatchlist from '../src/components/PostCardWatchlist.vue'
import InventoryCard from '../src/components/InventoryCard.vue'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import AuthService from './services/AuthService'
import jwtDecode from 'jwt-decode'

const userJwt = AuthService.getCurrentUserJwt().jwt;
console.log("uwer jwt")
console.log(userJwt)

if (userJwt) {
    const decodedToken = jwtDecode(userJwt);
    console.log("decoded")
    console.log(decodedToken)
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
        AuthService.logout();
        window.location.reload();
        window.location.href = "/register"
    }
}


createApp(App)
    .use(Toast)
    .use(router)
    .component('PostCardWatchlist', PostCardWatchlist)
    .component('Navbar', Navbar)
    .component('InventoryCard', InventoryCard)
    .component('PostCard', PostCard)
    .component('BranchCard', BranchCard)
    .mount('#app')
