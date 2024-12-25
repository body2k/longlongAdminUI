<template>
  <div>
    <long-dialog v-model="value" width="800"
                 :title="saveOrUpdateVisible===1?'新增':saveOrUpdateVisible===2?'修改':'复制'"
    >

    </long-dialog>
  </div>
</template>
<script>

import {defineComponent} from "vue";
import LongDialog from "@/components/longDialog.vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Boolean,
      required: true,
      default: false
    },
    //1是新增2是修改
    saveOrUpdateVisible: {
      type: Number,
      default: 1
    }
  },
  components: {LongDialog},
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  }, data() {
    return {
      dialogVisible: true
    }
  }
})
</script>
<style scoped>

</style>