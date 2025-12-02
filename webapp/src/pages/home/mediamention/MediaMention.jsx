import React from 'react'
import ResentBlog from './components/ResentBlog'
import LocationMusic from './components/LocationMusic'
import HobbySkills from './components/HobbySkills'
import AchievementsTools from './components/AchievementsTools'
import GitHubDiscord from './components/GitHubDiscord'
import SocialMedia from './components/SocialMedia'

const MediaMention = () => {
  return (
    <section className="w-full py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="grid gap-3 h-auto">
          <ResentBlog />
          {/* Location and Music */}
          <div className="flex gap-3 h-auto">
            <LocationMusic />
          </div>
          {/* Hobby and skills */}
          <div className="flex gap-3 h-auto">
            <HobbySkills />
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-3">
          {/* Achievements and Tools */}
          <div className="flex gap-3 h-auto">
            <AchievementsTools />
          </div>
          {/* Github, Under Construction and Discord */}
          <div className="flex gap-3 h-auto">
            <GitHubDiscord />
          </div>
          {/* Social Media Links */}
          <div className="flex flex-col md:flex-row gap-3">
            <SocialMedia />
          </div>
        </div>
      </div>
    </section>
  )
}

export default MediaMention