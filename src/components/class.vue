<template>
  <div class="img1">

  <v-flex xs12 class="xs12 py-5">
    <v-layout row>
      <v-flex xs2>
    <v-btn
      color="secondary"
      slot="activator"

      fixed
      fab
      @click="showweeklist=true"
    >
      <v-icon size="30px">reorder</v-icon>
    </v-btn>
      </v-flex>

      <v-flex xs8>
        <h1  align = center><span style="color: #260c1a">课程表</span></h1>
      </v-flex>

      <v-flex xs2>
    <v-btn
      color="secondary"
      slot="activator"
      right
      fixed
      fab
      @click="dialog=true"
    >
      <v-icon size="30px">autorenew</v-icon>
    </v-btn>
      </v-flex>

    </v-layout>

    <table  border = "1"   style="border-color: transparent;opacity: 0.6;height: 100%;width: 100%;" align = "center" cellspacing = "0px" cellpadding = "10px">
      <tr align = center>
        <th width = 20px>第{{thisweek}}周</th>

      </tr>
      <tr align = center>
        <th ></th><th>星期一</th>
        <th>星期二</th><th>星期三</th>
        <th>星期四</th><th>星期五</th>
        <th>星期六</th><th>星期日</th>
      </tr>
      <tr align = center>
        <td ></td><td colspan = 7 ><b>上午（８：３０-１２：００）</b></td>
      </tr>
      <tr  align = center >
        <td ><b>一</b></td>
        <!--<td bgcolor="#AEEA00" style="white-space: normal;"><font color="#ffffff"><b>XXXXXXXXXXXXXXXXXXXXXXXXXXXX</b></font></td>-->


        <td bgcolor="#2196F3" v-for="c in testArry[0]"><font color="#ffffff"><b>{{c}}</b></font></td>

      </tr>
      <tr align = center>
        <td ><b>二</b></td>

        <td bgcolor="#2196F3" v-for="s in testArry[1]"><font color="#ffffff"><b>{{s}}</b></font></td>

      </tr>
      <tr align = center>
        <td ><b>三</b></td>



      </tr>
      <tr align = center>
        <td ><b>四</b></td>



      </tr>
      <tr align = center>
        <td ></td><td colspan = 7 ><b>下午（１：３０-６：００）</b></td>
      </tr>
      <tr  align = center>
        <td ><b>七</b></td>


      </tr>
      <tr align = center>
        <td ><b>八</b></td>

      </tr>
      <tr  align = center>
        <td ><b>九</b></td>
        <td bgcolor="#2196F3" v-for="k in testArry[8]"><font color="#ffffff"><b>{{k}}</b></font></td>
      </tr>
      <tr align = center>
        <td ><b>十</b></td>

      </tr>
      <tr  align = center>
        <td ></td><td colspan = 7 ><b>晚上（６：３０-１０：００）</b></td>
      </tr>
      <tr  align = center>
        <td ><b>十一</b></td>

      </tr>
      <tr  align = center>
        <td ><b>十二</b></td>

      </tr>
      <tr  align = center>
        <td ><b>十三</b></td>

      </tr>
      <tr  align = center>
        <td ><b>十四</b></td>

      </tr>
    </table>

  </v-flex>

    <v-flex
      align-right
      justify-center
      layout
    >

      <v-layout row justify-center>

      <v-dialog v-model="showweeklist" persistent width="60px" height="10%" scrollable="true" persistent="true" >

        <v-list>
          <v-list-group
            v-for="item in weeks"
            v-model="item.id"
            :key="item.id"

            @click="getNowWeek(item.id)"
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <!--<v-list-tile-action>-->
              <!---->
              <!--<v-icon>{{ subItem.action }}</v-icon>-->
           <!---->
            <!--</v-list-tile-action>-->

          </v-list-group>
        </v-list>

      </v-dialog>



        <v-dialog v-model="dialog" persistent persistent="true" scrollable="true">

          <v-card >
            <v-toolbar
              color="#260c1a"
              dark
            >
              <v-toolbar-title>更新课表</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field label="教务系统用户名*" v-model="person.username" required></v-text-field>
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field label="教务系统密码*" v-model="person.password" type="password" required></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm6 md6>
                    <v-text-field label="验证码" v-model="person.code" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <img
                      :src="loginLogoUrl"
                      width="180"
                      height="100"
                      v-show="showCodeImg"
                    />
                    <div class="text-xs-center text-md-center">
                      <v-progress-circular
                        indeterminate
                        color="secondary"
                        v-show="showImgLoader"
                      ></v-progress-circular></div>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#260c1a" dark @click="updateClassTable()" @click.native="dialog=false">

                登录

              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>


    </v-flex>

  </div>

</template>



