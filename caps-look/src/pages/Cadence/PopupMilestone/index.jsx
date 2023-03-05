import { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { InputTextarea } from 'primereact/inputtextarea'
const PopupMilestone = (prop) => {
  const {
    mileStoneForm,
    setMileStoneForm,
    selectProjectState,
    onSubmit,
    refreshMilestonesTable
  } = prop
  const [data, setData] = useState({
    milestone_name: '',
    project_id: selectProjectState,
    milestone_start_date: null,
    milestone_end_date: null,
    description: ''
  })
  useEffect(() => {
    setData({
      project_id: selectProjectState
    })
  }, [selectProjectState])
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  const addMilestone = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/createMilestone`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      onSubmit()
      refreshMilestonesTable()
    } catch (error) {
      throw new Error('adding Iteration failed')
    }
  }
  return (
    <Dialog
      visible={mileStoneForm}
      onHide={() => {
        setMileStoneForm(false)
      }}
      style={{
        width: '20vw'
      }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <h1>Milestone</h1>

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
        id="add"
        label="Add Milestone"
        icon="pi pi-check"
        autoFocus
        onClick={addMilestone}
      />
    </Dialog>
  )
}
export default PopupMilestone
