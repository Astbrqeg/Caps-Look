import React, { useState, useEffect } from 'react'
import api from '../../config'
import { Dropdown } from 'primereact/dropdown'
import style from './style.module.scss'

const PiDropdown = (props) => {
  const [fromPi, setFromPi] = useState([])
  const [toPi, setToPi] = useState([])
  const [selectedFrom, setSelectedFrom] = useState(null)
  const [selectedTo, setSelectedTo] = useState(null)

  const [data, setData] = useState({
    from_iteration: '',
    to_iteration: ''
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
      setFromPi(dataItems)
      setToPi(dataItems)
    } catch (err) {
      setToPi([])
      setFromPi([])
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
        id="FromIteration"
        name="label"
        value={data.from_iteration}
        onChange={(e) => {
          setSelectedFrom(e.value)
          onChange('from_iteration')(e)
        }}
        options={fromPi}
        optionLabel="label"
        optionValue="value.id"
        placeholder="Select from iterations"
      />
      <Dropdown
        visible={props.status}
        id="toIteration"
        name="label"
        value={data.to_iteration}
        onChange={(e) => {
          setSelectedTo(e.value)
          onChange('to_iteration')(e)
        }}
        options={toPi}
        optionLabel="label"
        optionValue="value.id"
        placeholder="Select to iterations"
      />
    </div>
  )
}
export default PiDropdown
