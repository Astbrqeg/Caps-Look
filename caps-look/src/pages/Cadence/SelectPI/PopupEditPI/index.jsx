import { useState, useEffect } from 'react'
import style from './style.module.scss'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import api from '../../../../config'

const PopupEditPI = (props) => {
  const [data, setData] = useState({
    pi_name: props.source.pi_name,
    project_id: props.source.project_id
  })
  console.log(data)
  console.log(props.source.id)
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const addPI = async () => {
    try {
      const body = data
      await fetch(`${api.apiRequest}/editPi/${props.source.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.onSubmit()
      props.refreshPISelect()
    } catch (error) {
      throw new Error('editing PI failed')
    }
  }

  return (
    <>
      <h1>Edit PI</h1>

      <div className="flex flex-column gap-2">
        <label htmlFor="name">
          <strong>Name </strong>
        </label>
        <InputText
          id="PIName"
          value={data.pi_name}
          aria-describedby="piName-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('pi_name')}
        />
      </div>

      <Button
        className={style.btn}
        id="edit"
        label="Edit PI"
        icon="pi pi-check"
        autoFocus
        onClick={addPI}
      />
    </>
  )
}
export default PopupEditPI
