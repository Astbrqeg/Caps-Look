import style from './style.module.scss'
import React from 'react'
import { useState, useEffect, useRef, useReducer } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import PopUpMessage from './PopUpDialog'
import EditPopUpMessage from './EditPopUpDialog'
import ArchiveScrum from './ArchiveScrum'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { AutoComplete } from 'primereact/autocomplete'
import { CSVLink } from 'react-csv'
import api from '../../config'
import { Toast } from 'primereact/toast'
import Pagination from '../../components/Pagination'

const Scrums = () => {
  const toast = useRef(null)
  const [scrums, setScrums] = useState([])
  const [projects, setProjects] = useState([{}])
  const [scrumMaster, setscrumMaster] = useState([{}])
  const [selectedproject, setSelectedproject] = useState(null)
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [filteredData, setFilteredData] = useState(null)

  const getScrums = async (id) => {
    try {
      const body = {
        id: id
      }
      const result = await fetch(`${api.apiRequest}/GetScrums`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      setScrums(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const getProjectsName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/projects`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const getScrumMasterName = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/GetScrumMaster`, {
        credentials: 'include'
      })
      const res = await result.json()
      setscrumMaster(res.data.rows)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const searchScrum = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newScrumList = scrums.filter((scrum) => {
        return Object.values(scrum.scrum_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })

      setSearchResults(newScrumList)
    } else {
      setSearchResults(scrums)
    }
  }

  const search = (event) => {
    setTimeout(() => {
      let filtered
      if (!event.query.trim().length) {
        filtered = [projects]
      } else {
        filtered = projects.filter((item) => {
          return item.project_name
            .toLowerCase()
            .startsWith(event.query.toLowerCase())
        })
      }
      setFilteredData(filtered)
    }, 250)
  }

  useEffect(() => {
    getProjectsName()
    getScrumMasterName()
  }, [])

  const columns = [
    { title: 'name', dataIndex: 'scrum_name' },
    { title: 'Scrum Master', dataIndex: 'scrum_master_name' },
    { title: 'Application', dataIndex: 'app_name' },
    { title: 'Emp #', dataIndex: 'number_of_emp' }
  ]

  return (
    <PageContainer name={'Scrums'}>
      <div className="card flex justify-content-center">
        <AutoComplete
          style={{ margin: 10 }}
          type="search"
          className={style.searchbar}
          placeholder="Select a Project"
          field="project_name"
          value={selectedproject}
          suggestions={filteredData}
          completeMethod={search}
          onChange={(e) => {
            setSelectedproject(e.value)
            getScrums(e.value.id)
          }}
        />
      </div>
      <SearchBar
        PlaceholderItem={'Search a Scrum'}
        name={'scrum_name'}
        selectedData={selectedData}
        searchKeyword={searchScrum}
      />
      <div style={{ width: '90%' }}>
        {scrums.length && (
          <ContentsTable
            source={selectedData.length < 1 ? scrums : searchResults}
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
        )}
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Scrum"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={scrums}
            onClick={() => {}}
          >
            <button>Export as CSV</button>
          </CSVLink>
        </div>
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
        <PopUpMessage
          clicked={'add'}
          Project={projects}
          scrumMaster={scrumMaster}
          onSubmit={() => {
            setVisible(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding scrum done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditPopUpMessage
          clicked="Edit"
          source={edit}
          scrumMaster={scrumMaster}
          Project={projects}
          selectedProject={selectedproject}
          onSubmit={() => {
            setVisibleEdit(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'updating scrum done successfully'
            })
          }}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveScrum
          data={archive}
          onSubmit={() => {
            setVisibleArchive(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'removing scrum done successfully'
            })
          }}
        />
      </Dialog>
      <Toast ref={toast} />
    </PageContainer>
  )
}

export default Scrums
