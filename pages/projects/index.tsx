import type { NextPage } from 'next'
import Head from 'next/head'
import Image from "next/legacy/image";
import Link from 'next/link'
import path from 'path'
import parseFrontMatter from "front-matter";
import { promises as fs } from 'fs'
import StackLogos from '../../src/components/StackLogos'
import { ProjectMarkdownAttributes, ProjectPage } from '../../src/interfaces/project'
import { getStackLogos } from './[slug]'

const sortProjects = (a: ProjectPage, b: ProjectPage) => {
  return (a.sequence || 0) - (b.sequence || 0);
}

const Home: NextPage<{ projects: ProjectPage[] }> = ({ projects }) => {
  return (
    <div>
      <Head>
        <title>Sean Rogers</title>
        <meta name="description" content="Software engineer and ex-founder with expertise in javascript/typescript, react, and building micro-service architecture." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full md:w-10/12 mx-auto">
        <h2 className="text-center w-full text-2xl font-light mb-8 mt-2 dark:text-white">Projects</h2>
          <div className="max-w-5xl grid grid-cols-1 gap-24 mx-8 md:mx-auto">
            {projects.sort(sortProjects).map(project => (
              <div key={project.slug} className="flex flex-col lg:flex-row rounded">
                <div className="flex flex-col lg:h-72 mb-8 lg:mb-0 lg:mr-16 w-full lg:w-4/12">
                  <div>
                    <h3 className="text-slate-700 dark:text-white font-bold text-3xl pb-1">{project.title}</h3>
                    <p className="mt-4 font-light text-slate-800 dark:text-white">{project.description}</p>
                    <div className="flex mt-4">
                      <StackLogos logos={project.logos} size={32} />
                    </div>
                  </div>
                  <Link href={`projects/${project.slug}`} className="text-indigo-800 dark:text-white hover:text-white dark:hover:text-indigo-800 hover:bg-indigo-800 dark:hover:bg-white cursor-pointer font-bold text-lg border-4 border-solid border-indigo-800 dark:border-white rounded-lg flex justify-center items-center mt-4 py-2 px-16 w-fit transition-colors">
                    Details
                  </Link>
                </div>
                <div className="rounded-lg bg-slate-100 dark:bg-slate-700 p-4 lg:pb-0 lg:pt-8 lg:px-8 w-full lg:w-8/12 h-36 sm:h-60 md:h-80 lg:h-72 overflow-hidden">
                  <Image
                    src={`/assets/screenshots/${project.thumbnail}.png`}
                    alt={project.thumbnail}
                    width={800}
                    height={800}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
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
    );
    return {
      slug: filename.replace(/\.md$/, ""),
      title: attributes.title,
      description: attributes.description,
      stack: attributes.stack,
      thumbnail: attributes.thumbnail,
      logos: getStackLogos(attributes.stack),
      sequence: attributes.sequence,
    };
  })

  return {
      props: { projects: await Promise.all(projects) }
  }
}

export default Home
