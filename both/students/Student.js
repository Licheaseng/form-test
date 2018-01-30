import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Students = new Mongo.Collection('students');

Students.schema = new SimpleSchema({
    studentName: {
        type: String,
        max: 200
    },
    gender: {
        type: String,
        allowedValues: ['Male','Female']
    },
    dob: {
        type: Date,
        optional: true
    },
    address: {
        type: String,
        allowedValues: ['BTB', 'PP', 'SR','BMC','PS']
    },
    phonenumber:{
        type: Number,
        optional: true
    }
});

Students.attachSchema(Students.schema);

export default Students;
