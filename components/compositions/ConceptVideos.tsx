/**
 * All 20 ConceptVideo compositions — one file, data-driven via templates.
 * Each export matches a ConceptVideo id in the pages.
 */
import React from 'react'
import { SlideTemplate } from './templates/SlideTemplate'
import { FlowTemplate } from './templates/FlowTemplate'
import { TimelineTemplate } from './templates/TimelineTemplate'

// ─── CONCEPTS BATCH ──────────────────────────────────────────────────────────

export function ModelsComposition() {
  return (
    <SlideTemplate
      icon="🧠"
      title="What is an AI Model?"
      subtitle="A model is a mathematical system trained on vast amounts of text to predict what comes next — and in doing so, it learns to reason, write, and answer questions."
      accentColor="#4f8ef7"
      bgFrom="#0d1117"
      bgTo="#0f1f3d"
      bullets={[
        { icon: '📖', text: 'Context window', sub: 'How much text it can read in one go — up to 200,000 tokens (≈150,000 words)' },
        { icon: '⚡', text: 'Reasoning', sub: 'Models can think step-by-step before answering — better accuracy on hard problems' },
        { icon: '💰', text: 'Speed vs cost', sub: 'Smaller models are faster and cheaper; larger models are more capable' },
        { icon: '🎯', text: 'Instruction following', sub: 'Modern models reliably do what you ask — the foundation of all agent behaviour' },
      ]}
    />
  )
}

export function AgentsComposition() {
  return (
    <FlowTemplate
      title="Models vs Agents"
      subtitle="A model answers. An agent acts — it loops through observe, think, and act until the task is done."
      bgFrom="#0d1117"
      bgTo="#1a0d2e"
      loop
      steps={[
        { icon: '📨', title: 'Observe', desc: 'Receives a task and reads all available context', color: '#4f8ef7' },
        { icon: '🧠', title: 'Think', desc: 'Reasons about what needs to happen and in what order', color: '#9b59b6' },
        { icon: '📋', title: 'Plan', desc: 'Decides which tools to use and sequences the steps', color: '#e67e22' },
        { icon: '🛠️', title: 'Act', desc: 'Calls tools, writes code, sends messages, reads files', color: '#2ecc71' },
        { icon: '✅', title: 'Respond', desc: 'Returns the result — or loops back if the task is unfinished', color: '#1abc9c' },
      ]}
    />
  )
}

export function HarnessesComposition() {
  return (
    <SlideTemplate
      icon="🔧"
      title="What is a Harness?"
      subtitle="A harness is the layer between a raw AI model and the real world. It gives the model memory, tools, a personality, and a deployment target."
      accentColor="#e67e22"
      bgFrom="#0d1117"
      bgTo="#1a1000"
      bullets={[
        { icon: '🧱', text: 'Application layer', sub: 'Your product — what users see and interact with' },
        { icon: '⚙️', text: 'Harness layer', sub: 'Manages the loop, memory, tools, and system prompt' },
        { icon: '🤖', text: 'Model layer', sub: 'The AI brain — Claude, GPT-4, Gemini — that does the reasoning' },
        { icon: '🌐', text: 'Spectrum of harnesses', sub: 'From raw API calls to full platforms like Scout — pick the right level of abstraction' },
      ]}
    />
  )
}

export function MemoryComposition() {
  return (
    <SlideTemplate
      icon="💾"
      title="How Agents Remember"
      subtitle="Memory is what separates a one-shot chatbot from an agent that learns and improves over time."
      accentColor="#9b59b6"
      bgFrom="#0d1117"
      bgTo="#1a0d2e"
      bullets={[
        { icon: '💬', text: 'In-context memory', sub: 'The conversation so far — fast but limited to the context window' },
        { icon: '🗄️', text: 'Persistent memory', sub: 'A database the agent writes to and reads across sessions' },
        { icon: '📼', text: 'Episodic memory', sub: 'Logs of past runs — lets the agent learn from what worked' },
        { icon: '🔍', text: 'Semantic memory', sub: 'Embeddings and vector search — find relevant facts by meaning, not exact match' },
      ]}
    />
  )
}

