import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import MetaTagLoader from './MetaTagLoader';
import OpenGraphLoader from './OpenGraphLoader';
import StructuredDataLoader from './StructuredDataLoader';

const SeoLoader = () => {
    const location = useLocation();
    const pageUrl = window.location.origin + location.pathname;

    const [seoData, setSeoData] = useState({
        meta: null,
        og: null,
        structuredData: [],
        seoId: null,
        title: "",
        description: ""
    });

    useEffect(() => {
        const fetchSeoDelivery = async () => {
            try {
                const encodedUrl = encodeURIComponent(pageUrl);
                const baseUrl = import.meta.env.VITE_API_BASE_URL;

                // Requirement 1 - SEO Delivery API
                const res = await axios.get(`${baseUrl}/api/seo/delivery?url=${encodedUrl}`, { timeout: 8000 });

                if (res.data?.success && res.data.data) {
                    const d = res.data.data;

                    setSeoData({
                        meta: d.meta_tags || null,
                        og: d.open_graph || null,
                        structuredData: d.structured_data || [],
                        seoId: d.seo_record_id,
                        title: d.meta_tags?.title || "",
                        description: d.meta_tags?.description || ""
                    });

                    // Requirement 4 - SEO Injection Event (dataLayer push)
                    window.dataLayer = window.dataLayer || [];
                    window.dataLayer.push({
                        event: "seo_meta_applied",
                        page_url: pageUrl,
                        seo_id: d.seo_record_id,
                        has_meta: !!d.meta_tags,
                        has_og: !!d.open_graph,
                        has_structured_data: d.structured_data && d.structured_data.length > 0,
                        structured_data_types: (d.structured_data || []).map(sd => sd['@type'] || 'unknown'),
                        meta_title_length: (d.meta_tags?.title || "").length,
                        meta_description_length: (d.meta_tags?.description || "").length
                    });
                }
            } catch (err) {
                if (err.response?.status !== 404) {
                    console.error('Error fetching SEO delivery data:', err.message);
                }
                setSeoData({ meta: null, og: null, structuredData: [], seoId: null, title: "", description: "" });
            }
        };

        if (pageUrl) fetchSeoDelivery();
    }, [pageUrl]);

    return (
        <>
            <MetaTagLoader
                pageUrl={pageUrl}
                initialData={seoData.meta}
                seoId={seoData.seoId}
            />
            <OpenGraphLoader
                pageUrl={pageUrl}
                initialData={seoData.og}
            />
            {seoData.structuredData.map((sd, index) => (
                <StructuredDataLoader
                    key={`${seoData.seoId}-${index}`}
                    pageUrl={pageUrl}
                    type={sd['@type'] || 'Generic'}
                    initialData={sd}
                    seoId={seoData.seoId}
                />
            ))}
        </>
    );
};

export default SeoLoader;