<script>
  import * as VCard from "vuetify/lib/components/VCard";
  import GlobalVariable from './GlobalVariable';
  import * as baseUtil from '../baseUtil';
  import * as httpUtil from '../util/http';
  import * as VBtn from "vuetify/lib/components/VBtn";

  import * as VTextField from "vuetify/lib/components/VTextField";
  import * as VProgressCircular from 'vuetify/lib/components/VProgressCircular';
  import * as VDialog from "vuetify/lib/components/VDialog";
  export default {
    components: {

      ...VCard,
      ...GlobalVariable,
      ...baseUtil,
      ...httpUtil,
      ...VBtn,
      ...VDialog,
      ...VTextField,
      ...VProgressCircular
    },
    data () {
      return {

        classDetail:[{
          "class": "LA5-230",
          "name": "运营管理",
          "teacher": "李晖",
          "week": 4,
          "start_week": 11,
          "end_week": 11,
          "start_hall": 13,
          "end_hall": 14,
        }],
        loginLogoUrl:"",
        dialog:false,
        showweeklist:false,
        showImgLoader:true,
        showCodeImg:false,
        week:5,
        testArry:[],
        thisweek:1,
        loginUserUrl:GlobalVariable.loginUrl,
        weeks:[{title:"第一周",id:1},{title:"第二周",id:2},{title:"第三周",id:3},{title:"第四周",id:4},{title:"第五周",id:5},{title:"第六周",id:6},{title:"第七周",id:7},{title:"第八周",id:8},{title:"第九周",id:9},
          {title:"第十周",id:10},{title:"第十一周",id:11},{title:"第十二周",id:12},{title:"第十三周",id:13},{title:"第十四周",id:14},{title:"第十五周",id:15},{title:"第十六周",id:16},{title:"第十七周",id:17},{title:"第十八周",id:18},{title:"第十九周",id:19},{title:"第二十周",id:20},{title:"第二十一周",id:21}],
        kebiaoListApi:GlobalVariable.kebiaoList,
        updatekebiaoListApi:GlobalVariable.updatekebiao,
        person:{username:"",password:"",code:""}
      }



    }, mounted:function(){
      // this.init_classTable();


      this.getImage();
      this.thisweek=baseUtil.getCookie("week");

      // console.log(arr);
      console.log("----start----");
      // this.testArry=arr;



      var classList=[];
      var self=this;
      var kebiaoList =httpUtil.fetch(this.kebiaoListApi+"?account="+baseUtil.getCookie("usernumber")+"&week="+baseUtil.getCookie("week"));
      kebiaoList.then(
        function (responseData) {
          // console.log(responseData.data.foundlist);

          var arr=new Array();

          for(var x=0;x<14;x++){
            arr[x]=new Array();        //声明二维数组
            for(var y=0;y<7;y++){

              arr[x][y]="        ";          //数组初始化为0

            }
          }
          console.log(arr);
          // console.log("----after----");
          classList=responseData.data.foundlist;
          console.log(classList);
          for(var cl in classList){

            // console.log(classList[cl]);
            var j=classList[cl].week;

            // console.log(j);

            for(var c=classList[cl].start_hall;c<=classList[cl].end_hall;c++){

              switch (j) {
                case 1: arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;

                  break;
                case 2:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;
                  // console.log(arr[c-1][j-1]);
                  break;
                case 3:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;break;
                case 4:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;break;
                case 5:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;break;
                case 6:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;break;
                case 7:arr[c-1][j-1]=classList[cl].name+" "+classList[cl].teacher+" "+classList[cl].class;break;




              }
            }



          }

          self.testArry=arr;

          console.log(arr);
          console.log(self.testArry);
          // console.log(arr);
        }


      ).catch(
        err => {console.log(err)}
      );



        // console.log(this.Firsthall[11]);


          // console.log(arr);

          // console.log(this.testArry);

    }, methods:{


      getNowWeek:function(id){

        this.thisweek=id;
        baseUtil.setCookie("week",id);
        this.showweeklist=false;
        this.$router.go(0);

      },
      getImage:function(){

        var userloginUrl=httpUtil.fetch(this.loginUserUrl);
        var self=this;

        userloginUrl.then(
          function (responseData) {
            self.loginLogoUrl="http://img.zhiyigo.cn/code.jpg";
            self.showImgLoader=false;
            self.showCodeImg=true;
          }
        ).catch(
          err => {

            console.log(err);}
        );



      },
      updateClassTable:function () {

        var kebiaoList =httpUtil.post(this.updatekebiaoListApi+"?username="+this.person.username+"&password="+
          this.person.password+"&code="+this.person.code);
        var self=this;
        kebiaoList.then(
          function (ResData) {
            alert(ResData);
           if(ResData.status==1){

              alert("update success!");

           }else {
             alert("update fail!");
           }

           self.$router.go(0);
          }
        ).catch(
          err => {console.log(err);
            self.$router.go(0);
          }
        );
      }

    }

  }
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

  .img1{
    background-image: url(/static/img/kebiao/timg1.jpg);
    background-repeat: no-repeat;
    background-size:100% 100%;
    width: 100%;
    height: 100%;
    display:inline-block;
    text-align: center;
  }
  td {
    width: 1px;
    white-space: pre-wrap; /* 自适应宽度*/


  }

  table {
    table-layout: fixed;

    border-collapse: collapse;

    word-wrap:break-word;
  }
</style>
