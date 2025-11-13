import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@fontsource-variable/montserrat';
import '@fontsource-variable/inter';
import Script from "next/script";

export const metadata: Metadata = {
  title: "Tomás Costa Funnels - Embudos de venta para coaches fitness, nutricionistas y psicologos online",
  description: "Embudos de venta para coaches fitness, nutricionistas y psicologos online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/css/styles.css" as="style" />
        <link rel="prerender" href="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/?v=f635ec3a-cc62-4129-9edd-70bb35ebbf23" />
        <link rel="preload" href="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/js/hls.js" as="script" />
        <link rel="preload" href="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br/embed/js/plyr.polyfilled.min.js" as="script" />
        <link rel="preload" href="https://config.tv.pandavideo.com.br/vz-5c2adb98-6a4/f635ec3a-cc62-4129-9edd-70bb35ebbf23.json" as="fetch" />
        <link rel="preload" href="https://config.tv.pandavideo.com.br/vz-5c2adb98-6a4/config.json" as="fetch" />
        <link rel="preload" href="https://b-vz-5c2adb98-6a4.tv.pandavideo.com.br/f635ec3a-cc62-4129-9edd-70bb35ebbf23/playlist.m3u8" as="fetch" />
        <link rel="dns-prefetch" href="https://b-vz-5c2adb98-6a4.tv.pandavideo.com.br" />
        <link rel="dns-prefetch" href="https://player-vz-5c2adb98-6a4.tv.pandavideo.com.br" />
        <link rel="dns-prefetch" href="https://vz-5c2adb98-6a4.b-cdn.net"></link>

        <Script
          id="meta-pixel"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '1143124444651311');
            fbq('track', 'PageView');
          `}
        </Script>
        {/* Meta Pixel NoScript */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1143124444651311&ev=PageView&noscript=1"
          />
        </noscript>

        <link rel="preconnect" href="https://assets.calendly.com" crossOrigin="" />
        <link rel="preconnect" href="https://calendly.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://assets.calendly.com" />
        <link rel="dns-prefetch" href="https://calendly.com" />
      </head>
      <body>
        {children}
        <Script
          id="hotjar"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:6558319,hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        />
      </body>
    </html>
  );
}
