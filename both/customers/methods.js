import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {validationMixin} from 'vuelidate';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../lids/rate-limit';
import Customers from './customers';

// Find
export const findCustomers = new ValidatedMethod({
    name: 'findCustomers',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Customers.find(selector, options).fetch();
        }
    }
});

// Find One
export const findOneCustomer = new ValidatedMethod({
    name: 'findOneCustomer',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Customers.findOne(selector, options);
        }
    }
});

// Insert
export const insertCustomer = new ValidatedMethod({
    name: 'insertCustomer',
    mixins: [CallPromiseMixin],
    //validate:Customers.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Customers.insert(doc);
        }
    }
});

// Update
export const updateCustomer = new ValidatedMethod({
    name: 'updateCustomer',
    mixins: [CallPromiseMixin],
    // validate:Customers.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Customers.update({_id: doc._id}, {$set: doc});
        }
    }
});

export const removeCustomer = new ValidatedMethod({
    name: 'removeCustomer',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: {type: String},
    }).validator(),
    run(selector) {
        if (!this.isSimulation) {
            return Customers.remove(selector);
        }
    }
});



rateLimit({
    methods: [
        findCustomers,
        findOneCustomer,
        insertCustomer,
        updateCustomer,
        //removeCustomer,
    ],
});
