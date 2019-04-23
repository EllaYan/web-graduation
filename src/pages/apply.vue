<template>
    <div>
        <el-tabs
            v-model="tabName"
            class="page-tabs">
            <el-tab-pane
                label="全部"
                name="1">
            </el-tab-pane>
            <el-tab-pane
                label="未审核"
                name="2">
            </el-tab-pane>
            <el-tab-pane
                label="已通过"
                name="3">
            </el-tab-pane>
            <el-tab-pane
                label="已驳回"
                name="4">
            </el-tab-pane>
        </el-tabs>
        <el-card class="card-box">
            <div v-loading="loading" element-loading-text="加载中">
                <el-table :data="tableData" :header-row-style="{color:'#333'}">
                    <el-table-column prop="realName" label="姓名" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="address" label="地址" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="createData" :formatter="formatDate" label="申请日期" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="" label="操作" min-width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="toUpdateRegimentalInfo(scope.row,1)" v-if="scope.row.status === 0">通过</el-button>
                            <el-button type="text" @click="toUpdateRegimentalInfo(scope.row,2)" style="color:red;" v-if="scope.row.status === 0">驳回</el-button>
                            <span v-if="scope.row.status === 1">已通过</span>
                            <span v-if="scope.row.status === 2">已通过</span>
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
                    @current-change="handlePage">
                </el-pagination>
            </div>
        </el-card>
    </div>
</template>
<script>
import { listRegimentalInfo,formatDate,updateRegimentalInfo } from '../api/index.js'
export default {
    watch: {
        tabName: {
            handler(val) {
                if(val === '1') {
                    this.status = ''
                } else if (val === '2') {
                    this.status = 0
                } else if (val === '3') {
                    this.status = 1
                }else if (val === '4') {
                    this.status = 2
                }
                this.page.currentPage = 1
                this.toListRegimentalInfo()
            },
            immediate: true
        },
    },
    data() {
        return {
            loading: false,
            status: '',
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 0,
            },
            tableData: [],
            tabName: '1',
        }
    },
    methods: {
        toListRegimentalInfo() {
            listRegimentalInfo({
                status: this.status,
                page: this.page.currentPage,
                pageSize: this.page.pageSize
            }).then((res) => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
            })
        },
        toUpdateRegimentalInfo(row,isPass) {
            updateRegimentalInfo({
                regimentalInfoId: row.id,
                status: isPass
            }).then(() => {
                this.toListRegimentalInfo()
            })
        },
        formatDate(row, column){
            return formatDate(row.createData)
        },
        handlePage() {
            this.toListRegimentalInfo()
        },
    },
    created() {
        this.toListRegimentalInfo()
    }
}
</script>

<style lang="scss" scoped>

</style>

