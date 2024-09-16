import { init } from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import { env } from '@/env'

init({
  dsn: env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],

  // Tracing
  tracesSampleRate: 0.5, // Sample 50% of transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
})
