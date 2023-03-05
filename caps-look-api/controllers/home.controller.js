const db = require('../database/connection')
const catchAsync = require('../utils/catchAsync')
//const ApiError = require('../utils/ApiError');

const {
  count_iterations,
  count_scrums,
  count_sites,
  startDay,
  count_employees
} = require('../database/models/Homepage')

const getStartDayController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await startDay(projectId)

  if (data) {
    res.status(200).json({
      message: 'project start day retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})

const getCountScrumsController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await count_scrums(projectId)

  if (data) {
    res.status(200).json({
      message: 'project Scrums numbers retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})

const getCountIterationsController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await count_iterations(projectId)

  if (data) {
    res.status(200).json({
      message: 'project Iterations Number retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})

const getCountEmployeesControllers = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await count_employees(projectId)

  if (data) {
    res.status(200).json({
      message: 'project Employees Number retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})

const getCountSitesController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await count_sites(projectId)

  if (data) {
    res.status(200).json({
      message: 'project Sites Number retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})
module.exports = {
  getStartDayController,
  getCountIterationsController,
  getCountScrumsController,
  getCountSitesController,
  getCountEmployeesControllers
}
