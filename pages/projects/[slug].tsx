import { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'
import StackLogos from '../../src/components/StackLogos'
import {
  ProjectMarkdownAttributes,
  ProjectPage,
} from '../../src/interfaces/project'

export const getStackLogos = (stack: string): string[] => {
  return stack.split(' | ').map((name) => `${name}`)
}

const ProjectSlug: NextPage<{ project: ProjectPage }> = ({ project }) => {
  return (
    <>
      <Head>
        <title>{`${project.title} - Sean Rogers dev portfolio`}</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.stack.split(' | ').join(',')} />
        <link
          rel="canonical"
          href={`https://seanrogers.dev/projects/${project.slug}`}
        />
        <meta property="og:url" content="https://seanrogers.dev/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${project.title} - Sean Rogers dev portfolio`}
        />
        <meta property="og:description" content={project.description} />
        <meta
          property="og:image"
          content={`https://seanrogers.dev/assets/screenshots/${project.thumbnail}.png`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content="https://seanrogers.dev/" />
        <meta
          name="twitter:title"
          content={`${project.title} - Sean Rogers dev portfolio`}
        />
        <meta name="twitter:description" content={project.description} />
        <meta
          name="twitter:image"
          content={`https://seanrogers.dev/assets/screenshots/${project.thumbnail}.png`}
        ></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="mx-auto mb-8 flex w-10/12 max-w-5xl flex-col items-center justify-between py-4 text-slate-800 dark:text-white">
        <h1 className="mb-2 text-5xl font-bold text-indigo-800 dark:text-white md:text-7xl">
          {project.title}
        </h1>
        <div className="border-t-1 flex border-slate-500 pt-2">
          <StackLogos logos={project.logos} size={36} />
        </div>
        <div className="relative m-8 h-48 w-full md:h-[28rem] lg:h-[32rem]">
          <Image
            src={`/assets/screenshots/${project.thumbnail}.png`}
            alt={project.thumbnail}
            priority
            fill
            sizes="100vw"
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <hr className="border-t-1 mb-8 w-full border-solid border-slate-500" />
        <div
          className="prose w-full dark:prose-invert lg:prose-xl"
          dangerouslySetInnerHTML={{ __html: project.html }}
        />
        <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:w-10/12 xl:max-w-5xl xl:grid-cols-3">
          {project.gallery?.map((path) => (
            <a
              href={`#${path}`}
              key={path}
              className="cursor-zoom-in rounded bg-gray-200 p-2 hover:drop-shadow-lg"
            >
              <Image
                src={`/assets/screenshots/${path}.png`}
                alt={path}
                height={400}
                width={600}
                sizes="100vw"
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
              />
            </a>
          ))}
        </div>
        <div>
          {project.gallery?.map((path) => (
            <div
              key={`lightbox-${path}`}
              className="fixed bottom-0 left-0 right-0 z-20 flex h-0 items-center justify-center bg-black bg-opacity-80 transition-all target:h-screen target:w-screen target:overflow-auto"
              id={path}
            >
              <a
                href="#_"
                className="absolute right-0 top-0 z-30 p-2 text-3xl font-bold text-white"
              >
                &times;
              </a>
              <div className="m-auto block w-4/5">
                <Image
                  src={`/assets/screenshots/${path}.png`}
                  alt={path}
                  height={400}
                  width={600}
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
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

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const projectDirectory = path.join(
    process.cwd(),
    'projects',
    `${context.params?.slug}.md`
  )
  const fileContents = await fs.readFile(projectDirectory)
  if (!fileContents) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    }
  }

  // markdown transform
  const { attributes, body } = parseFrontMatter<ProjectMarkdownAttributes>(
    fileContents.toString()
  )
  const html = marked(body)
  const gallery = attributes.gallery?.split(', ')
  const project = {
    html,
    logos: getStackLogos(attributes.stack),
    ...attributes,
    gallery,
  }

  return {
    props: { project },
  }
}

export default ProjectSlug
