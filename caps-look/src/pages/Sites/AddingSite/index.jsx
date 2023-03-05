import React, { useRef } from 'react'
import { Button } from 'primereact/button'
import { Messages } from 'primereact/messages'

import { InputText } from 'primereact/inputtext'
import api from '../../../config'
const Addingsite = (props) => {
  const msgs = useRef(null)
  const [data, setData] = React.useState({
    site_name: '',
    country_name: ''
  })
  const onChange = (key) => (e) => setData({ ...data, [key]: e.target.value })

  const createSite = async () => {
    try {
      let message = ''
      if (!(data.country_name.length > 1 && data.country_name.length < 30)) {
        message = 'country name should be between 1 to 30 characters'
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: message,
            closable: true
          }
        ])
      } else if (!(data.site_name.length > 1 && data.site_name.length < 30)) {
        message = 'site name should be between 1 to 30 characters'
        return msgs.current.show([
          {
            sticky: false,
            severity: 'error',
            summary: '',
            detail: message,
            closable: true
          }
        ])
      } else if (!/^[A-Za-z]*$/.test(data.site_name)) {
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
      } else if (!/^[A-Za-z]*$/.test(data.country_name)) {
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
      }
      const body = data
      await fetch(`${api.apiRequest}/createsite`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      props.updateState()
      props.onSubmit()
    } catch (err) {
      throw new Error('adding site failed')
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
        id=" siteName"
        value={data.site_name}
        name="site_name"
        placeholder="Site Name"
        required
        onChange={onChange('site_name')}
      />
      <br />
      <InputText
        id="countryName"
        value={data.country_name}
        type="text"
        name="country_name"
        placeholder="Country Name"
        style={{ width: '208px' }}
        required
        onChange={onChange('country_name')}
      />
      <br />

      <br />
      <Button
        id="add"
        label="add site"
        icon="pi pi-check"
        autoFocus
        onClick={createSite}
      />
      <Messages ref={msgs} />
    </div>
  )
}
export default Addingsite
