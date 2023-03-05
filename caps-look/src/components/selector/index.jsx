import { RadioButton } from 'primereact/radiobutton'
import { useState } from 'react'

const selector = () => {
  const { catgory, setcatgory } = useState('')

  return (
    <div className="selectorontainer">
      <label>select Range category</label>
      <div className="flex align-items-center">
        <RadioButton
          inputId="date"
          name="date"
          value="Date"
          onChange={(e) => setcatgory(e.value)}
          checked={catgory === 'Date'}
        />
        <label htmlFor="ingredient1" className="ml-2">
          Date
        </label>
      </div>
      <div className="flex align-items-center">
        <RadioButton
          inputId="PI"
          name="PI"
          value="Pi"
          onChange={(e) => setcatgory(e.value)}
          checked={catgory === 'Pi'}
        />
        <label htmlFor="Pi" className="ml-2">
          Pi
        </label>
      </div>
    </div>
  )
}
