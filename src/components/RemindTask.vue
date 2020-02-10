<template>
  <div style="background-color: #4e342e">
  <v-flex class="pt-3" xs12>
  <v-btn
    color="secondary"
    slot="activator"

    right
    fixed
    fab
    @click="dialog =!dialog"
  >
    <v-icon size="30px">add</v-icon>
  </v-btn>
    <!--<v-time-picker v-model="timepicker" :landscape="timeLandscape"></v-time-picker>-->
    <!--<v-date-picker v-model="datepicker"  :reactive="reactive" :landscape="landscape"></v-date-picker>-->



    <v-layout row >
      <v-flex xs2 md4></v-flex>
      <v-flex xs8 md4>

        <v-flex v-for="re in RemindList"  :key="re.id">
          <v-card class="my-3"
                  dark
                  hover

          >
            <!--state-->
            <v-toolbar
              color="#260c1a"
              dark
              height="30px"
            >
            </v-toolbar>
<!--  state  0  未发送，1已发送-->
            <v-container fill-height fluid>
              <v-layout>
                <v-flex xs12 align-end d-flex>
                  <span class="text-truncate headline">[{{re.state===1?"已发送":"未发送"}}] &nbsp; {{re.title}}</span>
                </v-flex>
              </v-layout>

            </v-container>



            <v-card-text class="">
              <v-icon  color="secondary">alarm</v-icon>  提醒时间:&nbsp;{{getLocalTime(re.time)}}

              <br/>
              &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;<span style="color: #757575">&nbsp;创建时间:&nbsp; {{getLocalTime(re.createtime)}}</span>
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








    <v-flex
      align-right
      justify-center
      layout
    >
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="390">

          <v-card >
            <v-toolbar
              color="#260c1a"
              dark
            >
              <v-toolbar-title>添加提醒</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="提醒内容*" v-model="Remind.title" :rules="[rules.required, rules.textcounter]" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="选择日期" v-model="datepicker"  @click="DateDialog=!DateDialog" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="选择时间" v-model="timepicker" @click="TimeDialog=!TimeDialog" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>

                    <v-checkbox label="手机号码" v-model="selectphone"></v-checkbox>
                    <v-checkbox label="邮箱" v-model="selectemail"></v-checkbox>

                    <v-text-field label="手机号码" v-model="userPhone"  v-show="selectphone" :rules="[rules.required, rules.counter]" required></v-text-field>
                    <v-text-field label="邮箱" v-model="userMail"  v-show="selectemail"  :rules="[rules.required, rules.email]" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-btn color="#260c1a" dark  @click.native="dialog=false" >取消</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="#260c1a" dark @click="addplan()">添加</v-btn>
            </v-card-actions>
          </v-card>


        </v-dialog>
      </v-layout>






    </v-flex>


    <v-flex
      align-right
      justify-center
      layout
    >
      <v-layout row justify-center>

        <v-dialog v-model="TimeDialog" persistent max-width="390"  >

          <v-time-picker v-model="timepicker" :landscape="timeLandscape" format="24hr"></v-time-picker>
          <v-btn @click="TimeDialog=!TimeDialog" dark xs12>确定</v-btn>
        </v-dialog>
      </v-layout>
    </v-flex>


    <v-flex
      align-right
      justify-center
      layout
    >
      <v-layout row justify-center>

        <v-dialog v-model="DateDialog" persistent max-width="390">
         <v-card>
          <v-layout row justify-center>
          <v-date-picker v-model="datepicker"  :reactive="reactive" :landscape="landscape"></v-date-picker>
          </v-layout>
          <v-layout row justify-center>
            <v-flex xs12>
          <v-btn @click="DateDialog=!DateDialog" dark xs12>确定</v-btn>
            </v-flex>
          </v-layout>
         </v-card>
        </v-dialog>
      </v-layout>
    </v-flex>

  </v-flex>
  </div>
</template>

