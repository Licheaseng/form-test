import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Sales = new Mongo.Collection('sales');

Sales.schema = new SimpleSchema({
    saleProName: {
        type: String,
        max: 200
    },
    saleCusName:{
        type: String,
        max: 200
    },
    dos: {
        type: Date,
        optional: true
    },
    qty: {
        type: Number
    },
    price:{
        type: Number,
    },
    amount:{
        type: String,
        optional:true
    },
    categoryName:{
        type: String
    }
});

Sales.attachSchema(Sales.schema);

export default Sales;
