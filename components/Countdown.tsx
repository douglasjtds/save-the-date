'use client';

import { useEffect, useState } from 'react';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

interface CountdownProps {
  deadline: string | null;
}

function getTimeLeft(deadline: string): TimeLeft | null {
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown({ deadline }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    if (!deadline) return;
    setTimeLeft(getTimeLeft(deadline));
    const id = setInterval(() => setTimeLeft(getTimeLeft(deadline)), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  if (!deadline || timeLeft === null) return null;

  return (
    <div className="text-center mt-3">
      <p className="text-xs tracking-widest uppercase mb-1 text-ink-muted font-im-fell">
        Prazo para confirmação
      </p>
      <p className="text-sm italic text-ink-muted font-im-fell">
        {timeLeft.days}d {String(timeLeft.hours).padStart(2, '0')}h{' '}
        {String(timeLeft.minutes).padStart(2, '0')}m{' '}
        {String(timeLeft.seconds).padStart(2, '0')}s
      </p>
    </div>
  );
}
