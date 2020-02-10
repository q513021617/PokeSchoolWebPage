<template>


    <v-container grid-list-md text-xs-center >


      <v-layout row wrap class="pt-2">




        <v-flex xs12 > <v-card class="my-3" hover max-width="500px" ><v-card-title primary-title><div class="headline">
          <h5 class="display-2 hidden-xs-only">校园实时热点<v-icon x-large color="orange darken-2">volume_up</v-icon></h5>
          <h2 class="display-5 hidden-xl-only hidden-sm-only hidden-lg-only hidden-md-only">校园实时热点<v-icon x-large color="orange darken-2">volume_up</v-icon></h2>
        </div></v-card-title>

        </v-card>


          <div class="text-xs-center">
            <v-progress-linear :size="70"
                               :width="7"
                               color="purple"
                               v-show="showBannersLoader"
                               indeterminate>

            </v-progress-linear>
          </div>


        </v-flex>

        <v-flex xs12>

          <v-carousel

          >

            <v-carousel-item
              v-for="(ban,i) in banners"

              :key="i"
              :src=ban.newImage
            >

            </v-carousel-item>
          </v-carousel>

        </v-flex>

        <v-flex xs12 class="py-5">


          <v-layout row >



            <v-flex xs4 v-for="query in queryfunction"  :key="query.id">
              <v-btn block color="secondary" dark v-on:click="goToRouteLink(query.url)">{{query.title}}</v-btn>

            </v-flex>

          </v-layout>

          <v-layout row class="hidden-md-only hidden-xl-only hidden-lg-only hidden-sm-only">
          <v-btn block color="secondary" dark v-on:click="goToRouteLink('/FoundMiss')">失物招领</v-btn>
          </v-layout>
        </v-flex>


        <v-flex xs12 class="py-5"> <v-card class="my-3" hover max-width="500px"><v-card-title primary-title><div class="headline">
          <h3 class="display-2 hidden-xs-only">校园通知公告<v-icon x-large color="orange darken-2">volume_up</v-icon></h3>
          <h2 class="display-5 hidden-md-only hidden-lg-only hidden-sm-only hidden-xl-only">校园通知公告<v-icon x-large color="orange darken-2">volume_up</v-icon></h2>
        </div></v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="goToRouterLink(announcementlink)">详情</v-btn>
          </v-card-actions>
        </v-card>


          <div class="text-xs-center">
            <v-progress-linear :size="70"
                               :width="7"
                               color="purple"
                               v-show="showAnnounCementLoader"
                               indeterminate>

            </v-progress-linear>
          </div>
        </v-flex>





        <v-flex v-for="announcement in AnnouncementsList"  :key="announcement.id" xs6>

          <v-card

            hover
           >
            <v-card-title primary-title>

              <div class="headline text-truncate">{{announcement.title}}</div>

            </v-card-title>
            <v-card-text class="text-truncate" xs12>
              {{announcement.content}}
            </v-card-text>

            <v-card-actions>
              <v-btn flat color="orange" @click="goToinformationDetailLink(AnnouncementsDetail,announcement.id)">详情</v-btn>
            </v-card-actions>
          </v-card>
         <br/>






        </v-flex>




        <v-flex xs12 class="py-5">
          <v-card class="my-3" hover max-width="500px" >
            <v-card-title primary-title><div class="headline">
              <h3 class="display-2 hidden-xs-only">校园新闻<v-icon x-large color="orange darken-2">volume_up</v-icon></h3>
              <h2 class="display-5 hidden-md-only hidden-xl-only hidden-sm-only hidden-lg-only">校园新闻<v-icon x-large color="orange darken-2">volume_up</v-icon></h2>
            </div></v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" @click="goToRouterLink(newslink)">详情</v-btn>
          </v-card-actions>
        </v-card>

          <div class="text-xs-center">
            <v-progress-linear :size="70"
                               :width="7"
                               color="purple"
                               v-show="showNewsLoader"
                               indeterminate>

            </v-progress-linear>
          </div>
        </v-flex>


        <v-flex  v-for="n in NewsInfoList" :key="n.id" xs6 md3>
          <v-card class="my-3" hover>

            <v-img :src="n.newImage" :onerror="errorImg01" height="130px"></v-img>
              <v-container fill-height fluid>
                <v-layout>
                  <v-flex xs12 align-end d-flex>
                    <span class="v-list--two-line"> {{n.title}}</span>
                  </v-flex>
                </v-layout>
              </v-container>

            <v-card-text class="text-truncate">
                {{n.content}}
            </v-card-text>

            <v-card-actions xs12>

              <v-btn flat color="orange" @click="goToinformationDetailLink(newDetail,n.id)">详情</v-btn>
            </v-card-actions>

          </v-card>




        </v-flex>

      </v-layout>

    </v-container>

