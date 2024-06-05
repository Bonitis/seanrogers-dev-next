import type { NextPage } from 'next'
import Head from 'next/head'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../src/components/Form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Input } from '../../src/components/Input'
import avatar from '../../public/assets/aiavatar.jpg'
import Image from 'next/image'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email().min(1),
  company: z.string().min(1),
  description: z.string().min(1),
})

const TITLE = 'Lets build something amazing 🧑‍💻'
const DESCRIPTION =
  "I can help you launch an MVP, build your next big feature, or re-platform your existing application. Let's turn your ideas into reality."

const HelloFounders: NextPage<{}> = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
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
    form.reset()
    toast(json.message)
  }

  return (
    <div>
      <Head>
        <title>
          Helping you survive starting your first company or joining a startup
        </title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="MVP, startup, founder, software engineer, react, redux, node, nextjs, graphql, firebase, stripe, vercel, dotnet, azure, aws, lambda"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://seanrogers.dev/hire-me" />
        <meta property="og:url" content="https://seanrogers.dev/hire-me" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content="https://seanrogers.dev/assets/aiavatar.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content="https://seanrogers.dev/hire-me" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="twitter:image"
          content="https://seanrogers.dev/assets/aiavatar.png"
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

      <div className="grid max-w-xl grid-cols-1 gap-4 md:mx-auto">
        <p className="mt-2 text-2xl font-light dark:text-white">
          Have an exciting new project in mind? Share the details with me, and
          let&apos;s figure out how we can work together to bring your vision to
          life.
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
                    <Input placeholder="andy@company.com" {...field} />
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
                  <FormLabel>Company</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="I have an ambitious new idea..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type="submit"
              className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-md border-2 border-solid border-slate-800 py-1 px-4 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-800 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-800"
            >
              Submit
            </button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default HelloFounders
