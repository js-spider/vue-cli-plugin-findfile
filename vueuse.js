export default {
  install:(Vue)=>{
    Vue.mixin({
      mounted() {
        const filePath = this.$options.__file
        if(filePath){
          this._filePath = filePath
          this.$el.setAttribute('_file_path', filePath)
          if(!this.$el.title){
            this.$el.title = `双击打开 ${filePath}`
          }
          this.$el.addEventListener('dblclick',this.handler)
        }
      },
      beforeDestroy(){
        this.$el.removeEventListener('dblclick',this.handler)
      },
      methods:{
        handler(){
          const xhr = new XMLHttpRequest()
          xhr.open('get',`/__webpack_dev_middleware/transfer-file?path=${this._filePath}`)
          xhr.send()
        }
      }
    })
  }
}