</template>

<script>

  import * as VCard from "vuetify/lib/components/VCard";
  import * as VCarousel from "vuetify/lib/components/VCarousel";
  import * as VSubheader from "vuetify/lib/components/VSubheader";
  import * as VDivider from "vuetify/lib/components/VDivider";
  import * as VImg from "vuetify/lib/components/VImg";
  import * as axios  from "axios";
  import * as httpUtil from '../util/http';
  import * as baseUtil from '../baseUtil';
  import GlobalVariable from './GlobalVariable';
  import * as VprogressLinear from 'vuetify/lib/components/VProgressLinear';
  export default {
    components: {
      // VListGroup,
      ...VCard,
      ...VCarousel,
      ...VSubheader,
      ...VDivider,
      ...axios,
      ...VImg,
      ...GlobalVariable,
      ...baseUtil,
      ...httpUtil,
      ...VprogressLinear
    },
    data () {
      return {
        errorImg01:"https://cdn.vuetifyjs.com/images/parallax/material2.jpg",
        announcementlink:"/announcementsList",
        newslink:"/newsList",
        newDetail:"/newsDetail",
        showBannersLoader:true,
        showNewsLoader:true,
        showAnnounCementLoader:true,
        QueryWuliu:"/QueryWuliu",
        getnewListApi:GlobalVariable.newsList,
        titleasdasd:"titleasdasd",
        //localStorage.getItem("newsListIndex")
        NewsInfoList: [],
        AnnouncementsList:[],
        AnnouncementsDetail:"/announcementsDetail",
        getLogisticalInformation:function(){

          // axios.get("/wuliuApi/app/?coname=youname").then(
          //   function (res) {
          //
          //     this.newpage = res.data;
          //   }.bind(this)).catch(
          //   function (err) {
          //     console.log(err)
          //   }
          // );
          // this.$router.push("/wuliuApi/app/?coname=youname");
          // window.location="/wuliuApi/app/?coname=youname"
        },


        goToRouteLink:function(url){

          this.$router.push(url);


        },
        goToinformationDetailLink:function(url,id){

          this.$router.push({
            path:url+`/${id}`,
          });

        },

        announcements :[],
        queryfunction:[

          {title:"物流查询",url:"/QueryWuliu"},
          {title:"CET成绩查询",url:"/searchCET"},
          {title:"NCRE查询",url:"/searchNCRE"},

        ],


    banners:[]


  }




  },
    mounted:function(){

      let expireDays = 1000 * 60 * 60 ;


      var newsLink =httpUtil.fetch(this.getnewListApi+"?pagestart=1&pageend=8");
      var announcementListLink =httpUtil.fetch(GlobalVariable.informList+"?pagestart=1&pageend=6");

      var newsListNN="";
      var self = this;
      var imgUrlList=[];
      newsLink.then(function (dataN) {

        self.NewsInfoList=dataN.data.newslist;
        newsListNN=dataN.data.newslist;
        for(var n in newsListNN){

          if(newsListNN[n].newImage!="" && newsListNN[n].newImage!=undefined)
            imgUrlList.push(newsListNN[n]);
          self.showBannersLoader=false;
          self.showNewsLoader=false;
          self.showAnnounCementLoader=false;
        }
        self.banners=imgUrlList;

      }).catch(

        err => {console.log(err);
          self.showBannersLoader=false;
          self.showNewsLoader=false;
          self.showAnnounCementLoader=false;
        }
      );
      announcementListLink.then(
        function (data) {
          console.log(data);

          self.AnnouncementsList=data.data.informlist;
          // console.log(self.AnnouncementsList);
        }).catch(
        err => {console.log(err)}
      );


    },

  methods:{

    goToRouterLink:function(url){


      this.$router.push(url);
    }

  },created:{



    }
  }
</script>
