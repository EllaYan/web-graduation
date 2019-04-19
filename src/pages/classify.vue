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
                <el-table-column prop="categoryName" label="名称"  align="center"></el-table-column>
                <el-table-column prop="" label="操作"  align="center">
                    <template slot="header">
                        <el-button type="primary" @click="visible=true; title='添加分类'">
                            添加分类
                        </el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button type="text" @click="toUpdate(scope.row)">编辑</el-button>
                        <el-button type="text" @click="toDel(scope.row)">删除</el-button>
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
import { addCategory, listCategory, delCategory, updateCategory } from '../api/index.js'

export default {
    data() {
        return {
            name: '',
            id:'',
            title:'添加分类',
            tabName: '1',
            tableData: [],
            visible: false,
        }
    },
    methods: {
        toSubmit() {
            if(this.title === '添加分类') {
                addCategory({categoryName: this.name}).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    })
                    this.visible = false
                    this.getCategoryList()
                })
            } else {
                updateCategory({categoryName: this.name, categoryId: this.id }).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    })
                    this.visible = false
                    this.getCategoryList()
                })
            }
        },
        getCategoryList() {
            listCategory().then((res) => {
                this.tableData = res.data
            })
        },
        toDel(row) {
             this.$confirm('确认删除此分类吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                delCategory({ categoryId: row.id }).then(() => {
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getCategoryList()
                })
            })
        },
        toUpdate(row) {
            this.title = '编辑'
            this.visible = true
            this.id = row.id
            this.name = row.categoryName
        },
    },
    created() {
        this.getCategoryList()
    }
}
</script>

<style lang="scss" scoped>

</style>


