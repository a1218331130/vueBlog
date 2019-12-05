module.exports = {
    name: '博客接口',
    model: [
        {
            path: '/menu/getNewList', //接口名称
            title: '获取首页数据', //接口中文名称
            name: 'getNewList', 
            methods: false,
            state: 'getNewList'  // 调用接口时的请求方法
        }
    ]
}