<script>
  import * as VBtn from "vuetify/lib/components/VBtn";
  import * as VDatePicker from "vuetify/lib/components/VDatePicker";
  import * as VTimePicker from "vuetify/lib/components/VTimePicker";
  import * as VDialog from "vuetify/lib/components/VDialog";
  import * as VToolbar from "vuetify/lib/components/VToolbar";
  import * as VTextField from "vuetify/lib/components/VTextField";
  import * as Vcard from "vuetify/lib/components/VCard";
  import * as VSelect from "vuetify/lib/components/VSelect";
  import * as VCheckbox from "vuetify/lib/components/VCheckbox";
  import GlobalVariable from '../components/GlobalVariable';
  import * as baseUtil from '../baseUtil';
  import * as httpUtil from '../util/http';
    export default {
      components: {
        ...VDatePicker,
        ...VBtn,
        ...VTimePicker,
        ...VDialog,
        ...VToolbar,
        ...VTextField,
        ...Vcard,
        ...VSelect,
        ...VCheckbox,
        ...httpUtil,
        ...baseUtil
      },
      data () {
        return {
          timepicker:null,
          dialog:false,
          TimeDialog:false,
          DateDialog:false,
          sendType:0,
          Remind:{title:"",date:"",time:""},
          RemindList:[],
          userPhone:"",
          userMail:"",
          rules: {
            required: value => !!value || 'Required.',
            counter: value => value.length <= 11 || '手机号码最长11位',
            textcounter:value => value.length <= 20 || '内容最长20位',
            email: value => {
              const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || '无效邮箱地址.'
            }
          },
          selectphone:false,
          selectemail:false,
          addplanUrl:GlobalVariable.addplan,
          selectUrl:GlobalVariable.getplan,
          selectItems:['短信','邮箱'],
          datepicker: new Date().toISOString().substr(0, 10),
          landscape: false,
          timeLandscape:false,
          reactive: true
        }
      },mounted :function () {
        // https://pocket.ykhuo.com/api/addplan?account=15101028126&title=英语四级&time=1542805129&mobile=87668&email
        // https://pocket.ykhuo.com/api/selectplan?account=15101028126
        var stuName=baseUtil.getCookie("username");
        var stuNum=baseUtil.getCookie("usernumber");
        if(stuNum ===  undefined || stuNum === "" || stuName===undefined || stuNum ===  null){
          alert("未登录不能查看");
          location.href="/";
        }
        this.Remind.time=this.timepicker;

        this.Remind.date=this.datepicker;
        // this.RemindList=
        this.loadplan();


        // var time1=this.getLocalTime(1542805129);
        // var time2=this.getLocalTime(1542805699);



      },methods:{


        loadplan:function(){

          var addplanresponse=httpUtil.fetch(this.selectUrl+"?account="+baseUtil.getCookie("usernumber"));
          var self=this;

          addplanresponse.then(
            function (responseData) {
              console.log(responseData);
              self.RemindList=responseData.data.list;
            }
          ).catch(

            err => {
              console.log(err);
            }

          );


        },


        addplan:function(){
          var account=baseUtil.getCookie("usernumber");
          var email=this.userMail;
          var mobile=this.userPhone;
          if(mobile.length>11)

            return;
          var title=this.Remind.title;
          if(title.length>20)
            return;

          var time=this.datepicker+" "+this.timepicker;
          var timeC=new Date(time).getTime();
          var timeT = (timeC+"").substring(0,10);
// https://pocket.ykhuo.com/api/addplan?account=15101028126&title=英语四级&time=1542805129&mobile=87668&email
//           alert(timeT);

          var params = new URLSearchParams();
          params.append('account', account);
          params.append('email', email);
          params.append('moblie', mobile);
          params.append('time', timeT);
          params.append('title', title);
          this.dialog=false;
          var postResponse=httpUtil.post(this.addplanUrl,params);
          var self=this;
          postResponse.then(
            function (res) {
              console.log(res);
              // self.$router.go(0);
              self.loadplan();
            }

          ).catch(
            err => {
              console.log(err);
              alert("添加失败");
            }
          );


        },



        dateFtt:function (date, fmt) { //author: meizz
    var o = {
      "M+" : date.getMonth() + 1, //月份
      "d+" : date.getDate(), //日
      "h+" : date.getHours(), //小时
      "m+" : date.getMinutes(), //分
      "s+" : date.getSeconds(), //秒
      "q+" : Math.floor((date.getMonth() + 3) / 3), //季度
      "S" : date.getMilliseconds()//毫秒
    };
    if (arguments.length === 1) {
      fmt = 'yyyy-MM-dd hh:mm:ss';
    }
    if (/(y+)/.test(fmt)){
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for ( var k in o){
      if (new RegExp("(" + k + ")").test(fmt)){
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  },
        getLocalTime:function (nS) {
          //.toLocaleString().replace(/:\d{1,2}$/,' ').toString()
          var timefomat=this.dateFtt(new Date(parseInt(nS) * 1000));
          return timefomat;

    },
        addRemind:function () {
          var userid="";
          var time="";
          var date="";



        },





      }
      ,
        name: "RemindTask"
    }
</script>

<style scoped>

</style>
