<template>
    <div>
        <router-view></router-view>
        <el-row :gutter="20">
            <el-col :span="15" :offset="5">
                <br><br>
                <h1>Edit Customer Information</h1>
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
                                <el-button type="primary" @click="handleSave">Save</el-button>
                                <el-button @click="handleCancel">Cancel</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import _ from 'lodash';
    import {findCustomers, updateCustomer} from '../../both/customers/methods';
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
                form: {
                    studentName: '',
                    gender: '',
                    dob: '',
                    address: '',
                    email: '',
                },
                rules: {
                    studentName: [
                        {required: true, message: 'Please Input Name'}
                    ],
                    gender: [
                        {required: true, message: 'Please Select Gender'}
                    ],
                    address: [
                        {required: true, message: 'Please Select Address'}
                    ],
                    dob: [
                        {
                            required: true,
                            message: "Please Pick a DOB",
                            trigger: "blur"
                        }
                    ],
                    email: [
                        {required: true, message: 'Please Input Phone Number'}
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

                    // Find for update
                    const _id = this.$route.params._id;
                    this.form = _.find(result, function (o) {
                        return o._id === _id;
                    });

                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },
            handleSave() {
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        this.loading = true;

                        updateCustomer.callPromise(this.form).then((result) => {
                            if (result) {
                                this.loading = false;
                                this.$notify({
                                    type: 'success',
                                    position: 'bottom-right',
                                    title: 'Success',
                                    message: 'Your transaction is success',
                                });
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
            handleReset() {
                this.$refs['form'].resetFields();
            },
            handleCancel() {
                this.$router.push({name: 'Customers'});
            },
        }
    };
</script>
