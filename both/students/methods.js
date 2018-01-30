import {Meteor} from 'meteor/meteor';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import {CallPromiseMixin} from 'meteor/didericis:callpromise-mixin';
import {validationMixin} from 'vuelidate';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../lids/rate-limit';
import Students from './Student';

// Find
export const findStudents = new ValidatedMethod({
    name: 'findStudents',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Students.find(selector, options).fetch();
        }
    }
});

// Find One
export const findOneStudent = new ValidatedMethod({
    name: 'findOneStudent',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Students.findOne(selector, options);
        }
    }
});

// Insert
export const insertStudent = new ValidatedMethod({
    name: 'insertStudent',
    mixins: [CallPromiseMixin],
    //validate:Students.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Students.insert(doc);
        }
    }
});

// Update
export const updateStudent = new ValidatedMethod({
    name: 'updateStudent',
    mixins: [CallPromiseMixin],
    // validate:Students.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Students.update({_id: doc._id}, {$set: doc});
        }
    }
});

export const removeStudent = new ValidatedMethod({
    name: 'removeStudent',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: {type: String},
    }).validator(),
    run(selector) {
        if (!this.isSimulation) {
            return Students.remove(selector);
        }
    }
});



rateLimit({
    methods: [
        findStudents,
        findOneStudent,
        insertStudent,
        updateStudent,
        //removeStudent,
    ],
});
