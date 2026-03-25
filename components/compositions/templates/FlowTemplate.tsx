import React from 'react'
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Sequence } from 'remotion'

export interface FlowStep {
  icon: string
  title: string
  desc: string
  color: string
}

export interface FlowTemplateProps {
  title: string
  subtitle?: string
  steps: FlowStep[]
  bgFrom?: string
  bgTo?: string
  loop?: boolean
}

function ease(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function pop(frame: number, start: number, fps: number) {
  return spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 100, mass: 0.6 } })
}

export function FlowTemplate({ title, subtitle, steps, bgFrom = '#0d1117', bgTo = '#0f3460', loop = false }: FlowTemplateProps) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const stepDelay = 35
  const firstStepAt = 30

  return (
    <AbsoluteFill style={{
      background: `linear-gradient(160deg, ${bgFrom} 0%, ${bgTo} 100%)`,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 80px',
    }}>
      {/* Title */}
      <div style={{
        fontSize: 34,
        fontWeight: 700,
        opacity: ease(frame, 0, 20),
        marginBottom: subtitle ? 8 : 36,
        letterSpacing: -0.5,
        textAlign: 'center',
      }}>
        {title}
      </div>

      {subtitle && (
        <div style={{
          fontSize: 16,
          opacity: ease(frame, 10, 30) * 0.6,
          marginBottom: 36,
          textAlign: 'center',
          maxWidth: 600,
        }}>
          {subtitle}
        </div>
      )}

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 720 }}>
        {steps.map((step, i) => {
          const startFrame = firstStepAt + i * stepDelay
          const s = pop(frame, startFrame, fps)
          const opacity = ease(frame, startFrame, startFrame + 15)
          const lineOpacity = i > 0 ? ease(frame, startFrame - 8, startFrame + 5) : 0

          return (
            <React.Fragment key={i}>
              {i > 0 && (
                <div style={{
                  width: 2, height: 18,
                  background: `linear-gradient(180deg, ${steps[i - 1].color}60, ${step.color}60)`,
                  marginLeft: 30,
                  opacity: lineOpacity,
                }} />
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                background: 'rgba(255,255,255,0.05)',
                border: `1px solid ${step.color}30`,
                borderLeft: `3px solid ${step.color}`,
                borderRadius: 12,
                padding: '14px 20px',
                transform: `scale(${s}) translateX(${interpolate(s, [0, 1], [-20, 0])}px)`,
                opacity,
                boxShadow: `0 2px 16px ${step.color}15`,
              }}>
                <div style={{ fontSize: 28, minWidth: 42, textAlign: 'center' }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{step.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.55 }}>{step.desc}</div>
                </div>
                <div style={{
                  fontSize: 11, color: step.color, fontWeight: 700,
                  letterSpacing: 1, opacity: 0.7,
                }}>
                  {i + 1}/{steps.length}
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Loop / done indicator */}
      <Sequence from={firstStepAt + steps.length * stepDelay + 10}>
        <div style={{
          marginTop: 24,
          fontSize: 13,
          opacity: ease(frame, firstStepAt + steps.length * stepDelay + 10, firstStepAt + steps.length * stepDelay + 30) * 0.55,
          color: steps[steps.length - 1]?.color || '#2ecc71',
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          {loop ? '↺ repeats for each task' : '✓ complete'}
        </div>
      </Sequence>
    </AbsoluteFill>
  )
}
