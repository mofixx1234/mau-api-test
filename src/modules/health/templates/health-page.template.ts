type HealthPageData = {
  status: string;
  uptime: number;
  timestamp: string;
  service: string;
  environment: string;
};

const formatUptime = (uptime: number): string => {
  const seconds = Math.floor(uptime % 60);
  const minutes = Math.floor((uptime / 60) % 60);
  const hours = Math.floor(uptime / 3600);

  return `${hours}h ${minutes}m ${seconds}s`;
};

export const renderHealthPage = (data: HealthPageData): string => {
  const checkedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'medium',
  }).format(new Date(data.timestamp));

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${data.service} | Health</title>
    <style>
      :root {
        color-scheme: light dark;
        --bg: #f6f7f3;
        --surface: #ffffff;
        --text: #18211f;
        --muted: #5d6a66;
        --line: #dce3dd;
        --accent: #047857;
        --accent-soft: #dff7ec;
        --shadow: 0 24px 70px rgba(24, 33, 31, 0.14);
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px;
        background:
          linear-gradient(135deg, rgba(4, 120, 87, 0.12), transparent 34%),
          linear-gradient(315deg, rgba(14, 116, 144, 0.14), transparent 30%),
          var(--bg);
        color: var(--text);
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      main {
        width: min(920px, 100%);
        display: grid;
        gap: 18px;
      }

      .hero {
        padding: 30px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.86);
        box-shadow: var(--shadow);
      }

      .topline {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 34px;
      }

      .service {
        color: var(--muted);
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 0;
        text-transform: uppercase;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        min-height: 34px;
        padding: 7px 12px;
        border-radius: 999px;
        color: #065f46;
        background: var(--accent-soft);
        font-size: 14px;
        font-weight: 700;
      }

      .dot {
        width: 9px;
        height: 9px;
        border-radius: 50%;
        background: var(--accent);
        box-shadow: 0 0 0 6px rgba(4, 120, 87, 0.14);
      }

      h1 {
        margin: 0;
        max-width: 720px;
        font-size: 64px;
        line-height: 0.98;
        letter-spacing: 0;
      }

      .subtitle {
        max-width: 640px;
        margin: 18px 0 0;
        color: var(--muted);
        font-size: 18px;
        line-height: 1.65;
        overflow-wrap: anywhere;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }

      .metric {
        min-height: 132px;
        padding: 20px;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }

      .label {
        margin: 0 0 14px;
        color: var(--muted);
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .value {
        margin: 0;
        font-size: 22px;
        font-weight: 800;
        overflow-wrap: anywhere;
      }

      .footer {
        display: flex;
        justify-content: space-between;
        gap: 16px;
        color: var(--muted);
        font-size: 14px;
      }

      .footer code {
        color: var(--text);
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      }

      @media (max-width: 720px) {
        body {
          padding: 18px;
          align-items: flex-start;
        }

        .hero {
          padding: 22px;
        }

        .topline,
        .footer {
          align-items: flex-start;
          flex-direction: column;
        }

        .grid {
          grid-template-columns: 1fr;
        }

        h1 {
          font-size: 42px;
        }
      }

      @media (max-width: 420px) {
        h1 {
          font-size: 38px;
        }

        .value {
          font-size: 21px;
        }
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: #101816;
          --surface: #15211e;
          --text: #eff7f3;
          --muted: #a8b8b2;
          --line: #2b3d37;
          --accent-soft: #123d31;
          --shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
        }

        .hero {
          background: rgba(21, 33, 30, 0.88);
        }

        .badge {
          color: #86efac;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <section class="hero" aria-labelledby="page-title">
        <div class="topline">
          <span class="service">${data.service}</span>
          <span class="badge"><span class="dot" aria-hidden="true"></span>${data.status.toUpperCase()}</span>
        </div>
        <h1 id="page-title">L'API est operationnelle.</h1>
        <p class="subtitle">Cette page confirme que le service Express TypeScript repond correctement, avec un controle rapide du runtime et de l'environnement.</p>
      </section>

      <section class="grid" aria-label="Etat du service">
        <article class="metric">
          <p class="label">Uptime</p>
          <p class="value">${formatUptime(data.uptime)}</p>
        </article>
        <article class="metric">
          <p class="label">Environnement</p>
          <p class="value">${data.environment}</p>
        </article>
        <article class="metric">
          <p class="label">Dernier check</p>
          <p class="value">${checkedAt}</p>
        </article>
      </section>

      <div class="footer">
        <span>Endpoint JSON disponible sur <code>/api/health/status</code></span>
        <span>Architecture module/controller/service inspiree de NestJS</span>
      </div>
    </main>
  </body>
</html>`;
};
