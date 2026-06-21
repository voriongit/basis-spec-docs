import React from 'react';
import {Redirect} from '@docusaurus/router';
import BrowserOnly from '@docusaurus/BrowserOnly';
import Head from '@docusaurus/Head';

// The rendered "BASIS 0.9 specification" is shipped as a faithful standalone
// design at /design/spec.html (static/design/spec.html), preserving its own
// CSS, inline <style>, <script> (active-TOC tracking), and markup verbatim.
// This route exposes it at /spec and hands off there. (Lives under /design/
// so it doesn't collide with this /spec route once Vercel cleanUrls strips
// .html extensions.)
export default function SpecPage() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/design/spec.html" />
        <title>BASIS — the specification — v0.9</title>
      </Head>
      <BrowserOnly>
        {() => {
          window.location.replace('/design/spec.html');
          return null;
        }}
      </BrowserOnly>
      <noscript>
        <Redirect to="/design/spec.html" />
      </noscript>
    </>
  );
}
