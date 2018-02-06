<template>
    <div>
        <router-view></router-view>
        <el-row :gutter="20">
            <el-col :span="15" :offset="5">
                <br><br>
                <h1>Add New Customer</h1>
                <el-button type="primary" @click="handleCancel">Back</el-button><br><br>
                <el-form v-loading="loading" :model="form" :rules="rules" ref="form" label-width="120px">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Name" prop="customerName">
                                <el-input v-model="form.customerName"></el-input>
                            </el-form-item>
                            <el-form-item label="Gender" prop="gender">
                                <el-select v-model="form.gender" style="width: 100%">
                                    <el-option
                                            v-for="item in gender"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="DOB" required>
                                <el-form-item prop="dob">
                                    <el-date-picker type="date" placeholder="Pick a DOB" v-model="form.dob" style="width: 100%;"></el-date-picker>
                                </el-form-item>
                            </el-form-item>
                            <el-form-item label="Address" prop="address">
                                <el-select v-model="form.address" style="width: 100%">
                                    <el-option
                                            v-for="item in address"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Email" prop="email">
                                <el-input v-model="form.email"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="handleSaveClose">Save & Close</el-button>
                                <el-button type="primary" @click="handleSaveNew">Save & New</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import {findCustomers, insertCustomer} from '../../both/customers/methods';
    export default {
        name: 'CustomerNew',
        data() {
            return {
                loading: false,
                gender: [
                    {label: 'Male', value: 'Male'},
                    {label: 'Female', value: 'Female'}
                ],
                address: [
                    {label: 'BTB', value: 'BTB'},
                    {label: 'PP', value: 'PP'},
                    {label: 'SR', value: 'SR'},
                    {label: 'BMC', value: 'BMC'},
                    {label: 'PS', value: 'PS'}
                ],
                CustomerOpts: [],
                form: {
                    customerName: '',
                    gender: '',
                    dob: '',
                    address: '',
                    email: '',
                },
                rules: {
                    customerName: [
                        {required: true, message: 'Please Input Name'}
                    ],
                    gender: [
                        {required: true, message: 'Please Select Gender'}
                    ],
                    address: [
                        {required: true, message: 'Please Select Address'}
                    ],
                    dob: [
                        {required: true,message: "Please Pick a DOB",trigger: "blur"}
                    ],
                    email: [
                        {required: true, message: 'Please Input email'}
                    ],
                }
            };
        },
        mounted() {
            this.getCustomers();
        },
        methods: {
            getCustomers() {
                this.loading = true;
                findCustomers.callPromise({}, {sort: {code: 1}}).then((result) => {
                    this.CustomerOpts = result;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },
            handleSaveClose() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        insertCustomer.callPromise(this.form).then((result) => {
                            if (result) {
                                this.loading = false;
                                this.$notify({
                                    type: 'success',
                                    position: 'bottom-right',
                                    title: 'Success',
                                    message: 'Your transaction is success',
                                });
                                this.handleReset();
                                this.handleCancel();
                            }
                        }).catch((err) => {
                            console.log(error.reason);
                        });

                    } else {
                        return false;
                    }
                });
            },
            handleSaveNew() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        insertCustomer.callPromise(this.form).then((result) => {
                            if (result) {
                                this.loading = false;
                                this.$notify({
                                    type: 'success',
                                    position: 'bottom-right',
                                    title: 'Success',
                                    message: 'Your transaction is success',
                                });
                                this.handleReset();
                            }
                        }).catch((err) => {
                            console.log(error.reason);
                        });

                    } else {
                        return false;
                    }
                });
            },
            handleReset() {
                this.$refs['form'].resetFields();
            },
            handleCancel() {
                this.$router.push({name: 'Customers'});
            },
        }
    };
</script>