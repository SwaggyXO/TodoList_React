const mongoose = require('mongoose');

const SchemaForDB = new mongoose.Schema({
    name : {
        type: String,
        require: [true, 'Provide a name please!'],
        trim: true,
        maxlength: [100, 'Name must be less than 100 characters']
    },

    descp : {
        type: String,
        maxlength: [400, 'Description must be less than 400 characters']
    },

    comments : {
        type: String,
        maxlength: [200, 'Description must be less than 200 characters']
    },

    completed: {
        type : Boolean,
        default: false
    }
})

module.exports = mongoose.model('todoDB', SchemaForDB);