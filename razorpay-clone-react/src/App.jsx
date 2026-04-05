import { motion } from 'framer-motion';

const features = [
  '100+ payment methods',
  'Instant settlements',
  'Fraud protection',
  'Developer-friendly APIs'
];

const stats = [
  { label: 'Transactions processed', value: '$180B+' },
  { label: 'Businesses served', value: '8M+' },
  { label: 'Payment success rate', value: '99.95%' }
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="mx-auto max-w-6xl px-6 py-6">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur">
          <h1 className="text-lg font-bold tracking-wide text-brand-500">Razorpay</h1>
          <ul className="hidden gap-7 text-sm md:flex">
            <li>Payments</li>
            <li>Banking+</li>
            <li>Payroll</li>
            <li>Pricing</li>
          </ul>
          <button className="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold hover:bg-brand-600">
            Sign Up
          </button>
        </nav>
      </header>

      <main className="mx-auto grid max-w-6xl items-center gap-14 px-6 py-8 md:grid-cols-2 md:py-20">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <p className="mb-3 inline-block rounded-full border border-brand-500/40 bg-brand-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-500">
            Complete Payment Stack
          </p>
          <h2 className="text-4xl font-black leading-tight md:text-5xl">
            Accept payments. <br /> Build trust. <br /> Scale globally.
          </h2>
          <p className="mt-5 max-w-lg text-slate-300">
            A Razorpay-inspired React landing page built with Tailwind CSS and Motion animations.
            Launch checkout, subscriptions, and payouts from one unified dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button className="rounded-lg bg-brand-500 px-5 py-3 font-semibold shadow-glow hover:bg-brand-600">
              Start Now
            </button>
            <button className="rounded-lg border border-white/20 px-5 py-3 font-semibold hover:border-brand-500 hover:text-brand-500">
              View Docs
            </button>
          </div>

          <ul className="mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="rounded-md border border-white/10 bg-white/5 px-4 py-3">
                ✓ {feature}
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-glow"
        >
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold">Live Dashboard</h3>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              Online
            </span>
          </div>

          <div className="space-y-4">
            {stats.map((stat) => (
              <motion.div
                whileHover={{ y: -2, scale: 1.01 }}
                key={stat.label}
                className="rounded-xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase tracking-wider text-slate-400">{stat.label}</p>
                <p className="mt-1 text-2xl font-bold">{stat.value}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-brand-500/40 bg-brand-500/10 p-4 text-sm text-brand-100">
            Next settlement in <span className="font-bold">02h 14m</span>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
