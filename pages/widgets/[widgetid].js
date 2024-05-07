import fs from 'fs';
import path from 'path';

const WidgetPage = ({ htmlContent }) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export async function getStaticProps({ params }) {
  const { widgetid } = params;
  const filePath = path.join(process.cwd(), 'widgets', `${widgetid}.html`);
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  return { props: { htmlContent } };
}

export async function getStaticPaths() {
  const dirPath = path.join(process.cwd(), 'widgets');
  const files = fs.readdirSync(dirPath);
  const paths = files.map(file => ({
    params: { widgetid: file.replace('.html', '') }
  }));

  return { paths, fallback: false };
}

export default WidgetPage;
