const Token = require('./../models/tokenModel');

exports.getAllToken = async (req, res) => {
    try {
        const tokens = await Token.find();
        res.status(200).json({ data: tokens, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
};

exports.createToken = async (req, res) => {
    try {
        const token = await Token.create(req.body);
        res.status(201).json({ data: token, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
};
exports.getToken = async (req, res) => {
    try {
        const token = await Token.findById(req.params.id);
        if (!token) {
            return res.status(404).json({ error: 'Token not found', status: 'fail' });
        }
        res.status(200).json({ data: token, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
};

exports.updateToken = async (req, res) => {
    try {
        const token = await Token.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run model validation on update
        });
        if (!token) {
            return res.status(404).json({ error: 'Token not found', status: 'fail' });
        }
        res.status(200).json({ data: token, status: 'success' });
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
};

exports.deleteToken = async (req, res) => {
    try {
        const token = await Token.findByIdAndDelete(req.params.id);
        if (!token) {
            return res.status(404).json({ error: 'Token not found', status: 'fail' });
        }
        res.status(204).json({ data: null, status: 'success' }); // No content for successful delete
    } catch (err) {
        res.status(500).json({ error: err.message, status: 'error' });
    }
};
