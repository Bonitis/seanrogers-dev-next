import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { siteUrlFor } from '@/lib/site'
import avatar from '../../public/assets/aiavatar.jpg'

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  company: z.string().optional(),
  description: z.string().min(1, 'Tell me a bit about why you’re reaching out'),
})

const TITLE = 'Get in Touch'
const DESCRIPTION =
  'Want to chat about a project, an idea, or just say hi? Drop me a line and I’ll get back to you.'

const Contact: NextPage<{}> = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      description: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const res = await fetch('/api/email', {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await res.json()
    toast(json.message)
    if (res.ok) form.reset()
  }

  return (
    <div>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="contact, get in touch, software engineer, react, nextjs, typescript"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={siteUrlFor('/contact')} />
        <meta property="og:url" content={siteUrlFor('/contact')} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content={siteUrlFor('/assets/aiavatar.jpg')}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content={siteUrlFor('/contact')} />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="twitter:image"
          content={siteUrlFor('/assets/aiavatar.jpg')}
        ></meta>
      </Head>

      <div className="mx-auto mb-16 bg-slate-200 py-16 text-slate-800 dark:bg-slate-600 dark:text-white">
        <div className="mx-auto flex w-10/12 max-w-5xl flex-col items-center justify-center md:flex-row">
          <Image
            src={avatar}
            alt="avatar"
            width={200}
            height={200}
            sizes="100vw"
            className="rounded-full"
            placeholder="blur"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
          <div className="ml-0 mt-3 md:ml-6 md:mt-0">
            <h1 className="mb-4 text-3xl font-light md:text-5xl">{TITLE}</h1>
            <p className="text-2xl font-light text-indigo-800 dark:text-indigo-200">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-xl grid-cols-1 gap-4">
        <div className="mx-8 grid grid-cols-1 gap-4">
          <p className="mt-2 text-2xl font-light dark:text-white">
            Have a question, an idea, or a kind word? Send it over and I&apos;ll
            be in touch.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Andy Hunt" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="andy@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Pragmatic Company" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={5}
                        placeholder="Tell me what's on your mind..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={form.formState.isSubmitting}
                variant="outline"
                className="mt-4 w-full border-2 border-slate-800 py-1 px-4 text-sm font-bold text-slate-800 hover:bg-slate-800 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-800"
              >
                {form.formState.isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Contact
