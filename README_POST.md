# Guia do Editor — Como publicar e remover artigos no ARS GEEK

> Este documento é para quem vai mexer no **conteúdo** do blog (artigos), não na arquitetura do
> projeto. Se você é estagiário(a) e nunca trabalhou com Next.js/React/TypeScript antes, comece por
> este guia — ele explica cada passo com exemplos reais tirados do próprio projeto.

## 1. Introdução

### Para que serve este documento

O ARS GEEK **não tem CMS, banco de dados nem painel de administração**. Todo o conteúdo dos artigos —
título, texto, imagem, tags, categoria — é código TypeScript, versionado no Git junto com o resto do
projeto. Publicar um artigo novo é, na prática, editar um arquivo e abrir um Pull Request.

Isso é intencional: o site é **100% estático** (não existe servidor rodando em produção, só arquivos
HTML/CSS/JS/imagens hospedados no GitHub Pages). Editar o conteúdo como código garante que tudo passe
pelas mesmas validações de qualidade do resto do projeto: `lint`, `build` e revisão em Pull Request.

### Como os artigos estão organizados

Tudo que envolve artigos vive dentro da pasta `lib/`:

| Arquivo | O que guarda |
|---|---|
| [`lib/posts.ts`](lib/posts.ts) | **O conteúdo em si** — título, resumo, texto, tags, autor, data de cada artigo. É aqui que você vai trabalhar na maior parte do tempo. |
| [`lib/covers.ts`](lib/covers.ts) | Os dados da **imagem de capa** de cada artigo (caminho, texto alternativo, crédito, licença), indexados pelo *slug* do artigo. |
| [`lib/categories.ts`](lib/categories.ts) | A lista fixa de categorias (Filmes, Star Wars, Marvel, DC, Animes, Games, Tecnologia) — cor, código visual e textura de cada uma. |
| [`lib/types.ts`](lib/types.ts) | As "regras" de formato — os `type`/`interface` do TypeScript que definem quais campos um artigo **precisa** ter. |
| [`lib/format.ts`](lib/format.ts) | Funções auxiliares, incluindo a que **gera o slug automaticamente** a partir do título. |
| `public/images/articles/<categoria>/` | As imagens de capa dos artigos, já otimizadas, organizadas por categoria. |
| [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md) | Registro de onde cada imagem veio e sob qual licença — obrigatório manter atualizado. |

O restante do projeto (as páginas em `app/`, os componentes visuais em `components/`) **lê** esses
dados automaticamente. Você normalmente não precisa tocar em nada fora de `lib/` e
`public/images/articles/` para publicar ou remover um artigo.

### Conhecimentos básicos necessários

Você não precisa ser especialista em nada disso, mas ajuda saber o básico:

- **Git**: `pull`, `add`, `commit`, `push`, e como abrir um Pull Request no GitHub.
- **TypeScript/JavaScript**: o suficiente para reconhecer um objeto (`{ chave: "valor" }`) e um array
  (lista entre colchetes `[ ]`). Você vai copiar e adaptar código existente, não escrever do zero.
- **Markdown básico**: para editar o `IMAGE_CREDITS.md`.
- Não precisa saber React nem Next.js a fundo — a estrutura de artigo já existe pronta, você só
  preenche os campos.

### Cuidados antes de alterar conteúdo

- **Nunca edite direto na branch `main`.** Crie uma branch nova para cada artigo (ex.:
  `git checkout -b feat/artigo-nome-do-tema`).
- **Sempre rode `npm run lint` e `npm run build` antes de pedir revisão.** Se o build quebrar, o site
  inteiro para de publicar — não só o seu artigo.
- **Um slug (o endereço do artigo na URL) nunca deve ser reutilizado nem alterado** depois de
  publicado — isso quebra links que já existem por aí. Veja a seção 10.
- Se tiver dúvida sobre remover um artigo que já está no ar, **converse com um responsável do time
  antes** — isso está detalhado na seção 10.

---

## 2. Preparando o ambiente

Abra o terminal na pasta do projeto e rode, em ordem:

```bash
# 1. Entrar na pasta do projeto
cd arstechcompany-geek

# 2. Garantir que está na branch principal e atualizada
git checkout main
git pull

# 3. Criar uma branch para o seu artigo
git checkout -b feat/artigo-nome-do-tema

# 4. Instalar as dependências (só precisa rodar de novo se o package.json mudou)
npm ci

# 5. Rodar o projeto localmente
npm run dev
```

