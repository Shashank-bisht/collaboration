import React, { useCallback, useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import {
  xDeleteSharePresence,
  xGetSharePresence,
  xUpdateSharePresence,
} from '../../api/fetch'

export const useSharedNoteEditing = (isEditable) => {
  const [isEditing, setIsEditing] = useState(false)
  const timeoutRef = useRef(null)

  const markEditing = useCallback(() => {
    if (!isEditable) return
    setIsEditing(true)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => setIsEditing(false), 10000)
  }, [isEditable])

  useEffect(() => {
    if (!isEditable) setIsEditing(false)
    return () => window.clearTimeout(timeoutRef.current)
  }, [isEditable])

  return { isEditing, markEditing }
}

const SharedNotePresence = ({ shareId, status }) => {
  const [participants, setParticipants] = useState([])
  const [hasError, setHasError] = useState(false)
  const statusRef = useRef(status)
  statusRef.current = status

  useEffect(() => {
    let isMounted = true
    let isRefreshing = false
    const sessionId = uuidv4()

    const refreshPresence = async () => {
      if (isRefreshing) return
      isRefreshing = true

      try {
        await xUpdateSharePresence(shareId, statusRef.current, sessionId)
        const activeParticipants = await xGetSharePresence(shareId)
        if (isMounted) {
          setParticipants(activeParticipants)
          setHasError(false)
        }
      } catch (error) {
        console.error('Unable to refresh shared note presence.', error)
        if (isMounted) setHasError(true)
      } finally {
        isRefreshing = false
      }
    }

    refreshPresence()
    const interval = window.setInterval(refreshPresence, 5000)

    return () => {
      isMounted = false
      window.clearInterval(interval)
      xDeleteSharePresence(shareId, sessionId).catch((error) => {
        console.error('Unable to remove shared note presence.', error)
      })
    }
  }, [shareId])

  if (hasError) {
    return (
      <p className='text-xs text-red-400' role='status'>
        Live presence unavailable
      </p>
    )
  }

  if (participants.length === 0) return null

  const activeUsers = Array.from(
    participants.reduce((users, participant) => {
      const existing = users.get(participant.user_id)
      if (!existing || participant.status === 'editing') {
        users.set(participant.user_id, participant)
      }
      return users
    }, new Map())
  )

  return (
    <div
      className='flex flex-wrap items-center gap-2 text-xs text-white/[60%]'
      aria-live='polite'
    >
      <span className='h-2 w-2 rounded-full bg-green-400' aria-hidden='true' />
      <span>Active now:</span>
      {activeUsers.map(([userId, participant]) => (
        <span
          className='rounded-full bg-white/[8%] px-2 py-1 text-white'
          key={userId}
        >
          {participant.username} · {participant.status}
        </span>
      ))}
    </div>
  )
}

export default SharedNotePresence
