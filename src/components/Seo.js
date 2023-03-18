import Head from 'next/head';

const meta = {
  title: 'Speed Track',
  description: 'Speed Track built with Next.js and tailwindcss',
  authorName: 'Karthikeyan T',
  siteUrl: '',
  imageUrl: '',
};

export function Seo({
  title = meta.title,
  description = meta.description,
  children,
}) {
  return (
    <Head>
      {/* Primary */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" type="image/svg+xml" href="favicon.ico" />
      <meta name="author" content={meta.authorName} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.siteUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={meta.imageUrl} />
      
      {children}
    </Head>
  );
}
