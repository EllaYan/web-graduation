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
                    <el-table-column prop="name" label="姓名" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="phone" label="手机号" min-width="120" align="center"></el-table-column>
                    <el-table-column prop="addr" label="地址" min-width="160" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="" label="操作" min-width="200" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" v-if="scope.row.state === 1">通过</el-button>
                            <el-button type="text" style="color:red;" v-if="scope.row.state === 1">驳回</el-button>
                            <span v-if="scope.row.state === 2">已通过</span>
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
            loading: false,
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 2,
            },
            tableData: [
                {
                    name: '王女士',
                    phone: '13425678906',
                    addr: '北京市海淀区西二旗八维研修学院餐厅地下一层饮品店',
                    state:1
                },
                {
                    name: '古先生',
                    phone: '13625978946',
                    addr: '北京市朝阳区高家园小区二号楼一单元403室',
                    state:2
                }
            ],
            tabName: '1',
        }
    },
    methods: {
        handlePage() {},
    }
}
</script>

<style lang="scss" scoped>

</style>

