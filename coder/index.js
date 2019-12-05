const fs = require('fs')
const path = require('path')
// 引入遍历插件
const _ = require('lodash')
// const rm = require('rimraf')
// 导入生产types模板
// const typesRender = require('./templates/types')
const config = require('./config');

// 首先获取接口文件夹下得所有接口文件路径
function getInterFaceDir() {
   // 获取存放接口的文件夹路径
   let interfaceDir = path.join(__dirname, config.interface);
   let fileList = [];
   // 获取存放接口的文件夹路径下面的文件名称，['test1', 'test2']
   let files = fs.readdirSync(interfaceDir);

   // 遍历文件名称
   _.each(files, function(file) {
       // 获取完整的路径
       let filePath = path.join(interfaceDir, file);

       // 判断是不是js文件
       if(file.indexOf('.js') > 0) {
          fileList.push({
             name: file,
             path: filePath
          });
       }
   });
  //  console.log(fileList);
   return fileList  
}
// 根据配置文件生成json
function getInterFaceInfo(files) {
   let models = {}
   _.each(files, function(file) {
      models[file.name] = require(file.path);
   });
  //  console.log(models, 'models');
   return models;
}
// 解析models
function getInterFaceJson(schemas) {
  let results = {}
   _.each(schemas, function(schema, name) {
      // console.log(schema.model, 'results');
      results[name] = parseModel(schema.model);
   });
  //  console.log(results, 'results');
   return results;
}
function parseModel(model) {
  let arr = [];
  _.each(model, function(item) {
      let options = _.extend({}, {method: 'post'}, item.option || {});
      arr.push({
        path: item.path,
        options: options,
        methodType: item.methods,
        httpMethod: item.methods,
        name: item.name,
        state: item.state.toUpperCase(),
        title: item.title
    });
  });
  return arr;
}
// 创建文件
function writeFile(path, fileName, content) {
   if(!fs.existsSync(path)) {
      fs.mkdirSync(path);
   }
   fs.writeFileSync(path + fileName, content, {encoding: 'utf8'});
}
const interfaceFiles = getInterFaceDir();
const interfaceInfo = getInterFaceInfo(interfaceFiles);
const interfaceJson = getInterFaceJson(interfaceInfo);
const tempaltes = require('./templates/types');
function writeApi(json, info) {
  _.each(json, function(model, name) {
    // 指定输出位置
    const interfaceApi = path.join(__dirname, config.interfaceApi);
    console.log(model);
    writeFile(interfaceApi, name, tempaltes({
       model: model,
       url: config.API_URL
    }));
  });
}
function init() {
    // 初始化
    // console.log(SCHEMA, 'asd');
    console.log('开始生成代码.....')
    writeApi(interfaceJson, interfaceInfo);
    console.log('代码构建完成.....')
}
init()