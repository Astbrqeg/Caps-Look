import React from 'react'
import { Button } from 'primereact/button'
import api from '../../../../config'

const ArchiveIteration = (props) => {
  const archivedIteration = async () => {
    try {
      await fetch(`${api.apiRequest}/archiveIteration/${props.data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
      props.onSubmit()
      props.refreshPITable()
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
        Are you sure you want to remove the Iteration ?
      </p>
      <div>
        <Button
          icon="pi pi-times"
          label="No"
          onClick={() => {
            props.onSubmit()
          }}
        />
      </div>
      <br />
      <div>
        <Button
          icon="pi pi-check"
          label="Yes"
          autoFocus
          onClick={archivedIteration}
        />
      </div>
    </div>
  )
}
export default ArchiveIteration
