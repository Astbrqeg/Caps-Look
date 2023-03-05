import React from 'react'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import { Dropdown } from 'primereact/dropdown'
import { Messages } from 'primereact/messages'
import { useRef } from 'react'

export default function AddEmployeePopUp(props) {
  const msgs = useRef(null)
  const [data, setData] = React.useState({
    Id: '',
    employeeName: '',
    email: '',
    phone: '',
    siteId: null,
    jobId: null,
    accessTier: null
  })

  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const addEmployee = async () => {
    try {
      const body = data
      let message = ''
      const requiredFields = [
        'Id',
        'employeeName',
        'email',
        'phone',
        'siteId',
        'jobId',
        'accessTier'
      ]
      const hasEmptyFields = requiredFields.some((field) => !data[field])

      if (hasEmptyFields) {
        message = 'Fields  are missing Please insert required data'
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
        !(data.employeeName.length > 1 && data.employeeName.length < 15)
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
      } else if (!/^[A-Za-z]*$/.test(data.employeeName)) {
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
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
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
      } else if (!(data.email.length > 1 && data.email.length < 30)) {
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
      } else if (!(data.phone.length >= 10 && data.phone.length <= 15)) {
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
      } else if (!/^[0-9]*$/.test(data.phone)) {
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

      await fetch(`${api.apiRequest}/addingEmployee`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.updateState()
      props.onSubmit()
    } catch (error) {
      throw new Error('adding employee failed')
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
        value={data.Id}
        name="Id"
        placeholder="ID Number"
        required
        onChange={onChange('Id')}
      />
      <br />
      <InputText
        id="employeeName"
        value={data.employeeName}
        type="text"
        name="employeeName"
        placeholder="employee Name"
        style={{ width: '208px' }}
        required
        onChange={onChange('employeeName')}
      />
      <br />
      <InputText
        id="email"
        value={data.email}
        type="text"
        name="email"
        placeholder="email"
        style={{ width: '208px' }}
        required
        onChange={onChange('email')}
      />
      <br />
      <InputText
        id="phone"
        value={data.phone}
        type="text"
        name="phone"
        placeholder="phone"
        style={{ width: '208px' }}
        required
        onChange={onChange('phone')}
      />
      <br />
      <Dropdown
        value={data.siteId}
        onChange={onChange('siteId')}
        options={props.sites}
        optionLabel="site_name"
        optionValue="id"
        placeholder="Select site"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={data.jobId}
        onChange={onChange('jobId')}
        options={props.jobs}
        optionLabel="job_name"
        placeholder="Select job"
        optionValue="id"
        className="w-full md:w-14rem"
      />
      <br />
      <Dropdown
        value={data.accessTier}
        onChange={onChange('accessTier')}
        options={props.arr}
        optionLabel="access_tier"
        optionValue="access_tier"
        placeholder="Select tier"
        className="w-full md:w-14rem"
      />
      <br />
      <Button
        id="add"
        label="add employee"
        icon="pi pi-check"
        autoFocus
        onClick={addEmployee}
      />
      <Messages ref={msgs} />
    </div>
  )
}
