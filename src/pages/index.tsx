import { graphql, PageProps } from 'gatsby';
import React from 'react';
import SEO from '../components/layout/seo';
import { Landingpage } from '../components/pages/landingpage/landingpage';
import { BlogPostTeaser, ContentfulVacancy } from '../types';
import { IGatsbyImageData } from 'gatsby-plugin-image';
import { StructuredOrganizationData } from '../components/pages/landingpage/structured-organization-data';

export interface OfficeImage {
  relativePath: string;
  childImageSharp: {
    gatsbyImageData: IGatsbyImageData;
  };
}

interface IndexPageQueryProps {
  allContentfulVacancy: {
    nodes: ContentfulVacancy[];
  };
  allContentfulBlogPost: {
    nodes: BlogPostTeaser[];
  };
  officeImages: {
    nodes: OfficeImage[];
  };
}

const IndexPage = (props: PageProps<IndexPageQueryProps>) => {
  const jobPositions = props.data.allContentfulVacancy.nodes;
  const blogPosts = props.data.allContentfulBlogPost.nodes;
  const officeImages = props.data.officeImages.nodes.reduce((memo, image) => {
    memo[image.relativePath] = image;
    return memo;
  }, {});

  return (
    <>
      <SEO title="Satellytes" location={props.location} rssLink />

      <StructuredOrganizationData />

      <Landingpage
        officeImages={officeImages}
        positions={jobPositions}
        posts={blogPosts}
      />
    </>
  );
};

export default IndexPage;

export const IndexPageQuery = graphql`
  query ($language: String!) {
    officeImages: allFile(filter: { relativeDirectory: { eq: "office" } }) {
      nodes {
        id
        relativePath
        childImageSharp {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }

    allContentfulVacancy(filter: { node_locale: { eq: $language } }, limit: 3) {
      nodes {
        id
        name
        shortDescription {
          shortDescription
        }
        slug
      }
    }

    allContentfulBlogPost(
      filter: { node_locale: { eq: "en" } }
      sort: { publicationDate: DESC }
      limit: 3
    ) {
      nodes {
        fields {
          path
        }
        id
        title
        teaserText
        publicationDate
        heroImage {
          image {
            gatsbyImageData(
              width: 400
              aspectRatio: 1.77
              layout: CONSTRAINED
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }

    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;
