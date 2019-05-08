<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :before-close="close"
    >
      <el-form
        label-position="right"
        label-width="100px"
        :model="form"
        ref="skuForm"
        :rules="formRule"
      >
        <el-form-item label="商品名" prop="skuName">
          <el-input v-model="form.skuName"></el-input>
        </el-form-item>
        <el-form-item label="商品标题" prop="subtitle">
          <el-input v-model="form.subtitle"></el-input>
        </el-form-item>
        <el-form-item label="商品描述" prop="des">
          <el-input
            type="textarea"
            v-model="form.des"
          ></el-input>
        </el-form-item>

        <el-form-item label="价格" prop="discountPrice">
          <el-input
            type="number"
            v-model="form.discountPrice"
          ></el-input>
        </el-form-item>
        <el-form-item label="厂商指导价" prop="price">
          <el-input
            type="number"
            v-model="form.price"
          ></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="amount">
          <el-input
            type="number"
            v-model="form.amount"
          ></el-input>
        </el-form-item>

        <el-form-item label="缩略图" prop="thumbnail">
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

        <el-form-item label="分类" prop="categoryId">
          <el-select
            v-model="form.categoryId"
            placeholder="请选择"
          >
            <el-option
              v-for="item in categoryList"
              :key="item.id"
              :label="item.categoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否上架" prop="isShow">
          <el-switch
            v-model="form.isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>

        <el-form-item label="图片详情">
          <el-upload
            ref="uploadPanel"
            class="upload-demo"
            :action="qiniuUpload"
            :data="uploadData"
            :on-change="handleChangeDetail"
            :on-success="handleSuccessDetail"
            :on-remove="handleRemoveDetail"
            :before-upload="beforeUpload"
            list-type="picture"
            :file-list="fileList2"
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
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submit"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { getToken, listCategory, addSku, updateSku } from "../api/index.js";
// import tinymce from './Tinymce/index.vue'

export default {
  // components:{
  //     tinymce,
  // },
  props: {
    infoType: {
      type: Number,
      default: 1,
    },
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
    },
    info: {
      handler(val) {
        this.fileList = []
        this.fileList2 = []
        if(this.infoType === 2) {
          this.form = {...val}
          // 处理上架开关
          this.form.isShow = !!val.isShow
          // 处理缩略图
          let obj = {
            name: '',
            url: val.thumbnail
          }
          this.fileList.push(obj)
          // 处理图片详情
          if(val.richText) {
            let urls = val.richText.split('@#')
            urls.forEach((e) => {
              let obj = {
                name: '',
                url: e
              }
              this.fileList2.push(obj)
            })
          }
        }
      },
      immediate:true,
      deep:true
    },
  },
  data() {
    return {
      qiniuUpload: "https://upload.qiniup.com",
      qiniuUrl: "http://img.shequgo.shop/",
      uploadData: {
        token: ""
      },
      fileList: [],
      fileList2: [],
      dialogVisible: false,
      title: "",
      categoryList: [],
      formRule: {
        skuName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        des: [{ required: true, message: '请输入商品描述', trigger: 'blur' }],
        subtitle: [{ required: true, message: '请输入商品标题', trigger: 'blur' }],
        categoryId: [{ required: true, message: '请选择商品分类', trigger: 'blur', type: 'number' }],
        price: [{ required: true, message: '请输入商品指导价', trigger: 'blur',}],
        discountPrice: [{ required: true, message: '请输入商品价格', trigger: 'blur',}],
        amount: [{ required: true, message: '请输入商品数量', trigger: 'blur'}],
        thumbnail: [{ required: true, message: '请上传商品图片', trigger: 'blur' }],
      },
      form: {
        categoryId: "",
        skuName: "",
        des: "",
        subtitle: "",
        thumbnail: "",
        richText: "",
        price: "",
        discountPrice: "",
        amount: "",
        isShow: 0
      }
    };
  },
  methods: {
    close() {
      this.dialogVisible = false
      this.reset()
    },
    reset() {
      this.form = {
        categoryId: "",
        skuName: "",
        des: "",
        subtitle: "",
        thumbnail: "",
        richText: "",
        price: "",
        discountPrice: "",
        amount: "",
        isShow: 0
      }
      this.fileList = []
      this.fileList2 = []
      this.uploadData.token = ''
      // this.dialogVisible = false
    },
    submit() {
      if(this.infoType === 1) {
        this.toAdd()
      } else {
        this.toUpdate()
      }
      this.dialogVisible = false
    },
    toUpdate() {
      let param = this.form
      param.skuId =  this.info.id
      param.isShow = this.form.isShow ? 1 : 0
      let detailList = []
      this.fileList2.forEach(e => {
        let url = this.qiniuUrl + e.response.key
        detailList.push(url)
      })
      let richText = detailList.join('@#')
      param.richText = richText
      this.$refs.skuForm.validate((validate) => {
        if(validate) {
          updateSku(param).then(() => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            })
            this.reset()
            this.$emit('getList')
          });
        }
      })
    },
    toAdd() {
      let param = this.form
      let detailList = []
      this.fileList2.forEach(e => {
        let url = this.qiniuUrl + e.response.key
        detailList.push(url)
      })
      let richText = detailList.join('@#')
      param.richText = richText
      param.isShow = this.form.isShow ? 1 : 0
      window.console.log('param', param)
      this.$refs.skuForm.validate((validate) => {
        if(validate) {
          addSku(param).then(() => {
            this.$notify({
              title: '成功',
              message: '添加成功',
              type: 'success'
            })
            this.reset()
            this.$emit('getList')
          });
        }
      })
    },
    getCategoryList() {
      listCategory().then((res) => {
        this.categoryList = res.data
      })
    },
    handleChange(file, fileList) {
      if (this.beforeUpload(file)) {
        this.fileList = fileList.slice(-1);
      }
    },
    handleSuccess(res) {
      this.form.thumbnail = this.qiniuUrl + res.key;
    },
    handleRemove() {
      this.form.thumbnail = ''
    },

    handleChangeDetail(file, fileList) {
      this.fileList2 = fileList;
    },
    handleSuccessDetail() {
    },
    handleRemoveDetail(a,b) {
      this.fileList2 = b
      window.console.log('a',a)
      window.console.log('b',b)
      window.console.log('c',this.fileList2)
    },


    beforeUpload(file) {
      if (file.size > 524288) {
        this.$message({
          message: "图片大小不能超过500kb！",
          type: "warning"
        });
        return false;
      }
      const _self = this;
      return new Promise((resolve, reject) => {
        getToken()
          .then(res => {
            const token = res.data;
            _self._data.uploadData.token = token;
            resolve(true);
          })
          .catch(() => {
            reject(false);
          });
      });
    }
  },
  created() {
    this.getCategoryList()
  }
};
</script>

<style lang="scss" scoped>
</style>


