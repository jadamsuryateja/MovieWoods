import { useEffect } from 'react';

interface SEOProps {
    title: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    ogType?: string;
    canonicalUrl?: string;
}

const useSEO = ({
    title,
    description,
    keywords,
    ogImage,
    ogType = 'website',
    canonicalUrl,
}: SEOProps) => {
    useEffect(() => {
        // Update Document Title
        const fullTitle = title.includes('Dreamswood') ? title : `${title} | Dreamswood`;
        document.title = fullTitle;

        // Update Meta Description
        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            }

            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                ogDescription.setAttribute('content', description);
            }

            const twitterDescription = document.querySelector('meta[name="twitter:description"]');
            if (twitterDescription) {
                twitterDescription.setAttribute('content', description);
            }
        }

        // Update Meta Keywords
        if (keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', keywords);
            }
        }

        // Update OG Image
        if (ogImage) {
            const ogImg = document.querySelector('meta[property="og:image"]');
            if (ogImg) {
                ogImg.setAttribute('content', ogImage);
            }

            const twitterImg = document.querySelector('meta[name="twitter:image"]');
            if (twitterImg) {
                twitterImg.setAttribute('content', ogImage);
            }
        }

        // Update OG Type
        const ogTp = document.querySelector('meta[property="og:type"]');
        if (ogTp) {
            ogTp.setAttribute('content', ogType);
        }

        // Update Canonical URL
        if (canonicalUrl) {
            const canonical = document.querySelector('link[rel="canonical"]');
            if (canonical) {
                canonical.setAttribute('href', canonicalUrl);
            }
        }

        // OG Title & Twitter Title
        const ogTtl = document.querySelector('meta[property="og:title"]');
        if (ogTtl) ogTtl.setAttribute('content', fullTitle);

        const twTtl = document.querySelector('meta[name="twitter:title"]');
        if (twTtl) twTtl.setAttribute('content', fullTitle);

    }, [title, description, keywords, ogImage, ogType, canonicalUrl]);
};

export default useSEO;
