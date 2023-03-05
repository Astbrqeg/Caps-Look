const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const { getJobs } = require('../database/models/Job')

const getAllJobs = catchAsync(async (req, res) => {
  const data = await getJobs()
  if (data) {
    res.status(200).json({
      message: 'all jobs retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no jobs found',
      data: ''
    })
  }
})
module.exports = { getAllJobs }
