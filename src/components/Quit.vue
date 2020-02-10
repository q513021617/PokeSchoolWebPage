<template>

</template>

<script>
  import * as baseUtil from '../baseUtil';
    export default {
      data () {},
      mounted:function(){

        baseUtil.setCookie("usernumber",null);
        baseUtil.setCookie("username",null);
        baseUtil.setCookie("college",null);
        baseUtil.setCookie("account",null);
        baseUtil.setCookie("professional",null);

        location.href="/";
      },
        name: "Quit"
    }
</script>

<style scoped>

</style>
