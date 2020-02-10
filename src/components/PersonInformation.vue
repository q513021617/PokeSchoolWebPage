<template>
  <v-layout row>
    <v-flex xs12 sm12>
      <v-card>
        <v-img
          src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
          height="300px"
        >
          <v-layout
            column
            fill-height
          >
            <v-card-title>
              <!--<v-btn dark icon>-->
                <!--<v-icon>chevron_left</v-icon>-->
              <!--</v-btn>-->

              <v-spacer></v-spacer>

              <!--<v-btn dark icon class="mr-3">-->
                <!--<v-icon>edit</v-icon>-->
              <!--</v-btn>-->

              <!--<v-btn dark icon>-->
                <!--<v-icon>more_vert</v-icon>-->
              <!--</v-btn>-->
            </v-card-title>

            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">{{person.username}}</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>
          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">perm_identity</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title color="primary">{{person.usernumber}}</v-list-tile-title>
              <v-list-tile-sub-title>usernumber</v-list-tile-sub-title>
            </v-list-tile-content>

            <!--<v-list-tile-action>-->
              <!--<v-icon>chat</v-icon>-->
            <!--</v-list-tile-action>-->
          </v-list-tile>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">home</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title color="primary">{{person.college}}</v-list-tile-title>
              <v-list-tile-sub-title>college</v-list-tile-sub-title>
            </v-list-tile-content>

            <!--<v-list-tile-action>-->
              <!--<v-icon>chat</v-icon>-->
            <!--</v-list-tile-action>-->
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="">
            <v-list-tile-action>
              <v-icon color="primary">supervised_user_circle</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title color="primary">{{person.professional}}</v-list-tile-title>
              <v-list-tile-sub-title>professional</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>



          <v-list-tile @click="goToRouterLink('/quit')">
            <v-list-tile-action>
              <v-icon color="primary">supervised_user_circle</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title color="primary">退出登录</v-list-tile-title>
              <v-list-tile-sub-title>quit</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>





        </v-list>
      </v-card>
    </v-flex>

    <v-dialog v-model="alertdialog" persistent max-width="390" >
      <v-alert
        :value="true"
        type="error"
        transition="scale-transition"
        class="v-speed-dial--direction-top"
      >
        未登录!
      </v-alert>
    </v-dialog>
  </v-layout>
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
  import * as Vimg from "vuetify/lib/components/VImg";
  import * as baseUtil from '../baseUtil';
  import * as Valert from 'vuetify/lib/components/VAlert';

  import Alert from 'wc-messagebox'
  import Confirm from 'wc-messagebox'
  import Toast from 'wc-messagebox'

  export default {
    components: {
      // VListGroup,
      ...VCard,
      ...VCarousel,
      ...VSubheader,
      ...VDivider,
      ...VTextarea,
      ...VForm,
      ...VDialog,
      ...VTefiled,
      ...Vimg,
      ...Valert,
      ...Alert
    },

    data () {
      return{
        person:{username:"",usernumber:"",college:"",professional:""},
        alertdialog:false
      }


    },mounted:function(){

      var stuNum=baseUtil.getCookie("usernumber");
      var stuName=baseUtil.getCookie("username");

      if(stuNum ===  undefined || stuNum === "" || stuName===undefined || stuNum ===  null){
       alert("未登录不能查看");
        location.href="/";
      }
      this.person.usernumber=baseUtil.getCookie("usernumber");
      this.person.username=baseUtil.getCookie("username");
      this.person.college=baseUtil.getCookie("college");
      this.person.professional=baseUtil.getCookie("professional");


    },methods:{

      goToRouterLink:function(url){


        this.$router.replace(url);
      },


      sleep:function (numberMillis) {

        var now = new Date();
        var exitTime = now.getTime() + numberMillis;
        while (true) {
          now = new Date();
          if (now.getTime() > exitTime)
            return;
        }
  }

    }

  }


    </script>
