import { CATEGORIES, getCategory } from "./categories";
import { hexToRgba } from "./colors";
import { initials, slugify } from "./format";
import type { CategoryName, DecoratedCategory, Post, PostBody, PostSeed } from "./types";

/**
 * Corpo de artigo gerado a partir do excerto + categoria. Conteúdo mockado —
 * ver README do handoff (`design_handoff_blog_geek/`) e o item "Content" do
 * projeto: em produção este builder seria substituído por leitura de
 * CMS/API ou parsing de Markdown/MDX, mantendo o mesmo formato de `PostBody`.
 */
function buildBody(title: string, category: CategoryName, excerpt: string): PostBody {
  return {
    intro: `${excerpt} Neste artigo, mergulhamos fundo no tema com o olhar de quem vive entre código e cultura pop — analisando não apenas o que aparece na tela, mas a engenharia, as decisões criativas e o contexto que tornaram tudo isso possível.`,
    context:
      "Nos últimos anos, a fronteira entre tecnologia e entretenimento praticamente desapareceu: pipelines de renderização viraram assunto de fã, decisões de roteiro são debatidas como arquitetura de software, e cada lançamento é dissecado em tempo real por comunidades inteiras. É nesse cruzamento que este texto se apoia.",
    quote:
      "Toda grande obra geek é, no fundo, um sistema bem projetado — com regras, trade-offs e uma visão que amarra tudo.",
    quoteBy: "Redação ARS Geek",
    sectionTitle: "Por dentro da máquina",
    sectionBody:
      "Quando olhamos os bastidores, o padrão se repete: equipes pequenas e obsessivas, ferramentas construídas sob medida e uma disposição rara para jogar fora o que não funciona. O resultado que chega até nós é a ponta visível de milhares de iterações — e é isso que separa o memorável do esquecível.",
    codeFile: "universo.ts",
    codeSnippet:
      'type Universo = "Filmes" | "Star Wars" | "Marvel"\n  | "DC" | "Animes" | "Games";\n\nfunction explorar(u: Universo) {\n  return `Analisando ${u} com olhar de engenheiro…`;\n}',
    highlight:
      "O ponto-chave: tecnologia e narrativa não competem — as melhores obras da cultura pop usam uma para amplificar a outra.",
    closing:
      `No fim, o que fica é a certeza de que "${title}" merece ser olhado com mais atenção. Estas obras não são só entretenimento: são estudos de caso de design, engenharia e criatividade operando no limite. É por isso que este blog existe — para traduzir esse fascínio em análise.`,
    tags: [slugify(category), "analise", "bastidores", "cultura-pop"],
  };
}

const SEEDS: Array<Omit<PostSeed, "slug" | "body">> = [
  {
    title: "StageCraft: como The Mandalorian filma galáxias dentro de um estúdio",
    category: "Star Wars",
    excerpt:
      "O LED volume da ILM substituiu o chroma key e mudou para sempre a produção virtual. Entenda a tecnologia por trás do The Volume.",
    author: "Rafael Souza",
    date: "2026-07-10",
    readMinutes: 8,
  },
  {
    title: "Path tracing chegou aos consoles: o que muda de verdade",
    category: "Games",
    excerpt:
      "Da iluminação global ao reflexo em tempo real — o salto técnico que separa esta geração da anterior.",
    author: "Ana Lima",
    date: "2026-07-08",
    readMinutes: 6,
  },
  {
    title: "Frieren e o ritmo lento como escolha de design narrativo",
    category: "Animes",
    excerpt:
      "Por que uma jornada sem pressa se tornou o anime mais bem avaliado da década.",
    author: "Diego Martins",
    date: "2026-07-05",
    readMinutes: 7,
  },
  {
    title: "O multiverso da Marvel explicado em grafos",
    category: "Marvel",
    excerpt:
      "Mapeamos as linhas do tempo do MCU como um grafo dirigido. O resultado explica muita coisa.",
    author: "Ana Lima",
    date: "2026-07-02",
    readMinutes: 9,
  },
  {
    title: "Superman de James Gunn: o reboot que o DCU precisava?",
    category: "DC",
    excerpt:
      "Um ano depois, o balanço do novo universo DC — o que funcionou e o que ainda deve.",
    author: "Rafael Souza",
    date: "2026-06-28",
    readMinutes: 6,
  },
  {
    title: "Duna e o som do deserto: a engenharia por trás do Oscar",
    category: "Filmes",
    excerpt:
      "Como a equipe de som transformou vento, areia e silêncio em personagem.",
    author: "Diego Martins",
    date: "2026-06-24",
    readMinutes: 7,
  },
  {
    title: "Hollow Knight: Silksong — anatomia de uma espera",
    category: "Games",
    excerpt:
      "O que a década de desenvolvimento de Silksong ensina sobre escopo, hype e artesanato.",
    author: "Rafael Souza",
    date: "2026-06-20",
    readMinutes: 5,
  },
  {
    title: "A linha do tempo de Star Wars sem dor de cabeça",
    category: "Star Wars",
    excerpt:
      "BBY, ABY, High Republic — um guia definitivo para navegar a cronologia da galáxia.",
    author: "Ana Lima",
    date: "2026-06-16",
    readMinutes: 10,
  },
  {
    title: "Por que o CGI em anime divide tanto os fãs",
    category: "Animes",
    excerpt: "Do uncanny valley ao cel-shading: a técnica por trás da polêmica.",
    author: "Diego Martins",
    date: "2026-06-12",
    readMinutes: 6,
  },
  {
    title: "X-Men no MCU: o que os quadrinhos sugerem",
    category: "Marvel",
    excerpt:
      "As sagas que provavelmente vão inspirar a chegada dos mutantes ao universo cinematográfico.",
    author: "Rafael Souza",
    date: "2026-06-08",
    readMinutes: 8,
  },
  {
    title: "IMAX, 70mm e o renascimento do cinema em película",
    category: "Filmes",
    excerpt:
      "Por que os maiores diretores estão voltando ao analógico — e por que isso importa.",
    author: "Ana Lima",
    date: "2026-06-04",
    readMinutes: 7,
  },
  {
    title: "Batman e a arquitetura gótica de Gotham nos filmes",
    category: "DC",
    excerpt: "De Burton a Reeves: como cada Gotham reflete o Batman do seu tempo.",
    author: "Diego Martins",
    date: "2026-06-01",
    readMinutes: 9,
  },
];

function decorate(seed: Omit<PostSeed, "slug" | "body">, index: number): Post {
  const category = getCategory(seed.category);
  const slug = slugify(seed.title);
  const body = buildBody(seed.title, seed.category, seed.excerpt);
  return {
    ...seed,
    slug,
    body,
    code: `${category.code}${String(index + 1).padStart(3, "0")}`,
    color: category.color,
    colorDim: hexToRgba(category.color, 0.4),
    tint: hexToRgba(category.color, 0.1),
    tintDeep: hexToRgba(category.color, 0.28),
    initials: initials(seed.author),
  };
}

export const POSTS: Post[] = SEEDS.map(decorate);

export function getAllPosts(): Post[] {
  return POSTS;
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByCategory(category: CategoryName): Post[] {
  return POSTS.filter((p) => p.category === category);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const sameCategory = POSTS.filter((p) => p.slug !== post.slug && p.category === post.category);
  const others = POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getCategoriesWithCounts(): DecoratedCategory[] {
  return CATEGORIES.map((category) => ({
    ...category,
    count: POSTS.filter((p) => p.category === category.name).length,
    colorDim: hexToRgba(category.color, 0.4),
    tint: hexToRgba(category.color, 0.1),
  }));
}
