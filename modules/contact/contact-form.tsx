'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TbMail } from 'react-icons/tb'
import { toast } from 'sonner'
import { z } from 'zod'
import { Form } from '~/components/ui/form'

const contactFormSchema = z.object({
  message: z.string().min(2),
  name: z.string().min(2),
  email: z.string().email(),
})
type ContactFormSchema = z.infer<typeof contactFormSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormSchema>({
    resolver: zodResolver(contactFormSchema),
  })
  const onSubmit = React.useCallback(
    async (data) => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          body: JSON.stringify({ data }),
        })
        if (response.ok) {
          toast.success('消息发送成功！我们会尽快回复您。', { duration: 5000 })
          reset()
        } else {
          toast.error('发送失败，请稍后再试。')
        }
        // eslint-disable-next-line unused-imports/no-unused-vars
      } catch (_) {
        toast.error('发送失败，请稍后再试。')
      }
    },
    [reset],
  )

  return (
    <Form.Root submitting={isSubmitting} onSubmit={handleSubmit(onSubmit)}>
      <Form.Container>
        <header>
          <p className='flex flex-col text-sm tracking-tight text-stone-500 md:flex-row md:items-center'>
            如果您有任何问题，也可以直接发送邮件至
            <span className='inline-flex items-center space-x-0.5 text-stone-600 dark:text-stone-300 md:mx-1'>
              <TbMail className='h-4 w-4' />
              <a
                href='mailto:contact@zolplay.com'
                className='text-stone-600 no-underline hover:underline dark:text-stone-300'
              >
                contact@zolplay.com
              </a>
            </span>
          </p>
        </header>

        <Form.Section>
          <Form.FieldGroup name='name'>
            <Form.Label>姓名</Form.Label>
            <Form.Input placeholder='请输入您的姓名' {...register('name')} />
            <Form.Error message={errors.name?.message} />
          </Form.FieldGroup>
          <Form.FieldGroup name='email'>
            <Form.Label>邮箱</Form.Label>
            <Form.Input type='email' autoComplete='on' placeholder='请输入您的邮箱地址' {...register('email')} />
            <Form.Error message={errors.email?.message} />
          </Form.FieldGroup>

          <Form.FieldGroup name='message' size='lg'>
            <Form.Label>留言</Form.Label>
            <Form.TextArea defaultValue='' rows={3} placeholder='请输入您的留言内容' {...register('message')} />
            <Form.Error message={errors.message?.message} />
          </Form.FieldGroup>
        </Form.Section>
      </Form.Container>

      <Form.Footer>
        <Form.SubmitButton>{isSubmitting ? '发送中...' : '发送留言'}</Form.SubmitButton>
      </Form.Footer>
    </Form.Root>
  )
}
