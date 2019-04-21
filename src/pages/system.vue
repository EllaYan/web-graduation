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

            <el-form size="small" label-width="70px" class="info-form" v-model="adminInfo">
                <el-form-item label="用户名">
                    <el-input v-model="name"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="phone"></el-input>
                </el-form-item>

                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>

                <el-form-item label="验证码">
                    <el-input v-model="checkCode"></el-input>
                    <el-button type="primary" id="get-code" @click="toSendAdminCheckCode">获取验证码</el-button>
                </el-form-item>

            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="toUpdateAdmin" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="添加管理员" :visible.sync="addVisible" width="40%">

            <el-form v-model="addAdmainInfo" class="info-form" size="small" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="name"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input v-model="phone"></el-input>
                </el-form-item>
                <el-form-item label="初始密码">
                    <el-input v-model="password" type="password"></el-input>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="toAddAdmin" size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { listAdmin,formatDate,addAdmin,sendAdminCheckCode, sendLoginCheckCode,updateAdmin, updateCategory } from '../api/index.js'

export default {
    data() {
        return {
            tabName: '1',
            loading: false,
            editVisible: false,
            addVisible: false,
            adminInfo: {},
            addAdmainInfo: {},
            admainList: [],
            name: '',
            phone: '',
            password:'',
            checkCode: ''
        }
    },
    methods: {
        getAdminList() {
            listAdmin().then((res) => {
                this.admainList = res.data
                this.adminInfo = res.data[0]
            })
        },
        showAddAdmin() {
            this.name = '',
            this.phone = '',
            this.password ='',
            this.addVisible = true
        },
        toAddAdmin() {
            addAdmin({
                name: this.name,
                phone: this.phone,
                password: this.password
            }).then(() => {
                this.addVisible = false
                this.getAdminList()
            })
        },
        showUpdateAdmin() {
            this.name = this.adminInfo.name,
            this.phone = this.adminInfo.phone,
            this.password = '',
            this.editVisible = true
        },
        toSendAdminCheckCode() {
            sendAdminCheckCode().then(() => {
                this.$notify({
                    message: '验证码发送成功',
                    type: 'success'
                })
            })
        },
        toUpdateAdmin(){
            updateAdmin({
                name: this.name,
                phone: this.phone,
                password: this.password,
                checkCode: this.checkCode
            }).then(() => {
                this.editVisible = false
                this.getAdminList()
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

