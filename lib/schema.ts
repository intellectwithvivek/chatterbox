/** Structured data builders. One source of truth per schema type. */

import { faqs } from '@/data/content'
import { site, vivekui } from '@/lib/site'

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `${site.name} — Free AI Chatbot UI Template`,
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'UI Template',
    operatingSystem: 'Any',
    url: site.url,
    description: site.description,
    softwareVersion: '1.0.0',
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: site.repoUrl,
    programmingLanguage: ['TypeScript', 'React'],
    softwareRequirements: 'Node.js 20.9+, React 19, Next.js 16',
    author: {
      '@type': 'Person',
      name: vivekui.authorName,
      url: vivekui.author,
    },
    isBasedOn: {
      '@type': 'SoftwareSourceCode',
      name: 'VivekUI',
      url: vivekui.docs,
      codeRepository: vivekui.github,
      description:
        'A free React component library with zero runtime dependencies: 91 components and 6 SVG charts.',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Free',
    },
  }
}

export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${site.url}${crumb.path}`,
    })),
  }
}
