'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTACT_FORM, CONTACT_SUBJECTS, FORM_MESSAGES, FORM_STATUS, type FormStatus } from '@/lib/constants'
import { contactSchema, type ContactInput } from '@/lib/validation/contact'
import { cn } from '@/lib/utils'

const FIELD_CLASS =
  'w-full border-b border-white/25 bg-transparent py-3 text-white placeholder:text-white/35 transition-colors duration-200 focus:border-terracota-500 focus:outline-none'

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="mt-2 text-sm text-terracota-300">
      {message}
    </p>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>(FORM_STATUS.idle)
  const [feedback, setFeedback] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { subject: CONTACT_SUBJECTS[0].value, website: '' },
  })

  const onSubmit = handleSubmit(async (values) => {
    setStatus(FORM_STATUS.submitting)
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const payload = (await response.json()) as { message?: string }

      if (!response.ok) {
        setStatus(FORM_STATUS.error)
        setFeedback(payload.message ?? FORM_MESSAGES.error)
        return
      }

      setStatus(FORM_STATUS.success)
      setFeedback(payload.message ?? FORM_MESSAGES.success)
      reset()
    } catch {
      setStatus(FORM_STATUS.error)
      setFeedback(FORM_MESSAGES.error)
    }
  })

  const isSubmitting = status === FORM_STATUS.submitting

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      {/* Campo trampa: oculto para personas, visible para bots. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="website">No completar</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
            Nombre completo
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'error-name' : undefined}
            className={cn(FIELD_CLASS, 'mt-3')}
            placeholder="Tu nombre"
            {...register('name')}
          />
          <FieldError id="error-name" message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="email" className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={cn(FIELD_CLASS, 'mt-3')}
            placeholder="nombre@entidad.gov.co"
            {...register('email')}
          />
          <FieldError id="error-email" message={errors.email?.message} />
        </div>

        <div>
          <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
            Teléfono
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'error-phone' : undefined}
            className={cn(FIELD_CLASS, 'mt-3')}
            placeholder="+57 300 000 0000"
            {...register('phone')}
          />
          <FieldError id="error-phone" message={errors.phone?.message} />
        </div>

        <div>
          <label
            htmlFor="organization"
            className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400"
          >
            Entidad o empresa <span className="normal-case tracking-normal text-white/40">(opcional)</span>
          </label>
          <input
            id="organization"
            type="text"
            autoComplete="organization"
            className={cn(FIELD_CLASS, 'mt-3')}
            placeholder="Nombre de la entidad"
            {...register('organization')}
          />
          <FieldError id="error-organization" message={errors.organization?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
          Asunto
        </label>
        <select
          id="subject"
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? 'error-subject' : undefined}
          className={cn(FIELD_CLASS, 'mt-3 [&>option]:bg-navy-900')}
          {...register('subject')}
        >
          {CONTACT_SUBJECTS.map((subject) => (
            <option key={subject.value} value={subject.value}>
              {subject.label}
            </option>
          ))}
        </select>
        <FieldError id="error-subject" message={errors.subject?.message} />
      </div>

      <div>
        <label htmlFor="message" className="text-xs font-semibold uppercase tracking-[0.16em] text-terracota-400">
          Cuéntanos sobre el proyecto
        </label>
        <textarea
          id="message"
          rows={5}
          maxLength={CONTACT_FORM.maxMessageLength}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={cn(FIELD_CLASS, 'mt-3 resize-y')}
          placeholder="Etapa del proyecto, alcance estimado y qué necesitas resolver."
          {...register('message')}
        />
        <FieldError id="error-message" message={errors.message?.message} />
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={isSubmitting} withArrow={!isSubmitting}>
          {isSubmitting ? 'Enviando…' : 'Enviar mensaje'}
        </Button>

        {/* `aria-live` anuncia el resultado sin mover el foco del usuario. */}
        <p
          aria-live="polite"
          className={cn(
            'flex items-start gap-2 text-sm',
            status === FORM_STATUS.success && 'text-terracota-300',
            status === FORM_STATUS.error && 'text-terracota-200',
          )}
        >
          {status === FORM_STATUS.success ? (
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          ) : null}
          {status === FORM_STATUS.error ? (
            <AlertCircle className="mt-0.5 size-4 shrink-0" strokeWidth={2} aria-hidden="true" />
          ) : null}
          {feedback}
        </p>
      </div>
    </form>
  )
}
