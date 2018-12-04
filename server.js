import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Order from './models/Order';

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/orders');

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
})

router.route('/orders').get((req, res) => {
    Order.find((err, orders) => {
        if (err)
            console.log(err);
        else   
            res.json(orders);
    });
});

router.route('/orders/:id').get((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            console.log(err);
        else   
            res.json(order);
    });
});

router.route('/orders/add').post((req, res) => {
    let order = new Order(req.body);
    console.log("adding");
    console.log(order);
    order.save()
        .then(order => {
            res.status(200).json({'order' : 'Added succesfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/orders/update/:id').post((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (!order)
            return next (new Error('Could not load document'));
        else {
            order.title = req.body.title;
            order.bread = req.body.bread;
            order.meat = req.body.meat;
            order.cheese = req.body.cheese;
            order.toppings = req.body.toppings;
            order.instructions = req.body.instructions;

            order.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/orders/delete/:id').get((req, res) => {
    Order.findByIdAndRemove({_id: req.params.id}, (err, order) => {
        if (err)
            res.json(err);
        else   
            res.json('Removed successfully');
    });
});

app.use('/', router);

app.listen(4000, () => console.log('Express server running on port 4000'));