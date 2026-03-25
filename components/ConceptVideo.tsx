import React, { useState } from 'react'
import { Player } from '@remotion/player'
import { AgentLoopComposition } from './compositions/AgentLoop'
import { IntroComposition } from './compositions/Intro'
import {
  ModelsComposition,
  AgentsComposition,
  HarnessesComposition,
  MemoryComposition,
  ConceptToolsComposition,
  HistoryComposition,
  ToolsOverviewComposition,
  ToolClaudeComposition,
  ToolClaudeCodeComposition,
  ToolCursorComposition,
  ToolOpenCodeComposition,
  ToolScoutComposition,
  ToolOpenClawComposition,
  ToolNanoClawComposition,
  QuickStartComposition,
  RecipeInvoiceComposition,
  RecipeSalesComposition,
  RecipeContentComposition,
  RecipeOnboardingComposition,
  RecipeSupplyChainComposition,
} from './compositions/ConceptVideos'

type CompositionDef = {
  component: React.ComponentType
  durationInFrames: number
  fps: number
  width: number
  height: number
}

function def(component: React.ComponentType, durationInFrames = 240): CompositionDef {
  return { component, durationInFrames, fps: 30, width: 1280, height: 720 }
}

const COMPOSITIONS: Record<string, CompositionDef> = {
  // Original compositions
  'intro':              def(IntroComposition, 180),
  'agent-loop':         def(AgentLoopComposition, 240),

  // Concepts
  'models':             def(ModelsComposition, 220),
  'agents':             def(AgentsComposition, 260),
  'harnesses':          def(HarnessesComposition, 220),
  'memory':             def(MemoryComposition, 220),
  'tools':              def(ConceptToolsComposition, 240),
  'history':            def(HistoryComposition, 260),

  // Tools
  'tools-overview':     def(ToolsOverviewComposition, 200),
  'tool-claude':        def(ToolClaudeComposition, 220),
  'tool-claude-code':   def(ToolClaudeCodeComposition, 250),
  'tool-cursor':        def(ToolCursorComposition, 220),
  'tool-open-code':     def(ToolOpenCodeComposition, 220),
  'tool-scout':         def(ToolScoutComposition, 220),
  'tool-openclaw':      def(ToolOpenClawComposition, 220),
  'tool-nanoclaw':      def(ToolNanoClawComposition, 220),

  // Recipes + misc
  'quick-start':        def(QuickStartComposition, 250),
  'recipe-invoice':     def(RecipeInvoiceComposition, 260),
  'recipe-sales':       def(RecipeSalesComposition, 260),
  'recipe-content':     def(RecipeContentComposition, 260),
  'recipe-onboarding':  def(RecipeOnboardingComposition, 260),
  'recipe-supply-chain':def(RecipeSupplyChainComposition, 260),
}

interface ConceptVideoProps {
  id: string
  title: string
}

export function ConceptVideo({ id, title }: ConceptVideoProps) {
  const [, setPlaying] = useState(false)
  const composition = COMPOSITIONS[id]

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
          acknowledgeRemotionLicense
        />
      </div>
    )
  }

  // Fallback placeholder (should not appear — all IDs are registered above)
  return (
    <div
      onClick={() => setPlaying(p => !p)}
      style={{
        margin: '24px 0',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
        cursor: 'pointer',
        aspectRatio: '16/9',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: 'white',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      <div style={{ fontSize: 56, marginBottom: 16 }}>▶</div>
      <div style={{ fontSize: 20, fontWeight: 600 }}>{title}</div>
      <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 11, opacity: 0.4, letterSpacing: 1, textTransform: 'uppercase' }}>
        Concept Video
      </div>
    </div>
  )
}
