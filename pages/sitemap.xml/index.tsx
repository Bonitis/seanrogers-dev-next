import { GetServerSideProps } from 'next';

const Sitemap = () => {
    return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
        xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">


<url>
    <loc>https://seanrogers.dev/</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>1.00</priority>
</url>
<url>
    <loc>https://seanrogers.dev/hello-founders</loc>
    <lastmod>2023-02-23T00:00:00+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/smpl</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/ekos-order-hub</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/ekos-boost</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/takeshape</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/push-the-pace</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>
<url>
    <loc>https://seanrogers.dev/projects/the-wed-clique</loc>
    <lastmod>2022-02-06T16:52:08+00:00</lastmod>
    <priority>0.80</priority>
</url>


</urlset>
    `;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;