O `npm run dev` sobe o site em modo desenvolvimento — normalmente em `http://localhost:3000`. Deixe
esse terminal aberto: qualquer alteração que você salvar nos arquivos aparece na página automaticamente
(hot reload), sem precisar reiniciar nada.

Os comandos disponíveis estão definidos em [`package.json`](package.json), na chave `"scripts"`:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Não existe comando de testes automatizados (`npm test`) neste projeto — a validação é feita por
`lint` + `build` + conferência manual no navegador (seção 7).

---

## 3. Como adicionar um novo artigo

### Passo a passo

1. **Escolha a categoria.** Precisa ser uma das já existentes em [`lib/categories.ts`](lib/categories.ts):
   `Filmes`, `Star Wars`, `Marvel`, `DC`, `Animes`, `Games` ou `Tecnologia`. Não é possível inventar
   uma categoria nova só editando `posts.ts` — isso exigiria alterar `lib/categories.ts` e
   `lib/types.ts` também, o que está fora do escopo deste guia.

2. **Escreva o título primeiro.** O slug (endereço da URL) é gerado **automaticamente** a partir do
   título — você não escreve o slug manualmente. Veja a seção 4 para as regras.

3. **Abra [`lib/posts.ts`](lib/posts.ts) e use um artigo existente da mesma categoria como modelo.**
   Copie o bloco inteiro de um artigo parecido (do `{` de abertura até o `}` de fechamento, dentro do
   array `SEEDS`) e cole logo abaixo, editando os campos.

4. **Preencha todos os campos obrigatórios** (detalhados abaixo).

5. **Adicione o artigo à lista `ORDER`**, perto do topo do arquivo (linha ~887) — é essa lista que
   define a ordem de exibição na Home e na listagem. Sem esse passo, o artigo existe no array `SEEDS`
   mas **não aparece em lugar nenhum do site** (e o build vai falhar de propósito, veja seção 14).

6. **Adicione a imagem de capa** (seção 5) e registre os dados dela em `lib/covers.ts`.

### Exemplo completo

Digamos que você vai publicar um artigo sobre um jogo novo, na categoria `Games`. Primeiro, adicione o
bloco em `lib/posts.ts`, dentro do array `SEEDS` (pode ficar na seção `// ── GAMES` já existente):

```ts
{
  title: "Elden Ring Nightreign chega em setembro — o que muda no formato roguelike",
  category: "Games",
  date: "2026-07-20", // opcional; se omitir, usa a PUBLISH_DATE padrão do arquivo
  excerpt:
    "A FromSoftware confirma data e detalha o modo cooperativo de três jogadores. Veja o que já foi anunciado oficialmente.",
  tags: ["elden-ring", "fromsoftware", "roguelike", "games"],
  blocks: [
    {
      type: "paragraph",
      text: "Texto do primeiro parágrafo da matéria...",
    },
    { type: "heading", text: "Um subtítulo para organizar o texto" },
    {
      type: "paragraph",
      text: "Mais um parágrafo de desenvolvimento...",
    },
    {
      type: "quote",
      text: "Uma citação ou frase de destaque do próprio texto.",
      by: "Renato Brito, ARS Geek",
    },
    {
      type: "highlight",
      text: "Um dado ou fato que merece destaque visual — vira uma caixa de destaque na página.",
    },
    {
      type: "paragraph",
      text: "Parágrafo de conclusão, fechando a matéria...",
    },
  ],
  sources: [
    { label: "Site oficial da FromSoftware", url: "https://www.fromsoftware.jp/" },
  ],
},
```

Depois, adicione o título exato à lista `ORDER` (mais abaixo no mesmo arquivo):

```ts
const ORDER: string[] = [
  "The Odyssey: o épico de US$ 250 milhões de Nolan chega nesta semana, todo em IMAX",
  // ...artigos existentes...
  "Elden Ring Nightreign chega em setembro — o que muda no formato roguelike", // ← seu artigo novo
];
```

### O que cada campo significa

