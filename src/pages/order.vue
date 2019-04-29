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
                label="待支付"
                name="2">
            </el-tab-pane>
            <el-tab-pane
                label="待发货"
                name="3">
            </el-tab-pane>
            <el-tab-pane
                label="运输中"
                name="4">
            </el-tab-pane>
            <el-tab-pane
                label="已签收"
                name="5">
            </el-tab-pane>
        </el-tabs>
        <el-card class="card-box">
            <div v-loading="loading" element-loading-text="加载中">
                <el-table :data="tableData" :header-row-style="{color:'#333'}">
                    <el-table-column prop="orderGroup.orderNo" label="订单号" min-width="200" align="center"></el-table-column>
                    <el-table-column prop="user.nickName" label="买家昵称" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="regimentalInfo.realName" label="团长" min-width="120" align="center"></el-table-column>
                    <el-table-column :formatter="formatDate" label="下单日期" min-width="180" align="center"></el-table-column>
                    <el-table-column :formatter="formatLogisticsType" label="配送类型" min-width="120" align="center"></el-table-column>
                    <el-table-column :formatter="formatAddress" label="收货地址" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="orderGroup.countAmount" label="商品件数" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="orderGroup.countPrice" label="订单总价" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="orderGroup.realPrice" label="实际支付" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="" label="当前状态" min-width="200" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.orderGroup.logisticsStatus === -1">待支付</span>
                            <span v-if="scope.row.orderGroup.logisticsStatus === 0">待发货</span>
                            <span v-if="scope.row.orderGroup.logisticsStatus === 1 || scope.row.orderGroup.logisticsStatus === 2 || scope.row.orderGroup.logisticsStatus === 3 || scope.row.orderGroup.logisticsStatus === 4">运输中</span>
                            <span v-if="scope.row.orderGroup.logisticsStatus === 5">已签收</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" min-width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" >查看详情</el-button>&nbsp;&nbsp;
                            <el-button type="text" @click="toUpdateOrder(scope.row)" v-if="scope.row.orderGroup.logisticsStatus === 0">发货</el-button>
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
import { formatDate,listOrder,updateOrder } from '../api/index.js'

export default {
    watch: {
        tabName: {
            handler(val) {
                if(val === '1') {
                    this.logisticsStatus = 1
                } else if (val === '2') {
                    this.logisticsStatus = 2
                } else if (val === '3') {
                    this.logisticsStatus = 3
                }else if (val === '4') {
                    this.logisticsStatus = 4
                }else if (val === '5') {
                    this.logisticsStatus = 5
                }
                this.page.currentPage = 1
                this.toListOrder()
            },
            immediate: true
        },
    },
    data() {
        return {
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 0,
            },
            tabName:'1',
            logisticsStatus: 1,
            loading:false,
            tableData: [],
        }
    },
    methods: {
        toListOrder(){
            listOrder({
                logisticsStatus: this.logisticsStatus,
                page: this.page.currentPage,
                pageSize: this.page.pageSize
            }).then(res => {
                this.tableData = res.data.content
                this.page.total = res.data.totalElements
            })
        },
        toUpdateOrder(row){
            updateOrder({
                orderGroupId: row.orderGroup.id
            }).then(res => {
                this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    })
                this.toListOrder()
            })
        },
        formatLogisticsType(row,column){
            return row.orderGroup.logisticsType===0 ? '送货上门' : '自提'
        },
        formatAddress(row,column){
            return row.orderGroup.receiveAddress.split('address=')[1].split(',')[0]
        },
        formatDate(row, column){
            return formatDate(row.orderGroup.createData)
        },
        handlePage() {
            this.toListOrder();
        },
    },
    created() {
        this.toListOrder()
    }
}
</script>

<style lang="scss" scoped>

</style>

