<style src="@wangeditor/editor/dist/css/style.css"></style>
<!--富文本  -->
<template>

  <div style="border: 1px solid black" :class="disabled?'editorDiv':''">
    <Toolbar
        id="Toolbar"
        style="border-bottom: 1px solid black"
        :editor="editor"
        ref="toolbar"
        :defaultConfig="toolbarConfig"
        :mode="mode"
    />
    <Editor
        id="Editor"
        :disabled="true"
        :style="editorStyle"
        v-model="value"
        ref="editor"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="onCreated"

    />
  </div>
  <div :class="disabled?'cover':''">
  </div>
</template>
<script>

import {defineComponent, shallowRef} from "vue";
import {Editor, Toolbar} from "@wangeditor/editor-for-vue";
import {getToken} from "@/util/auth";
import {Base64} from "js-base64";
import {ElMessage} from "element-plus";

export default {
  components: {Editor, Toolbar},
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    editorStyle: {
      type: Object,
      default: {
        'height': '500px', 'overflow-y': 'hidden'
      }
    },
    modelValue: {
      type: String,
      required: true,
      default: ""
    },
  }, emits: ['update:value'],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  data() {
    return {
      progress: 0,
      editor: null,
      html: '<p>hello</p>',
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          // 图片上传
          uploadImage: {
            server: '/api/uploads/upload',
            fieldName: 'file',
            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 10 * 1024 * 1024, // 10M
            // 最多可上传几个文件，默认为 100
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['image/*'],
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,
            // 自定义增加 http  header
            headers: {
              Authorization: 'Basic ' + Base64.encode('ha_web:ha_web_secret'),
              'cloud-auth': 'bearer ' + getToken()
              // Accept: 'text/x-json',
              // otherKey: 'xxx'
            },
            withCredentials: false,// 跨域是否传递 cookie ，默认为 false
            timeout: 10 * 1000, // 超时时间，默认为 10 秒
            // 上传前
            onBeforeUpload(files) {
              ElMessage({
                message: '图片正在上传中,请耐心等待',
                duration: 0,
                customClass: 'uploadTip',
                iconClass: 'el-icon-loading',
                showClose: true
              });
              return files;
            },
            // 自定义插入图片
            customInsert(res, insertFn) {
              // 因为自定义插入导致onSuccess与onFailed回调函数不起作用,自己手动处理
              // 先关闭等待的Message
              ElMessage.closeAll();
              if (res.code === 200) {
                ElMessage.success({
                  message: '上传成功'
                });
              } else {
                ElMessage.error({
                  message: res.msg
                });
              }
              insertFn(res.data.fileUrl, res.data.fileUrl, res.data.fileUrl);
            },
            // 单个文件上传成功之后
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res);
            },
            // 单个文件上传失败
            onFailed(file, res) {
              console.log(`${file.name} 上传失败`, res);
            },
            // 上传进度的回调函数
            onProgress(progress) {
              console.log('progress', progress);
              // progress 是 0-100 的数字
            },
            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res);
            }
          },
          //视频上传
          uploadVideo: {
            fieldName: 'file',
            server: '/api/uploads/upload',
            // 单个文件的最大体积限制，默认为 10M
            maxFileSize: 200 * 1024 * 1024, // 200
            // 最多可上传几个文件，默认为 5
            maxNumberOfFiles: 10,
            // 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
            allowedFileTypes: ['video/*'],
            // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
            meta: {
              // token: 'xxx',
              // otherKey: 'yyy'
            },
            // 将 meta 拼接到 url 参数中，默认 false
            metaWithUrl: false,
            // 自定义增加 http  header
            headers: {
              Authorization: 'Basic ' + Base64.encode('ha_web:ha_web_secret'),
              'cloud-auth': 'bearer ' + getToken()
              // Accept: 'text/x-json',
              // otherKey: 'xxx'
            },
            // 跨域是否传递 cookie ，默认为 false
            withCredentials: false,
            // 超时时间，默认为 30 秒
            timeout: 1000 * 1000, // 1000 秒,
            // 上传之前触发
            onBeforeUpload(file) {
              ElMessage({
                message: '视频正在上传中,请耐心等待',
                duration: 0,
                customClass: 'uploadTip',
                iconClass: 'el-icon-loading',
                showClose: true
              });
              return file;
            },
            // 自定义插入视频
            customInsert(res, insertFn) {
              // 因为自定义插入导致onSuccess与onFailed回调函数不起作用,自己手动处理
              // 先关闭等待的Message
              ElMessage.closeAll();
              if (res.code === 200) {
                ElMessage.success({
                  message: `上传成功`
                });
              } else {
                ElMessage.error({
                  message: `上传失败，请重新尝试`
                });
              }
              insertFn(res.data.fileUrl, res.data.fileUrl);
            },
            // 上传进度的回调函数
            onProgress(progress) {
              console.log(progress);
              // onProgress(progress) {       // JS 语法
              // progress 是 0-100 的数字
            },

            // // 单个文件上传成功之后
            // onSuccess(file, res) {
            //   console.log(`${file.name} 上传成功`, res);
            //   this.successMsg(file);
            // },

            // // 单个文件上传失败
            // onFailed(file, res) {
            //   console.log(`${file.name} 上传失败`, res);
            //   this.errorMsg(file);
            // },

            // 上传错误，或者触发 timeout 超时
            onError(file, err, res) {
              console.log(`上传出错`, err, res);
              Notification.error({
                title: '错误',
                message: `上传失败，请重新尝试`
              });
            }
          }
        }

      },
      mode: 'default', // or 'simple'
    }
  }, mounted() {

    // this.editor=shallowRef()
    // shallowRef().disable()
    // console.log()
    // console.log(shallowRef())
    // console.log(    this.$refs.editor
    // )
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy()
  }, methods: {

    onCreated(editor) {
      if (this.disabled) {
        editor.disable()
      } else {
        editor.enable()
      }
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错

    },
  }, watch: {}, created() {

  }
}
</script>
<style scoped>
.editorDiv {
  cursor: not-allowed;
}

.cover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(245, 250, 249, 0.4);
  pointer-events: none;
}
</style>