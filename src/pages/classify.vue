<template>
    <div>
        <el-card class="card-box">
            <el-table :data="tableData" :header-row-style="{color:'#333'}">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="名称"  align="center"></el-table-column>
                <el-table-column prop="" label="操作"  align="center">
                    <template slot="header">
                        <el-button type="primary">
                            添加分类
                        </el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: '水果',
                },
                {
                    name: '蔬菜',
                },
                {
                    name: '日用品',
                }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


