<template>
    <div>
        <!-- route outlet -->
        <router-view></router-view>

        <div class="container">
            <el-row :gutter="20">
                <el-col :span="15" :offset="5">
                    <br><br>
                <h1>Student Form</h1>
            <!--<div class="line-spacing">-->
            <el-button type="primary" icon="el-icon-plus" @click="handleNew">New Student</el-button>
            <!--</div>-->
             <br><br>
            <el-table
                    v-loading="loading"
                    :data="tableData"
                    :default-sort="{prop: 'code', order: 'ascending'}"
                    style="width: 100%"
                    height="300">
                <!-- <el-table-column
                        prop="_id"
                        label="Code"
                        sortable
                >
                </el-table-column> -->
                <el-table-column
                        prop="studentName"
                        label="Name"
                        sortable
                >
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="Gender"
                >
                </el-table-column>
                <el-table-column
                        prop="dob"
                        :formatter="dateFormatter"
                        label="DOB"
                >
                </el-table-column>
                <el-table-column
                        prop="address"
                        label="Address"
                >
                </el-table-column>
                <el-table-column
                        prop="phonenumber"
                        label="phonenumber"
                >
                </el-table-column>
                <el-table-column
                        label="Action"
                        width="70">
                    <template slot-scope="scope">
                       <el-dropdown trigger="click" @command="handleCommand">
                            <span class="el-dropdown-link">
                                <i class="fa fa-bars"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item :command="{action: 'edit', row: scope.row}">Edit</el-dropdown-item>
                                <el-dropdown-item :command="{action: 'delete', row: scope.row}">Delete
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import {findStudents, removeStudent} from '../../both/students/methods';

    export default {
        name: 'Students',
        data() {
            return {
                loading: false,
                tableData: [],
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.loading = true;
                findStudents.callPromise().then((result) => {
                    this.tableData = result;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },
            handleNew() {
                location.reload();
                this.$router.push({name: 'StudentNew'});
            },
            handleCommand(command) {
                this[command.action](command.row);
            },
            edit(row) {
                this.$router.push({name: 'StudentEdit', params: {_id: row._id}});
            },
            delete(row) {
                this.$confirm('This will permanently delete. Continue?', 'Warning',
                    {
                        type: 'warning',
                    }
                ).then(() => {
                    removeStudent.callPromise({_id: row._id}).then((result) => {
                        this.$notify({
                            type: 'success',
                            position: 'bottom-right',
                            title: 'Success',
                            message: 'Your transaction is success',
                        });

                        this.getData();
                    }).catch((error) => {
                        console.log(error.reason);
                    });
                }).catch(() => {
                    this.$notify({
                        type: 'warning',
                        position: 'bottom-right',
                        title: 'Warning',
                        message: 'Your transaction is canceled',
                    });
                });
            },
            dateFormatter: (row,column) => {
            var date = row[column.property];
                if(date == undefined){
                    return "";
                }
                return moment(date).format("LL");
            },
        }
    }
</script>

<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
    }

    .el-icon-caret-bottom {
    font-size: 12px;
    }

    .icon-white {
    color: white;
    }

    .header-item-margin {
    margin-left: 15px;
    }
    .el-icon-arrow-down {
    font-size: 12px;
  }
</style>