| Campo | Obrigatório? | O que é | Exemplo |
|---|---|---|---|
| `title` | Sim | Título completo do artigo. Vira o slug automaticamente e aparece no `<h1>` da página. | `"Elden Ring Nightreign chega em setembro..."` |
| `category` | Sim | Uma das categorias existentes, escrita exatamente igual à definida em `lib/categories.ts`. | `"Games"` |
| `date` | Não (tem padrão) | Data de publicação no formato ISO `AAAA-MM-DD`. Se omitir, usa a constante `PUBLISH_DATE` do topo do arquivo. | `"2026-07-20"` |
| `excerpt` | Sim | Resumo de 1–2 frases. Aparece nos cards, na home, e vira a meta description de SEO. | Ver exemplo acima |
| `tags` | Sim | Lista de palavras-chave em minúsculo, com hífen no lugar de espaço. Usadas na busca. | `["elden-ring", "fromsoftware"]` |
| `blocks` | Sim | O corpo do artigo, como uma lista de blocos (veja tipos abaixo). | Ver exemplo acima |
| `sources` | Não | Lista de fontes consultadas na apuração, exibida ao final da página. | Ver exemplo acima |
| `author` | **Não preencha** | É preenchido automaticamente pela função `decorate()` com o valor da constante `AUTHOR` no topo do arquivo — hoje, `"Renato Brito"`. |  |
| `slug` | **Não preencha** | Gerado automaticamente a partir do `title` pela função `slugify()`. Nunca escreva um slug manualmente. |  |

Os tipos de bloco disponíveis, definidos em [`lib/types.ts`](lib/types.ts) (`ArticleBlock`):

- `{ type: "paragraph", text: "..." }` — um parágrafo comum.
- `{ type: "heading", text: "..." }` — um subtítulo (`<h2>`) dentro do artigo.
- `{ type: "quote", text: "...", by: "..." }` — uma citação em destaque, com atribuição.
- `{ type: "highlight", text: "..." }` — uma caixa de destaque visual para um dado importante.
- `{ type: "code", filename: "...", code: "..." }` — um bloco de código, se o artigo precisar.

**Sobre SEO:** você não precisa escrever nada de SEO separadamente. O título vira automaticamente o
`<title>` da página, e o `excerpt` vira a meta description, o Open Graph e o Twitter Card — tudo isso
é gerado em [`app/artigos/[slug]/page.tsx`](app/artigos/[slug]/page.tsx), na função
`generateMetadata`. Basta escrever um bom título e um bom resumo.

---

## 4. Regras para slug

O slug é a parte da URL que identifica o artigo — por exemplo, no endereço
`geek.arstechcompany.com.br/artigos/superman-um-ano-depois-os-us-618-milhoes-que-reergueram-a-dc`,
o slug é `superman-um-ano-depois-os-us-618-milhoes-que-reergueram-a-dc`.

**Você nunca escreve o slug manualmente.** Ele é gerado pela função `slugify()`, em
[`lib/format.ts`](lib/format.ts), a partir do `title`. As regras que essa função aplica são:

1. Remove acentos (`ã` → `a`, `ç` → `c`, `é` → `e`).
2. Converte tudo para letras minúsculas.
3. Troca qualquer caractere que não seja letra ou número por hífen (`-`).
4. Remove hífens duplicados nas pontas.

### Exemplo prático

| Título | Slug gerado |
|---|---|
| `"Superman, um ano depois: os US$ 618 milhões que reergueram a DC"` | `superman-um-ano-depois-os-us-618-milhoes-que-reergueram-a-dc` |
| `"Elden Ring Nightreign chega em setembro — o que muda no formato roguelike"` | `elden-ring-nightreign-chega-em-setembro-o-que-muda-no-formato-roguelike` |

### Como verificar se um slug já existe

Como o slug depende só do título, dois artigos com **títulos muito parecidos** podem gerar o mesmo
slug — e o projeto **quebra o build de propósito** nesse caso (veja seção 14, "slug duplicado"). Antes
de publicar, pesquise se já existe algo parecido:

```bash
grep -i "elden ring" lib/posts.ts
```

Se o comando não retornar nada, o título é livre para uso.

---

## 5. Como adicionar imagens

### Pasta correta

As imagens de capa ficam em `public/images/articles/<categoria-em-slug>/`, uma subpasta por
categoria:

```text
public/images/articles/
├── animes/
├── dc/
├── filmes/
├── games/
├── marvel/
├── star-wars/
└── tecnologia/
```

O nome da subpasta é o `slug` da categoria (o campo `slug` em `lib/categories.ts`), não o nome
visível — por isso é `star-wars/` e não `Star Wars/`.

### Padrão de nome de arquivo

Use um nome descritivo, em minúsculas, com hífen, relacionado ao tema — sem espaços nem acentos.
Exemplos reais já usados no projeto:

```text
public/images/articles/games/gta-vi-arte-oficial.webp
public/images/articles/star-wars/starfighter-xwing-replica.webp
public/images/articles/tecnologia/nvidia-vera-rubin-jensen-huang.webp
```

### Formato e tamanho recomendado

- **Formato:** `.webp` (o projeto usa esse formato em todas as imagens atuais; `.avif` também é aceito
  pelo Next.js se preferir).
