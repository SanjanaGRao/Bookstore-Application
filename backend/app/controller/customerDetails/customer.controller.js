const logger = require("../../../config/logger");
const customerService = require("../../service/customerDetails/customer.service");

class customerController {
createCustomer = (req, res) => {
    const userId=req.body.userId;
    const customerDetails=req.body;
    customerService.createNewCustomer(userId,customerDetails).then(result => {
        res.send(result);
    }).catch(err => {
        logger.error(err);
        return res.send(err);
});
};

findCustomer = (req, res) => {
    const userId=req.body.userId;
    customerService.getcustomer(userId).then(address => {
        res.send(address);
    }).catch(err => {
        logger.error(err);
        return res.send(err);
});
};
}
module.exports = new customerController();
