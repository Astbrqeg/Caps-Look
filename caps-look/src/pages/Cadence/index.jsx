import style from './style.module.scss'
import React from 'react'
import { useState, useReducer } from 'react'
import PageContainer from '../../components/PageContainer'
import PITable from './PITable'
import MilestoneTable from './MilestoneTable'
import SelectProject from './SelectProject'
import SelectPI from './SelectPI'
import PopupMilestone from './PopupMilestone'
import PopupPI from './PopupPI'
import PopupIteration from './PopupIteration'
const Cadence = () => {
  const [selectProjectState, setSelectProjectState] = useState('')
  const [selectPIState, setSelectPIState] = useState('')
  const [mileStoneForm, setMileStoneForm] = useState(false)
  const [PIForm, setPIForm] = useState(false)
  const [iterationForm, setIterationForm] = useState(false)
  const [visibilityPIMilestoneButton, setVisibilityPIMilestoneButton] =
    useState('hidden')
  const [
    visibilityIterationEditArchiveButton,
    setVisibilityIterationEditArchiveButton
  ] = useState('hidden')
  const [refreshPITable, updateStatePITable] = useReducer((x) => x + 1, 0)
  const [refreshPISelect, updateStatePISelect] = useReducer((x) => x + 1, 0)
  const [refreshMilestonesTable, updateStateMilestonesTable] = useReducer(
    (x) => x + 1,
    0
  )
  return (
    <PageContainer>
      <div className={style.innerContainer}>
        <SelectProject
          selectProjectState={selectProjectState}
          setSelectProjectState={setSelectProjectState}
          visibilityPIMilestoneButton={visibilityPIMilestoneButton}
          setVisibilityPIMilestoneButton={setVisibilityPIMilestoneButton}
        ></SelectProject>
        <SelectPI
          visibility={visibilityPIMilestoneButton}
          selectPIState={selectPIState}
          setSelectPIState={setSelectPIState}
          selectProjectState={selectProjectState}
          visibilityIterationEditArchiveButton={
            visibilityIterationEditArchiveButton
          }
          setVisibilityIterationEditArchiveButton={
            setVisibilityIterationEditArchiveButton
          }
          visibilityPIMilestoneButton={visibilityPIMilestoneButton}
          setVisibilityPIMilestoneButton={setVisibilityPIMilestoneButton}
          refreshPISelect={refreshPISelect}
          updateStatePISelect={updateStatePISelect}
        ></SelectPI>

        <button
          className={style.PI}
          style={{ visibility: visibilityPIMilestoneButton }}
          onClick={() => {
            setPIForm(true)
          }}
        >
          + Add PI
        </button>
        <button
          className={style.iteration}
          onClick={() => {
            setIterationForm(true)
          }}
          style={{ visibility: visibilityIterationEditArchiveButton }}
        >
          + Add iteration
        </button>
        <PopupIteration
          iterationForm={iterationForm}
          setIterationForm={setIterationForm}
          selectPIState={selectPIState}
          selectProjectState={selectProjectState}
          onSubmit={() => setIterationForm(false)}
          refreshPITable={updateStatePITable}
        ></PopupIteration>
        <h1
          style={{
            fontSize: '30px',
            color: '#595786',
            marginRight: '1000px',
            marginBottom: '-50px'
          }}
        >
          Iterations
        </h1>
        <PITable
          selectPIState={selectPIState}
          refreshPITable={refreshPITable}
          updateStatePITable={updateStatePITable}
        ></PITable>
        <PopupPI
          PIForm={PIForm}
          setPIForm={setPIForm}
          selectProjectState={selectProjectState}
          onSubmit={() => setPIForm(false)}
          refreshPISelect={updateStatePISelect}
        ></PopupPI>
        <h1
          style={{
            fontSize: '30px',
            color: '#595786',
            marginRight: '1000px',
            marginBottom: '-100px'
          }}
        >
          Milestones
        </h1>
        <button
          className={style.mileStone}
          onClick={() => {
            setMileStoneForm(true)
          }}
          style={{ visibility: visibilityPIMilestoneButton }}
        >
          + Add Milestone
        </button>
        <PopupMilestone
          mileStoneForm={mileStoneForm}
          setMileStoneForm={setMileStoneForm}
          selectProjectState={selectProjectState}
          onSubmit={() => setMileStoneForm(false)}
          refreshMilestonesTable={updateStateMilestonesTable}
        ></PopupMilestone>

        <MilestoneTable
          selectProjectState={selectProjectState}
          refreshMilestonesTable={refreshMilestonesTable}
          updateStateMilestonesTable={updateStateMilestonesTable}
        ></MilestoneTable>
      </div>
    </PageContainer>
  )
}

export default Cadence
