<template>
    <div>
        <el-tabs
            v-model="tabName"
            class="page-tabs">
            <el-tab-pane
                label="团长业绩"
                name="1">
            </el-tab-pane>
        </el-tabs>
        <el-card class="card-box">
            <el-row>
                <el-col :span="1" style="line-height:32px;">时间</el-col>
                <el-col :span="20">
                    <el-date-picker
                        v-model="timeVal"
                        type="month"
                        size="small"
                        placeholder="选择月"
                        @change="changeTime">
                    </el-date-picker>
                </el-col>
                <el-col :span="2">
                    <el-button type="primary" size="small" @click="onClickChangeTime()">确定</el-button>
                </el-col>
            </el-row>
        </el-card>

        <el-card class="card-box">
             <div v-loading="loading" element-loading-text="加载中">
                <el-table :data="tableData" :header-row-style="{color:'#333'}">
                    <el-table-column prop="realName" label="真实姓名" min-width="140" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="phone" label="联系方式" min-width="140" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="地址" min-width="220" align="center" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="countCommission" label="该月佣金" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="commission" label="累计佣金" min-width="120" align="center"></el-table-column>
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
import { formatDate,listRegimentalCommission } from '../api/index.js'
export default {
    data() {
        return {
            tabName: '1',
            timeVal: '2019-04',
            tableData: [],
            loading: false,
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 0,
            },

        }
    },
    methods: {
        changeTime(val){
            var dateArr = formatDate(val).split("-")
            this.timeVal = dateArr[0]+'-'+dateArr[1];
        },
        onClickChangeTime(){
            this.toListRegimentalCommission()
        },
        toListRegimentalCommission(){
            listRegimentalCommission({
                date: this.timeVal,
                page: this.page.currentPage,
                pageSize: this.page.pageSize
            }).then(res => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
            })
        },
        handlePage() {
            this.toListRegimentalCommission()
        }
    },
    created() {
        var dateArr = formatDate(new Date()).split("-")
        this.timeVal = dateArr[0]+'-'+dateArr[1];
        this.toListRegimentalCommission()
    }
}
</script>

<style lang="scss" scoped>

</style>

