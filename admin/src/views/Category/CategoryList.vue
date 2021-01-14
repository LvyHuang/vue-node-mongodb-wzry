<template>
  <el-card class="wrapper">
    <div class="title">分类列表</div>
    <el-button class="btn-add" @click="addCategory">
      <i class="btn-add__icon el-icon-plus" />新建分类
    </el-button>
    <tree-table
        :data="items"
        show-index
        show-header
        index-text="序号"
        :columns="columns"
        :expand-type="false"
        :selection-type="false"
        border>
      <template slot="operate" slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.row)"><i class="el-icon-edit icon"/>编辑</el-button>
          <el-button
            size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
            <i class="el-icon-delete icon"/>删除</el-button>
      </template>
    </tree-table>
    <base-dialog
      :value.sync="dialogVisible"
      :type="type"
      @getCategoryList="fetch"
      :rowData="rowData"
    />
  </el-card>
</template>
<script>
import { deleteCategory, getCategoryList } from "../../api/Category";
import BaseDialog from "./component/BaseDialog.vue";
export default {
  components: { BaseDialog },
  data() {
    return {
      items: [],
      dialogVisible: false,
      type: "new",
      rowData: {},
      columns: [
        {
          label: '分类名称',
          prop: 'name',
          align: 'center',
          headerAlign: 'center'
        },
        {
          label: '操作',
          type: 'template',
          template: 'operate',
          align: 'center',
          headerAlign: 'center',
          width: 300
        }
      ],
      items1:[
        {name:'news',children:[{name:'111'},{name:'111'}]},
        {name:'ns',children:[{name:'111'},{name:'111'}]},
      ]
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const { data } = await getCategoryList();
      this.items = data;
      console.log(data);
    },
    addCategory() {
      this.dialogVisible = true;
      this.type = "new";
      this.rowData = {};
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.type = "edit";
      this.rowData = row;
    },
    handleDelete(index, row) {
      this.$confirm(`是否确定要删除分类"${row.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        await deleteCategory(row._id);
        this.$message.success("删除成功");
        this.fetch();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.wrapper {
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
  .icon{
    margin-right: 5px;
  }
  .btn-add {
    width: 100%;
    margin: 14px 0;
    &__icon {
      margin-right: 4px;
    }
  }
}
</style>
