import { useState, useEffect } from 'react'

import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import api from '../../../config'
const Popupiteration = (prop) => {
  const {
    iterationForm,
    setIterationForm,
    selectPIState,
    selectProjectState,
    onSubmit,
    refreshPITable
  } = prop
  const [data, setData] = useState({
    iteration_name: '',
    project_id: selectProjectState,
    pi_id: selectPIState,
    iteration_number: null,
    iteration_start_date: null,
    iteration_end_date: null
  })
  console.log(data)
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  useEffect(() => {
    setData({
      project_id: selectProjectState,
      pi_id: selectPIState
    })
  }, [selectProjectState, selectPIState])
  const addIteration = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/createIteration`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      onSubmit()
      refreshPITable()
    } catch (error) {
      throw new Error('adding Iteration failed')
    }
  }

  return (
    <Dialog
      visible={iterationForm}
      onHide={() => {
        setIterationForm(false)
      }}
      style={{
        width: '20vw'
      }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <h1>iteration</h1>

      <div className="flex flex-column gap-2">
        <label htmlFor="name">
          <strong>Name</strong>
        </label>
        <InputText
          id="iterationName"
          value={data.iteration_name}
          aria-describedby="iterationName-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('iteration_name')}
        />
      </div>

      <div className="flex flex-column gap-2">
        <label htmlFor="numberOfIteration">
          <strong>Number of iteration</strong>
        </label>
        <InputText
          id="iterationNumber"
          value={data.iteration_number}
          aria-describedby="iterationName-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('iteration_number')}
        />
      </div>

      <label for="startDate">
        <b>Start date</b>
      </label>
      <Calendar
        style={{ marginBottom: '20px' }}
        inputId="start_iteration"
        value={data.iteration_start_date}
        onChange={onChange('iteration_start_date')}
        placeholder={` `}
      />
      <label for="endDate">
        <b>End date</b>
      </label>
      <Calendar
        style={{ marginBottom: '20px' }}
        inputId="end_iteration"
        value={data.iteration_end_date}
        onChange={onChange('iteration_end_date')}
        placeholder={` `}
      />
      <Button
        className={style.btn}
        id="add"
        label="add iteration"
        icon="pi pi-check"
        autoFocus
        onClick={addIteration}
      />
    </Dialog>
  )
}
export default Popupiteration
