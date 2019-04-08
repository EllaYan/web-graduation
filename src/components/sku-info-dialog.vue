<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible">
            <el-form label-position="right" label-width="100px">
                <el-form-item label="商品名">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品标题">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input type="textarea"></el-input>
                </el-form-item>

                <el-form-item label="价格">
                    <el-input type="number"></el-input>
                </el-form-item>
                <el-form-item label="厂商指导价">
                    <el-input type="number"></el-input>
                </el-form-item>

                <el-form-item label="缩略图">

                </el-form-item>

                <el-form-item label="图文详情">
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
// import tinymce from './Tinymce/index.vue'

export default {
    // components:{
    //     tinymce,
    // },
    props: {
        infoType: {},
        info:{
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    watch: {
        infoType: {
            handler(val) {
                this.title = val === 1 ? '添加商品' : '查看/编辑'
            },
            immediate: true,
        },
    },
    data() {
        return {
            dialogVisible: true,
            title: '',
            form: {},
        }
    }
}
</script>

<style lang="scss" scoped>

</style>


