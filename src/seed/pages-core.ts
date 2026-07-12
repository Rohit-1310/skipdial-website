import type { SeedBlock } from './helpers'

import { DEMO, gradientCta, group, hearItLive, items } from './helpers'

type PageSeed = {
  title: string
  slug: string
  layout: SeedBlock[]
  meta: { title: string; description: string }
}

export const homePage = (audioId: number): PageSeed => ({
  title: 'Home',
  slug: 'home',
  meta: {
    title: 'AI Call Agents for Inbound and Outbound Calls | SkipDial',
    description:
      'SkipDial uses AI call agents to handle inbound and outbound calls 24/7, qualify leads, book appointments, and sync call data directly to your CRM for full visibility and follow-up.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'home',
      eyebrow: '24/7 AI Call Handling',
      heading: 'Automate Your Calls With AI Agents That Never Miss an Opportunity.',
      body: 'SkipDial answers inbound and outbound calls around the clock, capturing leads, qualifying callers, and routing conversations with consistent, structured accuracy. Unlike traditional IVR systems, SkipDial uses AI agents to understand spoken requests and respond conversationally without forcing callers through menus. Every interaction is logged and delivered directly into your existing systems for full visibility.',
      primaryCta: DEMO,
      secondaryCta: { label: 'Hear a Sample', href: '#sample' },
      chips: [
        { label: 'Booked: Tue 3:00 PM' },
        { label: 'New lead qualified' },
        { label: 'Transferred to team' },
      ],
    },
    {
      blockType: 'painPoints',
      heading: 'Missed Calls Are Costing You More Than You Think',
      cards: [
        {
          title: 'Missed Calls = Lost Revenue',
          body: 'Every unanswered ring is a caller choosing the next provider on the list.',
        },
        {
          title: 'Front Desk Bottlenecks = Inconsistent Intake',
          body: 'Busy staff means skipped questions, missing details, and uneven caller experiences.',
        },
        {
          title: 'Limited Office Hours = Uncaptured Demand',
          body: 'Callers do not stop at 5 PM — voicemail is where after-hours demand goes to die.',
        },
        {
          title: 'Manual Call Notes = Poor Visibility',
          body: 'Sticky notes and memory do not scale, and they never make it into your CRM.',
        },
      ],
    },
    {
      blockType: 'steps',
      layout: 'cards',
      eyebrow: 'Automate Your Workflows',
      heading: 'How We Solve That',
      intro:
        'SkipDial replaces inconsistent call handling with structured, always-on AI agents that answer every call, collect the right information, and route conversations based on your business rules.',
      steps: [
        {
          title: 'Connect Your System',
          body: 'SkipDial connects to your phone system, CRM, and scheduling tools, so it can be integrated cleanly without disrupting your existing workflow.',
        },
        {
          title: 'Let AI Handle Calls',
          body: 'AI voice agents answer calls 24/7, engage callers naturally, and guide conversations based on your configured workflows.',
        },
        {
          title: 'Automatically Route + Qualify Leads',
          body: 'Every call is analyzed in real time. Qualified leads are routed with context so your team knows exactly who is calling and why.',
        },
        {
          title: 'Integrate With Your CRM',
          body: 'Call summaries, intake data, outcomes, and timestamps sync automatically to your CRM for tracking and follow-up.',
        },
      ],
      cta: DEMO,
    },
    {
      blockType: 'ctaBand',
      style: 'plain',
      heading: 'Ready to Hear SkipDial in Action?',
      body: 'Businesses that rely on phone calls for revenue need consistent coverage, reliable intake, and disciplined follow-up. SkipDial provides structured inbound and outbound call handling without adding headcount.',
      cta: DEMO,
    },
    {
      blockType: 'checklist',
      heading: 'Insights That Fit Seamlessly Into Your Workflow',
      body: 'SkipDial turns every call into structured data. Instead of relying on memory, sticky notes, or voicemail callbacks, your team gets organized insight delivered directly into the tools they already use.',
      items: items([
        '24/7 Call Answering',
        'Real-Time Lead Qualification',
        'CRM Sync & Follow-Up',
        'Multi-Language Support',
        'Built for High-Volume Call Teams',
      ]),
    },
    {
      blockType: 'featuresGrid',
      heading: 'Features That Set Us Apart',
      tiles: [
        {
          title: '24/7 Call Answering',
          body: 'Every call answered instantly — nights, weekends, and seasonal surges included.',
          icon: 'clock',
        },
        {
          title: 'Natural Language',
          body: 'Callers speak normally; the agent understands intent without menus or button trees.',
          icon: 'chat',
        },
        {
          title: 'Real-Time Analytics',
          body: 'Volume, outcomes, and qualification metrics visible as calls happen.',
          icon: 'chart',
        },
        {
          title: 'Multi-Language Support',
          body: 'Serve callers in the language they are most comfortable speaking.',
          icon: 'globe',
        },
        {
          title: 'CRM Integration',
          body: 'Summaries, intake data, and outcomes sync straight into your existing tools.',
          icon: 'plug',
        },
        {
          title: 'Built to Scale',
          body: 'Handles one line or a hundred — concurrency without extra headcount.',
          icon: 'scale',
        },
      ],
    },
    {
      blockType: 'audioSample',
      heading: 'Hear SkipDial in Action',
      body: 'Listen to how SkipDial answers calls, gathers information, qualifies leads, and routes conversations using structured, natural dialogue **designed around your business rules.**',
      label: 'Listen to a Sample:',
      audio: audioId,
      caption: 'A real conversation with the SkipDial agent.',
      cta: DEMO,
    },
    {
      blockType: 'demoCallForm',
      heading: 'Experience AI Voice Automation Now',
      body: "Test SkipDial's AI agent by selecting an industry and receiving a live demonstration call. Hear how structured intake, appointment booking, and call routing work in a real interaction.",
      formHeading: 'Receive a Call From Our AI Agent!',
      nameLabel: 'Name',
      phoneLabel: 'Phone',
      agentLabel: 'Choose Your AI Agent:',
      agents: [{ label: 'Law' }, { label: 'Roofing' }, { label: 'HVAC' }],
      consentText:
        'By submitting this form, you authorize SkipDial AI to contact you by phone or text message, which may include AI-generated calls. Standard carrier rates for calls and texts may apply.',
      checkboxLabel: 'Yes, have SkipDial give me a demo call.',
      submitLabel: 'Call Me',
      successMessage: 'Thank you for contacting us. We will get back to you as soon as possible.',
      errorMessage: 'Oops, there was an error sending your message. Please try again later.',
    },
    gradientCta(
      'Put SkipDial on Your Phones This Week.',
      'Schedule a free 30-minute demo. We configure a test agent around your business — then you call it yourself.',
    ),
  ],
})

