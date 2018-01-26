<template>
  <div>
        <router-view></router-view>
      <el-row>
        <el-col class="grid-content bg-purple-dark" :span="24">
            <h1 style="text-align:center">From Add New Student</h1>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12" :offset="5">
        <el-button type="primary" @click="handleCancel">Back</el-button><br><br>
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
              <el-button type="primary" @click="handleSaveClose()" size="small" >Save & Close</el-button>
              <el-button type="success" @click="handleSaveNew()" size="small">Save & New</el-button>
            </el-form-item>
          </el-form>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Students from "../both/Student.js";
export default {
    name: 'MyAppNew',
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
        handleSaveClose() {
            let obj = {
                name: this.studentForm.name,
                gender: this.studentForm.gender,
                date1: this.studentForm.date1,
                address: this.studentForm.address,
                skill: this.studentForm.skill
            };
            (this.loading = true),
                setTimeout(() => {
                (this.loading = false),
                    this.$refs.studentForm.validate(val => {
                    if (val) {
                        Meteor.call("insertStudent", obj, (err, res) => {
                        if (!err) {
                            this.callStudents();
                            this.$message.success({ message: "Insert Success" });
                            this.handleCancel();
                            console.log(res);
                        } else {
                            console.log("error");
                        }
                        });
                    } else {
                        this.$message.warning({
                        message: "Please Input All The Information!!"
                        });
                    }
                    });
                }, 100);
        },
        handleSaveNew() {
            let obj = {
                name: this.studentForm.name,
                gender: this.studentForm.gender,
                date1: this.studentForm.date1,
                address: this.studentForm.address,
                skill: this.studentForm.skill
            };
            (this.loading = true),
                setTimeout(() => {
                (this.loading = false),
                    this.$refs.studentForm.validate(val => {
                    if (val) {
                        Meteor.call("insertStudent", obj, (err, res) => {
                        if (!err) {
                            this.callStudents();
                            this.$message.success({ message: "Insert Success" });
                            this.handleReset();
                            console.log(res);
                        } else {
                            console.log("error");
                        }
                        });
                    } else {
                        this.$message.warning({
                        message: "Please Input All The Information!!"
                        });
                    }
                    });
                }, 100);
            },
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
        handleReset() {
            this.studentForm.name = "";
            this.studentForm.gender = "";
            this.studentForm.date1 = "";
            this.studentForm.address = "";
            this.studentForm.skill = "";
        },
    }
}
</script>



      