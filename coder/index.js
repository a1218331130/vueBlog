const fs = require('fs')
const path = require('path')
// 引入遍历插件
const _ = require('lodash')
// const rm = require('rimraf')

// 引入接口文档
const SCHEMA = require('./schema.json')
const beautify = require('js-beautify').js_beautify
// 导入生产types模板
const typesRender = require('./templates/types')

//导入生成store的模板
const storeRender = require('./templates/store')

// 配置文件
const config = {
    // 生成store文件路径
    outStorePath: '../src/store/coder/',
    // 生成store配置文件路径
    outStoreType: '../src/store/',
}
// const MODELS = parseSchemas(SCHEMA.doc.models || {})
// json文件赋值
const MODELS = SCHEMA.doc.models || {};

/**
 * 创建文件
 * @param path
 * @param fileName
 * @param content
 */
function writeFile (path, fileName, content) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
  }
  fs.writeFileSync(path + toKebabCase(fileName) + '.js', content, {encoding: 'utf8'})
}
// 大小写转换
function toUpperCase (name) {
  return name.toUpperCase()
}

/**
 * Foo Bar | --foo-bar | __foo_bar__ => fooBar
 * @param name
 */
function toCamelCase (name) {
  return _.camelCase(name)
}

/**
 * Foo Bar | fooBar | --foo-bar => foo_bar
 * @param name
 */
function toSnakeCase (name) {
  return _.snakeCase(name)
}

/**
 * fooBar => foo-bar
 * @param name
 */
function toKebabCase (name) {
  return _.kebabCase(name)
}

function toUpperSnakeCaseName (name) {
  return toUpperCase(toSnakeCase(name))
}

/**
 * 格式化js代码
 * @param content
 * @returns {*}
 */
function beautifyJs (content) {
  content = content.replace(/(\r\n|\n)\s*/g, '\n')
    .replace(/\(\n/g, '(')
    .replace(/,\n/g, ',')
    .replace(/\/\*\*/g, '\n/**')
    .replace(/\n\/\//g, '\n\n//')
  return beautify(content, {
    indent_with_tabs: false,
    indent_size: 2,
    jslint_happy: true,
    end_with_newline: true,
    space_after_anon_function: true
  })
}
/**
 * 生成store文件
 */
function writeStore () {
  // 定义types模板的数据
  let types = {}
  //定义modules.js的数据和modules.js导出的字段
  let modules = [], extendsArray = []
  // 遍历json文件
  _.each(MODELS, function (model, name) {
     modules.push(`import ${name} from './coder/${ toKebabCase(name)}'`)
     extendsArray.push(name)
      let importTypeArray = [],
      customStateArray = [],
      items = []
     types[name] = []
     _.each(model, function (item) {
        types[name].push({
          name: toUpperSnakeCaseName(item.name)
        })
        importTypeArray.push(toUpperSnakeCaseName(item.name))
        customStateArray.push(item.state)
        items.push({
          NAME: toUpperSnakeCaseName(item.name),
          name: toCamelCase(item.name),
          state: item.state,
          url: item.path,
          httpMethod: item.httpMethod,
          ajaxParam: 'data'
        })
     })
     // 定义生成文件的路径
     const outPath = path.join(__dirname, config.outStorePath)
     console.log(items, 'itemsitemsitems');
     // 生成store模板文件并传值
     writeFile(outPath, name, beautifyJs(storeRender({
       name: name,
       kebabCaseName: toKebabCase(name),
       importTypeArray: importTypeArray,
       customStateArray: customStateArray,
       items: items
     })))
  });
   // 定义生成文件的路径
  const outStore = path.join(__dirname, config.outStoreType)
  // 生成types模板文件并传值
  writeFile(outStore, 'types', beautifyJs(typesRender({types: types})))
  modules.push(`export default {${extendsArray.join(', ')}}`)
   // 生成modules模板文件并传值
  writeFile(outStore, 'modules', modules.join('\n') + '\n')
}
function init() {
    // 初始化
    // console.log(SCHEMA, 'asd');
    console.log('开始生成代码.....')
    writeStore();
    console.log('代码构建完成.....')
}
init()