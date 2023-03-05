import style from './style.module.scss'
import React from 'react'
import { useState, useEffect, useReducer, useRef } from 'react'
import PageContainer from '../../components/PageContainer'
import SearchBar from '../../components/SearchBar'
import ContentsTable from '../../components/ContentsTable'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { CSVLink } from 'react-csv'
import api from '../../config'
import Addingsite from './AddingSite/index'
import EditSite from './EditSite'
import ArchiveSite from './ArchiveSite'
import { Toast } from 'primereact/toast'
const Sites = () => {
  const toast = useRef(null)
  const [locations, setLocations] = useState([{}])
  const [visible, setVisible] = useState(false)
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [visibleArchive, setVisibleArchive] = React.useState(false)
  const [archive, setArchive] = React.useState({})
  const [edit, setEdit] = React.useState({})
  const [sites, setSites] = React.useState([{}])
  const [selectedData, setSelectedData] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [refresh, updateState] = useReducer((x) => x + 1, 0)

  const columns = [
    { title: 'Country', dataIndex: 'country_name' },
    { title: 'Location', dataIndex: 'site_name' },
    { title: 'Number of Employees', dataIndex: 'employee_number' }
  ]
  const getSites = async () => {
    try {
      const result = await fetch(`${api.apiRequest}/SitesDetails`, {
        credentials: 'include'
      })
      const res = await result.json()
      setSites(res.data)
      console.log(res.data)
    } catch (err) {
      throw new Error('No data found !!!')
    }
  }
  const searchSite = (selectedData) => {
    setSelectedData(selectedData)
    if (selectedData !== '') {
      const newSitesList = sites.filter((site) => {
        return Object.values(site.site_name)
          .join('')
          .toLowerCase()
          .includes(selectedData.toLowerCase())
      })
      setSearchResults(newSitesList)
    } else {
      return selectedData
    }
  }

  useEffect(() => {
    getSites()
  }, [refresh])

  return (
    <PageContainer name={'Sites'}>
      <SearchBar
        PlaceholderItem={'Search a Site'}
        name={'site_name'}
        selectedData={selectedData}
        searchKeyword={searchSite}
      />
      <div style={{ width: '90%' }}>
        <ContentsTable
          columns={columns}
          source={selectedData.length < 1 ? sites : searchResults}
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
      <div className={style.buttonsContainer}>
        <div className={style.Create}>
          <Button
            id="Create"
            label="Create Site"
            onClick={() => setVisible(true)}
          />
        </div>
        <div className={style.export}>
          <CSVLink
            style={{
              textDecoration: 'none'
            }}
            data={sites}
          >
            <button>Export as CSV</button>
          </CSVLink>
        </div>
        <br />
        <Dialog
          header="Caps Look"
          style={{ textAlign: 'center' }}
          visible={visible}
          onHide={() => {
            setVisible(false)
          }}
        >
          <Addingsite
            onSubmit={() => {
              setVisible(false)
              toast.current.show({
                severity: 'success',
                summary: 'Success Message',
                detail: 'creating site done successfully'
              })
            }}
            updateState={updateState}
          />
        </Dialog>
      </div>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center' }}
        visible={visibleEdit}
        onHide={() => setVisibleEdit(false)}
      >
        <EditSite
          source={edit}
          onSubmit={() => {
            setVisibleEdit(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'updating site done successfully'
            })
          }}
          updateState={updateState}
        />
      </Dialog>
      <Dialog
        header="Caps Look"
        style={{ textAlign: 'center', width: '20vw' }}
        visible={visibleArchive}
        onHide={() => setVisibleArchive(false)}
      >
        <ArchiveSite
          data={archive}
          onSubmit={() => {
            setVisibleArchive(false)
            toast.current.show({
              severity: 'success',
              summary: 'Success Message',
              detail: 'removing site done successfully'
            })
          }}
          updateState={updateState}
        />
      </Dialog>
      <Toast ref={toast} />
    </PageContainer>
  )
}

export default Sites
