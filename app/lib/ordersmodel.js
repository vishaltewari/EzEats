const mongoose = require("mongoose");

const ordermodel = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    fooditemids: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true
    },
    resto_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    deliverypartner_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

const orderschema = mongoose.models.orders || mongoose.model('orders', ordermodel);

export default orderschema;