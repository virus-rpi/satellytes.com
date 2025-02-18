import { IGatsbyImageData } from 'gatsby-plugin-image';
import {
  ContentfulRichTextGatsbyReference,
  RenderRichTextData,
} from 'gatsby-source-contentful/rich-text';

export interface BlogPostTeaser {
  fields: {
    path: string;
  };
  heroImage: {
    image: IGatsbyImageData;
  };
  id: string;
  publicationDate: string;
  teaserText: string;
  title: string;
}

export interface SyTeamMember {
  id: string;
  name: string;
  image: IGatsbyImageData;
}

export interface ContentFulBlogPostAuthor {
  fullName: string;
  summary: string;
}

export interface ContentfulBlogPostHero {
  image: any;
  creator: string;
  source: string;
  naturalHeight: boolean;
}

export interface ContentfulCodeBlock {
  description: string;
  code: string;
}

export interface ContentfulBlogPost {
  author: ContentFulBlogPostAuthor;
  introRichText?: {
    raw: string;
  };
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  heroImage: ContentfulBlogPostHero;
  id: string;
  leadBoxText: string;
  publicationDate: string;
  seoMetaText: string;
  slug: string;
  teaserText: string;
  title: string;
}

export interface ContentfulVacancy {
  id: string;
  name: string;
  slug: string;
  content: RenderRichTextData<ContentfulRichTextGatsbyReference>;
  schedule: string;
  createdAt: string;
  shortDescription: {
    shortDescription: string;
  };

  // added via `onCreateNode`
  socialCardFile: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
}

export interface BreadcrumbEntry {
  pathname: string;
  label: string;
}

export interface I18nNextData {
  languages: string[];
  language: string;
  path: string;
  originalPath: string;
  defaultLanguage: string;
}
