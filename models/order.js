import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Order = new Schema({
    title: {
        type: String
    },
    bread: {
        type: String
    },
    meat: {
        type: String
    },
    cheese: {
        type: String
    },
    toppings: {
        type: String
    },
    instructions: {
        type: String
    }
});

export default mongoose.model('Order', Order);