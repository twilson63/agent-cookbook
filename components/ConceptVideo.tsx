import React, { useState } from 'react'
import { Player } from '@remotion/player'
import { AgentLoopComposition } from './compositions/AgentLoop'
import { IntroComposition } from './compositions/Intro'

// Registry mapping video IDs to Remotion compositions
const COMPOSITIONS: Record<string, {
  component: React.ComponentType
  durationInFrames: number
  fps: number
  width: number
  height: number
}> = {
  'intro': {
    component: IntroComposition,
    durationInFrames: 180,
    fps: 30,
    width: 1280,
    height: 720,
  },
  'agent-loop': {
    component: AgentLoopComposition,
    durationInFrames: 240,
    fps: 30,
    width: 1280,
    height: 720,
  },
}

// For IDs without a composition yet, show a coming-soon placeholder
function PlaceholderComposition({ title }: { title: string }) {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: 'white',
    }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
      <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 14, opacity: 0.6 }}>Video coming soon</div>
    </div>
  )
}

interface ConceptVideoProps {
  id: string
  title: string
}

export function ConceptVideo({ id, title }: ConceptVideoProps) {
  const [playing, setPlaying] = useState(false)
  const composition = COMPOSITIONS[id]

  // Use the Remotion Player if a composition exists
  if (composition) {
    return (
      <div style={{ margin: '24px 0', borderRadius: 12, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.18)' }}>
        <Player
          component={composition.component as React.ComponentType<Record<string, never>>}
          durationInFrames={composition.durationInFrames}
          fps={composition.fps}
          compositionWidth={composition.width}
          compositionHeight={composition.height}
          style={{ width: '100%', aspectRatio: '16/9' }}
          controls
          autoPlay={false}
          loop={false}
        />
      </div>
    )
  }

  // Fallback: static placeholder card with play button
  return (
    <div
      onClick={() => setPlaying(!playing)}
      style={{
        margin: '24px 0',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        position: 'relative',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        userSelect: 'none',
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 16 }}>▶</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
      <div style={{
        position: 'absolute',
        top: 12,
        right: 14,
        fontSize: 11,
        opacity: 0.5,
        letterSpacing: 1,
        textTransform: 'uppercase',
      }}>
        Concept Video
      </div>
    </div>
  )
}
