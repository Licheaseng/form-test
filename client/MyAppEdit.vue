<template>
  <div>
        <router-view></router-view>
      <el-row>
        <el-col class="grid-content bg-purple-dark" :span="24">
            <h1 style="text-align:center">From Edit Student</h1>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
          <el-form :model="studentForm" :rules="studentRule" ref="studentForm" label-width="120px" class="demo-ruleForm">
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
            <el-col :span="12">
             <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="Pick a date" v-model="studentForm.date1" style="width: 100%;"></el-date-picker>
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
              <el-button type="primary" @click="handleUpate()" size="small" >Update</el-button>
              <el-button type="success" @click="handleCancel()" size="small">Cancel</el-button>
            </el-form-item>
          </el-form>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Students from "../both/Student.js";
export default {
    name: 'MyAppEdit',
  data(){
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
                message: "Please Pick a date",
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
        callStudents() {
            Meteor.call("findStudents", (err, res) => {
                if (!err) {
                this.studentData = res;
                console.log(res);
                }
            });
        },
        handleCancel(){
            this.$router.push({name: 'myApp'})
        },
        handleUpate(index, row) {
            this.studentForm.id = row._id;
            this.studentForm.name = row.name;
            this.studentForm.date1 = row.date1;
            this.studentForm.gender = row.gender;
            this.studentForm.address = row.address;
            this.studentForm.skill = row.skill;

            let obj = {
                name: this.studentForm.name,
                gender: this.studentForm.gender,
                date1: this.studentForm.date1,
                address: this.studentForm.address,
                skill: this.studentForm.skill
            };
            Meteor.call("updateStudent", this.studentForm.id, obj, (err, res) => {
                if (!err) {
                this.callStudents();
                this.$message.success({ message: "Ok" });
                console.log(res);
                } else {
                console.log("error");
                }
            });
        },
        handleEdit(index, row) {
            this.studentForm.id = row._id;
            this.studentForm.name = row.name;
            this.studentForm.date1 = row.date1;
            this.studentForm.gender = row.gender;
            this.studentForm.address = row.address;
            this.studentForm.skill = row.skill;
        },
    }
}
</script>



      