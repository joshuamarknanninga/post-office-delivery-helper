const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');
const jwt = require('jsonwebtoken');

// Middleware for protecting routes
const auth = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token, authorization denied' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        next();
    } catch(err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

// Get all deliveries
router.get('/', auth, async (req, res) => {
    try {
        const deliveries = await Delivery.find();
        res.json(deliveries);
    } catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Update delivery status
router.put('/:id', auth, async (req, res) => {
    const { status } = req.body;
    try {
        let delivery = await Delivery.findById(req.params.id);
        if (!delivery) return res.status(404).json({ error: 'Delivery not found' });
        delivery.status = status;
        if (status === 'delivered') {
            delivery.deliveredAt = Date.now();
            delivery.deliveredBy = req.user;
        }
        await delivery.save();
        res.json(delivery);
    } catch(err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Add new delivery (optional, for admin)
router.post('/', auth, async (req, res) => {
    const { houseNumber, address, coordinates } = req.body;
    try {
        let delivery = new Delivery({ houseNumber, address, coordinates });
        await delivery.save();
        res.status(201).json(delivery);
    } catch(err) {
        res.status(400).json({ error: 'Error creating delivery' });
    }
});

module.exports = router;
