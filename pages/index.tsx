import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import path from 'path'
import parseFrontMatter from 'front-matter'
import { promises as fs } from 'fs'
import StackLogos from '../src/components/StackLogos'
import {
  ProjectMarkdownAttributes,
  ProjectPage,
} from '../src/interfaces/project'
import { getStackLogos } from './projects/[slug]'
import avatar from '../public/assets/aiavatar.jpg'

const sortProjects = (a: ProjectPage, b: ProjectPage) => {
  return (a.sequence || 0) - (b.sequence || 0)
}

const DESCRIPTION =
  'A self-taught software engineer and ex-founder ready to help you build your next project.'

const Home: NextPage<{ projects: ProjectPage[] }> = ({ projects }) => {
  return (
    <>
      <Head>
        <title>Sean Rogers - software engineer and ex-founder</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="Javascript,Typescript,React,Redux,Node,Nextjs,Graphql,Firebase,Stripe,Vercel,Dotnet,Azure,AWS,Lambda"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href="https://seanrogers.dev" />
        <meta property="og:url" content="https://seanrogers.dev/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Sean Rogers" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          property="og:image"
          content="https://seanrogers.dev/assets/aiavatar.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content="https://seanrogers.dev/" />
        <meta name="twitter:title" content="Sean Rogers" />
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
            <h1 className="mb-4 text-3xl font-light md:text-5xl">
              Hello, I am Sean 👋
            </h1>
            <p className="text-2xl font-light text-indigo-800 dark:text-indigo-200">
              {DESCRIPTION}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto w-full md:w-10/12">
        <h2 className="mb-8 mt-2 text-center text-2xl font-light dark:text-white">
          Projects
        </h2>
        <div className="mx-8 grid max-w-5xl grid-cols-1 gap-24 md:mx-auto">
          {projects.sort(sortProjects).map((project) => (
            <div
              key={project.slug}
              className="flex flex-col rounded lg:flex-row"
            >
              <div className="mb-8 flex flex-col lg:mb-0 lg:mr-16 lg:h-72 lg:w-4/12">
                <div>
                  <h3 className="pb-1 text-3xl font-bold text-slate-700 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-4 font-light text-slate-800 dark:text-white">
                    {project.description}
                  </p>
                  <div className="mt-4 flex">
                    <StackLogos logos={project.logos} size={30} />
                  </div>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-lg border-4 border-solid border-indigo-800 py-2 px-16 text-lg font-bold text-indigo-800 transition-colors hover:bg-indigo-800 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-indigo-800 md:w-fit"
                >
                  Details
                </Link>
              </div>
              <div className="h-36 w-full overflow-hidden rounded-lg bg-slate-100 p-4 dark:bg-slate-700 sm:h-60 md:h-80 lg:h-72 lg:w-8/12 lg:px-8 lg:pb-0 lg:pt-8">
                <Image
                  src={`/assets/screenshots/${project.thumbnail}.png`}
                  alt={project.thumbnail}
                  width={800}
                  height={400}
                  sizes="100vw"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    objectPosition: 'top',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const projectsDirectory = path.join(process.cwd(), 'projects')
  const filenames = await fs.readdir(projectsDirectory)

  const projects = filenames.map(async (filename) => {
    const filePath = path.join(projectsDirectory, filename)
    const fileContents = await fs.readFile(filePath)

    const { attributes } = parseFrontMatter<ProjectMarkdownAttributes>(
      fileContents.toString()
    )
    return {
      slug: filename.replace(/\.md$/, ''),
      title: attributes.title,
      description: attributes.description,
      stack: attributes.stack,
      thumbnail: attributes.thumbnail,
      logos: getStackLogos(attributes.stack),
      sequence: attributes.sequence,
    }
  })

  return {
    props: { projects: await Promise.all(projects) },
  }
}

export default Home
