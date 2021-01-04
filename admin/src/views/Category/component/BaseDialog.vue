<template>
  <el-dialog
    :visible.sync="showDialog"
    :title="type === 'edit' ? '编辑分类' : '新建分类'"
    width="40%"
  >
    <div class="content">
      <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="名称">
          <el-input v-model="model.name" />
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
import { modifyCategory, postCategory } from '../../../api/Category';
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
      model: {
        name: "",
      },
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
  },
  watch: {
    rowData: {
      handler() {
        this.fetch();
      },
      immediate: true,
    },
  },
  methods: {
    fetch() {
      this.model = this.rowData;
    },
    async save() {
      if (this.type === "edit") {
        const id = this.rowData._id;
        await modifyCategory(id,this.model);
        this.$message.success("修改成功");
        this.showDialog = false;
        this.$emit("getCategoryList");
      } else {
        await postCategory(this.model);
        this.$message.success("保存成功");
        this.showDialog = false;
        this.$emit("getCategoryList");
      }
    },
  },
};
</script>
