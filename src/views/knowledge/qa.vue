<template>
  <a-modal v-model="isShow" title="新增问答" width="80vw" @cancel="handleCancel">
    <template slot="footer">
      <a-button @click="handleCancel" style="margin-right: 10px">取消</a-button>
      <a-button @click="handleDraft" style="margin-right: 10px">保存草稿</a-button>
      <a-button type="primary" @click="handleOk">保存并发布</a-button>
    </template>
    <div class="qa">
      <a-row :gutter="15">
        <a-col :span="11">
          <div class="title">问题</div>
          <div class="left">
            <div class="question">
              <a-input v-model="question" placeholder="按照用户的真实问法填写效果更佳" />
            </div>
            <div class="collapse">
              <a-collapse v-model="activeKey">
                <a-collapse-panel key="1" header="类似问法">
                  <a-icon type="plus" style="color:#40B1FF;padding-right: 5px" /><a>增加类似问法</a>
                </a-collapse-panel>
              </a-collapse>
            </div>
            <div class="collapse">
              <a-collapse v-model="activeKey">
                <a-collapse-panel key="2" header="关联问题">
                  <a-icon type="plus" style="color:#40B1FF;padding-right: 5px" /><a>增加关联问题</a>
                </a-collapse-panel>
              </a-collapse>
            </div>
            <div class="title">有效时间</div>
            <a-select :default-value="timeType" style="width: 120px;margin: 15px 0;" @change="timeTypeChange">
              <a-select-option :value="1">永久有效</a-select-option>
              <a-select-option :value="2">选择时间</a-select-option>
            </a-select>
            <br>
            <a-date-picker
              v-if="timeType == 2"
              v-model="startValue"
              :disabled-date="disabledStartDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="开始时间"
              @openChange="handleStartOpenChange"
            />
            <br>
            <a-date-picker
              style="margin-top: 5px;"
              v-if="timeType === 2"
              v-model="endValue"
              :disabled-date="disabledEndDate"
              show-time
              format="YYYY-MM-DD HH:mm:ss"
              placeholder="结束时间"
              :open="endOpen"
              @openChange="handleEndOpenChange"
            />
          </div>
        </a-col>
        <a-col :span="13">
          <div class="title">答案</div>
          <div class="right" />
        </a-col>
      </a-row>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
export default {
    data () {
      return {
        isShow: true,
        question: '',
        activeKey: ['1', '2'],
        timeType: 1,
        startValue: null,
        endValue: null,
        endOpen: false,
      }
    },
    methods: {
     handleCancel () {
        this.$emit('closeQa')
    },
     handleDraft () {
        this.$emit('closeQa')
    },
     handleOk () {
        console.log(moment(this.startValue).format('YYYY-MM-DD HH:mm:ss'), moment(this.endValue).format('YYYY-MM-DD HH:mm:ss'))
        this.$emit('closeQa')
    },
    timeTypeChange (value) {
        this.timeType = value
    },
     disabledStartDate (startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate (endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange (open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange (open) {
      this.endOpen = open
    },
},
}
</script>
<style>
.ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 8px 16px 8px 40px;
    color: #888;
}
</style>
<style lang="less" scoped>
.qa {
   .title {
       font-weight: bold;
       font-size: 15px;
   }
   .left {
       min-height: 60vh;
       border-right: 1px solid #e8e8e8;
       .question {
           margin: 15px 10px 20px 0;
       }
       .collapse {
           margin: 10px 10px 20px 0;
       }

   }

}
</style>
