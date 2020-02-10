<template>
  <v-container grid-list-md text-xs-center >
    <v-layout row wrap class="pt-2">
      <v-flex xs12 >
        <!--<v-card class="my-3" hover >-->
          <!--<v-card-title primary-title><div class="headline"><h3 class="display-2">{{announcemtitle}}</h3></div>-->
          <!--</v-card-title>-->

        <!--</v-card>-->
        <h3 class="display-1">{{announcemtitle}}</h3>
      </v-flex>


      <v-flex xs12 >

        <p class="text-xs-center body-2 font-weight-medium font-italic pt-3 mx-3" style="letter-spacing:3px;">

        {{content}}


</p>

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

      },
      data () {
        return {
          errorImg01:"/static/img/default.jpeg",
          announcemList:[],
          announcemListApi:GlobalVariable.informList,
          content:'',
          announcemtitle:'',


        }

        },
      mounted:function() {

        var newsLink =httpUtil.fetch(this.announcemListApi+"?id="+this.$route.params.id);

        var self = this;

        newsLink.then(function (dataN) {
          // console.log(dataN);


          self.content=dataN.data.inform.content;
          self.announcemtitle=dataN.data.inform.title;

        }).catch(
          err => {console.log(err)}
        );
      },created: function() {


      },
      watch: {

      },

        name: "announcementsDetail"
    }



</script>

<style scoped>

</style>
