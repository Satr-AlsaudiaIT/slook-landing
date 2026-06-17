import Script from 'next/script'

/**
 * Microsoft Clarity — free session replays, heatmaps, and click/scroll analytics.
 *
 * Setup:
 *   1. Create a project at https://clarity.microsoft.com
 *   2. Copy your Project ID (Settings → Setup → Project ID)
 *   3. Add to .env.local:
 *        NEXT_PUBLIC_CLARITY_PROJECT_ID=xxxxxxxxxx
 *
 * When the env var is unset, this component renders nothing — so local dev
 * doesn't get tracked unless you explicitly opt in.
 *
 * The NEXT_PUBLIC_ prefix is required because the variable is consumed in
 * client-side JS, not just at build time on the server.
 */
export default function ClarityScript() {
  const projectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
  if (!projectId) return null

  // Clarity's official init snippet, wrapped in next/script for proper
  // hydration order and CSP-friendly inline-script handling.
  return (
    <Script
      id="ms-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${projectId}");`,
      }}
    />
  )
}
