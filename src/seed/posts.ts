import { h2, p, richText } from './helpers'

export const starterPosts = (coverIds: { first: number; second: number }) => [
  {
    title: 'What actually happens when an AI answers your business line',
    slug: 'what-actually-happens-when-an-ai-answers-your-business-line',
    excerpt:
      'A walk through the first sixty seconds of an AI-handled call — what the agent hears, what it asks, and what lands in your CRM before the caller hangs up.',
    author: 'SkipDial Team',
    publishedAt: '2026-07-01T09:00:00.000Z',
    cover: coverIds.first,
    tags: [{ tag: 'AI Voice' }, { tag: 'Operations' }],
    content: richText([
      p('The phone rings once. Before the second ring, the call is answered — not by a menu asking the caller to press 1, but by a voice that says hello and asks how it can help.'),
      h2('The first ten seconds'),
      p('The agent listens to whatever the caller says, in whatever order they say it. A tenant describing a leak, a homeowner asking about AC repair pricing, a prospect asking whether you serve their zip code — the agent identifies the intent and pulls up the workflow you configured for that situation.'),
      h2('The middle of the call'),
      p('This is where structure beats improvisation. The agent asks the intake questions you require, in the order you require them. It does not skip the callback number because things got busy. It does not forget to ask whether this is an emergency. If the caller asks something outside its approved knowledge base, it says so and offers a transfer — it does not guess.'),
      h2('The last ten seconds'),
      p('The agent books the appointment against your real calendar availability, confirms the details back to the caller, and ends the call. By the time the caller puts their phone down, your CRM already has a summary, an outcome tag, the structured intake fields, and a follow-up task if one is needed.'),
      p('No sticky notes. No voicemail backlog. No "who took that call?" The whole point of AI call handling is not that a robot talks — it is that nothing about the call depends on memory.'),
    ]),
  },
  {
    title: '5 signs your front desk is losing you customers',
    slug: '5-signs-your-front-desk-is-losing-you-customers',
    excerpt:
      'Missed-call spikes, voicemail backlogs, and intake that depends on who picked up — the quiet ways call handling leaks revenue.',
    author: 'SkipDial Team',
    publishedAt: '2026-06-20T09:00:00.000Z',
    cover: coverIds.second,
    tags: [{ tag: 'Operations' }],
    content: richText([
      p('Most businesses do not lose customers dramatically. They lose them one unanswered ring at a time. Here are five signs it is happening to you.'),
      h2('1. Your missed-call count spikes at the exact moments demand spikes'),
      p('Storm days, Monday mornings, campaign launches — the times your phone rings most are the times your team can least afford to answer it. If your best days for demand are your worst days for answer rate, growth is capped by your front desk.'),
      h2('2. After-hours callers get voicemail — and never call back'),
      p('A caller at 9 PM has a problem right now. Voicemail asks them to wait until tomorrow; a competitor one search result away does not.'),
      h2('3. Intake quality depends on who picked up'),
      p('One coordinator asks all the right questions. Another writes "call back re: roof" on a notepad. If two callers with the same problem produce two different records, you do not have an intake process — you have intake luck.'),
      h2('4. Your CRM only knows about the calls that went well'),
      p('Booked jobs get logged. Missed calls, hang-ups, and info-only conversations vanish. That means your reporting overstates how well the phone is working — you cannot see the leak you are trying to fix.'),
      h2('5. Follow-up lives in someone’s head'),
      p('"I was going to call them back this afternoon" is not a follow-up system. When callbacks depend on personal memory, busy weeks quietly delete them.'),
      p('None of these problems require heroics to fix. They require every call to be answered, every intake to follow the same structure, and every outcome to land in your systems automatically — which is exactly the job an AI call agent is built for.'),
    ]),
  },
]
