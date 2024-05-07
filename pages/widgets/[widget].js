import React from 'react';
import fs from 'fs';
import path from 'path';

const WidgetPage = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export async function getStaticProps(context) {
  const { widgetid } = context.params;
  const htmlContent = fs.readFileSync(path.join(__dirname, 'widgets', `${widgetid}.html`), 'utf8');
  return { props: { htmlContent } };
}

export async function getStaticPaths() {
  const widgets = fs.readdirSync(path.join(__dirname, 'widgets'));
  const paths = widgets.map(file => ({
    params: { widgetid: file.replace('.html', '') }
  }));
  return { paths, fallback: false };
}

export default WidgetPage;
