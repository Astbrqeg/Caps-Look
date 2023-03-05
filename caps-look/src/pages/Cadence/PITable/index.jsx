import style from './style.module.scss'
import React from 'react'
import { useState, useEffect } from 'react'
import ContentsTable from '../../../components/ContentsTable'
import api from '../../../config'
import EditIterationsPi from './EditIterationsPi'
import ArchiveIteration from './ArchiveIterationsPI'
import { Dialog } from 'primereact/dialog'
import { CSVLink } from 'react-csv'
const PITable = ({ selectPIState, refreshPITable, updateStatePITable }) => {
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [edit, setEdit] = React.useState({})
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [iterationsPI, setiterationsPIs] = useState([
    {
      id: '',
      iteration_name: '',
      project_id: '',
      pi_id: '',
      iteration_number: '',
      iteration_start_date: '',
      iteration_end_date: ''
    }
  ])
  const columns = [
    { title: 'Number', dataIndex: 'iteration_number' },
    { title: 'Iteration Name', dataIndex: 'iteration_name' },
    { title: 'Start Date', dataIndex: 'iteration_start_date' },
    { title: 'End Date', dataIndex: 'iteration_end_date' }
  ]
  const [data, setData] = useState({
    pi_id: selectPIState
  })
  useEffect(() => {
    setData({
      pi_id: selectPIState
    })
  }, [selectPIState])
  const getIterationsPI = async () => {
    if (data.pi_id !== '') {
      try {
        console.log(data)
        const body = data
        const result = await fetch(`${api.apiRequest}/iterationsPi`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const res = await result.json()
        console.log(res.data)
        setiterationsPIs(res.data)
      } catch (error) {
        throw new Error('No data found !!!')
      }
    }
  }
  useEffect(() => {
    getIterationsPI()
  }, [data, refreshPITable])
  return (
    <>
      <div style={{ width: '100%', marginTop: '50px' }}>
        <ContentsTable
          source={iterationsPI}
          columns={columns}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
          archiveRow={(e) => {
            setVisibleArchive(true)
            setArchive(e)
          }}
        />
        <Dialog
          visible={visibleEdit}
          onHide={() => {
            setVisibleEdit(false)
          }}
          style={{
            width: '20vw'
          }}
          breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        >
          <EditIterationsPi
            source={edit}
            onSubmit={() => setVisibleEdit(false)}
            refreshPITable={updateStatePITable}
          ></EditIterationsPi>
        </Dialog>
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center', width: '20vw' }}
          visible={visibleArchive}
          onHide={() => setVisibleArchive(false)}
        >
          <ArchiveIteration
            data={archive}
            onSubmit={() => setVisibleArchive(false)}
            refreshPITable={updateStatePITable}
          />
        </Dialog>
      </div>
      <br />
      <div className={style.buttonsContainer}>
        <br />
      </div>
      <CSVLink
        style={{
          textDecoration: 'none'
        }}
        data={iterationsPI}
      >
        <button className={style.exportbutton} style={{ marginLeft: '550px' }}>
          Export as CSV
        </button>
      </CSVLink>
    </>
  )
}

export default PITable
