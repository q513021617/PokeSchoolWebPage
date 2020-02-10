<template>
  <iframe name="right" id="right_iframe" src="https://cjcx.neea.edu.cn/ncre/query.html" frameborder="false" scrolling="yes" width="100%" height="100%" allowtransparency="true" >
  </iframe>
</template>

<script>
    export default {
      components: {},
      data () {
        return {}},
      mounted:function() {

        this.setIframeHeight(document.getElementById('right_iframe'));
      },methods:{
        setIframeHeight: function (iframe) {
          if (iframe) {
            var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
            if (iframeWin.document.body) {
              iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
            }
          }
        }

      },
        name: "searchNCRE"
    }
</script>

<style scoped>

</style>
