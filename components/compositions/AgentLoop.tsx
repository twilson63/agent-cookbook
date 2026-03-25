import React from 'react'
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion'

function easeIn(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function popIn(frame: number, start: number, fps: number) {
  return spring({ frame: frame - start, fps, config: { damping: 12, stiffness: 100, mass: 0.6 } })
}

const STEPS = [
  { icon: '📨', title: 'User sends a task', desc: '"Find the 5 best leads from this list"', color: '#4f8ef7', from: 15 },
  { icon: '🔍', title: 'Agent observes context', desc: 'Reads the file, checks memory', color: '#9b59b6', from: 50 },
  { icon: '🧠', title: 'Agent reasons', desc: 'Forms a plan: search → filter → rank', color: '#e67e22', from: 85 },
  { icon: '🛠️', title: 'Uses tools', desc: 'Calls web search, CRM API, spreadsheet', color: '#2ecc71', from: 120 },
  { icon: '✅', title: 'Delivers result', desc: 'Returns ranked leads with reasoning', color: '#1abc9c', from: 160 },
]

export function AgentLoopComposition() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <AbsoluteFill style={{
      background: 'linear-gradient(160deg, #0d1117 0%, #161b22 50%, #0d1117 100%)',
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 100px',
    }}>
      {/* Title */}
      <div style={{
        fontSize: 32,
        fontWeight: 700,
        opacity: easeIn(frame, 0, 20),
        marginBottom: 48,
        letterSpacing: -0.5,
        color: 'rgba(255,255,255,0.9)',
      }}>
        The Agent Loop
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0, width: '100%', maxWidth: 700 }}>
        {STEPS.map((step, i) => {
          const scale = popIn(frame, step.from, fps)
          const opacity = easeIn(frame, step.from, step.from + 20)

          // Show connector line after first step
          const lineOpacity = i > 0 ? easeIn(frame, step.from - 5, step.from + 5) : 0

          return (
            <React.Fragment key={step.title}>
              {i > 0 && (
                <div style={{
                  width: 2,
                  height: 20,
                  background: `linear-gradient(180deg, ${STEPS[i - 1].color}80, ${step.color}80)`,
                  marginLeft: 28,
                  opacity: lineOpacity,
                }} />
              )}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                background: `rgba(255,255,255,0.04)`,
                border: `1px solid ${step.color}30`,
                borderLeft: `3px solid ${step.color}`,
                borderRadius: 12,
                padding: '16px 20px',
                transform: `scale(${scale}) translateX(${interpolate(scale, [0, 1], [-20, 0])}px)`,
                opacity,
                boxShadow: `0 2px 12px ${step.color}10`,
              }}>
                <div style={{ fontSize: 28, minWidth: 40, textAlign: 'center' }}>{step.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 2 }}>{step.title}</div>
                  <div style={{ fontSize: 13, opacity: 0.55 }}>{step.desc}</div>
                </div>
                <div style={{
                  fontSize: 12,
                  color: step.color,
                  fontWeight: 700,
                  letterSpacing: 1,
                  opacity: 0.8,
                }}>
                  {i + 1}/{STEPS.length}
                </div>
              </div>
            </React.Fragment>
          )
        })}
      </div>

      {/* Done indicator */}
      <Sequence from={195}>
        <div style={{
          marginTop: 32,
          fontSize: 14,
          opacity: easeIn(frame, 195, 215) * 0.6,
          color: '#2ecc71',
          letterSpacing: 2,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          ✓ Task complete — loop resets for the next task
        </div>
      </Sequence>
    </AbsoluteFill>
  )
}
