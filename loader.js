const path = require('path')
const reg = /(.*\s*=\s*)?new\s+Vue/

const name = '__TransferFile__'

function babel(source){
  let matched = false
  const options = this.getOptions()
  if(options && options.main){
    matched = this.resourcePath === path.resolve(this.rootContext, options.main)
  }else{
    const entry = this._compiler.options.entry
    if(typeof entry === 'string'){
      matched = this.resourcePath === path.resolve(this.rootContext, entry)
    }else {
      const entries = Object.values(entry).map(item =>{
        return item.import ? item.import[0] : item
      })
      for(let i= 0;i< entries.length; i++){
        let entryPath = path.resolve(this.rootContext,entries[i])
        if(entryPath  === this.resourcePath){
          matched = true
          break;
        }
      }
    }
  }

  if(matched){
    const matched = source.match(reg)
    if(matched){
      const arr = source.split(matched[0])
      const resourceArr = [
        arr[0],
        `\r\nVue.use(${name},{editor: '${options.editor}'}) \r\n`,
        matched[0],
        arr[1]
      ]
      source = `
import ${name} from '${path.resolve(__dirname,'./vueuse.js')}'
${resourceArr.join('')}
      `
    }
  }
  return source
}


module.exports = babel
