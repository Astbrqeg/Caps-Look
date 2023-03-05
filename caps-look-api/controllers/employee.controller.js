const catchAsync = require('../utils/catchAsync')
const ApiError = require('../utils/ApiError')
const {
  getEmployeeDetails,
  addingEmployee,
  moveEmployeeToArchive,
  editEmployee,
  importEmployee
} = require('../database/models/Employee')
const { requestWhitelist } = require('express-winston')

const getEmployeesData = catchAsync(async (req, res) => {
  console.log(2)
  const data = await getEmployeeDetails()
  if (data) {
    res.status(200).json({
      message: 'employees retrieved successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'no employees found',
      data: ''
    })
  }
})
const addingEmployeeData = catchAsync(async (req, res) => {
  const addEmployee = await addingEmployee(
    req.body.Id,
    req.body.employeeName,
    req.body.email,
    req.body.phone,
    'NA',
    req.body.siteId,
    req.body.jobId,
    req.body.accessTier
  )
  if (addEmployee) {
    res.status(200).json({
      message: 'adding employee done successfully',
      data: addEmployee
    })
  } else {
    res.status(200).json({
      message: 'failed to add employee',
      data: ''
    })
  }
})
const archiveEmployee = async (req, res) => {
  const data = await moveEmployeeToArchive(req.params.id)
  if (data) {
    res.status(200).json({
      message: 'employee moved to archived successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to move to archive',
      data: ''
    })
  }
}

const editEmployeeDetails = async (req, res) => {
  const data = await editEmployee(
    req.params.id,
    req.body.employeeName,
    req.body.Id,
    req.body.email,
    req.body.phone,
    req.body.siteId,
    req.body.jobId,
    req.body.accessTier
  )
  if (data) {
    res.status(200).json({
      message: 'edit employee details successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'failed to edit employee details',
      data: ''
    })
  }
}
const importingEmployees = catchAsync(async (req, res) => {
  const data = importEmployee(req.body)
  if (data) {
    res.status(200).json({
      message: 'import employee data  done successfully',
      data: data
    })
  } else {
    res.status(200).json({
      message: 'import employee data failed',
      data: ''
    })
  }
})
module.exports = {
  getEmployeesData,
  addingEmployeeData,
  archiveEmployee,
  editEmployeeDetails,
  importingEmployees
}
