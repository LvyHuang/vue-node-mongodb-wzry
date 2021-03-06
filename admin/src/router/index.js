import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryList from '../views/Category/CategoryList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children:[
      {path: '/categories/list',component: CategoryList}
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
