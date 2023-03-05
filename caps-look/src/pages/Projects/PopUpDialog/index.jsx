import React, { useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'
import { Messages } from 'primereact/messages'

export default function PopUpMessage(props) {
  const [data, setData] = React.useState({
    ProjectName: '',
    StartDate: '',
    PiNumber: ''
  })
  const msgs = useRef('null')
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createProject = async () => {
    try {
      const body = data
      const result = await fetch(`${api.apiRequest}/AddingProject`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const resultBody = await result.json()

      props.refresh()
      props.onSubmit()

      if (resultBody.message === 'Please Insert a name for the project') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message === 'Please Insert number of Pi') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message === 'Please Insert starting date for the project'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message === 'Field are missing Please insert required data'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message === 'Please insert a legal project name') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message ===
        'Name of project should be more than one letter and less than 20 letters'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message === 'Date of the project shouldnt be from the past'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (
        resultBody.message === 'PI should be a number between 1 and 99'
      ) {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message === 'PI should be a whole number') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      } else if (resultBody.message === 'Please Insert data') {
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: resultBody.message,
            closable: true
          }
        ])
      }
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
        id="ProjectName"
        value={data.ProjectName}
        name="ProjectName"
        placeholder="ProjectName"
        required
        onChange={onChange('ProjectName')}
      />
      <br />
      <InputText
        id="PiNumber"
        value={data.PiNumber}
        type="number"
        name="PiNumber"
        placeholder="Pi Number"
        style={{ width: '208px' }}
        required
        onChange={onChange('PiNumber')}
      />
      <br />
      <Calendar
        id="icon"
        value={data.StartDate}
        onChange={onChange('StartDate')}
        showIcon
        name="StartDate"
        placeholder="choose date"
        required
        style={{ width: '208px' }}
      />
      <br />
      <br />
      <Button
        id="add"
        label="add project"
        icon="pi pi-check"
        autoFocus
        onClick={createProject}
      />
      <Messages ref={msgs} />
    </div>
  )
}
