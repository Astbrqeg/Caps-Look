import { Button } from 'primereact/button'
import { CiEdit } from 'react-icons/ci'
import { BiArchiveIn } from 'react-icons/bi'
import style from './style.module.scss'
import { Dialog } from 'primereact/dialog'
import React from 'react'
import PopupEditPI from '../PopupEditPI'
const EditPI = ({ PIobject, refreshPISelect }) => {
  const [visibleEdit, setVisibleEdit] = React.useState(false)
  const [edit, setEdit] = React.useState({})
  return (
    <>
      <div>
        <Button
          id="Edit"
          style={{
            height: '50px',
            width: '50px',
            background: '#26264F',
            boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '10px',
            border: 'none',
            padding: '10px',
            marginLeft: '160px',
            top: '-40px'
          }}
          onClick={() => {
            setVisibleEdit(true)
          }}
        >
          <CiEdit style={{ height: '100px', width: '100px' }} />
        </Button>
      </div>
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
        <PopupEditPI
          source={PIobject}
          onSubmit={() => setVisibleEdit(false)}
          refreshPISelect={refreshPISelect}
        ></PopupEditPI>
      </Dialog>
    </>
  )
}
export default EditPI
