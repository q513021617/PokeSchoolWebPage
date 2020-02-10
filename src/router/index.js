import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'

import classinfomation from '@/components/class'

import MoodSquare from '@/components/MoodSquare'

import PersonInformation from '@/components/PersonInformation'
import FoundMiss from '@/components/FoundMiss'
import QueryWuliu from '@/components/searchTransport'
import announcementsList from '@/components/announcementsList'
import newsList from '@/components/newsList'
import informationDetail from '@/components/informationDetail'

import newsDetail from '@/components/newsDetail'
import announcementsDetail from '@/components/announcementsDetail'
import quit from '@/components/Quit'
import searchNCRE from '@/components/searchNCRE'
import searchCET from '@/components/searchCET'
import about from '@/components/about'
import remindtask from '@/components/RemindTask'
import download from '@/components/download'
import loginregister from '@/components/loginRgister'
Vue.use(Router);

export default new Router({

  // base: '/hot/',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },{

      path:'/class',
      name:'classinfomation',
      component:classinfomation
    },
    {
      path:'/MoodSquare',
      name:'MoodSquare',
      component:MoodSquare

    },
    {

      path:'/PersonInformation',
      name:'PersonInformation',
      component:PersonInformation

    }
    ,
    {
      path:'/quit',
      name:'quit',
      component:quit
    },
    {

      path:'/FoundMiss',
      name:'FoundMiss',
      component:FoundMiss

    },

    {

      path:'/announcementsList',
      name:'announcementsList',
      component:announcementsList

    },

    {

      path:'/announcementsDetail/:id',
      name:'announcementsDetail',
      component:announcementsDetail

    },

    {

      path:'/newsList',
      name:'newsList',
      component:newsList

    },
    {

      path:'/informationDetail',
      name:'informationDetail',
      component:informationDetail

    },
    {
      path:'/QueryWuliu',
      name:'QueryWuliu',
      component:QueryWuliu

    },
    {
      path:'/searchCET',
      name:'searchCET',
      component:searchCET

    },{
      path:'/searchNCRE',
      name:'searchNCRE',
      component:searchNCRE

    },
    {
      path:'/newsDetail/:id',
      name:'newsDetail',
      component:newsDetail
      // props: true

    },{
    path:'/about',
    name:'about',
     component:about
    },
    {
      path:'/remindtask',
      name:'remindtask',
      component:remindtask

    },{

      path:'/download',
      name:'download',
      component:download
    },
    //
    {

      path:'/loginregister',
      name:'loginregister',
      component:loginregister
    }
  ]
})
