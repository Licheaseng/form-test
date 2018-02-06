<template>
    <div>
        <router-view></router-view>
        <el-row :gutter="20">
            <el-col :span="15" :offset="5">
                <br><br>
                <h1>Edit Sale</h1>
                <el-form v-loading="loading" :model="form" :rules="rules" ref="form" label-width="120px">
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-form-item label="Customer Name" prop="saleCusName">
                                <el-select v-model="form.saleCusName" clearable style="width: 100%">
                                    <el-option
                                            v-for="item in customerName"
                                            :key="item._id"
                                            :label="item.customerName"
                                            :value="item._id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="Product Name" prop="saleProName">
                                <el-select v-model="form.saleProName" clearable style="width: 100%" @change="handleChangeProduct">
                                    <el-option
                                            v-for="item in productName"
                                            :key="item._id"
                                            :label="item.productName"
                                            :value="item._id"
                                    >
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="DOS" required>
                                <el-form-item prop="dos">
                                    <el-date-picker type="date" placeholder="Pick a DOB" v-model="form.dos" style="width: 100%;"></el-date-picker>
                            </el-form-item>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="price" prop="price">
                                <el-input v-model="form.price" :readonly="readOnly"></el-input>
                            </el-form-item>
                            <el-form-item label="Quantities" prop="qty">
                                <el-input-number v-model="form.qty" :disabled="disabled" :min="1" :max="50"></el-input-number>
                            </el-form-item>
                            <el-form-item label="Category Name" prop="categoryName">
                                <el-input v-model="form.categoryName"></el-input>
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
    import {findSales, updateSale} from '../../both/sales/methods';
    import {findProducts} from '../../both/products/methods';
    import {findCustomers} from '../../both/customers/methods';
    export default {
        name: 'SaleNew',
        data() {
            return {
                loading: false,
                productName: [],
                customerName:[],
                readOnly: true,
                disabled: true,
                form: {
                    saleCusName: '',
                    saleProName: '',
                    dos: '',
                    qty: 0,
                    price: 0,
                },
                rules: {
                    saleCusName:[
                        {required: true, message: 'Customer Name is Requied'}
                    ],
                    saleProName: [
                        {required: true, message: 'Product Name is Requied'}
                    ],
                    dos: [
                        {required: true, message: 'Dos is requied'}
                    ],
                    qty: [
                        {required: true,message: "Qty is requied"}
                    ],
                    price: [
                        {required: true, message: 'price is requied'}
                    ],
                    categoryName: [
                        {required: true, message: 'Category Name is Requied'}
                    ]
                }
            };
        },
        mounted() {
            this.getSales();
            this.getProducts();
            this.getCustomers();
        },
        methods: {
            getCustomers(){
                this.loading = true;
                findCustomers.callPromise({}, {sort: {code: 1}}).then((result) => {
                    this.customerName = result;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },
            getProducts() {
                this.loading = true;
                findProducts.callPromise({}, {sort: {code: 1}}).then((result) => {
                    this.productName = result;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },

            handleChangeProduct(val){
                this.disabled = false;
                findProducts.callPromise({_id:val}).then((result)=>{
                    if(result){
                        let prices = [];
                        let categorys = [];
                        _.forEach(result, function(o){
                            return prices = o.price , categorys = o.categoryName;
                        })
                        return this.form.price = prices , this.form.categoryName = categorys;
                        
                    }
                }).catch((error) =>{
                    console.log(error.reason);
                })
            },
            getSales() {
                this.loading = true;

                findSales.callPromise({}, {sort: {code: 1}}).then((result) => {
                    this.SaleOpts = result;

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

                        updateSale.callPromise(this.form).then((result) => {
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
                this.$router.push({name: 'Sales'});
            },
        }
    };

</script>