- **Tamanho do arquivo:** mantenha abaixo de ~300 KB. As imagens existentes no projeto variam entre
  ~16 KB e ~230 KB.
- **Dimensões:** cerca de 1200px de largura é suficiente para capa de card e de artigo — não precisa
  de resolução maior que essa, o `next.config.ts` usa `images.unoptimized: true` (necessário para
  exportação estática), então não há redimensionamento automático em produção.
- **Origem:** priorize imagens com licença clara para uso editorial (Wikimedia Commons, press kits
  oficiais, materiais promocionais de estúdios/empresas). **Nunca use hotlink** — sempre baixe o
  arquivo e salve dentro da pasta `public/images/articles/`.

### Como referenciar a imagem no artigo

A imagem **não** é referenciada dentro de `lib/posts.ts`. Ela é registrada separadamente em
[`lib/covers.ts`](lib/covers.ts), num objeto `COVERS` indexado pelo **slug do artigo** (o mesmo slug
gerado a partir do título — veja seção 4).

```ts
// lib/covers.ts
export const COVERS: Record<string, PostCover> = {
  // ...outros artigos...

  "elden-ring-nightreign-chega-em-setembro-o-que-muda-no-formato-roguelike": {
    coverImage: "/images/articles/games/elden-ring-nightreign-arte-oficial.webp",
    coverImageAlt: "Arte oficial de Elden Ring Nightreign mostrando os três personagens jogáveis em batalha",
    imageCredit: "FromSoftware / Bandai Namco",
    imageSource: "https://www.eldenring.jp/",
    imageLicense: "Material promocional oficial (uso editorial)",
  },
};
```

**Atenção:** se você esquecer de cadastrar a imagem em `lib/covers.ts`, o build vai falhar com o erro
`Imagem de capa não cadastrada para o artigo: <slug>` — isso é proposital, para nunca publicar um
artigo sem capa (veja seção 14).

### Como criar um bom `alt` (texto alternativo)

O `coverImageAlt` é lido por leitores de tela e usado por buscadores — descreva **o que aparece na
imagem**, de forma objetiva, sem repetir "imagem de" ou "foto de":

- ✅ `"Arte oficial de Elden Ring Nightreign mostrando os três personagens jogáveis em batalha"`
- ❌ `"Imagem do artigo"` (não descreve nada)
- ❌ `"elden-ring-nightreign-arte-oficial.webp"` (não é um texto, é o nome do arquivo)

### Como atualizar o `IMAGE_CREDITS.md`

Sempre que adicionar uma imagem, inclua uma linha na tabela de [`IMAGE_CREDITS.md`](IMAGE_CREDITS.md),
seguindo o padrão já usado:

```markdown
| `games/elden-ring-nightreign-arte-oficial.webp` | Elden Ring Nightreign chega em setembro… | Games | FromSoftware / Bandai Namco | Material promocional oficial (uso editorial) | [eldenring.jp](https://www.eldenring.jp/) |
```

As colunas são: **arquivo** (caminho relativo dentro de `public/images/articles/`), **artigo**
(título resumido), **categoria**, **autor/proprietário**, **licença ou contexto editorial**, e
**origem** (link para a fonte original). Se a imagem vier do Wikimedia Commons, use o formato
`[Commons](url completa da página do arquivo)`.

---

## 6. Como escrever o conteúdo

- **Parágrafos curtos.** Cada bloco `paragraph` deve conter uma ideia por vez — se o parágrafo estiver
  gigante, quebre em dois blocos.
- **Use subtítulos (`heading`)** para organizar artigos com mais de 4–5 parágrafos. Ajuda tanto a
  leitura quanto o SEO.
- **Revise a ortografia e a acentuação** antes de commitar — não há corretor automático no projeto.
- **Confira os fatos.** Datas, números e nomes precisam estar corretos e, quando possível, verificáveis
  em uma fonte — use o campo `sources` para registrar de onde a informação veio.
- **Nunca deixe placeholder no ar.** Não publique com `TODO`, `Lorem ipsum`, `[preencher depois]` ou
  qualquer texto provisório — se o artigo não estiver pronto, não o adicione à lista `ORDER` ainda.
- **Evite conteúdo duplicado.** Não copie parágrafos inteiros de outro artigo do próprio blog nem de
  fontes externas — escreva com voz própria, mesmo baseando-se em fatos de terceiros.
- **Confira os links** em `sources` e nas citações — clique neles antes de publicar para garantir que
  abrem a página correta.

---

## 7. Como testar o novo artigo

Com o `npm run dev` rodando (seção 2), abra `http://localhost:3000` e confira, nesta ordem:

