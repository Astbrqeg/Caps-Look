import React, { useEffect, useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import api from '../../../config'
import { Messages } from 'primereact/messages'

export default function EditPopUpMessage(props) {
  const [application, setApplication] = React.useState([{}])
  const [editData, setEditData] = React.useState({
    scrumName: props.source.scrum_name,
    scrumMasterName: props.source.scrum_master_id,
    project: props.selectedProject.id,
    application: props.source.app_id
  })
  const msgs = useRef(null)
  const onChange = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

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
  const updateScrum = async () => {
    const body = editData
    console.log(body)
    console.log('body : ' + body + ' Id : ' + props.source.scrum_id)
    try {
      let message = ''
      if (!(editData.scrumName.length > 1 && editData.scrumName.length < 15)) {
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
      } else if (!/^[A-Za-z]*$/.test(editData.scrumName)) {
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
      await fetch(`${api.apiRequest}/EditScrum/${props.source.scrum_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      props.onSubmit()
    } catch (err) {
      throw new Error('failed to connect to the server,')
    }
  }

  useEffect(() => {
    getApplications(props.selectedProject.id)
  }, [])

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
        value={editData.scrumName}
        name="ScrumName"
        required
        onChange={onChange('scrumName')}
      />
      <br />
      <Dropdown
        id="ScrumMasterName"
        name="Scrum_Master"
        value={editData.scrumMasterName}
        options={props.scrumMaster}
        optionValue="id"
        optionLabel="employee_name"
        placeholder="Scrum master name"
        required
        className="w-full md:w-14rem"
        onChange={onChange('scrumMasterName')}
      />
      <br />
      <Dropdown
        id="Project"
        name="Project"
        value={editData.project}
        options={props.Project}
        optionValue="id"
        optionLabel="project_name"
        placeholder="Project"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          getApplications(e.value)
          onChange('project')(e)
        }}
      />
      <br />
      <Dropdown
        id="Application"
        name="Application"
        value={editData.application}
        options={application}
        optionValue="id"
        optionLabel="application_name"
        placeholder="Application"
        required
        className="w-full md:w-14rem"
        onChange={(e) => {
          onChange('application')(e)
        }}
      />
      <br />
      <Button
        id="Edit"
        label="Edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateScrum}
      />
      <Messages ref={msgs} />
    </div>
  )
}
