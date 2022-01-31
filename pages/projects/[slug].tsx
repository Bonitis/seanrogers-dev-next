import { NextPage, GetServerSidePropsContext } from "next"
import Head from 'next/head'
import Image from 'next/image'
import { promises as fs } from 'fs'
import path from 'path'
import parseFrontMatter from "front-matter";
import { marked } from "marked";
import StackLogos from '../../src/components/StackLogos'
import { ProjectMarkdownAttributes, ProjectPage } from "../../src/interfaces/project"

export const getStackLogos = (stack: string): string[] => {
    return stack.split(' | ').map((name) => `${name}`);
}

const ProjectSlug: NextPage<{ project: ProjectPage }> = ({ project }) => {
    return (
        <>
            <Head>
                <title>{`${project.title} - Sean Rogers dev portfolio`}</title>
                <meta name="description" content={project.description} />
                <meta name="keywords" content={project.stack.split(' | ').join(',')} />
                <link rel="canonical" href={`https://seanrogers.dev/projects/${project.slug}`} />
                <meta property="og:url" content="https://seanrogers.dev/" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Sean Rogers" />
                <meta property="og:description" content={project.description} />
                <meta property="og:image" content={`/assets/screenshots/${project.thumbnail}.png`} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:domain" content="seanrogers.dev" />
                <meta property="twitter:url" content="https://seanrogers.dev/" />
                <meta name="twitter:title" content="Sean Rogers" />
                <meta name="twitter:description" content={project.description} />
                <meta name="twitter:image" content={`/assets/screenshots/${project.thumbnail}.png`}></meta>        
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="w-10/12 max-w-5xl mx-auto mb-8 flex flex-col items-center justify-between py-4 dark:text-white text-slate-800">
                <h1 className="text-indigo-800 dark:text-white text-5xl md:text-7xl mb-2 font-bold">{project.title}</h1>
                <div className="flex border-t-1 border-slate-500 pt-2">
                    <StackLogos logos={project.logos} size={36} />
                </div>
                <div className="m-8 h-48 md:h-[28rem] lg:h-[32rem] w-full relative">
                    <Image
                        src={`/assets/screenshots/${project.thumbnail}.png`}
                        alt={project.thumbnail}
                        layout="fill"
                        objectFit="contain"
                        priority
                    />
                </div>
                <hr className="border-t-1 mb-8 w-full border-solid border-slate-500" />
                <div className="md-body" dangerouslySetInnerHTML={{ __html: project.html }} />
                <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 w-full xl:w-10/12 xl:max-w-5xl">
                    {project.gallery?.map((path) => (
                        <a href={`#${path}`} key={path} className="p-2 bg-gray-200 rounded hover:drop-shadow-lg cursor-zoom-in">
                            <Image
                                src={`/assets/screenshots/${path}.png`}
                                alt={path}
                                height={400}
                                width={600}
                                layout="responsive"
                                objectFit="cover"
                            />
                        </a>
                    ))}
                </div>
                <div>
                    {project.gallery?.map((path) => (
                        <div key={`lightbox-${path}`} className="bg-black bg-opacity-80 hidden fixed z-20 target:items-center target:bottom-0 target:top-0 target:left-0 target:right-0 target:flex target:justify-center target:overflow-auto" id={path}>
                            <a href="#_" className="fixed text-3xl text-white right-0 top-0 z-30 font-bold p-2">&times;</a>
                            <div className="w-4/5 block m-auto">
                                <Image
                                    src={`/assets/screenshots/${path}.png`}
                                    alt={path}
                                    height={400}
                                    width={600}
                                    layout="responsive"
                                    objectFit="contain"
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
    const projectDirectory = path.join(process.cwd(), 'projects', `${context.params?.slug}.md`)
    const fileContents = await fs.readFile(projectDirectory)
    if (!fileContents) {
        return {
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }

    // markdown transform
    const { attributes, body } = parseFrontMatter<ProjectMarkdownAttributes>(fileContents.toString());
    const html = marked(body);
    const gallery = attributes.gallery?.split(', ');
    const project = { html, logos: getStackLogos(attributes.stack), ...attributes, gallery };

    return {
        props: { project }
    }
}

export default ProjectSlug
