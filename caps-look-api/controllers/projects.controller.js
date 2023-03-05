const ApiError = require('../utils/ApiError')
const catchAsync = require('../utils/catchAsync')
const { createProject } = require('../database/models/Project')
const {
  getProjects,
  getProjectsDetails,
  editProject,
  getProjectSiteMix,
  updateProjectSiteMix,
  getActualSiteMix,
  archivedProject
} = require('../database/models/Project')
const logger = require('../logger')

const getProjectsController = catchAsync(async (req, res) => {
  const data = await getProjects()
  if (data) {
    res.status(200).json({
      message: 'all projects retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no projects found',
      data: ''
    })
  }
})

const showProjectsData = catchAsync(async (req, res) => {
  const data = await getProjectsDetails()
  if (data) {
    res.status(200).json({
      message: 'projects retrieved successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no projects found',
      data: ''
    })
  }
})

const editProjectDetails = catchAsync(async (req, res) => {
  const data = await editProject(
    req.body.ProjectName,
    req.body.PiNumber,
    req.body.StartDate,
    req.params.id
  )
  logger.info(
    `the data ${req.body.ProjectName},${req.body.PiNumber},${req.body.StartDate},${req.body.plannedMix}  edited successfully`
  )

  if (data) {
    res.status(200).json({
      message: 'the project edited successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to edit project',
      data: ''
    })
  }
})

const addingProject = catchAsync(async (req, res) => {
  let regPattern = /^[A-Za-z0-9]*$/
  let today = new Date()
  let dd = String(today.getDate()).padStart(2, '0')
  let mm = String(today.getMonth() + 1).padStart(2, '0')
  let yyyy = today.getFullYear()
  today = mm + '/' + dd + '/' + yyyy
  if (
    req.body.ProjectName !== '' &&
    regPattern.test(req.body.ProjectName) &&
    req.body.ProjectName.length > 1 &&
    req.body.ProjectName.length < 20 &&
    req.body.StartDate !== null &&
    new Date(req.body.StartDate) >= new Date(today) &&
    req.body.PiNumber !== null &&
    req.body.PiNumber >= 1 &&
    req.body.PiNumber < 100 &&
    !req.body.PiNumber.includes('.')
  ) {
    const addedData = await createProject(
      req.body.ProjectName,
      req.body.StartDate,
      req.body.PiNumber
    )

    res.status(200).json({
      message: 'create project done successfully',
      data: addedData
    })
  } else if (
    req.body.ProjectName == '' &&
    req.body.StartDate !== null &&
    req.body.PiNumber !== null
  ) {
    res.status(200).json({
      message: 'Please Insert a name for the project'
    })
  } else if (
    req.body.ProjectName !== '' &&
    req.body.PiNumber == null &&
    req.body.StartDate !== null
  ) {
    res.status(200).json({
      message: 'Please Insert number of Pi'
    })
  } else if (
    req.body.ProjectName !== '' &&
    req.body.StartDate == null &&
    req.body.PiNumber !== null
  ) {
    res.status(200).json({
      message: 'Please Insert starting date for the project'
    })
  } else if (
    (req.body.ProjectName == '' &&
      req.body.StartDate == null &&
      req.body.PiNumber !== null) ||
    (req.body.ProjectName == '' &&
      req.body.StartDate !== null &&
      req.body.PiNumber == null) ||
    (req.body.ProjectName !== '' &&
      req.body.StartDate == null &&
      req.body.PiNumber == null)
  ) {
    res.status(200).json({
      message: 'Field are missing Please insert required data'
    })
  } else if (!regPattern.test(req.body.ProjectName)) {
    res.status(200).json({
      message: 'Please insert a legal project name'
    })
  } else if (
    req.body.ProjectName.length <= 1 ||
    req.body.ProjectName.length >= 20
  ) {
    res.status(200).json({
      message:
        'Name of project should be more than one letter and less than 20 letters'
    })
  } else if (new Date(req.body.StartDate) < new Date(today)) {
    res.status(200).json({
      message: 'Date of the project shouldnt be from the past'
    })
  } else if (req.body.PiNumber < 1 || req.body.PiNumber >= 100) {
    res.status(200).json({
      message: 'PI should be a number between 1 and 99'
    })
  } else if (req.body.PiNumber.includes('.')) {
    res.status(200).json({
      message: 'PI should be a whole number'
    })
  } else if (
    req.body.ProjectName == '' &&
    req.body.StartDate == null &&
    req.body.PiNumber == null
  ) {
    res.status(200).json({
      message: 'Please Insert data'
    })
  } else {
    res.status(200).json({
      message: 'Adding project is failed !'
    })
  }
})

const getProjectSiteMixController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await getProjectSiteMix(projectId)

  if (data) {
    res.status(200).json({
      message: 'site mix retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})

const updateProjectSiteMixController = catchAsync(async (req, res) => {
  const { projectId, planMix } = req.body
  const data = await updateProjectSiteMix({ projectId, planMix })
  if (data) {
    res.status(200).json({
      message: 'site mix updated succesfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'site mix update failed',
      data: ''
    })
  }
})

const getActualSiteMixController = catchAsync(async (req, res) => {
  const projectId = req.params.id
  const data = await getActualSiteMix(projectId)

  if (data) {
    res.status(200).json({
      message: 'actual site mix retrieved successfully.',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'project id not found',
      data: ''
    })
  }
})
const moveToArchive = async (req, res) => {
  const data = await archivedProject(parseInt(req.params.id))
  if (data) {
    res.status(200).json({
      message: 'the project moved to archived successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to move to archived',
      data: ''
    })
  }
}
module.exports = {
  getProjectsController,
  addingProject,
  showProjectsData,
  editProjectDetails,
  getProjectSiteMixController,
  updateProjectSiteMixController,
  getActualSiteMixController,
  moveToArchive
}
