import React, { useState, useEffect } from 'react'
import api from '../../config'
import { Dropdown } from 'primereact/dropdown'
import style from './style.module.scss'
const DateDropdown = (props) => {
  const [fromDate, setFromDate] = useState([])
  const [toDate, setToDate] = useState([])
  const [selectedFromDate, setSelectedFromDate] = useState(null)
  const [selectedToDate, setSelectedToDate] = useState(null)

  const [data, setData] = useState({
    from_date: '',
    to_date: ''
  })

  const fetchPi = async () => {
    const body = { id: 2 }
    try {
      const result = await fetch(`${api.apiRequest}/pi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include'
      })
      const res = await result.json()
      const dataItems = res.data.map((item) => ({
        label: item.iteration_name,
        value: item
      }))
      console.log(dataItems)
      setFromDate(dataItems)
      setToDate(dataItems)
    } catch (err) {
      setToDate([])
      setFromDate([])
      throw new Error('No data found !!!')
    }
  }
  useEffect(() => {
    fetchPi()
  }, [])
  const onChange = (key) => (e) => {
    setData({ ...data, [key]: e.target.value })
  }

  return (
    <div className={style.dropdown}>
      <Dropdown
        visible={props.status}
        id="startDate"
        name="value.iteration_start_date"
        value={data.from_date}
        onChange={(e) => {
          setSelectedFromDate(e.value)
          onChange('from_date')(e)
        }}
        options={fromDate}
        optionLabel="value.iteration_start_date"
        optionValue="value.id"
        placeholder="Select from Date"
      />

      <Dropdown
        visible={props.status}
        id="endDate"
        name="value.iteration_end_date"
        value={data.to_date}
        onChange={(e) => {
          setSelectedToDate(e.value)
          onChange('to_date')(e)
        }}
        options={toDate}
        optionLabel="value.iteration_end_date"
        optionValue="value.id"
        placeholder="Select to Date"
      />
    </div>
  )
}
export default DateDropdown
