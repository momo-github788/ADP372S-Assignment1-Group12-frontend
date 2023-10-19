import { createRouter, createWebHistory } from 'vue-router'
import CreateBranchView from '../views/CreateBranchView.vue'
import EditBranchView from '../views/EditBranchView.vue'
import ListBranchesView from '../views/ListBranchesView.vue'
import { useToast } from "vue-toastification";

import CreateInventoryView from '../views/CreateInventoryView.vue'
import ListInventoriesView from '../views/ListInventoriesView.vue'
import EditInventoryView from '../views/EditInventoryView.vue'


import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'

import PostDetailsView from '../views/PostDetailsView.vue'

import LandingView from '../views/LandingView.vue'
import ListPostsView from '../views/ListPostsView.vue'
import RegisterUserView from '../views/RegisterUserView.vue'
import RegisterEmployeeView from '../views/RegisterEmployeeView.vue'
import LoginUserView from '../views/LoginUserView.vue'
import LoginEmployeeView from '../views/LoginEmployeeView.vue'
import UserWatchlistedPostsView from '../views/UserWatchlistedPostsView.vue'
import EmployeeListPostsView from '../views/EmployeeListPostsView.vue'
import updateUserView from '../views/updateUserView.vue'
import authService from '../services/AuthService';
import { store } from '../store/Store';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView
    },
    {
      path: '/branches',
      name: 'branches',
      component: ListBranchesView
    },
    {
      path: '/create-branch',
      name: 'create-branch',
      component: CreateBranchView,
      meta: {requiresAuth: true}
    },
    {
      path: '/edit-branch/:id',
      name: 'edit-branch',
      component: EditBranchView,
      meta: {requiresAuth: true}
    },
    {
      path: '/create-inventory',
      name: 'create-inventory',
      component: CreateInventoryView,
      meta: {requiresAuth: true}
    },
    {
      path: '/edit-inventory/:id',
      name: 'edit-inventory',
      component: EditInventoryView,
      meta: {requiresAuth: true}
    },
    {
      path: '/inventories',
      name: 'inventories',
      component: ListInventoriesView
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePostView,
      meta: {requiresAuth: true}
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: EditPostView,
      meta: {requiresAuth: true}
    },
    {
      path: '/posts',
      name: 'posts',
      component: ListPostsView
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: PostDetailsView
    },
    {
      path: '/watchlisted',
      name: 'watchlisted',
      component: UserWatchlistedPostsView,
      meta: {requiresAuth: true, requiresUser: true}
    },
    {
      path: '/registerUser',
      name: 'registerUser',
      component: RegisterUserView
    },
    {
      path: '/registerEmployee',
      name: 'registerEmployee',
      component: RegisterEmployeeView
    },
    {
      path: '/loginUser',
      name: 'loginUser',
      component: LoginUserView
    },
    {
      path: '/loginEmployee',
      name: 'loginEmployee',
      component: LoginEmployeeView
    },
    {
      path: '/updateUser',
      name: 'updateUser',
      component: updateUserView,
    },
    {
      path: '/employee-posts',
      name: 'employee-posts',
      component: EmployeeListPostsView,
      meta: {requiresAuth: true}
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import ('../views/NotFoundView.vue')
    }
  ]
})


// Make sure each time that a user is authenticated before accessing specific views on frontend
router.beforeEach((to, from, next) => {

  if(to.matched.some(r => r.meta.requiresAuth)) {
    const user = authService.getCurrentUserJwt();
    const toast = useToast();

    // const isUser = store.isUser;
    // const isAdmin = store.isAdmin;

    if(!user) {
      toast.info("You are not allowed to access this resource.")
      next('/loginEmployee') // Redirect them to login page
    }
  }
  next();
})

export default router
