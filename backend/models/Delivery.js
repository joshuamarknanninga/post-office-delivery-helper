const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    houseNumber: { type: String, required: true },
    address: { type: String, required: true },
    coordinates: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
    status: { type: String, enum: ['pending', 'delivered'], default: 'pending' },
    deliveredAt: { type: Date },
    deliveredBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
