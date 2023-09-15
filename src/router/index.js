import { createRouter, createWebHistory } from 'vue-router'
import CreateBranchView from '../views/CreateBranchView.vue'
import EditBranchView from '../views/EditBranchView.vue'
import ListBranchesView from '../views/ListBranchesView.vue'

import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'

import PostDetailsView from '../views/PostDetailsView.vue'

import LandingView from '../views/LandingView.vue'
import ListPostsView from '../views/ListPostsView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'

import EmployeeListPostsView from '../views/EmployeeListPostsView.vue'


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
      component: CreateBranchView
    },
    {
      path: '/edit-branch/:id',
      name: 'edit-branch',
      component: EditBranchView
    },
    {
      path: '/create-post',
      name: 'create-post',
      component: CreatePostView
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: EditPostView
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
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/employee-posts',
      name: 'employee-posts',
      component: EmployeeListPostsView
    }
  ]
})

export default router
