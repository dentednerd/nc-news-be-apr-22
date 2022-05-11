exports.handle404s = (req, res) => {
  res.status(404).send({ msg: 'Not found' });
};

// Note to self: Add PSQL errors as you come across them

exports.handleCustomErrors = (err, req, res, next) => {
  // console.log({ err }); // uncomment this line as needed to handle new errors
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

// eslint-disable-next-line no-unused-vars
exports.handlePSQLErrors = (err, req, res, next) => {
  // despite not being used, we need the 'next' argument in here, otherwise everything breaks
  // Paul says it's because Express identifies middleware functions as error handling functions by checking whether they have 4 args. That's heccin smart of Express if I may say so.
  switch(err.code) {
    case '22P02':
      res.status(400).send({ msg: 'Invalid params/body in request' });
      break;
    default:
      res.status(500).send({ msg: 'Unhandled server error' });
      // Because there isn't any "next" middleware after this in app.js, *and* because there's no err.status, we can send our own 500 status with a custom message here
      break;
  }
}
