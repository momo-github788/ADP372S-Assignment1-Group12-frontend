import { reactive } from 'vue'
import AuthService from '../services/AuthService'


export const store = reactive({
  isAuth: AuthService.getCurrentUserJwt() !== null,
  isUser: AuthService.getCurrentUserJwt() ? AuthService.getCurrentUserJwt().authorities.map(a => a.authority).some(role=>role==="USER") : null,
  isAdmin: AuthService.getCurrentUserJwt() ? AuthService.getCurrentUserJwt().authorities.map(a => a.authority).some(role=>role==="ADMIN") : null,

})