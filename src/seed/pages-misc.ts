import type { SeedBlock } from './helpers'

import { DEMO, gradientCta, group, h2, hearItLive, items, p, richText } from './helpers'

type PageSeed = {
  title: string
  slug: string
  layout: SeedBlock[]
  meta: { title: string; description: string }
}

export const integrationsPage = (audioId: number): PageSeed => ({
  title: 'Integrations',
  slug: 'integrations',
  meta: {
    title: 'AI Call Agent Integrations for CRM and Scheduling Tools | SkipDial',
    description:
      'SkipDial connects AI voice agents to your CRM, calendar, scheduling tools, and business systems so calls can book appointments, update records, and deliver structured call insights automatically.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Integrations',
      heading: 'Integrations That Connect Calls to Your Workflow',
      body: 'The real impact of AI call handling comes from structured outcomes. SkipDial integrates AI voice agents into your existing tech stack so inbound and outbound calls can trigger real actions, sync data automatically, and deliver visibility without manual entry.',
      primaryCta: DEMO,
    },
    {
      blockType: 'contentSplit',
      heading: 'What Integrations Make Possible',
      body: 'When the AI agent is connected to your systems, it can support workflows such as:',
      groups: [
        group(null, [
          'Booking, rescheduling, or confirming appointments in real time',
          'Logging call summaries and outcomes automatically',
          'Updating lead status and follow-up tasks based on call results',
          'Routing calls based on CRM context (new lead vs. existing customer)',
          'Pulling approved details from your systems so answers stay accurate',
        ]),
      ],
    },
    {
      blockType: 'accordion',
      heading: 'Integration Categories',
      items: [
        {
          title: 'CRM and Lead Management',
          body: 'Integrations allow the agent to create and update records, tag outcomes, and keep follow-up organized.\n\nCommon outcomes: new leads created automatically, call notes and summaries attached to records, lead stage changes based on qualification results, and follow-up tasks created when needed.',
        },
        {
          title: 'Scheduling and Calendars',
          body: 'Scheduling integrations let the agent confirm availability and place appointments on the correct calendar without back-and-forth.\n\nOutcomes: appointments booked during the call, rescheduling and cancellations handled consistently, automatic confirmations sent to the customer, and reduced double-booking risk through real-time checks.',
        },
        {
          title: 'Business Systems and Databases',
          body: 'For businesses with frequently changing information, the agent can be configured to reference live data rather than static scripts.\n\nExamples: property availability and unit details for property management, service areas, job types, or dispatch rules for home services, and account or policy context for professional offices. When inventory or policies change, connected systems can keep call answers aligned with current data.',
        },
        {
          title: 'Messaging and Notifications',
          body: 'Integrations can support confirmations and internal alerts.\n\nCommon outcomes: text confirmations and reminders, internal notifications when urgent calls occur, and escalation alerts when a call meets defined criteria.',
        },
        {
          title: 'Reporting and Analytics',
          body: 'Call data is only valuable if it is visible and usable.\n\nCommon outcomes: call volume and outcome reporting, qualification and booking metrics, after-hours call visibility, and conversion tracking tied to call outcomes.',
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
      // TODO: confirm the intended logo set with the client, then replace the
      // text wordmarks below with real logo assets.
      blockType: 'logoMarquee',
      heading: 'Types of Integrations SkipDial Supports',
      caption: 'Works with the tools you already use',
      groups: [
        {
          label: 'Core Telephony Infrastructure',
          names: items(['Twilio', 'RingCentral', 'Vonage', 'Telnyx', '3CX', 'Grasshopper']).map(
            (i) => ({ name: i.text }),
          ),
        },
        {
          label: 'CRM & Sales Platforms',
          names: items([
            'HubSpot',
            'Salesforce',
            'GoHighLevel',
            'Zoho CRM',
            'Pipedrive',
            'Follow Up Boss',
          ]).map((i) => ({ name: i.text })),
        },
        {
          label: 'Workflow Automation',
          names: items(['n8n', 'Zapier', 'Make', 'Power Automate']).map((i) => ({ name: i.text })),
        },
        {
          label: '& Custom API Connections',
          names: items(['REST APIs', 'Webhooks', 'Middleware', 'Custom Databases']).map((i) => ({
            name: i.text,
          })),
        },
      ],
    },
    {
      blockType: 'numberedList',
      heading: 'How the Integrated Data Flow Works',
      intro: 'A typical integrated call flow from first ring to CRM update.',
      items: items([
        'A call comes in, or an outbound trigger initiates a call based on a defined event',
        'The agent follows a configured workflow, collects required information, and references integrated systems when needed',
        'The system logs a structured summary and tags the outcome',
        'CRM records, appointment calendars, and follow-up tasks update automatically based on the call result',
        'Your team receives the outcome in the same tools they already use',
      ]),
    },
    {
      blockType: 'contentSplit',
      heading: 'Built for Control, Accuracy & Clean Implementation',
      body: 'Integrations should reduce mistakes, not introduce them. SkipDial setups are implemented through direct system connections, API-based integrations, and webhooks or middleware when needed. The practical goal is the same in every case: call outcomes land in your workflow automatically.',
      groups: [
        group('Designed for Accuracy:', [
          'Defined workflows and required fields',
          'Controlled knowledge bases for approved information',
          'Clear escalation and transfer rules',
          'Structured data mapping for consistent CRM fields',
        ]),
        group('Implementation Approach:', [
          'Direct system connections where available',
          'API-based integrations for business tools',
          'Webhooks and middleware when needed',
          'No manual transcription or re-entry required',
        ]),
      ],
    },
    gradientCta(
      'See What Integrated Call Automation Looks Like in Practice',
      'Your team may be spending valuable time on manual data entry because your call handling solution does not connect cleanly to your CRM and scheduling tools. SkipDial integrates AI voice agents into your systems so calls produce measurable outcomes, reliable follow-up, and fewer manual errors.',
    ),
  ],
})

export const requestDemoPage = (): PageSeed => ({
  title: 'Request a Free Demo',
  slug: 'request-a-free-demo',
  meta: {
    title: 'Request an AI Call Automation Demo | SkipDial',
    description:
      'Schedule a live demo of SkipDial AI call automation to see how inbound and outbound calls are handled, qualified, routed, and integrated with your CRM and scheduling tools.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Get in Touch',
      heading: 'Request a Free Demo',
    },
    {
      blockType: 'contentSplit',
      heading: 'Request a 30-Minute SkipDial Demo',
      body: 'If your business depends on phone calls, the most effective way to evaluate AI call automation is to see how the platform handles workflows in practice. Schedule a free demo and consultation to see how SkipDial could be configured for your call volume, intake requirements, routing rules, and integrations.',
    },
    {
      blockType: 'schedulerEmbed',
      heading: 'Schedule a Time',
      // TODO: confirm the scheduling provider (Calendly / GHL) and paste the embed URL
      note: 'Booking widget placeholder — paste the scheduling embed URL in the CMS to activate.',
    },
  ],
})

