<template>
  <iframe name="right" id="right_iframe" src="http://cet.neea.edu.cn/cet" frameborder="false" scrolling="yes" width="100%" height="100%" allowtransparency="true" >
  </iframe>
  <!--<div v-html="htmlmodel">-->

  <!--</div>-->
</template>

<script>
  import * as httpUtil from '../util/http';
  import GlobalVariable from './GlobalVariable';
    export default {
      components: {},
      data () {
        return {

          htmlmodel:""


        }},
      mounted:function() {


        var userloginUrl=httpUtil.fetch(GlobalVariable.cetserver);
        var self=this;
        userloginUrl.then(
          function (HtmlRespoense) {
            console.log(HtmlRespoense);
              self.htmlmodel=HtmlRespoense;
          }
        ).catch(
          err=>(
            console.log(err)
          )
        )
      },methods:{



      },
        name: "searchCET"
    }
</script>

<style scoped>

</style>
