const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now
    }
});

//*node:in the object property we can't use arrow function instead of using regular function. Because of this keyword. 
//*instance methods
todoSchema.methods = {
    findActive: function () {
        return mongoose.model("Todo").find({ status: 'active' });
    },
    findActiveCallback: function (callback) {
        return mongoose.model("Todo").find({ status: 'active' }, callback);
    },
    deleteTodo: function (id) {
        return mongoose.model("Todo").deleteOne({ _id: id });
    }
}

//*static methods
todoSchema.statics = {
    findByJS: function () {
        return this.find({ title: /js/i });
    },
    updateTodo: function (id, body) {
        return this.updateOne({ _id: id }, {
            $set: {
                description: body
            },
        });
    }
}

//*query helpers
todoSchema.query = {
    byLanguage: function (language) {
        return this.find({ title: new RegExp(language, "i") });
    },
    byLimit: function (limit) {
        return this.limit(limit);
    },
    bySelect: function (number) {
        return this.select({ _id: number, date: number });
    }
}

module.exports = todoSchema;