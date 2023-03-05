const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const logger = require('../logger')
const { getProjectIterations } = require('../database/models/Iteration')

const getIterationsData = catchAsync(async (req, res) => {
  console.log(2)
  const data = await getProjectIterations(req.body.id)
  if (data) {
    res.status(200).json({
      message: 'iteration retrieved successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no iteration found',
      data: ''
    })
  }
})

module.exports = {
  getIterationsData
}
