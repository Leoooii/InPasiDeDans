import React from 'react'

const levels = [
  {
    num: 1,
    name: 'Începători',
    duration: 'până la 6 luni',
    description: 'Pași de bază, ritm, coordonare',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  {
    num: 2,
    name: 'Intermediari 1',
    duration: '6 luni – 1 an',
    description: 'Variații tehnice, stilistică',
    badgeBg: 'bg-sky-100',
    badgeText: 'text-sky-700',
    border: 'border-sky-200',
  },
  {
    num: 3,
    name: 'Intermediari 2',
    duration: '1 an – 2 ani',
    description: 'Combinații complexe, muzicalitate',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
    border: 'border-indigo-200',
  },
  {
    num: 4,
    name: 'Intermediari 3',
    duration: '2 – 3 ani',
    description: 'Expresivitate, performanță',
    badgeBg: 'bg-violet-100',
    badgeText: 'text-violet-700',
    border: 'border-violet-200',
  },
  {
    num: 5,
    name: 'Avansați',
    duration: 'peste 3 ani',
    description: 'Tehnici avansate, improvizație',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-700',
    border: 'border-rose-200',
  },
]

const DanceLevels = () => {
  return (
    <section className="py-14 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Niveluri de dans</h2>
          <p className="mt-2 text-slate-500 text-sm max-w-xl mx-auto">
            Fiecare cursant avansează în propriul ritm. Nivelul este stabilit de instructori
            în funcție de experiența acumulată și tehnica dobândită.
          </p>
        </div>

        {/* Horizontal connector — visible md+ */}
        <div className="hidden md:flex items-center justify-between mb-6 px-8 relative">
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0" />
          {levels.map((lvl) => (
            <div
              key={lvl.num}
              className={`relative z-10 w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base ${lvl.badgeBg} ${lvl.badgeText} shadow-sm border border-white`}
            >
              {lvl.num}
            </div>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {levels.map((lvl) => (
            <div
              key={lvl.num}
              className={`relative p-5 rounded-2xl border bg-white shadow-sm hover:shadow-md transition-shadow ${lvl.border}`}
            >
              {/* Badge — visible on mobile only (md hides the track version above) */}
              <div
                className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg ${lvl.badgeBg} ${lvl.badgeText}`}
              >
                {lvl.num}
              </div>

              {/* Badge — hidden on mobile, shown on md+ (complements the track) */}
              <div
                className={`hidden md:flex w-10 h-10 rounded-xl items-center justify-center font-bold text-lg ${lvl.badgeBg} ${lvl.badgeText}`}
              >
                {lvl.num}
              </div>

              <p className="font-semibold text-slate-900 mt-3 text-sm leading-snug">{lvl.name}</p>

              <span className="inline-block text-xs font-medium bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full mt-1">
                {lvl.duration}
              </span>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed">{lvl.description}</p>
            </div>
          ))}
        </div>

        {/* Children note */}
        <div className="mt-8 p-4 rounded-xl bg-amber-50 border border-amber-100 text-center">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Cursanții copii</span> urmează o progresie separată:{' '}
            <span className="font-medium">Copii Începători</span> &rarr;{' '}
            <span className="font-medium">Copii Intermediari</span> &rarr;{' '}
            <span className="font-medium">Copii Avansați</span> &rarr;{' '}
            <span className="font-medium">Formație</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DanceLevels
