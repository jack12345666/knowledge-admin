<template>
  <div class="tableBox">
    <div class="title">
      <a-button type="primary" @click="addQa">新增问答</a-button>
    </div>
    <div class="table">
      <a-table :columns="columns" :data-source="data" bordered>
        <div slot="question" slot-scope="text, record">
          <div>{{ record.question }}</div>
          <div class="liked" @click="showLiked(record.liked)" v-if="record.liked.length > 0">查看{{ record.liked.length }}个相似问法<a-icon type="down" /></div>
        </div>
        <div slot="status" slot-scope="text">
          <a-tag color="green" v-if="text === 1">已生效</a-tag>
          <a-tag color="red" v-if="text === 0">失效</a-tag>
          <a-tag color="#cfcfcf" v-if="text === 10">草稿</a-tag>
        </div>
        <div slot="action" slot-scope="text, record">
          <div class="liked">编辑</div>
          <div class="liked" v-if="record.status === 1" @click="invalid(record)">失效</div>
          <div class="liked" v-if="record.status === 10" @click="toEffect(record)">发布</div>
          <div class="liked" v-if="record.status === 0" @click="toEffect(record)">生效</div>
        </div>
      </a-table>
    </div>

    <a-modal v-model="isLiked" title="相似问题" ok-text="确认" cancel-text="取消" @ok="isLiked = false">
      <p v-for="(item, index) in likedList" :key="item.id">{{ index+1 }}. {{ item.name }}</p>
    </a-modal>

    <Qa v-if="isQa" @closeQa="closeQa" />
  </div>
</template>

<script>
import Qa from './qa'
const columns = [
  {
    title: '问题',
    dataIndex: 'y',
    className: 'question',
    scopedSlots: { customRender: 'question' },
  },
  {
    title: '答案',
    className: 'answer',
    dataIndex: 'answer',
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' },
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
]
const data = [
  {
    id: '1',
    key: 1,
    question: '这个是干嘛的',
    answer: '随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下哈哈哈哈哈，随便写一下',
    liked: [
      { id: 1, name: '这干嘛用的' },
      { id: 1, name: ' 这有啥用' },
    ],
    status: 0,
  },
  {
    id: '2',
    key: 2,
    question: '怎么用机器人',
    liked: [],
    answer: '测试',
    status: 1,
  },
  {
    id: '3',
    key: 3,
    question: '测试问题',
    liked: [],
    answer: '测试答案',
    status: 10,
  },
]
export default {
  components: { Qa },
  data () {
    return {
      data,
      columns,
      isLiked: false,
      likedList: [],
      isQa: false,
    }
  },
  methods: {
    showLiked (data) {
      this.likedList = data
      this.isLiked = true
    },
    invalid (record) {
       var _this = this
       this.$confirm({
        title: '确定要改问题失效吗?',
        content: '点击确定，该问题将变为未生效状态，智能对话将无法匹配到该答案',
        okText: '确认',
        cancelText: '取消',
        onOk () {
          _this.data[1].status = 0
        },
      })
    },
    toEffect (record) {
     this.data[2].status = 1
    },
    addQa () {
      this.isQa = true
    },
    closeQa () {
      this.isQa = false
    },
  },
}
</script>
<style>
 td.answer {
    height: 200px !important;
    width: 300px !important;
    overflow-y: auto !important;
  }
  td.question {
    height: 200px !important;
    width: 300px !important;
  }
</style>
<style lang="less" scoped>
.tableBox {
  .title {
    padding: 9.5px;
    display: flex;
    justify-content: flex-end;
    background-color: #fafafa;
    border-bottom: 1px solid #d9d9d9;
  }
  .table {
    padding: 15px;
    .liked {
      color: #40A9FF;
      cursor: pointer;
    }
  }
}
</style>
