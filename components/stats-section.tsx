"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: 50, prefix: "+", suffix: "", label: "Studierende aus DACH" },
  { value: 5, prefix: "", suffix: "", label: "Fakultäten" },
  { value: 100, prefix: "+", suffix: "", label: "Nationalitäten" },
  { value: 1961, prefix: "", suffix: "", label: "Universität gegründet" },
];

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 2000
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const step = value / (duration / 16);

          const timer = setInterval(() => {
            start += step;
            if (start >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration, hasAnimated]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-slate-800 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-slate-950 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold tracking-tight sm:text-4xl mb-4">
            Die Universität in Zahlen
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Die Islamische Universität Medina – eine der bedeutendsten Einrichtungen für islamische Wissenschaften weltweit.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </div>
              <div className="text-slate-400 font-medium text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
