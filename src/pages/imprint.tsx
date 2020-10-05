import React from 'react';

import Layout from '../components/layout/layout';
import SEO from '../components/seo';
import { PageTitle } from '../components/typography/typography';
import { Grid, GridItem } from '../components/grid/grid';
import { Markdown } from '../components/markdown/markdown';
import { graphql, useStaticQuery } from 'gatsby';

interface ImprintQuery {
  markdownRemark: {
    rawMarkdownBody: string;
  };
}

const ImprintPage: React.FC = () => {
  const data = useStaticQuery<ImprintQuery>(graphql`
    query {
      markdownRemark(fileAbsolutePath: { regex: "/(pages/imprint)/" }) {
        rawMarkdownBody
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Imprint" />
      <Grid>
        <GridItem>
          <PageTitle>Imprint</PageTitle>
        </GridItem>
        <GridItem>
          <Markdown data={data.markdownRemark.rawMarkdownBody} />
        </GridItem>
      </Grid>
    </Layout>
  );
};

export default ImprintPage;
