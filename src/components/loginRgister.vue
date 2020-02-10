<template>
    <v-layout row justify-center>

      <v-card v-show="isShowLogin">
        <v-toolbar
          color="#260c1a"
          dark
        >
          <v-toolbar-title>登录/注册</v-toolbar-title>

        </v-toolbar>
        <v-radio-group v-model="radioGroup"
                       row="true"
        >
          <v-radio
            v-for="n in logintype"
            :key="n.value"
            :label="n.name"
            :value="n.value"

          ></v-radio>
        </v-radio-group>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <span style="color: red" v-show="!islocallogin">教务系统正在维护暂不能使用学号登录!!!</span>
              <v-flex xs12>
                <v-text-field label="教务系统用户名" v-model="person.name" ref="username" v-show="!islocallogin" required></v-text-field>
                <v-text-field label="用户名" v-model="person.name" ref="username" v-show="islocallogin" required></v-text-field>

              </v-flex>
              <v-flex xs12 v-show="islocalregister">
                <v-text-field label="请输入昵称" v-model="person.nikename" ref="nickname"  required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="教务系统密码" v-model="person.password" ref="password" type="password" v-show="!islocallogin" required></v-text-field>
                <v-text-field label="密码" v-model="person.password" ref="password" type="password" v-show="islocallogin" required></v-text-field>

              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field label="验证码" v-model="person.code" ref="code" v-show="!islocallogin" required></v-text-field>
              </v-flex>



              <v-flex xs12 sm6 md6 v-show="!islocallogin">
                <img
                  :src="codeUrl"
                  width="180"
                  v-show="showCodeImg"
                  onerror="this.src='/static/img/522529.gif'"
                  height="100"

                />
                <div class="text-xs-center text-md-center">
                  <v-progress-circular
                    indeterminate
                    color="secondary"
                    v-show="showImgLoader"
                  ></v-progress-circular>
                </div>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>

          <v-btn color="#260c1a" dark @click="changelocalregister()" @click.native="logindialog=false" v-show="islocallogin">注册</v-btn>
          <v-spacer ></v-spacer>
          <v-btn color="#260c1a" dark @click="alert('教务系统正在维护暂无法使用')" @click.native="logindialog=false" v-show="!islocallogin">登录/注册</v-btn>
          <v-btn color="#260c1a" dark @click="LocalLogin()" @click.native="logindialog=false" v-show="islocallogin">登录</v-btn>
        </v-card-actions>
      </v-card>


      <v-card v-show="islocalregister">
        <v-toolbar
          color="#260c1a"
          dark
        >
          <v-toolbar-title>非校内学生用户注册</v-toolbar-title>

        </v-toolbar>

        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <span style="color: red" v-show="iserro">{{messageErro}}</span>
              <v-flex xs12>


                <v-text-field label="请输入用户名" v-model="person.name" ref="username" required></v-text-field>

              </v-flex>
              <v-flex xs12 >

                <v-text-field label="请输入昵称" v-model="person.nikename" ref="nickname"  required></v-text-field>
              </v-flex>

              <v-flex xs12>

                <v-text-field label="请输入密码" v-model="person.password" ref="password" type="password" required></v-text-field>
              </v-flex>

              <v-flex xs12>

                <v-text-field label="请再次输入密码" v-model="person.repassword" ref="repassword" type="password" required></v-text-field>
              </v-flex>


            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>

          <v-btn color="#260c1a" dark @click="Localregister()" >注册</v-btn>

        </v-card-actions>
      </v-card>
    </v-layout>
</template>

