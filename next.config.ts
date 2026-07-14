import type { NextConfig } from "next";

// Em GitHub Pages há dois cenários de hospedagem:
//   1. Domínio customizado (geek.arstechcompany.com.br) — site servido na
//      raiz; NEXT_PUBLIC_BASE_PATH deve ficar vazio (padrão).
//   2. Project page (arstech-company.github.io/arstechcompany-geek) — site
//      servido em subpasta; defina NEXT_PUBLIC_BASE_PATH=/arstechcompany-geek
//      para que CSS, JS e imagens resolvam no caminho correto.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
