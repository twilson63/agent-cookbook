import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion'

export interface BulletPoint {
  icon: string
  text: string
  sub?: string
}

export interface SlideTemplateProps {
  title: string
  subtitle: string
  bullets: BulletPoint[]
  accentColor: string
  bgFrom?: string
  bgTo?: string
  icon?: string
}

function easeIn(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function pop(frame: number, start: number, fps: number) {
  return spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 90, mass: 0.7 } })
}

export function SlideTemplate({
  title, subtitle, bullets, accentColor,
  bgFrom = '#0d1117', bgTo = '#161b22', icon,
}: SlideTemplateProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const headerOpacity = easeIn(frame, 0, 20)
  const headerY = interpolate(frame, [0, 20], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })
  const subtitleOpacity = easeIn(frame, 15, 35)

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(145deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '52px 80px',
    }}>
      {/* Accent line */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
        opacity: headerOpacity,
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 12, transform: `translateY(${headerY}px)`, opacity: headerOpacity }}>
        {icon && <div style={{ fontSize: 48 }}>{icon}</div>}
        <div>
          <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: -0.5, lineHeight: 1.1 }}>{title}</div>
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 18,
        opacity: subtitleOpacity * 0.65,
        marginBottom: 44,
        paddingLeft: icon ? 68 : 0,
        lineHeight: 1.5,
      }}>
        {subtitle}
      </div>

      {/* Bullets */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, flex: 1 }}>
        {bullets.map((b, i) => {
          const s = pop(frame, 40 + i * 18, fps)
          const opacity = easeIn(frame, 40 + i * 18, 55 + i * 18)
          return (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 18,
              background: 'rgba(255,255,255,0.04)',
              border: `1px solid ${accentColor}25`,
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: 10,
              padding: '14px 20px',
              transform: `scale(${s}) translateX(${interpolate(s, [0, 1], [-16, 0])}px)`,
              opacity,
            }}>
              <div style={{ fontSize: 26, minWidth: 36, textAlign: 'center', marginTop: 1 }}>{b.icon}</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 600, marginBottom: b.sub ? 3 : 0 }}>{b.text}</div>
                {b.sub && <div style={{ fontSize: 13, opacity: 0.55 }}>{b.sub}</div>}
              </div>
            </div>
          )
        })}
      </div>

      {/* Bottom accent */}
      <div style={{
        position: 'absolute',
        bottom: 24, right: 36,
        fontSize: 12,
        opacity: easeIn(frame, 100, 120) * 0.3,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color: accentColor,
      }}>
        Agent Cookbook
      </div>
    </AbsoluteFill>
  )
}
