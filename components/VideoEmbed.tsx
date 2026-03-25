import React from 'react'

interface VideoEmbedProps {
  src: string
  title: string
  description?: string
}

export function VideoEmbed({ src, title, description }: VideoEmbedProps) {
  return (
    <div style={{
      margin: '24px 0',
      borderRadius: 12,
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <video
        controls
        preload="metadata"
        style={{
          width: '100%',
          display: 'block',
          aspectRatio: '16/9',
          background: '#0d1117',
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {(title || description) && (
        <div style={{
          padding: '12px 16px',
          background: 'rgba(0,0,0,0.3)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
          {title && (
            <div style={{ fontWeight: 600, fontSize: 14, marginBottom: description ? 4 : 0 }}>
              {title}
            </div>
          )}
          {description && (
            <div style={{ fontSize: 13, opacity: 0.6 }}>{description}</div>
          )}
        </div>
      )}
    </div>
  )
}
