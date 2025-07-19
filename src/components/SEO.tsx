import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
}

export default function SEO({ 
  title, 
  description, 
  image = '/images/og-image.jpg',
  url = window.location.href,
  type = 'website' 
}: SEOProps) {
  const { t, i18n } = useTranslation()
  
  const siteTitle = title ? `${title} | ${t('seo.title')}` : t('seo.title')
  const siteDescription = description || t('seo.description')
  const siteName = t('seo.siteName')
  const author = t('seo.author')
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta name="author" content={author} />
      <meta name="language" content={i18n.language} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={i18n.language === 'ar' ? 'ar_SA' : 'en_US'} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@yourhandle" />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#00bfff" />
      
      {/* Language Alternatives */}
      <link rel="alternate" hrefLang="en" href={url.replace(/\/(ar|en)\//, '/en/')} />
      <link rel="alternate" hrefLang="ar" href={url.replace(/\/(ar|en)\//, '/ar/')} />
      <link rel="alternate" hrefLang="x-default" href={url.replace(/\/(ar|en)\//, '/en/')} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": author,
          "url": url,
          "description": siteDescription,
          "jobTitle": t('seo.jobTitle'),
          "knowsAbout": [
            "React",
            "TypeScript", 
            "Three.js",
            "Web Development",
            "Frontend Development",
            "UI/UX Design"
          ],
          "sameAs": [
            "https://github.com/yourprofile",
            "https://linkedin.com/in/yourprofile",
            "https://twitter.com/yourhandle"
          ]
        })}
      </script>
      
      {/* Performance Hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  )
}