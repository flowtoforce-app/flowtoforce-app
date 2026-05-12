export function emailTemplate({ bodyHtml, ctaLabel, ctaUrl }) {
  const cta = ctaLabel && ctaUrl ? `
        <tr>
          <td align="center" style="padding:8px 24px 40px;">
            <a href="${ctaUrl}" style="display:inline-block;background:#4a8fd4;color:#ffffff;padding:15px 44px;border-radius:50px;font-family:Georgia,serif;font-size:11px;letter-spacing:3px;text-decoration:none;text-transform:uppercase;">${ctaLabel}</a>
          </td>
        </tr>` : ''

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>FlowToForce</title>
</head>
<body style="margin:0;padding:0;background-color:#060d1f;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#060d1f;">
  <tr>
    <td align="center" style="padding:40px 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">

        <!-- LOGO -->
        <tr>
          <td align="center" style="padding:40px 0 28px;">
            <span style="font-family:Georgia,serif;font-size:13px;letter-spacing:6px;color:rgba(255,255,255,0.85);font-weight:300;">flow</span>
            <span style="display:inline-block;width:30px;height:1px;background:rgba(255,255,255,0.3);vertical-align:middle;margin:0 8px;"></span>
            <span style="font-family:Georgia,serif;font-size:13px;letter-spacing:6px;color:rgba(255,255,255,0.85);font-weight:300;">force</span>
          </td>
        </tr>

        <!-- HALTÈRE ICON -->
        <tr>
          <td align="center" style="padding-bottom:36px;">
            <span style="display:inline-block;width:9px;height:22px;background:#4a8fd4;border-radius:50px;vertical-align:middle;"></span>
            <span style="display:inline-block;width:20px;height:5px;background:#4a8fd4;border-radius:50px;vertical-align:middle;margin:0 2px;"></span>
            <span style="display:inline-block;width:9px;height:22px;background:#4a8fd4;border-radius:50px;vertical-align:middle;"></span>
          </td>
        </tr>

        <!-- CONTENT -->
        <tr>
          <td style="padding:0 28px 32px;color:rgba(255,255,255,0.82);font-family:Georgia,serif;font-size:15px;line-height:1.85;">
            ${bodyHtml}
          </td>
        </tr>

        <!-- CTA -->
        ${cta}

        <!-- DIVIDER -->
        <tr>
          <td style="padding:0 28px 28px;">
            <div style="height:1px;background:rgba(255,255,255,0.1);"></div>
          </td>
        </tr>

        <!-- SOCIAL -->
        <tr>
          <td align="center" style="padding:0 24px 32px;">
            <a href="https://www.instagram.com/flowtoforce" style="display:inline-block;padding:10px 24px;border:1px solid rgba(74,143,212,0.55);color:#4a8fd4;border-radius:50px;font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-decoration:none;margin:4px;text-transform:uppercase;">Instagram</a>
            <a href="https://www.tiktok.com/@flowtoforce" style="display:inline-block;padding:10px 24px;border:1px solid rgba(74,143,212,0.55);color:#4a8fd4;border-radius:50px;font-family:Georgia,serif;font-size:11px;letter-spacing:2px;text-decoration:none;margin:4px;text-transform:uppercase;">TikTok</a>
          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td align="center" style="padding:0 24px 40px;">
            <p style="margin:0;font-family:Georgia,serif;font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1px;">flowtoforce.com · hello@flowtoforce.com</p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}
