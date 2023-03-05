import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

import React, { useState } from 'react'
import { RadioButton } from 'primereact/radiobutton'
import style from './style.module.scss'
const Selector = () => {
  const [category, setCategory] = useState('')

  return (
    <div className={style.containerSelector}>
      <label>select one</label>
      <div className={style.card}>
        <div className={style.pi}>
          <RadioButton
            inputId="category1"
            name="Pi"
            value="Pi"
            onChange={(e) => setCategory(e.value)}
            checked={category === 'Pi'}
          />
          <label htmlFor="category1" className="ml2">
            Pi
          </label>
        </div>

        <div className={style.date}>
          <RadioButton
            inputId="category2"
            name="Date"
            value="Date"
            onChange={(e) => setCategory(e.value)}
            checked={category === 'Date'}
          />
          <label htmlFor="category2" className="ml2">
            Date
          </label>
        </div>
      </div>
    </div>
  )
}
export default Selector
