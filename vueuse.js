export default {
  install:(Vue,options)=>{
    Vue.mixin({
      mounted() {
        const filePath = this.$options.__file
        if(filePath){
          this._filePath = filePath
          this.$el.setAttribute('_file_path', filePath)
          if(!this.$el.title){
            this.$el.title = `双击打开${options.editor} :  ${filePath}`
          }
          this.$el.addEventListener('dblclick',this.handler)
        }
      },
      beforeDestroy(){
        this.$el.removeEventListener('dblclick',this.handler)
      },
      methods:{
        handler(e){
          e.stopPropagation()
          e.preventDefault()
          const xhr = new XMLHttpRequest()
          xhr.open('get',`/__webpack_dev_middleware/transfer-file?path=${this._filePath}`)
          xhr.send()
        }
      }
    })
  }
}