1. **Home** (`/`) — se o seu artigo é um dos 3 primeiros da lista `ORDER`, ele deve aparecer em
   destaque; caso contrário, deve aparecer na seção "Recentes" (os posições 4 a 9 da `ORDER`).
2. **Listagem de artigos** (`/artigos`) — o card do seu artigo deve aparecer na lista completa.
3. **Filtro por categoria** — clique no chip da categoria do seu artigo e confirme que ele aparece
   (e que artigos de outras categorias somem).
4. **Busca** — digite parte do título, do resumo ou de uma tag do seu artigo no campo de busca e
   confirme que ele aparece nos resultados.
5. **Página individual** (`/artigos/<slug-do-seu-artigo>`) — confira título, resumo, autor, data,
   imagem de capa, corpo do texto, tags e (se preenchido) a seção "Fontes consultadas".
6. **Imagem** — confirme que a capa carrega corretamente (sem ícone de imagem quebrada) tanto no card
   quanto na página do artigo.
7. **Artigos relacionados** — role até o fim da página do artigo e confira a seção "Continue
   explorando": ela deve priorizar outros artigos da mesma categoria.
8. **SEO** — no navegador, use "Inspecionar → Elements" e confira, dentro de `<head>`, se
   `<title>`, `<meta name="description">` e as tags `og:*` refletem o título e o resumo do seu artigo.
9. **Rota gerada** — veja a seção 3 do build (abaixo) para confirmar que a rota estática foi criada.
10. **Responsividade** — redimensione a janela do navegador (ou use o modo de dispositivo móvel das
    ferramentas de desenvolvedor) e confira que o card e a página do artigo continuam legíveis em
    telas pequenas.

Depois da conferência manual, rode os comandos reais de validação do projeto:

```bash
npm run lint
npm run build
```

- `npm run lint` verifica erros de código e más práticas (ESLint, configurado em
  [`eslint.config.mjs`](eslint.config.mjs)).
- `npm run build` gera o site estático completo em `out/`. Se o seu artigo tiver algum problema — slug
  duplicado, imagem não cadastrada, campo faltando — **o build vai falhar aqui**, com uma mensagem de
  erro explicando o motivo (veja a seção 14 para os erros mais comuns).

Se o build terminar sem erros, você verá no terminal um resumo das rotas geradas, incluindo a nova:

```text
├ ● /artigos/[slug]
│ ├ /artigos/elden-ring-nightreign-chega-em-setembro-o-que-muda-no-formato-roguelike
│ ├ ...
```

Não existem outros comandos de teste (não há `npm test` configurado neste projeto) — `lint` + `build`
+ a conferência manual acima são a validação completa.

---

## 8. Como adicionar o artigo no Git

Depois que tudo estiver validado:

```bash
# Veja o que foi alterado
git status

# Confira as alterações em detalhe (opcional, mas recomendado)
git diff

# Adicione só os arquivos relacionados ao seu artigo
git add lib/posts.ts lib/covers.ts IMAGE_CREDITS.md public/images/articles/games/elden-ring-nightreign-arte-oficial.webp

# Crie o commit
git commit -m "feat(content): adiciona artigo sobre Elden Ring Nightreign"

# Envie a branch para o repositório remoto
git push -u origin feat/artigo-nome-do-tema
```

Depois do `push`, abra um Pull Request no GitHub pedindo revisão de alguém do time antes de fazer o
merge para `main`.

> Evite `git add .` (adiciona tudo, inclusive arquivos que não têm relação com o seu artigo). Prefira
> listar os arquivos específicos, como no exemplo acima.

---

## 9. Como remover um artigo antigo

Remover um artigo tem mais passos do que parece, porque o conteúdo está espalhado em 3 lugares
diferentes (`lib/posts.ts`, `lib/covers.ts`, `IMAGE_CREDITS.md`) e uma imagem pode, em teoria, ser
reaproveitada — embora, hoje, cada imagem seja exclusiva de um artigo.

1. **Localize o artigo** em `lib/posts.ts` pelo título (use `Ctrl+F`/`grep` no editor).
2. **Anote o slug** — normalmente reconhecível a partir do título (seção 4), ou você pode conferir
   rodando `npm run build` e procurando a rota gerada em `out/artigos/`.
3. **Pesquise todas as referências ao artigo no projeto** antes de mexer em qualquer coisa:

   ```bash
   grep -rn "titulo-do-artigo-em-slug" lib/ app/ IMAGE_CREDITS.md
   ```

   Isso deve te mostrar, no mínimo: a entrada no array `SEEDS`, o título na lista `ORDER`, a entrada
   correspondente em `lib/covers.ts`, e a linha na tabela do `IMAGE_CREDITS.md`.
