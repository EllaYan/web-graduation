<template>
    <div>
        <el-tabs
            v-model="tabName"
            class="page-tabs">
            <el-tab-pane
                label="分类管理"
                name="1">
            </el-tab-pane>
        </el-tabs>
        <el-card class="card-box">
            <el-table :data="tableData" :header-row-style="{color:'#333'}">
                <el-table-column type="index"></el-table-column>
                <el-table-column prop="name" label="名称"  align="center"></el-table-column>
                <el-table-column prop="" label="操作"  align="center">
                    <template slot="header">
                        <el-button type="primary" @click="visible=true">
                            添加分类
                        </el-button>
                    </template>
                    <template>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog :title="title" :visible.sync="visible" width="40%">
            <el-form>
                <el-form-item label="分类名">
                    <el-input v-model="name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="toSubmit" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: '',
            id:'',
            title:'添加分类',
            tabName: '1',
            tableData: [],
            visible: true,
        }
    },
    methods: {
        toSubmit() {},
    }
}
</script>

<style lang="scss" scoped>

</style>


