'use client'

import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

import type { DemoCallFormBlock } from '../../payload-types'

import { Reveal } from '../Reveal'
import { BodyText } from '../typography'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function DemoCallFormSection({ block }: { block: DemoCallFormBlock }) {
  const pathname = usePathname()
  const [state, setState] = useState<FormState>('idle')
  const [fieldErrors, setFieldErrors] = useState<{ name?: string; phone?: string; consent?: string }>({})

  const agents = block.agents ?? []

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const consent = data.get('consent') === 'on'
    const honeypot = String(data.get('website') ?? '')

    const errors: typeof fieldErrors = {}
    if (!name) errors.name = 'Please enter your name.'
    if (!phone || phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.'
    if (block.checkboxLabel && !consent) errors.consent = 'Please confirm to receive the demo call.'
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0 || honeypot) return

    setState('submitting')
    try {
      const res = await fetch('/next/demo-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'demo-call',
          name,
          phone,
          agent: String(data.get('agent') ?? ''),
          consent,
          sourcePath: pathname,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setState('success')
      form.reset()
    } catch {
      setState('error')
    }
  }

  return (
    <div className="container-site">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <h2 className="h-section">{block.heading}</h2>
          {block.body && (
            <div className="mt-4 space-y-3 text-body">
              <BodyText text={block.body} />
            </div>
          )}
        </Reveal>

        <Reveal>
          <form onSubmit={onSubmit} noValidate className="card p-6 sm:p-8">
            {block.formHeading && <h3 className="h-card text-xl">{block.formHeading}</h3>}

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="demo-name" className="mb-1.5 block text-sm font-medium">
                  {block.nameLabel || 'Name'}
                </label>
                <input
                  id="demo-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? 'demo-name-error' : undefined}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] transition-colors focus:border-accent"
                />
                {fieldErrors.name && (
                  <p id="demo-name-error" className="mt-1.5 text-sm text-red-600">
                    {fieldErrors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-medium">
                  {block.phoneLabel || 'Phone'}
                </label>
                <input
                  id="demo-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  required
                  aria-invalid={Boolean(fieldErrors.phone)}
                  aria-describedby={fieldErrors.phone ? 'demo-phone-error' : undefined}
                  className="w-full rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] transition-colors focus:border-accent"
                />
                {fieldErrors.phone && (
                  <p id="demo-phone-error" className="mt-1.5 text-sm text-red-600">
                    {fieldErrors.phone}
                  </p>
                )}
              </div>

              {agents.length > 0 && (
                <div>
                  <label htmlFor="demo-agent" className="mb-1.5 block text-sm font-medium">
                    {block.agentLabel || 'Choose Your AI Agent:'}
                  </label>
                  <select
                    id="demo-agent"
                    name="agent"
                    className="w-full cursor-pointer rounded-xl border border-line bg-white px-4 py-3 text-[0.9375rem] transition-colors focus:border-accent"
                  >
                    {agents.map((agent, i) => (
                      <option key={agent.id ?? i} value={agent.label}>
                        {agent.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Honeypot — humans never see this */}
              <div className="absolute left-[-9999px]" aria-hidden="true">
                <label htmlFor="demo-website">Website</label>
                <input id="demo-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              {block.consentText && (
                <p className="text-xs leading-relaxed text-ink-2">{block.consentText}</p>
              )}

              {block.checkboxLabel && (
                <div>
                  <label className="flex cursor-pointer items-start gap-2.5 text-sm">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-0.5 h-4 w-4 cursor-pointer accent-(--color-accent)"
                      aria-invalid={Boolean(fieldErrors.consent)}
                    />
                    {block.checkboxLabel}
                  </label>
                  {fieldErrors.consent && (
                    <p className="mt-1.5 text-sm text-red-600">{fieldErrors.consent}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={state === 'submitting'}
                className="btn btn-primary w-full cursor-pointer justify-center disabled:opacity-60"
              >
                {state === 'submitting' ? 'Sending…' : block.submitLabel || 'Call Me'}
                <span className="sheen" aria-hidden="true" />
              </button>

              <div aria-live="polite">
                {state === 'success' && (
                  <p className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
                    {block.successMessage ||
                      'Thank you for contacting us. We will get back to you as soon as possible.'}
                  </p>
                )}
                {state === 'error' && (
                  <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                    {block.errorMessage ||
                      'Oops, there was an error sending your message. Please try again later.'}
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </div>
  )
}
