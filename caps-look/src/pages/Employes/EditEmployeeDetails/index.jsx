import React, { useRef } from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { Dropdown } from 'primereact/dropdown'
import { Messages } from 'primereact/messages'

export default function EditEmployeeDetails(props) {
  const msgs = useRef(null)

  const [editData, setEditData] = React.useState({
    Id: props.source.id_number,
    employeeName: props.source.employee_name,
    email: props.source.email,
    phone: props.source.phone,
    siteId: props.source.site_id,
    jobId: props.source.job_id,
    accessTier: props.source.access_tier
  })
  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateEmployeeRow = async () => {
    const body = editData
    let message = ''
    if (
      !(editData.employeeName.length > 1 && editData.employeeName.length < 15)
    ) {
      message = 'The employee name should be between 1 to 15 characters'
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: message,
          closable: true
        }
      ])
    } else if (!/^[A-Za-z]*$/.test(editData.employeeName)) {
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
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(editData.email)
    ) {
      message = 'format email must be name@gmail.com'
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: message,
          closable: true
        }
      ])
    } else if (!(editData.email.length > 1 && editData.email.length < 30)) {
      message = 'email is too long'
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: message,
          closable: true
        }
      ])
    } else if (!(editData.phone.length >= 10 && editData.phone.length <= 15)) {
      message = 'phone number must be between 10 and 15 numbers'
      return msgs.current.show([
        {
          sticky: false,
          severity: 'error',
          summary: '',
          detail: message,
          closable: true
        }
      ])
    } else if (!/^[0-9]*$/.test(editData.phone)) {
      message = 'phone number must only numbers'
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
    try {
      await fetch(`${api.apiRequest}/editEmployeeDetails/${props.source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      props.updateState()
      props.onSubmit()
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
        id="Id"
        value={editData.Id}
        name="Id"
        placeholder="ID Number"
        required
        onChange={onChangeData('Id')}
      />
      <br />
      <InputText
        id="employeeName"
        value={editData.employeeName}
        type="text"
        name="employeeName"
        placeholder="employee Name"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('employeeName')}
      />
      <br />
      <InputText
        id="email"
        value={editData.email}
        type="text"
        name="email"
        placeholder="email"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('email')}
      />
      <br />
      <InputText
        id="phone"
        value={editData.phone}
        type="text"
        name="phone"
        placeholder="phone"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('phone')}
      />
      <br />
      <Dropdown
        value={editData.siteId}
        onChange={onChangeData('siteId')}
        options={props.sites}
        optionLabel="site_name"
        optionValue="id"
        placeholder="Select site"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={editData.jobId}
        onChange={onChangeData('jobId')}
        options={props.jobs}
        optionLabel="job_name"
        placeholder="Select job"
        optionValue="id"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={editData.accessTier}
        onChange={onChangeData('accessTier')}
        options={props.arr}
        optionLabel="access_tier"
        optionValue="access_tier"
        placeholder="Select tier"
        className="w-full md:w-14rem"
      />
      <br />
      <Button
        id="edit"
        label="edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateEmployeeRow}
      />
      <Messages ref={msgs} />
    </div>
  )
}
