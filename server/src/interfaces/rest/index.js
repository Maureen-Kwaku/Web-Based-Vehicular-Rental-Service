const bodyParser = require('body-parser');
const payments = require('../../domains/payment/actions');
const crypto = require('crypto');

exports.startRest = function (app) {
  app.use(function (_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, authorization, HTTP_VERIF_HASH',
    );
    next();
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/health', function (_, res) {
    return res.sendStatus(200);
  });

  app.post('/v1/paystack/verify', async function (req, res) {
    try {
      console.log('called');
      const ips = ['52.31.139.75', '52.49.173.169', '52.214.14.220'];
      if (!ips.includes(req.headers['x-forwarded-for'])) throw new Error('InvalidIp');
      const hash = crypto
        .createHmac('sha512', process.env.PAYMENT_SECRET)
        .update(JSON.stringify(req.body))
        .digest('hex');

      if (hash === req.headers['x-paystack-signature']) {
        await payments.verifyPayment(req.body);
      } else {
        throw new Error('InvalidHash');
      }
    } catch (err) {
      console.log(err);
    } finally {
      res.sendStatus(200);
    }
  });
  return app;
};
