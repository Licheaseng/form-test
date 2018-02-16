import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import SimpleSchema from 'simpl-schema';

import rateLimit from '../../lids/rate-limit';
import Sales from './sales';

// Find
export const findSales = new ValidatedMethod({
    name: 'findSales',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            let data = Sales.find(selector, options).fetch();
            _.forEach(data, (o) => {
                o.amount = (o.qty * o.price);
            })
            return data;
        }
    }
});

export const findSaleDoc = new ValidatedMethod({
    name: 'findSaleDoc',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if(Meteor.isServer){
            let saleDoc = Sales.aggregate([
                {
                    $lookup: {
                        from: 'products',
                        localField: 'saleProName',
                        foreignField: '_id',
                        as: 'proDoc'
                    }
                },
                {
                    $unwind: { path: '$proDoc', preserveNullAndEmptyArrays: true }
                },
                {
                    $lookup:{
                        from : 'customers',
                        localField: 'saleCusName',
                        foreignField: '_id',
                        as : 'cusdoc'
                    }
                },
                {
                    $unwind: {path: '$cusdoc' , preserveNullAndEmptyArrays: true}
                },
                // {
                //     $project: {
                //         amount: { $multiply: ["$price", "$qty"]}
                //     }
                // },
                {
                    $group: {
                        _id: '$_id',
                        saleCusName: { $last: '$cusdoc.customerName' },
                        saleProName: { $last: '$proDoc.productName' },
                        dos: { $last: '$dos' },
                        qty: { $last: '$qty' },
                        price: { $last: '$price' },
                        amount: { $sum : { $multiply: ["$price", "$qty"]}},
                        categoryName: { $last: '$categoryName' },
                    }
                },
                
            ])
            return saleDoc;
        }
    }
})


// Find One
export const findOneSale = new ValidatedMethod({
    name: 'findOneSale',
    mixins: [CallPromiseMixin],
    validate: null,
    run(selector, options) {
        if (Meteor.isServer) {
            Meteor._sleepForMs(200);
            selector = selector || {};
            options = options || {};
            return Sales.findOne(selector, options);
        }
    }
});


// Insert
export const insertSale = new ValidatedMethod({
    name: 'insertSale',
    mixins: [CallPromiseMixin],
    //validate:Sales.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Sales.insert(doc);
        }
    }
});

// Update
export const updateSale = new ValidatedMethod({
    name: 'updateSale',
    mixins: [CallPromiseMixin],
    // validate:Sales.schema.validator(),
    validate: null,
    run(doc) {
        if (Meteor.isServer) {
            return Sales.update({ _id: doc._id }, { $set: doc });
        }
    }
});

export const removeSale = new ValidatedMethod({
    name: 'removeSale',
    mixins: [CallPromiseMixin],
    // validate: null,
    validate: new SimpleSchema({
        _id: { type: String },
    }).validator(),
    run(selector) {
        if (Meteor.isServer) {
            return Sales.remove(selector);
        }
    }
});

rateLimit({
    methods: [
        findSaleDoc,
        findSales,
        findOneSale,
        insertSale,
        updateSale,
        removeSale,
    ],
});
