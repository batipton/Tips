import type { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  path?: string;
  image?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

const defaultConfig = {
  siteName: 'Tips',
  siteUrl: 'https://tipseco.com',
  defaultTitle: 'Tips - Where Your Content Has Real Value',
  defaultDescription: 'Earn tokens daily and spend those tokens to access, promote, and reward the best content in our community. Engage, earn, and discover with Tips!',
  defaultImage: '/opengraph-image.png',
  twitterHandle: '@tipseco',
};

export function generateSEO({
  title,
  description,
  keywords,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: SEOConfig = {}): Metadata {
  const seo = {
    title: title ? `${title} | ${defaultConfig.siteName}` : defaultConfig.defaultTitle,
    description: description || defaultConfig.defaultDescription,
    keywords: keywords || [
      'content creator',
      'social media',
      'earn tokens',
      'community platform',
      'content monetization',
      'social networking',
      'digital rewards',
      'content platform'
    ],
  };

  const url = `${defaultConfig.siteUrl}${path}`;
  const imageUrl = image ? `${defaultConfig.siteUrl}${image}` : `${defaultConfig.siteUrl}${defaultConfig.defaultImage}`;

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      title: title || defaultConfig.defaultTitle,
      description: seo.description,
      siteName: defaultConfig.siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title || defaultConfig.defaultTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: title || defaultConfig.defaultTitle,
      description: seo.description,
      images: [imageUrl],
      creator: defaultConfig.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };

  // Add article-specific metadata if type is article
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors,
    } as any;
  }

  return metadata;
}

export function generateStructuredData(type: 'WebApplication' | 'Article' | 'Person' | 'Organization', data: any) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": type,
  };

  switch (type) {
    case 'WebApplication':
      return {
        ...baseStructuredData,
        name: data.name || defaultConfig.siteName,
        url: data.url || defaultConfig.siteUrl,
        description: data.description || defaultConfig.defaultDescription,
        applicationCategory: "SocialNetworkingApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD"
        },
        author: {
          "@type": "Organization",
          name: defaultConfig.siteName
        },
        ...data
      };
    
    case 'Article':
      return {
        ...baseStructuredData,
        headline: data.headline,
        author: {
          "@type": "Person",
          name: data.authorName
        },
        publisher: {
          "@type": "Organization",
          name: defaultConfig.siteName,
          logo: {
            "@type": "ImageObject",
            url: `${defaultConfig.siteUrl}/opengraph-image.png`
          }
        },
        datePublished: data.datePublished,
        dateModified: data.dateModified,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": data.url
        },
        image: data.image,
        ...data
      };

    case 'Person':
      return {
        ...baseStructuredData,
        name: data.name,
        url: data.url,
        image: data.image,
        sameAs: data.socialLinks || [],
        ...data
      };

    case 'Organization':
      return {
        ...baseStructuredData,
        name: data.name || defaultConfig.siteName,
        url: data.url || defaultConfig.siteUrl,
        logo: data.logo || `${defaultConfig.siteUrl}/opengraph-image.png`,
        sameAs: data.socialLinks || [],
        ...data
      };

    default:
      return baseStructuredData;
  }
}
