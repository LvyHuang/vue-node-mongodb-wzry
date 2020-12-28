<template>
  <el-card class="wrapper">
    <div class="title">新建分类</div>
    <div class="content">
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="名称">
          <el-input v-model="model.name" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">确定</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      model: {
        name: "",
      },
    };
  },
  methods: {
    async save() {
      const res = await this.$http.post("categories", this.model);
      console.log(res);
      this.$router.push("/categories/list");
      this.$message.success("保存成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  min-height: 500px;
  .title {
    font-size: 18px;
    font-weight: bold;
    position: relative;
    margin-left: 10px;
    &::before {
      content: "";
      width: 5px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: -12px;
      transform: translateY(-52%);
      background: #1890ff;
      display: inline-block;
    }
  }
  .content {
    margin: 20px 0;
    // width: 500px;
    &::v-deep {
      .el-input__inner {
        width: 500px;
      }
    }
  }
  .btn-box {
    // margin-top: 20px;
  }
}
</style>
