(function() {
    const currentPath = window.location.pathname;
    const normalizePath = (p) => p.replace(/\/$/, "") || "/";
    const targetPath = normalizePath(currentPath);

    async function loadSEO() {
        try {
            const fetchJson = (f) => fetch(`/seo/${f}`).then(r => r.ok ? r.json() : null).catch(() => null);
            const [metaData, ogData, sdData] = await Promise.all([
                fetchJson('meta-tags.json'),
                fetchJson('og-tags.json'),
                fetchJson('structured-data.json')
            ]);

            // 1. Meta Tags
            const meta = metaData?.find(m => normalizePath(new URL(m.url, window.location.origin).pathname) === targetPath);
            if (meta) {
                document.title = meta.title;
                setMeta('description', meta.description);
                setMeta('keywords', Array.isArray(meta.keywords) ? meta.keywords.join(', ') : meta.keywords);
                pushEvent(meta.id, 'meta');
            }

            // 2. OpenGraph
            const og = ogData?.find(o => normalizePath(new URL(o.url, window.location.origin).pathname) === targetPath);
            if (og) {
                setMeta('og:title', og.title, 'property');
                setMeta('og:description', og.description, 'property');
                if (og.image) setMeta('og:image', og.image, 'property');
                setMeta('og:type', og.type || 'website', 'property');
                pushEvent(og.id, 'og');
            }

            // 3. Structured Data
            const sds = sdData?.filter(s => normalizePath(new URL(s.url, window.location.origin).pathname) === targetPath);
            sds?.forEach(sd => {
                const script = document.createElement('script');
                script.type = 'application/ld+json';
                script.text = JSON.stringify(sd.jsonLD);
                document.head.appendChild(script);
                pushEvent(sd.id, 'structured_data');
            });
        } catch (e) {
            console.error('Datum SEO Loader Error:', e);
        }
    }

    function pushEvent(id, type) {
        if (!id) return;
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'seo_meta_applied',
            seo_id: id,
            seo_type: type,
            page_url: window.location.href
        });
    }

    function setMeta(name, content, attr = 'name') {
        if (!content) return;
        let el = document.querySelector(`meta[${attr}="${name}"]`);
        if (!el) {
            el = document.createElement('meta');
            el.setAttribute(attr, name);
            document.head.appendChild(el);
        }
        el.content = content;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadSEO);
    } else {
        loadSEO();
    }
})();