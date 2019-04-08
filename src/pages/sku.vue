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
                label="未上架"
                name="2">
            </el-tab-pane>
            <el-tab-pane
                label="已上架"
                name="3">
            </el-tab-pane>
        </el-tabs>

        <el-card class="card-box">
            <div v-loading="loading" element-loading-text="加载中">
                <el-table :data="tableData" :header-row-style="{color:'#333'}">
                    <el-table-column prop="y" label="商品名" min-width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="x" label="副标题" min-width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="xx" label="描述" min-width="120" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="yy" label="缩略图" min-width="120" align="center">
                        <template slot-scope="scope">
                            <img :src="scope.row.yy" alt="" class="imgs">
                        </template>
                    </el-table-column>
                    <el-table-column prop="xxx" label="价格" min-width="100" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="xxxx" label="厂商指导价" min-width="100" align="center" :show-overflow-tooltip="true"></el-table-column>
                    <el-table-column prop="" label="操作" min-width="200" align="center">
                        <template slot="header">
                            <el-button type="primary">
                                添加商品
                            </el-button>
                        </template>
                        <template slot-scope="scope">
                            <el-button type="text">查看/编辑</el-button>
                            <el-button type="text" v-if="scope.row.state === 1">上架</el-button>
                            <el-button type="text" v-if="scope.row.state === 2">下架</el-button>
                            <el-button type="text" style="color:red;">删除</el-button>
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
        <info :infoType="infoType"></info>
    </div>
</template>
<script>
import info from '../components/sku-info-dialog.vue'

export default {
    components: {
        info,
    },
    data() {
        return {
            infoType:2,// 1添加 2查看/编辑
            loading: false,
            tabName: '1',
            page: {
                currentPage: 1,
                pageSize: 15,
                total: 2,
            },
            tableData: [
                {
                    y:'【长粒米】方正大米',
                    yy: 'https://img.alicdn.com/imgextra/i4/3932298731/TB2RLxpsaAoBKNjSZSyXXaHAVXa_!!3932298731.jpg_430x430q90.jpg',
                    x: '贡米之乡的羊脂美玉，粒粒饱满，颗颗香甜',
                    xx: '贡米之乡的羊脂美玉，粒粒饱满，颗颗香甜',
                    xxx: '29.9',
                    xxxx: '50',
                    state:1,
                },
                {
                    y:'香蕉',
                    yy: 'https://gd3.alicdn.com/imgextra/i2/1643799515/O1CN01wGhhGD2K9v47EuGMI_!!1643799515.jpg',
                    x: '海南香蕉',
                    xx: '海南香蕉又大又甜',
                    xxx: '5.6',
                    xxxx: '9.9',
                    state:2,
                },
            ],
        }
    },
    methods:{
        handlePage() {},
    }
}
</script>

<style lang="scss" scoped>
.imgs{
    width:120px;
    height:90px;
    overflow: hidden;
}
</style>

