import React from 'react'
import { Button } from 'primereact/button'
import api from '../../../config'

const ArchiveEmployee = (props) => {
  const archiveEmployee = async () => {
    try {
      await fetch(`${api.apiRequest}/ArchiveEmployee/${props.data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <p style={{ fontWeight: 'bold', marginBottom: '50px' }}>
        Are you sure you want to remove this employee ?
      </p>
      <div>
        <Button
          icon="pi pi-times"
          label="No"
          onClick={() => props.onSubmit()}
        />
      </div>
      <br />
      <div>
        <Button
          icon="pi pi-check"
          label="Yes"
          autoFocus
          onClick={archiveEmployee}
        />
      </div>
    </div>
  )
}
export default ArchiveEmployee
