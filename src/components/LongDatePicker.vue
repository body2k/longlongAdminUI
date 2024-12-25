<!--日期管理只解决时间范围筛选-->
<template>
  <div id="LongDatePicker">

    <el-date-picker v-if="type.indexOf('range')>=0"
                    style="width: 350px"
                    v-model="valueRange"
                    :type="type"
                    :shortcuts="shortcuts"
                    :value-format="valueFormat"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    @change="datePickerRangeChange"
                    :clear="clear"

    />

    <el-date-picker v-else
                    style="width: 350px"
                    v-model="value"
                    :type="type"
                    :shortcuts="shortcuts"
                    :value-format="valueFormat"
                    placeholder="请输入时间"
                    @change="dateChange"
                    :clear="clear"

    />
  </div>
</template>
<script>
export default {
  props: {
    clear: {
      type: Boolean,
      default: false
    },
    //开始时间
    startTime: {
      type: String,
      default: ""
    },
    //结束时间
    endTime: {
      type: String,
      default: ""
    },
    //如果是当个时间（不是范围）
    modelValue: {
      type: String,
      default: ""
    },
    //类型
    type: {
      type: String,
      default: "datetimerange"
    },
    valueFormat: {
      type: String,
      default: "YYYY-MM-DD HH:mm:ss"
    }
  }, model: {
    prop: "startTime",
    event: "eventStartTime"
  },
  data() {
    return {
      valueRange: [],

      shortcuts: []
    }
  }, setup() {
    return {}
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    initLongDatePicker() {
      if (this.startTime) {
        this.valueRange.push(this.startTime)
      }
      if (this.endTime) {
        if (!this.startTime) {
          this.valueRange.push("")
        }
        this.valueRange.push(this.endTime)
      }
    }
  }, created() {
    //初始化
    if (this.startTime) {
      this.valueRange.push(this.startTime)
    }
    if (this.endTime) {
      if (!this.startTime) {
        this.valueRange.push("")
      }
      this.valueRange.push(this.endTime)
    }
  }, methods: {
    datePickerRangeChange(data) {

      if (data !== null && data.length > 0) {
        this.$emit('update:startTime', data[0])
        this.$emit('update:endTime', data[1])
      } else {
        this.$emit('update:startTime', null)
        this.$emit('update:endTime', null)
      }


    }, dateChange(data) {
    }
  }, watch: {
    startTime: {
      immediate: true,
      handler(newVal) {

        if (newVal != null) {
          if (this.valueRange != null && this.valueRange.length > 0) {
            this.valueRange[0] = newVal
          } else {
            this.valueRange = []
            this.valueRange.push(newVal)
          }
        }
      }
    }, endTime: {
      immediate: true,
      handler(newVal) {
        console.log(newVal)
        if (newVal != null) {
          this.valueRange[1] = newVal

        }

      }
    }
  }
}
</script>
<style>


</style>


