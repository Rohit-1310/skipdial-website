import type { SeedBlock } from './helpers'

import { DEMO, gradientCta, group, hearItLive, items } from './helpers'

type PageSeed = {
  title: string
  slug: string
  layout: SeedBlock[]
  meta: { title: string; description: string }
}

export const industriesPage = (): PageSeed => ({
  title: 'Industries',
  slug: 'industries',
  meta: {
    title: 'AI Call Handling for Home Services, Real Estate & Professional Offices | SkipDial',
    description:
      'SkipDial provides AI call automation for home services, real estate, property management, and professional offices, delivering consistent intake, follow-up, and CRM integration.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      eyebrow: 'Industries',
      heading: 'AI Call Automation Built for Businesses That Depend on Phone Calls',
      body: 'Not all industries rely on phone calls the same way. In some sectors, calls represent urgent service needs. In others, they are the first step in a high-value client relationship. SkipDial configures AI call agents around your specific call patterns, intake requirements, and follow-up workflows.',
      primaryCta: DEMO,
    },
    {
      blockType: 'contentSplit',
      heading: 'Home Services',
      body: "For HVAC, plumbing, roofing, electrical, and restoration contractors, inbound calls signal immediate demand. A missed call during a storm event or peak period isn't an inconvenience, it's a lost job, especially when a dozen competitors are one dial away.",
      groups: [
        group('SkipDial helps home service businesses:', [
          'Answer calls 24/7',
          'Distinguish emergency vs. standard requests',
          'Capture complete service details',
          'Book appointments directly',
          'Route urgent calls instantly',
        ]),
      ],
      closing:
        'Consistent intake ensures dispatch teams receive clear, structured information every time.',
      link: { label: 'All Home Services', href: '/industries/home-services' },
    },
    {
      blockType: 'contentSplit',
      heading: 'Real Estate & Property Management',
      body: 'In real estate and property management, speed to lead matters. Delayed responses can mean lost listings, missed showings, or unleased units.',
      groups: [
        group('SkipDial supports:', [
          'Lead qualification for buyers and sellers',
          'Showing and tour scheduling',
          'After-hours leasing inquiries',
          'Tenant call categorization',
          'Automated follow-up on new inquiries',
        ]),
      ],
      closing:
        'AI call agents ensure that inbound interest is captured immediately and outbound follow-up remains consistent.',
      link: { label: 'All Real Estate Services', href: '/industries/real-estate-property-management' },
    },
    {
      blockType: 'contentSplit',
      heading: 'Professional & Service Offices',
      body: 'Law firms, insurance agencies, healthcare practices, accounting firms, and consulting offices share a common requirement: structured intake and accurate routing. Incomplete notes, rushed conversations, and voicemail backlogs create friction that affects both client experience and internal operations.',
      groups: [
        group('SkipDial enables:', [
          'Consistent, confidential intake workflows',
          'FAQ responses from approved knowledge bases',
          'Call categorization by practice area or service type',
          'HIPAA-aligned configurations and secure data handling',
          'CRM and scheduling integration',
        ]),
      ],
      closing:
        'Callers are acknowledged promptly, and every interaction is documented to meet confidentiality and compliance requirements.',
      link: { label: 'All Professional Services', href: '/industries/professional-offices' },
    },
    {
      blockType: 'checklist',
      heading: "Built Around Your Industry's Call Patterns",
      body: 'While call types differ across industries, the underlying challenges are similar. SkipDial addresses these gaps using configured workflows, structured qualification, and system integration tailored to your business model.',
      items: items([
        'Missed demand',
        'Inconsistent intake',
        'After-hours gaps',
        'Manual documentation',
        'Follow-up breakdowns',
      ]),
    },
    gradientCta(
      'See How SkipDial Would Work in Your Industry',
      'Every industry has unique call dynamics. SkipDial adapts to them without adding operational complexity.',
    ),
  ],
})

