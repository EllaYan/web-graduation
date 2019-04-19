<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
    >
      <el-form
        label-position="right"
        label-width="100px"
      >
        <el-form-item label="商品名">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="价格">
          <el-input type="number"></el-input>
        </el-form-item>
        <el-form-item label="厂商指导价">
          <el-input type="number"></el-input>
        </el-form-item>

        <el-form-item label="缩略图">
          <el-upload
            ref="uploadPanel"
            class="upload-demo"
            :action="qiniuUpload"
            :data="uploadData"
            :on-change="handleChange"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            list-type="picture"
            :file-list="fileList"
          >
            <el-button
              size="small"
              type="primary"
            >点击上传</el-button>
            <div
              slot="tip"
              class="el-upload__tip"
            >只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

        <el-form-item label="图文详情">
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// import tinymce from './Tinymce/index.vue'

export default {
  // components:{
  //     tinymce,
  // },
  props: {
    infoType: {},
    info: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    infoType: {
      handler(val) {
        this.title = val === 1 ? "添加商品" : "查看/编辑";
      },
      immediate: true
    }
  },
  data() {
    return {
      qiniuUpload: "http://upload.qiniup.com",
      qiniuUrl: "http://img.shequgo.shop/",
      uploadData:{},
      fileList: [],
      dialogVisible: true,
      title: "",
      form: {}
    };
  },
  methods: {
      handleChange() {},
      handleSuccess() {},
      handleRemove() {},
      beforeUpload() {},
  },
};
</script>

<style lang="scss" scoped>
</style>


