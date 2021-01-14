module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const Category = require("../../models/Category");
  router.post("/categories", async (req, res) => {
    const model = await Category.create(req.body);
    res.send(model);
  });
  // router.get("/categories", async (req, res) => {
  //   //使用 Category.find()方法获取数据，使用limit()方法限制数据只显示10条 定义给items
  //   const items = await Category.find().limit(10);
  //   // 发回客户端，让客户端知道创建完成，创建的数据是什么
  //   res.send(items);
  // });

  //获取列表
  router.get("/categories", async (req, res) => {
    const parents = await Category.find()
      .where({ parent: null })
      .lean();
    for (let i = 0; i < parents.length; i++) {
      parents[i].children = await Category.aggregate([
        { $match: { parent: parents[i]._id } },
        {
          $lookup: {
            from: "Category",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
      ]);

      const length = parents[i].children.length;
      for (let j = 0; j < length; j++) {
        // console.log((parents[i].children)[j]);
        parents[i].children[j].children = await Category.aggregate([
          { $match: { parent: parents[i].children[j]._id } },
          { $lookup: {
              from: "Category",
              localField: "_id",
              foreignField: "parent",
              as: "children", },
          },
        ]);
      }
    }

    return res.send(parents);

  });

  router.get("/categories/:id", async (req, res) => {
    const items = await Category.findById(req.params.id);
    res.send(items);
  });
  //加一个put方法，接口地址是这个分类,路径url要加:id,
  router.put("/categories/:id", async (req, res) => {
    //定义一个model 把create 换成 findByIdAndUpdate()方法，接收两个参数，一个是id,第二是内容req.body
    const model = await Category.findByIdAndUpdate(req.params.id, req.body);
    // 发回客户端，让客户端知道创建完成，创建的数据是什么
    res.send(model);
  });

  //根据id删除分类 加一个delete方法，接口地址是这个分类,路径url要加:id
  router.delete("/categories/:id",  async (req, res) => {
    //不需要返回值  findByIdAndUpdate()方法换成findByIdAndDelete()，接收两个参数，一个是id,第二是内容req.body
    await Category.findByIdAndDelete(req.params.id,req.body);
    // 发回客户端，返回一个 success 为 删除成功
    res.send({ message: "删除成功" });
  });

  // 使用这个app.use（路由地址,接口地址）为后续的增删改查提供路由
  // 分类接口定义完毕，就是admin/api/categories 下一步去前端发起这个接口请求
  app.use("/admin/api", router);
};
