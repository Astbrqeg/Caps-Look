import style from './style.module.scss'
import React, { useRef, useState, useEffect, useReducer } from 'react'
import SearchBar from '../../components/SearchBar'
import PageContainer from '../../components/PageContainer'
import ContentsTable from '../../components/ContentsTable'
import PopUpMessage from './PopUpDialog'
import EditPopUpMessage from './EditPopUpDialog'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'
import ArchiveProject from './ArchiveProject'
import { Toast } from 'primereact/toast'

const Projects = () => {
  const [projects, setProjects] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [refresh, updateState] = useReducer((x) => x + 1, 0)
  const toast = useRef(null)
  const getProjects = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/ProjectPage`, {
        credentials: 'include'
      })
      const res = await result.json()
      setProjects(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }

  const searchProject = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newProjectList = projects.filter((project) => {
        return Object.values(project.project_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newProjectList)
    } else {
      return searchResults(selectedData)
    }
  }

  useEffect(() => {
    getProjects()
  }, [refresh])

  const columns = [
    { title: 'name', dataIndex: 'project_name' },
    { title: 'scrum #', dataIndex: 'scrum_number' },
    { title: 'Emp #', dataIndex: 'employee_number' },
    { title: 'iteration #', dataIndex: 'iteration_number' }
  ]

  return (
    <PageContainer name={'Projects'}>
      <SearchBar
        PlaceholderItem={'Search a Project'}
        name={'project_name'}
        selectedData={selectedData}
        searchKeyword={searchProject}
      />
      <div style={{ width: '90%' }}>
        <ContentsTable
          source={selectedData.length < 1 ? projects : searchResults}
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
      </div>

      <br />
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Project"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={projects}
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
          onSubmit={() => {
            setVisible(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'adding project done successfully'
            })
          }}
          refresh={updateState}
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
          onSubmit={() => {
            setVisibleEdit(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'updating  project  details done successfully'
            })
          }}
          refresh={updateState}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveProject
          data={archive}
          onSubmit={() => {
            setVisibleArchive(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'removing  project done successfully'
            })
          }}
          refresh={updateState}
        />
      </Dialog>
      <Toast ref={toast} />
    </PageContainer>
  )
}

export default Projects
