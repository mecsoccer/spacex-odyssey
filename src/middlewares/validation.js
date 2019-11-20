/* eslint-disable camelcase */
export const validateFunding = (req, res, next) => {
  const { customer_id, amount } = req.body;
  const error = [];

  if (!Number(customer_id) || !customer_id) error.push('customer_id');
  if (!Number(amount) || !amount) error.push('amount');

  if (error.length) return res.status(400).json({ status: 'failed', error });
  req.body.amount = Number(amount);

  return next();
};

export const validateJourney = (req, res, next) => {
  const {
    customer_id, from, to, rocket,
  } = req.body;
  const error = [];

  if (!Number(customer_id) || !customer_id) error.push('customer_id');
  if (typeof from !== 'string' || !from) error.push('from');
  if (typeof to !== 'string' || !to) error.push('to');
  if (typeof rocket !== 'string' || !rocket) error.push('rocket');

  if (error.length) return res.status(400).json({ status: 'failed', error });

  return next();
};