export function ConceptToolsComposition() {
  return (
    <SlideTemplate
      icon="🛠️"
      title="Tools & Actions"
      subtitle="Tools are what transform a model from a talker into a doer. Every real-world action an agent takes goes through a tool."
      accentColor="#2ecc71"
      bgFrom="#0d1117"
      bgTo="#0d1f14"
      bullets={[
        { icon: '🌐', text: 'Web search', sub: 'Browse the internet and read current information' },
        { icon: '💻', text: 'Code execution', sub: 'Write and run code — Python, JavaScript, bash' },
        { icon: '📁', text: 'File operations', sub: 'Read, write, create, and organise files' },
        { icon: '🔌', text: 'API calls', sub: 'Connect to any external service — CRMs, databases, email' },
        { icon: '🤖', text: 'Sub-agents', sub: 'Spawn specialist agents to handle parts of the task in parallel' },
      ]}
    />
  )
}

export function HistoryComposition() {
  return (
    <TimelineTemplate
      title="From Rules to Agents"
      bgFrom="#0a0a1a"
      bgTo="#0d1117"
      events={[
        { year: '1950s–80s', icon: '📜', title: 'Rule-based systems', desc: 'Explicit if/then logic. Fast but brittle.', color: '#7f8c8d' },
        { year: '1990s–2000s', icon: '📊', title: 'Machine learning', desc: 'Models learn from data. No manual rules.', color: '#3498db' },
        { year: '2017', icon: '⚡', title: 'Transformer', desc: '"Attention Is All You Need" — the architecture behind GPT, Claude, Gemini.', color: '#9b59b6' },
        { year: '2020', icon: '🚀', title: 'GPT-3', desc: '175B parameters. Few-shot learning changes everything.', color: '#e67e22' },
        { year: '2022', icon: '💬', title: 'ChatGPT', desc: '100M users in 60 days. AI goes mainstream.', color: '#e74c3c' },
        { year: '2024–now', icon: '🤖', title: 'Agent era', desc: 'Models use tools, run loops, and complete real tasks autonomously.', color: '#2ecc71' },
      ]}
    />
  )
}

// ─── TOOLS BATCH ─────────────────────────────────────────────────────────────

export function ToolsOverviewComposition() {
  return (
    <SlideTemplate
      icon="🗺️"
      title="The AI Tools Landscape"
      subtitle="Three tiers: the models that reason, the assistants that help you code, and the platforms that run agents in production."
      accentColor="#4f8ef7"
      bgFrom="#0d1117"
      bgTo="#0f1f3d"
      bullets={[
        { icon: '🧠', text: 'Frontier models', sub: 'Claude, GPT-4, Gemini — the AI brains you give instructions to' },
        { icon: '⌨️', text: 'Coding assistants', sub: 'Claude Code, Cursor, OpenCode — AI that writes and ships software' },
        { icon: '🏗️', text: 'Agent platforms', sub: 'Scout, OpenClaw, NanoClaw — deploy, run, and monitor production agents' },
      ]}
    />
  )
}

export function ToolClaudeComposition() {
  return (
    <SlideTemplate
      icon="✳️"
      title="Claude"
      subtitle="Anthropic's frontier model family. Built for complex reasoning, long documents, and safe enterprise use."
      accentColor="#cc785c"
      bgFrom="#0d1117"
      bgTo="#1a0f0a"
      bullets={[
        { icon: '📏', text: '200K token context', sub: 'Read an entire book, a year of reports, or a full codebase in one call' },
        { icon: '🔬', text: 'Extended thinking', sub: 'Reasons step-by-step before answering — better on hard multi-step problems' },
        { icon: '🛡️', text: 'Constitutional AI', sub: 'Trained to be honest and avoid harm — important for production agents' },
        { icon: '🖥️', text: 'Computer use', sub: 'Can click, type, and navigate any app — automate legacy systems without an API' },
      ]}
    />
  )
}

