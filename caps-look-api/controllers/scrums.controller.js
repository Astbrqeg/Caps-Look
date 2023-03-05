const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const logger = require('../logger')
const {
  getScrums,
  createScrum,
  editScrum,
  ArchivedScrum,
  getScrumsMaster
} = require('../database/models/Scrums')

const getScrumsDetails = catchAsync(async (req, res) => {
  const data = await getScrums(req.body.id)
  if (data) {
    res.status(200).json({
      message: 'Scrums retrieved successfully !',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no Scrums found',
      data: ''
    })
  }
})

const getScrumMasterController = catchAsync(async (req, res) => {
  const data = await getScrumsMaster(req.body.id)
  if (data) {
    res.status(200).json({
      message: 'Scrum masters retrieved successfully!',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no Scrum masters found',
      data: ''
    })
  }
})

const addScrum = catchAsync(async (req, res) => {
  console.log(req.body)

  const addedData = await createScrum(
    req.body.scrumName,
    req.body.scrumMasterName,
    req.body.project,
    req.body.application
  )

  res.status(200).json({
    message: 'Scrum created successfully',
    data: addedData
  })

  res.status(200).json({
    message: 'Adding project is failed'
  })
})

const editScrumDetails = catchAsync(async (req, res) => {
  const data = await editScrum(
    req.params.id,
    req.body.scrumName,
    req.body.scrumMasterName,
    req.body.project,
    req.body.application
  )

  if (data) {
    res.status(200).json({
      message: 'Scrum edited successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to edit Scrum',
      data: ''
    })
  }
})

const ArchiveScrum = async (req, res) => {
  const data = await ArchivedScrum(parseInt(req.params.id))
  if (data) {
    res.status(200).json({
      message: 'Scrum archived successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to Archive Scrum',
      data: ''
    })
  }
}
module.exports = {
  getScrumsDetails,
  addScrum,
  ArchiveScrum,
  editScrumDetails,
  getScrumMasterController
}
