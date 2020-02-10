<template>
  <v-flex xs12>
  <v-parallax  height="500" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex text-xs-center>
          <h3 class="display-3">口袋校园APP</h3>
          <p>更便捷的移动应用，</p>
          <p>更畅快的浏览体验，</p>
          <p>一手掌握校内资讯</p>
          <p>把校园揣进口袋</p>



        </v-flex>
      </v-layout>
    </v-container>
  </v-parallax>
    <v-flex xs12 height="800px">
      <v-jumbotron

        dark
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
      >
        <v-container fill-height>
          <v-layout align-center>
            <v-flex text-xs-center >
              <v-layout row justify-center>
              <v-flex xs6>
              <img src="https://pockschool-9-1251857731.cos.ap-chengdu.myqcloud.com/ios.png" width="120px" height="200px"/><br/>
              <a href="https://pockschool-9-1251857731.cos.ap-chengdu.myqcloud.com/pokeschool.ipa"><v-btn @click="downloadIOS" v-show="apple"> ios 下载</v-btn></a>
                <div class="text-xs-center text-md-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    v-show="showAppLoader"
                  ></v-progress-circular></div>

              </v-flex>
              <v-flex xs6>
                <img src="https://pockschool-9-1251857731.cos.ap-chengdu.myqcloud.com/android.png" width="110px" height="200px"/><br/>
              <a href="https://pockschool-9-1251857731.cos.ap-chengdu.myqcloud.com/pokeschool.apk"> <v-btn @click="downloadAPK" v-show="android">Android 下载</v-btn></a>
                <div class="text-xs-center text-md-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    v-show="showANDLoader"
                  ></v-progress-circular></div>
              </v-flex>
              </v-layout>






            </v-flex>
          </v-layout>
        </v-container>
      </v-jumbotron>
    </v-flex>

    <v-parallax  height="850" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">

      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
      <h4 class="display-2">不想下载APP？</h4>
      <p class="pt-5">
        我们还为您准备了PWA应用，如果你用chrmoe浏览器可以进行以下操作就可以不下载,就可以直接安装我们的应用到电脑桌面，或者手机桌面,并且一点也不占用空间!<br/>
      </p>
            <p/>
            <p/>
        <!--<img src="http://img.zhiyigo.cn/Screenshot_20181123-205412.jpg" height="300px" width="200px"/>-->
        <!--<img src="http://img.zhiyigo.cn/Screenshot_20181123-205416.jpg" height="300px" width="200px"/>-->
        <!--<img src="http://img.zhiyigo.cn/Screenshot_20181123-205423.jpg" height="300px" width="200px"/>-->

            <v-stepper >
              <v-stepper-header>
                <v-stepper-step
                  step="1"
                  color="#033"
                >
                  浏览器右上角菜单
                </v-stepper-step>

                <v-divider dark="true"></v-divider>

                <v-stepper-step
                  step="2"

                >添加到主屏幕</v-stepper-step>

                <v-divider></v-divider>

                <v-stepper-step
                  step="3"

                >
                  确定添加
                </v-stepper-step>
              </v-stepper-header>
            </v-stepper>


            <h5 class="display-2 pt-5">和原生APP体验几乎一致</h5>
            <p/>
        <img src="https://pockschool-9-1251857731.cos.ap-chengdu.myqcloud.com/Screenshot_20181123-205618.png" height="300px" width="200px" class="pt-3"/>

          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>



  </v-flex>
</template>

<script>
  import * as Vparallax from 'vuetify/lib/components/VParallax'
  import * as jumbotron from 'vuetify/lib/components/VJumbotron';
  import * as VBtn from 'vuetify/lib/components/VBtn';
  import * as VProgressCircular from 'vuetify/lib/components/VProgressCircular';
  import * as Vsteper from 'vuetify/lib/components/VStepper';
  import * as VDivider from 'vuetify/lib/components/VDivider';
    export default {
      components: {
        ...Vparallax,
        ...jumbotron,
        ...VBtn,
        ...VProgressCircular,
        ...Vsteper,
        ...VDivider
      },data () {
        return {

          apple:true,
          android: true,
          showAppLoader:false,
          showANDLoader:false
        }

        },
      methods:{
        downloadIOS:function () {
          // window.location.href="http://img.zhiyigo.cn/pokeschool.ipa";
              this.apple=false;
              this.showAppLoader=true;
        },
        downloadAPK:function () {
          // window.location.href="http://img.zhiyigo.cn/pokeschool.apk";
          this.android=false;
          this.showANDLoader=true;
        },

      },
      mounted:function(){},
        name: "download"
    }
</script>

<style scoped>

</style>
