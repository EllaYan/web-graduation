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
                label="未发货"
                name="2">
            </el-tab-pane>
            <el-tab-pane
                label="已发货"
                name="3">
            </el-tab-pane>
            <el-tab-pane
                label="已完结"
                name="4">
            </el-tab-pane>
        </el-tabs>
        <el-card class="card-box">
            <div v-loading="loading" element-loading-text="加载中">
                <el-table :data="tableData" :header-row-style="{color:'#333'}">
                    <el-table-column prop="orderNo" label="订单号" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="x" label="购买用户" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="xx" label="团长" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="yy" label="配送类型" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="xxx" label="收货地址" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="xxxx" label="商品" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="" label="操作" min-width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text">发货</el-button>
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
export default {
    data() {
        return {
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 2,
            },
            tabName:'1',
            loading:false,
            tableData: [
                {
                    orderNo: '0000001',
                    x: '李先生',
                    xx: '依琳洗衣店',
                    xxx: '',
                    xxxx: '大米【5Kg】x1',
                    yy: '自提'
                },
                {
                    orderNo: '0000002',
                    x: '宋女士',
                    xx: '依琳洗衣店',
                    xxx: '北京市朝阳区旭辉奥都1号楼1101室',
                    xxxx: '香蕉【1Kg】x1；苹果【2kg】x1',
                    yy: '送货上门'
                }
            ],
        }
    },
    methods: {
        handlePage() {},
    }
}
</script>

<style lang="scss" scoped>

</style>

