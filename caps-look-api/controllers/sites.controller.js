const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const logger = require('../logger')

const {
  getSites,
  getSitesDetails,
  createSite,
  editSite,
  archiveSite
} = require('../database/models/Site')

const getSitesName = catchAsync(async (req, res) => {
  const data = await getSites()
  if (data) {
    res.status(200).json({
      message: 'sites retrieved successfully',
      data: data
    })
  }
})

const creatSiteDetails = catchAsync(async (req, res) => {
  const data = await createSite(req.body.site_name, req.body.country_name)
  logger.info(
    `the site name ${req.body.site_name},${req.body.country_name},  created successfully`
  )

  if (data) {
    res.status(200).json({
      message: 'the site created successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to creat site',
      data: ''
    })
  }
})

const editSiteDetails = catchAsync(async (req, res) => {
  const data = await editSite(
    req.params.id,
    req.body.site_name,
    req.body.country_name
  )
  logger.info(
    `the data ${req.body.site_name},${req.body.country_name},${req.params.id},  edited successfully`
  )

  if (data) {
    res.status(200).json({
      message: 'the site edited successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to edit site',
      data: ''
    })
  }
})

const archiveSitesController = catchAsync(async (req, res) => {
  const data = await archiveSite(req.params.id)
  if (data) {
    res.status(200).json({
      message: 'Sites deleted successfully!',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no Sites found',
      data: ''
    })
  }
})

const getSitesController = catchAsync(async (req, res) => {
  const data = await getSitesDetails()
  if (data) {
    res.status(200).json({
      message: 'Sites retrieved successfully!',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no sites found',
      data: ''
    })
  }
})

module.exports = {
  getSitesController,
  editSiteDetails,
  archiveSitesController,
  creatSiteDetails,
  getSitesName
}
