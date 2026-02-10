import { useEffect } from 'react';

const OpenGraphLoader = ({ pageUrl, initialData }) => {
    useEffect(() => {
        if (!initialData) return;

        const setOgTag = (property, content) => {
            if (!content) return;
            let el = document.head.querySelector(`meta[property="${property}"]`);
            if (!el) {
                el = document.createElement('meta');
                el.setAttribute('property', property);
                document.head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        // Standard OG tags from API payload
        setOgTag('og:title', initialData.og_title || initialData.title);
        setOgTag('og:description', initialData.og_description || initialData.description);
        setOgTag('og:image', initialData.og_image || initialData.image);
        setOgTag('og:type', initialData.og_type || 'website');
        setOgTag('og:url', pageUrl);

    }, [initialData, pageUrl]);

    return null;
};

export default OpenGraphLoader;
