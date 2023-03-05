import React, { useState, useEffect } from 'react'
import style from './style.module.scss'
import api from '../../config'
import { Dropdown } from 'primereact/dropdown'

const DropdownProject = (props) => {
  const [projects, setProjects] = useState([])
  const [data, setData] = useState({
    project_name: ''
  })

  const projects_mapped = []

  const fetchProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/projects`, {
        credentials: 'include'
      })
      const res = await result.json()
      const dataItems = res.data.map((item) => ({
        label: item.project_name,
        value: item
      }))
      setProjects(dataItems)
    } catch (err) {
      setProjects([])
      throw new Error('No data found !!!')
    }
  }
  useEffect(() => {
    fetchProjects()
  }, [])
  const onChange = (key) => (e) => {
    setData({ ...data, [key]: e.target.value })
    props.setProjId(e.target.value.id)
  }

  return (
    <div
      className={style.container}
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Dropdown
        value={data.project_name}
        onChange={onChange('project_name')}
        options={projects}
        optionLabel="label"
        optionValue="value"
        placeholder="Select a project"
      />
    </div>
  )
}
export default DropdownProject
