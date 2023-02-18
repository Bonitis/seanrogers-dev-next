import type { NextPage } from 'next'
import Head from 'next/head'
import FreeStuff from '../../src/components/FreeStuff'

const DESCRIPTION =
  'Useful resources for surviving your first startup or early stage company.'

const HelloFounders: NextPage<{}> = () => {
  return (
    <div>
      <Head>
        <title>Helping you survive starting your first company or joining a startup</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="Startup,venture capital,fundraising,early stage company"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://seanrogers.dev/" />
        <meta property="og:url" content="https://seanrogers.dev/hello-founders" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Survive your first startup" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content="https://seanrogers.dev/assets/avatar.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content="https://seanrogers.dev/hello-founders" />
        <meta name="twitter:title" content="Survive your first startup" />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta
          name="twitter:image"
          content="https://seanrogers.dev/assets/avatar.png"
        ></meta>
      </Head>

      <div className="mx-auto mb-16 bg-slate-200 py-16 text-slate-800 dark:bg-slate-600 dark:text-white">
        <div className="mx-auto flex w-10/12 max-w-5xl flex-col md:flex-row">
          <div className="mt-3 md:mt-0">
            <h1 className="mb-4 text-3xl font-light md:text-5xl">
              Hello Founders 👋
            </h1>
            <p className="text-2xl font-light text-indigo-800 dark:text-indigo-200">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto w-10/12 max-w-5xl">
        <div className="grid max-w-5xl grid-cols-1 gap-4 md:mx-auto">
          <h2 className="mt-2 text-2xl font-light dark:text-white">
            What is this?
          </h2>
          <p className="mb-2 font-light dark:text-white">
            Occasionally I am asked for advice, tips, or resources about
            starting a company or joining an early stage startup for the first
            time. You have probably never heard of me because I never worked at
            a FAANG/MAANG/MAAAN company or founded a unicorn. What I have done
            is work at 9 different startups, from pre-seed to series E. Two of
            those companies were as a Cofounder, with one being a complete
            failure and the other leading to a successful exit. I was lucky
            enough to participate in a{' '}
            <a
              href="https://www.techstars.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#31A955' }}
              className="hover:underline"
            >
              Techstars
            </a>{' '}
            accelerator program, and along the way in my whole journey I have
            met amazing people and gathered up bits of incredibly helpful
            information.
          </p>
          <p className="mb-2 font-light dark:text-white">
            This is a list of the boring stuff. The things you wouldn&apos;t think of
            on your own, but wish you had. It isn&apos;t about product-market fit how
            to do pricing, or building scalable tech. There are smarter people
            than me putting out content about those topics all over the place
            and I encourage you to seek them out. Instead, this is about
            surfacing the little details that will make it feel like you&apos;re a
            serial entrepreneur even though you have no idea what you&apos;re doing.
          </p>
          <h2 className="mt-8 text-2xl font-light dark:text-white">
            Free Stuff
          </h2>
          <p className="mb-2 font-light dark:text-white">
            Did you know that all the big tech companies have programs to give
            you free stuff in the hopes that your startup takes off and you&apos;ll
            be locked in to their services? Let&apos;s exploit that. Here are some of
            those programs that you can use to get resources or credits so that
            you can survive a little longer without giving away all your equity.
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <FreeStuff
              title="Stripe Atlas"
              logo="stripe-logo"
              url="https://stripe.com/atlas"
              description="Atlas offers full turn-key company registration and legal
                support, along with a huge list of articles, research, and
                guides. They also have discounts on services and offer a year of
                free payment processing."
            />
            <FreeStuff
              title="Microsoft for Startups"
              logo="azure-logo"
              url="https://www.microsoft.com/en-us/startups"
              description="If you are building your tech on Azure, look into Microsoft for Startups
                to get up to $150k in free Azure credits. You have to apply and pitch
                your idea to get in, but if you succeed you will likely have access
                to subject matter experts who can help unblock technical challenges."
            />
            <FreeStuff
              title="AWS Startups"
              logo="lambda-logo"
              url="https://aws.amazon.com/startups/"
              description="AWS has many services they will provide, but the most useful might be AWS 
              Activate, which is the program where they will give you free credits, which can be up to $100k worth."
            />
            <FreeStuff
              title="Google for Startups"
              logo="google-cloud-logo"
              url="https://cloud.google.com/startup"
              description="Google offers up to $100k worth of credits for Cloud costs and access to technical support
              and training."
            />
          </div>
          <h2 className="mt-8 text-2xl font-light dark:text-white">
            Know What You&apos;re Talking About
          </h2>
          <p className="mb-2 font-light dark:text-white">
            There is a long list of terrifying first-time situations when you
            start a company, like pitching a VC or asking a new client for
            money. The following resources are aimed at helping you survive
            those encounters with as much polish as possible.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <a
                href="https://www.startuprocket.com/articles/startup-financial-modeling-part-1-what-is-a-financial-model"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg text-lg font-bold text-indigo-800 transition-colors hover:underline dark:text-white"
              >
                Build a Financial Model
              </a>
              <p className="mt-2 font-light text-slate-800 dark:text-white">
                Troy Henikoff from MATH Venture Partners put together an amazing series on building a financial model, and why it is important
                for founders to build one from scratch. While this is an incredibly useful tool for communicating with investors, it also forces
                you to think about all of your assumptions and gives your a framework for proving if they are correct.
              </p>
            </div>
            <div>
              <a
                href="https://www.venturedeals.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg text-lg font-bold text-indigo-800 transition-colors hover:underline dark:text-white"
              >
                Venture Deals
              </a>
              <p className="mt-2 font-light text-slate-800 dark:text-white">
                This book was written by Brad Feld, a cofounder of Techstars, and was required reading for the program. Ever since I read it I have
                recommended it to anyone starting a company or even joining a startup. Funding a company is an entire world of new vocabulary and concepts.
                Reading Venture Deals is the fastest way to understand the mechanics of venture funding for both founders and employees. If you are looking
                to join a startup, this will help you ask the right questions to evaluate the equity part of your compensation.
              </p>
            </div>
            <div>
              <a
                href="https://www.ycombinator.com/sales_agreement"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg text-lg font-bold text-indigo-800 transition-colors hover:underline dark:text-white"
              >
                Y-Combinator Sales Agreement Template
              </a>
              <p className="mt-2 font-light text-slate-800 dark:text-white">
                If you are building a B2B company, you will need to contracts and outline terms for your customers. This can be a daunting experience
                if you have never done anything like that before. Use this template to get started. It won&apos;t be your last, and you&apos;ll modify it immediately,
                but will give you a huge head start.
              </p>
            </div>
            <h2 className="mt-8 text-2xl font-light dark:text-white">
            Remove Guesswork
          </h2>
          <div className="grid grid-cols-1 gap-4">
          <div>
              <a
                href="https://www.law.upenn.edu/clinic/entrepreneurship/startupkit/founders-agreement.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer rounded-lg text-lg font-bold text-indigo-800 transition-colors hover:underline dark:text-white"
              >
                UPenn Founders Agreement Template
              </a>
              <p className="mt-2 font-light text-slate-800 dark:text-white">
                Unless you are a solo founder, you likely have others working on this project with you. If you are not already close to those
                people, you will be. You will spend so much time with your chosen team that they will be like family. While you may want to
                avoid discussing negative possibilities, it is important to get ahead of disputes and disagreements that will come in the future.
                Building a Founders or Operating agreement can take all of the guesswork out of those situations. You create it while everyone
                is happy and looking out for each other. Deciding what rules are in place when something does go wrong gives you an objective
                answer and removes emotion from the process.
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelloFounders
