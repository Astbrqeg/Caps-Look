import { useState, useEffect } from 'react'

import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import { Calendar } from 'primereact/calendar'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import api from '../../../../config'

const EditIterationsPi = (props) => {
  const [data, setData] = useState({
    iteration_name: props.source.iteration_name,
    project_id: props.source.project_id,
    pi_id: props.source.pi_id,
    iteration_number: props.source.iteration_number,
    iteration_start_date: new Date(props.source.iteration_start_date),
    iteration_end_date: new Date(props.source.iteration_end_date)
  })
  console.log(data)
  console.log(props.source.id)
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const editIteration = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/editIteration/${props.source.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.onSubmit()
      props.refreshPITable()
    } catch (error) {
      throw new Error('adding Iteration failed')
    }
  }

  return (
    <>
      <h1>Edit Iteration</h1>

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
        label="Edit iteration"
        icon="pi pi-check"
        autoFocus
        onClick={editIteration}
      />
    </>
  )
}
export default EditIterationsPi