export const homeServicesPage = (audioId: number): PageSeed => ({
  title: 'Home Services',
  slug: 'industries/home-services',
  meta: {
    title: 'AI Call Automation for Home Services | SkipDial',
    description:
      'SkipDial provides AI call automation for HVAC, plumbing, roofing, electrical, and other home service companies, delivering 24/7 call coverage, structured intake, and CRM-integrated scheduling.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      heading: 'AI Call Automation Built for Home Service Companies',
      body: 'In home services, phone calls are not casual inquiries. They are often tied to urgent problems, high-value jobs, and time-sensitive scheduling. Missed calls during peak periods, storm events, or after hours can mean lost revenue, especially when a caller can choose from a dozen other local providers offering identical services.\n\nSkipDial configures AI voice agents around the realities of home service operations, ensuring every call is answered, structured, and routed according to your business rules.',
      primaryCta: DEMO,
    },
    {
      blockType: 'contentSplit',
      heading: 'Where Traditional Call Handling Breaks Down in Home Services',
      body: 'Home service companies typically rely on a mix of front-office staff, answering services, or basic IVR systems. All of those options have weaknesses that force home services businesses to compromise on call handling.',
      groups: [
        group('Common challenges:', [
          'Calls going unanswered during busy dispatch windows',
          'After-hours voicemails that are returned too late',
          'Incomplete intake details that slow technicians down',
          'Generic answering services unfamiliar with your services',
          'IVR systems that frustrate callers with rigid menus',
        ]),
      ],
      closing:
        'When call volume spikes, these weaknesses become more visible. Storms, heat waves, and seasonal surges can overwhelm even well-staffed offices.',
    },
    hearItLive(audioId),
    {
      blockType: 'checklist',
      heading: 'What Happens on Every Call',
      items: items([
        '24/7 Call Answering',
        'Emergency Call Routing',
        'Structured Job Intake',
        'Appointment Booking',
        'After-Hours Coverage',
        'CRM and Dispatch Sync',
        'Surge Call Handling',
      ]),
    },
    {
      blockType: 'cardGrid',
      numbered: true,
      heading: 'What SkipDial Does When a Service Call Comes In',
      cards: [
        {
          title: 'Answers Immediately, 24/7',
          body: 'Calls are answered without hold queues or voicemail deferrals, including after hours and during peak demand.',
        },
        {
          title: 'Identifies the Type of Request',
          body: 'Emergency vs. standard service. Maintenance vs. installation. New customer vs. existing client.',
        },
        {
          title: 'Captures Complete Job Details',
          body: 'The agent collects structured intake information such as location, issue description, equipment type, urgency level, and contact details.',
        },
        {
          title: 'Routes Based on Defined Rules',
          body: 'Emergency calls can be transferred immediately. Standard appointments can be scheduled directly. Messages can be categorized by service line.',
        },
        {
          title: 'Logs Everything Automatically',
          body: 'Call summaries and intake data sync to your CRM or scheduling system so dispatch teams have full context.',
        },
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Designed for Peak Demand and Seasonal Surges',
      body: 'Virtually every home service provider faces seasonal elasticity or weather-driven call spikes. Extreme weather, promotional campaigns, and maintenance seasons can overwhelm traditional call handling systems. **AI voice agents scale automatically**, answering multiple calls simultaneously without degrading intake quality or response time.',
      cta: { label: 'Get a Demo', href: '/request-a-free-demo' },
    },
    {
      blockType: 'contentSplit',
      heading: "Reserve Your Team's Time for What Actually Requires Human Judgment",
      body: 'Dispatchers, service managers, and technicians should not spend time collecting basic information that can be structured automatically.',
      groups: [
        group('AI call automation helps by:', [
          'Handling routine scheduling',
          'Gathering standardized intake data',
          'Confirming appointment details',
          'Filtering non-service inquiries',
        ]),
        group('This allows your paid staff to focus on:', [
          'Coordinating emergency response',
          'Managing complex customer concerns',
          'Supporting technicians in the field',
          'Closing high-value opportunities',
        ]),
      ],
      closing: 'Automation reduces interruptions while improving call consistency.',
    },
    {
      blockType: 'contentSplit',
      heading: 'Built Around Your Service Lines, Systems & FAQs',
      body: 'Every home service company operates differently. SkipDial agents are configured using your service offerings, service areas, dispatch priorities, pricing boundaries, and FAQs so the agent provides accurate, approved information and escalates when necessary.',
      link: { label: 'Integrations', href: '/integrations' },
    },
    {
      // Rewritten: the live site reused the Outbound page's sub-cards here
      blockType: 'cardGrid',
      small: true,
      cards: [
        {
          title: 'Service Lines',
          body: 'HVAC, plumbing, roofing, electrical — the agent knows what you offer and where.',
        },
        {
          title: 'Dispatch Priorities',
          body: 'Emergency, same-day, and standard requests routed by your rules.',
        },
        {
          title: 'Pricing Boundaries',
          body: 'Quotes only what you approve; everything else escalates to your team.',
        },
        {
          title: 'FAQs & Service Areas',
          body: 'Answers drawn from your approved knowledge base and coverage map.',
        },
      ],
    },
    gradientCta(
      'See How SkipDial Works for Home Services',
      'If your business depends on phone calls to drive revenue, consistent intake and immediate response are critical. SkipDial delivers structured, 24/7 call automation built around the operational realities of home service companies.',
    ),
  ],
})

