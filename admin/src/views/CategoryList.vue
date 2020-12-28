<template>
  <el-card>
    <div>分类列表</div>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
    </el-table>
  </el-card>
</template>
<script>
export default {
  data() {
    return {
      items: [],
    }
  },
  created(){
      this.fetch()
  },
  methods: {
      async fetch(){
        const res = await this.$http.get('categories')
        console.log(res)
        this.items = res.data
        }
  },
};
</script>
