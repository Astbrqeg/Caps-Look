import React, { useRef } from 'react'
import style from './style.module.scss'
import { BsSearch } from 'react-icons/bs'

const SearchBar = (props) => {
  const inputEl = useRef('')
  const getSelectedData = () => {
    props.searchKeyword(inputEl.current.value)
  }
  return (
    <div
      className={style.container}
      style={{
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <input
        type="search"
        className={style.searchbar}
        placeholder={props.PlaceholderItem}
        ref={inputEl}
        field={props.name}
        value={props.selectedData}
        suggestions={props.filteredData}
        //completeMethod={props.search}
        onChange={getSelectedData}
      />
      {/* <button className={style.srchico}>
        <BsSearch />
      </button> */}
    </div>
  )
}
export default SearchBar
