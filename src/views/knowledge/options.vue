<template>
  <div class="options">
    <div class="line">
      <div class="search">
        <a-input v-model="searchVal" style="width: 420px">
          <a-select
            slot="addonBefore"
            :default-value="null"
            style="width: 80px"
          >
            <a-select-option
              v-for="item in typeList"
              :value="item.id"
              :key="item.id"
            >
              {{ item.value }}
            </a-select-option>
          </a-select>
        </a-input>
        <a-button
          style="margin-left: 20px"
          type="primary"
          @click="toSearch"
        >
          搜索
        </a-button>
      </div>
      <div class="btns">
        <a-button @click="moreImport">批量导入</a-button>
        <a-button style="margin-left: 20px" @click="moreExport">批量导出</a-button>
      </div>
    </div>

    <a-modal v-model="showImport" title="批量导入" :footer="null">
      <div class="importBox">
        <div class="content">
          <a-upload
            name="file"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="fileChange"
          >
            <a-button type="primary"> <a-icon type="upload" /> 点击上传文件</a-button>
          </a-upload>
          <div class="tips">
            <div>文件小于10M</div>
            <div>文件内容需符合模板规范</div>
          </div>
          <div class="download">
            <a-icon type="download" />&nbsp;&nbsp;下载规范模板
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      typeList: [
        { id: null, value: '所有' },
        { id: 1, value: '生效' },
        { id: 10, value: '草稿' },
        { id: 0, value: '无效' },
      ],
      showImport: false,
    }
  },
  methods: {
    handleChange () {},
    toSearch () {},
    moreImport () {
      this.showImport = true
    },
    moreExport () {
      this.$message.error('此功能暂未开放')
    },
     fileChange (info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.options {
  background-color: #fff;
  padding: 20px;
  .line {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.importBox {
  position: relative;
  height: 300px;
  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .tips {
      color: #999;
      text-align: center;
      font-size: 13px;
      margin: 20px 0;
    }
    .download {
      text-align: center;
      cursor: pointer;
      color: #40A9FF;
    }
  }
}
</style>