export function ToolClaudeCodeComposition() {
  return (
    <FlowTemplate
      title="Claude Code"
      subtitle="An autonomous coding agent. Give it a task in plain English — it reads, plans, codes, tests, and commits."
      bgFrom="#0d1117"
      bgTo="#0f2d1f"
      steps={[
        { icon: '📂', title: 'Reads your codebase', desc: 'Scans files, imports, and conventions before writing a line', color: '#4f8ef7' },
        { icon: '🗺️', title: 'Forms a plan', desc: 'Breaks the task into logical steps across files', color: '#9b59b6' },
        { icon: '✍️', title: 'Writes the code', desc: 'Multi-file edits, following your existing patterns', color: '#e67e22' },
        { icon: '🧪', title: 'Runs tests', desc: 'Executes your test suite and fixes failures automatically', color: '#3498db' },
        { icon: '✅', title: 'Shows you the diff', desc: 'You review and approve before anything is committed', color: '#2ecc71' },
      ]}
    />
  )
}

export function ToolCursorComposition() {
  return (
    <SlideTemplate
      icon="🖱️"
      title="Cursor"
      subtitle="The AI-first IDE. Built around AI from the start — not an extension bolted onto VS Code."
      accentColor="#4f8ef7"
      bgFrom="#0d1117"
      bgTo="#0d1a2e"
      bullets={[
        { icon: '⭾', text: 'Tab completion', sub: 'Predicts multi-line, multi-location edits — press Tab to accept' },
        { icon: '💬', text: 'Cmd+K inline edits', sub: 'Select code, describe what you want, apply the diff instantly' },
        { icon: '🗨️', text: 'Codebase chat', sub: 'Ask questions about your whole project — @-mention files, functions, docs' },
        { icon: '🎼', text: 'Composer', sub: 'Full-screen agent mode — describe a feature, Cursor plans and builds it end-to-end' },
      ]}
    />
  )
}

export function ToolOpenCodeComposition() {
  return (
    <SlideTemplate
      icon="⌨️"
      title="OpenCode"
      subtitle="Open-source terminal coding agent. Model-agnostic, self-hostable, fully scriptable."
      accentColor="#2ecc71"
      bgFrom="#0d1117"
      bgTo="#0d1f14"
      bullets={[
        { icon: '🔓', text: 'Open source', sub: 'Read the code, contribute, extend — no vendor lock-in' },
        { icon: '🔌', text: 'Any model', sub: 'Claude, GPT-4, Gemini, or a local Ollama model via one config line' },
        { icon: '🔒', text: 'Air-gap friendly', sub: 'Run entirely on-premise with local models — zero data leaving your network' },
        { icon: '⚙️', text: 'Fully scriptable', sub: 'Pipe tasks via stdin, use in CI/CD, build automated coding pipelines' },
      ]}
    />
  )
}

export function ToolScoutComposition() {
  return (
    <SlideTemplate
      icon="🚀"
      title="Scout"
      subtitle="The platform that turns an agent prototype into a production-grade deployment."
      accentColor="#3498db"
      bgFrom="#0d1117"
      bgTo="#0d1a2e"
      bullets={[
        { icon: '📦', text: 'Deploy from source', sub: 'Push code, Scout builds and runs it — no Docker or K8s expertise needed' },
        { icon: '📅', text: 'Managed scheduling', sub: 'Run agents on a cron schedule with logs, alerts, and failure handling' },
        { icon: '📊', text: 'Observability', sub: 'Every run logged — what tools were called, how long, how much it cost' },
        { icon: '🌐', text: 'Fully web-based', sub: 'No local installation — works in any browser, on any machine' },
      ]}
    />
  )
}

