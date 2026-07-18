type EmailDetail = {
  label: string;
  value?: string | null;
};

type EmailAction = {
  label: string;
  href: string;
};

type EmailTemplateInput = {
  eyebrow?: string;
  title: string;
  intro?: string;
  body?: string[];
  details?: EmailDetail[];
  action?: EmailAction;
  secondaryAction?: EmailAction;
  note?: string;
  footerNote?: string;
};

export type RenderedEmail = {
  html: string;
  text: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function textFromHtml(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function paragraph(value: string) {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function detailRows(details: EmailDetail[] = []) {
  return details
    .filter((item) => item.value?.trim())
    .map(
      (item) => `
        <tr>
          <td style="padding:12px 14px;border-bottom:1px solid #e5eefb;">
            <div style="font-size:12px;line-height:18px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#64748b;">${escapeHtml(item.label)}</div>
            <div style="margin-top:4px;font-size:15px;line-height:23px;font-weight:600;color:#0f172a;">${paragraph(item.value || "")}</div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function actionButton(action: EmailAction) {
  return `
    <table role="presentation" cellspacing="0" cellpadding="0" style="margin:24px 0 0;">
      <tr>
        <td style="border-radius:14px;background:#0f4fb5;background-image:linear-gradient(135deg,#0f3f9d,#1ba9dd);box-shadow:0 14px 30px rgba(15,79,181,.18);">
          <a href="${escapeHtml(action.href)}" style="display:inline-block;padding:14px 20px;font-size:15px;line-height:20px;font-weight:800;color:#ffffff;text-decoration:none;border-radius:14px;">${escapeHtml(action.label)}</a>
        </td>
      </tr>
    </table>
  `;
}

export function renderKasaEmail(input: EmailTemplateInput): RenderedEmail {
  const detailsHtml = detailRows(input.details);
  const bodyHtml = (input.body || [])
    .filter(Boolean)
    .map(
      (item) =>
        `<p style="margin:16px 0 0;font-size:15px;line-height:25px;color:#475569;">${paragraph(item)}</p>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>${escapeHtml(input.title)}</title>
  </head>
  <body style="margin:0;padding:0;background:#edf7ff;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(input.intro || input.title)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#edf7ff;margin:0;padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #dbeafe;border-radius:28px;overflow:hidden;box-shadow:0 24px 70px rgba(15,79,181,.12);">
            <tr>
              <td style="padding:0;background:#0f4fb5;background-image:linear-gradient(135deg,#0f3f9d,#1aa9dc);height:7px;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:30px 30px 24px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  <tr>
                    <td>
                      <div style="font-size:30px;line-height:34px;font-weight:900;letter-spacing:-.03em;color:#0f3f9d;">KASA</div>
                      <div style="margin-top:3px;font-size:12px;line-height:18px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#64748b;">LMS workspace</div>
                    </td>
                    <td align="right" style="vertical-align:top;">
                      <span style="display:inline-block;border:1px solid #bfdbfe;background:#eff6ff;border-radius:999px;padding:8px 12px;font-size:12px;line-height:16px;font-weight:800;color:#0f4fb5;">${escapeHtml(input.eyebrow || "KASA update")}</span>
                    </td>
                  </tr>
                </table>

                <h1 style="margin:28px 0 0;font-size:30px;line-height:38px;font-weight:900;letter-spacing:-.035em;color:#020617;">${escapeHtml(input.title)}</h1>
                ${
                  input.intro
                    ? `<p style="margin:14px 0 0;font-size:16px;line-height:26px;color:#475569;">${paragraph(input.intro)}</p>`
                    : ""
                }
                ${bodyHtml}
                ${input.action ? actionButton(input.action) : ""}
                ${
                  input.secondaryAction
                    ? `<p style="margin:14px 0 0;font-size:14px;line-height:22px;color:#64748b;">Or open this link: <a href="${escapeHtml(input.secondaryAction.href)}" style="color:#0f4fb5;font-weight:700;text-decoration:underline;">${escapeHtml(input.secondaryAction.label)}</a></p>`
                    : ""
                }
              </td>
            </tr>
            ${
              detailsHtml
                ? `<tr>
                    <td style="padding:0 30px 26px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #dbeafe;border-radius:18px;overflow:hidden;background:#f8fbff;">
                        ${detailsHtml}
                      </table>
                    </td>
                  </tr>`
                : ""
            }
            ${
              input.note
                ? `<tr>
                    <td style="padding:0 30px 28px;">
                      <div style="border:1px solid #bbf7d0;background:#f0fdf4;border-radius:18px;padding:16px 18px;font-size:14px;line-height:23px;color:#166534;">${paragraph(input.note)}</div>
                    </td>
                  </tr>`
                : ""
            }
            <tr>
              <td style="padding:22px 30px;background:#f8fbff;border-top:1px solid #e5eefb;">
                <p style="margin:0;font-size:13px;line-height:21px;color:#64748b;">
                  ${escapeHtml(input.footerNote || "KASA sends this email for enquiries, demos, and workspace communication.")}
                </p>
                <p style="margin:10px 0 0;font-size:13px;line-height:21px;color:#64748b;">
                  Team KASA · <a href="https://www.getkasa.in" style="color:#0f4fb5;font-weight:700;text-decoration:none;">getkasa.in</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    input.eyebrow,
    input.title,
    input.intro,
    ...(input.body || []),
    input.action ? `${input.action.label}: ${input.action.href}` : "",
    ...(input.details || [])
      .filter((item) => item.value?.trim())
      .map((item) => `${item.label}: ${item.value}`),
    input.note,
    input.footerNote || "Team KASA",
  ]
    .filter(Boolean)
    .map((item) => textFromHtml(String(item)))
    .join("\n\n");

  return { html, text };
}

export function renderLeadNotificationEmail(input: {
  leadType: string;
  name: string;
  email: string;
  phone?: string | null;
  institute?: string | null;
  message: string;
  source: string;
  ctaLabel?: string | null;
  pageUrl?: string | null;
  demoUrl?: string | null;
}) {
  return renderKasaEmail({
    eyebrow: "New lead",
    title: `New ${input.leadType} enquiry from ${input.name}`,
    intro: "A new KASA enquiry has been captured from the website. Review the details and follow up while the context is fresh.",
    details: [
      { label: "Name", value: input.name },
      { label: "Email", value: input.email },
      { label: "Phone", value: input.phone },
      { label: "Institute", value: input.institute },
      { label: "Message", value: input.message },
      { label: "Source", value: input.source },
      { label: "CTA", value: input.ctaLabel },
      { label: "Page", value: input.pageUrl },
      { label: "Demo URL", value: input.demoUrl },
    ],
    action: input.demoUrl ? { label: "Open demo workspace", href: input.demoUrl } : undefined,
    secondaryAction: input.pageUrl ? { label: "View source page", href: input.pageUrl } : undefined,
    note: "This lead has also been saved in the KASA admin panel.",
    footerNote: "Internal KASA lead notification.",
  });
}

export function renderLeadConfirmationEmail(input: {
  name: string;
  leadType: string;
  demoUrl?: string | null;
  demoExpiresAt?: string | null;
}) {
  const isDemo = Boolean(input.demoUrl);

  return renderKasaEmail({
    eyebrow: isDemo ? "Demo request received" : "Enquiry received",
    title: `Thanks, ${input.name}`,
    intro: isDemo
      ? "Your KASA demo request is ready. You can open the demo workspace and explore the admin, course, and learner experience."
      : "We received your KASA enquiry. Our team will review your details and get back to you shortly.",
    body: isDemo
      ? [
          "Use the demo to check how KASA can support courses, payments, learner access, live class workflows, and admin operations.",
          input.demoExpiresAt ? `Demo access expiry: ${input.demoExpiresAt}` : "",
        ].filter(Boolean)
      : [
          "If you shared a requirement, we will use that context to suggest the right KASA setup for your institute, training business, or online academy.",
        ],
    action: input.demoUrl ? { label: "Open KASA demo", href: input.demoUrl } : undefined,
    details: input.demoUrl ? [{ label: "Demo URL", value: input.demoUrl }] : [],
    note: "You do not need to submit the form again. We have saved your request.",
    footerNote: "You are receiving this because you submitted a KASA website form.",
  });
}
