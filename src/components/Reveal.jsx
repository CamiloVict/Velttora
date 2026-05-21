import { useEffect, useRef } from 'react';

export function Reveal({ children, className = '', delay, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const classes = ['reveal', delayClass, className].filter(Boolean).join(' ');

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
