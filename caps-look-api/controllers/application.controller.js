const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const logger = require('../logger')
const { getApplicationsByProjectId } = require('../database/models/Application')

const getApplicationController = catchAsync(async (req, res) => {
  const data = await getApplicationsByProjectId(req.body.id)
  if (data) {
    res.status(200).json({
      message: 'all Application retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no projects found !',
      data: ''
    })
  }
})

module.exports = {
  getApplicationController
}