4. **Remova o bloco do artigo** do array `SEEDS` em `lib/posts.ts` (do `{` de abertura ao `}` de
   fechamento).
5. **Remova o título correspondente** da lista `ORDER`, no mesmo arquivo.
6. **Remova a entrada da imagem** em `lib/covers.ts`.
7. **Verifique se a imagem é usada por outro artigo antes de apagar o arquivo.** Rode:

   ```bash
   grep -rn "nome-do-arquivo-da-imagem" lib/covers.ts
   ```

   Se não houver mais nenhuma referência, aí sim apague o arquivo físico em
   `public/images/articles/<categoria>/`. **Nunca apague a imagem antes de confirmar isso** — pode
   quebrar outro artigo sem você perceber.
8. **Remova a linha correspondente** na tabela do `IMAGE_CREDITS.md` (só se o arquivo de imagem tiver
   sido de fato apagado no passo anterior).
9. **Revise a Home** (`app/page.tsx`) mentalmente: como ela usa `posts[0]`, `posts.slice(1,3)` e
   `posts.slice(3,9)` a partir da lista `ORDER`, remover um artigo do meio da lista **reordena
   automaticamente** quem aparece em destaque — não é preciso editar `app/page.tsx` manualmente, mas
   vale conferir visualmente depois.
10. **Artigos relacionados** também são automáticos — `getRelatedPosts()`, em `lib/posts.ts`, filtra
    dinamicamente a partir da lista atual de posts, então não sobra nenhuma referência pendente ali.
11. **Busca e filtros** (`ArticlesExplorer.tsx`) também são automáticos — funcionam sobre a lista de
    posts que existir no momento, sem cache.
12. **Sitemap** (`app/sitemap.ts`) é gerado dinamicamente a partir de `getAllPosts()` — a URL do
    artigo removido some do `sitemap.xml` automaticamente no próximo build.
13. **Confira o contador de categoria**: a seção "Navegue por universo" na Home mostra quantos artigos
    tem em cada categoria (`getCategoriesWithCounts()`) — esse número também se ajusta sozinho.
14. **Teste o projeto** localmente (`npm run dev`) e confira que a URL antiga do artigo agora retorna
    a página 404 (veja `app/not-found.tsx`).
15. **Rode lint e build**:

    ```bash
    npm run lint
    npm run build
    ```

---

## 10. Cuidados com URLs antigas

Remover um artigo que **já foi publicado** (já está na branch `main`, já passou por um deploy, já está
indexado pelo Google ou já foi compartilhado em redes sociais) tem consequências reais:

- **Links quebrados**: qualquer lugar que linkou para aquela URL (redes sociais, outros sites, o
  próprio footer/relacionados de outros artigos enquanto o artigo existia) vai passar a apontar para
  uma página que não existe mais.
- **Erro 404**: o visitante que clicar num link antigo cai na página de "não encontrado"
  (`app/not-found.tsx`).
- **Perda de SEO**: se o Google já indexou aquela URL, removê-la pode gerar uma penalização temporária
  de posicionamento, além de perder todo o histórico de ranqueamento daquela página.
- **Links externos inválidos**: se algum veículo de imprensa, parceiro ou usuário linkou a matéria a
  partir de outro site, esse link fica quebrado permanentemente.

**Por isso: antes de remover um artigo que já está publicado em produção (não apenas na sua branch
local), converse com um responsável do time.** Muitas vezes a decisão certa não é remover, e sim:

- Corrigir o conteúdo no lugar (editar o artigo existente, mantendo o mesmo slug).
- Marcar o artigo como desatualizado dentro do próprio texto, sem removê-lo.

Hoje o projeto **não tem** nenhuma estratégia de redirecionamento automático (não existe arquivo de
`redirects` nem middleware de redirect — o hospedeiro é o GitHub Pages, que serve arquivos estáticos).
Isso significa que, se um artigo publicado for removido, a URL antiga simplesmente passa a retornar
404, sem redirecionar para lugar nenhum. Se um dia o projeto precisar de redirecionamentos, isso terá
que ser implementado à parte — este guia será atualizado quando isso existir.

> Para artigos que **nunca chegaram a ser publicados** (você criou e removeu tudo na mesma branch,
> antes de abrir o Pull Request), nada disso se aplica — a URL nunca existiu publicamente.

---

## 11. Exemplo de remoção

Suponha que o artigo de exemplo da seção 3 (`Elden Ring Nightreign chega em setembro...`) precisa ser
removido porque saiu uma notícia desmentindo a data anunciada.

