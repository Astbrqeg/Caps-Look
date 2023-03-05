import React, { useState, useEffect } from 'react'
import { Chart } from 'primereact'
import apiRequest from '../../config'

export default function SiteMix(props) {
  const [chartPlannedData, setChartPlannedData] = useState({})
  const [chartActualData, setChartActualData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    async function getData() {
      const response = await fetch(
        `${apiRequest.apiRequest}/GetActualSiteMix/${props.projectId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const actData = await response.json()
      let actual = []
      let actualLabels = []
      actData.data.forEach((element) => {
        actualLabels.push(element.cost_level)
        actual.push(parseInt(element.site_ee))
      })

      const plannedresponse = await fetch(
        `${apiRequest.apiRequest}/GetPlannedSiteMix/${props.projectId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        }
      )
      const planData = await plannedresponse.json()
      let planned = planData.data[0].planned_site_mix
      const documentStyle = getComputedStyle(document.documentElement)
      const plannedData = {
        labels: Object.keys(planned),
        datasets: [
          {
            data: Object.values(planned),
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      }

      const actualData = {
        labels: actualLabels,

        datasets: [
          {
            data: actual,
            backgroundColor: [
              documentStyle.getPropertyValue('--blue-500'),
              documentStyle.getPropertyValue('--yellow-500'),
              documentStyle.getPropertyValue('--green-500')
            ],
            hoverBackgroundColor: [
              documentStyle.getPropertyValue('--blue-400'),
              documentStyle.getPropertyValue('--yellow-400'),
              documentStyle.getPropertyValue('--green-400')
            ]
          }
        ]
      }

      const options = {
        cutout: '60%'
      }

      setChartPlannedData(plannedData)
      setChartActualData(actualData)
      setChartOptions(options)
    }

    getData()
  }, [props.projectId])

  return (
    <div className="w-full mb-6 card flex justify-content-center">
      <Chart
        type="doughnut"
        data={chartPlannedData}
        options={chartOptions}
        className="w-3 h-3"
      />
      <Chart
        type="doughnut"
        data={chartActualData}
        options={chartOptions}
        className="w-3 h-3"
      />
    </div>
  )
}
