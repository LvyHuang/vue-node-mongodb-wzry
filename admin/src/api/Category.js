import http from "../http";

//获取分类列表
export const getCategoryList = () => {
  try {
    return http.get("categories");
  } catch (e) {
    console.log(e);
  }
};

//新增分类
export const postCategory = (params) => {
  try {
    return http.post("categories", {
      ...params
    });
  } catch (e) {
    console.log(e);
  }
};

//修改当前行的数据
export const modifyCategory = (id,params) => {
  try{
    return http.put(`/categories/${id}`, {
      ...params
    })
  }catch(e){
    console.log(e);
  }
}

//删除当前行的数据
export const deleteCategory = (id) => {
  try{
    return http.delete(`/categories/${id}`)
  }catch(e){
    console.log(e);
  }
}
