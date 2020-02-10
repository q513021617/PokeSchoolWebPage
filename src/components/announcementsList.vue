<template>
  <v-container grid-list-md text-xs-center >
    <v-layout row wrap class="pt-2">
      <v-flex xs12 > <v-card class="my-3" hover max-width="500px" ><v-card-title primary-title><div class="headline"><h3 class="display-2">通知列表<v-icon x-large color="orange darken-2">volume_up</v-icon></h3></div></v-card-title>

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


      <v-flex  v-for="n in InformList" :key="n.id" xs6 md3>
        <v-card class="my-3" hover>
          <!--errorImg01-->
          <v-card-title primary-title>
            <div class="headline text-truncate">{{n.title}}</div>
          </v-card-title>
          <v-container fill-height fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline"></span>
              </v-flex>
            </v-layout>
          </v-container>

          <v-card-text class="text-truncate">
            {{n.content}}
          </v-card-text>

          <v-card-actions>

            <v-btn flat icon class="secondary" @click="goToRouteLink(infoDetail,n.id)">
              <v-icon>more_horiz</v-icon></v-btn>
          </v-card-actions>

        </v-card>




      </v-flex>

      <v-flex xs12 >
        <div class="text-xs-center">
          <v-pagination
            v-model="paginationS.page"
            :length="paginationS.pagetotal"
            circle
            color="secondary"

            @input="onPageChange"
          ></v-pagination>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import * as VCard from "vuetify/lib/components/VCard";
  import * as VDivider from "vuetify/lib/components/VDivider";
  import * as axios  from "axios";
  import * as Vpaginatio from "vuetify/lib/components/VPagination";
  import * as httpUtil from '../util/http';
  import GlobalVariable from './GlobalVariable';
  import * as VImg from "vuetify/lib/components/VImg";
  import * as VprogressLinear from 'vuetify/lib/components/VProgressLinear';
    export default {
      components: {
        ...VCard,
        ...VDivider,
        ...axios,
        ...Vpaginatio,
        ...VImg,
        ...VprogressLinear
      },
      data () {
        return {
          errorImg01:"/static/img/default.jpeg",
          showAnnounCementLoader:true,
          InformList:[],
          getInformListListApi:GlobalVariable.informList,
          paginationS:{page: 1,pagesize:20,
            pagetotal:1},
          infoDetail:"/announcementsDetail",

        }

      },mounted:function(){


        var InfoLink =httpUtil.fetch(this.getInformListListApi+"?pagestart=1&pageend=20");
        var InformListN=[];
        var InformListNN="";
        var self = this;
        var imgUrlList=[];
        InfoLink.then(function (dataN) {
          console.log(dataN);
          InformListN=dataN.data;
          // pageS
          InformListNN=InformListN.informlist;
          console.log(InformListNN);
          // self.paginationS.pagetotal=InformListN.cout/self.paginationS.pagesize;
          self.paginationS.pagetotal=1;
          self.InformList=InformListNN;
          self.showAnnounCementLoader=false;
        }).catch(
          err => {console.log(err)}
        );

      },
      methods:{
        goToRouteLink:function(url,id){

          this.$router.push({
            path:`/announcementsDetail/${id}`,
          });



        },

        onPageChange(newPage)
        {
          var nowstart=20*(newPage-1)+1;
          var newsLink =httpUtil.fetch(GlobalVariable.informList+"?pagestart="+nowstart+"&pageend="+(newPage*20));
          var newlist="";
          var newsListNN="";
          var self = this;

          newsLink.then(function (dataN) {
            newlist=dataN.data;

            newsListNN=newlist.newslist;
            console.log("newsListNN "+newsListNN);

            self.NewsList=newsListNN;
            self.showAnnounCementLoader=false;
            console.log("NewsList:"+self.NewsList)
          }).catch(
            err => {console.log(err)}
          );
        }

      },

        name: "announcementsList"
    }
</script>

<style>
  .newscontainer {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .newscontainer.fold {
    -webkit-line-clamp: 3;
  }
</style>
