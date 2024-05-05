const childProcess = require("child_process");
const path = require('path')
const chalk  = require('chalk');

const rootPath = process.cwd()

const transferFile = (app, options ={})=>{
  const { editor='vscode' } = options
  return app.get('/__webpack_dev_middleware/transfer-file', function(req, res) {
    const filePath = path.join(rootPath, req.query.path)
    let editorExec
    switch(editor){
      case 'vscode':
        editorExec = '"Visual Studio Code"'
        break;
      case 'webstorm':
        editorExec = 'webstorm'
        break;
      default: undefined
    }
    childProcess.exec(
      `open -a ${editorExec} ${filePath}`,
      (err)=>{
        if(err){
          console.log('********************************************************************************')
          console.assert(false, chalk.red(`Unable to find application named ${editorExec}`))
          console.log('********************************************************************************')
        }
      })
    res.json('');
  });
}

const onBeforeSetupMiddleware = (api,options) => {
  const config = api.resolveWebpackConfig()
  if(config.mode !== 'development') return
  const { main, editor } = options.pluginOptions?.findFile || {}
  options.configureWebpack = options.configureWebpack || {}
  options.configureWebpack.module = options.configureWebpack.module || { rules:[] }
  if(options.configureWebpack.module){
    options.configureWebpack.module.rules =  options.configureWebpack.module.rules || []
    options.configureWebpack.module.rules.push({
      test: /\.(j|t)s$/,
      enforce: 'pre',
      use:{
        loader: path.resolve(__dirname, './loader.js'),
        options: {
          main: main,
          editor: editor
        }
      }
    })

  }

  options.devServer.onBeforeSetupMiddleware = function({app}) {
    transferFile(app, {editor})
  }
}


onBeforeSetupMiddleware.apply = transferFile
module.exports = onBeforeSetupMiddleware
