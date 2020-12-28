module.exports = app => {
    const express = require('express');
    const router = express.Router()
    const Category = require('../../models/Category')
    router.post('/categories',async(req,res)=>{
        const model = await Category.create(req.body)
        res.send(model)
    })
    router.get('/categories', async(req,res) => {
        //使用 Category.find()方法获取数据，使用limit()方法限制数据只显示10条 定义给items
        const items = await Category.find().limit(10)
        // 发回客户端，让客户端知道创建完成，创建的数据是什么
        res.send(items)
    })
    
    // 使用这个app.use（路由地址,接口地址）为后续的增删改查提供路由
    // 分类接口定义完毕，就是admin/api/categories 下一步去前端发起这个接口请求
    app.use('/admin/api',router)
}