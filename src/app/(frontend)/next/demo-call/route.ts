import { getPayloadClient } from '../../../../lib/cms'

type Body = {
  formType?: 'demo-call' | 'contact'
  name?: string
  phone?: string
  email?: string
  agent?: string
  message?: string
  consent?: boolean
  sourcePath?: string
  website?: string // honeypot
}

export async function POST(req: Request): Promise<Response> {
  let body: Body
  try {
    body = (await req.json()) as Body
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Honeypot filled = bot. Pretend success, store nothing.
  if (body.website) return Response.json({ ok: true })

  const name = body.name?.trim()
  const phone = body.phone?.trim()
  if (!name || !phone) {
    return Response.json({ error: 'Name and phone are required' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  await payload.create({
    collection: 'formSubmissions',
    overrideAccess: false,
    data: {
      formType: body.formType === 'contact' ? 'contact' : 'demo-call',
      name,
      phone,
      email: body.email?.trim() || undefined,
      agent: body.agent?.trim() || undefined,
      message: body.message?.trim() || undefined,
      consent: Boolean(body.consent),
      sourcePath: body.sourcePath || undefined,
    },
  })

  return Response.json({ ok: true }, { status: 201 })
}
