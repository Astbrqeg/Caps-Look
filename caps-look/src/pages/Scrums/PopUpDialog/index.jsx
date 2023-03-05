import React, { useState, useRef, useEffect } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { Messages } from 'primereact/messages'
import { Dropdown } from 'primereact/dropdown'

export default function PopUpMessage(props) {
  const [selectedproject, setSelectedproject] = useState(null)
  const [application, setApplication] = useState([{}])
  const [selectedApp, setSelectedApp] = useState(null)
  const [data, setData] = React.useState({
    scrumName: '',
    scrumMasterName: '',
    project: [],
    application: []
  })
  const msgs = useRef('null')
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const getApplications = async (id) => {
    try {
      const body = {
        id: id
      }
      const result = await fetch(`${api.apiRequest}/GetApplicationName`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setApplication(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const createScrum = async () => {
    try {
      const body = data
      let message = ''
      const requiredFields = [
        'scrumName',
        'scrumMasterName',
        'project',
        'application'
      ]
      const hasEmptyFields = requiredFields.some((field) => !data[field])

      if (hasEmptyFields) {
        message = 'Fields  are missing Please insert required data'
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: message,
            closable: true
          }
        ])
      } else if (!(data.scrumName.length > 1 && data.scrumName.length < 15)) {
        message = ' scrum name should be between 1 to 15 characters'
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: message,
            closable: true
          }
        ])
      } else if (!/^[A-Za-z]*$/.test(data.scrumName)) {
        message = 'Characters must be only in english'
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: message,
            closable: true
          }
        ])
      }
      await fetch(`${api.apiRequest}/addScrum`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.onSubmit()
    } catch (err) {
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: err,
          closable: true
        }
      ])
    }
  }

  return (
    <div
      className="card flex justify-content-center"
      style={{
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        alignItems: 'center'
      }}
    >
      <InputText
        id="ScrumName"
        value={data.scrumName}
        name="ScrumName"
        placeholder="ScrumName"
        required
        onChange={onChange('scrumName')}
      />
      <br />
      <Dropdown
        id="ScrumMasterName"
        name="Scrum_Master"
        value={data.scrumMasterName}
        options={props.scrumMaster}
        optionLabel="employee_name"
        optionValue="id"
        placeholder="Scrum master name"
        required
        className="w-full md:w-14rem"
        onChange={onChange('scrumMasterName')}
      />
      <br />
      <Dropdown
        id="Project"
        name="Project"
        value={selectedproject}
        options={props.Project}
        optionValue="id"
        optionLabel="project_name"
        placeholder="Project"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          setSelectedproject(e.value)
          getApplications(e.value)
          onChange('project')(e)
        }}
      />
      <br />
      <Dropdown
        id="Application"
        name="Application"
        value={selectedApp}
        options={application}
        optionLabel="application_name"
        optionValue="id"
        placeholder="Application"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          setSelectedApp(e.value)
          onChange('application')(e)
        }}
      />
      <br />
      <Button
        id="add"
        label="Add Scrum"
        icon="pi pi-check"
        autoFocus
        onClick={createScrum}
      />
      <Messages ref={msgs} />
    </div>
  )
}
