import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Customers = new Mongo.Collection('customers');

Customers.schema = new SimpleSchema({
    customerName: {
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
    email: {
        type: String,
        optional: true
    }
});

Customers.attachSchema(Customers.schema);

export default Customers;
