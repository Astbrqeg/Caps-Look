import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import api from '../../../config'

export default function EditPopUpMessage(props) {
  const [editData, setEditData] = React.useState({
    ProjectName: props.source.project_name,
    PiNumber: props.source.iteration_number,
    StartDate: new Date(props.source.start_date)
  })

  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateProject = async () => {
    const body = editData
    try {
      await fetch(`${api.apiRequest}/EditProject/${props.source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      props.onSubmit()
      props.refresh()
    } catch (err) {
      throw new Error('failed to connect to the server,')
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
        id="pname"
        value={editData.ProjectName}
        name="ProjectName"
        onChange={onChangeData('ProjectName')}
      />

      <br />
      <InputText
        id="PiNumber"
        value={editData.PiNumber}
        type="number"
        name="PiNumber"
        style={{ width: '208px' }}
        onChange={onChangeData('PiNumber')}
      />
      <br />
      <Calendar
        id="icon"
        value={editData.StartDate}
        onChange={onChangeData('StartDate')}
        showIcon
        name="StartDate"
        dateFormat="dd/mm/yy"
        style={{ width: '208px' }}
      />
      <br />
      <br />
      <Button
        id="Edit"
        label="Edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateProject}
      />
    </div>
  )
}
