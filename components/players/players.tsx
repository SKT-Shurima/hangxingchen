'use client'

import { ZolplayerCard } from './player-card'
import { fetchProfiles } from './fetch-profiles'
import { useEffect, useState } from 'react'
import type { ProfileData } from './fetch-profiles'

export function Players() {
  const [profiles, setProfiles] = useState<ProfileData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfiles() {
      try {
        const data = await fetchProfiles()
        setProfiles(data)
      } catch (error) {
        console.error('Error loading profiles:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProfiles()
  }, [])

  return (
    <>
      <h2>认识我们的团队</h2>
      <div className='overflow-hidden relative h-[150px]'>
        {loading ? (
          <div className='py-6 text-center'>正在加载团队成员...</div>
        ) : profiles.length === 0 ? (
          <div className='py-6 text-center'>未找到团队成员</div>
        ) : (
          <div className='marquee-container'>
            <div className='flex items-center space-x-6 py-6 animate-marquee'>
              {profiles.map((profile) => (
                <ZolplayerCard 
                  key={`player-${profile.id}`} 
                  base64Image={profile.base64} 
                  size={100}
                />
              ))}
            </div>
            {/* Duplicate the profiles to ensure continuous loop with no gap */}
            <div className='flex items-center space-x-6 py-6 animate-marquee'>
              {profiles.map((profile) => (
                <ZolplayerCard 
                  key={`player-dup-${profile.id}`} 
                  base64Image={profile.base64} 
                  size={100}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
