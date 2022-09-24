import React from 'react'
import ArticlesList from '../ArticlesList/ArticlesList'
import Filters from '../Filters/Filters'
import './DashboardContainer.css'

const DashboardContainer = () => {
  return (
    <div className='dashboardContainer'>
        <Filters/>
        <ArticlesList/>
    </div>
  )
}

export default DashboardContainer