export const inboundPage = (audioId: number): PageSeed => ({
  title: 'Inbound Calling',
  slug: 'inbound-calling',
  meta: {
    title: 'AI Inbound Call Handling & Automation | SkipDial',
    description:
      'SkipDial uses AI agents to answer inbound calls 24/7, qualify leads, capture structured intake data, and sync call insights directly to your CRM and scheduling systems.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Inbound Calling',
      heading: 'AI Inbound Call Handling That Captures Every Opportunity',
      body: "When someone calls your business, they're usually ready to book, schedule, or move forward. SkipDial ensures those calls are answered immediately, handled consistently, and documented accurately.",
      primaryCta: DEMO,
      secondaryCta: { label: 'Hear it Live', href: '#sample' },
    },
    {
      blockType: 'contentSplit',
      heading: 'The Problem with Traditional Call Handling',
      body: 'Even well-run offices miss calls during busy periods, lose after-hours inquiries to voicemail, and end up with intake that varies depending on who picks up. As call volume increases, these gaps become more frequent and each one represents demand that existed but went unmet.',
    },
    {
      blockType: 'cardGrid',
      numbered: true,
      heading: 'What SkipDial Does When a Call Comes In',
      cards: [
        {
          title: 'Answers Immediately',
          body: 'Picked up without hold queues or voicemail deferrals, every time.',
        },
        {
          title: 'Engages in Natural Conversation',
          body: 'Callers speak normally. The AI understands intent without forcing button prompts or menu trees.',
        },
        {
          title: 'Follows Your Configured Workflow',
          body: 'Required questions are asked every time. No steps skipped, no fields missed.',
        },
        {
          title: 'Qualifies and Categorizes the Caller',
          body: 'Emergency vs. standard. New lead vs. existing customer. Identified in real time.',
        },
        {
          // Fixed: live site repeated card #4's copy here
          title: 'Routes, Books, and Logs Automatically',
          body: 'Calls are transferred, appointments are booked, and outcomes are logged based on your rules.',
        },
      ],
    },
    hearItLive(audioId),
    {
      blockType: 'checklist',
      heading: "What's Included",
      items: items([
        '24/7 Call Answering',
        'Real-Time Lead Qualification',
        'CRM Sync & Follow-Up',
        'Multi-Language Support',
        'Appointment Booking',
        'Call Summaries & Logging',
        'After-Hours Coverage',
        'Escalation Rules',
      ]),
    },
    {
      blockType: 'contentSplit',
      heading: 'Built Around Your Business, Not a Generic Script',
      body: 'SkipDial agents are configured using your service offerings, intake requirements, escalation rules, pricing guidelines, and FAQs. You control what the agent says, what it must ask, and when a call transfers to a human. The result is consistent, accurate intake on every call and structured data ready for your team.',
    },
    {
      blockType: 'cardGrid',
      small: true,
      cards: [
        {
          title: 'Call Volume Tracking',
          body: 'See exactly how many calls come in, when, and at what frequency.',
        },
        {
          title: 'Lead Qualification Metrics',
          body: 'Understand which callers are qualified and how your lead mix shifts.',
        },
        {
          title: 'Outcome Categorization',
          body: 'Every call is labeled as booked, info only, escalated, or after-hours.',
        },
        {
          title: 'CRM-Ready Data',
          body: 'Summaries, intake fields, and timestamps sync automatically.',
        },
      ],
    },
    {
      blockType: 'numberedList',
      heading: 'How Implementation Works',
      intro:
        'Structured and controlled with no prolonged setup, no disruption to your existing systems.',
      items: items([
        'Review your call patterns and intake process',
        'Configure workflows and required data fields',
        'Connect CRM and scheduling systems',
        'Test real-world call scenarios',
        'Launch and refine',
      ]),
    },
    gradientCta(
      'See How SkipDial Handles Your Inbound Calls',
      'If your business depends on phone calls to generate revenue, consistent intake and immediate response are not optional. SkipDial provides structured inbound call handling without expanding headcount or sacrificing control.',
    ),
  ],
})

