<template>
  <div style="background-color: #4e342e">
  <v-flex xs12 >

    <v-layout row

    >

      <v-flex xs2 md4></v-flex>
      <v-flex xs8 md4>

    <v-card class="my-4" hover dark

            v-for="m in moods" :key="m.id"
            xs8>
      <v-toolbar
        color="#260c1a"


      >
      </v-toolbar>

      <v-layout row class="pt-3">
        <v-flex xs1>

        </v-flex>

        <v-flex xs9>
          <div>
          <v-avatar

            :size="48"
            color="third"
          >
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg" ></v-img>

          </v-avatar>&nbsp;
            <span class="text-md-left"> {{m.nickname}}</span>
          </div>
        </v-flex>
        <v-flex xs2>

        </v-flex>

      </v-layout>

      <v-layout row class="pt-3">
        <v-flex xs2></v-flex>
        <v-flex xs8>

          <p class="text-md-center">{{m.content}}</p>

        </v-flex>


          <v-flex xs2></v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs2></v-flex>
        <v-flex xs6>

         <v-text-field background-color="primary" @focus="showCommentSheet(m.id)"
         label="想对他说......." >

         </v-text-field>
          <!--<v-card>-->

          <!--</v-card>-->
        </v-flex>

        <v-flex xs2>

        </v-flex>
        <v-flex xs2></v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs2></v-flex>
        <v-flex xs6>

          <v-btn flat icon color="#BDBDBD" dark v-show="closecommentlist" @click="showcommentlist=false;closecommentlist=false;opencommentlist=true">

            <v-icon>expand_more</v-icon>收起评论
          </v-btn>

          <v-btn flat icon color="#BDBDBD" dark @click="showcommentlist=true;closecommentlist=true;opencommentlist=false" v-show="opencommentlist">

          <v-icon>expand_more</v-icon>更多评论
          </v-btn>

          <v-list
            third
            v-show="showcommentlist"
          >
            <v-list-tile
              v-for="item in m.comments"
              :key="item.id"
              third

            >
              <v-list-tile-content
                color="third"
              >
              <div>  <span class="caption" style="color: #ffffff">{{item.nickname}}</span>:&nbsp;
                <span class="caption" style="color: #BDBDBD"> {{item.content}}</span></div>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>
        </v-flex>

        <v-flex xs2>

        </v-flex>
        <v-flex xs2></v-flex>
      </v-layout>
    </v-card>



      </v-flex>
      <v-flex xs2 md4>

        <v-fab-transition>

        </v-fab-transition>

        <v-bottom-sheet v-model="sheet" xs8>

          <v-btn
            color="secondary"
            slot="activator"

            right
            fixed
            fab
          >
            <v-icon size="30px">add</v-icon>
          </v-btn>


          <v-flex xs12
                  class="py-5">
            <v-card
              color="primary"
              dark
              hover xs12>
              <v-card-title primary-title>
                <div class="headline">发表心情</div>
              </v-card-title>
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs7>
                  <v-form>

                    <v-textarea
                      name="input-7-1"
                      box
                      auto-grow

                      v-model="inputText"
                      rows="1"
                    >
                    </v-textarea>




                  </v-form>
                </v-flex>
                <v-flex xs2>
                  <v-btn  color="secondary" large @click="onSubmit" @click.native="sheet=!sheet">发表</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>



        </v-bottom-sheet>



        <v-bottom-sheet v-model="commentsheet"

                        xs8>


          <v-flex xs12
                  class="py-5">
            <v-card
            dark
             color="primary"
              hover xs12>
              <v-card-title primary-title>
                <div class="headline">评论</div>
              </v-card-title>
              <v-layout row>
                <v-flex xs1>
                </v-flex>
                <v-flex xs7>
                  <v-form>

                    <v-textarea
                      name="input-7-1"
                      box
                      auto-grow

                      v-model="inputCommentText"
                      rows="1"
                    >
                    </v-textarea>




                  </v-form>
                </v-flex>
                <v-flex xs2>
                  <v-btn  color="secondary" large @click="onComments()" @click.native="commentsheet=!commentsheet">评论</v-btn>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>



        </v-bottom-sheet>
      </v-flex>
    </v-layout>









  </v-flex>





</div>
</template>

