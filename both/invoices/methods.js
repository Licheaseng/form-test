import { Meteor } from "meteor/meteor";
import { ValidatedMethod } from "meteor/mdg:validated-method";
import { CallPromiseMixin } from "meteor/didericis:callpromise-mixin";
import SimpleSchema from "simpl-schema";

import rateLimit from "../../lids/rate-limit";
import Invoices from "./invoices";

// Find
export const findInvoices = new ValidatedMethod({
  name: "findInvoices",
  mixins: [CallPromiseMixin],
  validate: null,
  run(selector, options) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(200);
      selector = selector || {};
      options = options || {};
      let data = Invoices.find(selector, options).fetch();
      return data;
    }
  }
});

// Find One
export const findOneInvoice = new ValidatedMethod({
  name: "findOneInvoice",
  mixins: [CallPromiseMixin],
  validate: null,
  run(selector, options) {
    if (Meteor.isServer) {
      Meteor._sleepForMs(200);
      selector = selector || {};
      options = options || {};
      return Invoices.findOne(selector, options);
    }
  }
});

// Insert
export const insertInvoice = new ValidatedMethod({
  name: "insertInvoice",
  mixins: [CallPromiseMixin],
  validate: null,
  run(doc) {
    if (Meteor.isServer) {
      return Invoices.insert(doc);
    }
  }
});

// Update
export const updateInvoice = new ValidatedMethod({
  name: "updateInvoice",
  mixins: [CallPromiseMixin],
  validate: null,
  run(doc) {
    if (Meteor.isServer) {
      return Invoices.update({ _id: doc._id }, { $set: doc });
    }
  }
});

// remove
export const removeInvoice = new ValidatedMethod({
  name: "removeInvoice",
  mixins: [CallPromiseMixin],
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run(selector) {
    if (Meteor.isServer) {
      return Invoices.remove(selector);
    }
  }
});

rateLimit({
  methods: [
    findInvoices,
    findOneInvoice,
    insertInvoice,
    updateInvoice,
    removeInvoice
  ]
});
