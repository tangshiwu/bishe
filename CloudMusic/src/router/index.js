import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')
const music = () => import('../pages/music')
const recommend = () => import('../pages/recommend')
const search = () => import('../pages/search')
const songList = () => import('../pages/songList')
const listened = () => import('../pages/listened')
const playList = () => import('../pages/playList')
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect:'/music',
    },
    {
      path: '/',
      component:index,
      children:[
        {
          path:'/music',
          component:music,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/recommend',
          component:recommend,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/search',
          component:search,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/songList',
          component:songList,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/listened',
          component:listened,
          meta:{
            keepAlive:true
          }
        },
        {
          path: '/playList/:id',
          component:playList,
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})
