import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Products = new Mongo.Collection('products');

Products.schema = new SimpleSchema({
    productName: {
        type: String,
        max: 200
    },
    dob: {
        type: Date,
        optional: true
    },
    qty: {
        type: Number,
        optional: true
    },
    price:{
        type: Number,
        optional: true
    },
    categoryName:{
        type: String,
        allowedValues: ['Drink', 'Beer' , 'Wine' , 'Juice']
    },
});

Products.attachSchema(Products.schema);

export default Products;
