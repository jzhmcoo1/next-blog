let ipUrl = 'http://127.0.0.1:7001/admin/'
// let ipUrl = 'http://106.54.65.104:7001/admin/'

let servicePath = {
    checkLogin: ipUrl + 'checkLogin', //检查用户名和密码
    getTypeInfo: ipUrl + 'getTypeInfo', //获得文章类别信息
    addArticle: ipUrl + 'addArticle', //添加文章
    updateArticle: ipUrl + 'updateArticle', //修改文章
    getArticleList: ipUrl + 'getArticleList', //文章列表
    delArticle: ipUrl + 'delArticle/', //删除文章
    getArticleById: ipUrl + 'getArticleById/', //用id获取文章
}

export default servicePath