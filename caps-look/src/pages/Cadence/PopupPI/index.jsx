import { useState, useEffect } from 'react'

import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import api from '../../../config'
const PopupPI = (props) => {
  const { PIForm, setPIForm, selectProjectState, onSubmit, refreshPISelect } =
    props
  console.log(selectProjectState)

  const [data, setData] = useState({
    pi_name: '',
    project_id: selectProjectState
  })
  useEffect(() => {
    setData({
      project_id: selectProjectState
    })
  }, [selectProjectState])
  const addPI = async () => {
    try {
      const body = data
      console.log(body)
      await fetch(`${api.apiRequest}/createPi`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      onSubmit()
      refreshPISelect()
    } catch (error) {
      throw new Error('adding Pi failed')
    }
  }
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })
  return (
    <Dialog
      visible={PIForm}
      onHide={() => {
        setPIForm(false)
      }}
      style={{
        width: '20vw'
      }}
      breakpoints={{ '960px': '75vw', '641px': '100vw' }}
    >
      <h1>PI</h1>
      <div className="flex flex-column gap-2">
        <label htmlFor="name">
          {' '}
          <strong>Name</strong>
        </label>
        <InputText
          id="PIName"
          value={data.pi_name}
          aria-describedby="PIName-help"
          style={{ marginBottom: '20px' }}
          onChange={onChange('pi_name')}
        />
      </div>

      <Button
        className={style.btn}
        id="add"
        label="add pi"
        icon="pi pi-check"
        autoFocus
        onClick={addPI}
      />
    </Dialog>
  )
}
export default PopupPI
