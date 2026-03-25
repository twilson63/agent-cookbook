import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

export interface TimelineEvent {
  year: string
  title: string
  desc: string
  color: string
  icon: string
}

export interface TimelineTemplateProps {
  title: string
  events: TimelineEvent[]
  bgFrom?: string
  bgTo?: string
}

function ease(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function pop(frame: number, start: number, fps: number) {
  return spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 80, mass: 0.8 } })
}

export function TimelineTemplate({ title, events, bgFrom = '#0a0a1a', bgTo = '#0d1117' }: TimelineTemplateProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const eventsPerRow = Math.ceil(events.length / 2)
  const delay = 28

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 64px',
    }}>
      {/* Title */}
      <div style={{
        fontSize: 36,
        fontWeight: 800,
        letterSpacing: -0.5,
        opacity: ease(frame, 0, 20),
        marginBottom: 36,
        textAlign: 'center',
        background: 'linear-gradient(90deg, #fff 0%, #4f8ef7 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        {title}
      </div>

      {/* Timeline line */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 64,
        right: 64,
        height: 2,
        background: 'rgba(255,255,255,0.08)',
        transform: 'translateY(20px)',
      }} />

      {/* Events grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${eventsPerRow}, 1fr)`,
        gap: '12px 16px',
        flex: 1,
        alignContent: 'start',
      }}>
        {events.map((ev, i) => {
          const startFrame = 20 + i * delay
          const s = pop(frame, startFrame, fps)
          const opacity = ease(frame, startFrame, startFrame + 18)
          const isTop = i % 2 === 0

          return (
            <div key={i} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gridRow: isTop ? 1 : 2,
              gridColumn: Math.floor(i / 2) + 1,
              transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [isTop ? -16 : 16, 0])}px)`,
              opacity,
            }}>
              <div style={{
                background: `${ev.color}18`,
                border: `1.5px solid ${ev.color}50`,
                borderRadius: 10,
                padding: '10px 14px',
                textAlign: 'center',
                width: '100%',
              }}>
                <div style={{ fontSize: 22, marginBottom: 4 }}>{ev.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: ev.color, marginBottom: 2 }}>{ev.year}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{ev.title}</div>
                <div style={{ fontSize: 11, opacity: 0.5, lineHeight: 1.4 }}>{ev.desc}</div>
              </div>
              {/* Connector dot */}
              <div style={{
                width: 8, height: 8,
                borderRadius: '50%',
                background: ev.color,
                marginTop: isTop ? 6 : 0,
                marginBottom: isTop ? 0 : 6,
                order: isTop ? 1 : -1,
                boxShadow: `0 0 8px ${ev.color}`,
              }} />
            </div>
          )
        })}
      </div>

      <div style={{
        textAlign: 'center',
        fontSize: 12,
        opacity: ease(frame, 20 + events.length * delay, 40 + events.length * delay) * 0.35,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 8,
      }}>
        Agent Cookbook
      </div>
    </AbsoluteFill>
  )
}
