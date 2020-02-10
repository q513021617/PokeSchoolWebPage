<template>

  <div style="background-color: #4e342e">
  <v-flex xs12 >


    <v-layout row >
      <v-flex xs2 md4></v-flex>
      <v-flex xs8 md4>

<v-flex v-for="info in findmissInformations"  :key="info.id">
      <v-card class="my-3"
        dark
        hover

      >
        <v-toolbar
          color="#260c1a"
          dark
          height="30px"
        >
        </v-toolbar>
        <v-img
          :src="cdnurl+info.image"
          height="130px"
        ></v-img>
        <v-container fill-height fluid>
          <v-layout>
            <v-flex xs12 align-end d-flex>
              <span class="headline text-truncate">{{info.username}}</span>
            </v-flex>
          </v-layout>

        </v-container>



        <v-card-text class="">
          {{info.content}}
        </v-card-text>



      </v-card>
</v-flex>

      </v-flex>




      <v-flex
        align-right
        justify-center
        layout
      >

      </v-flex>
</v-layout>
    <flex xs2 md4></flex>

  </v-flex>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<script>
  import * as VCard from "vuetify/lib/components/VCard";
  import * as VCarousel from "vuetify/lib/components/VCarousel";
  import * as VSubheader from "vuetify/lib/components/VSubheader";
  import * as VDivider from "vuetify/lib/components/VDivider";
  import * as VTextarea from "vuetify/lib/components/VTextarea";
  import * as VDialog from "vuetify/lib/components/VDialog";
  import * as VTefiled from "vuetify/lib/components/VTextField";
  import * as VForm from "vuetify/lib/components/VForm";
  import * as VImg from "vuetify/lib/components/VImg";
  import * as Vbtn from "vuetify/lib/components/VBtn";
  import * as axios  from "axios";
  import * as httpUtil from '../util/http';
  import * as baseUtil from '../baseUtil';
  import GlobalVariable from './GlobalVariable';
  export default {
    components: {
      ...VCard,
      ...VCarousel,
      ...VSubheader,
      ...VDivider,
      ...VTextarea,
      ...VForm,
      ...VDialog,
      ...VTefiled,
      ...VImg,
      ...axios,
      ...Vbtn
    },
    data () {
      return {
        model: {},
        fields: {},
        rules: {},
        FoundMissUrl:GlobalVariable.FindMissList,
        dialog: false,
        cdnurl:"http://pocket-img.ykhuo.com",
        findmissInformations:[],

        messages:{title:"",content:"",imgUrl:""},
        clear:{}

      }



    },
    mounted:function(){

      var stuName=baseUtil.getCookie("username");
      var stuNum=baseUtil.getCookie("usernumber");

      if(stuNum ===  undefined || stuNum === "" || stuName===undefined || stuNum ===  null){
        alert("未登录不能查看");
        location.href="/";
      }


      var FindMissLink =httpUtil.fetch(this.FoundMissUrl);
      var FindMissListNN="";

      var self=this;
      FindMissLink.then(function (dataN) {

        console.log(dataN);
        console.log(dataN.data.foundlist);
        self.findmissInformations=dataN.data.foundlist;



      }).catch(
        err => {console.log(err)}
      );

    }


  }



        </script>
