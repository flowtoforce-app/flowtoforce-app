const iconInstagram = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" stroke="white" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="white" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="white"/></svg>`

const iconTiktok = `<svg width="18" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.03a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/></svg>`

const dumbbellSvg = `<svg width="110" height="52" viewBox="0 0 110 52" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="wL" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#e8e8e8"/>
      <stop offset="45%" stop-color="#a0a0a0"/>
      <stop offset="100%" stop-color="#606060"/>
    </radialGradient>
    <radialGradient id="wR" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="#e8e8e8"/>
      <stop offset="45%" stop-color="#a0a0a0"/>
      <stop offset="100%" stop-color="#606060"/>
    </radialGradient>
    <linearGradient id="bar" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#c8c8c8"/>
      <stop offset="50%" stop-color="#888"/>
      <stop offset="100%" stop-color="#aaa"/>
    </linearGradient>
    <filter id="sh">
      <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(0,0,0,0.35)"/>
    </filter>
  </defs>
  <g filter="url(#sh)">
    <ellipse cx="18" cy="26" rx="16" ry="20" fill="url(#wL)"/>
    <rect x="34" y="22" width="42" height="8" rx="3" fill="url(#bar)"/>
    <ellipse cx="92" cy="26" rx="16" ry="20" fill="url(#wR)"/>
  </g>
  <ellipse cx="18" cy="22" rx="7" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-15,18,22)"/>
  <ellipse cx="92" cy="22" rx="7" ry="5" fill="rgba(255,255,255,0.22)" transform="rotate(-15,92,22)"/>
</svg>`

export function emailTemplate({ bodyHtml, ctaLabel, ctaUrl }) {
  const cta = ctaLabel && ctaUrl ? `
        <tr>
          <td align="center" style="padding:8px 28px 40px;">
            <a href="${ctaUrl}" style="display:inline-block;background:transparent;color:#ffffff;padding:14px 48px;border-radius:50px;border:1px solid rgba(255,255,255,0.55);font-family:Georgia,serif;font-size:10px;letter-spacing:3px;text-decoration:none;text-transform:uppercase;">${ctaLabel}</a>
          </td>
        </tr>` : ''

  const dumbbell = `
        <tr>
          <td align="center" style="padding:28px 0 20px;">
            ${dumbbellSvg}
          </td>
        </tr>`

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>FlowToForce</title>
</head>
<body style="margin:0;padding:0;background-color:#2E70A0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:radial-gradient(ellipse at 15% 8%,rgba(255,255,255,0.18) 0%,transparent 40%),radial-gradient(ellipse at 85% 88%,rgba(255,255,255,0.12) 0%,transparent 40%),radial-gradient(ellipse at 55% 45%,rgba(80,140,190,0.20) 0%,transparent 50%),radial-gradient(ellipse at 30% 70%,rgba(120,90,130,0.18) 0%,transparent 45%),linear-gradient(145deg,#1E5A88 0%,#2E70A0 18%,#3A80B0 36%,#507090 54%,#6B5870 74%,#7A6070 100%);min-height:100vh;">
  <tr>
    <td align="center" style="padding:40px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- LOGO : flow gauche / trait centre / force droite -->
        <tr>
          <td style="padding:52px 32px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:left;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:58px;color:#ffffff;font-weight:300;letter-spacing:2px;line-height:1;">flow</span>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding:10px 0 10px;">
                  <div style="width:52px;height:1px;background:rgba(255,255,255,0.6);"></div>
                </td>
              </tr>
              <tr>
                <td style="text-align:right;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:58px;color:#ffffff;font-weight:300;letter-spacing:2px;line-height:1;">force</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:0 28px 32px;color:rgba(255,255,255,0.92);font-family:Georgia,serif;font-size:15px;line-height:1.9;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- CTA -->
        ${cta}

        <!-- DIVIDER -->
        <tr>
          <td style="padding:0 28px 28px;">
            <div style="height:1px;background:rgba(255,255,255,0.2);"></div>
          </td>
        </tr>

        <!-- SOCIAL ICONS -->
        <tr>
          <td align="center" style="padding:12px 24px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" valign="middle" style="width:50px;height:50px;background:transparent;border:1px solid rgba(255,255,255,0.5);border-radius:14px;">
                  <a href="https://www.instagram.com/flowtoforce" style="display:block;padding:14px;text-decoration:none;">${iconInstagram}</a>
                </td>
                <td style="width:14px;"></td>
                <td align="center" valign="middle" style="width:50px;height:50px;background:transparent;border:1px solid rgba(255,255,255,0.5);border-radius:14px;">
                  <a href="https://www.tiktok.com/@flowtoforce" style="display:block;padding:15px 16px;text-decoration:none;">${iconTiktok}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding:0 24px 44px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:1px;"><a href="https://flowtoforce.com" style="color:rgba(255,255,255,0.4);text-decoration:none;">flowtoforce.com</a> &nbsp;·&nbsp; hello@flowtoforce.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
