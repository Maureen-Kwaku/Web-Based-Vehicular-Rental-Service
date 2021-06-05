const { PaymentModel } = require('./model');
const { RentalModel } = require('../rental/model');
const { __verifyPayment } = require('../../helpers/payment');

//verify payment from paystack
async function verifyPayment(input) {
  try {
    console.log(input);

    if (input.event === 'charge.success' && input.data.status === 'success') {
      const __paymentResponse = await __verifyPayment({
        reference: input.data.reference,
      });
      const __payment = await PaymentModel.findOne({ code: __paymentResponse.data.reference });
      if (!__payment) throw new Error('PaymentNotFound');
      if (
        !__paymentResponse.status ||
        !__paymentResponse.data ||
        __paymentResponse.data.status !== 'success'
      ) {
        throw new Error('PaymentFailed');
      }
      if (__payment.amount !== __paymentResponse.data.amount) throw new Error('InvalidAmount');
      __payment.status = 'Successful';
      const __rental = await RentalModel.findById(__payment.rental);
      if (!__payment) throw new Error('RentalNotFound');
      __rental.paidAt = new Date();
      __rental.status = 'Paid';
      __rental.payment = __payment._id;
      await Promise.all([__payment.save(), __rental.save()]);
    }
    return true;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  verifyPayment,
};
