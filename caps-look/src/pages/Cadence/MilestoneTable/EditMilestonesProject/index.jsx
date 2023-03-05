import { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import api from '../../../../config'
import { InputTextarea } from 'primereact/inputtextarea'
const EditMilestonesProject = (props) => {
  const [data, setData] = useState({
    milestone_name: props.source.milestone_name,
    project_id: props.source.project_id,
    milestone_start_date: new Date(props.source.milestone_start_date),
    milestone_end_date: new Date(props.source.milestone_end_date),
    description: props.source.description
  })

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  const editMilestone = async () => {
    try {
      const body = data
      console.log(data)
      console.log(props.source.id)
      await fetch(`${api.apiRequest}/editMilestone/${props.source.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.onSubmit()
      props.refreshMilestonesTable()
    } catch (error) {
      throw new Error('edit milestone failed')
    }
  }
  return (
    <>
      <h1>Edit Milestone</h1>

      <div className="flex flex-column gap-2">
        <label htmlFor="name">
          <strong>Name</strong>
        </label>
        <InputText
          id="MilestoneName"
          value={data.milestone_name}
          aria-describedby="MilestoneName-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('milestone_name')}
        />
      </div>

      <label for="">
        <b>Start date</b>
      </label>
      <Calendar
        style={{ marginBottom: '20px' }}
        inputId="start_iteration"
        value={data.milestone_start_date}
        onChange={onChange('milestone_start_date')}
        placeholder={` `}
      />
      <label for="psw">
        <b>End date</b>
      </label>
      <Calendar
        style={{ marginBottom: '20px' }}
        inputId="start_iteration"
        value={data.milestone_end_date}
        onChange={onChange('milestone_end_date')}
        placeholder={` `}
      />
      <div className="flex flex-column gap-2">
        <label htmlFor="description">
          <strong>Description</strong>
        </label>
        <InputTextarea
          id="MilestoneDiscription"
          value={data.description}
          aria-describedby="MilestoneDiscription-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('description')}
          rows={5}
          cols={30}
        />
      </div>
      <Button
        className={style.btn}
        id="edit"
        label="edit Milestone"
        icon="pi pi-check"
        autoFocus
        onClick={editMilestone}
      />
    </>
  )
}
export default EditMilestonesProject
