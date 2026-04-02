'use client';

interface Props {
  text: string;
}

export default function StreamingText({ text }: Props) {
  if (!text) return null;

  return (
    <div
      style={{
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '20px 24px',
        marginTop: '16px',
        width: '100%',
        boxSizing: 'border-box',
        maxWidth: '90vw',
        marginInline: 'auto',
      }}
    >
      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '13px',
          lineHeight: 1.8,
          whiteSpace: 'pre-wrap',
          wordBreak: 'keep-all',
          overflowWrap: 'break-word',
          margin: 0,
          fontFamily: 'var(--font-noto-sans-kr), monospace',
        }}
      >
        {text}
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '14px',
            background: 'var(--accent-orange)',
            marginLeft: '2px',
            verticalAlign: 'middle',
            animation: 'pulse 1s infinite',
          }}
        />
      </p>
    </div>
  );
}