**Arquivos alterados:**

1. `lib/posts.ts` — removido o bloco do artigo dentro de `SEEDS` e o título correspondente dentro de
   `ORDER`.
2. `lib/covers.ts` — removida a entrada:
   ```ts
   "elden-ring-nightreign-chega-em-setembro-o-que-muda-no-formato-roguelike": { ... }
   ```
3. `IMAGE_CREDITS.md` — removida a linha da tabela referente a
   `games/elden-ring-nightreign-arte-oficial.webp`.

**Arquivo de imagem removido** (só depois de confirmar que nenhum outro artigo a referencia):

```bash
grep -rn "elden-ring-nightreign-arte-oficial" lib/covers.ts
# (sem resultado → seguro remover)

rm public/images/articles/games/elden-ring-nightreign-arte-oficial.webp
```

**Referências revisadas:** confirmado, via `grep -rn "elden-ring-nightreign"`, que não sobrou nenhuma
menção ao slug em `lib/`, `app/` ou `IMAGE_CREDITS.md`.

**Comandos executados:**

```bash
git checkout -b fix/remove-artigo-elden-ring-nightreign
# ...edições descritas acima...
npm run lint
npm run build
git add lib/posts.ts lib/covers.ts IMAGE_CREDITS.md
git rm public/images/articles/games/elden-ring-nightreign-arte-oficial.webp
git commit -m "fix(content): remove artigo sobre Elden Ring Nightreign (data desmentida)"
git push -u origin fix/remove-artigo-elden-ring-nightreign
```

---

## 12. Checklist para novo artigo

- [ ] Título escrito e slug conferido como único (`grep` no `lib/posts.ts`)
- [ ] Categoria escrita exatamente como em `lib/categories.ts`
- [ ] Todos os campos obrigatórios de `PostSeed` preenchidos (`title`, `category`, `excerpt`, `tags`,
      `blocks`)
- [ ] Artigo adicionado ao array `SEEDS` **e** ao array `ORDER`, em `lib/posts.ts`
- [ ] Imagem baixada (sem hotlink) e salva em `public/images/articles/<categoria>/`
- [ ] Entrada correspondente criada em `lib/covers.ts`, com `coverImageAlt` descritivo
- [ ] Créditos da imagem adicionados em `IMAGE_CREDITS.md`
- [ ] Autor e data corretos (data em ISO `AAAA-MM-DD`, ou omitida para usar o padrão)
- [ ] Conteúdo revisado (sem `TODO`, `Lorem ipsum` ou texto provisório)
- [ ] `sources` preenchido, se a matéria se basear em fatos verificáveis
- [ ] Artigo aparece na Home, na listagem, no filtro de categoria e na busca (teste manual)
- [ ] Rota gerada corretamente (conferida na saída do `npm run build`)
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Commit feito com mensagem no padrão `feat(content): adiciona artigo sobre ...`

---

## 13. Checklist para remoção

- [ ] Slug do artigo localizado e confirmado
- [ ] Todas as referências ao slug pesquisadas com `grep -rn` antes de remover qualquer coisa
- [ ] Bloco do artigo removido de `SEEDS`, em `lib/posts.ts`
- [ ] Título removido da lista `ORDER`, em `lib/posts.ts`
- [ ] Entrada removida de `lib/covers.ts`
- [ ] Confirmado que nenhum outro artigo usa a mesma imagem antes de apagar o arquivo
- [ ] Linha correspondente removida de `IMAGE_CREDITS.md` (se a imagem foi de fato apagada)
- [ ] Links internos revisados (relacionados e busca são automáticos, mas vale conferir visualmente)
- [ ] Categoria revisada (contador de artigos por categoria ajustado automaticamente — conferir na Home)
- [ ] Sitemap revisado (gerado automaticamente — conferir se a URL antiga sumiu do `sitemap.xml` local
      após o build)
- [ ] Se o artigo já estava publicado em produção: conversa com um responsável feita **antes** da
      remoção (seção 10)
- [ ] `npm run lint` sem erros
- [ ] `npm run build` sem erros
- [ ] Commit feito com mensagem clara sobre o motivo da remoção

---

## 14. Erros comuns

### Slug duplicado

**Sintoma:** o build falha com um erro de chave duplicada no objeto `SEEDS` (o TypeScript acusa o
título repetido) ou dois artigos aparecem misturados na mesma URL.

**Causa:** dois títulos diferentes geram o mesmo slug depois de normalizados (acentos removidos,
minúsculas, hífens) — ou você copiou um artigo existente como modelo e esqueceu de mudar o título.

