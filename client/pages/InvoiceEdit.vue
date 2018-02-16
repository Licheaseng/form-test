<template>
  <div>
    <router-view></router-view>
    <div class="container">
      <h4>Invoices Form</h4>
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="handleNew"
      >Add New Invoices</el-button>
        <el-row :gutter="5">
          <el-col :span="24">
            <br><br>
            <!-- Data-Tables-->
            <data-tables
              :data="tableData"
              :action-col-def="actionColDef"
              style="width: 100%"
              height="300"
            >
              <el-table-column
                v-for="title in titles"
                :prop="title.prop"
                :label="title.label"
                :key="title.label"
                :width="title.width"
                :formatter="title.dateFormatter"
              >
                </el-table-column>
                </data-tables>
          </el-col>
        </el-row>
    </div>
  </div>
</template>
<template>
  <div>
    <router-view></router-view>
    <h4>Edit Form Invoices</h4>
    <el-form
      :model="form"
      :rules="rules"
      ref="form"
      label-width="120px"
    >
      <el-row :gutter="5">
        <el-col :span="12">
          <el-form-item
            label="DOB"
            required
          >
            <el-form-item prop="date">
              <el-date-picker
                format="dd/MM/yyyy"
                size="small"
                type="date"
                placeholder="Pick a DOB"
                v-model="form.date"
                style="width: 100%;"
              ></el-date-picker>
            </el-form-item>
            </el-form-item>
            <el-form-item
              label="Number Ref"
              prop="number"
            >
              <el-input
                v-model="form.number"
                size="small"
              ></el-input>
                </el-form-item>
                <el-form-item
                  label="Customer Name"
                  prop="cusName"
                >
                  <el-select
                    v-model="form.cusName"
                    style="width: 100%"
                    size="small"
                  >
                    <el-option
                      v-for="item in customerName"
                      :key="item._id"
                      :label="item.customerName"
                      :value="item.customerName"
                    >
                      </el-option>
                      </el-select>
                      </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item
            label="Memo"
            prop="memo"
          >
            <el-input
              v-model="form.memo"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 6}"
              size="small"
            >
              </el-input>
              </el-form-item>
        </el-col>
      </el-row>

      <!-- table -->
      <el-table
        :data="form.items"
        style="width: 100%"
      >
        <el-table-column
          type="index"
          label="No"
          prop="No"
        >
          </el-table-column>
          <el-table-column
            prop="name"
            label="Item"
          >
            <template slot-scope="scope">
              <el-form-item
                :key="scope.$index + '.name'"
                :prop="'items.'+ scope.$index +'.name'"
              >
                <el-select
                  v-model="scope.row.name"
                  size="small"
                >
                  <el-option
                    v-for="item in itemOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    </el-option>
                    </el-select>
                    </el-form-item>
            </template>
            </el-table-column>
            <el-table-column
              prop="qty"
              label="Quantities"
            >
              <template slot-scope="scope">
                <el-form-item
                  :key="scope.$index + '.qty'"
                  :prop="'items.'+ scope.$index +'.qty'"
                >
                  <el-input
                    v-model.number="scope.row.qty"
                    size="small"
                    @change="handleAmountChange(scope.row)"
                  ></el-input>
                    </el-form-item>
              </template>
              </el-table-column>
              <el-table-column
                prop="price"
                label="Price"
              >
                <template slot-scope="scope">
                  <el-form-item
                    :key="scope.$index + '.price'"
                    :prop="'items.'+ scope.$index +'.price'"
                  >
                    <el-input
                      v-model.number="scope.row.price"
                      size="small"
                      @change="handleAmountChange(scope.row)"
                    ></el-input>
                      </el-form-item>
                </template>
                </el-table-column>
                <el-table-column
                  prop="amount"
                  label="Amount"
                >
                  <template slot-scope="scope">
                    <el-form-item
                      :key="scope.$index + '.amount'"
                      :prop="'items.'+ scope.$index +'.amount'"
                    >
                      <el-input
                        v-model="scope.row.amount"
                        size="small"
                      ></el-input>
                        </el-form-item>
                  </template>
                  </el-table-column>
                  <el-table-column
                    label="Action"
                    width="80px"
                  >
                    <template slot-scope="scope">
                      <el-button v-if="form.items.length > 1"
                        type="text"
                        icon="el-icon-remove"
                        @click="deleteItem(scope.row)"
                      >
                      </el-button>
                      <el-button
                        v-if="(form.items.length - 1) === scope.$index"
                        type="text"
                        icon="el-icon-circle-plus"
                        @click="addItem"
                      >
                        </el-button>
                    </template>
                    </el-table-column>
                    </el-table>
                    <br><br>
                    <el-row :gutter="10">
                      <el-col :offset="16">
                        <el-form-item
                          label="Total: "
                          prop="total"
                        >
                          <el-input
                            v-model="total"
                            style="width: 200px"
                          > {{ total }}</el-input>
                            </el-form-item>
                      </el-col>
                    </el-row>
                    <br><br>
                    <el-row :gutter="10">
                      <el-col :offset="15">
                        <el-form-item>
                          <el-button
                            type="primary"
                            @click="handleSave"
                          >Save</el-button>
                            <el-button
                              type="primary"
                              @click="handleCancel"
                            >Cancel</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    </el-form>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