export const blogIndexPage = (): PageSeed => ({
  title: 'Blog',
  slug: 'blog',
  meta: {
    title: 'Blog | SkipDial',
    description:
      'Articles on AI call handling, structured intake, and follow-up discipline from the SkipDial team.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Blog',
      heading: 'Insights on AI Call Automation',
      body: 'Practical writing on call handling, lead capture, and what happens when an AI answers your business line.',
    },
  ],
})

export const privacyPolicyPage = (): PageSeed => ({
  title: 'Privacy Policy',
  slug: 'privacy-policy',
  meta: {
    title: 'Privacy Policy | SkipDial',
    description: 'How SkipDial collects, uses, and protects your information.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Legal',
      heading: 'Privacy Policy',
    },
    {
      blockType: 'richText',
      content: richText([
        p('TODO: This is placeholder text. Capture the final policy verbatim from the live site (or obtain the updated policy from counsel) before launch, then replace this block in the CMS.'),
        h2('Information We Collect'),
        p('Placeholder — describe the categories of information collected through the website, demo-call form, and phone interactions.'),
        h2('How We Use Information'),
        p('Placeholder — describe usage: responding to inquiries, providing demos, improving the service, and legal compliance.'),
        h2('Contact'),
        p('Questions about this policy can be sent to info@skipdial.ai or mailed to 1801 E. Camelback Rd, Suite 201, Phoenix, AZ 85016.'),
      ]),
    },
  ],
})