**Correção:** rode `grep -i "parte do título" lib/posts.ts` antes de criar o artigo (seção 4) e
garanta que o novo título seja suficientemente diferente dos existentes.

### Caminho de imagem incorreto

**Sintoma:** a imagem aparece quebrada no card ou na página do artigo.

**Causa:** o valor de `coverImage` em `lib/covers.ts` não bate exatamente com o caminho real do
arquivo dentro de `public/`. O caminho sempre começa com `/images/articles/...` (com barra no início,
sem incluir a palavra `public`).

**Correção:** confira com `ls public/images/articles/<categoria>/` que o nome do arquivo é idêntico
(maiúsculas/minúsculas importam) ao que está em `coverImage`.

### Categoria com nome diferente

**Sintoma:** o TypeScript acusa erro de tipo ao rodar `npm run lint` ou `npm run build`, algo como
`Type '"games"' is not assignable to type 'CategoryName'`.

**Causa:** o campo `category` precisa ser exatamente um dos nomes definidos no `type CategoryName`
(`lib/types.ts`) — com a mesma capitalização. `"games"` (minúsculo) é diferente de `"Games"`.

**Correção:** copie o nome exato da lista em `lib/categories.ts` (campo `name`), não do `slug`.

### Imagem pesada

**Sintoma:** o site fica lento para carregar, ou alguém aponta isso na revisão do Pull Request.

**Causa:** imagem salva sem otimização, muito acima de ~300 KB.

**Correção:** reduza a resolução (1200px de largura já é suficiente) e comprima para `.webp` antes de
salvar em `public/images/articles/`.

### Campo obrigatório ausente

**Sintoma:** erro do TypeScript no `lint` ou no `build` indicando que uma propriedade está faltando no
objeto (`Property 'excerpt' is missing...`).

**Causa:** algum campo obrigatório da interface `PostSeed` (`lib/types.ts`) não foi preenchido no seu
bloco dentro de `SEEDS`.

**Correção:** compare seu bloco com um artigo existente da mesma categoria e confira se todos os
campos (`title`, `category`, `excerpt`, `tags`, `blocks`) estão presentes.

### Data em formato incorreto

**Sintoma:** a data aparece errada na página do artigo, ou o `sitemap.xml` gera uma data inválida.

**Causa:** o campo `date` precisa estar em formato ISO (`AAAA-MM-DD`), como `"2026-07-20"` — não em
formato brasileiro (`"20/07/2026"`).

**Correção:** sempre use `AAAA-MM-DD`. Se tiver dúvida, omita o campo — ele assume automaticamente a
constante `PUBLISH_DATE` do topo de `lib/posts.ts`.

### Artigo não aparecendo no filtro de categoria

**Sintoma:** o artigo aparece na listagem geral, mas some quando você clica no chip da categoria dele.

**Causa:** o valor de `category` no seu artigo não é idêntico, caractere por caractere, ao `name` da
categoria em `lib/categories.ts` (normalmente um espaço a mais/a menos, ou capitalização diferente).

**Correção:** copie e cole o nome direto de `lib/categories.ts`, não digite manualmente.

### Artigo não exportado no build

**Sintoma:** o artigo funciona em `npm run dev`, mas não aparece dentro de `out/artigos/` depois do
`npm run build`.

**Causa:** quase sempre significa que o título não foi adicionado à lista `ORDER` — o array `SEEDS`
sozinho não gera páginas; é a combinação `ORDER` + `SEEDS`, através de `getAllPosts()`, que alimenta
`generateStaticParams()` na página do artigo.

**Correção:** confirme que o título está, com o texto **idêntico**, tanto em `SEEDS` (campo `title`)
quanto em `ORDER`.

### Referência quebrada após remoção

**Sintoma:** depois de remover um artigo, o `npm run build` falha com
`Imagem de capa não cadastrada para o artigo: <slug>`, ou algum outro erro mencionando um slug que não
existe mais.

**Causa:** você removeu o artigo de `SEEDS`/`ORDER` mas esqueceu de remover (ou, ao contrário, removeu
a imagem de `lib/covers.ts` mas esqueceu de tirar o artigo de `ORDER`) — as duas remoções precisam
acontecer juntas.

**Correção:** siga o passo a passo completo da seção 9, na ordem, e rode
`grep -rn "slug-do-artigo" lib/ app/` para confirmar que não sobrou nenhuma referência solta.

---

*Dúvidas que este guia não cobrir: procure um responsável do time antes de publicar ou remover
conteúdo em produção.*
