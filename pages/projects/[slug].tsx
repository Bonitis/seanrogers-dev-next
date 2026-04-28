import { useState } from 'react'
import { NextPage, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import parseFrontMatter from 'front-matter'
import { marked } from 'marked'

import StackLogos from '@/components/StackLogos'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { siteUrlFor } from '@/lib/site'
import {
  ProjectMarkdownAttributes,
  ProjectPage,
} from '@/interfaces/project'

export const getStackLogos = (stack: string): string[] => {
  return stack.split(' | ').map((name) => `${name}`)
}

const ProjectSlug: NextPage<{ project: ProjectPage }> = ({ project }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const gallery = project.gallery ?? []
  const isOpen = openIndex !== null
  const projectUrl = siteUrlFor(`/projects/${project.slug}`)
  const thumbnailUrl = siteUrlFor(
    `/assets/screenshots/${project.thumbnail}.png`
  )

  return (
    <>
      <Head>
        <title>{`${project.title} - Sean Rogers dev portfolio`}</title>
        <meta name="description" content={project.description} />
        <meta name="keywords" content={project.stack.split(' | ').join(',')} />
        <link rel="canonical" href={projectUrl} />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${project.title} - Sean Rogers dev portfolio`}
        />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={thumbnailUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="seanrogers.dev" />
        <meta property="twitter:url" content={projectUrl} />
        <meta
          name="twitter:title"
          content={`${project.title} - Sean Rogers dev portfolio`}
        />
        <meta name="twitter:description" content={project.description} />
        <meta name="twitter:image" content={thumbnailUrl}></meta>
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
        {gallery.length > 0 && (
          <>
            <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 xl:w-10/12 xl:max-w-5xl xl:grid-cols-3">
              {gallery.map((imagePath, index) => (
                <button
                  key={imagePath}
                  type="button"
                  aria-label={`View ${imagePath} full size`}
                  onClick={() => setOpenIndex(index)}
                  className="cursor-zoom-in rounded bg-gray-200 p-2 transition hover:drop-shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <Image
                    src={`/assets/screenshots/${imagePath}.png`}
                    alt={imagePath}
                    height={400}
                    width={600}
                    sizes="100vw"
                    style={{
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                  />
                </button>
              ))}
            </div>

            <Dialog
              open={isOpen}
              onOpenChange={(open) => !open && setOpenIndex(null)}
            >
              <DialogContent className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-5xl">
                <DialogTitle className="sr-only">
                  {project.title} gallery
                </DialogTitle>
                {isOpen && (
                  <Carousel
                    opts={{ startIndex: openIndex ?? 0, loop: true }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {gallery.map((imagePath) => (
                        <CarouselItem key={imagePath}>
                          <div className="flex items-center justify-center">
                            <Image
                              src={`/assets/screenshots/${imagePath}.png`}
                              alt={imagePath}
                              height={1200}
                              width={1800}
                              sizes="95vw"
                              style={{
                                width: '100%',
                                height: 'auto',
                                maxHeight: '85vh',
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2 bg-white/90 text-slate-900 hover:bg-white sm:-left-12" />
                    <CarouselNext className="right-2 bg-white/90 text-slate-900 hover:bg-white sm:-right-12" />
                  </Carousel>
                )}
              </DialogContent>
            </Dialog>
          </>
        )}
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
