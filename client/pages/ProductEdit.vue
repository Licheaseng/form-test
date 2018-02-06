<template>
    <div>
        <router-view></router-view>
        <el-row :gutter="20">
            <el-col :span="15" :offset="5">
                <br><br>
                <h1>Edit Product</h1>
        <el-form v-loading="loading" :model="form" :rules="rules" ref="form" label-width="120px">
            <el-row :gutter="10">
                <el-col :span="12">
                    <el-form-item label="Name" prop="productName">
                        <el-input v-model="form.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="DOB" required>
                        <el-form-item prop="dob">
                             <el-date-picker type="date" placeholder="Pick a DOB" v-model="form.dob" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="Quantities" prop="qty">
                        <el-input v-model="form.qty"></el-input>
                    </el-form-item>
                    <el-form-item label="price" prop="price">
                        <el-input v-model="form.price"></el-input>
                    </el-form-item>
                    <el-form-item label="Category Name" prop="categoryName">
                        <el-select v-model="form.categoryName" clearable style="width: 100%">
                            <el-option
                                    v-for="item in categoryOpt"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
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
    import {findProducts, updateProduct} from '../../both/products/methods';
    export default {
        name: 'ProductNew',
        data() {
            return {
                loading: false,
                categoryOpt:[
                    {label: 'Drink', value: 'Drink'},
                    {label: 'Beer' , value: 'Beer'},
                    {label: 'Wine' , value: 'Wine'},
                    {label: 'Juice' , value: 'Juice'}
                ],
                form: {
                    productName: '',
                    dob: '',
                    qty: 0,
                    price: 0,
                },
                rules: {
                    productName: [
                        {required: true, message: 'Please Input Name'}
                    ],
                    qty: [
                        {required: true,message: "Qty is requied"}
                    ],
                    price: [
                        {required: true, message: 'price is requied'}
                    ],
                    categoryName: [
                        {required: true, message: 'CategoryName is requied'}
                    ],
                }
            };
        },
        mounted() {
            this.getProducts();
        },
        methods: {
            getProducts() {
                this.loading = true;

                findProducts.callPromise({}, {sort: {code: 1}}).then((result) => {
                    this.ProductOpts = result;

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

                        updateProduct.callPromise(this.form).then((result) => {
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
                this.$router.push({name: 'Products'});
            },
        }
    };

</script>
