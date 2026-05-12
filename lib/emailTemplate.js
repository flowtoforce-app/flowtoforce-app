const iconInstagram = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="20" height="20" rx="6" stroke="white" stroke-width="1.8"/><circle cx="12" cy="12" r="4.5" stroke="white" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="white"/></svg>`

const iconTiktok = `<svg width="18" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.03a8.16 8.16 0 004.77 1.52V7.12a4.85 4.85 0 01-1-.43z"/></svg>`

const capsule = `display:inline-block;width:30px;height:72px;background:linear-gradient(to right,#e0eefa 0%,#a8cce0 25%,#5a98c0 55%,#2a6090 80%,#1a4870);border-radius:50px;vertical-align:middle;margin:0 8px;box-shadow:inset -6px 0 14px rgba(0,0,0,0.28),inset 5px 0 10px rgba(255,255,255,0.5),0 10px 24px rgba(20,60,120,0.55);`

export function emailTemplate({ bodyHtml, ctaLabel, ctaUrl }) {
  const cta = ctaLabel && ctaUrl ? `
        <tr>
          <td align="center" style="padding:8px 28px 40px;">
            <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(to bottom,#5baae8,#2e80cc);color:#ffffff;padding:16px 52px;border-radius:50px;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-decoration:none;text-transform:uppercase;box-shadow:0 5px 0 #1a5098,0 8px 20px rgba(30,90,160,0.35);">${ctaLabel}</a>
          </td>
        </tr>` : ''

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

        <!-- LOGO : flow / ligne / force — bloc auto-centré -->
        <tr>
          <td align="center" style="padding:48px 0 0;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td style="text-align:left;padding-bottom:8px;white-space:nowrap;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:54px;color:rgba(255,255,255,0.95);font-weight:300;letter-spacing:4px;line-height:1;">flow</span>
                </td>
              </tr>
              <tr>
                <td style="padding-bottom:8px;">
                  <div style="width:72px;height:1px;background:rgba(255,255,255,0.55);"></div>
                </td>
              </tr>
              <tr>
                <td style="text-align:right;white-space:nowrap;">
                  <span style="font-family:Georgia,'Times New Roman',serif;font-size:54px;color:rgba(255,255,255,0.95);font-weight:300;letter-spacing:4px;line-height:1;">force</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- CAPSULES 3D -->
        <tr>
          <td align="center" style="padding:36px 0 32px;">
            <span style="${capsule}"></span>
            <span style="${capsule}"></span>
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

        <!-- SOCIAL ICONS — padding pour centrage exact -->
        <tr>
          <td align="center" style="padding:12px 24px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" valign="middle" style="width:50px;height:50px;background:linear-gradient(135deg,#5aaff0,#2a6bc9);border-radius:14px;box-shadow:0 4px 12px rgba(30,80,160,0.4);">
                  <a href="https://www.instagram.com/flowtoforce" style="display:block;padding:14px;text-decoration:none;">${iconInstagram}</a>
                </td>
                <td style="width:14px;"></td>
                <td align="center" valign="middle" style="width:50px;height:50px;background:linear-gradient(135deg,#5aaff0,#2a6bc9);border-radius:14px;box-shadow:0 4px 12px rgba(30,80,160,0.4);">
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
