<template>
    <div>
        <!-- route view -->
        <router-view></router-view>

        <div class="container">
            <el-row :gutter="20">
                <el-col :span="25" :offset="5">
                    <br><br>
                <h1>Sales Product Form</h1>
            <!--<div class="line-spacing">-->
            <el-button type="primary" icon="el-icon-plus" @click="handleNew">New Sale</el-button>
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
                        prop="saleCusName"
                        label="Customer Name"
                        sortable
                        width="150px"
                >
                </el-table-column>
                <el-table-column
                        prop="saleProName"
                        label="Product Name"
                        sortable
                        width="150px"
                >
                </el-table-column>
                <el-table-column
                        prop="dos"
                        :formatter="dateFormatter"
                        label="DOS"
                        width="150px"
                >
                </el-table-column>
                <el-table-column
                        prop="qty"
                        label="Quantities"
                        width="100px"
                >
                </el-table-column>
                <el-table-column
                        prop="price"
                        :formatter="priceFormatter"
                        label="Price"
                >
                </el-table-column>
                <el-table-column
                        prop="categoryName"
                        label="Category Name"
                        width="120px"
                >
                </el-table-column>
                <el-table-column
                        prop="amount"
                        :formatter="amountFormatter"
                        label="Amount"
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
    import {findSaleDoc,findSales,removeSale} from '../../both/sales/methods';

    export default {
        name: 'Sales',
        data() {
            return {
                loading: false,
                tableData: []
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.loading = true;
                findSaleDoc.callPromise().then((result) => {
                    this.tableData = result;
                    this.loading = false;
                }).catch((error) => {
                    console.log(error.reason);
                });
            },
            handleNew() {
                location.reload();
                this.$router.push({name: 'SaleNew'});
            },
            handleCommand(command) {
                this[command.action](command.row);
            },
            edit(row) {
                this.$router.push({name: 'SaleEdit', params: {_id: row._id}});
            },
            delete(row) {
                this.$confirm('This will permanently delete. Continue?', 'Warning',
                    {
                        type: 'warning',
                    }
                ).then(() => {
                    removeSale.callPromise({_id: row._id}).then((result) => {
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

            // date format
            dateFormatter: (row,column) => {
            var date = row[column.property];
                if(date == undefined){
                    return "";
                }
                return moment(date).format("LL");
            },

            // format price $
            priceFormatter: (row,column) => {
            var prices = row[column.property];
                if(prices == undefined){
                    return "";
                }
                return numeral(prices).format("$0,0");
            },

            //format Amount $
            amountFormatter: (row,column) => {
            var amounts = row[column.property];
                if(amounts == undefined){
                    return "";
                }
                return numeral(amounts).format("$0.00");
            },
        }
    }
</script>

<style  lang="scss" scoped>
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
