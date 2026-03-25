import React from 'react'
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from 'remotion'

function fadeIn(frame: number, start: number, duration: number) {
  return interpolate(frame, [start, start + duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
}

function slideUp(frame: number, start: number, duration: number, fps: number) {
  const progress = spring({ frame: frame - start, fps, config: { damping: 14, stiffness: 80 } })
  const translateY = interpolate(progress, [0, 1], [40, 0])
  const opacity = interpolate(frame, [start, start + duration * 0.5], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })
  return { translateY, opacity }
}

export function IntroComposition() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const titleAnim = slideUp(frame, 10, 30, fps)
  const subtitleAnim = slideUp(frame, 35, 30, fps)

  const step1 = slideUp(frame, 65, 25, fps)
  const step2 = slideUp(frame, 85, 25, fps)
  const step3 = slideUp(frame, 105, 25, fps)

  const arrowOpacity1 = fadeIn(frame, 80, 15)
  const arrowOpacity2 = fadeIn(frame, 100, 15)

  const bgPulse = interpolate(frame, [0, 180], [0, 360])

  const steps = [
    { icon: '📥', label: 'Observe', color: '#4f8ef7', desc: 'Takes in information', anim: step1 },
    { icon: '🧠', label: 'Think', color: '#9b59b6', desc: 'Reasons about the task', anim: step2 },
    { icon: '⚡', label: 'Act', color: '#2ecc71', desc: 'Uses tools & responds', anim: step3 },
  ]

  return (
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at ${50 + Math.sin(bgPulse * Math.PI / 180) * 20}% ${50 + Math.cos(bgPulse * Math.PI / 180) * 15}%, #0f3460 0%, #1a1a2e 60%, #0a0a1a 100%)`,
      fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 80px',
    }}>
      {/* Background particles */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: 3,
          height: 3,
          borderRadius: '50%',
          background: 'rgba(79,142,247,0.4)',
          left: `${(i * 8.3 + 5) % 100}%`,
          top: `${(i * 7.1 + 10) % 100}%`,
          opacity: interpolate(
            (frame + i * 15) % 60,
            [0, 30, 60],
            [0.2, 0.8, 0.2],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          ),
        }} />
      ))}

      {/* Title */}
      <div style={{
        fontSize: 52,
        fontWeight: 800,
        letterSpacing: -1,
        transform: `translateY(${titleAnim.translateY}px)`,
        opacity: titleAnim.opacity,
        textAlign: 'center',
        marginBottom: 12,
        background: 'linear-gradient(90deg, #fff 0%, #4f8ef7 60%, #9b59b6 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
        What is an AI Agent?
      </div>

      {/* Subtitle */}
      <div style={{
        fontSize: 20,
        opacity: subtitleAnim.opacity * 0.7,
        transform: `translateY(${subtitleAnim.translateY}px)`,
        textAlign: 'center',
        marginBottom: 64,
        maxWidth: 600,
        lineHeight: 1.5,
      }}>
        A model that doesn't just answer — it <em>acts</em>.
        It observes, reasons, and uses tools to get things done.
      </div>

      {/* The 3-step loop */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
      }}>
        {steps.map((step, i) => (
          <React.Fragment key={step.label}>
            {i > 0 && (
              <div style={{
                fontSize: 28,
                opacity: i === 1 ? arrowOpacity1 : arrowOpacity2,
                color: 'rgba(255,255,255,0.4)',
                margin: '0 8px',
              }}>→</div>
            )}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              background: `rgba(255,255,255,0.06)`,
              border: `1.5px solid ${step.color}40`,
              borderRadius: 16,
              padding: '28px 36px',
              transform: `translateY(${step.anim.translateY}px)`,
              opacity: step.anim.opacity,
              minWidth: 180,
              boxShadow: `0 0 24px ${step.color}22`,
            }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{step.icon}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: step.color, marginBottom: 6 }}>
                {step.label}
              </div>
              <div style={{ fontSize: 14, opacity: 0.6, textAlign: 'center' }}>
                {step.desc}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Loop arrow */}
      <Sequence from={125}>
        <div style={{
          marginTop: 32,
          fontSize: 13,
          opacity: fadeIn(frame, 125, 20) * 0.5,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          ↺ repeats until the task is complete
        </div>
      </Sequence>
    </AbsoluteFill>
  )
}
