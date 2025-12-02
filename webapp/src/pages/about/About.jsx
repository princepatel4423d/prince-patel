import React from 'react'
import Intro from './components/Intro'
import StatGrid from './components/StatGrid'
import Services from './components/Services'
import Knowledge from './components/Knowledge'
import Education from './components/Education'
import Work from './components/Work'
import SocialLinks from './components/SocialLinks'
import Banner from '@/components/common/Banner'

const About = () => {
  return (
    <div>
      <Intro />
      <StatGrid />
      <Services />
      <Knowledge />
      <Education />
      <Work />
      <SocialLinks />
      <Banner />
    </div>
  )
}

export default About