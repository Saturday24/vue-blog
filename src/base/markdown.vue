<template>
	<div id="md-page">
		<div v-html="compiledMarkdown"></div>
	</div>
</template>
<script>
import marked from 'marked'
var rendererMD = new marked.Renderer()
marked.setOptions({
	renderer: rendererMD,
	gfm: true,
	tables: true,
	breaks: true,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
})
export default {
	name: 'markdown',
  props: {
    mdCtx: {
      type: String,
      default: ''
    }
  },
	created() {
    this._getMd();
  },
  methods: {
    _getMd() {
      let that = this
      let mdList = []
      this.$get('mdlist', {
      }).then((res) => {
        mdList = res;
        for (let i = 0; i < mdList.length; i++) {
          that.$get(`md/${mdList[i]}`, {
          }).then((res) => {
            console.log(res);
            that.input = res;
          }).catch((err) => {
            console.log(err);
            console.log('出现错误');
          })
          console.log(mdList[i]);
        }
      }).catch((err) => {
        console.log("出现错误")
        console.log(err)
      })
    }
  },
	computed: {
		compiledMarkdown() {
			return marked(this.mdCtx, { sanitize: false })
		}
	}
}
</script>
<style scoped>
  #md-page {
    display: flex;
    justify-content: center;
  }
</style>