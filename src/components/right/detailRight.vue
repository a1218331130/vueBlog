<template>
<div>
    <div v-highlight class="markdown-body" v-html="issueContentData"></div>
</div>
</template>
<style>
.markdown-body blockquote  {
    padding: 20px;
    background-color: #f2f2f2;
    border-left: 6px solid #b3b3b3;
    word-break: break-word;
    font-size: 16px;
    font-weight: 400;
    line-height: 30px;
    margin: 0 0 20px;
}
.markdown-body code {
    padding: 2px 4px;
    background-color: #f6f6f6;
    vertical-align: middle;
    border: none;
    color: #c7254e;
    font-size: 12px;
    white-space: pre-wrap;
}
.markdown-body pre {
    word-wrap: normal;
    word-break: break-all;
    white-space: pre;
    overflow: auto;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 0;
    line-height: 20px;
    background-color: #282c34;
}

</style>
<script>
 import Vue from 'vue'
 import hljs from 'highlight.js'
 import marked from 'marked'
//  import 'mavon-editor/dist/css/index.css'
 import '@/assets/css/github-markdown.min.css'
 import 'mavon-editor/dist/highlightjs/styles/hybrid.min.css'
 
//封装成一个指令
Vue.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hljs.highlightBlock(block)
    })
})
export default {
  components: {
  },
  computed: {
     issueContentData() {
        var content = marked(this.$store.state.usually.rightHtml);
        return content
     },
  },
  data () {
    return {
       contentLists:[],
       value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
       userLists: [],
       commitList: []
    }
  },
  methods: {

  },
  mounted () {
    console.log(this.$store.state.usually.rightHtml, 'this.$store.state');
  }
}
</script>
