import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 700, fontSize: '1.2rem' }}>
      🍳 Agent Cookbook
    </span>
  ),
  project: {
    link: 'https://github.com/twilson63/agent-cookbook',
  },
  docsRepositoryBase: 'https://github.com/twilson63/agent-cookbook/blob/main',
  footer: {
    text: (
      <span>
        Agent Cookbook — built with{' '}
        <a href="https://nextra.site" target="_blank" rel="noreferrer">
          Nextra
        </a>{' '}
        · Powered by{' '}
        <a href="https://scoutos.live" target="_blank" rel="noreferrer">
          Scout
        </a>
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Agent Cookbook" />
      <meta property="og:description" content="A practical guide to AI models, agents, and agent harnesses — from beginner to builder." />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    </>
  ),
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Agent Cookbook',
    }
  },
  primaryHue: 220,
  primarySaturation: 72,
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <span style={{ fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 }}>{title}</span>
      }
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: null,
  },
}

export default config
