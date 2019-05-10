<template>
    <div>
        <el-tabs
            v-model="tabName"
            class="page-tabs">
            <el-tab-pane
                label="系统管理员"
                name="1">
            </el-tab-pane>
        </el-tabs>
        <div class="admain-list">
            <el-card v-for=" (item, index) in admainList" :key="item.id" class="admain-info">
                <div class="header">
                    <div class="name">{{item.name}}</div>
                    <div class="edit" v-if="index === 0">
                        <el-button type="text" @click="showUpdateAdmin">修改信息</el-button>
                    </div>
                </div>
                <p>{{item.phone}}</p>
                <p>创建时间： {{item.createData | formatDate}}</p>
            </el-card>

            <div class="add" @click="showAddAdmin">
                +
            </div>
        </div>
        
        <el-dialog title="修改个人信息" :visible.sync="editVisible" width="40%">

            <el-form size="small" label-width="70px" class="info-form" :model="adminInfo" ref="editForm" :rules="editFormRules">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="adminInfo.name"></el-input>
                </el-form-item>

                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="adminInfo.phone"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="adminInfo.password" type="password"></el-input>
                </el-form-item>

                <el-form-item label="验证码" prop="checkCode">
                    <el-input v-model="adminInfo.checkCode"></el-input>
                    <el-button type="primary" id="get-code" @click="toSendAdminCheckCode">获取验证码</el-button>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="closeEdit" size="small">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdmin" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加管理员" :visible.sync="addVisible" width="40%">

            <el-form :model="addAdmainInfo" class="info-form" size="small" label-width="150px" ref="addForm" :rules="addFormRule">
                <el-form-item label="用户名  " prop="name">
                    <el-input v-model="addAdmainInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="手机号  " prop="phone">
                    <el-input v-model="addAdmainInfo.phone"></el-input>
                </el-form-item>
                <el-form-item label="初始密码" prop="password">
                    <el-input v-model="addAdmainInfo.password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="closeAdd" size="small">取 消</el-button>
                <el-button type="primary" @click="toAddAdmin" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { listAdmin,formatDate,addAdmin,sendAdminCheckCode,updateAdmin } from '../api/index.js'

export default {
    data() {
        return {
            tabName: '1',
            loading: false,
            editVisible: false,
            addVisible: false,
            adminInfo: {
                name: '',
                phone: '',
                password:'',
                checkCode: '',
            },
            addAdmainInfo: {
                name: '',
                phone: '',
                password:'',
            },
            me:{},
            admainList: [],
            addFormRule: {
                name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
                password: [{ required: true, message: '请输入初始密码', trigger: 'change' }],
            },
            editFormRules:{
                name: [{ required: true, message: '请输入用户名', trigger: 'change' }],
                phone: [{ required: true, message: '请输入手机号', trigger: 'change' }],
                checkCode: [{ required: true, message: '请输入验证码', trigger: 'change' }],
            },
        }
    },
    methods: {
        closeEdit() {
            this.$refs['editForm'].resetFields()
            this.editVisible = false
        },
        closeAdd() {
            this.$refs['addForm'].resetFields()
            this.addVisible = false
        },
        getAdminList() {
            listAdmin().then((res) => {
                this.admainList = res.data
                this.me = res.data[0]
            })
        },
        showAddAdmin() {
            this.addAdmainInfo.name = '',
            this.addAdmainInfo.phone = '',
            this.addAdmainInfo.password ='',
            this.addVisible = true
        },
        toAddAdmin() {
            this.$refs['addForm'].validate((validate) => {
                if(validate) {
                    addAdmin({
                        name: this.addAdmainInfo.name,
                        phone: this.addAdmainInfo.phone,
                        password: this.addAdmainInfo.password
                    }).then(() => {
                        this.$refs['addForm'].resetFields()
                        this.addVisible = false
                        this.getAdminList()
                    })
                }
            })
        },
        showUpdateAdmin() {
            this.adminInfo.checkCode = ''
            this.adminInfo.password = ''
            this.adminInfo.name = this.me.name
            this.adminInfo.phone = this.me.phone
            this.editVisible = true
        },
        toSendAdminCheckCode() {
            if (!this.adminInfo.phone) {
                this.$message.error('请输入手机号')
                return
            }
            sendAdminCheckCode().then(() => {
                this.$notify({
                    message: '验证码发送成功',
                    type: 'success'
                })
            })
        },
        toUpdateAdmin(){
            this.$refs['editForm'].validate((validate) => {
                if(validate) {
                     updateAdmin({
                        name: this.adminInfo.name,
                        phone: this.adminInfo.phone,
                        password: this.adminInfo.password,
                        checkCode: this.adminInfo.checkCode
                    }).then(() => {
                        this.editVisible = false
                        this.getAdminList()
                    })
                }
            }) 
        }
    },
    filters: {
        formatDate(time) {
            return formatDate(time);
        }
    },
    created() {
        this.getAdminList()
    }
}
</script>

<style lang="scss" scoped>
.admain-list {
  display: flex;
  flex-wrap: wrap;
  .add {
    width: 360px;
    height: 167px;
    text-align: center;
    line-height: 167px;
    background-color: #fff;
    margin: 30px 0 0 30px;
    font-size: 80px;
    color: #ccc;
    cursor: pointer;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    border: 1px solid #ebeef5;
  }
  .admain-info {
    margin: 30px 0 0 30px;
    width: 360px;
    .header {
      display: flex;
      justify-content: space-between;
      .name {
        width: 240px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 28px;
        font-weight: 500;
      }
    }
  }
  .info-form {
    #get-code {
      margin: 20px;
    }
  }
}
</style>


<style>
.info-form .el-input {
  width: 50%;
}
#get-code {
  margin-left: 20px;
}
</style>

