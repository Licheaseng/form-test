// import { Meteor } from 'meteor/meteor';
// import Students from '../both/Student.js';
// Meteor.startup(() => {
//   // code to run on server at startup
//   Meteor.methods({
//     insertStudent(data) {
//       return Students.insert(data)
//     },
//     findStudents(){
//       return Students.find().fetch();
//     },
//     findOneStudent(id){
//       return Students.findOne({_id:id}).fetch();
//     },
//     removeStudent(id){
//       Meteor._sleepForMs(150)
//       return Students.remove({_id:id});
//     },
//     updateStudent(id, obj){
//       Meteor._sleepForMs(150)
//       return Students.update({ _id:id }, {$set:obj})
//     }
//   })
// });
import '../both/products/methods';
import '../both/students/methods';
//import '../both/sever/publications';
//import '../both/sever/collection-hook';
