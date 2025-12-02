import React from 'react'
import Hero from './hero/Hero'
import HomeIntro from './intro/HomeIntro'
import MediaMention from './mediamention/MediaMention'
import Banner from '@/components/common/Banner'

const Home = () => {
  return (
    <div>
      <Hero />
      <MediaMention />
      <HomeIntro />
      <Banner />
    </div>
  )
}

export default Home