<script>
  import * as VTextField from "vuetify/lib/components/VTextField";
  import * as VDialog from "vuetify/lib/components/VDialog";
  import * as VCard from "vuetify/lib/components/VCard";
  import * as VImg from "vuetify/lib/components/VImg";
  import * as VAvatar from "vuetify/lib/components/VAvatar";
  import * as axios from 'axios';
  import * as baseUtil from '../baseUtil';
  import * as httpUtil from '../util/http';
  import GlobalVariable from '../components/GlobalVariable';
  import * as VprogressLinear from 'vuetify/lib/components/VProgressLinear';
  import * as VProgressCircular from 'vuetify/lib/components/VProgressCircular';
  import * as VAlert from 'vuetify/lib/components/VAlert';
  import * as VRadioGroup from 'vuetify/lib/components/VRadioGroup'
  import * as VBottomNav from 'vuetify/lib/components/VBottomNav'
    export default {
      components: {
        ...VTextField,
        ...VDialog,
        ...VCard,
        ...VImg,
        ...VAvatar,
        ...axios,
        ...VprogressLinear,
        ...VProgressCircular,
        ...VAlert,
        ...VRadioGroup,
        ...VBottomNav
      },data(){
        return{
          clipped: true,
          drawer: false,
          fixed: false,
          isShowName:false,
          isShowLogin:true,
          showloginLoader:true,
          showImgLoader:true,
          showCodeImg:false,
          bottomNav: 'recent',
          showSuccess:false,
          islocalregister:false,
          islocallogin:true,
          iserro:true,
          messageErro:"",
          registerdialog:false,
          radioGroup:1,
          codeUrl:"",
          person:{name:"",password:"",code:"",nikename:"",repassword:""},
          loginUserUrl:GlobalVariable.loginUrl,
          isUserExits:GlobalVariable.isUserExits,
          localUser:GlobalVariable.locallogin,
          loginLogoUrl:"",
          localregsiter:GlobalVariable.localUserregister,
          logintype:[
            {name:"非校内学生",value:1},{
              name:"校内学生",value:2
            }
          ],



        }

      },methods:{



        gotoDownload:function(){



          this.$router.push("/download");

        },

        sleep:function (numberMillis) {
          var now = new Date();
          var exitTime = now.getTime() + numberMillis;
          while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
              return;
          }
        },

        getImage:function(){

          var userloginUrl=httpUtil.fetch(this.loginUserUrl);
          var self=this;
          this.isShowLogin=false;
          userloginUrl.then(
            function (responseData) {
              if(responseData.status===404){
                console.log("验证码获取失败请重试");
              }
              self.codeUrl="http://img.zhiyigo.cn/code.jpg";
              self.showloginLoader=false;
              self.showImgLoader=false;
              self.showCodeImg=true;
              self.isShowLogin=true;
            }
          ).catch(
            err => {
              self.showloginLoader=true;
              self.showImgLoader=true;

              console.log(err);
            }
          );
          // var codeImgUrl=httpUtil.fetch("http://img.zhiyigo.cn/code.jpg");



        }
        ,



        loginBySpider:function(){
          console.log("start----spider------login-----");

          var code=this.person.code;
          var password=this.person.password;
          var userNum=this.person.name;
          var params = new URLSearchParams();
          params.append('username', userNum);
          params.append('password', password);
          params.append('code', code);

          var userSpderlogin=httpUtil.post(this.loginUserUrl,params);

          userSpderlogin.then(
            function (responseData) {
              if(responseData.status==1){
                console.log(responseData);
                let expireDays = 1000 * 60 * 60 ;
                self.showSuccess=true;
                baseUtil.setCookie("usernumber",userNum,expireDays);
                baseUtil.setCookie("username",decodeURIComponent(responseData.studentInfo.name),expireDays);
                baseUtil.setCookie("account",decodeURIComponent(responseData.studentInfo.account),expireDays);
                baseUtil.setCookie("college",decodeURIComponent(responseData.studentInfo.college),expireDays);
                baseUtil.setCookie("professional",decodeURIComponent(responseData.studentInfo.professional),expireDays);
                location.href="/";
              }
            }


          ).catch(
            err => {
              console.log(err);
              alert("登录失败请重试");
              location.href="/";
            }
          );

          // location.href="/"
        },

        changelocalregister:function(){
          this.islocalregister=true;
          this.registerdialog=true;
        },

        Localregister:function(){


          var password=this.person.password;
          var userNum=this.person.name;
          var nickname=this.person.nikename;
          var repassword=this.person.repassword;
          // var nickname=

          if(password ===null || password===" " || password===""){
            this.iserro=true;
            this.messageErro="必须输入完整信息";
            return;
          }
          if(userNum ===null || userNum===" " || userNum===""){
            this.iserro=true;
            this.messageErro="必须输入完整信息";
            return;
          }
          if(nickname ===null || nickname===" " || nickname===""){
            this.iserro=true;
            this.messageErro="必须输入完整信息";
            return;
          }
          if(repassword ===null || repassword===" " || repassword===""){
            this.iserro=true;
            this.messageErro="必须输入完整信息";
            return;
          }
          this.iserro=false;
          if(password!==repassword){

            alert("用户密码两次输入不一致!");
            return;
          }
          let expireDays = 1000 * 60 * 60 ;
          var params = new URLSearchParams();
          params.append('username', userNum);
          params.append('password', password);
          params.append('name', nickname);
          var self=this;
          var localregister=httpUtil.post(this.localregsiter,params);

          localregister.then(

            function (responseD) {

              console.log(responseD);
              alert(responseD.msg);
              if(responseD.msg==="注册失败"){
                location.href="/";
              }


              baseUtil.setCookie("usernumber",responseD.data.id,expireDays);

              baseUtil.setCookie("username",decodeURIComponent(responseD.data.nickname),expireDays);

              baseUtil.setCookie("account",decodeURIComponent(responseD.data.id),expireDays);
              baseUtil.setCookie("college",decodeURIComponent(responseD.data.college),expireDays);
              baseUtil.setCookie("professional",decodeURIComponent(responseD.data.professional),expireDays);

              self.showSuccess=true;
              self.registerdialog=false;
              location.href="/";

            }

          ).catch(
            err=>{
              console.log(err)
            }
          );
          // alert(password+""+userNum+""+nickname+""+repassword);



        },


        LocalLogin:function(){

          var password=this.person.password;
          var userNum=this.person.name;

          let expireDays = 1000 * 60 * 60 ;
          var params01 = new URLSearchParams();
          params01.append('username', userNum);
          params01.append('password', password);

          var self=this;

          var userPhpLogin=httpUtil.fetch(this.localUser,params01);

          userPhpLogin.then(

            function (responsedata) {

              if(responsedata.data!==null){

                console.log(responsedata.data);
                baseUtil.setCookie("usernumber",responsedata.data.id,expireDays);
                baseUtil.setCookie("username",decodeURIComponent(responsedata.data.nickname),expireDays);
                baseUtil.setCookie("account",decodeURIComponent(responsedata.data.id),expireDays);
                baseUtil.setCookie("college",decodeURIComponent(responsedata.data.college),expireDays);
                baseUtil.setCookie("professional",decodeURIComponent(responsedata.data.professional),expireDays);
                self.showSuccess=true;
                location.href="/";

              }else{
                alert("登录失败");
              }

            }
          ).
          catch(
            err=>{
              console.log(err);
            }
          )



        },


        loginfunction:function () {


          var code=this.person.code;
          var password=this.person.password;
          var userNum=this.person.name;
          var storage=this.localStorage;


          let expireDays = 1000 * 60 * 60 ;
          var params01 = new URLSearchParams();
          params01.append('account', userNum);


          var self=this;

          var isRgister=false;

          var userPhpLogin=httpUtil.fetch(this.isUserExits,params01);

          userPhpLogin.then(
            function (resposeD) {
              console.log("logined-----");
              console.log(resposeD);

              if(resposeD.data!==null && resposeD.data!=="null"){

                isRgister=true;
                baseUtil.setCookie("usernumber",resposeD.data.id,expireDays);

                alert(resposeD.data.nickname);
                baseUtil.setCookie("username",decodeURIComponent(resposeD.data.nickname),expireDays);

                baseUtil.setCookie("account",decodeURIComponent(resposeD.data.id),expireDays);
                baseUtil.setCookie("college",decodeURIComponent(resposeD.data.college),expireDays);
                baseUtil.setCookie("professional",decodeURIComponent(resposeD.data.professional),expireDays);
                console.log(baseUtil.getCookie("usernumber"));
                self.showSuccess=true;
                location.href="/";
              }else {
                self.loginBySpider();
              }
            }
          ).catch(

            err => {
              console.log(err);

              self.loginBySpider();
            }
          );




        }

      },
      watch:{
        codeUrl(curVal,oldVal){
          while(curVal===oldVal){
            this.getImage();
          }
        },

        radioGroup(curVal,oldVal){
          if(curVal!==oldVal){
            switch (curVal) {
              case 1:this.islocallogin=true;break;
              case 2:this.islocallogin=false;break;
            }
          }
        },
        bottomNav(curVal,oldVal){
          if(curVal!==oldVal){

            this.$router.push(curVal);

          }
        }
      },

        name: "loginRgister"
    }
</script>

<style scoped>

</style>
