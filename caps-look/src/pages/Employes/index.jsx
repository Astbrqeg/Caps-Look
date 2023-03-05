import React, { useReducer, useRef } from 'react'
import style from './style.module.scss'
import { useState, useEffect } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import AddEmployeePopUp from './addEmployeePopUp/index'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink, CSVReader } from 'react-csv'
import api from '../../config'
import ArchiveEmployee from './ArchiveEmployee'
import EditEmployeeDetails from './EditEmployeeDetails'

import { parse } from 'papaparse'
import { Toast } from 'primereact/toast'
const Employee = () => {
  const toast = useRef(null)
  const [employees, setEmployees] = useState([{}])
  const [employeesCsv, setEmployeesCsv] = useState([])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchiveEmployee, setVisibleArchiveEmployee] =
    React.useState(false)
  const [archiveEmployee, setArchiveEmployee] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [sites, setSites] = useState([{}])
  const [jobs, setJobs] = useState([{}])
  const [selectedData, setSelectedData] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [refresh, updateState] = useReducer((x) => x + 1, 0)

  const arr = [
    { access_tier: 'no_access' },
    { access_tier: 'scrum_master' },
    { access_tier: 'project_manager' },
    { access_tier: 'resource_manager' }
  ]

  const getEmployees = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Employee`, {
        credentials: 'include'
      })
      const res = await result.json()

      setEmployees(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  employees.forEach((o) => {
    Object.keys(o).forEach((k) => {
      if (o[k] === null) {
        o[k] = 'NA'
      }
    })
  })

  const getSites = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Sites`, {
        credentials: 'include'
      })
      const res = await result.json()
      setSites(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getJobsName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/Jobs`, {
        credentials: 'include'
      })
      const res = await result.json()
      setJobs(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  useEffect(() => {
    getEmployees()
    getJobsName()
    getSites()
  }, [refresh])

  const columns = [
    { title: 'ID', dataIndex: 'id_number' },
    { title: 'Name', dataIndex: 'employee_name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Phone ', dataIndex: 'phone' },
    { title: 'Productivity', dataIndex: 'productivity' },
    { title: 'Role', dataIndex: 'job_name' },
    { title: 'Project', dataIndex: 'project_name' },
    { title: 'Scrum', dataIndex: 'scrum_name' },
    { title: 'Application', dataIndex: 'application_name' }
  ]
  const searchEmployee = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newEmployeesList = employees.filter((employee) => {
        return Object.values(employee.employee_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newEmployeesList)
    } else {
      return selectedData
    }
  }

  const importCSV = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.onload = async () => {
      const csvData = reader.result
      const parsedData = parse(csvData, { header: true }).data

      await fetch(`${api.apiRequest}/importEmployees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
        credentials: 'include'
      })
    }
    reader.readAsText(file)
  }
  useEffect(() => {
    setEmployeesCsv()
  }, [])

  return (
    <PageContainer name={'Employees'}>
      <SearchBar
        PlaceholderItem={'Search an Employee'}
        name={'employee_name'}
        selectedData={selectedData}
        searchKeyword={searchEmployee}
      />
      <div style={{ width: '920px', marginLeft: '90px' }}>
        <ContentsTable
          source={selectedData.length < 1 ? employees : searchResults}
          columns={columns}
          onEditRow={(e) => {
            setVisibleEdit(true)
            setEdit(e)
          }}
          archiveRow={(e) => {
            setVisibleArchiveEmployee(true)
            setArchiveEmployee(e)
          }}
        />
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <Button
          id="add"
          label="add employee"
          onClick={() => setVisible(true)}
        />
        <label htmlFor="myFileInput" className="custom-file-upload">
          Import CSV
        </label>
        <input
          type="file"
          onChange={importCSV}
          accept=".csv"
          id="myFileInput"
          style={{ display: 'none' }}
        />
        <CSVLink
          style={{
            textDecoration: 'none'
          }}
          data={employees}
        >
          <button>Export as CSV</button>
        </CSVLink>

        <br />
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visible}
        onHide={() => {
          setVisible(false)
        }}
      >
        <AddEmployeePopUp
          source={employees}
          sites={sites}
          jobs={jobs}
          arr={arr}
          updateState={updateState}
          onSubmit={() => {
            setVisible(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding employee done successfully'
            })
          }}
        />
      </Dialog>
      <Toast ref={toast} />

      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditEmployeeDetails
          source={edit}
          sites={sites}
          jobs={jobs}
          arr={arr}
          updateState={updateState}
          onSubmit={() => {
            setVisibleEdit(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'update employee details done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchiveEmployee}
        onHide={() => setVisibleArchiveEmployee(false)}
      >
        <ArchiveEmployee
          data={archiveEmployee}
          onSubmit={() => {
            setVisibleArchiveEmployee(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'remove employee done successfully'
            })
          }}
          updateState={updateState}
        />
      </Dialog>
    </PageContainer>
  )
}

export default Employee
