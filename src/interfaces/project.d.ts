export interface Project {
    slug: string;
    title: string;
    thumbnail: string;
    description: string;
    stack: string;
    logos: string[];
    gallery?: string;
    sequence?: number
  };
  
  export interface ProjectMarkdownAttributes extends Omit<Project, 'logos'> {
      body: string;
  };
  
  export interface ProjectPage extends Omit<ProjectMarkdownAttributes, 'gallery'> {
      html: string;
      logos: Project['logos'];
      gallery?: string[];
  }