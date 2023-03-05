import style from './style.module.scss'
import PageContainer from '../../components/PageContainer'
import DateDropDown from '../../components/capacity/DateDropDown'
import PiDropDown from '../../components/capacity/PiDropDown'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import { RadioButton } from 'primereact/radiobutton'
import DropdownProject from '../../components/DropDownProject'
import { Dropdown } from 'primereact/dropdown'
import React, { useEffect, useState } from 'react'
import api from '../../config'
import { MultiSelect } from 'primereact/multiselect'

const Capacity = () => {
  const [category, setCategory] = useState('Pi')
  const [scrums, setScrums] = useState([])
  const [projects, setProjects] = useState([])

  const [selectedScrum, setSelectedScrum] = useState(null)
  const [selectedproject, setSelectedproject] = useState(null)

  const getScrums = async (id) => {
    try {
      const body = {
        id: id
      }
      const result = await fetch(`${api.apiRequest}/GetScrums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setScrums(res.data)
      console.log(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getProjectsName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/projects`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  useEffect(() => {
    getProjectsName()
    getScrums()
  }, [])
  if (category === 'Pi') {
    return (
      <PageContainer name={'Capicity'}>
        <div className={style.containerSelector}>
          <label>select one</label>
          <div className={style.card}>
            <div className={style.pi}>
              <RadioButton
                inputId="category1"
                name="Pi"
                value="Pi"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Pi'}
              />
              <label htmlFor="category1" className="ml2">
                Pi
              </label>
            </div>

            <div className={style.date}>
              <RadioButton
                inputId="category2"
                name="Date"
                value="Date"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Date'}
              />
              <label htmlFor="category2" className="ml2">
                Date
              </label>
            </div>
          </div>
        </div>
        <PiDropDown />
      </PageContainer>
    )
  } else if (category === 'Date') {
    return (
      <PageContainer name={'Capicity'}>
        <div className={style.containerSelector}>
          <label>select one</label>
          <div className={style.card}>
            <div className={style.pi}>
              <RadioButton
                inputId="category1"
                value="Pi"
                name="Pi"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Pi'}
              />
              <label htmlFor="category1" className="ml2">
                Pi
              </label>
            </div>

            <div className={style.date}>
              <RadioButton
                inputId="category2"
                name="Date"
                value="Date"
                onChange={(e) => {
                  setCategory(e.value)
                }}
                checked={category === 'Date'}
              />
              <label htmlFor="category2" className="ml">
                Date
              </label>
            </div>
          </div>
        </div>
        <DateDropDown />
      </PageContainer>
    )
  }

  return (
    <PageContainer name={'Capacity'}>
      <Dropdown
        id="Project"
        name="Project"
        value={selectedproject}
        options={projects}
        optionValue="id"
        optionLabel="project_name"
        placeholder="Project"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          setSelectedproject(e.value)
          getScrums(e.value)
        }}
      />
      <br />
      <MultiSelect
        id="scrums"
        name="scrum"
        value={selectedScrum}
        options={scrums}
        optionLabel="scrum_name"
        optionValue="scrum_name"
        placeholder="choose Scrum"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          setSelectedScrum(e.value)
        }}
      />
    </PageContainer>
  )
}
export default Capacity
