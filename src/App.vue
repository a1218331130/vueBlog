<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    border: 0;
    font-family: inherit;
    font-size: 100%;
    font-style: inherit;
    margin: 0;
    outline: 0;
    padding: 0;
    vertical-align: baseline;
    
}
html, body{
  width: 100%;
  height: 100%;
  /* height: calc(100vh - 100px); */
}
a{
  text-decoration: none
}
li{
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background-color: #eaeaea;
  /* border-left: 1px solid #fe9600; */
}
/* ::-webkit-scrollbar-thumb {
  background-color: #fe9600;
} */
/* ::-webkit-scrollbar-thumb:hover {
  background-color: #fe9600;
}
::-webkit-scrollbar-thumb:active{
  background-color:#fe9600;
} */
</style>
