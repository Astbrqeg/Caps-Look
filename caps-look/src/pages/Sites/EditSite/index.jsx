import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import api from '../../../config'
import React from 'react'
import { Messages } from 'primereact/messages'
import { useRef } from 'react'

const EditSite = (props) => {
  const msgs = useRef(null)
  const [editData, setEditData] = React.useState({
    site_name: props.source.site_name,
    country_name: props.source.country_name
  })
  const onChangeData = (key) => (e) =>
    setEditData({ ...editData, [key]: e.target.value })

  const updateSiteRow = async () => {
    const body = editData
    try {
      let message = ''
      if (
        !(editData.country_name.length > 1 && editData.country_name.length < 30)
      ) {
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
      } else if (
        !(editData.site_name.length > 1 && editData.site_name.length < 30)
      ) {
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
      } else if (!/^[A-Za-z]*$/.test(editData.site_name)) {
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
      } else if (!/^[A-Za-z]*$/.test(editData.country_name)) {
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
      await fetch(`${api.apiRequest}/editsite/${props.source.id}`, {
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
        id="siteName"
        value={editData.site_name}
        name="site_name"
        required
        onChange={onChangeData('site_name')}
      />
      <br />

      <InputText
        id="country"
        value={editData.country_name}
        type="text"
        name=" country_name"
        style={{ width: '208px' }}
        required
        onChange={onChangeData('country_name')}
      />
      <br />
      <Button
        id="edit"
        label="edit"
        icon="pi pi-check"
        autoFocus
        onClick={updateSiteRow}
      />
      <Messages ref={msgs} />
    </div>
  )
}
export default EditSite