import { findCustomers } from "../../both/customers/methods";
import { findInvoices, updateInvoice } from "../../both/invoices/methods";
export default {
  name: "InvoiceEdit",
  data() {
    return {
      deleteAction: false,
      itemOpts: [
        { label: "ABC", value: "ABC" },
        { label: "Tiger", value: "Tiger" },
        { label: "Anchor", value: "Anchor" },
        { label: "Leo", value: "Leo" }
      ],
      invoiceOpts: [],
      customerName: [],
      form: {
        date: moment().toDate(),
        number: "",
        cusName: "",
        memo: "",
        items: [
          {
            name: "",
            qty: 0,
            price: 0,
            amount: 0
          }
        ]
      },
      rules: {
        date: [
          {
            required: true,
            message: "Please Pick a DOB",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "Number is requied"
          }
        ],
        memo: [{ required: true }],
        qty: [
          {
            required: true,
            message: "Quantites is requied"
          }
        ],
        price: [
          {
            required: true,
            message: "Prices is requied"
          }
        ]
      }
    };
  },
  computed: {
    total() {
      let total = 0;
      this.form.items.forEach(o => {
        total += o.amount;
      });
      return total;
    }
  },
  mounted() {
    this.getCustomerName();
    this.getInvoices();
  },
  methods: {
    getCustomerName() {
      findCustomers
        .callPromise({}, { sort: { code: 1 } })
        .then(result => {
          this.customerName = result;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    getInvoices() {
      findInvoices
        .callPromise({}, { sort: { code: 1 } })
        .then(result => {
          this.invoiceOpts = result;

          // Find for update
          const _id = this.$route.params._id;
          this.form = _.find(result, function(o) {
            return o._id === _id;
          });

          this.loading = false;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.total = this.total;
          updateInvoice
            .callPromise(this.form)
            .then(result => {
              if (result) {
                this.$notify({
                  type: "success",
                  position: "bottom-right",
                  title: "Success",
                  message: "Your transaction is success"
                });
                this.handleReset();
                this.handleCancel();
              }
            })
            .catch(err => {
              console.log(error.reason);
            });
        } else {
          return false;
        }
      });
    },
    handleReset() {
      this.$refs["form"].resetFields();
    },
    handleCancel() {
      this.$router.push({ name: "Invoices" });
    },
    addItem() {
      this.form.items.push({
        name: "",
        qty: 0,
        price: 0,
        amount: 0
      });
    },
    deleteItem(item) {
      const index = this.form.items.indexOf(item);
      if (index !== -1) {
        this.deleteAction = index < this.form.items.length - 1 ? true : false;
        this.$nextTick(() => {
          this.form.items.splice(index, 1);
        });
      }
    },
    handleAmountChange(row) {
      row.amount = row.qty * row.price;
    }
  }
};
</script>

<script>
import _ from "lodash";
import moment from "moment";
import { findCustomers } from "../../both/customers/methods";
import { findInvoices, updateInvoice } from "../../both/invoices/methods";
export default {
  name: "InvoiceEdit",
  data() {
    return {
      deleteAction: false,
      itemOpts: [
        { label: "ABC", value: "ABC" },
        { label: "Tiger", value: "Tiger" },
        { label: "Anchor", value: "Anchor" },
        { label: "Leo", value: "Leo" }
      ],
      invoiceOpts: [],
      customerName: [],
      form: {
        date: moment().toDate(),
        number: "",
        cusName: "",
        memo: "",
        items: [
          {
            name: "",
            qty: 0,
            price: 0,
            amount: 0
          }
        ]
      },
      rules: {
        date: [
          {
            required: true,
            message: "Please Pick a DOB",
            trigger: "blur"
          }
        ],
        number: [
          {
            required: true,
            message: "Number is requied"
          }
        ],
        memo: [{ required: true }],
        qty: [
          {
            required: true,
            message: "Quantites is requied"
          }
        ],
        price: [
          {
            required: true,
            message: "Prices is requied"
          }
        ]
      }
    };
  },
  computed: {
    total() {
      let total = 0;
      this.form.items.forEach(o => {
        total += o.amount;
      });
      return total;
    }
  },
  mounted() {
    this.getCustomerName();
    this.getInvoices();
  },
  methods: {
    getCustomerName() {
      findCustomers
        .callPromise({}, { sort: { code: 1 } })
        .then(result => {
          this.customerName = result;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    getInvoices() {
      findInvoices
        .callPromise({}, { sort: { code: 1 } })
        .then(result => {
          this.invoiceOpts = result;

          // Find for update
          const _id = this.$route.params._id;
          this.form = _.find(result, function(o) {
            return o._id === _id;
          });

          this.loading = false;
        })
        .catch(error => {
          console.log(error.reason);
        });
    },
    handleSave() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.form.total = this.total;
          updateInvoice
            .callPromise(this.form)
            .then(result => {
              if (result) {
                this.$notify({
                  type: "success",
                  position: "bottom-right",
                  title: "Success",
                  message: "Your transaction is success"
                });
                this.handleReset();
                this.handleCancel();
              }
            })
            .catch(err => {
              console.log(error.reason);
            });
        } else {
          return false;
        }
      });
    },
    handleReset() {
      this.$refs["form"].resetFields();
    },
    handleCancel() {
      this.$router.push({ name: "Invoices" });
    },
    addItem() {
      this.form.items.push({
        name: "",
        qty: 0,
        price: 0,
        amount: 0
      });
    },
    deleteItem(item) {
      const index = this.form.items.indexOf(item);
      if (index !== -1) {
        this.deleteAction = index < this.form.items.length - 1 ? true : false;
        this.$nextTick(() => {
          this.form.items.splice(index, 1);
        });
      }
    },
    handleAmountChange(row) {
      row.amount = row.qty * row.price;
    }
  }
};
</script>

<style lang="scss" scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
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