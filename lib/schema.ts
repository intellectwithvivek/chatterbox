/** Structured data builders. One source of truth per schema type. */

import { faqs, steps } from '@/data/content'
import { site, vivekui } from '@/lib/site'

/** The author node, reused as `author` and `publisher` across every graph. */
function person() {
  return {
    '@type': 'Person',
    '@id': `${site.url}/#author`,
    name: vivekui.authorName,
    url: vivekui.author,
    jobTitle: 'Software engineer',
    sameAs: [
      vivekui.author,
      'https://github.com/intellectwithvivek',
      vivekui.npm,
      vivekui.docs,
    ],
  }
}

/** Names the site itself, so the author and the domain are linked entities. */
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    inLanguage: 'en',
    author: person(),
    publisher: person(),
    license: 'https://opensource.org/licenses/MIT',
    isAccessibleForFree: true,
  }
}

export function softwareApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${site.url}/#template`,
    name: `${site.name} — Free AI Chatbot UI Template`,
    alternateName: 'ChatterBox AI chat UI template',
    applicationCategory: 'DeveloperApplication',
    applicationSubCategory: 'UI Template',
    operatingSystem: 'Any',
    url: site.url,
    sameAs: site.repoUrl,
    description: site.description,
    softwareVersion: '1.0.0',
    datePublished: '2026-08-24',
    license: 'https://opensource.org/licenses/MIT',
    codeRepository: site.repoUrl,
    programmingLanguage: ['TypeScript', 'React'],
    runtimePlatform: 'Next.js 16',
    softwareRequirements: 'Node.js 20.9+, React 19, Next.js 16',
    isAccessibleForFree: true,
    author: person(),
    publisher: person(),
    featureList: [
      'Live chat thread with typing indicator',
      'Code blocks with copy-to-clipboard',
      'SVG charts rendered inside chat message bubbles',
      'Dark mode with CSS custom property theming',
      'Zero runtime dependencies',
      'WCAG AA accessible, server-rendered',
    ],
    isBasedOn: {
      '@type': 'SoftwareSourceCode',
      name: 'VivekUI',
      url: vivekui.docs,
      codeRepository: vivekui.github,
      programmingLanguage: 'TypeScript',
      description:
        'A free React component library with zero runtime dependencies: 91 components and 6 SVG charts.',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      category: 'Free',
      seller: person(),
    },
  }
}

export function faqPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site.url}/#faq`,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

/**
 * The install steps as a `HowTo`. This is the AEO surface for the question
 * people actually type — "how do I build a chat UI in Next.js" — so the steps
 * come from the same array the Stepper renders and cannot drift from it.
 */
export function howToSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${site.url}/#howto`,
    name: 'How to build an AI chat UI in React and Next.js',
    description:
      'Render a working chat thread with a typing indicator, copyable code blocks and in-bubble charts using VivekUI, a zero-dependency React component library.',
    totalTime: 'PT10M',
    estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
    tool: [
      { '@type': 'HowToTool', name: 'Node.js 20.9 or newer' },
      { '@type': 'HowToTool', name: 'A Next.js 16 App Router project' },
    ],
    supply: [{ '@type': 'HowToSupply', name: vivekui.pkg }],
    step: steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.label,
      text: step.description,
      url: `${site.url}/#how`,
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
