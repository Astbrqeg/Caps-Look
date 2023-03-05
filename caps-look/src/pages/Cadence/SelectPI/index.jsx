import style from './style.module.scss'
import { Dropdown } from 'primereact/dropdown'
import { useState, useEffect } from 'react'
import api from '../../../config'
import EditPI from './EditPI'
import ArchivePI from './ArchivePI'
const SelectPI = ({
  selectPIState,
  setSelectPIState,
  selectProjectState,
  visibilityIterationEditArchiveButton,
  setVisibilityIterationEditArchiveButton,
  visibilityPIMilestoneButton,
  setVisibilityPIMilestoneButton,
  refreshPISelect,
  updateStatePISelect
}) => {
  console.log(selectProjectState)
  console.log(typeof selectProjectState)
  const [PIobject, setPIobject] = useState([{}])
  const [PIs, setPIs] = useState([{ pi_name: '', project_id: '' }])
  const [data, setData] = useState({
    project_id: selectProjectState
  })
  useEffect(() => {
    setData({
      project_id: selectProjectState
    })
  }, [selectProjectState])
  console.log(data)
  const getPIs = async () => {
    if (data.project_id != '') {
      try {
        console.log(data)
        const body = data
        const result = await fetch(`${api.apiRequest}/pisProject`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        const res = await result.json()
        console.log(res)
        setPIs(res.data)
      } catch (error) {
        throw new Error('No data found !!!')
      }
    }
  }

  useEffect(() => {
    getPIs()
  }, [data, refreshPISelect])
  console.log(PIs)
  console.log(PIs[0])
  const PIsList = PIs.map((pi) => {
    return { key: pi.id, label: pi.pi_name }
  })
  console.log(PIsList)
  console.log(selectPIState)
  return (
    <>
      <Dropdown
        style={{ visibility: visibilityPIMilestoneButton }}
        className={style.selectPI}
        id="PI"
        name="PI"
        value={selectPIState}
        options={PIs}
        optionValue="id"
        optionLabel="pi_name"
        placeholder="Select PI"
        required
        onChange={(e) => {
          setSelectPIState(e.value)
          setVisibilityIterationEditArchiveButton('visible')
          const result = PIs.filter((pi) => pi.id == e.value)
          setPIobject(result[0])
          console.log(result[0])
        }}
      />
      <span
        style={{
          marginLeft: '-200px',
          visibility: visibilityIterationEditArchiveButton
        }}
      >
        <EditPI
          PIobject={PIobject}
          refreshPISelect={updateStatePISelect}
        ></EditPI>
        <ArchivePI
          PIobject={PIobject}
          refreshPISelect={updateStatePISelect}
        ></ArchivePI>
      </span>
    </>
  )
}

export default SelectPI
