import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../lids/rate-limit';
import Products from './products';

// Find
export const findProducts = new ValidatedMethod({
    name: 'findProducts',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            let data = Products.find(selector, options).fetch();
            _.forEach(data,(o)=>{
                o.amount=(o.qty*o.price);
            })
            return data;
        }
    }
});

// Find One
export const findOneProduct = new ValidatedMethod({
    name: 'findOneProduct',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Products.findOne(selector, options);
        }
    }
});


// Insert
export const insertProduct = new ValidatedMethod({
    name: 'insertProduct',
    mixins: [CallPromiseMixin],
    //validate:Products.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Products.insert(doc);
        }
    }
});

// Update
export const updateProduct = new ValidatedMethod({
    name: 'updateProduct',
    mixins: [CallPromiseMixin],
    // validate:Products.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Products.update({_id: doc._id}, {$set: doc});
        }
    }
});

export const removeProduct = new ValidatedMethod({
    name: 'removeProduct',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: {type: String},
    }).validator(),
    run(selector) {
        if (Meteor.isServer) {
            return Products.remove(selector);
        }
    }
});

rateLimit({
    methods: [
        findProducts,
        findOneProduct,
        insertProduct,
        updateProduct,
        removeProduct,
    ],
});
