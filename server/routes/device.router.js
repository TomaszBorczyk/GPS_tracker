const DeviceController = require('../controllers/device.controller'),
    router = require('express').Router();

router.post('/updatelocation', DeviceController.updateLocation);
router.post('/register', DeviceController.registerDevice);

module.exports = router;