export const realEstatePage = (audioId: number): PageSeed => ({
  title: 'Real Estate & Property Management',
  slug: 'industries/real-estate-property-management',
  meta: {
    title: 'AI Call Automation for Real Estate & Property Management | SkipDial',
    description:
      'SkipDial provides AI call automation for real estate teams and property management companies, capturing inquiries, qualifying leads, scheduling tours, and syncing call data directly to your CRM.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      heading: 'AI Call Automation for Real Estate & Property Management',
      body: 'In real estate and property management, phone calls often represent immediate interest. A prospective buyer requesting a showing, a seller evaluating listing options, or a tenant reporting an issue expects a timely response. When calls are missed or follow-up is delayed, opportunities shift quickly to competitors.\n\nSpeed to lead, structured intake, and consistent routing directly influence occupancy rates, listing conversions, and client satisfaction. SkipDial configures AI voice agents around your workflows so every inquiry is handled consistently and documented accurately.',
      primaryCta: DEMO,
    },
    {
      blockType: 'contentSplit',
      heading: 'Where Call Handling Breaks Down in Real Estate and Property Management',
      body: 'Real estate teams and property managers often depend on a combination of agents, leasing staff, front-office coordinators, and answering services to handle calls. When lead volume increases due to marketing campaigns or new listings, response time and intake consistency often decline.',
      groups: [
        group('Common friction points:', [
          'New listing or buyer inquiries going to voicemail',
          'After-hours leasing calls that receive delayed follow-up',
          'Inconsistent intake for buyer or tenant qualification',
          'Manual note-taking that leads to incomplete records',
          'Overloaded agents missing calls while in meetings or showings',
        ]),
      ],
    },
    hearItLive(audioId),
    {
      blockType: 'checklist',
      heading: 'What Happens on Every Call',
      items: items([
        '24/7 Call Answering',
        'Buyer and Tenant Qualification',
        'Showing and Tour Scheduling',
        'After-Hours Leasing Coverage',
        'Tenant Call Categorization',
        'CRM and Calendar Sync',
        'Outbound Follow-Up Automation',
      ]),
    },
    {
      blockType: 'cardGrid',
      numbered: true,
      heading: 'What SkipDial Does When a Real Estate Call Comes In',
      cards: [
        {
          title: 'Answers Immediately (including after hours)',
          body: 'Calls are answered without requiring agents to step out of meetings, showings, or inspections.',
        },
        {
          title: "Identifies the Caller's Intent",
          body: 'Buyer inquiry, seller consultation, leasing request, tenant issue, or general question.',
        },
        {
          title: 'Captures Structured Qualification Data',
          body: 'Timeline, budget range, property preferences, and financing status for buyers and renters. Property details and listing goals for sellers.',
        },
        {
          title: 'Schedules Showings or Consultations',
          body: 'Appointments booked directly into connected calendars or routed to the appropriate team member.',
        },
        {
          title: 'Categorizes and Logs Every Interaction',
          body: 'Call summaries, lead status, and qualification data sync to your CRM so follow-up stays organized and measurable.',
        },
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Designed for Variable Lead Volume',
      body: "Marketing campaigns, new listings, open houses, and seasonal leasing cycles can cause call volume to fluctuate significantly. **AI voice agents scale automatically** to handle multiple concurrent inquiries without degrading intake quality or response time — so growth in lead volume doesn't create new bottlenecks.",
      cta: { label: 'Get a Demo', href: '/request-a-free-demo' },
    },
    {
      blockType: 'contentSplit',
      heading: 'Improve Speed to Lead Without Expanding Staff',
      body: 'In competitive markets, response time influences conversion rates. Agents are frequently in appointments, negotiations, or property tours when new calls arrive. AI call automation ensures inquiries are never left waiting.',
      groups: [
        group('AI call automation handles:', [
          'Immediate inquiry acknowledgment',
          'Consistent qualification questions',
          'Showing scheduling without delay',
          'Real-time CRM lead logging',
        ]),
        // Fixed: live site listed gerunds after "to" ("Closing transactions…")
        group('This allows your team to:', [
          'Close transactions',
          'Manage client relationships',
          'Negotiate and advise',
          'Focus on high-value follow-up',
        ]),
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Built Around Your Listings, Policies, and Systems',
      body: 'Every real estate team and property management company operates differently. SkipDial agents are configured using your listing intake process, leasing criteria, FAQs, office policies, and live property data from your CRM so information provided to callers stays consistent with your approved messaging.',
      link: { label: 'Integrations', href: '/integrations' },
    },
    {
      blockType: 'cardGrid',
      small: true,
      cards: [
        { title: 'Listing Intake Process', body: 'Buyer, seller, and renter workflows' },
        { title: 'Leasing Criteria', body: 'Qualification rules and boundaries' },
        { title: 'Escalation Rules', body: 'Urgent tenant issues and transfers' },
        { title: 'CRM and Scheduling', body: 'Tours and notes sync automatically' },
      ],
    },
    gradientCta(
      'See How SkipDial Supports Real Estate & Property Management Teams',
      'Consistent intake, immediate response, and structured follow-up are critical in competitive markets. SkipDial provides AI call automation designed around the operational realities of brokerages and property management companies.',
    ),
  ],
})

export const professionalOfficesPage = (audioId: number): PageSeed => ({
  title: 'Professional & Services Offices',
  slug: 'industries/professional-offices',
  meta: {
    title: 'AI Call Automation for Professional Offices | SkipDial',
    description:
      'SkipDial provides AI call automation for law firms, insurance agencies, healthcare practices, accounting firms, and advisory offices, delivering structured intake, secure data handling, and CRM-integrated workflows.',
  },
  layout: [
    {
      blockType: 'hero',
      variant: 'inner',
      heading: 'AI Call Automation for Professional Offices',
      body: 'Law firms, insurance agencies, healthcare practices, accounting firms, and advisory offices rely on phone calls to initiate high-value client relationships. These calls often involve sensitive information, detailed intake requirements, and careful routing. When calls are rushed, inconsistent, or sent to voicemail, the impact extends beyond inconvenience.\n\nIncomplete documentation, delayed follow-up, and poor intake discipline can affect client experience, compliance standards, and internal workflow efficiency. SkipDial configures AI voice agents around the structured intake and routing requirements common to professional offices, ensuring every call follows an approved process.',
      primaryCta: DEMO,
    },
    {
      blockType: 'contentSplit',
      heading: 'Where Call Handling Breaks Down in Professional Offices',
      body: 'Professional environments present different challenges than high-volume dispatch operations. Attorneys and advisors miss calls during meetings. Front-desk staff juggle phones and in-person clients. When intake varies from call to call, visibility and compliance discipline decline.',
      groups: [
        group('Common friction points:', [
          'Attorneys or advisors missing calls while in meetings',
          'Front-desk staff juggling phones and in-person clients',
          'Intake forms completed inconsistently',
          'Voicemail backlogs that delay response',
          'Call notes recorded manually and entered later',
          'Sensitive details captured without standardized documentation',
        ]),
      ],
    },
    hearItLive(audioId),
    {
      blockType: 'checklist',
      heading: 'What Happens on Every Call',
      items: items([
        '24/7 Call Answering',
        'Structured Intake Workflows',
        'Practice Area Call Routing',
        'Confidential Intake Handling',
        'HIPAA-Aligned Configurations',
        'CRM and Case Management Sync',
        'Appointment Scheduling',
      ]),
    },
    {
      // Fixed: live site heading said "Service Call" (copied from Home Services)
      blockType: 'cardGrid',
      numbered: true,
      heading: 'What SkipDial Does When a Client Call Comes In',
      cards: [
        {
          title: 'Answers Promptly and Consistently',
          body: 'Calls are acknowledged immediately without requiring licensed professionals to interrupt active work.',
        },
        {
          title: 'Identifies the Purpose of the Call',
          body: 'New client inquiry, policy question, billing matter, scheduling request, or general information.',
        },
        {
          title: 'Follows Structured Intake Workflows',
          body: 'Required questions are asked in a defined order, ensuring essential information is collected every time.',
        },
        {
          title: 'Categorizes and Routes Appropriately',
          body: 'Calls directed by practice area, service line, urgency level, or client status.',
        },
        {
          title: 'Logs Structured Summaries',
          body: 'Call outcomes and intake details sync to your CRM or case management system for documentation and follow-up.',
        },
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Supports Confidentiality and Compliance Requirements',
      body: 'Professional offices operate within privacy expectations and regulatory standards. SkipDial workflows are configured to operate within defined boundaries rather than generating unrestricted responses.',
      groups: [
        group(null, [
          'Limit responses to approved knowledge bases',
          'Escalate sensitive matters to human staff',
          'Capture structured documentation for records',
          'Align routing rules with internal confidentiality policies',
          'HIPAA-aligned configurations for healthcare environments',
        ]),
      ],
      cta: { label: 'Get a Demo', href: '/request-a-free-demo' },
    },
    {
      blockType: 'contentSplit',
      heading: 'Preserve Licensed Staff Time for Work That Requires Expertise',
      body: 'Attorneys, physicians, advisors, and consultants should not spend time collecting basic intake information that can be structured automatically.',
      groups: [
        group('AI call automation helps by:', [
          'Routine scheduling',
          'Approved FAQ responses',
          'Standardized intake data',
          'Filtering low-priority calls',
        ]),
        group('This allows your staff to focus on:', [
          'Substantive client work',
          'Complex matters and consultations',
          'Relationship management',
          'High-value follow-up',
        ]),
      ],
    },
    {
      blockType: 'contentSplit',
      heading: 'Built Around Your Policies, Systems & FAQs',
      body: 'Every professional office defines its own intake priorities. SkipDial agents are configured using your approved service descriptions, client FAQs, intake criteria, scheduling policies and escalation rules so callers receive consistent, approved information and every interaction is clearly documented.',
      link: { label: 'Integrations', href: '/integrations' },
    },
    {
      blockType: 'cardGrid',
      small: true,
      cards: [
        { title: 'Service Descriptions', body: 'Approved scope and boundaries' },
        { title: 'Intake Criteria', body: 'Questions by service line or practice area' },
        { title: 'Escalation Rules', body: 'Complex or sensitive matter routing' },
        { title: 'CRM and Scheduling', body: 'Summaries and bookings sync automatically' },
      ],
    },
    gradientCta(
      // Fixed: live site heading was missing the word "Supports"
      'See How SkipDial Supports Professional Offices',
      'Structured intake, controlled messaging, and documented workflows are essential for professional environments. SkipDial delivers AI call automation built around the operational standards of law firms, insurance agencies, healthcare practices, and advisory offices.',
    ),
  ],
})
