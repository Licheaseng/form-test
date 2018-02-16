import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Invoices = new Mongo.Collection("invoices");

const itemSchema = new SimpleSchema({
  name: {
    type: String
  },
  qty: {
    type: Number
  },
  price: {
    type: Number
  },
  amount: {
    type: Number
  }
});

Invoices.schema = new SimpleSchema({
  date: {
    type: Date
  },
  number: {
    type: String
  },
  cusName: {
    type: String
  },
  memo: {
    type: String
  },
  total: {
    type: Number
  },
  items: {
    type: Array
  },
  "items.$": {
    type: itemSchema
  }
});

Invoices.attachSchema(Invoices.schema);

export default Invoices;
