<template>
  <v-container grid-list-md text-xs-center >
    <v-layout row wrap class="pt-2">
      <v-flex xs12 >

        <!--<v-card class="my-3" hover max-width="1000px" >-->
          <!--<v-card-title primary-title><div class="headline"><h3 class="display-2">{{newstitle}}</h3></div>-->
          <!--</v-card-title>-->

      <!--</v-card>-->

        <h3 class="display-2">{{newstitle}}</h3>

      </v-flex>


      <v-flex xs12 >

        <v-img :src="imgLink" xs6>

        </v-img>


      </v-flex>

      <v-flex>
        <p class="pt-5"> {{content}}</p>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import * as VCard from "vuetify/lib/components/VCard";
  import * as axios  from "axios";
  import * as httpUtil from '../util/http';
  import GlobalVariable from './GlobalVariable';
  import * as VImg from "vuetify/lib/components/VImg";

    export default {
      components: {
        ...VCard,
        ...axios,
        ...VImg
      },data () {
        return {
          errorImg01:"/static/img/default.jpeg",
          NewsList:[],
          getnewListApi:GlobalVariable.newsList,
          content:'',
          newstitle:'',
          imgLink:'',
          // id:$route.params.id
        }

      },mounted:function(){

        // alert("newsdetail");
        var newsLink =httpUtil.fetch(this.getnewListApi+"?id="+this.$route.params.id);
        var newlist="";
        var newsListNN="";
        var self = this;
        var imgUrlList=[];
        newsLink.then(function (dataN) {
          console.log(dataN);
          newlist=dataN.data;
          // pageS
          newsListNN=newlist.news;
          console.log(newsListNN);
          self.content=newsListNN.content;
          self.newstitle=newsListNN.title;
          self.imgLink=newsListNN.newImage;
        }).catch(
          err => {console.log(err)}
        );

      },created: function() {
        // alert("newsdetail");

      },
      watch: {

        },



        name: "newsDetail"
    }
</script>

<style scoped>

</style>
