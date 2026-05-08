'use client';

import styles from './HoverLetters.module.css';

type Props = {
  text: string;
  className?: string;
  hoverColor?: string;
  glowColor?: string;
};

export default function HoverLetters({
  text,
  className,
  hoverColor = '#fffef5',
  glowColor = 'rgba(255, 253, 210, 0.42)',
}: Props) {
  return (
    <span className={className} aria-label={text} role="text">
      {text.split(' ').map((word, i, arr) => (
        <span key={i}>
          <span
            className={styles.letter}
            aria-hidden="true"
            onPointerEnter={(e) => {
              e.currentTarget.style.color = hoverColor;
              e.currentTarget.style.textShadow = `0 0 22px ${glowColor}`;
            }}
            onPointerLeave={(e) => {
              e.currentTarget.style.color = '';
              e.currentTarget.style.textShadow = '';
            }}
          >
            {word}
          </span>
          {i < arr.length - 1 && ' '}
        </span>
      ))}
    </span>
  );
}
