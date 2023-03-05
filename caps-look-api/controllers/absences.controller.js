const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const {
  getAbsences,
  archiveSelectedAbsence,
  editAbsence,
  createAbsence,
  getAbsenceSites,
  importingAbsences
} = require('../database/models/Absence')

const logger = require('../logger')

const getAbsencesController = catchAsync(async (req, res) => {
  const data = await getAbsences()
  if (data) {
    res.status(200).json({
      message: 'all Absences retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no Absences found',
      data: ''
    })
  }
})

const addingAbsence = catchAsync(async (req, res) => {
  const addedData = await createAbsence(
    req.body.absenceName,
    req.body.siteId,
    req.body.mandatory,
    new Date(req.body.startDate),
    new Date(req.body.endDate)
  )
  logger.info(
    `the data ${req.body.absence_name}, ${req.body.site_id}, ${req.body.absence_start_date}, ${req.body.absence_end_date}, ${req.body.mandatory} inserted successfully`
  )
  if (addedData) {
    res.status(200).json({
      message: 'create Absence is done successfully',
      data: addedData
    })
  } else {
    res.status(200).json({
      message: 'Adding Absence is failed'
    })
  }
})
const importingAbsence = catchAsync(async (req, res) => {
  const addedData = importingAbsences(req.body)
  console.log(req.body)
  logger.info(
    `the data ${req.body.absence_name}, ${req.body.site_id}, ${req.body.absence_start_date}, ${req.body.absence_end_date}, ${req.body.mandatory} inserted successfully`
  )
  if (addedData) {
    res.status(200).json({
      message: 'create Absence is done successfully',
      data: addedData
    })
  } else {
    res.status(200).json({
      message: 'Adding Absence is failed'
    })
  }
})

const reqAbsenceSites = catchAsync(async (req, res) => {
  const data = await getAbsenceSites()
  if (data) {
    res.status(200).json({
      message: 'all Absences retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no Absences found',
      data: ''
    })
  }
})

const archiveAbsence = catchAsync(async (req, res) => {
  const data = await archiveSelectedAbsence(req.params.id)
  if (data) {
    res.status(200).json({
      message: 'Absences retrieved successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no absence found',
      data: ''
    })
  }
})

const editAbsenceDetails = catchAsync(async (req, res) => {
  const data = await editAbsence(
    req.params.id,
    req.body.absenceName,
    req.body.siteId,
    req.body.mandatory,
    new Date(req.body.startDate),
    new Date(req.body.endDate)
  )
  logger.info(
    `the data ${req.body.AbsenceName},${req.body.PiNumber},${req.body.StartDate} edited successfully`
  )

  if (data) {
    res.status(200).json({
      message: 'the Absence edited successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to edit Absence',
      data: ''
    })
  }
})

module.exports = {
  getAbsencesController,
  addingAbsence,
  reqAbsenceSites,
  archiveAbsence,
  editAbsenceDetails,
  importingAbsence
}
