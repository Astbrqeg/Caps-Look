const router = require('express').Router()
const generalController = require('./controllers/general.controller')
const projectController = require('./controllers/projects.controller')
const absenceController = require('./controllers/absences.controller')
const siteController = require('./controllers/sites.controller')
const loginController = require('./controllers/login.controller')
const scrumsController = require('./controllers/scrums.controller')
const applicationController = require('./controllers/application.controller')
const authorizeMiddleware = require('./middleware/authorization')
const verifyToken = require('./middleware/verifyUser')
const auth = require('./controllers/auth.controller')
const employeeController = require('./controllers/employee.controller')
const jobController = require('./controllers/job.controller')
const homecontroller = require('./controllers/home.controller')
const capacityController = require('./controllers/capacity.controller')
router.get('/', generalController.home)
router.put('/EditProject/:id', projectController.editProjectDetails)
router.post('/login', loginController)
router.get('/Employee', employeeController.getEmployeesData)
router.post('/addingEmployee', employeeController.addingEmployeeData)
router.put('/ArchiveEmployee/:id', employeeController.archiveEmployee)
router.get('/Sites', siteController.getSitesName)
router.get('/Jobs', jobController.getAllJobs)
router.put('/editEmployeeDetails/:id', employeeController.editEmployeeDetails)

router.post(
  '/pi',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  capacityController.getIterationsData
)

router.get(
  '/projects',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.getProjectsController
)
router.get(
  '/ProjectPage',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.showProjectsData
)
router.post(
  '/AddingProject',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.addingProject
)

router.get('/Logout', auth.logout)

router.get(
  '/GetPlannedSiteMix/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.getProjectSiteMixController
)

router.put(
  '/UpdatePlannedSiteMix',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.updateProjectSiteMixController
)

router.get(
  '/GetActualSiteMix/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.getActualSiteMixController
)

router.get(
  '/home/projectStartDay/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  homecontroller.getStartDayController
)
router.get(
  '/home/projectCountEmployees/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  homecontroller.getCountEmployeesControllers
)

router.get(
  '/home/projectCountIterations/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  homecontroller.getCountIterationsController
)
router.get(
  '/home/projectCountScrums/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  homecontroller.getCountScrumsController
)
router.get(
  '/home/projectCountSites/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  homecontroller.getCountSitesController
)

router.get(
  '/sitesDetails',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  siteController.getSitesController
)

router.put(
  '/editsite/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  siteController.editSiteDetails
)

router.post(
  '/createsite',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  siteController.creatSiteDetails
)

router.put(
  '/archiveSite/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  siteController.archiveSitesController
)

router.put(
  '/Archive/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  projectController.moveToArchive
)

router.get(
  '/absences',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.getAbsencesController
)

router.post(
  '/addingAbsence',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.addingAbsence
)

router.post(
  '/importAbsence',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.importingAbsence
)

router.get(
  '/getAbsenceSites',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.reqAbsenceSites
)

router.put(
  '/archiveAbsence/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.archiveAbsence
)

router.put(
  '/EditAbsence/:id',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  absenceController.editAbsenceDetails
)

router.post(
  '/GetScrums',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  scrumsController.getScrumsDetails
)
router.post(
  '/AddScrum',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  scrumsController.addScrum
)
router.put('/EditScrum/:id', scrumsController.editScrumDetails)

router.put('/ArchiveScrum/:id', scrumsController.ArchiveScrum)

router.get(
  '/GetScrumMaster',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  scrumsController.getScrumMasterController
)

router.post(
  '/GetApplicationName',
  verifyToken,
  authorizeMiddleware(['scrum_master', 'project_manager', 'resource_manager']),
  applicationController.getApplicationController
)

router.post('/importEmployees', employeeController.importingEmployees)

module.exports = router
