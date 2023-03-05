import style from './style.module.scss'
import { TreeSelect } from 'primereact/treeselect'
import { useState, useEffect } from 'react'
import api from '../../../config'
const SelectProject = ({
  selectProjectState,
  setSelectProjectState,
  visibilityPIMilestoneButton,
  setVisibilityPIMilestoneButton
}) => {
  const [projects, setProjects] = useState([{}])
  const getProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/ProjectPage`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  useEffect(() => {
    getProjects()
  }, [])

  const projectsList = projects.map((proj) => {
    return { key: proj.id, label: proj.project_name }
  })
  return (
    // <select>
    //   {projects.map((project) => {
    //     return <option>{project}</option>
    //   })}
    // </select>
    <TreeSelect
      value={selectProjectState}
      onChange={(e) => {
        setSelectProjectState(e.value)
        setVisibilityPIMilestoneButton('visible')
      }}
      options={projectsList}
      className={style.selectProject}
      placeholder="Select project"
    ></TreeSelect>
  )
}

export default SelectProject
