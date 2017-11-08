const DeviceController = require('../controllers/device.controller'),
    router = require('express').Router();

router.post('/updatelocation', DeviceController.updateLocation);
router.post('/register', DeviceController.registerDevice);
router.post('/emit', DeviceController.triggerIO);

module.exports = router;
