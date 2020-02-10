<template>
  <v-flex xs12 class="py-5">
  <h1>{{title}}</h1>
    <div>{{content}}</div>
  </v-flex>
</template>

<script>

  import * as VCard from "vuetify/lib/components/VCard";

    export default {
      components: {
        // VListGroup,
        ...VCard
      },
      data () {
        return {

          created:function(){
            this.getParams();
          },
          watch: {
            // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
            '$route': 'getParams'
          },
          methods:{
            getParams:function(){
              // 取到路由带过来的参数
              var title = this.$route.detail.title;
              var content = this.$route.detail.content;
              // 将数据放在当前组件的数据内
              console.log("传来的参数=="+title)
              this.title = title
            },
            setCookie:function (c_name, value, expiredays) {
              var exdate = new Date();
              exdate.setDate(exdate.getDate() + expiredays);
              document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
            },
            getCookie:function(name){
              var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
              if (arr = document.cookie.match(reg))
                return (arr[2]);
              else
                return null;
            }
          },

          title:"",
          content:""

        }

      },
      mounted:function(){
        let expireDays = 1000 * 60 * 60 ;
        var name=this.getCookie("username");
        var stuNum=this.getCookie("stuNum");
        var StuPhone=this.getCookie("stuNum");
        var StuClass=this.getCookie("StuClass");
        var StuMajor=this.getCookie("StuMajor");
        alert("welcome   !!!"+name);
      },


        name: "announcementdetail"
    }




</script>

<style scoped>

</style>
