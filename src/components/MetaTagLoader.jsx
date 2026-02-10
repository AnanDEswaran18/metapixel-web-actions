import { useEffect } from 'react';

const MetaTagLoader = ({ pageUrl, initialData }) => {
    useEffect(() => {
        if (!initialData) return;

        // 1. Update Title
        if (initialData.title) {
            document.title = initialData.title;
        }

        // 2. Update Description
        if (initialData.description) {
            let metaDesc = document.head.querySelector('meta[name="description"]');
            if (!metaDesc) {
                metaDesc = document.createElement('meta');
                metaDesc.setAttribute('name', 'description');
                document.head.appendChild(metaDesc);
            }
            metaDesc.setAttribute('content', initialData.description);
        }

        // 3. Update Keywords
        if (initialData.keywords && initialData.keywords.length > 0) {
            let metaKey = document.head.querySelector('meta[name="keywords"]');
            if (!metaKey) {
                metaKey = document.createElement('meta');
                metaKey.setAttribute('name', 'keywords');
                document.head.appendChild(metaKey);
            }
            metaKey.setAttribute('content', initialData.keywords.join(', '));
        }

        // Cleanup function (optional, but good practice in SPAs)
        return () => {
            // We usually don't remove standard meta tags on unmount to avoid flickering,
            // but we could reset title.
        };
    }, [initialData]);

    return null; // No UI needed anymore
};

export default MetaTagLoader;