export const outboundPage = (audioId: number): PageSeed => ({
  title: 'Outbound Calling',
  slug: 'outbound-calling',
  meta: {
    title: 'AI Outbound Call Automation & Follow-Up | SkipDial',
    description:
      'SkipDial uses AI to automate outbound calls for lead follow-up, appointment confirmations, re-engagement, and retention, with structured workflows and real-time CRM integration.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Outbound Calling',
      heading: 'AI Outbound Call Automation for Consistent Follow-Up',
      body: 'SkipDial automates outbound calls using structured AI workflows designed around your sales process, appointment flow, and customer lifecycle. Instead of relying on manual call lists, inconsistent callbacks, or overextended staff, outbound activity becomes disciplined, trackable, and scalable.',
      primaryCta: DEMO,
      secondaryCta: { label: 'Hear it Live', href: '#sample' },
    },
    {
      blockType: 'contentSplit',
      heading: 'Where Outbound Follow-Up Breaks Down',
      body: 'New leads wait too long for a response. Missed-call callbacks fall through the cracks. Appointment confirmations get skipped. As inbound demand increases, outbound discipline typically declines and call outcomes go poorly documented or not documented at all.',
    },
    {
      blockType: 'cardGrid',
      numbered: true,
      heading: 'What SkipDial Does When It Places an Outbound Call',
      intro: 'Every outbound call follows a configured workflow, not improvisation.',
      cards: [
        {
          title: 'Initiates Calls Based on Defined Triggers',
          body: 'New form submissions, missed calls, CRM stage changes, scheduled reminders, or defined outreach lists.',
        },
        {
          title: 'Engages in Structured Conversation',
          body: 'The AI follows messaging built around your scripts, qualification criteria, and escalation rules.',
        },
        {
          title: 'Qualifies Interest in Real Time',
          body: 'Prospects are categorized based on urgency, readiness, and intent, with outcomes tagged automatically.',
        },
        {
          title: 'Books Appointments or Transfers Live',
          body: 'Interested prospects can schedule immediately or be routed directly to the appropriate team member.',
        },
        {
          title: 'Logs Every Outcome Automatically',
          body: 'From no answer or voicemail to qualified lead or appointment booked, every call attempt and result is recorded in your system.',
        },
      ],
    },
    hearItLive(audioId),
    {
      blockType: 'checklist',
      heading: "What's Included",
      items: items([
        'Trigger-based Outbound Calls',
        'Real-time Lead Qualification',
        'Appointment Booking & Transfer',
        'CRM Sync & Outcome Logging',
        'Voicemail Detection',
        'Configurable Call Cadence',
        'Escalation & Transfer Rules',
      ]),
    },
    {
      blockType: 'contentSplit',
      heading: 'Not a Robocall Platform',
      body: 'Outbound automation is often associated with mass dialing and generic scripts. SkipDial operates differently. Calls respond dynamically to what the prospect says, messaging is configured specifically to your business, and every outcome syncs directly to your CRM. **This is controlled outbound follow-up, not blind cold calling.**',
    },
    {
      blockType: 'cardGrid',
      small: true,
      cards: [
        { title: 'Lead Stages', body: 'Configured to your CRM pipeline' },
        { title: 'Follow-up Cadence', body: 'You set when calls are placed' },
        { title: 'Qualification Rules', body: 'Urgency, readiness, and intent' },
        { title: 'Escalation Policies', body: 'Transfer and handoff rules' },
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Integrates With Your Existing Systems',
      body: 'Outbound calls update your CRM, sync appointments, log follow-up tasks, and reflect true activity in your reporting dashboards, automatically, without manual data entry.',
      link: { label: 'Learn About Integrations', href: '/integrations' },
    },
    {
      blockType: 'checklist',
      heading: 'Common Outbound Use Cases',
      body: "Outbound automation ensures response time and follow-up discipline don't depend on staffing bandwidth.",
      items: items([
        'Immediate follow-up on new inbound leads',
        'Missed-call callbacks',
        'Appointment confirmations and reminders',
        'Re-engaging older prospects',
        'Customer retention outreach',
        'Payment or collections reminders',
      ]),
    },
    {
      blockType: 'numberedList',
      heading: 'How Implementation Works',
      intro: 'Outbound workflows evolve alongside your sales and retention strategy.',
      items: items([
        'Define outbound triggers and target lists',
        'Configure scripts and qualification rules',
        'Connect CRM and scheduling systems',
        'Test scenarios and call flows',
        'Launch and refine based on performance',
      ]),
    },
    gradientCta(
      'See How SkipDial Automates Outbound Follow-Up',
      'Consistent outbound activity increases conversion rates without increasing headcount.',
    ),
  ],
})

