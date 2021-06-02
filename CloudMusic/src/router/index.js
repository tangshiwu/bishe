import Vue from 'vue'
import Router from 'vue-router'
const index = () => import('../pages/index')
const music = () => import('../pages/music')
const recommend = () => import('../pages/recommend')
const search = () => import('../pages/search')
const songList = () => import('../pages/songList')
const historyList = () => import('../pages/historyList')
const playList = () => import('../pages/playList')
const userList = () => import('../pages/userList')
const comment = () => import('../pages/comment')
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
          path: '/historyList',
          component:historyList,
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
        },
        {
          path: '/userList/:id',
          component:userList,
          meta: {
            keepAlive: true
          }
        },
        {
          path: '/comment/:id',
          component:comment,
          meta: {
            keepAlive: true
          }
        }
      ]
    }
  ]
})
