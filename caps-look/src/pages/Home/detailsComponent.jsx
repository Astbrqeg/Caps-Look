import React from 'react'
import style from './style.module.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'
import config from '../../config'

const ProjectDetails = ({ projectId }) => {
  const [startDay, setStartDay] = useState(null)
  const [countIterations, setCountIterations] = useState(0)
  const [countScrums, setCountScrums] = useState(0)
  const [countSites, setCountSite] = useState(0)
  const [countEmployees, setCountEmployees] = useState(0)
  const fetches = [
    axios.get(`${config.apiRequest}/home/projectStartDay/${projectId}`),
    axios.get(`${config.apiRequest}/home/projectCountIterations/${projectId}`),
    axios.get(`${config.apiRequest}/home/projectCountScrums/${projectId}`),
    axios.get(`${config.apiRequest}/home/projectCountSites/${projectId}`),
    axios.get(`${config.apiRequest}/home/projectCountEmployees/${projectId}`)
  ]
  const fetchProjectDetails = async () => {
    try {
      const responses = await Promise.all(fetches)
      setStartDay(responses[0]?.data?.data[0]?.start_date)
      setCountIterations(responses[1]?.data?.data[0]?.count)
      setCountScrums(responses[2]?.data?.data[0]?.count)
      setCountSite(responses[3]?.data?.data[0].count)
      setCountEmployees(responses[4].data?.data[0]?.count)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProjectDetails()
  }, [projectId])

  return (
    <div className={style.details}>
      <div className={style.item}>
        {countSites} sites are working on this project
      </div>
      <div className={style.item}>
        {countScrums} Scrums are working on this project
      </div>
      <div className={style.item}>
        {countEmployees} Employees are working on this project
      </div>
      <div className={style.item}>Project started in {startDay}</div>
      <div className={style.item}>
        {countIterations} PI made on this project
      </div>
    </div>
  )
}

export default ProjectDetails
