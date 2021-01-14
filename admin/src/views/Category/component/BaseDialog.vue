<template>
  <el-dialog
    :visible.sync="showDialog"
    :title="title"
    width="35%"
  >
    <div class="content">
      <el-form label-width="80px" @submit.native.prevent="submit" :rules="rules" :model="model" ref="form" hide-required-asterisk>
        <el-form-item label="上级分类" v-if="type==='new'">
          <el-select v-model="model.parent">
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="model.name" class="input" clearable/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">确定</el-button>
          <el-button @click="showDialog = false">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
import { getCategoryList, modifyCategory, postCategory } from '../../../api/Category';
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "new",
    },
    rowData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      model: {name:''},
      parents:'',
      rules:{
        name: [{required: true, message:'请输入名称'}]
      }
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("update:value", val);
      },
    },
    title(){
      return this.type === 'edit' ? '编辑分类' : '新建分类'
    }
  },
  watch: {
    rowData: {
      handler() {
        this.fetch();
        this.fetchParents();
      },
      immediate: true,
    },
  },
  methods: {
    fetch() {
      this.model = this.rowData;
    },
    async fetchParents() {
      const { data } = await getCategoryList()
      this.parents = data
    },
    submit(){
      this.$refs.form.validate((valid) => {
        if(valid){
          this.save()
        }
      })
    },
    async save() {
      if (this.type === "edit") {
        const id = this.rowData._id
        await modifyCategory(id,this.model)
        this.$message.success("修改成功")
        this.showDialog = false
        this.$emit("getCategoryList")
      } else {
        await postCategory(this.model)
        this.$message.success("保存成功")
        this.showDialog = false
        this.$emit("getCategoryList")
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.input{
  &::v-deep{
    .el-input__inner,.el-input__suffix{
      width: 70%;
    }
  }
}

</style>