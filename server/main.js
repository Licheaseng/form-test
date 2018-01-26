import { Meteor } from 'meteor/meteor';
import Students from '../both/Student.js';
Meteor.startup(() => {
  // code to run on server at startup
  Meteor.methods({
    insertStudent(data) {
      return Students.insert(data)
    },
    findStudents(){
      return Students.find().fetch();
    },
    removeStudent(id){
      Meteor._sleepForMs(150)
      return Students.remove({_id:id});
    },
    updateStudent(id, obj){
      Meteor._sleepForMs(150)
      return Students.update({ _id:id }, {$set:obj})
    }
  })
});