export function ToolOpenClawComposition() {
  return (
    <SlideTemplate
      icon="🦞"
      title="OpenClaw"
      subtitle="Open-source agent harness with 50+ provider integrations and a plugin architecture."
      accentColor="#e74c3c"
      bgFrom="#0d1117"
      bgTo="#1f0d0d"
      bullets={[
        { icon: '🔌', text: '50+ integrations', sub: 'Telegram, Slack, email, databases, REST APIs — all built in' },
        { icon: '🧩', text: 'Plugin architecture', sub: 'Add custom tools without forking — YAML config, runtime-loaded' },
        { icon: '🤖', text: 'Multi-agent support', sub: 'Spawn sub-agents via the delegate tool — parallel and sequential patterns' },
        { icon: '🔍', text: 'Built-in memory', sub: 'SQLite with FTS5 full-text search — agents remember across sessions' },
      ]}
    />
  )
}

export function ToolNanoClawComposition() {
  return (
    <SlideTemplate
      icon="⚡"
      title="NanoClaw"
      subtitle="678KB binary. Less than 2ms startup. Runs everywhere — edge, embedded, serverless."
      accentColor="#f39c12"
      bgFrom="#0d1117"
      bgTo="#1a1200"
      bullets={[
        { icon: '📦', text: '678KB binary', sub: 'The entire runtime in a file smaller than most favicons' },
        { icon: '⚡', text: '<2ms startup', sub: 'Serverless cold starts become negligible — scale to thousands of instances' },
        { icon: '📡', text: '19 channels', sub: 'Telegram, Slack, Discord, WhatsApp, email — all native' },
        { icon: '🤖', text: 'Sub-agents + cron', sub: 'Delegate tool for multi-agent patterns. Built-in scheduling, no external cron' },
      ]}
    />
  )
}

// ─── RECIPES + MISC BATCH ────────────────────────────────────────────────────

export function QuickStartComposition() {
  return (
    <FlowTemplate
      title="Get Started in 5 Steps"
      subtitle="You don't need to code. Start with a model, give it real work, and build from there."
      bgFrom="#0d1117"
      bgTo="#0f1f3d"
      steps={[
        { icon: '💬', title: 'Pick a model', desc: 'Open Claude.ai — talk to an AI for the first time', color: '#4f8ef7' },
        { icon: '📋', title: 'Give it real work', desc: 'Paste an actual task from your job. See what happens.', color: '#9b59b6' },
        { icon: '🛠️', title: 'Enable tools', desc: 'Add web search or file access — now it can act, not just answer', color: '#e67e22' },
        { icon: '⏰', title: 'Automate a workflow', desc: 'Schedule it to run daily. You have an agent.', color: '#2ecc71' },
        { icon: '🏗️', title: 'Build something custom', desc: 'Use Scout or OpenClaw to deploy your own agent', color: '#1abc9c' },
      ]}
    />
  )
}

export function RecipeInvoiceComposition() {
  return (
    <FlowTemplate
      title="Invoice Automation"
      subtitle="From 9 minutes per invoice to 30 seconds — with higher accuracy and zero manual data entry."
      bgFrom="#0d1117"
      bgTo="#1a1200"
      steps={[
        { icon: '📧', title: 'Email arrives', desc: 'Invoice lands in the AP inbox — agent detects it instantly', color: '#4f8ef7' },
        { icon: '🔍', title: 'Extract data', desc: 'Reads vendor, amount, line items, due date — from any format', color: '#9b59b6' },
        { icon: '✅', title: 'Validate', desc: 'Checks against PO, flags discrepancies, catches duplicates', color: '#e67e22' },
        { icon: '🔗', title: 'Post to ERP', desc: 'Creates the entry in SAP, NetSuite, or QuickBooks automatically', color: '#2ecc71' },
        { icon: '📬', title: 'Route exceptions', desc: 'Only the edge cases reach a human — everything else is done', color: '#1abc9c' },
      ]}
    />
  )
}

