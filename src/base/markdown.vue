<template>
	<div id="app">
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
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false
})
export default {
	name: 'App',
	data () {
		return {
			input: '# hello `markdow` '
		}
	},
	computed: {
		compiledMarkdown: function () {
			return marked(this.input, { sanitize: true })
		}
	}
}
</script>