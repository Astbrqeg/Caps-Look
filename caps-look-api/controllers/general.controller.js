const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const home = catchAsync((req, res) => {
  res.send('Hello, World!')
})

// this is an example of how to use the ApiError class
const errorExample = catchAsync((req, res) => {
  throw new ApiError(500, 'Eshi enfajar')
})

module.exports = {
  home,
  errorExample
}
