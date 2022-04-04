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

exports.handlePSQLErrors = (err, req, res, next) => {
  switch(err.code) {
    case '22P02':
      res.status(400).send({ msg: 'Bad request' });
      break;
    default:
      next(err);
      // Because there isn't any "next" middleware after this in app.js, *and* because there's no err.status, express will send 500 Internal Server Error
      break;
  }
}