export function RecipeSalesComposition() {
  return (
    <FlowTemplate
      title="Sales Prospecting"
      subtitle="2 hours of research compressed into 20 minutes — every morning, automatically."
      bgFrom="#0d1117"
      bgTo="#0d1a2e"
      steps={[
        { icon: '🎯', title: 'Define ICP', desc: 'Give the agent your ideal customer profile and criteria', color: '#4f8ef7' },
        { icon: '🌐', title: 'Research prospects', desc: 'Agent searches LinkedIn, news, company sites — builds context', color: '#9b59b6' },
        { icon: '📊', title: 'Score & rank', desc: 'Scores each lead against your criteria, ranks by fit', color: '#e67e22' },
        { icon: '✍️', title: 'Draft outreach', desc: 'Personalised first-touch emails referencing real context', color: '#2ecc71' },
        { icon: '📤', title: 'Load to CRM', desc: 'Top leads loaded to Salesforce or HubSpot, ready to send', color: '#1abc9c' },
      ]}
    />
  )
}

export function RecipeContentComposition() {
  return (
    <FlowTemplate
      title="Content Repurposing"
      subtitle="Turn one piece of content into localised assets for every market — in a day, not two months."
      bgFrom="#0d1117"
      bgTo="#1a0d2e"
      steps={[
        { icon: '📄', title: 'Source content', desc: 'Start with one blog post, white paper, or campaign', color: '#4f8ef7' },
        { icon: '🌍', title: 'Translate & localise', desc: 'Agent adapts tone, idioms, and examples per market', color: '#9b59b6' },
        { icon: '📱', title: 'Format for channel', desc: 'Resizes to email, social, landing page, ad copy formats', color: '#e67e22' },
        { icon: '🔍', title: 'SEO optimise', desc: 'Injects local keywords and adjusts headlines per market', color: '#2ecc71' },
        { icon: '📦', title: 'Package for review', desc: 'Delivers a draft folder per market — humans review, not produce', color: '#1abc9c' },
      ]}
    />
  )
}

export function RecipeOnboardingComposition() {
  return (
    <FlowTemplate
      title="Employee Onboarding"
      subtitle="From 20 hours of HR work per hire to 4 hours — starting before the employee's first day."
      bgFrom="#0d1117"
      bgTo="#0f1f3d"
      steps={[
        { icon: '🎉', title: 'Offer accepted', desc: 'HRIS event triggers the agent — weeks before day one', color: '#4f8ef7' },
        { icon: '💻', title: 'IT provisioning', desc: 'Access requests for email, Slack, tools submitted in <1 min', color: '#9b59b6' },
        { icon: '📚', title: 'Onboarding pack sent', desc: 'Personalised welcome, schedule, policies, key contacts', color: '#e67e22' },
        { icon: '💬', title: '24/7 Q&A', desc: 'Agent answers HR questions on Slack — no waiting for business hours', color: '#2ecc71' },
        { icon: '📈', title: 'Pulse checks', desc: '30/60/90-day surveys surface early engagement signals', color: '#1abc9c' },
      ]}
    />
  )
}

export function RecipeSupplyChainComposition() {
  return (
    <FlowTemplate
      title="Supply Chain Exceptions"
      subtitle="50% less manual intervention — agents resolve routine exceptions before humans even see them."
      bgFrom="#0d1117"
      bgTo="#1a0d0d"
      steps={[
        { icon: '🚨', title: 'Exception detected', desc: 'Shipment delay, stockout, or demand spike flagged by system', color: '#e74c3c' },
        { icon: '🔍', title: 'Root cause analysis', desc: 'Agent checks inventory, carrier data, supplier status', color: '#e67e22' },
        { icon: '🧮', title: 'Evaluate options', desc: 'Compares rerouting, alternative suppliers, safety stock', color: '#f39c12' },
        { icon: '⚡', title: 'Auto-resolve', desc: 'Routine exceptions resolved without human involvement', color: '#2ecc71' },
        { icon: '📊', title: 'Escalate edge cases', desc: 'Only novel or high-risk exceptions reach a human planner', color: '#3498db' },
      ]}
    />
  )
}
