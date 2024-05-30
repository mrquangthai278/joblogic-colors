import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    redirect: { name: 'template' }
  },
  {
    path: '/template/:slug',
    name: 'template',
    component: () => import(/* webpackChunkName: "template" */ '../views/TemplateView.vue'),
    props: route => ({ slug: route.params.slug })

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
