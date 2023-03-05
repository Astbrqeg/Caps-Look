import jwtDecode from 'jwt-decode'

const isAuthorized = (role, arrOfRoles) => {
  if (arrOfRoles.includes(role)) return true
}
const getRole = (tokenLog) => {
  let isRmanager = false
  let isPmanager = false
  let isScrum = false
  let status = ''

  if (tokenLog) {
    const decoded = jwtDecode(tokenLog)
    const access_tier = decoded.access_tier

    isRmanager = access_tier.includes('resource_manager')
    isPmanager = access_tier.includes('project_manager')
    isScrum = access_tier.includes('scrum_master')

    if (isRmanager) status = 'resource_manager'
    if (isPmanager) status = 'project_manager'
    if (isScrum) status = 'scrum_master'

    return status
  }
}
export { getRole, isAuthorized }
