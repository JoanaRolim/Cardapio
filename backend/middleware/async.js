const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fb(req, res, next)).catch(next);

module.exports = asyncHandler;
