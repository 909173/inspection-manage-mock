import Vue from "vue"
import VueHtmlToPaper from "vue-html-to-paper"

const option =  {
  styles: [
    "https://unpkg.com/c3@0.7.2/c3.min.css",
    "https://unpkg.com/taucharts@2.7.3/dist/taucharts.min.css"
  ]
}

Vue.use(VueHtmlToPaper, option)
