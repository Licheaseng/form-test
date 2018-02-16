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

<script>
import moment from 'moment'
import {
  findInvoices,
  removeInvoice,
} from '../../both/invoices/methods'
export default {
  name: 'Invoices',
  data() {
    return {
      tableData: [],
      actionColDef: {
        label: 'Actions',
        width: 160,
        fixed: 'right',
        tableColProps: {
          align: 'center',
        },
        def: [
          {
            handler: row => {
              this.handleEdit(row)
            },
            buttonProps: {
              type: 'success',
              size: 'small',
            },
            name: 'Edit',
          },
          {
            buttonProps: {
              type: 'success',
              size: 'small',
            },
            handler: row => {
              this.handleDelete(row)
            },
            name: 'Delete',
          },
        ],
      },
      titles: [
        {
          prop: 'date',
          label: 'Date',
          // format Date
          dateFormatter: (row, column) => {
            var date = row[column.property]
            if (date == undefined) {
              return ''
            }
            return moment().format('LL')
          },
        },
        {
          prop: 'number',
          label: 'Number Ref',
        },
        {
          prop: 'cusName',
          label: 'Customer Name',
        },
        {
          prop: 'memo',
          label: 'Memo',
        },
        {
          prop: 'total',
          label: 'Total',
        },
      ],
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      findInvoices
        .callPromise()
        .then(result => {
          console.log(result)
          this.tableData = result
        })
        .catch(error => {
          console.log(error.reason)
        })
    },
    handleNew() {
      this.$router.push({ name: 'InvoiceNew' })
    },
    handleCommand(command) {
      this[command.action](command.row)
    },
    handleEdit(row) {
      this.$router.push({
        name: 'InvoiceEdit',
        params: { _id: row._id },
      })
    },
    handleDelete(row) {
      this.$confirm(
        'This will permanently delete. Continue?',
        'Warning',
        {
          type: 'warning',
        }
      )
        .then(() => {
          removeInvoice
            .callPromise({ _id: row._id })
            .then(result => {
              this.$notify({
                type: 'success',
                position: 'bottom-right',
                title: 'Success',
                message:
                  'Your transaction is success',
              })
              this.getData()
            })
            .catch(error => {
              console.log(error.reason)
            })
        })
        .catch(() => {
          this.$notify({
            type: 'warning',
            position: 'bottom-right',
            title: 'Warning',
            message:
              'Your transaction is canceled',
          })
        })
    },
  },
}
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