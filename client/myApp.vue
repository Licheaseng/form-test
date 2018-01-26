<template>
  
    <div v-loading="loading">
        <router-view></router-view>
      <el-row>
        <el-col class="grid-content bg-purple-dark" :span="24">
            <h1 style="text-align:center">Student Data</h1>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <el-button type="primary" @click="handleNew">Add new</el-button>
          <br><br>
          <!-- <el-form :model="studentForm" :rules="studentRule" ref="studentForm" label-width="120px" class="demo-ruleForm">
           <el-form-item label="Student Name" prop="name">
             <el-input v-model="studentForm.name" placeholder="name"></el-input>
           </el-form-item>
           <el-form-item label="Student Gender" prop="gender">
             <el-select v-model="studentForm.gender">
               <el-option v-for="item in genderOpt" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col :span="11">
             <el-form-item prop="date1">
              <el-date1-picker type="date1" placeholder="Pick a date1" v-model="studentForm.date1" style="width: 100%;"></el-date1-picker>
            </el-form-item>
            </el-col>
          </el-form-item>
           <el-form-item label="Student Address" prop="address">
             <el-select v-model="studentForm.address">
               <el-option v-for="item in addressOpt" :key="item.value" :label="item.label" :value="item.value">
               </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="Student Skill" prop="skill">
             <el-input v-model="studentForm.skill" placeholder="skill"></el-input>
           </el-form-item>
           <el-form-item>
              <el-button type="primary" @click="handleSaveData()" size="small" >Insert</el-button>
              <el-button type="success" @click="handleUpate()" size="small">Update1</el-button>
              <el-button type="warning" @click="handleClear()" size="small">Clear</el-button>
              <el-button type="primary" @click="handleShow()" size="small">Show Table</el-button>
              <el-button type="primary" @click="handleHide()" size="small">Hide Table</el-button>
            </el-form-item>
          </el-form> -->
        </el-col>
        <el-col :span="16.5" :offset="5">
           <el-table
              v-show="table"
              :data="studentData"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="Name"
                width="170">
              </el-table-column>
              <el-table-column
                prop="gender"
                label="Gender"
                width="130">
              </el-table-column>
              <el-table-column
                prop="date1"
                label="Date"
                :formatter="dateFormatter"
                width="100">
              </el-table-column>
              <el-table-column
                prop="address"
                label="Address"
                 width="100">
              </el-table-column>
              <el-table-column
                prop="skill"
                label="Skill"
                 width="90">
              </el-table-column>
              <el-table-column
                label="Remove"
                 width="110">
                <template slot-scope="scope">
                  <el-button type="danger" size="mini" @click="handleRemove(scope.row)" icon="el-icon-delete">
                  Remove
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="Edit"
                 width="100">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleEdit(scope.$index,scope.row)" icon="el-icon-edit">
                  Edit
                  </el-button>
                </template>
              </el-table-column>
           </el-table>
        </el-col>
      </el-row>
    </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Students from "../both/Student";
import loading from "vue-loading";
import MyAppNew from './MyAppNew.vue';

export default {
  derectives: { loading },
  name: "myApp",
  data() {
    return {
      studentData: [],
      studentForm: {
        name: "",
        address: "",
        gender: "",
        skill: "",
        search: "",
        date1: "",
      },
      genderOpt: [
        {
          label: "Male",
          value: "Male"
        },
        {
          label: "Female",
          value: "Female"
        }
      ],
      searchOpt: [
        {
          label: "Name",
          value: "Name"
        },
        {
          label: "Gender",
          value: "Gender"
        },
        {
          label: "Address",
          value: "Address"
        },
        {
          label: "Skill",
          value: "Skill"
        }
      ],
      addressOpt: [
        {
          label: "BTB",
          value: "BTB"
        },
        {
          label: "SR",
          value: "SR"
        },
        {
          label: "PP",
          value: "PP"
        },
        {
          label: "BMC",
          value: "BMC"
        },
        {
          label: "PS",
          value: "PS"
        },
        {
          label: "KPS",
          value: "KPS"
        }
      ],
      studentRule: {
        name: [
          {
            required: true,
            message: "Please input name",
            triggemeteorr: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: "Please Select gender",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Please Select Gender",
            trigger: "blur"
          }
        ],
        skill: [
          {
            required: true,
            message: "Please Input Skill",
            trigger: "blur"
          }
        ],
        date1: [
          {
            required: true,
            message: "Please Pick a date1",
            trigger: "blur"
          }
        ],
      },
      tableData: [],
      loading: false,
      table: true
    };
  },
  created() {
    this.callStudents();
  },
  methods: {
    // handleSaveData() {
    //   let obj = {
    //     name: this.studentForm.name,
    //     gender: this.studentForm.gender,
    //     date1: this.studentForm.date1,
    //     address: this.studentForm.address,
    //     skill: this.studentForm.skill
    //   };
    //   (this.loading = true),
    //     setTimeout(() => {
    //       (this.loading = false),
    //         this.$refs.studentForm.validate1(val => {
    //           if (val) {
    //             Meteor.call("insertStudent", obj, (err, res) => {
    //               if (!err) {
    //                 this.callStudents();
    //                 this.$message.success({ message: "Ok" });
    //                 console.log(res);
    //               } else {
    //                 console.log("error");
    //               }
    //             });
    //           } else {
    //             this.$message.warning({
    //               message: "Please Input All The Information!!"
    //             });
    //           }
    //         });
    //     }, 1000);
    // },
    callStudents() {
      Meteor.call("findStudents", (err, res) => {
        if (!err) {
          this.studentData = res;
          console.log(res);
        }
      });
    },
    handleRemove(row) {
      Meteor.call("removeStudent", row._id, (err, res) => {
        if (!err) {
          this.callStudents();
        }
      });
    },
    // handleUpate() {
    //   let obj = {
    //     name: this.studentForm.name,
    //     gender: this.studentForm.gender,
    //     date1: this.studentForm.date1,
    //     address: this.studentForm.address,
    //     skill: this.studentForm.skill
    //   };
    //   Meteor.call("update1Student", this.studentForm.id, obj, (err, res) => {
    //     if (!err) {
    //       this.callStudents();
    //       this.$message.success({ message: "Ok" });
    //       console.log(res);
    //     } else {
    //       console.log("error");
    //     }
    //   });
    // },
    handleEdit(index, row) {
      this.$router.push({name: 'MyAppEdit', params: {_id: id}})
      this.studentForm.id = row._id;
      this.studentForm.name = row.name;
      this.studentForm.date1 = row.date1;
      this.studentForm.gender = row.gender;
      this.studentForm.address = row.address;
      this.studentForm.skill = row.skill;
    },
    handleClear() {
      this.studentForm.name = "";
      this.studentForm.gender = "";
      this.studentForm.date1 = "";
      this.studentForm.address = "";
      this.studentForm.skill = "";
    },
    handleShow() {
      this.table = true;
    },
    handleHide() {
      this.table = false;
    },
    dateFormatter: (row,column) => {
      var date = row[column.property];
        if(date == undefined){
          return "";
      }
      return moment(date).format("DD/MM/YYYY");
    },
    handleNew(){
      this.$router.push({name:'MyAppNew'});
    }

  }
};
</script>


<style>
.input-with-select .el-input-group__prepend {
  background-color: rgba(244, 249, 252, 0.774);
}
.el-select .el-input {
  width: 110px;
}
</style>
