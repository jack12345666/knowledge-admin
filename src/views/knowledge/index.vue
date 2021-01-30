<template>
  <div class="box">
    <div class="header">问答配置</div>
    <Options />
    <div class="content">
      <a-row>
        <a-col :span="6">
          <Category />
        </a-col>
        <a-col :span="18">
          <Table />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import Options from './options'
import Category from './category'
import Table from './table'
export default {
    components: { Options, Category, Table },
}
</script>

<style lang="less" scoped>
.box {
    .header {
        margin: -24px -24px 24px -24px;
        border-top: 1px solid #f5f5f5;
        background-color: #fff;
        padding: 20px;
    }
    .content {
        margin-top: 20px;
        min-height: 300px;
        background-color: #fff;
    }
}
</style>
