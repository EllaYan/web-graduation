<template>
  <div>
    <el-tabs
      v-model="tabName"
      class="page-tabs"
    >
      <el-tab-pane
        label="全部"
        name="1"
      >
      </el-tab-pane>
      <el-tab-pane
        label="未上架"
        name="2"
      >
      </el-tab-pane>
      <el-tab-pane
        label="已上架"
        name="3"
      >
      </el-tab-pane>
    </el-tabs>

    <el-card class="card-box">
      <div
        v-loading="loading"
        element-loading-text="加载中"
      >
        <el-table
          :data="tableData"
          :header-row-style="{color:'#333'}"
        >
          <el-table-column
            prop="skuName"
            label="商品名"
            min-width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="subtitle"
            label="副标题"
            min-width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="des"
            label="描述"
            min-width="120"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="thumbnail"
            label="缩略图"
            min-width="120"
            align="center"
          >
            <template slot-scope="scope">
              <img
                :src="scope.row.thumbnail"
                alt=""
                class="imgs"
              >
            </template>
          </el-table-column>
          <el-table-column
            prop="discountPrice"
            label="价格"
            min-width="100"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="price"
            label="厂商指导价"
            min-width="100"
            align="center"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop=""
            label="操作"
            min-width="200"
            align="center"
          >
            <template slot="header">
              <el-button
                type="primary"
                @click="addSku"
              >
                添加商品
              </el-button>
            </template>
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="toUpdate(scope.row)"
              >查看/编辑</el-button>
              <el-button
                type="text"
                v-if="!scope.row.isShow"
                @click="changeIsShow(scope.row,1)"
              >上架</el-button>
              <el-button
                type="text"
                v-if="scope.row.isShow"
                @click="changeIsShow(scope.row,0)"
              >下架</el-button>
              <el-button
                type="text"
                style="color:red;"
                @click="toDelete(scope.row.id)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          layout="total,prev,pager,next"
          :page-size="page.pageSize"
          :pager-count="11"
          :current-page.sync="page.currentPage"
          :total="page.total"
          @current-change="handlePage"
        >
        </el-pagination>
      </div>
    </el-card>
    <info
      :infoType="infoType"
      :info="skuInfo"
      @getList="reGetSkuList"
      ref="skuDialog"
    ></info>
  </div>
</template>
<script>
import info from '../components/sku-info-dialog.vue'
import { listSku,deleteSku, updateSku } from '../api/index.js'

export default {
    components: {
        info,
    },
    watch: {
        tabName: {
            handler(val) {
                if(val === '1') {
                    this.getListParam.isShow = ''
                } else if (val === '2') {
                    this.getListParam.isShow = 0
                } else {
                    this.getListParam.isShow = 1
                }
                this.page.currentPage = 1
                this.getSkuList()
            },
            immediate: true
        },
    },
    data() {
        return {
            infoType:1,// 1添加 2查看/编辑
            loading: false,
            tabName: '1',
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 2,
            },
            getListParam: {
                categoryId:'',
                isShow: '',
            },
            tableData: [],
            skuInfo: {},
        }
    },
    methods:{
        changeIsShow(row, type) {
            let param = {...row}
            param.isShow = type
            param.skuId = row.id
            let notice = type === 1? '该商品已上架' : '该商品已下架'
            updateSku(param).then(() => {
                this.$notify({
                    title: '成功',
                    message: notice,
                    type: 'success'
                })
                this.reGetSkuList();
            })
        },
        toUpdate(row) {
            this.skuInfo = row
            this.infoType = 2
            this.$refs.skuDialog.dialogVisible = true
        },
        toDelete(id) {
             this.$confirm('是否删除该商品?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() =>{
                deleteSku(id).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                })
                this.reGetSkuList();
            }).catch(() => {});
        
        },
        reGetSkuList() {
            this.page.currentPage = 1
            this.getSkuList()
        },
        addSku() {
            this.infoType = 1
            this.$refs.skuDialog.dialogVisible = true
            this.$refs.skuDialog.reset()
            this.skuInfo = {}
        },
        handlePage() {
            this.getSkuList()
        },
        getSkuList() {
            this.loading = true
            let param = {...this.getListParam}
            param.page = this.page.currentPage
            param.pageSize = this.page.pageSize
            listSku(param).then((res) => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
                this.loading = false
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.imgs {
  width: 120px;
  height: 90px;
  overflow: hidden;
}
</style>

