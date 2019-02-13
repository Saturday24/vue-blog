<template>
	<div id="md-page">
    <!-- <article class="markdown-body"> -->
      <div v-html="compiledMarkdown"><article class="markdown-body"></article></div>
    <!-- </article> -->
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
			return marked(this.mdCtx, { sanitize: true })
		}
	}
}
</script>
<style scoped>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
  #md-page {
    display: flex;
    justify-content: center;
  }
</style>