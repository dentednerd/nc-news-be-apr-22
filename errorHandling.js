exports.handle404s = (req, res, next) => {
  res.status(404).send({ msg: 'Not found' });
};