export const howItWorksPage = (audioId: number): PageSeed => ({
  title: 'How It Works',
  slug: 'how-it-works',
  meta: {
    title: 'How AI Call Handling Works | SkipDial',
    description:
      'Learn how SkipDial configures AI voice agents to answer calls, follow structured workflows, integrate with your systems, and deliver consistent call handling with full visibility.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'The Process',
      heading: 'How SkipDial AI Call Handling Works',
      body: 'You have complete control over how calls are handled. SkipDial is built around structured workflows, defined business rules, and controlled integrations so every call follows a process you approve. Rather than replacing your systems, it configures AI agents around how your business already operates and enforces consistency at scale.',
      primaryCta: DEMO,
    },
    {
      blockType: 'steps',
      layout: 'rows',
      heading: 'Five Steps From First Call to Full Control',
      steps: [
        {
          title: 'Map Your Call Workflows',
          body: 'Every business handles calls differently. SkipDial can be configured for any scenario or volume, whether your business requires detailed intake, prioritizes urgency, or routes by service type, location, or customer status.',
          groups: [
            group('The process starts by reviewing:', [
              'How inbound calls are currently handled and what questions must always be asked',
              'What qualifies a lead or request, and when calls should transfer to a human',
              'How appointments are scheduled and documented',
            ]),
          ],
        },
        {
          title: 'Build Your AI Agent Around Your Scripts and Knowledge Base',
          body: 'SkipDial agents are configured using your approved information. You define services offered, FAQs, intake requirements, pricing boundaries, escalation rules, and transfer conditions. The agent operates within those boundaries. It does not invent services, improvise policies, or answer outside what you approve. Required intake fields are enforced on every call.',
        },
        {
          title: 'Connect to Your Phone System and CRM',
          body: 'SkipDial integrates with your existing phone system and business tools so call activity flows directly into your workflow.',
          groups: [
            group('This includes:', [
              'Routing logic for live transfers',
              'Appointment booking through connected calendars',
              'CRM synchronization',
              'Call summaries and outcome tagging',
              'Reporting dashboards',
            ]),
          ],
          closing:
            'You do not need to replace your current systems. The AI layer connects to them and adds structured automation.',
          link: { label: 'Integrations', href: '/integrations' },
        },
        {
          title: 'Test Real-World Call Scenarios',
          body: 'Before launch, workflows are tested using realistic call scenarios.',
          groups: [
            group('Examples may include:', [
              'Emergency vs. standard service calls',
              'New lead vs. existing customer',
              'After-hours calls',
              'Appointment booking and rescheduling',
              'Frequently asked questions',
            ]),
            group('Testing ensures:', [
              'Questions are asked in the right order',
              'Routing rules behave correctly',
              'Data fields populate properly',
              'Escalation triggers work as intended',
            ]),
          ],
          closing: 'Adjustments are made before the system goes live.',
        },
        {
          title: 'Launch and Optimize',
          body: 'Priorities change, services expand, and messaging evolves. SkipDial supports ongoing refinement through performance dashboards so the agent stays aligned with your current operations.',
          groups: [
            group(null, [
              'Performance dashboards',
              'Call outcome reporting',
              'Workflow adjustments',
              'Knowledge base updates',
            ]),
          ],
        },
      ],
    },
    hearItLive(audioId),
    {
      blockType: 'numberedList',
      heading: 'What Happens on Every Call',
      items: items([
        'Call answered immediately',
        'Caller intent identified',
        'Intake information collected',
        'Caller qualified by defined rules',
        'Call routed, scheduled, or resolved',
        'Summary logged to CRM',
      ]),
    },
    gradientCta(
      'See How SkipDial Would Work for Your Business',
      'Every business has unique call patterns and operational priorities. The best way to understand how SkipDial would function in your environment is to review your workflows and test real scenarios.',
    ),
  ],
})