<script>
  import * as VCard from "vuetify/lib/components/VCard";
  import * as VCarousel from "vuetify/lib/components/VCarousel";
  import * as VSubheader from "vuetify/lib/components/VSubheader";
  import * as VDivider from "vuetify/lib/components/VDivider";
  import * as VTextarea from "vuetify/lib/components/VTextarea";
  import * as VDialog from "vuetify/lib/components/VDialog";

  import * as VForm from "vuetify/lib/components/VForm";
  import * as VAvatar from "vuetify/lib/components/VAvatar";
  import * as Vimg from "vuetify/lib/components/VImg";
  import * as axios  from "axios";
  import * as httpUtil from '../util/http';
  import * as baseUtil from '../baseUtil';
  import * as VInput from "vuetify/lib/components/VInput/VInput";
  import * as VTextField from "vuetify/lib/components/VTextField";
  import * as VIcon from "vuetify/lib/components/VIcon";
  import * as VBtn from "vuetify/lib/components/VBtn";
  import * as BottomSheet from "vuetify/lib/components/VBottomSheet";
  import GlobalVariable from './GlobalVariable';
  import * as VList from "vuetify/lib/components/VList";
  export default {
    components: {
      ...VList,
      ...VTextField,
      ...VTextarea,
      ...VInput,
      ...VTextField,
      ...VInput,
      ...VForm,
      ...VBtn,
      ...VIcon,
      ...VCard,
      ...VCarousel,
      ...VSubheader,
      ...VDivider,
      ...VTextarea,
      ...VForm,
      ...VDialog,
      ...httpUtil,
      ...baseUtil,
      ...axios,
      ...VAvatar,
      ...Vimg,
      ...BottomSheet,
      ...GlobalVariable
    },
    data () {
      return {
        model: {},
        fields: {},
        rules: {},
        showcommentlist:true,
        closecommentlist:false,
        messages: "",
        MoodSquareAPi:GlobalVariable.MoodList,
        AddMood:GlobalVariable.AddMood,
        Addcomment:GlobalVariable.AddMoodComment,
        CommentList:GlobalVariable.GetMoodComment,
        selectStudent:"",
        inputText:"",
        opencommentlist:true,
        inputCommentText:"",
        sheet:false,
        commentsheet:false,
        moods:[],
      submit:{},
        clear:{},


      }

    },
    mounted () {
      // alert("mod");
      // this.$bus.showMessage('success', 'success')
     this.loaddata();
    },
    computed: {


    },
    watch: {

    },
    methods: {

      loaddata:function(){
        var stuName=baseUtil.getCookie("username");
        var stuNum=baseUtil.getCookie("usernumber");
        if(stuNum ===  undefined || stuNum === "" || stuName===undefined || stuNum ===  null){
          alert("未登录不能查看");
          location.href="/";
        }
        var MoodList=httpUtil.fetch(this.MoodSquareAPi+"");

        var self=this;

        MoodList.then(
          function (responseData) {
            console.log(responseData);
            self.moods=responseData.data.foundlist;
          }
        ).catch(
          err => {console.log(err)}
        );
      },
      onSubmit:function () {
        var content=this.inputText;
        var account=baseUtil.getCookie("usernumber");
        var params = new URLSearchParams();
        params.append('account', account);
        params.append('content', content);
        console.log(account+""+content);
        var MoodList=httpUtil.post(this.AddMood,params);
        var self=this;
        MoodList.then(
          function (responseData) {
            console.log(responseData);

            self.commentsheet=false;
            self.loaddata();

          }
        ).catch(
          err => {console.log(err);
            self.loaddata();
          }
        );


      },

      onComments:function () {

        var content=this.inputCommentText;

        var moodId=this.selectMoood;

        var account=baseUtil.getCookie("usernumber");

        var params = new URLSearchParams();
        params.append('moodid', moodId);

        params.append('account', account);
        params.append('content', content);
        // console.log(account);
        var MoodList=httpUtil.post(this.Addcomment,params);
        var self=this;
        MoodList.then(
          function (responseData) {
            console.log(responseData);
            self.commentsheet=false;
            self.loaddata();
          }
        ).catch(
          err => {console.log(err);
            self.commentsheet=false;
            self.loaddata();
          }
        );


      },

      showCommentSheet:function (id) {
        this.commentsheet=true;
        this.selectMoood=id;
      }

    },

  }
</script>
