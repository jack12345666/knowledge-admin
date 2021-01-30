<template>
  <div class="category" :style="{ minHeight: height + 'px', height: '100vh' }">
    <div class="title">分类</div>
    <div class="top">
      <a-input-search
        placeholder="请输入关键词"
        v-model="searchVal"
        @search="onSearch"
      />
      <div class="edit" @click="toEditCategory">编辑分类</div>
    </div>
    <div class="tree">
      <a-tree :block-node="true" :default-expanded-keys="['0-0']" :tree-data="categoryData" @select="onSelect">
        <a-icon slot="switcherIcon" type="caret-down" />
      </a-tree>
    </div>

    <a-modal width="700px" v-model="showEdit" title="编辑分类">
      <div slot="footer">
        <a-button @click="showEdit = false">关闭</a-button>
      </div>
      <div class="editBox">
        <div class="first">
          <a-button type="primary" @click="createFirstCategory">创建一级类目</a-button>
        </div>
        <div class="tips">
          <a-alert
            message="若一个类目下存在问答内容，则无法删除该类目"
            type="warning"
            closable
          />
        </div>
        <div class="isFirstCategory" v-if="isFirstCategory">
          <div class="oneItem">
            <div class="label">类目名称</div>
            <div class="value">
              <a-input placeholder="请输入类目名称" v-model="firstName" />
            </div>
          </div>
          <div class="oneBtns">
            <a-button size="small" style="margin-right: 10px" @click="isFirstCategory = false">取消</a-button>
            <a-button size="small" type="primary" @click="addFirstCategory">确定</a-button>
          </div>
        </div>
        <div class="editTree">
          <a-tree :block-node="true" :tree-data="treeData">
            <a-icon slot="switcherIcon" type="caret-down" />
            <template slot="custom" slot-scope="item">
              <div class="treeItem">
                <div class="name">{{ item.title }}</div>
                <div class="options">
                  <span class="optionsItem" @click.stop="()=> append(item)"><a-icon type="plus" />&nbsp;&nbsp;同级类目</span>
                  <span class="optionsItem" @click.stop="()=> append(item)"><a-icon type="plus" />&nbsp;&nbsp;子级类目</span>
                  <span class="optionsItem" @click.stop="()=> edit(item)"><a-icon type="edit" />&nbsp;&nbsp;编辑</span>
                  <a-popconfirm title="确认要删除吗？" ok-text="确认" cancel-text="取消" @confirm.stop="(e)=> remove(item)">
                    <a-icon slot="icon" type="exclamation-circle" />
                    <span class="optionsItem"><a-icon type="delete" />&nbsp;&nbsp;删除</span>
                  </a-popconfirm>
                </div>
              </div>
            </template>
          </a-tree>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { getTableHeight } from '../../utils/utils'
import { message } from 'ant-design-vue'
export default {
  data () {
    return {
      height: null,
      searchVal: '',
      firstName: '',
      isFirstCategory: false,
      categoryData: [
        {
          title: '测试分类',
          value: '0-0',
          key: '0-0',
          scopedSlots: { title: 'custom' },
        },
        {
          title: '钉钉产品百科',
          value: '0-1',
          key: '0-1',
          scopedSlots: { title: 'custom' },
          children: [
            {
              title: '考勤',
              value: '0-1-0',
              key: '0-1-0',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '审批',
              value: '0-1-1',
              key: '0-1-1',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '钉钉基础使用',
              value: '0-1-2',
              key: '0-1-2',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '钉钉群',
              value: '0-1-3',
              key: '0-1-3',
              scopedSlots: { title: 'custom' },
            },
          ],
        },
         {
          title: '机器人基础对话',
          value: '0-2',
          key: '0-2',
          scopedSlots: { title: 'custom' },
        },
      ],
      treeData: [
        {
          title: '测试分类',
          value: '0-0',
          key: '0-0',
          scopedSlots: { title: 'custom' },
        },
        {
          title: '钉钉产品百科',
          value: '0-1',
          key: '0-1',
          scopedSlots: { title: 'custom' },
          children: [
            {
              title: '考勤',
              value: '0-1-0',
              key: '0-1-0',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '审批',
              value: '0-1-1',
              key: '0-1-1',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '钉钉基础使用',
              value: '0-1-2',
              key: '0-1-2',
              scopedSlots: { title: 'custom' },
            },
            {
              title: '钉钉群',
              value: '0-1-3',
              key: '0-1-3',
              scopedSlots: { title: 'custom' },
            },
          ],
        },
         {
          title: '机器人基础对话',
          value: '0-2',
          key: '0-2',
          scopedSlots: { title: 'custom' },
        },
      ],
      showEdit: false,

    }
  },
  created () {
    this.height = getTableHeight(200)
  },
  methods: {
    onSearch () {
      console.log(this.searchVal)
    },
    onSelect (selectedKeys) {
      console.log('selected', selectedKeys)
    },
    toEditCategory () {
      this.showEdit = true
    },
    createFirstCategory () {
      this.firstName = ''
      this.isFirstCategory = true
    },
    addFirstCategory () {
      if (!this.firstName) {
        message.error('类目名称不能为空')
      } else {
        this.treeData.push({
          title: this.firstName,
          value: this.firstName,
          key: this.firstName,
          scopedSlots: { title: 'custom' },
        })
        message.success('保存成功')
        this.isFirstCategory = false
        this.firstName = ''
      }
    },
     // 递归查找
    searchOption (option, arr, type = 'delete') {
      for (let s = 0; s < arr.length; s++) {
        if (arr[s].key === option.key) {
          if (type === 'delete') {
            if (arr[s].children && arr[s].children.length > 0) {
              message.error('类目不能删除,有子类目存在')
            } else {
              arr.splice(s, 1)
              message.success('类目删除成功')
            }
          } else {
          // 这是模拟数据编辑数据
            // this.$set(arr, s, {
            //   title: +new Date(),
            //   key: `${+new Date()}`,
            //   scopedSlots: { title: 'custom' },
            // })
          }
        }
      }
    },
    append (data) {
      // const newChild = {
      //   title: 'ceshi1',
      //   key: 'ceshi1',
      //   scopedSlots: { title: 'custom' },
      //   children: [],
      // }
      // if (!data.children) {
      //   this.$set(data, 'children', [])
      // }
      // data.children.push(newChild)
    },
    remove (data) {
      this.searchOption(data, this.treeData)
    },
    edit (data) {
      this.searchOption(data, this.treeData, 'edit')
    },
  },
}
</script>
<style lang="less" scoped>
.category {
  border-right: 1px solid #ebe7e7;
  .title {
    padding: 15px;
    background-color: #fafafa;
    border-bottom: 1px solid #d9d9d9;
  }
  .top {
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .edit {
      margin-left: 20px;
      width: 100px;
      cursor: pointer;
      color: #40a9ff;
    }
  }

}
 .editBox {
    height: 360px;
    overflow-y: auto;
    .first {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
    .tips {
      margin: 15px 0;
    }
    .isFirstCategory {
      margin: 10px 0;
      padding: 15px;
      background-color: #f5f5f5;
      .oneItem {
        display: flex;
        align-items: center;
        .label {
          width: 80px;
        }
      }
      .oneBtns {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
    .editTree {
      .treeItem {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .options {
          color:#40a9ff;
          .optionsItem {
            padding-right: 10px;
          }
        }
      }
    }
  }
</style>
