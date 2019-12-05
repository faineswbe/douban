import Vue from 'vue'
import Router from 'vue-router'
import main from '@/page/main'
import home from '@/components/main/home'
import book from '@/components/main/book'
import group from '@/components/main/group'
import fair from '@/components/main/fair'
import center from '@/page/center'

//查找主页面
import query from '@/page/query'
//电影详情
import subject from '@/page/subject'
//院线电影
//电影详情
import cinema from '@/page/cinema'


//book书影音
import city from '@/components/main/book/city'
import movie from '@/components/main/book/movie'
import music from '@/components/main/book/music'
import novel from '@/components/main/book/novel'
import read from '@/components/main/book/read'
import tv from '@/components/main/book/tv'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/main',
      name: 'main',
      component: main,
      children:[
        {
          path: '/home',
          name: 'home',
          component: home,
        },
        {
          path: '/book',
          name: 'book',
          component: book,
          redirect:'/book/movie',
          children:[
            {
              path: 'city',
              name: 'city',
              component: city,
            },
            {
              path: 'movie',
              name: 'movie',
              component: movie,
            },
            {
              path: 'music',
              name: 'music',
              component: music,
            },
            {
              path: 'novel',
              name: 'novel',
              component: novel,
            },
            {
              path: 'read',
              name: 'read',
              component: read,
            },
            {
              path: 'tv',
              name: 'tv',
              component: tv,
            },
            { path: '*', redirect: '/book/movie' }
          ]
        },
        {
          path: '/group',
          name: 'group',
          component: group,
        },
        {
          path: '/fair',
          name: 'fair',
          component: fair,
        },
        { path: '/', redirect: '/home' }
      ]
    },
    {
      path: '/center',
      name: 'center',
      component: center,
    },
    {
      path: '/query',
      name: 'query',
      component: query,
    },
    {
      path: '/subject/:id',
      name: 'subject',
      component: subject,
    },
    {
      path: '/cinema/:id',
      name: 'cinema',
      component: cinema,
    },
    { path: '/', redirect: '/main' }
  ]
})
