import { useEffect } from 'react';

const StructuredDataLoader = ({ pageUrl, type, initialData, seoId }) => {
    useEffect(() => {
        if (!initialData) return;

        // Validation
        const isValid = initialData['@context'] && initialData['@type'];
        if (!isValid) {
            console.error(`Invalid JSON-LD schema for type ${type}`);
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: "seo_structured_data_error",
                seo_id: seoId,
                error_type: "invalid_schema"
            });
            return;
        }

        // Create script tag
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.id = `json-ld-${type.toLowerCase()}`;
        script.text = JSON.stringify(initialData);

        // Remove existing one for the same type to avoid duplicates
        const existing = document.getElementById(script.id);
        if (existing) document.head.removeChild(existing);

        document.head.appendChild(script);

        return () => {
            const el = document.getElementById(script.id);
            if (el) document.head.removeChild(el);
        };
    }, [initialData, type, seoId]);

    return null;
};

export default StructuredDataLoader;
