import { CATEGORIES, getCategory } from "./categories";
import { hexToRgba } from "./colors";
import { COVERS } from "./covers";
import { initials, slugify } from "./format";
import type { CategoryName, DecoratedCategory, Post, PostCover, PostSeed } from "./types";

/**
 * Conteúdo editorial do ARS GEEK. Cada post usa a estrutura de blocos de
 * `ArticleBlock` (parágrafo, subtítulo, citação, destaque), pensada para ser
 * substituída por CMS headless, API ou MDX sem mudanças nos componentes.
 *
 * Fatos verificados em julho/2026 em fontes públicas (Wikipedia, Deadline,
 * Variety, Box Office Mojo, StarWars.com, Marvel.com, ILM.com, imprensa
 * especializada). Textos originais da redação.
 */

const AUTHOR = "Renato Brito";
const PUBLISH_DATE = "2026-07-13";

/** Seeds podem definir `date` própria; sem ela, vale PUBLISH_DATE. */
type Seed = Omit<PostSeed, "slug" | "author" | "date" | keyof PostCover> & {
  /** Sobrescreve a assinatura padrão apenas quando a matéria tiver outro autor. */
  author?: string;
  date?: string;
};

const SEEDS: Seed[] = [
  // ── FILMES ──────────────────────────────────────────────────────────
  {
    title: "The Odyssey: o épico de US$ 250 milhões de Nolan chega nesta semana, todo em IMAX",
    category: "Filmes",
    excerpt:
      "Estreia dia 17 de julho o filme mais caro da carreira de Christopher Nolan — e o primeiro longa da história rodado inteiramente com câmeras IMAX de 70mm.",
    tags: ["the-odyssey", "christopher-nolan", "imax", "cinema"],
    blocks: [
      {
        type: "paragraph",
        text: "Depois da première mundial no Empire Leicester Square, em Londres, no dia 6 de julho, The Odyssey chega aos cinemas dos Estados Unidos e do Reino Unido nesta sexta-feira, 17 de julho, pela Universal Pictures. É a aposta mais ambiciosa da carreira de Christopher Nolan: um orçamento estimado em US$ 250 milhões — o maior que o diretor já teve nas mãos — para adaptar o poema fundacional de Homero.",
      },
      {
        type: "paragraph",
        text: "A história todo mundo conhece, pelo menos de ouvir falar: Odisseu, rei de Ítaca, tenta voltar para casa depois da Guerra de Troia e enfrenta no caminho o ciclope Polifemo, as sereias e a ninfa Calipso, enquanto Penélope o espera. O elenco reunido por Nolan é um dos mais estrelados da década: Matt Damon vive Odisseu, acompanhado de Anne Hathaway, Zendaya, Tom Holland, Robert Pattinson, Jon Bernthal, Lupita Nyong'o, Mia Goth, Elliot Page, John Leguizamo e Benny Safdie.",
      },
      { type: "heading", text: "Por que o formato importa tanto" },
      {
        type: "paragraph",
        text: "O que torna The Odyssey um marco técnico é o formato de captação: é o primeiro longa-metragem da história rodado inteiramente com câmeras IMAX de filme fotográfico, incluindo uma iteração nova do equipamento desenvolvida para a produção. Nolan já era o maior embaixador do formato — Oppenheimer e Interstellar usaram IMAX 70mm em parte das cenas —, mas nunca ninguém havia sustentado o negativo de 70mm perfurado horizontalmente do primeiro ao último frame.",
      },
      {
        type: "quote",
        text: "Rodar um filme inteiro em IMAX 70mm era considerado impraticável pela indústria. Nolan transformou a limitação técnica em argumento de venda.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "paragraph",
        text: "Na prática, isso significa resolução e latitude de cor muito acima de qualquer captação digital atual — e uma logística brutal: as câmeras IMAX são pesadas, barulhentas e rodam magazines curtos de filme. Parte do trabalho de engenharia da produção foi justamente reduzir ruído e peso do equipamento para viabilizar cenas de diálogo, algo que sempre limitou o uso do formato.",
      },
      {
        type: "highlight",
        text: "As sessões 'IMAX 70mm Event' — em salas capazes de projetar o negativo original — viraram o ingresso mais disputado do ano nos EUA, com salas esgotadas com semanas de antecedência.",
      },
      {
        type: "paragraph",
        text: "Para quem acompanha a discussão técnica de cinema, The Odyssey é um experimento de escala inédita: se funcionar comercialmente, consolida o caminho aberto por Oppenheimer e pressiona o mercado de exibição a investir em projeção premium. A resposta chega já no próximo fim de semana.",
      },
    ],
  },
  {
    title: "Avatar: Fire and Ash fecha em US$ 1,49 bilhão — e a franquia de Cameron cruza os US$ 6 bilhões",
    category: "Filmes",
    excerpt:
      "Terceiro filme da saga de Pandora terminou como a terceira maior bilheteria de 2025, mas é o menor resultado da franquia. Os números contam uma história em duas camadas.",
    tags: ["avatar", "james-cameron", "bilheteria", "box-office"],
    blocks: [
      {
        type: "paragraph",
        text: "Lançado em 19 de dezembro de 2025, Avatar: Fire and Ash encerrou sua carreira nos cinemas com US$ 1,49 bilhão arrecadados no mundo — US$ 404,3 milhões nos Estados Unidos e Canadá e US$ 1,086 bilhão nos demais territórios. O resultado colocou o filme como a terceira maior bilheteria de 2025 e levou a franquia Avatar, somando os três filmes, a ultrapassar a marca de US$ 6 bilhões.",
      },
      {
        type: "paragraph",
        text: "A abertura global foi de US$ 347,1 milhões, com US$ 89,2 milhões no fim de semana de estreia doméstico — números que qualquer estúdio assinaria de olhos fechados, e que ainda assim vieram acompanhados de um asterisco: Fire and Ash é o filme de menor bilheteria da série, atrás dos US$ 2,92 bilhões do original de 2009 e dos US$ 2,32 bilhões de The Way of Water (2022).",
      },
      { type: "heading", text: "O copo meio cheio e o copo meio vazio" },
      {
        type: "paragraph",
        text: "A leitura pessimista é óbvia: a curva da franquia é descendente. A leitura otimista é mais interessante para quem olha o mercado como um todo. Em um ano em que pouquíssimos filmes passaram de US$ 1 bilhão, Cameron entregou o terceiro capítulo de uma saga com treze anos de intervalo entre filmes e ainda assim parou na frente de praticamente tudo que Hollywood lançou no ano.",
      },
      {
        type: "quote",
        text: "Nenhuma outra franquia sustenta médias de US$ 1,5 bilhão por filme. O 'fracasso' de Avatar seguiria sendo o teto da concorrência.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "paragraph",
        text: "Tecnicamente, o filme seguiu empurrando a fronteira da captura de performance debaixo d'água e da simulação de fogo e cinzas — o novo clã antagonista Na'vi, o Povo das Cinzas liderado por Varang, exigiu pipelines novos de efeitos da Weta FX. É esse investimento contínuo em P&D que mantém a série como referência de efeitos visuais da indústria.",
      },
      {
        type: "highlight",
        text: "Com Fire and Ash, a franquia Avatar ultrapassou US$ 6 bilhões acumulados — e os filmes 4 e 5 seguem no calendário da Disney para 2029 e 2031.",
      },
      {
        type: "paragraph",
        text: "O desafio de Cameron para os próximos capítulos não é técnico, é narrativo: provar que Pandora comporta histórias suficientes para justificar mais uma década de franquia. Os números de Fire and Ash dizem que o público ainda está disposto a embarcar — mas com um pouco menos de urgência do que antes.",
      },
    ],
  },
  {
    title: "Como Duna: Parte Dois venceu os Oscars de Som e Efeitos Visuais — a engenharia do deserto",
    category: "Filmes",
    excerpt:
      "Na 97ª edição do Oscar, o épico de Denis Villeneuve levou as duas estatuetas técnicas mais disputadas. Entenda o que o filme fez de diferente.",
    tags: ["duna", "oscar", "som", "efeitos-visuais"],
    blocks: [
      {
        type: "paragraph",
        text: "Na cerimônia do 97º Oscar, em março de 2025, Duna: Parte Dois confirmou o favoritismo técnico e levou duas estatuetas: Melhor Som, para Gareth John, Richard King, Ron Bartlett e Doug Hemphill, e Melhores Efeitos Visuais, para Paul Lambert, Stephen James, Rhys Salcombe e Gerd Nefzer. Na categoria de som, o filme superou A Complete Unknown, Emilia Pérez, Wicked e Robô Selvagem; em efeitos, deixou para trás Alien: Romulus, Better Man, Planeta dos Macacos: O Reinado e Wicked.",
      },
      {
        type: "paragraph",
        text: "O prêmio duplo não foi acaso: é a assinatura de um método. A equipe de Denis Villeneuve trata som e imagem como um único sistema — e as duas categorias premiaram, na prática, o mesmo princípio de design: fazer o deserto de Arrakis parecer um lugar real, com física própria, e não um cenário digital.",
      },
      { type: "heading", text: "Areia de verdade, silêncio de verdade" },
      {
        type: "paragraph",
        text: "No som, o time de Richard King (veterano premiado por Inception e Dunkirk) construiu a linguagem sonora dos vermes de areia e dos ornitópteros a partir de gravações físicas de areia, vento e materiais reais — processadas, mas nunca sintetizadas do zero. O resultado é um filme que usa silêncio e sub-graves como ferramenta dramática, algo raro em blockbusters.",
      },
      {
        type: "paragraph",
        text: "Nos efeitos visuais, a dupla Paul Lambert e Gerd Nefzer (a mesma de Blade Runner 2049 e do primeiro Duna) repetiu a filosofia de capturar o máximo possível em câmera: cenas rodadas em desertos reais da Jordânia e de Abu Dhabi, efeitos práticos de Nefzer no set, e a DNEG compondo por cima de material fotográfico — em vez de substituir tudo por ambientes 100% digitais.",
      },
      {
        type: "quote",
        text: "O segredo de Duna não é esconder o CGI: é ancorar cada pixel digital em algo que a câmera realmente fotografou.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Com as vitórias de Parte Dois, a franquia Duna soma seis Oscars técnicos em dois filmes — e Duna: Parte Três, novamente com Villeneuve, já está em produção.",
      },
      {
        type: "paragraph",
        text: "Para quem cria tecnologia, a lição é transferível: a ferramenta mais avançada rende mais quando usada para amplificar dados reais, não para substituí-los. É design de sistema aplicado a cinema — e o Oscar duplo é a validação disso.",
      },
    ],
  },

  // ── STAR WARS ───────────────────────────────────────────────────────
  {
    title: "The Mandalorian and Grogu: o que os US$ 340 milhões dizem sobre o futuro de Star Wars no cinema",
    category: "Star Wars",
    excerpt:
      "Primeiro filme da franquia desde 2019 abriu bem no Memorial Day, mas fechou como o live-action de menor bilheteria da saga. O balanço é mais complexo do que parece.",
    tags: ["star-wars", "mandalorian", "grogu", "bilheteria"],
    blocks: [
      {
        type: "paragraph",
        text: "Lançado em 22 de maio de 2026, The Mandalorian and Grogu carregava um peso simbólico enorme: era o primeiro filme de Star Wars nos cinemas desde A Ascensão Skywalker, em 2019 — quase sete anos de jejum da franquia na telona. A abertura respondeu bem ao momento: US$ 82 milhões no fim de semana de três dias nos EUA, chegando a cerca de US$ 102 milhões no feriado estendido do Memorial Day, com US$ 165 milhões globais no período.",
      },
      {
        type: "paragraph",
        text: "O fôlego, porém, não durou. O filme dirigido por Jon Favreau encerrou a carreira com US$ 340,5 milhões no mundo — US$ 177,4 milhões domésticos e US$ 163,1 milhões internacionais. É a décima maior bilheteria de 2026 até aqui, mas também o live-action de menor arrecadação da história de Star Wars.",
      },
      { type: "heading", text: "Crítica fria, público quente" },
      {
        type: "paragraph",
        text: "A recepção ajudou a explicar a curva: 64% de aprovação da crítica no Rotten Tomatoes, com resenhas apontando um filme simpático porém televisivo demais para justificar a tela grande. O público discordou — 88% de aprovação da audiência —, repetindo um padrão que a série no Disney+ já mostrava: a dupla Mando e Grogu tem carisma à prova de balas, mas o apelo é de conforto, não de evento.",
      },
      {
        type: "quote",
        text: "O filme provou que Star Wars ainda abre bem. O que ele não provou é que uma série esticada para o cinema segura três fins de semana.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Analistas de mercado notaram o contexto: em 2026, aberturas fortes seguidas de quedas acentuadas viraram regra para marcas nascidas ou consolidadas no streaming.",
      },
      {
        type: "paragraph",
        text: "Para a Lucasfilm, o resultado é um dado, não uma sentença. O próximo teste é radicalmente diferente: Star Wars: Starfighter, de Shawn Levy com Ryan Gosling, chega em maio de 2027 com história e personagens inéditos — a aposta oposta à nostalgia segura de Mando e Grogu. A comparação entre os dois resultados vai definir a estratégia de cinema da franquia para a próxima década.",
      },
    ],
  },
  {
    title: "Star Wars: Starfighter já está filmado — tudo o que sabemos do filme de Ryan Gosling",
    category: "Star Wars",
    excerpt:
      "Shawn Levy encerrou as filmagens em dezembro e o lançamento está marcado para 28 de maio de 2027. É a primeira história totalmente nova da saga no cinema desde 2019.",
    tags: ["star-wars", "starfighter", "ryan-gosling", "shawn-levy"],
    blocks: [
      {
        type: "paragraph",
        text: "Enquanto The Mandalorian and Grogu fazia seu caminho nos cinemas, a Lucasfilm já tinha o próximo filme pronto no forno: Star Wars: Starfighter, dirigido por Shawn Levy (Deadpool & Wolverine, Free Guy), rodou entre 28 de agosto e 18 de dezembro de 2025 em Londres e chega aos cinemas em 28 de maio de 2027.",
      },
      {
        type: "paragraph",
        text: "Ryan Gosling lidera o elenco — sua escalação foi anunciada junto com o título, em abril de 2025, no evento Star Wars Celebration. Ao redor dele, um time eclético: Flynn Gray, Matt Smith, Mia Goth, Aaron Pierre, Simon Bird, Jamael Westman, Daniel Ings e Amy Adams. O roteiro é de Jonathan Tropper, parceiro recorrente de Levy desde The Adam Project.",
      },
      { type: "heading", text: "Uma era inexplorada da galáxia" },
      {
        type: "paragraph",
        text: "O detalhe mais importante está na ambientação: Starfighter é uma aventura standalone que se passa cerca de cinco anos depois dos eventos de A Ascensão Skywalker — um período da linha do tempo que nunca foi explorado nas telas. Nada de Skywalkers, nada de personagens herdados: a proposta é apresentar heróis e conflitos inéditos dentro do universo.",
      },
      {
        type: "quote",
        text: "Depois de anos apostando em prequels e spin-offs de personagens conhecidos, Starfighter é o primeiro salto real para o desconhecido desde 2019.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Levy confirmou publicamente que as filmagens terminaram dentro do cronograma — em Hollywood pós-greves, cumprir janela virou notícia.",
      },
      {
        type: "paragraph",
        text: "Para os fãs, a expectativa tem um sabor específico: Gosling vem do melhor momento da carreira e Levy provou com Deadpool & Wolverine que sabe equilibrar espetáculo e humor dentro de uma franquia gigante. Se Starfighter acertar o tom, pode ser o modelo que Star Wars procura desde o fim da trilogia sequel: filmes-evento que não dependem de nostalgia para existir.",
      },
    ],
  },
  {
    title: "StageCraft: como a tecnologia criada para The Mandalorian reinventou os sets de Hollywood",
    category: "Star Wars",
    excerpt:
      "O 'Volume' da ILM trocou o chroma key por paredes de LED renderizadas em tempo real — e fez a indústria saltar de 3 para 300 estúdios do tipo em três anos.",
    tags: ["stagecraft", "ilm", "producao-virtual", "unreal-engine"],
    blocks: [
      {
        type: "paragraph",
        text: "Quando The Mandalorian estreou em 2019, a revolução não estava só na tela — estava atrás dela. A Industrial Light & Magic havia construído para a série o StageCraft, um palco semicircular de LEDs de 6 metros de altura, 270 graus de cobertura e um espaço de atuação de cerca de 23 metros de diâmetro, com teto também de LED. Em vez de atores contracenando com telas verdes, os cenários digitais eram exibidos ao vivo, renderizados em tempo real pela Unreal Engine, da Epic Games.",
      },
      {
        type: "paragraph",
        text: "A diferença não é cosmética. Com o ambiente projetado em volta do ator, a luz da cena vem do próprio cenário — reflexos no capacete de Mando, o pôr do sol duplo de Tatooine na pele dos personagens. Nada disso precisa ser recriado (ou consertado) na pós-produção. Mais de 50% da primeira temporada foi filmada dentro do Volume, eliminando locações externas por completo.",
      },
      { type: "heading", text: "Um pipeline de games no coração do cinema" },
      {
        type: "paragraph",
        text: "O sistema nasceu de uma aliança pouco usual: a ILM assinou a plataforma StageCraft, mas o coração do rendering em tempo real é uma engine de videogame. Parceiros como Golem Creations, Fuse, Lux Machina, Profile Studios e ARRI completaram o pipeline — rastreamento de câmera, calibração de cor, sincronização de frustum. O paralelo com desenvolvimento de jogos é direto: o cenário é uma cena de game engine, otimizada para rodar a 24 quadros por segundo com qualidade fotográfica.",
      },
      {
        type: "quote",
        text: "O StageCraft é o exemplo perfeito de transferência de tecnologia: uma engine feita para jogos resolveu um problema centenário do cinema.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Pela contagem da própria Epic Games, a indústria saltou de cerca de 3 estúdios de LED no mundo em 2019 para aproximadamente 300 em 2022 — o Mandalorian provou o conceito em escala.",
      },
      {
        type: "paragraph",
        text: "Hoje a produção virtual é rotina em séries e filmes de todos os estúdios, e a ILM segue expandindo seus palcos pelo mundo. Mas vale registrar a origem: foi uma série de Star Wars — a franquia que praticamente inventou a indústria de efeitos visuais moderna nos anos 1970 — que empurrou Hollywood para a era do render em tempo real.",
      },
    ],
  },
  {
    title:
      "Star Wars: A Caçada por Ben Solo nasceu de uma ideia de Adam Driver, mas nunca recebeu sinal verde da Disney",
    category: "Star Wars",
    author: "Arthur Mendes",
    date: "2026-07-29",
    excerpt:
      "Projeto idealizado por Adam Driver chegou a ser desenvolvido internamente, mas acabou arquivado antes de receber aprovação da Disney.",
    tags: [
      "star-wars",
      "ben-solo",
      "adam-driver",
      "lucasfilm",
      "disney",
      "steven-soderbergh",
    ],
    blocks: [
      {
        type: "paragraph",
        text: "Após interpretar Ben Solo ao longo da trilogia sequela, Adam Driver acreditava que a jornada do personagem ainda não havia chegado ao fim. O interesse do ator em explorar um novo capítulo da história deu origem ao projeto Star Wars: A Caçada por Ben Solo, um filme que chegou a ser desenvolvido internamente, mas acabou não recebendo aprovação da Disney para seguir adiante.",
      },
      {
        type: "paragraph",
        text: "O diretor Steven Soderbergh revelou que toda a iniciativa partiu do próprio Driver. O ator acreditava que ainda existia espaço para aprofundar a trajetória de Ben Solo após os acontecimentos de Star Wars: A Ascensão Skywalker, motivando o início das conversas sobre um possível retorno ao universo da franquia.",
      },
      {
        type: "heading",
        text: "A ideia surgiu do próprio Adam Driver",
      },
      {
        type: "paragraph",
        text: "O projeto começou de uma forma pouco comum para uma produção do universo Star Wars: foi o próprio Adam Driver quem demonstrou interesse em desenvolver uma nova história para Ben Solo.",
      },
      {
        type: "quote",
        text: "Foi o próprio Adam dizendo: ‘Acho que ainda há algo a explorar com esse personagem.’ Foi assim que tudo começou. Caso contrário, eu nunca, em um milhão de anos, teria voltado para esse universo.",
        by: "Steven Soderbergh",
      },
      {
        type: "paragraph",
        text: "A declaração mostra que a proposta não nasceu inicialmente como parte de um planejamento da Lucasfilm para expandir a franquia, mas da convicção de Driver de que o personagem ainda possuía potencial narrativo após o encerramento da Saga Skywalker.",
      },
      {
        type: "heading",
        text: "O projeto chegou a avançar dentro da Lucasfilm",
      },
      {
        type: "paragraph",
        text: "A Caçada por Ben Solo deixou de ser apenas uma ideia inicial e passou a ser discutido internamente. A proposta começou a ganhar forma, envolvendo profissionais ligados ao seu desenvolvimento e despertando interesse dentro da Lucasfilm.",
      },
      {
        type: "paragraph",
        text: "A intenção era construir uma nova história centrada em Ben Solo após os eventos de A Ascensão Skywalker, oferecendo uma perspectiva inédita sobre um dos personagens mais marcantes da trilogia sequela.",
      },
      {
        type: "paragraph",
        text: "Embora o projeto tenha avançado durante suas etapas iniciais, ele ainda dependia da aprovação da Disney para entrar oficialmente em produção.",
      },
      {
        type: "heading",
        text: "A Disney nunca deu o sinal verde",
      },
      {
        type: "paragraph",
        text: "Foi justamente nessa etapa que o projeto encontrou seu principal obstáculo.",
      },
      {
        type: "paragraph",
        text: "A proposta chegou aos executivos responsáveis pela decisão final, mas não recebeu autorização para seguir em frente. Sem o sinal verde da Disney, Star Wars: A Caçada por Ben Solo acabou arquivado antes mesmo de ser oficialmente anunciado ao público.",
      },
      {
        type: "highlight",
        text: "O longa nunca entrou em produção e não chegou a ser oficialmente anunciado pela Disney, apesar de ter avançado durante suas fases iniciais de desenvolvimento.",
      },
      {
        type: "heading",
        text: "O futuro de Ben Solo continua indefinido",
      },
      {
        type: "paragraph",
        text: "Mesmo sem sair do papel, Star Wars: A Caçada por Ben Solo mostra que ainda existiam ideias para expandir a história de Ben Solo após o fim da Saga Skywalker. A iniciativa de Adam Driver demonstra que o ator enxergava novas possibilidades para o personagem, mesmo depois do encerramento de sua participação nos cinemas.",
      },
      {
        type: "paragraph",
        text: "Com o projeto arquivado e sem novos anúncios envolvendo Ben Solo, o futuro do personagem permanece indefinido dentro da franquia. Ainda assim, a revelação dos bastidores apresenta aos fãs um caminho que chegou a ser considerado pela Lucasfilm, mas que acabou ficando apenas como um capítulo não realizado da história de Star Wars.",
      },
    ],
  },

  // ── MARVEL ──────────────────────────────────────────────────────────
  {
    title: "Vingadores: Doomsday em dezembro — Robert Downey Jr. como Doutor Destino e o maior elenco da história do MCU",
    category: "Marvel",
    excerpt:
      "Os irmãos Russo voltam ao comando em 18 de dezembro de 2026, com mais de duas dezenas de nomes confirmados — incluindo os X-Men originais do cinema.",
    tags: ["vingadores", "doomsday", "mcu", "doutor-destino"],
    blocks: [
      {
        type: "paragraph",
        text: "Faltam pouco mais de cinco meses: Vingadores: Doomsday chega aos cinemas em 18 de dezembro de 2026, dirigido por Anthony e Joe Russo — a dupla de Guerra Infinita e Ultimato. A produção rodou entre abril e setembro de 2025 nos estúdios Pinewood, na Inglaterra, com locações também no Bahrein.",
      },
      {
        type: "paragraph",
        text: "O centro gravitacional do filme é o casting mais comentado da década: Robert Downey Jr. retorna ao MCU não como Tony Stark, mas como o vilão Victor von Doom, o Doutor Destino. O anúncio, feito na San Diego Comic-Con de julho de 2024 junto com a confirmação dos Russo, redefiniu as expectativas para a Saga do Multiverso inteira.",
      },
      { type: "heading", text: "Um crossover de gerações" },
      {
        type: "paragraph",
        text: "A lista de elenco divulgada pela Marvel passa de duas dezenas de nomes e mistura três eras de filmes de super-herói: a nova geração do MCU (Pedro Pascal, Vanessa Kirby, Ebon Moss-Bachrach e Joseph Quinn, vindos de Quarteto Fantástico: Primeiros Passos, além de Anthony Mackie como Capitão América e Florence Pugh), veteranos como Chris Hemsworth e Tom Hiddleston — e, no movimento mais nostálgico, os X-Men do cinema dos anos 2000: Patrick Stewart, Ian McKellen, Kelsey Grammer, Rebecca Romijn, James Marsden e Alan Cumming, com Channing Tatum somando seu Gambit.",
      },
      {
        type: "quote",
        text: "Doomsday não é só um filme de Vingadores: é a fusão formal de vinte e cinco anos de cinema de super-herói em um único evento.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O filme fecha o ano mais movimentado da história do gênero: Superman em 2025 provou que o público responde a recomeços — agora a Marvel testa se responde também a reencontros.",
      },
      {
        type: "paragraph",
        text: "O contexto de negócio importa: depois de um 2025 irregular nas bilheterias do MCU, a Marvel concentrou tudo em Doomsday e em Vingadores: Secret Wars, previsto para o fim de 2027. É a estratégia de evento máximo — e dezembro dirá se o multiverso ainda tem a força gravitacional que a Saga do Infinito tinha.",
      },
    ],
  },
  {
    title: "Homem-Aranha: Um Novo Dia estreia dia 31 — Peter Parker contra o Hulk, quatro anos depois do feitiço",
    category: "Marvel",
    excerpt:
      "Tom Holland volta ao papel no fim do mês, agora sob direção de Destin Daniel Cretton, com Justiceiro, Escorpião e Mark Ruffalo no elenco.",
    tags: ["homem-aranha", "brand-new-day", "tom-holland", "mcu"],
    blocks: [
      {
        type: "paragraph",
        text: "Julho de 2026 é o mês de Tom Holland: além de aparecer em The Odyssey, de Nolan, o ator veste de novo o uniforme em Homem-Aranha: Um Novo Dia (Spider-Man: Brand New Day), que estreia em 31 de julho. A direção agora é de Destin Daniel Cretton (Shang-Chi), substituindo Jon Watts na primeira troca de comando da série desde 2017.",
      },
      {
        type: "paragraph",
        text: "A premissa retoma exatamente a ferida aberta em Sem Volta Para Casa (2021): o feitiço do Doutor Estranho apagou Peter Parker da memória do mundo. Quatro anos se passaram, e Peter protege Nova York anonimamente enquanto investiga uma nova ameaça — e lida com uma evolução inesperada, e potencialmente perigosa, dos próprios poderes.",
      },
      { type: "heading", text: "Um elenco que mistura ruas e gigantes" },
      {
        type: "paragraph",
        text: "O elenco confirma o tom duplo do filme: Zendaya retorna como MJ e Jacob Batalon como Ned, com Sadie Sink em papel não revelado. Do lado das ameaças, Jon Bernthal traz o Justiceiro de volta ao cinema, Michael Mando finalmente vira o Escorpião (plantado lá atrás em Homecoming), Tramell Tillman interpreta Bill Metzger — e Mark Ruffalo aparece como Bruce Banner/Hulk, protagonista do confronto que dominou o primeiro trailer.",
      },
      {
        type: "quote",
        text: "Um Novo Dia promete o que os fãs pedem desde 2021: um Homem-Aranha de bairro, sem multiverso — mas com o azar cósmico de cruzar com o Hulk.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O filme faz parte da Fase Seis do MCU e é a última grande estreia da Marvel antes de Vingadores: Doomsday, em dezembro — a expectativa é que os dois se conectem.",
      },
      {
        type: "paragraph",
        text: "Comercialmente, a barra é alta: Sem Volta Para Casa passou de US$ 1,9 bilhão na pandemia. Ninguém espera repetir aquilo — mas, num julho disputado com o épico de Nolan, o Aranha de Holland vai medir com precisão o apetite do público pelo MCU às vésperas de Doomsday.",
      },
    ],
  },
  {
    title: "Um ano de Quarteto Fantástico: Primeiros Passos — o filme que salvou o ano da Marvel e armou Doomsday",
    category: "Marvel",
    excerpt:
      "Lançado em julho de 2025, o retrô-futurista da Primeira Família fez US$ 521,9 milhões, agradou a crítica e entregou os protagonistas do próximo Vingadores.",
    tags: ["quarteto-fantastico", "mcu", "marvel", "retrospectiva"],
    blocks: [
      {
        type: "paragraph",
        text: "Há praticamente um ano, em 25 de julho de 2025, a Marvel finalmente acertava o Quarteto Fantástico. Primeiros Passos abriu com US$ 117,6 milhões domésticos (US$ 216,7 milhões globais no fim de semana) e fechou a carreira com US$ 521,9 milhões no mundo — US$ 274,3 milhões nos EUA e Canadá e US$ 247,6 milhões internacionais, terminando entre as dez maiores bilheterias domésticas de 2025.",
      },
      {
        type: "paragraph",
        text: "Mais importante que o número foi a recepção: 86% de aprovação no Rotten Tomatoes entre mais de 400 críticos, nota 65 no Metacritic e CinemaScore A−. O consenso da crítica elogiou exatamente o que as duas tentativas anteriores da Fox erraram: química de elenco sólida e uma identidade visual própria — o design retrô-futurista dos anos 1960 da Terra-828.",
      },
      { type: "heading", text: "O truque foi sair do MCU para salvá-lo" },
      {
        type: "paragraph",
        text: "A decisão criativa decisiva foi ambientar o filme em um universo paralelo, fora da continuidade principal. Sem dever de casa para o espectador, o filme pôde ser só uma aventura de família — Pedro Pascal (Reed), Vanessa Kirby (Sue), Joseph Quinn (Johnny) e Ebon Moss-Bachrach (Ben) contra Galactus. A ironia é que essa independência durou pouco: os quatro estão confirmados em Vingadores: Doomsday, em dezembro.",
      },
      {
        type: "quote",
        text: "Primeiros Passos provou a tese mais simples do gênero: personagem bem escrito e direção de arte com personalidade valem mais que conexões de universo.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Foi o único filme do MCU em 2025 a cruzar US$ 500 milhões — e o termômetro que definiu o tom da campanha de Doomsday.",
      },
      {
        type: "paragraph",
        text: "Um ano depois, o legado do filme é estratégico: ele devolveu à Marvel a confiança (e os personagens) para construir Doomsday, e estabeleceu que o público aceita — e talvez prefira — cantos do multiverso com estética e ritmo próprios. A Primeira Família chegou atrasada ao MCU, mas chegou inteira.",
      },
    ],
  },

  // ── DC ──────────────────────────────────────────────────────────────
  {
    title: "Supergirl divide opiniões, mas confirma a aposta do DCU em autores — e em riscos",
    category: "DC",
    excerpt:
      "Adaptação de Woman of Tomorrow com Milly Alcock estreou em 26 de junho com críticas mistas e US$ 115 milhões até agora. O filme é melhor do que o placar sugere?",
    tags: ["supergirl", "dcu", "milly-alcock", "woman-of-tomorrow"],
    blocks: [
      {
        type: "paragraph",
        text: "Duas semanas depois da estreia, já dá para fazer o primeiro balanço de Supergirl, o segundo filme do novo Universo DC de James Gunn e Peter Safran. Dirigido por Craig Gillespie (Eu, Tonya) com roteiro de Ana Nogueira, o filme chegou aos cinemas em 26 de junho, após première no Brooklyn no dia 22, e acumula US$ 115 milhões de bilheteria contra um orçamento estimado entre US$ 170 milhões e US$ 186 milhões — um começo abaixo do que Superman registrou no ano passado.",
      },
      {
        type: "paragraph",
        text: "Milly Alcock, apresentada como Kara Zor-El nos minutos finais de Superman (2025), assume o protagonismo ao lado de Matthias Schoenaerts, Eve Ridley, David Krumholtz, Emily Beecham, Jason Momoa e uma participação de David Corenswet. A trama adapta a minissérie Supergirl: Woman of Tomorrow, de Tom King e Bilquis Evely — Kara cruza a galáxia atrás do responsável por ferir seu cão Krypto, numa jornada de vingança com tons de faroeste espacial.",
      },
      { type: "heading", text: "O material de origem era o risco — e a razão de existir" },
      {
        type: "paragraph",
        text: "Woman of Tomorrow é uma HQ amarga e contemplativa, sobre trauma e a diferença entre justiça e vingança. A crítica se dividiu exatamente nesse ponto: parte elogiou a coragem de fazer um filme de super-herói com esse registro (e a entrega física de Alcock), parte achou que o tom oscila sem resolver. Kara aqui não é a versão otimista do primo — é uma sobrevivente que viu Krypton morrer lentamente, e o filme não suaviza isso.",
      },
      {
        type: "quote",
        text: "O DCU está fazendo o que o gênero raramente permite: entregar personagens a autores com voz própria e aceitar o resultado nas urnas.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Filmado entre janeiro e maio de 2025 em Leavesden e na Escócia, Supergirl é o segundo capítulo do 'Capítulo Um: Deuses e Monstros' do DCU — a fase que Superman abriu e que segue com Clayface e Man of Tomorrow.",
      },
      {
        type: "paragraph",
        text: "O placar final ainda vai se mexer — julho tem concorrência pesada —, mas a leitura estratégica já é possível: Gunn e Safran preferem filmes com identidade e orçamentos controláveis a blockbusters de comitê. Nem todos vão acertar o alvo comercial. A pergunta que importa é se a soma constrói um universo com autoria — e, nesse quesito, Supergirl aponta na direção certa.",
      },
    ],
  },
  {
    title: "Superman, um ano depois: os US$ 618 milhões que reergueram a DC",
    category: "DC",
    excerpt:
      "Lançado em 11 de julho de 2025, o filme de James Gunn foi a maior bilheteria de super-herói do ano e destravou um universo inteiro. O aniversário convida ao balanço.",
    tags: ["superman", "james-gunn", "dcu", "retrospectiva"],
    blocks: [
      {
        type: "paragraph",
        text: "Neste fim de semana, Superman completou um ano de lançamento. Estreou em 11 de julho de 2025 e fechou com US$ 618,7 milhões no mundo — US$ 354,2 milhões domésticos e US$ 264,5 milhões internacionais. Foi a maior bilheteria de filme de super-herói de 2025 e marcou a primeira vez desde O Cavaleiro das Trevas, em 2008, que um filme da DC superou todos os lançamentos da Marvel de um mesmo ano.",
      },
      {
        type: "paragraph",
        text: "A abertura de US$ 125 milhões domésticos foi a maior da história para um filme solo do Superman, à frente de O Homem de Aço. E o filme mostrou pernas: queda de apenas 54% no segundo fim de semana — melhor retenção que Capitão América: Admirável Mundo Novo e Thunderbolts* no mesmo ano —, sinal clássico de boca a boca positivo. Segundo a imprensa de negócios de Hollywood, o lucro teatral superou US$ 100 milhões.",
      },
      { type: "heading", text: "O que funcionou — e o que ficou de lição" },
      {
        type: "paragraph",
        text: "A crítica recebeu bem: um Superman colorido, sincero e otimista, com David Corenswet, Rachel Brosnahan e Nicholas Hoult elogiados quase por unanimidade (ainda que parte das resenhas tenha achado o filme sobrecarregado de personagens). Krypto virou fenômeno instantâneo de merchandising. A lição amarga veio de fora: o desempenho internacional ficou aquém, especialmente na China, onde estreou em quarto lugar — analistas atribuíram o resultado à identificação do personagem com um patriotismo americano que viaja mal no momento geopolítico.",
      },
      {
        type: "quote",
        text: "Superman não precisou ser o maior filme do ano: precisou provar que a DC sabia para onde estava indo. Provou.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O legado de um ano: Supergirl já está em cartaz, Man of Tomorrow chega em 2027, e séries de Jimmy Olsen e Mister Terrific estão em desenvolvimento — todas fundadas no alicerce de julho de 2025.",
      },
      {
        type: "paragraph",
        text: "Doze meses depois, o mais impressionante é a mudança de conversa. Em 2024, a pergunta era se a DC sobreviveria ao reboot; hoje, é se a Marvel consegue responder ao ritmo do DCU. Poucos filmes mudam a trajetória de um estúdio inteiro — Superman é um deles.",
      },
    ],
  },
  {
    title: "The Batman: Parte II em produção — o que se sabe do retorno de Pattinson a Gotham",
    category: "DC",
    excerpt:
      "Depois de anos de espera, Matt Reeves finalmente filma a sequência, com Scarlett Johansson e Sebastian Stan no elenco e estreia marcada para outubro de 2027.",
    tags: ["the-batman", "matt-reeves", "robert-pattinson", "dc-elseworlds"],
    blocks: [
      {
        type: "paragraph",
        text: "A espera mais longa do cinema de super-herói recente virou, enfim, set de filmagem: The Batman: Parte II está em produção desde junho nos estúdios de Leavesden, na Inglaterra, com locações também na Escócia. A estreia está marcada para 1º de outubro de 2027 — cinco anos e meio depois do primeiro filme.",
      },
      {
        type: "paragraph",
        text: "Robert Pattinson volta como Bruce Wayne, ao lado dos veteranos Jeffrey Wright, Andy Serkis e Colin Farrell. As novidades do elenco chegaram entre dezembro de 2025 e maio de 2026: Scarlett Johansson, Sebastian Stan e Charles Dance, em papéis mantidos sob sigilo — Matt Reeves fez da proteção do mistério da trama uma política de produção.",
      },
      { type: "heading", text: "Por que demorou tanto" },
      {
        type: "paragraph",
        text: "Reeves escreveu o roteiro com Mattson Tomlin do fim de 2022 até junho de 2025 — um processo meticuloso que, somado às greves de Hollywood de 2023 e a questões pessoais do diretor, empurrou o cronograma repetidas vezes. A sequência se passa no inverno seguinte à inundação de Gotham e, segundo Reeves, foca mais no Bruce Wayne do que qualquer filme anterior do personagem, com uma trama de mistério armada pelos eventos da série The Penguin (2024).",
      },
      {
        type: "quote",
        text: "Reeves trocou o calendário pelo controle criativo — num gênero movido a datas, é quase um ato de rebeldia.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Parte II segue fora do DCU principal, sob o selo 'DC Elseworlds' — e um terceiro filme já está planejado para fechar a trilogia.",
      },
      {
        type: "paragraph",
        text: "Com Erik Messerschmidt (Mank) assumindo a fotografia, a expectativa técnica é altíssima — o primeiro filme redefiniu o visual noir do personagem. Entre o Batman autoral de Reeves e o Batman do DCU que Gunn ainda vai escalar, Gotham viverá uma década com dois donos. Outubro de 2027 mostra o primeiro.",
      },
    ],
  },

  // ── ANIMES ──────────────────────────────────────────────────────────
  {
    title: "Frieren encerra a 2ª temporada e já tem a 3ª marcada: a jornada continua em outubro de 2027",
    category: "Animes",
    excerpt:
      "Segunda temporada foi ao ar de janeiro a março de 2026 pela Madhouse, agora sob direção de Tomoya Kitagawa — e o anúncio do arco da Terra Dourada coroou o final.",
    tags: ["frieren", "madhouse", "anime", "temporada-2"],
    blocks: [
      {
        type: "paragraph",
        text: "A jornada mais serena dos animes modernos completou mais uma etapa: a segunda temporada de Frieren e a Jornada para o Além (Sousou no Frieren) foi exibida de 16 de janeiro a 27 de março de 2026, mantendo a produção na Madhouse mas com troca no comando — Tomoya Kitagawa assumiu a direção no lugar de Keiichirō Saitō, que dirigiu os 28 episódios da primeira temporada (2023–24).",
      },
      {
        type: "paragraph",
        text: "E o futuro já tem data: junto do encerramento, foi confirmado que a terceira temporada chega em outubro de 2027, adaptando o arco da Terra Dourada (Golden Land) — um dos mais celebrados do mangá de Kanehito Yamada e Tsukasa Abe, que em janeiro de 2026 ultrapassou 35 milhões de cópias em circulação.",
      },
      { type: "heading", text: "O ritmo lento como assinatura" },
      {
        type: "paragraph",
        text: "A segunda temporada manteve a aposta que fez da série um fenômeno: ritmo contemplativo, flashbacks que ressignificam o presente e uma elfa imortal aprendendo, década a década, o que os humanos sentiam o tempo todo. A troca de direção era o grande ponto de atenção dos fãs — e o consenso da temporada foi de continuidade estética, com a Madhouse sustentando o padrão de animação que definiu a primeira leva de episódios.",
      },
      {
        type: "quote",
        text: "Frieren segue provando que 'lento' não é defeito de ritmo: é a própria tese da obra sobre tempo e perda.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O pedigree do mangá segue imbatível: Manga Taishō de 2021, Prêmio Cultural Tezuka Osamu de Novo Criador, e os prêmios Shogakukan e Kodansha de 2024 na categoria shōnen.",
      },
      {
        type: "paragraph",
        text: "Com a terceira temporada garantida e o mangá em plena forma, Frieren consolidou algo raro: uma franquia de fantasia que cresce sem pressa, no ritmo da própria protagonista. Até outubro de 2027, fica a maratona — e a releitura do material que fez essa jornada valer a pena.",
      },
    ],
  },
  {
    title: "Demon Slayer: Castelo Infinito é o maior filme japonês da história — e os recordes não param de cair",
    category: "Animes",
    excerpt:
      "Primeiro filme da trilogia final da Ufotable arrecadou US$ 793 milhões, quebrou o recorde de estreia do Japão e virou o filme internacional de maior bilheteria da história dos EUA.",
    tags: ["demon-slayer", "castelo-infinito", "ufotable", "bilheteria"],
    blocks: [
      {
        type: "paragraph",
        text: "Quando Demon Slayer: Kimetsu no Yaiba – Castelo Infinito estreou no Japão em 18 de julho de 2025, o recorde caiu no primeiro dia: ¥1,64 bilhão e 1,15 milhão de ingressos — a maior abertura diária da história do cinema japonês. O fim de semana de três dias somou ¥5,52 bilhões, a maior estreia de todos os tempos no país. Dali em diante, o filme da Ufotable só colecionou marcos.",
      },
      {
        type: "paragraph",
        text: "O total mundial fechou em US$ 793 milhões, tornando Castelo Infinito o filme japonês de maior bilheteria da história — superando o recorde que pertencia a Mugen Train desde 2020 — e a sétima maior bilheteria global de 2025. Nos Estados Unidos, a abertura de US$ 70 milhões estabeleceu o recorde de maior estreia de um filme internacional na história do mercado americano, e o total no país superou a marca que O Tigre e o Dragão segurava desde 2000.",
      },
      { type: "heading", text: "A aposta na tela grande" },
      {
        type: "paragraph",
        text: "Dirigido por Haruo Sotozaki, o filme adapta o arco final do mangá de Koyoharu Gotouge como o primeiro capítulo de uma trilogia anunciada em junho de 2024, logo após o fim da quarta temporada da série. A decisão de levar o clímax para o cinema — em vez de mais uma temporada de TV — repetiu a lógica de Mugen Train: o padrão visual da Ufotable, com sua fusão de animação tradicional e efeitos digitais, foi desenhado para justificar o ingresso.",
      },
      {
        type: "quote",
        text: "Castelo Infinito não é um filme que aproveitou uma audiência: é uma audiência global que a Ufotable construiu quadro a quadro por seis anos.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "A colheita de prêmios acompanhou: Melhor Filme de Animação no Japan Academy Film Prize, recorde de sete troféus no Crunchyroll Anime Awards de 2026 — incluindo Filme do Ano — e indicação ao Globo de Ouro de melhor animação.",
      },
      {
        type: "paragraph",
        text: "Para a indústria, o recado é estrondoso: anime deixou de ser nicho de bilheteria no Ocidente. Os próximos dois filmes da trilogia já são, por definição, os lançamentos mais aguardados do mercado de animação mundial — e o teto que Castelo Infinito estabeleceu vai ser difícil até para a própria franquia bater.",
      },
    ],
  },
  {
    title: "Chainsaw Man – O Filme: Arco da Reze prova que a MAPPA sabia exatamente o que estava fazendo",
    category: "Animes",
    excerpt:
      "O filme que adapta o arco mais amado do mangá de Fujimoto arrecadou US$ 191,4 milhões no mundo e entrou para a lista dos maiores filmes japoneses de todos os tempos.",
    tags: ["chainsaw-man", "reze", "mappa", "anime"],
    blocks: [
      {
        type: "paragraph",
        text: "Três anos separaram a primeira temporada de Chainsaw Man de sua continuação — e a MAPPA usou o tempo para mudar de formato. Em vez de uma segunda temporada, o estúdio levou o material seguinte do mangá de Tatsuki Fujimoto para o cinema: Chainsaw Man – O Filme: Arco da Reze estreou no Japão em 19 de setembro de 2025, pela Toho, adaptando os volumes 5 e 6 da obra.",
      },
      {
        type: "paragraph",
        text: "A aposta pagou: US$ 191,4 milhões de bilheteria mundial, o que coloca o filme entre os maiores lançamentos japoneses de todos os tempos, além de recepção positiva da crítica e indicação a Melhor Filme de Animação no Japan Academy Film Prize — na mesma edição em que Castelo Infinito venceu.",
      },
      { type: "heading", text: "Uma bomba de relojoaria emocional" },
      {
        type: "paragraph",
        text: "Dirigido por Tatsuya Yoshihara com roteiro de Hiroshi Seko, o filme adapta a história de Reze, a garota do café que se aproxima de Denji — e que é também a Demônio Bomba, enviada para caçá-lo. É o material mais romântico e mais cruel de Fujimoto: uma história de primeiro amor construída como armadilha, encerrada com uma das sequências de ação mais viscerais que a MAPPA já animou.",
      },
      {
        type: "quote",
        text: "O Arco da Reze é o coração partido do mangá — e o filme entendeu que a ação só devasta porque o romance antes convence.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O sucesso consolida a tendência do mercado japonês: arcos de clímax migrando da TV para o cinema, onde o orçamento por minuto — e a receita — são de outra ordem de grandeza.",
      },
      {
        type: "paragraph",
        text: "Para a MAPPA, o resultado encerra qualquer debate sobre o futuro da franquia: Chainsaw Man é agora uma propriedade de cinema tanto quanto de TV. E para os fãs de Fujimoto, fica a confirmação de que o material mais estranho e melancólico do shōnen moderno encontrou um público global à altura.",
      },
    ],
  },

  // ── GAMES ───────────────────────────────────────────────────────────
  {
    title: "GTA VI: a espera até 19 de novembro — anatomia dos dois adiamentos do jogo mais aguardado da história",
    category: "Games",
    excerpt:
      "A Rockstar adiou o lançamento duas vezes — de 2025 para maio de 2026, e de maio para novembro. Entre demissões, estimativas bilionárias e um mercado inteiro refém da data.",
    tags: ["gta-6", "rockstar", "playstation", "xbox"],
    blocks: [
      {
        type: "paragraph",
        text: "Faltam pouco mais de quatro meses para 19 de novembro de 2026, a data em que — salvo novo tropeço — Grand Theft Auto VI finalmente chega ao PlayStation 5 e ao Xbox Series X/S. O caminho até aqui teve dois adiamentos: em maio de 2025, a Rockstar tirou o jogo da janela do fim daquele ano e o marcou para 26 de maio de 2026; em novembro, empurrou de novo, para a data atual, citando necessidade de polimento adicional.",
      },
      {
        type: "paragraph",
        text: "O segundo adiamento veio numa semana turbulenta: dias antes, a Rockstar havia demitido 34 funcionários sob acusação de vazamento de informações confidenciais — o sindicato britânico IWGB contestou, alegando perseguição a organização sindical, e a ação do estúdio virou caso público. Jornalistas especializados apontaram que as demissões não causaram o atraso, mas o episódio derrubou o moral interno e chegou a derrubar quase 10% da ação da Take-Two no dia do anúncio.",
      },
      { type: "heading", text: "O jogo que paralisou uma indústria" },
      {
        type: "paragraph",
        text: "Revelado oficialmente em dezembro de 2023 — após o megavazamento de 2022, um dos maiores da história dos games —, GTA VI se passa em Leonida, estado fictício inspirado na Flórida, com a volta de Vice City. A dupla de protagonistas, Jason Duval e Lucia Caminos, traz a primeira personagem feminina não opcional da série. O preço também fará história: US$ 79,99 na edição padrão.",
      },
      {
        type: "quote",
        text: "Nenhum produto de entretenimento já teve tanto capital de terceiros orbitando uma única data: publishers inteiras agendam seus lançamentos ao redor do dia 19 de novembro.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "As projeções de mercado são inéditas: a Niko Partners estima mais de US$ 1,2 bilhão em vendas no primeiro dia, e a DFC Intelligence projeta US$ 3,2 bilhões (40 milhões de cópias) no primeiro ano. Rumores de orçamento entre US$ 1 bilhão e US$ 2 bilhões seguem não confirmados.",
      },
      {
        type: "paragraph",
        text: "A pergunta honesta a quatro meses do lançamento não é se GTA VI será um sucesso — é se alguma obra consegue sobreviver a esse tamanho de expectativa. A Rockstar tem o histórico mais consistente da indústria em lançamentos de década. Em novembro, saberemos se ele resiste ao peso de treze anos de espera.",
      },
    ],
  },
  {
    title: "Switch 2, um ano depois: recordes, freio na produção e o dilema do preço",
    category: "Games",
    excerpt:
      "O console mais vendido da história da Nintendo em velocidade de lançamento passou de 19 milhões de unidades — mas 2026 trouxe corte de produção e aumento de preço no Japão.",
    tags: ["nintendo", "switch-2", "mario-kart", "consoles"],
    blocks: [
      {
        type: "paragraph",
        text: "O Nintendo Switch 2 completou um ano de mercado em junho com uma ficha de recordes: 3,5 milhões de unidades nos primeiros quatro dias — o lançamento mais rápido da história da Nintendo, e, segundo a Niko Partners, de qualquer console —, mais de 19 milhões vendidos até março de 2026, e Mario Kart World, o título de lançamento vendido em bundle, já acima de 14 milhões de cópias.",
      },
      {
        type: "paragraph",
        text: "O primeiro ano, porém, terminou com sinais mistos. Em fevereiro, o presidente Shuntaro Furukawa admitiu que as vendas internacionais vinham 'um pouco mais fracas que o esperado'. Em março, a Bloomberg reportou que a Nintendo cortou a produção planejada em mais de 30% — de cerca de 6 milhões para 4 milhões de unidades trimestrais — após a demanda americana desacelerar.",
      },
      { type: "heading", text: "O aumento de preço que travou o Japão" },
      {
        type: "paragraph",
        text: "O episódio mais revelador veio do mercado doméstico: em 25 de maio, a Nintendo elevou o preço do console no Japão de ¥49.980 para ¥59.980, citando condições de mercado. O efeito foi imediato — depois de uma corrida de compras pré-aumento com semanas acima de 200 mil unidades, as vendas despencaram 87%, para pouco mais de 31 mil unidades semanais.",
      },
      {
        type: "quote",
        text: "O Switch 2 provou a força da marca Nintendo no lançamento — e agora testa, em tempo real, a elasticidade de preço do consumidor de games.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "Contexto que explica a régua: o Switch original fechou 2025 como o console mais vendido da história da Nintendo e o segundo de todos os tempos, atrás apenas do PlayStation 2 — com mais de 146 milhões de unidades quando o sucessor foi anunciado.",
      },
      {
        type: "paragraph",
        text: "A leitura de um ano é de sucesso com asterisco: a base instalada cresce em ritmo recorde, o catálogo (com exclusividades como os clássicos de GameCube no Nintendo Switch Online) amadurece, mas a combinação de preço alto e macroeconomia adversa impõe um teto que o antecessor não conhecia. O segundo ano — e o inevitável confronto com o lançamento de GTA VI fora do ecossistema — dirá se a Nintendo mantém a cadência.",
      },
    ],
  },
  {
    title: "Silksong, dez meses depois: o que os 7 milhões de cópias ensinam sobre paciência e escopo",
    category: "Games",
    excerpt:
      "Lançado em setembro de 2025 após seis anos de espera, o jogo da Team Cherry virou fenômeno comercial e reacendeu o debate sobre dificuldade em Metroidvanias.",
    tags: ["silksong", "hollow-knight", "team-cherry", "indie"],
    blocks: [
      {
        type: "paragraph",
        text: "Em 4 de setembro de 2025, a espera mais memeada da indústria terminou: Hollow Knight: Silksong chegou simultaneamente a PC, PlayStation, Xbox, Switch e Switch 2 — incluindo day one no Game Pass. Dez meses depois, os números confirmam o evento: mais de 7 milhões de cópias vendidas até meados de dezembro de 2025, com milhões de jogadores adicionais via assinatura.",
      },
      {
        type: "paragraph",
        text: "O contexto torna o feito mais impressionante: a Team Cherry é um estúdio independente australiano de um punhado de pessoas. Silksong nasceu como DLC do Hollow Knight original (2017) e cresceu até virar sequência completa, anunciada em fevereiro de 2019 — seis anos e meio antes do lançamento. Nesse intervalo, o silêncio do estúdio virou folclore da internet.",
      },
      { type: "heading", text: "Hornet e o debate da dificuldade" },
      {
        type: "paragraph",
        text: "No jogo, controlamos Hornet, princesa-protetora de Hallownest, levada ao reino desconhecido de Pharloom. A crítica consagrou gráficos, trilha, level design e o sistema de ferramentas e 'Crests' que diversifica os estilos de combate — mas a dificuldade elevada dividiu: para parte do público, é a identidade da série; para outra, uma barreira que o primeiro jogo dosava melhor.",
      },
      {
        type: "quote",
        text: "Silksong é o contraexemplo definitivo do 'lance logo e conserte depois': seis anos de forno, zero crunch público, e um lançamento tecnicamente impecável.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "highlight",
        text: "O jogo saiu por preço de indie — e vendeu como AAA. A margem dessa equação é provavelmente uma das maiores da história recente dos games por dólar investido.",
      },
      {
        type: "paragraph",
        text: "A lição de Silksong não escala para qualquer estúdio: poucos têm o colchão financeiro (e a confiança do público) para sumir por anos. Mas ela recoloca uma régua incômoda para a indústria: escopo controlado, equipe pequena e tempo de maturação ainda produzem os jogos mais amados — e mais lucrativos — do mercado.",
      },
    ],
  },
  {
    title: "God of War Laufey: Faye assume o centro da franquia em novo capítulo oficial",
    category: "Games",
    author: "Arthur Mendes",
    date: "2026-07-23",
    excerpt:
      "Anunciado pela Santa Monica Studio, God of War Laufey põe Faye no papel principal e revisita a figura que guiou Kratos e Atreus por toda a saga nórdica.",
    tags: ["god-of-war", "laufey", "faye", "playstation", "santa-monica-studio", "kratos", "atreus"],
    blocks: [
      {
        type: "paragraph",
        text: "A próxima protagonista de God of War não é uma aposta de rumor: a Santa Monica Studio anunciou oficialmente God of War Laufey no State of Play de 2 de junho. O novo capítulo põe Laufey, chamada de Faye pela família, no controle da aventura — uma mudança de perspectiva para uma personagem que moldou a jornada nórdica de Kratos e Atreus mesmo quando permanecia fora de cena.",
      },
      {
        type: "paragraph",
        text: "A página brasileira da PlayStation confirma o jogo para PS5, sem data de lançamento divulgada. Segundo a premissa oficial, Faye desperta em uma terra estranha depois de seu funeral e descobre que os planos que deixou para proteger Kratos e Atreus estão ameaçados. Para salvá-los, ela atravessa o Todo-Tempo (Everywhen), o pós-vida dos deuses, onde divindades de diferentes mitologias disputam poder.",
      },
      { type: "heading", text: "Quem é Laufey, a Faye de Kratos e Atreus" },
      {
        type: "paragraph",
        text: "Em God of War (2018), Faye é a esposa de Kratos e mãe de Atreus. O pedido dela para que os dois espalhem suas cinzas no pico mais alto dos Nove Reinos dá início à viagem do jogo. Só perto do fim fica claro o alcance de sua identidade: Faye era Laufey, uma jötunn, e Atreus é Loki entre os gigantes.",
      },
      {
        type: "paragraph",
        text: "Essa revelação reorganiza a leitura da aventura. As marcas nos caminhos, os murais de Jötunheim e a escolha de levar Kratos e Atreus até lá mostram que Faye tinha preparado uma rota para que pai e filho conhecessem verdades que ela não contou em vida. Ela não é uma presença decorativa ou apenas uma motivação para Kratos: é a ligação direta de Atreus com os gigantes e o ponto de encontro de duas famílias marcadas por profecias.",
      },
      { type: "heading", text: "O que Ragnarök aprofundou" },
      {
        type: "paragraph",
        text: "God of War Ragnarök tornou Faye visível em memórias de Kratos e aprofundou sua importância antes da jornada de 2018. O jogo a apresenta como uma guerreira dos gigantes, conhecida como Laufey, a Justa, e mostra sua oposição à violência dos Aesir sob Odin. Também revela que ela e Kratos encontraram uma profecia sobre a morte dele; em vez de aceitar o destino como uma ordem, Faye buscou construir escolhas que dessem a Kratos e Atreus a chance de mudá-lo.",
      },
      {
        type: "paragraph",
        text: "A relação dela com os gigantes, portanto, é central e confirmada pelos jogos. Já os Vanir fazem parte do mesmo conflito maior dos Nove Reinos, mas a narrativa publicada não estabelece uma aliança específica de Faye com esse povo. É uma distinção importante: o material oficial permite falar de sua resistência aos Aesir e de seu legado jötunn, não preencher as lacunas com relações que os jogos ainda não mostraram.",
      },
      {
        type: "quote",
        text: "Laufey sempre esteve no coração da história nórdica; agora a franquia pode mostrar o que ela fez antes de deixar pistas para os outros seguirem.",
        by: "Arthur Mendes, ARS Geek",
      },
      { type: "heading", text: "Uma história nova, sem apagar Kratos" },
      {
        type: "paragraph",
        text: "O anúncio não transforma God of War em uma série sem Kratos, nem detalha como ele e Atreus participarão da nova trama. O que foi confirmado é a troca de protagonista e a busca de Faye no Todo-Tempo. A PlayStation descreve uma guerreira de precisão, velocidade e autocontrole; por enquanto, qualquer comparação mais específica entre sistemas de combate ou promessas de cruzar mitologias além desse cenário continua sendo interpretação, não informação técnica publicada.",
      },
      {
        type: "paragraph",
        text: "É justamente aí que está o potencial narrativo. Uma campanha centrada em Faye pode explorar sua vida entre os gigantes, sua resistência aos Aesir, o encontro com Kratos e as decisões que antecedem a jornada de 2018 sem repetir a dinâmica de pai e filho. Também pode usar o novo pós-vida como espaço para contar uma aventura própria, em vez de simplesmente preencher uma cronologia conhecida.",
      },
      {
        type: "highlight",
        text: "Confirmado: God of War Laufey é um novo jogo para PS5, com Faye como protagonista e sem data de lançamento anunciada. Não confirmado: janela de estreia, plataformas adicionais e detalhes completos da jogabilidade.",
      },
      { type: "heading", text: "O que essa nova fase pode significar" },
      {
        type: "paragraph",
        text: "No Brasil, a confirmação repercutiu em veículos como Canaltech e Voxel, que destacaram a passagem de Faye de figura ausente a protagonista. A discussão faz sentido porque ela já carregava boa parte da arquitetura emocional da saga: para Kratos, foi parceira e a pessoa que o empurrou a quebrar seu ciclo de violência; para Atreus, é a origem de um nome, de uma herança e de uma escolha de futuro.",
      },
      {
        type: "paragraph",
        text: "God of War Laufey não precisa prometer uma 'nova era' por si só para ser relevante. Como capítulo oficial, ele abre uma oportunidade concreta de ampliar o universo por uma voz que os jogos anteriores mantinham nas margens. Se a Santa Monica Studio sustentar essa perspectiva com a mesma atenção dada a Kratos e Atreus, Faye pode transformar o legado que deixou em uma história que finalmente é sua.",
      },
    ],
    sources: [
      { label: "PlayStation Brasil — God of War Laufey", url: "https://www.playstation.com/pt-br/games/god-of-war-laufey/" },
      { label: "PlayStation.Blog Brasil — Primeiros detalhes de God of War Laufey", url: "https://blog.br.playstation.com/2026/06/02/primeiros-detalhes-de-god-of-war-laufey/" },
      { label: "Canaltech — Quem é a atriz que faz Faye em God of War Laufey?", url: "https://canaltech.com.br/games/quem-e-a-atriz-que-faz-faye-em-god-of-war-laufey/" },
      { label: "Voxel — Por que o novo God of War se chama Laufey?", url: "https://www.tecmundo.com.br/voxel/504470-por-que-o-novo-god-of-war-se-chama-laufey-entenda-ambientacao-do-game-estrelado-por-faye.htm" },
    ],
  },
{
  title:
    "Resident Evil Requiem: como a Capcom reencontrou a essência de Resident Evil",
  category: "Games",
  author: "Arthur Mendes",
  date: "2026-07-30",
  excerpt:
    "O aguardado retorno de Leon Kennedy, o reencontro com Raccoon City, milhões de cópias vendidas e uma expansão já confirmada fazem de Resident Evil Requiem um dos capítulos mais importantes da história da franquia.",
  tags: [
    "resident-evil",
    "resident-evil-requiem",
    "leon-kennedy",
    "grace-ashcroft",
    "capcom",
    "survival-horror",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Existem poucas franquias na história dos videogames capazes de atravessar gerações mantendo o mesmo prestígio de Resident Evil. Desde sua estreia, em 1996, a série criada pela Capcom ajudou a definir o gênero survival horror, apresentou personagens que se tornaram verdadeiros ícones da indústria e mostrou, repetidas vezes, que era capaz de evoluir sem perder sua essência.",
    },
    {
      type: "paragraph",
      text: "Essa trajetória fez de Resident Evil Requiem um dos jogos mais aguardados dos últimos anos.",
    },
    {
      type: "paragraph",
      text: "Desde o primeiro trailer, a Capcom optou por uma estratégia incomum: revelar apenas fragmentos da história e esconder detalhes importantes da campanha. Cada nova apresentação alimentava teorias da comunidade, enquanto uma pergunta dominava as discussões: quem seria o protagonista dessa nova jornada?",
    },
    {
      type: "highlight",
      text: "A resposta veio acompanhada de uma das revelações mais comemoradas pelos fãs nos últimos anos: Leon S. Kennedy estava de volta.",
    },
    {
      type: "paragraph",
      text: "O retorno de um dos personagens mais importantes da franquia representava muito mais do que um momento de nostalgia. Era um sinal de que a Capcom pretendia reconectar Resident Evil com suas próprias origens.",
    },
    {
      type: "paragraph",
      text: "Somado à chegada de uma nova protagonista, ao excelente desempenho comercial e aos planos já confirmados para expandir a experiência, Requiem rapidamente deixou de ser apenas mais um lançamento para se consolidar como um dos capítulos mais importantes da história da série.",
    },
    {
      type: "heading",
      text: "Quando o passado encontra o presente",
    },
    {
      type: "paragraph",
      text: "Durante boa parte da campanha de divulgação, a Capcom manteve em segredo informações importantes sobre seus protagonistas. A estratégia transformou cada novo trailer em motivo de especulação, com fãs analisando cenas, diálogos e pequenos detalhes em busca de pistas sobre o rumo da narrativa.",
    },
    {
      type: "paragraph",
      text: "Quando Leon S. Kennedy foi finalmente confirmado, a recepção foi praticamente imediata. O personagem, que marcou alguns dos momentos mais memoráveis da franquia, retornaria justamente ao cenário onde sua história começou: Raccoon City.",
    },
    {
      type: "paragraph",
      text: "A escolha, no entanto, foi muito além do apelo emocional.",
    },
    {
      type: "paragraph",
      text: "Em entrevista ao PlayStation Blog, o diretor Koshi Nakanishi explicou que Resident Evil Requiem nasceu da necessidade de recolocar a história principal da franquia em evidência. Depois de Resident Evil 7 e Village explorarem narrativas mais independentes, a equipe acreditava que havia chegado o momento de revisitar acontecimentos fundamentais para a série.",
    },
    {
      type: "highlight",
      text: "Para Leon, isso significa retornar ao lugar onde tudo começou — não apenas fisicamente, mas também emocionalmente.",
    },
    {
      type: "paragraph",
      text: "Raccoon City deixa de ser apenas um cenário e passa a representar um reencontro com os acontecimentos que moldaram sua trajetória. Em vez de apresentar somente um herói experiente, Requiem mostra um personagem obrigado a revisitar memórias que continuam definindo quem ele é.",
    },
    {
      type: "heading",
      text: "Grace Ashcroft e uma nova perspectiva para o horror",
    },
    {
      type: "paragraph",
      text: "Se Leon simboliza a experiência acumulada ao longo da franquia, Grace Ashcroft representa um novo olhar sobre Resident Evil.",
    },
    {
      type: "paragraph",
      text: "Segundo o produtor Masato Kumazawa, a personagem foi criada para devolver ao jogador uma sensação que sempre esteve presente nos primeiros títulos da série: a vulnerabilidade.",
    },
    {
      type: "paragraph",
      text: "Ao contrário de Leon, Grace não possui anos de treinamento nem experiência enfrentando armas biológicas. Ela reage ao desconhecido como qualquer pessoa reagiria, hesitando diante do perigo, demonstrando medo e transmitindo ao jogador uma tensão constante durante sua jornada.",
    },
    {
      type: "paragraph",
      text: "Essa diferença também influencia diretamente o ritmo da campanha.",
    },
    {
      type: "paragraph",
      text: "Enquanto Leon conduz momentos marcados pela ação e pelo combate, Grace protagoniza sequências focadas na exploração, na sobrevivência e na construção da atmosfera de terror. A alternância entre os dois personagens cria um equilíbrio que permite ao jogo unir diferentes fases da franquia em uma única experiência.",
    },
    {
      type: "heading",
      text: "Uma homenagem construída para diferentes gerações",
    },
    {
      type: "paragraph",
      text: "Um dos aspectos mais interessantes de Resident Evil Requiem é perceber que suas escolhas de design foram planejadas para dialogar com diferentes públicos.",
    },
    {
      type: "paragraph",
      text: "Os próprios desenvolvedores explicaram que cada protagonista representa uma filosofia distinta da série.",
    },
    {
      type: "paragraph",
      text: "Grace remete ao clima claustrofóbico, investigativo e psicológico que marcou Resident Evil 2. Leon, por sua vez, herda a dinâmica introduzida por Resident Evil 4, privilegiando áreas mais amplas, confrontos mais intensos e maior liberdade durante a exploração.",
    },
    {
      type: "paragraph",
      text: "Essa combinação permite que veteranos reconheçam elementos clássicos da franquia, enquanto novos jogadores encontram mecânicas modernas e acessíveis.",
    },
    {
      type: "highlight",
      text: "Mais do que revisitar o passado, Requiem demonstra que Resident Evil continua evoluindo sem abandonar aquilo que construiu sua identidade.",
    },
    {
      type: "heading",
      text: "Um sucesso confirmado também pelos números",
    },
    {
      type: "paragraph",
      text: "Nem sempre uma recepção positiva se traduz em sucesso comercial. Com Resident Evil Requiem, aconteceu exatamente o contrário.",
    },
    {
      type: "paragraph",
      text: "Segundo dados oficiais divulgados pela Capcom, o jogo ultrapassou a marca de cinco milhões de cópias vendidas poucos dias após seu lançamento.",
    },
    {
      type: "paragraph",
      text: "Pouco tempo depois, esse número chegou a seis milhões de unidades comercializadas, estabelecendo o melhor ritmo de vendas já registrado por um título da franquia.",
    },
    {
      type: "paragraph",
      text: "O desempenho confirma a excelente recepção do jogo e reforça a força de Resident Evil como uma das propriedades mais importantes da Capcom e um dos maiores nomes do gênero survival horror.",
    },
    {
      type: "heading",
      text: "O futuro da franquia já começou",
    },
    {
      type: "paragraph",
      text: "Mesmo após um lançamento histórico, Resident Evil Requiem ainda parece estar apenas iniciando sua trajetória.",
    },
    {
      type: "paragraph",
      text: "A Capcom confirmou oficialmente que o jogo receberá uma expansão inédita. Embora praticamente todos os detalhes permaneçam sob sigilo, a confirmação do novo conteúdo demonstra a confiança da empresa no projeto e aumenta a expectativa da comunidade para os próximos meses.",
    },
    {
      type: "paragraph",
      text: "Além da expansão, produtores da franquia afirmaram que Resident Evil continuará alternando lançamentos inéditos e remakes, estratégia que reforça o compromisso da Capcom em manter a série em constante evolução.",
    },
    {
      type: "highlight",
      text: "Requiem não representa apenas mais um capítulo da franquia, mas o início de uma nova fase para Resident Evil.",
    },
    {
      type: "heading",
      text: "Um capítulo que entende a essência de Resident Evil",
    },
    {
      type: "paragraph",
      text: "Existe uma razão para Resident Evil permanecer relevante depois de quase três décadas: a franquia nunca teve medo de mudar.",
    },
    {
      type: "paragraph",
      text: "Mudou sua câmera, reinventou sua jogabilidade, apresentou novos protagonistas e experimentou diferentes estilos de narrativa. Ainda assim, conseguiu preservar aquilo que sempre definiu sua identidade: a constante sensação de que o perigo pode surgir a qualquer instante.",
    },
    {
      type: "paragraph",
      text: "Resident Evil Requiem compreende essa herança.",
    },
    {
      type: "paragraph",
      text: "O retorno de Leon Kennedy, a introdução de Grace Ashcroft, o reencontro com Raccoon City e a forma como o jogo equilibra tradição e inovação demonstram que a Capcom conhece profundamente aquilo que tornou a série uma referência para o gênero.",
    },
    {
      type: "paragraph",
      text: "Resident Evil Requiem não conquistou jogadores apenas pelo retorno de Leon Kennedy ou pelos expressivos números de vendas. Seu maior feito foi provar que a franquia continua capaz de evoluir sem abandonar suas raízes.",
    },
    {
      type: "paragraph",
      text: "Ao unir personagens históricos, novas ideias e uma visão clara para o futuro, Requiem consolida-se como um dos capítulos mais importantes da história de Resident Evil e reforça que a série permanece preparada para conquistar tanto antigos fãs quanto uma nova geração de jogadores.",
    },
  ],
},
  // ── TECNOLOGIA ──────────────────────────────────────────────────────
  {
    title: "NVIDIA Vera Rubin: a plataforma de seis chips que redefine a régua da IA em 2026",
    category: "Tecnologia",
    date: "2026-07-14",
    excerpt:
      "Anunciada na CES e detalhada na GTC, a sucessora da Blackwell chega aos data centers no segundo semestre prometendo até 10x mais inferência por watt. Entenda o que muda.",
    tags: ["nvidia", "vera-rubin", "ia", "data-center", "gpu"],
    blocks: [
      {
        type: "paragraph",
        text: "Quando Jensen Huang subiu ao palco da CES 2026, em Las Vegas, para anunciar que os chips Vera Rubin já estavam em produção plena, a mensagem para a indústria foi menos sobre um produto e mais sobre um ritmo: a NVIDIA transformou em rotina anual aquilo que o resto do setor de semicondutores leva três ou quatro anos para fazer. Dois meses depois, na conferência GTC de 16 de março, a empresa abriu os detalhes técnicos da plataforma que sucede a Blackwell — e que vai definir o custo de treinar e rodar inteligência artificial na segunda metade da década.",
      },
      {
        type: "paragraph",
        text: "O nome homenageia Vera Rubin, a astrônoma americana cujas medições de rotação de galáxias forneceram as primeiras evidências convincentes da matéria escura. A escolha não é só poética: como nas gerações anteriores — Hopper em 2022, Blackwell em 2024 —, o codinome batiza uma família inteira de silício, não um único chip.",
      },
      { type: "heading", text: "Seis chips, um computador" },
      {
        type: "paragraph",
        text: "E é aí que mora a mudança conceitual mais importante. A plataforma Rubin não é uma GPU: é um conjunto de seis chips projetados para operar como um único supercomputador de IA. Além da GPU Rubin propriamente dita, o pacote inclui a CPU Vera, o switch NVLink 6 (que interliga GPUs dentro do rack), a SuperNIC ConnectX-9, a DPU BlueField-4 e o switch Ethernet Spectrum-6. A NVIDIA vende, na prática, o data center inteiro — computação, rede e movimentação de dados — como um sistema integrado.",
      },
      {
        type: "paragraph",
        text: "A configuração de referência segue sendo o rack NVL72, herdado da era Blackwell: 72 GPUs operando como um único domínio de memória. Os números divulgados pela empresa impressionam mesmo com o desconto usual de marketing: treinar grandes modelos mixture-of-experts com um quarto das GPUs que a Blackwell exigiria, e inferência com até 10 vezes mais throughput por watt, a um décimo do custo por token.",
      },
      {
        type: "quote",
        text: "A régua deixou de ser 'quantos FLOPS tem o chip' e passou a ser 'quanto custa cada token gerado'. É uma métrica de economia, não de engenharia.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "Por que watt por token virou a métrica do momento" },
      {
        type: "paragraph",
        text: "A ênfase em eficiência não é acidental. O gargalo dos data centers de IA deixou de ser a disponibilidade de chips e passou a ser energia: operadores relatam filas de anos para conexão à rede elétrica, e o custo de inferência — rodar os modelos em produção, bilhões de vezes por dia — já supera em muitas operações o custo de treinamento. A explosão dos agentes de IA, que encadeiam dezenas de chamadas de modelo para completar uma única tarefa, multiplica essa conta. Se as promessas da Rubin se confirmarem nos benchmarks independentes, o custo por token pode cair uma ordem de grandeza — o que redefine o que é economicamente viável construir com IA.",
      },
      {
        type: "paragraph",
        text: "O calendário de chegada já está definido: produtos baseados em Rubin estarão disponíveis via parceiros no segundo semestre de 2026. Entre os primeiros provedores de nuvem a implantar instâncias Vera Rubin estão AWS, Google Cloud, Microsoft e Oracle Cloud, além dos chamados NVIDIA Cloud Partners — CoreWeave, Lambda, Nebius e Nscale —, a nova camada de nuvens especializadas em GPU que cresceu à sombra da escassez de Blackwell.",
      },
      {
        type: "paragraph",
        text: "O contexto competitivo torna o anúncio ainda mais estratégico. A AMD vem ganhando tração com a linha Instinct em clientes que buscam alternativa de fornecimento, e as próprias big techs — Google com as TPUs, Amazon com Trainium, Microsoft e Meta com projetos próprios — investem pesado em silício customizado justamente para reduzir a dependência da NVIDIA. A resposta embutida na Rubin é dupla: acelerar o ritmo a ponto de tornar o custo de trocar de fornecedor sempre maior que o de continuar, e ampliar o fosso onde a concorrência menos alcança — o software. O ecossistema CUDA, com quase duas décadas de bibliotecas, ferramentas e profissionais treinados, continua sendo o ativo que nenhum concorrente replica com chips melhores.",
      },
      {
        type: "paragraph",
        text: "Há também um detalhe de arquitetura que interessa a quem acompanha a engenharia por trás do marketing: cada salto de geração depende cada vez menos do transistor e cada vez mais do sistema. A Rubin avança em memória de alta largura de banda, em interconexão (o NVLink 6 dobra a régua da geração anterior) e em desagregação do processamento de contexto — otimizações desenhadas para o perfil de carga dos modelos de raciocínio, que geram ordens de magnitude mais tokens por resposta. É a confirmação de que a era do 'chip mais rápido' deu lugar à era do rack como unidade mínima de computação.",
      },
      {
        type: "highlight",
        text: "Cadência anual confirmada: Hopper (2022), Blackwell (2024), Rubin (2026) — com as variantes 'Ultra' preenchendo os anos intermediários. Nenhum concorrente sustenta hoje esse ritmo de plataforma completa.",
      },
      { type: "heading", text: "O que isso significa para quem não compra rack" },
      {
        type: "paragraph",
        text: "Para o desenvolvedor e para a empresa brasileira que consome IA via API, a Rubin importa pelo efeito cascata: cada geração de hardware mais eficiente historicamente se traduziu, em poucos trimestres, em preços menores por token nas APIs de OpenAI, Anthropic, Google e afins — ou em modelos maiores pelo mesmo preço. Também importa para o mercado de trabalho: a onda de construção de data centers de IA é hoje um dos maiores programas de investimento de capital do planeta, e habilidades em infraestrutura, redes de alta performance e otimização de inferência estão entre as mais valorizadas do setor.",
      },
      {
        type: "paragraph",
        text: "Fica, claro, o asterisco de sempre: os números de desempenho são da própria NVIDIA, medidos nos cenários que favorecem a arquitetura nova. A régua independente — MLPerf, benchmarks de terceiros, e o boca a boca dos times de infraestrutura que receberem as primeiras unidades — só chega no fim do ano. Até lá, o que se pode afirmar com segurança é que a empresa que já domina o mercado de aceleradores de IA acaba de mostrar que não pretende desacelerar justamente no momento em que concorrentes, de AMD a chips próprios das big techs, começavam a encostar.",
      },
    ],
    sources: [
      { label: "NVIDIA Newsroom — Rubin Platform", url: "https://nvidianews.nvidia.com/news/rubin-platform-ai-supercomputer" },
      { label: "NVIDIA Newsroom — Vera Rubin Platform", url: "https://nvidianews.nvidia.com/news/nvidia-vera-rubin-platform" },
      { label: "Network World — Nvidia unveils Vera Rubin platform", url: "https://www.networkworld.com/article/4188058/nvidia-unveils-vera-rubin-platform-targeting-ai-hpc-infrastructure-customers.html" },
      { label: "Data Center Knowledge — GTC 2026", url: "https://www.datacenterknowledge.com/data-center-chips/gtc-2026-nvidia-unveils-vera-rubin-ai-platform-eyes-1t-by-2027" },
    ],
  },
  {
    title: "Windows 10 ganha sobrevida até 2027 — e o que isso diz sobre os 400 milhões de PCs sem upgrade",
    category: "Tecnologia",
    date: "2026-07-14",
    excerpt:
      "Nove meses após o fim oficial do suporte, a Microsoft estendeu de novo as atualizações de segurança gratuitas. A decisão expõe o impasse criado pelos requisitos do Windows 11.",
    tags: ["windows-10", "microsoft", "windows-11", "seguranca", "esu"],
    blocks: [
      {
        type: "paragraph",
        text: "O Windows 10 morreu oficialmente em 14 de outubro de 2025 — e segue mais vivo do que nunca. No fim de junho, a Microsoft confirmou discretamente que as atualizações de segurança gratuitas para consumidores, que terminariam em outubro de 2026, foram estendidas por mais um ano, até outubro de 2027. É a segunda sobrevida concedida ao sistema, e a mais reveladora: nove meses depois do fim formal do suporte, uma parcela gigantesca do parque mundial de PCs simplesmente não migrou.",
      },
      {
        type: "paragraph",
        text: "Para entender o tamanho do impasse, vale recapitular a linha do tempo. Quando o suporte convencional terminou, em outubro de 2025, a Microsoft ofereceu pela primeira vez aos usuários domésticos o programa ESU (Extended Security Updates), historicamente restrito a empresas. A adesão dava um ano extra de correções de segurança — até 13 de outubro de 2026 — por três caminhos: gratuitamente, ativando o backup de configurações vinculado a uma conta Microsoft; trocando 1.000 pontos do Microsoft Rewards; ou pagando uma taxa única em torno de US$ 30.",
      },
      { type: "heading", text: "O muro do TPM 2.0" },
      {
        type: "paragraph",
        text: "O problema é que boa parte dos usuários não ficou no Windows 10 por teimosia. Estimativas da indústria apontam cerca de 400 milhões de PCs ativos que não podem fazer o upgrade oficial para o Windows 11 porque o hardware não atende aos requisitos — TPM 2.0, Secure Boot e uma lista restrita de processadores suportados que, na prática, corta máquinas fabricadas antes de 2018. São computadores perfeitamente funcionais para navegar, trabalhar e estudar, colocados em rota de obsolescência por uma exigência de plataforma, não de desempenho.",
      },
      {
        type: "quote",
        text: "Pela primeira vez, o fim de vida de um Windows não esbarra na inércia do usuário, e sim num requisito de hardware que o usuário não tem como atender.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "paragraph",
        text: "Grupos de defesa do consumidor e organizações ambientais pressionaram a Microsoft desde 2024 justamente por esse ângulo: descartar centenas de milhões de máquinas funcionais seria um dos maiores eventos de lixo eletrônico da história. A extensão até 2027 é uma resposta parcial a essa pressão — e um reconhecimento tácito de que a migração forçada não aconteceu no ritmo planejado.",
      },
      {
        type: "paragraph",
        text: "O ângulo de segurança merece ser dito sem eufemismo. Um sistema operacional dominante sem correções é um alvo de valor incalculável: cada vulnerabilidade descoberta depois do fim do suporte permanece aberta para sempre em todas as máquinas não inscritas no ESU. O precedente do WannaCry, o ransomware que em 2017 paralisou hospitais e empresas explorando majoritariamente sistemas Windows desatualizados, mostra o que acontece quando uma base instalada gigante fica para trás. E o risco não é individual: máquinas comprometidas viram nós de botnets, retransmissores de phishing e portas de entrada para redes corporativas — o custo da desatualização é socializado.",
      },
      {
        type: "paragraph",
        text: "No Brasil, o problema tem contornos próprios. O parque de máquinas costuma ser mais antigo que a média dos mercados ricos — computadores de 2015 a 2018 seguem em uso intenso em pequenas empresas, escolas e órgãos públicos, exatamente a faixa cortada pelos requisitos do Windows 11. Para essas organizações, que também respondem à LGPD pela proteção dos dados que processam, operar sistemas sem patch depois de 2027 deixa de ser só um risco técnico e passa a ser um passivo de conformidade.",
      },
      { type: "heading", text: "O que fazer com cada cenário" },
      {
        type: "paragraph",
        text: "Para o usuário doméstico, o caminho pragmático é claro: inscrever-se no ESU (de preferência pela via gratuita) e usar a janela até outubro de 2027 para planejar a transição com calma. Quem tem hardware compatível com o Windows 11 deve migrar — o sistema já recebeu três grandes atualizações anuais e os atritos iniciais de interface foram, em boa parte, endereçados. Quem não tem, ganha tempo para avaliar alternativas reais: distribuições Linux amigáveis (Mint, Ubuntu, Zorin) revivem máquinas antigas com segurança em dia, e o ChromeOS Flex, do Google, faz o mesmo para quem vive no navegador.",
      },
      {
        type: "paragraph",
        text: "Para empresas, a matemática é outra. O ESU corporativo é pago e escalonado — na casa de US$ 61 por dispositivo no primeiro ano, dobrando a cada ano seguinte, por até três anos. O desenho é intencional: o preço crescente transforma a permanência no Windows 10 em decisão cada vez mais cara, empurrando cronogramas de migração, recertificação de aplicações internas e renovação de parque. Times de TI que tratarem a extensão como desculpa para adiar o inventário de compatibilidade estarão apenas comprando um problema maior para 2027.",
      },
      {
        type: "highlight",
        text: "Importante: o ESU cobre exclusivamente correções de segurança. Sem novos recursos, sem correções de bugs comuns e sem suporte técnico — é um respirador, não um tratamento.",
      },
      {
        type: "paragraph",
        text: "Há ainda o efeito colateral sobre o ecossistema de software. Navegadores, antivírus e aplicativos de produtividade historicamente mantêm suporte a versões antigas do Windows enquanto a base de usuários justifica o custo — o Chrome, por exemplo, só abandonou o Windows 7 anos depois da Microsoft. Com o Windows 10 oficialmente vivo até 2027, desenvolvedores independentes ganham um sinal claro de que ainda não podem cortar compatibilidade, o que por sua vez reduz a urgência de migração dos usuários. É um ciclo que se retroalimenta e que explica por que fins de vida de Windows raramente terminam na data marcada no calendário.",
      },
      {
        type: "paragraph",
        text: "O episódio deixa uma lição que transcende o Windows. Sistemas operacionais são infraestrutura civil digital: bilhões de pessoas dependem deles, e decisões de ciclo de vida tomadas em Redmond produzem efeitos de segurança pública — uma base instalada enorme e sem patches é um vetor de ataque para todo o ecossistema, não só para quem ficou para trás. A Microsoft ganhou tempo, os usuários ganharam fôlego. Mas o relógio de outubro de 2027 já está correndo, e desta vez a promessa é de que não haverá nova prorrogação.",
      },
    ],
    sources: [
      { label: "Microsoft Learn — Extended Security Updates para Windows 10", url: "https://learn.microsoft.com/en-us/windows/whats-new/extended-security-updates" },
      { label: "Tom's Hardware — Microsoft estende updates gratuitos até 2027", url: "https://www.tomshardware.com/software/windows/microsoft-extends-free-windows-10-security-updates-for-a-second-year" },
      { label: "Windows Latest — Suporte estendido até outubro de 2027", url: "https://www.windowslatest.com/2026/06/25/windows-10-support-quietly-extended-until-oct-2027-as-users-reject-windows-11/" },
    ],
  },
  {
    title: "Criptografia pós-quântica vira maioria: mais de 60% do tráfego web já resiste ao computador quântico",
    category: "Tecnologia",
    date: "2026-07-14",
    excerpt:
      "Sem que o usuário percebesse, a maior migração criptográfica da história cruzou o ponto de virada. O que já está protegido, o que falta — e por que a pressa faz sentido.",
    tags: ["criptografia", "pos-quantica", "seguranca", "ml-kem", "tls"],
    blocks: [
      {
        type: "paragraph",
        text: "A maior migração de infraestrutura da história da internet está acontecendo agora, e quase ninguém percebeu. Segundo a Cloudflare, que enxerga uma fração significativa do tráfego mundial, mais de 60% das conexões TLS geradas por humanos que passam por sua rede já usam criptografia pós-quântica no acordo de chaves — o mecanismo que protege tudo o que trafega entre o seu navegador e um site. Há três anos, esse número era um arredondamento de zero.",
      },
      {
        type: "paragraph",
        text: "O motivo da corrida tem nome e é menos futurista do que parece: \"harvest now, decrypt later\" — colher agora, decifrar depois. Um computador quântico capaz de quebrar a criptografia de curva elíptica que protege a web atual ainda não existe. Mas um adversário paciente pode gravar hoje o tráfego cifrado — comunicações diplomáticas, segredos industriais, prontuários — e guardá-lo até que exista uma máquina capaz de abri-lo. Para qualquer informação que precise permanecer sigilosa por dez ou vinte anos, o risco quântico não começa quando o computador quântico ficar pronto; começou quando a captura de tráfego ficou barata.",
      },
      { type: "heading", text: "Dos padrões do NIST ao seu navegador" },
      {
        type: "paragraph",
        text: "A resposta técnica ganhou forma em agosto de 2024, quando o NIST, o instituto de padrões dos EUA, finalizou os três primeiros padrões pós-quânticos após um concurso público de oito anos: o FIPS 203 (ML-KEM, derivado do Kyber) para acordo de chaves, e o FIPS 204 (ML-DSA, do Dilithium) e FIPS 205 (SLH-DSA) para assinaturas digitais. São esquemas baseados em reticulados e funções hash — problemas matemáticos para os quais não se conhece atalho quântico.",
      },
      {
        type: "paragraph",
        text: "A implantação veio na velocidade típica das gigantes de plataforma quando decidem que algo é prioridade. O Chrome habilitou o acordo de chaves híbrido por padrão ainda em 2024 e, a partir da versão 131, adotou o ML-KEM padronizado — colocando criptografia pós-quântica no handshake de bilhões de usuários sem que nenhum site precisasse fazer nada. Firefox e Edge seguiram o mesmo caminho. Na outra ponta, a Cloudflare ativou o suporte em toda a sua borda, e em março de 2026 estendeu o ML-KEM híbrido também para túneis IPsec e sua plataforma corporativa. Signal (desde 2023) e o iMessage da Apple (desde 2024) já protegem mensagens com esquemas pós-quânticos próprios.",
      },
      {
        type: "quote",
        text: "É a maior troca de fechaduras da história — feita com a internet em pleno funcionamento, sem que o morador notasse a reforma.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "O copo meio vazio: servidores, assinaturas e prazos" },
      {
        type: "paragraph",
        text: "O detalhe da palavra 'híbrido' importa: as conexões atuais combinam o esquema clássico (X25519) com o pós-quântico (ML-KEM) no mesmo handshake, de modo que a segurança só cai se ambos forem quebrados. O custo é modesto — o handshake fica maior em cerca de um kilobyte, imperceptível para o usuário — e o ganho é um seguro contra o pior cenário.",
      },
      {
        type: "paragraph",
        text: "Vale calibrar também o outro lado da equação: onde está, afinal, o computador quântico? Os maiores processadores quânticos anunciados até aqui operam na casa das centenas a poucos milhares de qubits físicos, ainda ruidosos. Quebrar RSA-2048 com o algoritmo de Shor exigiria milhões de qubits físicos corrigidos de erro operando de forma estável — uma distância de engenharia estimada em pelo menos uma década, talvez mais. Ninguém sério afirma que a ameaça é iminente; o consenso é que ela é inevitável o suficiente, e o ciclo de migração lento o suficiente, para que começar tarde seja a única forma garantida de perder a corrida.",
      },
      {
        type: "paragraph",
        text: "Mas a fotografia completa é menos animadora do que os números da borda sugerem. Um estudo de medição publicado em 2026 estima que cerca de metade dos domínios avaliados permanece integralmente na criptografia clássica, sem qualquer preparo pós-quântico — o lado servidor fora das grandes CDNs se move muito mais devagar que os navegadores. E o acordo de chaves é só metade do problema: a migração das assinaturas digitais, que sustentam certificados TLS, atualizações de software e boot seguro, mal começou, porque os esquemas pós-quânticos de assinatura são maiores e exigem mudanças em cadeias inteiras de confiança.",
      },
      {
        type: "paragraph",
        text: "Essa assimetria tem uma razão técnica interessante: no acordo de chaves, basta que navegador e servidor concordem em usar o esquema novo — a troca é invisível para o resto do mundo. Já uma assinatura precisa ser verificável por toda a cadeia que depende dela, de autoridades certificadoras a dispositivos embarcados que nunca receberão atualização. É por isso que a indústria atacou primeiro o problema urgente (o tráfego capturável hoje) e deixou para a próxima etapa o problema estrutural (a identidade e a integridade de longo prazo).",
      },
      {
        type: "highlight",
        text: "Os prazos regulatórios já estão na mesa: Google e Cloudflare miram 2029 para concluir a migração interna, e a NSA exige criptografia pós-quântica em sistemas de segurança nacional dos EUA entre 2030 e 2033. Quem opera software com horizonte de década já está, tecnicamente, atrasado.",
      },
      {
        type: "paragraph",
        text: "Para quem desenvolve ou opera sistemas, a recomendação prática é começar pelo inventário criptográfico: saber onde a sua stack usa RSA e curvas elípticas, quais bibliotecas já suportam ML-KEM (OpenSSL 3.5+, BoringSSL, e as principais linguagens já têm suporte nativo ou via biblioteca) e o que depende de terceiros. Quem serve tráfego atrás de uma CDN moderna provavelmente já está coberto na borda sem ter feito nada — mas a conexão entre a CDN e a origem, os túneis VPN, as filas internas e os bancos de dados seguem no regime clássico até que alguém os inventarie.",
      },
      {
        type: "paragraph",
        text: "A boa notícia deste 2026 é que, pela primeira vez numa transição criptográfica, a infraestrutura pública andou antes da ameaça se materializar — quando o SHA-1 e o MD5 caíram, a corrida foi para apagar incêndio; desta vez, os padrões, as bibliotecas e os navegadores chegaram com anos de antecedência. A má notícia é que a cauda longa — servidores, firmware, IoT, sistemas legados — é exatamente onde essas transições costumam levar décadas. O computador quântico útil pode demorar; os dados capturados hoje não expiram.",
      },
    ],
    sources: [
      { label: "NIST — Padrões de criptografia pós-quântica (FIPS 203/204/205)", url: "https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards" },
      { label: "Cloudflare — Post-quantum cryptography (documentação)", url: "https://developers.cloudflare.com/ssl/post-quantum-cryptography/" },
      { label: "Cloudflare Blog — PQC na plataforma SASE", url: "https://blog.cloudflare.com/post-quantum-sase/" },
      { label: "InfoQ — Cloudflare adota ML-KEM híbrido em IPsec", url: "https://www.infoq.com/news/2026/03/cloudflare-post-quantum-ipsec/" },
      { label: "arXiv — Measurement Study of Post-Quantum Readiness (2026)", url: "https://arxiv.org/pdf/2606.16473" },
    ],
  },
  {
    title: "Fatal Fury: City of the Wolves confirma Season 3 para julho — mas o line-up de lutadores ainda é segredo",
    category: "Games",
    date: "2026-07-14",
    excerpt:
      "A SNK anunciou oficialmente que a nova temporada de conteúdo começa em julho de 2026, mas ainda não revelou nenhum personagem — apesar dos teasers que já circulam entre os fãs.",
    tags: ["fatal-fury", "city-of-the-wolves", "snk", "season-3", "fighting-games"],
    blocks: [
      {
        type: "paragraph",
        text: "A SNK fechou um ciclo e abriu outro na mesma semana. Durante a EVO 2026, o produtor Yasuyuki Oda subiu ao palco antes das finais de Fatal Fury: City of the Wolves para confirmar duas coisas: Kenshiro, de Hokuto no Ken (Fist of the North Star), chegava como o lutador final da Season 2 — e a Season 3 do jogo começa em julho de 2026. O anúncio foi formalizado em comunicado oficial no site da SNK Corporation no mesmo dia.",
      },
      {
        type: "paragraph",
        text: "É a confirmação que os jogadores competitivos esperavam: depois de quase um ano de suporte contínuo, com passes de temporada trazendo lutadores clássicos e convidados de crossover, a SNK garante que o ciclo de vida do jogo segue firme para 2026 e além.",
      },
      { type: "heading", text: "O que a SNK confirmou — e o que não confirmou" },
      {
        type: "paragraph",
        text: "Aqui vale separar com precisão o que é fato do que é expectativa. O comunicado oficial da SNK confirma apenas o mês de início — julho de 2026 — sem cravar um dia exato. Não há, até a publicação desta matéria, nenhum personagem oficialmente revelado para a Season 3, nenhum novo modo de jogo anunciado e nenhuma informação sobre a estrutura do conteúdo (se virá como Season Pass 3, no mesmo formato de compra da temporada anterior, ou em outro modelo). A frase literal do próprio comunicado da SNK resume a situação: mais detalhes serão revelados 'em devido tempo' — a empresa optou por confirmar a existência da temporada sem antecipar o conteúdo.",
      },
      {
        type: "quote",
        text: "SNK confirmou a data, não o elenco. É a diferença entre saber que a festa vai acontecer e saber quem foi convidado.",
        by: "Renato Brito, ARS Geek",
      },
      {
        type: "paragraph",
        text: "O que circula com força na comunidade — e que este texto trata como especulação, não fato — são teasers visuais que a própria SNK publicou em suas redes oficiais nas semanas anteriores ao anúncio, sugerindo o retorno de Rick Strowd. Veículos especializados como EventHubs e Shacknews também apontam Duck King, Kim Kaphwan e Laocorn Gaudeamus como apostas prováveis para o próximo lote de DLCs, mantendo o ritmo de 'um lutador por mês' que a SNK vinha seguindo na Season 2. Nenhum desses nomes, porém, foi oficialmente anunciado pela SNK até o momento — são teasers e análises de padrão, não confirmações.",
      },
      { type: "heading", text: "O que já está garantido" },
      {
        type: "paragraph",
        text: "Fora o mistério do elenco, um ponto é tranquilizador: a Season 3 chega nas mesmas plataformas já disponíveis hoje — PlayStation 5, PlayStation 4, Xbox Series X|S, Steam e Epic Games Store. Não há sinal de fragmentação de plataforma nem de exclusividade temporária, o que preserva o cross-play e a base de jogadores unificada que City of the Wolves construiu desde o lançamento.",
      },
      {
        type: "highlight",
        text: "Resumo do que é fato: Season 3 confirmada, início em julho de 2026, mesmas plataformas. Resumo do que é rumor: os nomes de Duck King, Kim Kaphwan, Rick Strowd e Laocorn Gaudeamus, baseados em teasers e análise de padrão — não em anúncio oficial da SNK.",
      },
      {
        type: "paragraph",
        text: "Para o jogador competitivo, a notícia importa por manter o meta vivo: cada temporada nova reorganiza tier lists e obriga replanejamento de matchups. Para o jogador casual, é sinal de que o suporte ao jogo segue robusto — poucos jogos de luta sustentam três temporadas de conteúdo com a regularidade que a SNK vem entregando. A confirmação de julho garante que a espera tem prazo; o restante, por enquanto, segue em aberto — e a SNK prometeu voltar com mais detalhes antes do lançamento.",
      },
    ],
    sources: [
      { label: "SNK Corporation — Comunicado oficial (Season 3 begins July 2026)", url: "https://www.snk-corp.co.jp/us/press/2026/kenshiro-from-fist-of-the-north-star-hokuto-no-ken-hits-city-of-the-wolves-season-2-a-hundred-times-over-season-3-begins-july-2026-prepare-to-unleash-more-fury/" },
      { label: "SNK — Página oficial de Fatal Fury: City of the Wolves", url: "https://www.snk-corp.co.jp/us/games/fatalfury-cotw/" },
      { label: "EventHubs — Season 3 announced", url: "https://www.eventhubs.com/news/2026/jun/28/fatal-fury-season-3-announced/" },
      { label: "EventHubs — SNK teases Rick Strowd", url: "https://www.eventhubs.com/news/2026/jun/08/snk-tease-rick-strowd-ffcotw/" },
    ],
  },
  {
    title: "Bleach se aproxima do fim: a temporada final encerra a jornada de Ichigo Kurosaki",
    category: "Animes",
    date: "2026-07-14",
    excerpt:
      "A quarta e última parte de Thousand-Year Blood War chega para fechar, de vez, a saga de Ichigo Kurosaki — o desfecho que fãs de Bleach esperam há mais de uma década.",
    tags: ["bleach", "thousand-year-blood-war", "the-calamity", "ichigo-kurosaki", "tite-kubo"],
    blocks: [
      {
        type: "paragraph",
        text: "Depois de quatro cours espalhados por quatro anos, Bleach: Thousand-Year Blood War chega ao fim. A Parte 4, subtitulada The Calamity (禍進譚, Kashin-tan), é oficialmente a última leva de episódios da adaptação do arco final do mangá de Tite Kubo — o encerramento definitivo de uma história que fãs antigos acompanham desde o início dos anos 2000, e que uma nova geração descobriu graças ao retorno do anime em 2022.",
      },
      {
        type: "paragraph",
        text: "Não é só mais uma estreia de temporada. É o fechamento de um ciclo que a própria indústria do anime tratava como inacabado havia mais de dez anos — e a chance, rara em qualquer franquia desse porte, de dar a uma das maiores histórias do gênero shonen o final que ela sempre mereceu.",
      },
      { type: "heading", text: "Quando estreia, de fato, a temporada final" },
      {
        type: "paragraph",
        text: "A data oficial de estreia, confirmada pela Viz Media e pelo site oficial japonês da franquia, é 25 de julho de 2026, com transmissão simultânea na Tokyo TV, no Japão, e streaming internacional via Hulu, nos Estados Unidos, e Disney+ nos demais mercados fora da Ásia — o mesmo esquema mantido desde a Parte 1, em 2022. Vale um esclarecimento rápido: a data de 25 de junho, que também circula entre fãs, não é a estreia — corresponde a uma exibição limitada dos três primeiros episódios em cinemas dos Estados Unidos, promovida pela Fathom Entertainment em parceria com a Viz Media, como antecipação promocional antes do lançamento real em julho.",
      },
      {
        type: "paragraph",
        text: "Sobre o Brasil, nenhum comunicado cita o país nominalmente, mas o padrão histórico de distribuição — Disney+ para os mercados internacionais fora da Ásia, mantido desde 2022 e já válido para as três partes disponíveis no catálogo brasileiro — sugere que a Parte 4 deve seguir o mesmo caminho por aqui.",
      },
      { type: "heading", text: "O que esta temporada final deve encerrar" },
      {
        type: "paragraph",
        text: "Sem entrar em detalhes que estragariam a experiência de quem ainda vai assistir, The Calamity deve fechar as pontas mais importantes da Guerra de Mil Anos: o desfecho do confronto entre a Sociedade das Almas e o exército Quincy liderado por Yhwach, o destino que aguarda o mundo humano e a Soul Society depois de tanta destruição e, acima de tudo, o capítulo final da jornada pessoal de Ichigo Kurosaki, o protagonista que carrega a série desde o primeiro episódio, em 2004.",
      },
      {
        type: "quote",
        text: "Não é apenas o fim de um arco. É o fechamento de uma trajetória que moldou uma geração inteira de leitores e espectadores de anime.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "Por que esse encerramento pesa tanto para os fãs" },
      {
        type: "paragraph",
        text: "Para entender o peso do momento, é preciso lembrar de onde Bleach veio. Lançado em 2001 na Weekly Shōnen Jump, o mangá de Tite Kubo se tornou, ao lado de Naruto e One Piece, um dos pilares da chamada 'Big Three' que definiu o shonen dos anos 2000. O anime original, porém, chegou ao fim em 2012 sem nunca ter adaptado o arco Thousand-Year Blood War — na época, o desfecho da saga em anime simplesmente não existia, e uma geração inteira de fãs cresceu sem ver a conclusão da história na tela.",
      },
      {
        type: "paragraph",
        text: "Foi só em 2020 que o Bleach 20th Anniversary Project trouxe a notícia que parecia improvável: o arco final finalmente ganharia uma adaptação completa em anime. Desde a retomada, em 2022, a Studio Pierrot vem entregando cours cada vez mais ambiciosos, com direção-geral de Tomohisa Taguchi e, nesta parte final, Hikaru Murata na direção — e agora chega à reta final daquilo que muitos fãs já haviam dado como perdido.",
      },
      {
        type: "highlight",
        text: "Do lançamento do mangá, em 2001, à conclusão do anime, em 2026: são quase 25 anos de história convergindo para estes episódios finais.",
      },
      { type: "heading", text: "O que os fãs esperam da despedida" },
      {
        type: "paragraph",
        text: "A expectativa em torno de The Calamity passa por vários pontos. Tite Kubo segue pessoalmente envolvido na produção — ele escolheu as músicas-tema de todas as quatro partes, incluindo a abertura 'I-Bull', de Jo0ji, e o encerramento 'Rasen', de 9Lana, reveladas para este capítulo final. Relatos da imprensa especializada também apontam que a Parte 4 deve trazer ainda mais conteúdo original em relação ao mangá, expandindo as batalhas finais além do que Kubo desenhou nas páginas — uma aposta que, se bem executada, pode dar ainda mais peso dramático ao desfecho.",
      },
      {
        type: "paragraph",
        text: "Também pesa a régua que a própria Pierrot construiu: as três partes anteriores já elevaram consideravelmente o nível de animação e direção de combate da franquia, e a torcida geral é que a equipe entregue, nesta reta final, o mesmo capricho nas cenas que os fãs esperam há mais de uma década para ver na tela. Como sempre acontece perto de um final tão aguardado, especulações sobre o que vai acontecer circulam com força — mas até a estreia, o conteúdo real da temporada segue sob sigilo, e vale tratar qualquer 'vazamento' com a devida desconfiança.",
      },
      {
        type: "paragraph",
        text: "Quando os créditos finais de The Calamity subirem, não vai ser apenas mais um anime chegando ao fim. Vai ser o encerramento de uma jornada que atravessou quase 25 anos, sobreviveu a um hiato de uma década sem conclusão em tela e volta agora para entregar aos fãs — antigos e novos — o final que Ichigo Kurosaki e sua história sempre mereceram.",
      },
    ],
    sources: [
      { label: "Wikipedia — Bleach: Thousand-Year Blood War", url: "https://en.wikipedia.org/wiki/Bleach:_Thousand-Year_Blood_War" },
      { label: "Site oficial japonês da Bleach — key visual e data de estreia", url: "https://bleach-anime.com/" },
      { label: "Variety — Bleach: TYBW – The Calamity sets release date", url: "https://variety.com/2026/tv/news/bleach-thousand-year-blood-war-the-calamity-release-date-hulu-disney-1236799220/" },
      { label: "CBR — Bleach final anime season confirmation", url: "https://www.cbr.com/bleach-final-anime-season-june-2026/" },
      { label: "Anime Corner — Temas musicais e key visual", url: "https://animecorner.me/bleach-tybw-part-4-final-season-premieres-on-july-25-main-visual-and-theme-songs-by-jo0ji-and-9lana-revealed/" },
    ],
  },
  {
    title: "Crunchyroll retira 15 títulos no Brasil em julho de 2026 - veja a lista completa",
    category: "Animes",
    date: "2026-07-22",
    excerpt:
      "Quatorze animes e um filme live-action deixaram a Crunchyroll no Brasil desde 14 de julho, sem aviso oficial. Confira a lista e o impacto para assinantes.",
    tags: ["crunchyroll", "streaming", "catalogo", "licenciamento", "anime"],
    blocks: [
      {
        type: "paragraph",
        text: "A Crunchyroll retirou 15 títulos de seu catálogo brasileiro ao longo de julho de 2026, em uma mudança que começou a ser percebida no dia 14. A lista, levantada pela ANMTV e acompanhada por veículos brasileiros especializados, reúne produções que já não podem ser reproduzidas normalmente no país — inclusive obras que tinham dublagem em português.",
      },
      {
        type: "paragraph",
        text: "Há uma correção importante em relação à forma como a notícia circulou: não são exatamente 15 animes. O pacote é formado por 14 produções animadas e As the Gods Will, filme japonês em live-action. Para quem assina o serviço, a diferença não reduz o impacto: séries salvas na lista ou em andamento deixaram de estar disponíveis sem que a Crunchyroll publicasse um aviso específico sobre essa leva de remoções.",
      },
      { type: "heading", text: "Os 15 títulos removidos da Crunchyroll no Brasil" },
      {
        type: "paragraph",
        text: "1. Blood Blockade Battlefront (Kekkai Sensen) — Ação e fantasia urbana do estúdio Bones sobre uma Nova York tomada por criaturas sobrenaturais. As duas temporadas do anime, lançadas em 2015 e 2017, saíram do catálogo; com isso, a dublagem brasileira também deixou de ser acessível pela plataforma.",
      },
      {
        type: "paragraph",
        text: "2. Black Lagoon — Produção do estúdio Madhouse centrada em mercenários e no submundo do Sudeste Asiático. O anime tem duas temporadas televisivas, além da série de OVAs Roberta's Blood Trail, e é uma das obras de ação adulta mais conhecidas dos anos 2000.",
      },
      {
        type: "paragraph",
        text: "3. Fate/kaleid liner PRISMA ILLYA — Spin-off de Fate que transforma Illyasviel em uma garota mágica. A animação teve quatro temporadas de TV entre 2013 e 2016, além de especiais e filmes; sua página permanece no site da Crunchyroll, mas informa que os vídeos não estão disponíveis.",
      },
      {
        type: "paragraph",
        text: "4. Rokka: Braves of the Six Flowers (Rokka no Yuusha) — Fantasia com mistério em uma única temporada de 12 episódios. A obra também tem importância local: foi o primeiro anime dublado em português pela própria Crunchyroll, e essa versão ficou indisponível com a retirada.",
      },
      {
        type: "paragraph",
        text: "5. Endride — Aventura de fantasia original sobre um jovem levado ao mundo subterrâneo de Endra. A série foi exibida em 2016 e conta com 24 episódios.",
      },
      {
        type: "paragraph",
        text: "6. Moeyo Ken — Comédia de fantasia histórica que mistura samurais, criaturas sobrenaturais e uma versão alternativa de Kyoto. A série televisiva de 2005 tem 13 episódios.",
      },
      {
        type: "paragraph",
        text: "7. Sakura Quest — Anime do estúdio P.A. Works sobre cinco mulheres envolvidas na tentativa de revitalizar uma pequena cidade rural. A história de trabalho e cotidiano foi concluída em 25 episódios, exibidos em 2017.",
      },
      {
        type: "paragraph",
        text: "8. BEM — Releitura de 2019 do clássico Humanoid Monster Bem, acompanhando três humanoides que combatem monstros enquanto procuram se tornar humanos. A temporada tem 12 episódios.",
      },
      {
        type: "paragraph",
        text: "9. Trickster — Mistério e ficção científica inspirado nos personagens do escritor Edogawa Ranpo, transportados para um cenário futurista. O anime teve 24 episódios entre 2016 e 2017.",
      },
      {
        type: "paragraph",
        text: "10. The Melancholy of Haruhi-chan Suzumiya & Nyoron! Churuya-san — Duas séries de curtas cômicos derivadas do universo de Haruhi Suzumiya, publicadas originalmente na internet. Ambas foram retiradas como um único item do catálogo.",
      },
      {
        type: "paragraph",
        text: "11. Regalia: The Three Sacred Stars — Anime original de mecha sobre as irmãs Yui e Rena e máquinas gigantes conhecidas como Regalia. A série de 2016 foi concluída em 13 episódios.",
      },
      {
        type: "paragraph",
        text: "12. Sasami: Magical Girls Club — Série de garotas mágicas ligada à franquia Tenchi Muyo!, mas ambientada em uma continuidade própria. Suas duas temporadas somam 26 episódios.",
      },
      {
        type: "paragraph",
        text: "13. Orange — Drama escolar com romance e ficção científica no qual Naho recebe cartas enviadas por seu eu do futuro. O anime de 13 episódios também tinha dublagem em português, agora inacessível na Crunchyroll brasileira.",
      },
      {
        type: "paragraph",
        text: "14. Barakamon — Comédia slice of life sobre um jovem calígrafo que se muda para as ilhas Goto e amadurece no convívio com a comunidade local. A série tem 12 episódios e é bastante lembrada pelo tom leve e humano.",
      },
      {
        type: "paragraph",
        text: "15. As the Gods Will — O único título da lista que não é anime. Trata-se do filme live-action de 2014 dirigido por Takashi Miike, no qual estudantes são forçados a participar de jogos mortais inspirados em brincadeiras infantis.",
      },
      {
        type: "highlight",
        text: "No recorte brasileiro, a contagem exata é de 15 títulos removidos: 14 animes e um filme live-action. A retirada começou a ser identificada em 14 de julho de 2026.",
      },
      { type: "heading", text: "Por que animes são removidos dos catálogos?" },
      {
        type: "paragraph",
        text: "Serviços de streaming não mantêm automaticamente os direitos de uma obra para sempre. Os contratos podem expirar, deixar de ser renovados, passar para outro detentor ou conter limitações por país. Acordos de exclusividade também podem deslocar uma produção de uma plataforma para outra. A própria Central de Ajuda da Crunchyroll explica que a disponibilidade varia entre regiões por causa das licenças concedidas em cada território.",
      },
      {
        type: "paragraph",
        text: "Neste caso, porém, a Crunchyroll não publicou um comunicado explicando o motivo de cada retirada no Brasil. O vencimento ou a reorganização de licenças é uma explicação provável — especialmente porque parte das obras veio do antigo catálogo da Funimation —, mas não pode ser apresentada como causa oficialmente confirmada. Os títulos ainda podem retornar se novos acordos forem fechados.",
      },
      {
        type: "quote",
        text: "Licenciamento é a explicação mais plausível para a mudança, não uma justificativa oficial da Crunchyroll para estes 15 títulos.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "O impacto para os assinantes brasileiros" },
      {
        type: "paragraph",
        text: "A saída é sentida primeiro por quem estava no meio de uma temporada ou mantinha um dos títulos na lista para assistir depois. Um card pode desaparecer da busca, ficar sem episódios reproduzíveis ou continuar com uma página informativa vazia, o que torna a mudança pouco clara para o usuário.",
      },
      {
        type: "paragraph",
        text: "No Brasil, a perda de faixas em português pesa especialmente. As dublagens de Blood Blockade Battlefront, Rokka e Orange ficaram sem acesso oficial pela Crunchyroll após as remoções. Mesmo quando uma obra reaparece em outro serviço, ela pode chegar apenas legendada ou com um pacote diferente de idiomas, fragmentando ainda mais a experiência entre várias assinaturas.",
      },
      { type: "heading", text: "Onde assistir aos títulos removidos" },
      {
        type: "paragraph",
        text: "Até o fechamento desta matéria, não havia uma nova plataforma legal confirmada para receber no Brasil o conjunto de títulos retirados. A exceção localizada foi Fate/kaleid liner PRISMA ILLYA: o JustWatch indicava uma temporada no Koiplay Amazon Channel, enquanto as demais temporadas continuavam sem uma alternativa confirmada. Para Rokka, o agregador não apontava nenhuma opção de streaming no país.",
      },
      {
        type: "paragraph",
        text: "Como catálogos mudam e bases de busca podem levar algum tempo para atualizar, vale conferir a disponibilidade diretamente no aplicativo de cada serviço antes de contratar uma assinatura. A ausência atual não significa que as séries tenham desaparecido em definitivo: novos contratos podem recolocá-las na Crunchyroll ou levá-las a outra plataforma. Por enquanto, a recomendação segura é acompanhar os canais oficiais e evitar páginas não autorizadas.",
      },
      { type: "heading", text: "Uma mudança de catálogo que merece atenção" },
      {
        type: "paragraph",
        text: "As remoções de julho mostram por que a lista de um streaming não funciona como uma coleção permanente. Para o público brasileiro, a falta de aviso oficial e a perda de versões dubladas tornam o impacto maior do que uma simples troca de prateleira digital. Acompanhar anúncios, revisar a fila de episódios e verificar periodicamente os títulos salvos continua sendo a melhor forma de não ser surpreendido por novas saídas.",
      },
    ],
    sources: [
      { label: "ANMTV — 15 títulos removidos da Crunchyroll em julho", url: "https://anmtv.com.br/crunchyroll-15-animes-foram-removidos-do-catalogo-da-plataforma-no-mes-de-julho/" },
      { label: "Brasil Anime Café — Atualizações do catálogo brasileiro em julho de 2026", url: "https://brasilanimecafe.com.br/lancamentos-de-animes-da-crunchyroll-pra-temporada-de-verao-2026/" },
      { label: "Crunchyroll — Por que não posso assistir a alguns títulos na minha região?", url: "https://help.crunchyroll.com/hc/en-us/articles/43269213267092-Why-can-t-I-watch-certain-shows-in-my-region" },
      { label: "Crunchyroll — Fate/kaleid liner PRISMA ILLYA", url: "https://www.crunchyroll.com/series/GRDQV79DY/fatekaleid-liner-prisma-illya" },
      { label: "JustWatch Brasil — Fate/kaleid liner PRISMA ILLYA", url: "https://www.justwatch.com/br/serie/fate-kaleid-liner-purizumairiya" },
      { label: "JustWatch Brasil — Rokka: Braves of the Six Flowers", url: "https://www.justwatch.com/br/serie/liu-hua-noyong-zhe" },
    ],
  },
  {
    title: "Kevin Feige projeta MCU mais simples após Guerras Secretas, com X-Men no centro",
    category: "Filmes",
    date: "2026-07-22",
    excerpt:
      "Kevin Feige descreve um MCU de linha única após Vingadores: Guerras Secretas e coloca os X-Men no centro da próxima era da Marvel.",
    tags: ["kevin-feige", "guerras-secretas", "x-men", "mcu", "marvel-studios"],
    blocks: [
      {
        type: "paragraph",
        text: "O futuro do Universo Cinematográfico Marvel ganhou um contorno mais claro. Em declarações feitas em momentos distintos, Kevin Feige, presidente da Marvel Studios, apontou Vingadores: Guerras Secretas como ponto de virada para uma continuidade mais simples e para uma fase em que os X-Men devem ocupar papel central. Não é o anúncio de que todo o MCU será apagado; é a indicação de uma reorganização planejada depois do grande encontro de realidades que o estúdio vem construindo.",
      },
      {
        type: "paragraph",
        text: "Para o público brasileiro, a novidade importa menos por prometer uma resposta imediata e mais por explicar a direção da franquia nos próximos anos. Até aqui, não há data brasileira divulgada para Guerras Secretas nem calendário local de filmes posterior ao longa. O que existe são declarações sobre a estratégia criativa, não uma lista fechada de estreias, personagens ou elencos.",
      },
      { type: "heading", text: "O que Kevin Feige efetivamente declarou" },
      {
        type: "paragraph",
        text: "Em julho de 2025, em conversa com a imprensa repercutida pela Variety, Feige afirmou que Guerras Secretas serviria para concluir as histórias contadas desde Ultimato e, ao mesmo tempo, preparar o futuro. Na ocasião, ele evitou chamar a mudança de reboot: preferiu falar em um reset e em pensar numa linha do tempo singular. Também confirmou que o novo filme dos X-Men receberá atores diferentes dos intérpretes associados às produções da Fox.",
      },
      {
        type: "paragraph",
        text: "Mais recentemente, durante o Bilibili World, em Xangai, a fala de Feige foi repercutida no Brasil pela ANMTV. Segundo a tradução publicada pelo veículo, Guerras Secretas deve estabelecer um universo único, simplificado e mais fácil de acompanhar, preservando alguns elementos familiares enquanto introduz muitos outros. A expressão é relevante: ele falou em um próximo universo e em simplificação, não em apagar toda a continuidade anterior.",
      },
      {
        type: "highlight",
        text: "O termo sustentado pelas declarações é reset, com uma linha do tempo mais simples — não um reboot completo confirmado para cada personagem do MCU.",
      },
      { type: "heading", text: "O papel de Vingadores: Guerras Secretas" },
      {
        type: "paragraph",
        text: "A Marvel mantém Guerras Secretas anunciado em seu calendário internacional para 2027, com Joe e Anthony Russo na direção. Esse calendário, porém, não substitui uma confirmação de data de lançamento no Brasil; por isso, a estreia brasileira não é tratada aqui como definida. O filme sucede Vingadores: Doutor Destino na programação dos Vingadores e deve funcionar como a ponte entre a atual fase de histórias multiversais e a etapa seguinte.",
      },
      {
        type: "paragraph",
        text: "Nos quadrinhos, Secret Wars é o nome de eventos diferentes. A Marvel destaca que a saga de 2015, de Jonathan Hickman, envolve o colapso de universos e a formação de Battleworld. Isso ajuda a entender por que fãs relacionam o filme a uma reorganização de continuidade, mas não confirma Battleworld, adaptações literais, mortes ou qualquer detalhe do roteiro do longa.",
      },
      {
        type: "quote",
        text: "Guerras Secretas foi apresentado como uma passagem para o futuro do MCU, não como uma autorização para tratar teorias de enredo como anúncio oficial.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "Os X-Men no centro da próxima era" },
      {
        type: "paragraph",
        text: "O ponto mais concreto do novo discurso é a prioridade dos mutantes. Feige descreveu os X-Men como mais do que uma equipe ou um único personagem: para ele, representam um universo capaz de sustentar uma saga de várias etapas. A Variety também informou que o próximo filme da equipe será dirigido por Jake Schreier, de Thunderbolts*, e usará um novo elenco depois de Guerras Secretas.",
      },
      {
        type: "paragraph",
        text: "Isso separa duas coisas que às vezes se confundem nas redes. Participações de atores da era Fox em histórias multiversais não equivalem à confirmação de que aqueles mesmos intérpretes formarão a equipe permanente da Marvel Studios. Tampouco há elenco, título definitivo, sinopse ou data brasileira anunciados para o filme dos X-Men. A promessa oficial é de uma nova etapa; sua escala ainda depende dos próximos anúncios.",
      },
      { type: "heading", text: "Reset, recast e reboot não são a mesma coisa" },
      {
        type: "paragraph",
        text: "Um reboot completo descartaria a continuidade para recomeçar tudo do zero. Um recast troca intérpretes, mas não determina sozinho o que permanece válido na história. Já uma reorganização de continuidade pode reunir elementos de diferentes fases numa mesma linha temporal sem eliminar automaticamente todos os acontecimentos anteriores. Foi essa terceira via — um reset orientado por uma linha única — que Feige associou ao período pós-Guerras Secretas.",
      },
      {
        type: "paragraph",
        text: "Portanto, dizer que o MCU inteiro será reiniciado ou que personagens específicos já ganharam novos atores vai além do que foi confirmado. Há sinal verde para uma nova formação dos X-Men e para uma continuidade mais acessível; o restante continua no campo da interpretação jornalística e da expectativa dos fãs.",
      },
      { type: "heading", text: "O que muda para os fãs no Brasil" },
      {
        type: "paragraph",
        text: "Uma linha de entrada mais clara pode ser especialmente útil para quem acompanha a Marvel pelos cinemas e pelo streaming no Brasil, mas não conseguiu seguir cada ramificação do multiverso. Ainda assim, não há anúncio de estratégia brasileira específica, calendário local pós-Guerras Secretas ou mudança confirmada nas plataformas. A repercussão por aqui é, por enquanto, a de uma franquia preparando terreno para receber os mutantes com identidade própria.",
      },
      {
        type: "paragraph",
        text: "O que está confirmado é a direção: Guerras Secretas antecede uma fase mais concentrada e os X-Men estão no centro dela. O que ainda não está é justamente o que mais desperta curiosidade — quem estará na equipe, quais histórias chegarão primeiro e quando o público brasileiro verá esses filmes. Até novos comunicados da Marvel Studios, prudência vale mais do que qualquer lista de rumores.",
      },
    ],
    sources: [
      { label: "Variety — Kevin Feige sobre reset, linha do tempo singular e recast dos X-Men", url: "https://au.variety.com/2025/film/news/marvel-x-men-recasting-secret-wars-25370/" },
      { label: "ANMTV — Declarações de Feige sobre o futuro do MCU e os X-Men", url: "https://anmtv.com.br/marvel-studios-kevin-feige-fala-sobre-os-x-men-e-futuro-do-mcu/" },
      { label: "Marvel — Página oficial de Vingadores: Guerras Secretas", url: "https://www.marvel.com/movies/avengers-secret-wars" },
      { label: "Marvel — Guia oficial para as sagas Secret Wars nos quadrinhos", url: "https://www.marvel.com/articles/comics/secret-wars-official-marvel-guide" },
    ],
  },
  {
    title: "Trailer final de Homem-Aranha: Um Novo Dia relembra Peter antes da estreia no Brasil",
    category: "Filmes",
    date: "2026-07-22",
    excerpt:
      "Trailer final dublado de Homem-Aranha: Um Novo Dia retoma a trajetória de Peter Parker filme chega aos cinemas brasileiros em 29 de julho.",
    tags: ["homem-aranha", "um-novo-dia", "trailer-final", "sony-pictures-brasil", "tom-holland"],
    blocks: [
      {
        type: "paragraph",
        text: "A Sony Pictures Brasil publicou o trailer final dublado de Homem-Aranha: Um Novo Dia em 21 de julho. Batizada de A Jornada de Peter, a prévia troca a lógica de revelar cada vez mais do enredo por uma recapitulação emocional do caminho de Peter Parker até aqui — e chega a poucos dias da estreia brasileira, marcada para 29 de julho, exclusivamente nos cinemas.",
      },
      {
        type: "paragraph",
        text: "O nome de trailer final não é apenas um rótulo de imprensa: ele aparece no título do vídeo oficial do canal verificado da Sony Pictures Brasil. É a versão adequada para o público local, com dublagem e o título brasileiro confirmado pela própria distribuidora: Homem-Aranha: Um Novo Dia.",
      },
      { type: "heading", text: "O que a prévia final mostra" },
      {
        type: "paragraph",
        text: "O vídeo revisita momentos da trilogia de Tom Holland e coloca em primeiro plano as relações de Peter com MJ e Ned. Depois, volta ao presente: o herói atua sozinho em uma Nova York que não se lembra de sua identidade, enquanto seus antigos amigos seguem a vida sem ele. É uma escolha de montagem que reforça a consequência emocional do filme anterior sem transformar a prévia em uma explicação longa para quem já conhece a saga.",
      },
      {
        type: "paragraph",
        text: "Nas cenas de ação, o trailer mostra o Escorpião e o Hulk. O material não identifica o grande antagonista que a sinopse chama de uma ameaça poderosa que ninguém consegue enxergar; por isso, atribuir uma identidade a essa figura seria especulação. A prévia também não esclarece o papel de Sadie Sink, apesar de a atriz constar na lista oficial de elenco.",
      },
      {
        type: "highlight",
        text: "O trailer final brasileiro confirma o foco: Peter está sozinho, o Escorpião e o Hulk aparecem em ação, e a ameaça central continua deliberadamente sem nome.",
      },
      { type: "heading", text: "Peter Parker em uma fase nova" },
      {
        type: "paragraph",
        text: "A sinopse divulgada junto do vídeo descreve Peter combatendo o crime em tempo integral em um mundo que não se lembra dele. Ela acrescenta que o personagem passa por uma mudança que talvez não consiga controlar e que essa transformação pode ser a única maneira de proteger a cidade e as pessoas que ama. É a base oficial do conflito; qualquer explicação sobre a natureza dessa mudança ainda está sob sigilo.",
      },
      {
        type: "paragraph",
        text: "Esse ponto conecta Um Novo Dia a Homem-Aranha: Sem Volta para Casa sem precisar repetir seus spoilers. O novo filme parte das consequências pessoais daquele encerramento e devolve Peter a uma posição mais solitária, com a responsabilidade de ser o Homem-Aranha pesando mais do que a vida universitária ou as grandes conexões de equipe.",
      },
      { type: "heading", text: "Personagens e ameaças confirmados" },
      {
        type: "paragraph",
        text: "A relação oficial de elenco inclui Tom Holland, Zendaya, Sadie Sink, Jacob Batalon, Jon Bernthal, Tramell Tillman, Michael Mando e Mark Ruffalo. Destin Daniel Cretton dirige o longa. No trailer, Hulk e Escorpião são visíveis; a presença de Mando como Escorpião também foi repercutida por veículos brasileiros. Já o Justiceiro integra o elenco anunciado, mas isso não autoriza a concluir que toda participação ou parceria vista em rumores esteja no filme.",
      },
      {
        type: "paragraph",
        text: "A ameaça invisível citada na sinopse é o maior mistério da campanha. Ela alimentou teorias sobre quem estaria por trás dos acontecimentos e sobre a personagem de Sadie Sink, mas nenhuma dessas hipóteses recebeu confirmação da Sony Pictures Brasil ou da Marvel Studios. O trailer preserva exatamente esse segredo.",
      },
      { type: "heading", text: "Conexões com o MCU e teorias" },
      {
        type: "paragraph",
        text: "Hulk é a conexão explícita com o MCU no material divulgado. O restante precisa ser separado com cuidado: a presença de outros heróis, cenas pós-créditos, identidades ocultas e ligações diretas com futuros Vingadores continuam sendo teorias de fãs enquanto não houver anúncio oficial. O próprio trailer prefere olhar para a história de Peter a abrir o jogo sobre as próximas peças do universo compartilhado.",
      },
      {
        type: "quote",
        text: "A prévia final vende emoção e contexto, mas guarda a informação que realmente mudaria a experiência no cinema: quem é a ameaça que Peter ainda não consegue ver.",
        by: "Renato Brito, ARS Geek",
      },
      { type: "heading", text: "Estreia, pré-venda e classificação no Brasil" },
      {
        type: "paragraph",
        text: "A data brasileira confirmada pela Sony Pictures Brasil é 29 de julho de 2026, com lançamento exclusivo nos cinemas. A UCI já mantém uma página do filme em sua programação nacional, mas sessões, formatos, preços e disponibilidade de ingressos variam por cidade e rede; por isso, vale consultar o cinema de preferência antes de comprar. Não há anúncio de estreia em streaming no material oficial consultado.",
      },
      {
        type: "paragraph",
        text: "Também não foi localizada uma classificação indicativa brasileira oficial para o longa nos materiais de divulgação analisados. Há decisões de classificação para trailers, mas elas não substituem a classificação do filme. Quando o selo definitivo for divulgado, ele deve ser conferido diretamente nos canais da distribuidora, das redes exibidoras ou do órgão competente.",
      },
      { type: "heading", text: "O que permanece em segredo até 29 de julho" },
      {
        type: "paragraph",
        text: "Com o trailer final, a campanha deixa clara a nova condição de Peter Parker, confirma rostos importantes em torno dele e mostra que a ação vai escalar. Mas a identidade da ameaça, o alcance da mudança de poderes e o papel de Sadie Sink seguem protegidos. Para o público brasileiro, a informação essencial já está definida: a versão dublada está no canal oficial da Sony Pictures Brasil e o filme chega aos cinemas em 29 de julho.",
      },
    ],
    sources: [
      { label: "Sony Pictures Brasil — Trailer Final (A Jornada de Peter) dublado", url: "https://www.youtube.com/watch?v=bwt2-nyEP0A" },
      { label: "Sony Pictures Brasil — Site oficial da distribuidora", url: "https://www.sonypictures.com.br/" },
      { label: "UCI Cinemas — Página brasileira de Homem-Aranha: Um Novo Dia", url: "https://www.ucicinemas.com.br/Home/CinemaHorarios/11013?filme=HOMEM-ARANHA%3A-UM-NOVO-DIA" },
      { label: "Canaltech — Cobertura brasileira do trailer final", url: "https://canaltech.com.br/entretenimento/trailer-final-de-homem-aranha-um-novo-dia-destaca-jornada-emocionante-do-heroi/" },
      { label: "Omelete — Cobertura brasileira do trailer final", url: "https://www.omelete.com.br/filmes/homem-aranha-um-novo-dia-trailer-final" },
    ],
  },
  // ── EDIÇÃO 28/08/2026 ───────────────────────────────────────────────
  {
    title: "Gemini Omni 1.1 Flash leva vídeo por IA a 4K e amplia o controle dos criadores",
    category: "Tecnologia",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Atualização do Google permite estender cenas, definir quadros inicial e final e testar ideias em 360p antes da renderização, aproximando a geração de vídeo de um fluxo profissional.",
    tags: ["gemini-omni", "inteligencia-artificial", "video-generativo", "google-deepmind", "tecnologia-criativa", "criacao-de-conteudo"],
    blocks: [
      {
        type: "paragraph",
        text: "O Google apresentou em 27 de agosto o Gemini Omni 1.1 Flash, atualização de seu modelo voltado à criação e edição de vídeos por inteligência artificial. A nova versão chega ao Google AI Studio e à plataforma corporativa Gemini Enterprise Agent Platform com controles para prolongar cenas, construir transições entre dois quadros, produzir rascunhos mais baratos e elevar o resultado final a 4K.",
      },
      {
        type: "paragraph",
        text: "O anúncio importa porque desloca parte da competição entre modelos generativos. A disputa já não envolve apenas transformar um comando em um clipe visualmente convincente. Ferramentas dirigidas a profissionais precisam permitir revisão, continuidade e escolhas de direção — o tipo de controle que separa um experimento rápido de um fluxo capaz de entrar em publicidade, design, audiovisual ou conteúdo digital.",
      },
      { type: "heading", text: "Cenas podem continuar por até 40 segundos" },
      {
        type: "paragraph",
        text: "Uma das principais novidades é a extensão de cenas. O Omni 1.1 Flash pode analisar até dez segundos do vídeo anterior antes de gerar a continuação, em vez de considerar somente o último segundo. O contexto maior busca preservar cenário, personagens e direção narrativa entre os trechos.",
      },
      {
        type: "paragraph",
        text: "Cada extensão acrescenta dez segundos, até uma duração acumulada de 40 segundos. O limite ainda é curto quando comparado a uma produção tradicional, mas abre espaço para criar uma sequência em etapas, testar ramificações e ajustar o rumo sem recomeçar a geração inteira.",
      },
      {
        type: "paragraph",
        text: "O modelo também aceita até três segundos de vídeo como referência multimodal. Esse material pode orientar movimento, composição ou consistência visual. Para equipes criativas, a possibilidade de partir de referências controladas tende a ser mais útil do que depender exclusivamente da interpretação de um texto.",
      },
      {
        type: "highlight",
        text: "O Omni 1.1 Flash consulta até dez segundos do trecho anterior e permite estender uma cena em blocos de dez segundos, chegando a 40 segundos acumulados.",
      },
      { type: "heading", text: "Dois quadros passam a orientar uma transição" },
      {
        type: "paragraph",
        text: "O recurso de primeiro e último quadro permite definir onde uma tomada começa e onde deve terminar. A inteligência artificial gera o movimento intermediário, solução que pode ser usada em órbitas de câmera, aproximações, transições ou loops contínuos.",
      },
      {
        type: "paragraph",
        text: "Esse controle é especialmente relevante para artistas, animadoras, editoras e equipes pequenas que trabalham com storyboard. Em vez de aceitar uma câmera inteiramente decidida pelo modelo, a pessoa responsável pelo projeto estabelece dois pontos visuais essenciais e avalia como o sistema constrói o percurso entre eles.",
      },
      {
        type: "paragraph",
        text: "O ganho não elimina a direção humana. Pelo contrário: torna mais visível a necessidade de selecionar referências, avaliar continuidade, revisar falhas e decidir se uma geração realmente comunica a intenção do projeto. A ferramenta automatiza parte da execução, mas autoria, repertório e responsabilidade continuam fora do alcance de uma configuração técnica.",
      },
      { type: "heading", text: "Rascunhos em 360p reduzem custo e tempo de teste" },
      {
        type: "paragraph",
        text: "Gerar várias alternativas em alta resolução pode consumir tempo e orçamento antes de a equipe decidir qual ideia vale finalizar. Para enfrentar esse problema, o Google adicionou uma modalidade de 360p destinada a rascunhos.",
      },
      {
        type: "paragraph",
        text: "Segundo a empresa, essa opção pode gerar prévias até 60% mais rapidamente e por um terço do custo da saída padrão em 720p. A proposta é testar três ou quatro variações, alterar um elemento por vez e comparar os resultados antes de investir em uma versão mais pesada.",
      },
      {
        type: "paragraph",
        text: "Depois da escolha, o modelo pode entregar saídas em 1080p ou fazer o upscale para 4K. A documentação oficial também posiciona o Omni Flash como um modelo conversacional: texto, imagem e vídeo podem entrar no mesmo processo, enquanto ajustes são solicitados em linguagem natural.",
      },
      {
        type: "highlight",
        text: "O modo de rascunho em 360p não é pensado como resultado final. Ele serve para prototipar mais rápido, comparar alternativas e reservar a renderização em 1080p ou 4K para a versão escolhida.",
      },
      { type: "heading", text: "Controle técnico não resolve as questões de autoria" },
      {
        type: "paragraph",
        text: "A chegada a ferramentas usadas por desenvolvedores amplia o alcance da tecnologia. O Google afirma que o Omni 1.1 Flash já pode ser integrado a fluxos como Adobe Firefly, Figma Weave e Runway, além de aplicações construídas com sua API.",
      },
      {
        type: "paragraph",
        text: "Itay Schiff, diretor criativo do Figma Weave, destacou justamente a passagem da geração para a direção:",
      },
      {
        type: "quote",
        text: "Com extensões, referências mais ricas e resolução 4K, o Gemini Omni Flash leva as equipes além de gerar vídeos, para realmente dirigi-los.",
        by: "Itay Schiff, diretor criativo do Figma Weave",
      },
      {
        type: "paragraph",
        text: "Ainda assim, resolução e controle de câmera não encerram debates sobre direitos autorais, consentimento, origem dos dados e identificação de conteúdo sintético. Projetos comerciais continuam precisando de regras sobre as referências enviadas ao modelo, a autorização de pessoas retratadas e a revisão de elementos que possam reproduzir marcas ou obras protegidas.",
      },
      {
        type: "paragraph",
        text: "O próprio Google publicou um cartão de modelo para descrever capacidades e limitações do Omni Flash. A existência dessa documentação é importante, mas a responsabilidade prática dependerá de como plataformas e equipes aplicam salvaguardas no uso cotidiano.",
      },
      { type: "heading", text: "A IA de vídeo começa a se parecer com uma ferramenta de produção" },
      {
        type: "paragraph",
        text: "O Omni 1.1 Flash está disponível globalmente no Google Flow para assinantes AI Plus, Pro e Ultra. A extensão de cenas também chega ao aplicativo Gemini para esses planos, enquanto desenvolvedores podem experimentar a tecnologia pelo AI Studio e pelas APIs indicadas pela empresa.",
      },
      {
        type: "paragraph",
        text: "O avanço mais relevante não é apenas o 4K. É a tentativa de organizar a geração de vídeo em etapas reconhecíveis: referência, rascunho, comparação, direção, revisão e acabamento. Quanto mais esse processo se aproxima de um fluxo profissional, menos sentido faz tratar a inteligência artificial como um botão que entrega uma obra pronta.",
      },
      {
        type: "paragraph",
        text: "Para criadores, o valor estará na capacidade de conduzir a ferramenta sem perder a própria linguagem. Para empresas, estará em combinar velocidade com procedência, transparência e segurança jurídica. O Omni 1.1 Flash melhora o controle; agora, a maturidade do resultado dependerá de quem decide como usá-lo.",
      },
    ],
    sources: [
      { label: "Google — anúncio oficial do Gemini Omni 1.1 Flash", url: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/" },
      { label: "Google AI for Developers — documentação do Gemini Omni Flash", url: "https://ai.google.dev/gemini-api/docs/models/gemini-omni-flash" },
      { label: "Google DeepMind — cartão do modelo Gemini Omni Flash", url: "https://deepmind.google/models/model-cards/gemini-omni-flash/" },
      { label: "Google Cloud — preços da plataforma de agentes", url: "https://cloud.google.com/gemini-enterprise-agent-platform/generative-ai/pricing" },
    ],
  },
  {
    title: "Mercado de segurança para inteligência artificial pode alcançar US$ 4,8 bilhões em 2027",
    category: "Tecnologia",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Gartner prevê crescimento de 68,7% nos investimentos destinados a proteger modelos, aplicações e agentes de IA contra vazamentos, ataques e usos indevidos.",
    tags: ["inteligencia-artificial", "seguranca-de-ia", "ciberseguranca", "gartner", "agentes-de-ia", "governanca-de-ia", "protecao-de-dados"],
    blocks: [
      {
        type: "paragraph",
        text: "O mercado mundial de tecnologias destinadas a proteger sistemas de inteligência artificial deve movimentar aproximadamente US$ 4,8 bilhões em 2027, segundo uma nova projeção do Gartner.",
      },
      {
        type: "paragraph",
        text: "O valor representa um crescimento de 68,7% em relação aos US$ 2,835 bilhões estimados para 2026. A consultoria também prevê que os investimentos podem se aproximar de US$ 7,7 bilhões em 2028.",
      },
      {
        type: "paragraph",
        text: "A expansão acompanha a entrada de modelos generativos e agentes autônomos em processos empresariais. Quanto mais esses sistemas recebem acesso a documentos, bancos de dados, aplicativos e ferramentas externas, maior é a necessidade de controlar quais informações podem consultar e quais ações estão autorizados a executar.",
      },
      { type: "heading", text: "Proteger a IA não é o mesmo que usar IA na segurança" },
      {
        type: "paragraph",
        text: "A projeção do Gartner trata especificamente do mercado chamado de securing AI: produtos criados para proteger modelos, aplicações, dados e agentes de inteligência artificial.",
      },
      {
        type: "paragraph",
        text: "Esse segmento é diferente do mercado de soluções de cibersegurança que utilizam IA para detectar fraudes, analisar redes ou identificar ameaças. No primeiro caso, a inteligência artificial é o sistema que precisa ser protegido. No segundo, ela funciona como uma ferramenta de defesa.",
      },
      {
        type: "paragraph",
        text: "A diferença explica por que outras estimativas sobre “IA na cibersegurança” apresentam valores muito superiores. Os levantamentos não estão necessariamente em conflito, mas medem categorias distintas.",
      },
      {
        type: "paragraph",
        text: "O mercado analisado pelo Gartner reúne quatro áreas principais: segurança de aplicações de IA, controle do uso de IA, plataformas de governança e gateways responsáveis por intermediar o acesso aos modelos.",
      },
      {
        type: "highlight",
        text: "O levantamento não contabiliza todo produto de segurança que usa inteligência artificial. Ele considera as ferramentas desenvolvidas especificamente para proteger a própria IA.",
      },
      { type: "heading", text: "Aplicações concentram a maior parcela" },
      {
        type: "paragraph",
        text: "A segurança de aplicações de IA deverá permanecer como a maior categoria identificada individualmente. O Gartner estima que os investimentos nessa área passarão de US$ 508 milhões em 2026 para US$ 851 milhões em 2027.",
      },
      {
        type: "paragraph",
        text: "O controle do uso de IA aparece em seguida, avançando de US$ 433 milhões para US$ 749 milhões. Essa categoria inclui ferramentas capazes de estabelecer políticas sobre quais serviços podem ser utilizados e que tipos de informações podem ser enviados a modelos externos.",
      },
      {
        type: "paragraph",
        text: "As plataformas de governança devem alcançar US$ 462 milhões em 2027. Esses sistemas ajudam empresas a registrar modelos, avaliar riscos, documentar decisões e acompanhar o cumprimento de normas internas e regulatórias.",
      },
      {
        type: "paragraph",
        text: "Os gateways de IA, responsáveis por controlar a comunicação entre usuários, aplicações e modelos, podem movimentar US$ 429 milhões no mesmo período.",
      },
      {
        type: "paragraph",
        text: "Outras ferramentas e serviços relacionados à proteção da IA completam a projeção e representam US$ 2,292 bilhões.",
      },
      { type: "heading", text: "Agentes criam novos pontos de ataque" },
      {
        type: "paragraph",
        text: "Os riscos aumentam quando a IA deixa de apenas responder perguntas e passa a executar tarefas. Agentes podem consultar e-mails, movimentar arquivos, acessar sistemas corporativos ou iniciar processos sem supervisão constante.",
      },
      {
        type: "paragraph",
        text: "Uma instrução maliciosa escondida em um documento, página ou mensagem pode tentar alterar o comportamento desses agentes. Esse tipo de ataque é conhecido como injeção indireta de prompt.",
      },
      {
        type: "paragraph",
        text: "O Gartner prevê que, até 2029, mais da metade dos ataques bem-sucedidos contra agentes de IA poderá explorar falhas de controle de acesso e injeções de prompt.",
      },
      {
        type: "paragraph",
        text: "A cadeia de fornecimento também merece atenção. Projetos de IA costumam depender de bibliotecas abertas, modelos de terceiros, serviços em nuvem e grandes conjuntos de dados. Uma vulnerabilidade em qualquer componente pode afetar toda a aplicação.",
      },
      {
        type: "quote",
        text: "Esse avanço é impulsionado pela necessidade urgente de proteger sistemas de IA, enfrentar novas vulnerabilidades e fortalecer as defesas contra ameaças sofisticadas.",
        by: "Shailendra Upadhyay, analista principal sênior do Gartner",
      },
      {
        type: "paragraph",
        text: "A declaração integra o comunicado divulgado pelo Gartner em 26 de agosto de 2026.",
      },
      { type: "heading", text: "Segurança exige monitoramento contínuo" },
      {
        type: "paragraph",
        text: "As ameaças contra sistemas de IA não podem ser tratadas apenas com uma configuração inicial de segurança.",
      },
      {
        type: "paragraph",
        text: "O National Institute of Standards and Technology, o NIST, defende que empresas mantenham processos contínuos de testes, monitoramento e atualização. Novos comandos maliciosos podem explorar comportamentos que não foram previstos durante o desenvolvimento.",
      },
      {
        type: "paragraph",
        text: "Entre os riscos estão o envenenamento de dados de treinamento, o roubo de informações, a manipulação das respostas e o uso indevido das ferramentas conectadas ao modelo.",
      },
      {
        type: "highlight",
        text: "Modelos protegidos no lançamento podem se tornar vulneráveis depois de conectados a novas fontes de dados, ferramentas e usuários. Por isso, testes e monitoramento precisam acompanhar todo o ciclo de vida da IA.",
      },
      {
        type: "paragraph",
        text: "A segurança também envolve decisões organizacionais. Empresas precisam saber quais modelos estão em operação, quem pode utilizá-los, que dados recebem e quais ações podem realizar.",
      },
      {
        type: "paragraph",
        text: "Isso torna governança, identidade digital e controle de acesso tão importantes quanto as barreiras técnicas instaladas ao redor do modelo.",
      },
      { type: "heading", text: "A proteção começa a acompanhar a adoção" },
      {
        type: "paragraph",
        text: "A expansão do mercado indica que as empresas estão começando a reconhecer um custo que nem sempre aparecia nos primeiros projetos de inteligência artificial: proteger a tecnologia depois que ela entra em produção.",
      },
      {
        type: "paragraph",
        text: "Ferramentas especializadas não substituem práticas tradicionais de cibersegurança. Controle de identidade, proteção de dados, gestão de vulnerabilidades e monitoramento de fornecedores continuam essenciais.",
      },
      {
        type: "paragraph",
        text: "A diferença é que modelos e agentes introduzem comportamentos difíceis de prever apenas com regras fixas. A proteção precisa considerar tanto falhas técnicas quanto a possibilidade de alguém manipular a linguagem usada para comandar o sistema.",
      },
      {
        type: "paragraph",
        text: "O crescimento previsto para 2027 mostra que segurança e governança estão deixando de ser etapas posteriores. Para organizações que pretendem confiar tarefas reais à inteligência artificial, elas passam a fazer parte da própria infraestrutura necessária para utilizar a tecnologia.",
      },
    ],
    sources: [
      { label: "Gartner — mercado de proteção de IA pode alcançar US$ 4,8 bilhões em 2027", url: "https://www.gartner.com/en/newsroom/press-releases/2026-08-26-gartner-forecasts-the-market-for-securing-ai-will-reach-almost-5-billion-in-2027" },
      { label: "NIST — diretrizes de cibersegurança para a era da IA", url: "https://www.nist.gov/news-events/news/2025/12/draft-nist-guidelines-rethink-cybersecurity-ai-era" },
      { label: "NIST — ataques capazes de manipular sistemas de IA", url: "https://www.nist.gov/news-events/news/2024/01/nist-identifies-types-cyberattacks-manipulate-behavior-ai-systems" },
      { label: "NIST — segurança de IA exige monitoramento e atualizações contínuas", url: "https://www.nist.gov/news-events/news/2026/06/nist-mathematical-proof-supports-transition-continuous-monitor-and-update" },
    ],
  },
  {
    title: "Metal Gear Solid 4 deixa o PlayStation 3 após 18 anos com a Master Collection Vol. 2",
    category: "Games",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Primeiro porte oficial de Guns of the Patriots leva a última missão de Solid Snake para PS5, Xbox Series, PC e consoles Nintendo ao lado de Peace Walker e Ghost Babel.",
    tags: ["metal-gear-solid", "metal-gear-solid-4", "master-collection-vol-2", "solid-snake", "konami", "games"],
    blocks: [
      {
        type: "paragraph",
        text: "Depois de permanecer por 18 anos restrito ao PlayStation 3, Metal Gear Solid 4: Guns of the Patriots finalmente chegou a outras plataformas. O jogo integra a Metal Gear Solid: Master Collection Vol. 2, lançada em 27 de agosto para PlayStation 5, Xbox Series X|S, PC, Nintendo Switch 2 e Nintendo Switch.",
      },
      {
        type: "paragraph",
        text: "A nova coleção representa o primeiro porte oficial de Metal Gear Solid 4 desde seu lançamento original, em 2008. Até agora, quem desejava conhecer a última missão de Solid Snake dependia de um PlayStation 3 e de uma cópia compatível com o console.",
      },
      {
        type: "paragraph",
        text: "O pacote também inclui a versão HD de Metal Gear Solid: Peace Walker, originalmente lançado no PSP, e Metal Gear: Ghost Babel, título de Game Boy Color disponibilizado como conteúdo adicional.",
      },
      {
        type: "highlight",
        text: "Metal Gear Solid 4 recebe seu primeiro porte oficial desde 2008 e deixa de depender exclusivamente de um PlayStation 3 para ser preservado e jogado legalmente.",
      },
      { type: "heading", text: "Um dos capítulos mais importantes da série estava preso ao PS3" },
      {
        type: "paragraph",
        text: "Metal Gear Solid 4: Guns of the Patriots ocupa uma posição central na cronologia criada por Hideo Kojima. Ambientado anos depois do incidente de Big Shell, o jogo acompanha um Solid Snake envelhecido em uma última missão para impedir Liquid Ocelot.",
      },
      {
        type: "paragraph",
        text: "A história procura encerrar conflitos e relações construídos desde os primeiros jogos da série. Personagens como Meryl, Raiden, Naomi Hunter, Otacon e Big Boss retornam em uma narrativa marcada por guerra, controle tecnológico e pelo legado deixado por diferentes gerações de soldados.",
      },
      {
        type: "paragraph",
        text: "Apesar dessa importância, Metal Gear Solid 4 nunca havia recebido uma versão oficial para outro console ou para computadores. Enquanto outros capítulos retornaram em coletâneas, remasterizações e relançamentos digitais, a conclusão da trajetória de Solid Snake permaneceu vinculada ao hardware lançado pela Sony em 2006.",
      },
      {
        type: "paragraph",
        text: "Essa ausência criou uma lacuna na preservação da franquia. Jogadores podiam acompanhar boa parte da história de Snake em plataformas modernas, mas precisavam recorrer a um console antigo para acessar um de seus capítulos mais decisivos.",
      },
      { type: "heading", text: "O que está incluído na Master Collection Vol. 2" },
      {
        type: "paragraph",
        text: "A principal atração da coleção é Metal Gear Solid 4, mas o pacote também recupera outra parte importante da cronologia.",
      },
      {
        type: "paragraph",
        text: "Metal Gear Solid: Peace Walker retorna em sua versão HD e acompanha Big Boss durante a criação de uma força militar independente. O jogo funciona como uma ligação direta entre Snake Eater e os acontecimentos que mais tarde dariam origem a Ground Zeroes e The Phantom Pain.",
      },
      {
        type: "paragraph",
        text: "A versão preserva o modo cooperativo e outras funções on-line para até seis participantes. A Konami informa, entretanto, que não haverá crossplay entre as diferentes plataformas.",
      },
      {
        type: "paragraph",
        text: "Metal Gear: Ghost Babel completa o pacote como conteúdo adicional. Lançado originalmente para Game Boy Color em 2000, o jogo apresenta uma história própria e não faz parte da cronologia principal da série.",
      },
      {
        type: "paragraph",
        text: "A coleção ainda oferece o banco de dados de Metal Gear Solid 4, livros digitais com roteiros e informações sobre personagens, além de uma seleção de músicas das trilhas sonoras.",
      },
      {
        type: "paragraph",
        text: "Metal Gear Solid 4 e Peace Walker também podem ser adquiridos separadamente em formato digital.",
      },
      { type: "heading", text: "O retorno não preserva toda a experiência original" },
      {
        type: "paragraph",
        text: "A volta de Metal Gear Solid 4 resolve sua maior limitação de acesso, mas não recupera todos os componentes da versão de PlayStation 3.",
      },
      {
        type: "paragraph",
        text: "O suporte on-line anunciado pela Konami está concentrado em Peace Walker. A empresa não incluiu entre os recursos da coleção o retorno de Metal Gear Online, modo competitivo que acompanhava o quarto jogo e teve seus servidores encerrados em 2012.",
      },
      {
        type: "paragraph",
        text: "Isso significa que a campanha de Solid Snake está novamente disponível, mas parte da experiência original permanece restrita à memória de quem participou das partidas enquanto os servidores estavam ativos.",
      },
      {
        type: "paragraph",
        text: "A ausência não diminui a importância do relançamento, mas mostra que preservar um jogo envolve mais do que transportar sua campanha para um hardware recente. Recursos dependentes de servidores continuam sendo um dos maiores desafios para a conservação da história dos videogames.",
      },
      {
        type: "paragraph",
        text: "Antes do anúncio da Master Collection Vol. 2, Noriaki Okamura já havia reconhecido a dificuldade de transportar Metal Gear Solid 4 para plataformas atuais. Em entrevista ao Real Sound Tech, o produtor da série explicou que o jogo possuía uma estrutura técnica particularmente ligada ao PlayStation 3.",
      },
      {
        type: "quote",
        text: "O código de MGS4 é bastante peculiar. Trazê-lo para as plataformas atuais parece muito difícil.",
        by: "Noriaki Okamura, produtor da série Metal Gear",
      },
      {
        type: "paragraph",
        text: "A declaração ajuda a dimensionar o trabalho envolvido no relançamento. O retorno de Metal Gear Solid 4 não representa apenas o fim de uma exclusividade comercial, mas a superação de uma barreira técnica reconhecida pela própria equipe responsável pela franquia.",
      },
      { type: "heading", text: "Preservação também significa ampliar o acesso" },
      {
        type: "paragraph",
        text: "Relançar um título antigo não beneficia apenas quem deseja reencontrar uma experiência conhecida. A iniciativa permite que novas pessoas descubram obras importantes sem precisar procurar consoles descontinuados ou cópias físicas cada vez mais difíceis de encontrar.",
      },
      {
        type: "paragraph",
        text: "No caso de Metal Gear Solid 4, a exclusividade prolongada criou uma barreira concreta. Mesmo quem conheceu a franquia por meio das coleções recentes não conseguia acompanhar toda a trajetória de Solid Snake em um único ecossistema moderno.",
      },
      {
        type: "paragraph",
        text: "A Master Collection Vol. 2 reduz essa fragmentação e amplia o acesso para públicos que não tiveram contato com o PlayStation 3. Isso inclui uma geração de jogadoras e jogadores que conheceu Metal Gear por The Phantom Pain, pela primeira coletânea ou pelo remake de Snake Eater.",
      },
      {
        type: "highlight",
        text: "A importância da coleção não está apenas em melhorar jogos antigos, mas em impedir que capítulos essenciais de uma franquia permaneçam inacessíveis às novas gerações.",
      },
      { type: "heading", text: "Uma espera que finalmente chegou ao fim" },
      {
        type: "paragraph",
        text: "Durante anos, Metal Gear Solid 4 foi o principal ausente das plataformas modernas. Sua chegada encerra uma exclusividade histórica e aproxima a Konami de reunir os capítulos centrais da franquia em sistemas atuais.",
      },
      {
        type: "paragraph",
        text: "A coleção também recupera Peace Walker, preserva Ghost Babel e reúne materiais que ajudam a compreender uma das cronologias mais complexas dos videogames.",
      },
      {
        type: "paragraph",
        text: "Ainda será necessário avaliar a qualidade técnica de cada versão, especialmente depois dos problemas enfrentados no lançamento da primeira Master Collection. A importância histórica do pacote, no entanto, já está clara.",
      },
      {
        type: "paragraph",
        text: "Depois de 18 anos esperando no PlayStation 3, a última missão de Solid Snake finalmente pode alcançar uma nova geração.",
      },
    ],
    sources: [
      { label: "Konami — Anúncio oficial da Master Collection Vol. 2", url: "https://www.konami.com/games/us/en/topics/3095/" },
      { label: "Site oficial de Metal Gear Solid: Master Collection Vol. 2", url: "https://www.konami.com/mg/mc2/us/en/" },
      { label: "PlayStation — Página oficial da coleção", url: "https://www.playstation.com/en-us/games/metal-gear-solid-master-collection-vol-2/" },
      { label: "Steam — Master Collection Vol. 2", url: "https://store.steampowered.com/app/3859630/METAL_GEAR_SOLID_MASTER_COLLECTION_Vol2/" },
    ],
  },
  {
    title: "ROG Xbox Ally X20 aposta em tela OLED e hardware premium",
    category: "Games",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Novo portátil da ASUS em parceria com o Xbox combina tela OLED de 120 Hz, processador Ryzen AI Z2 Extreme e acabamento comemorativo, mas chega ao mercado internacional por US$ 1.299.",
    tags: ["rog-xbox-ally-x20", "xbox", "asus", "rog-ally", "jogos-portateis", "pc-gamer", "tela-oled", "amd-ryzen"],
    blocks: [
      {
        type: "paragraph",
        text: "A ASUS abriu a pré-venda internacional do ROG Xbox Ally X20, novo computador portátil para jogos desenvolvido em parceria com o Xbox. O modelo chega às lojas selecionadas em 15 de outubro de 2026, com preço inicial de US$ 1.299,99 nos Estados Unidos.",
      },
      {
        type: "paragraph",
        text: "Apresentado como o portátil mais avançado já produzido pela linha ROG Ally, o X20 aposta em uma tela OLED maior, controles redesenhados e componentes de alto desempenho. O aparelho também celebra os 20 anos da divisão Republic of Gamers, conhecida como ROG.",
      },
      {
        type: "paragraph",
        text: "Apesar do nome Xbox, o dispositivo não é um console tradicional. Ele utiliza Windows 11 e pode acessar jogos do Xbox, aplicativos de PC e bibliotecas de diferentes lojas digitais.",
      },
      { type: "heading", text: "Tela OLED é a principal novidade" },
      {
        type: "paragraph",
        text: "O ROG Xbox Ally X20 recebeu uma tela ROG Nebula HDR OLED de 7,4 polegadas, com resolução Full HD e taxa de atualização de 120 Hz. O painel é maior do que o utilizado no Xbox Ally X anterior, mas foi incorporado sem aumentar significativamente as dimensões do aparelho.",
      },
      {
        type: "paragraph",
        text: "A tela possui certificação VESA DisplayHDR True Black 1400, suporte ao Dolby Vision e brilho máximo de 1.400 nits em determinados elementos HDR. O FreeSync Premium Pro trabalha com taxa de atualização variável entre 30 e 120 Hz para reduzir cortes e oscilações durante os jogos.",
      },
      {
        type: "paragraph",
        text: "O tempo de resposta informado pela fabricante é de 0,2 milissegundo. A ASUS também aplicou uma camada antirreflexo que, segundo a empresa, reduz os reflexos ambientais em até 65% quando comparada a um painel OLED convencional sem o mesmo tratamento.",
      },
      {
        type: "highlight",
        text: "A tela OLED de 7,4 polegadas combina resolução Full HD, frequência de 120 Hz, HDR e taxa de atualização variável — características que colocam a qualidade de imagem no centro da proposta do X20.",
      },
      { type: "heading", text: "Hardware busca sustentar jogos de PC" },
      {
        type: "paragraph",
        text: "O portátil utiliza o processador AMD Ryzen AI Z2 Extreme, acompanhado por 24 GB de memória LPDDR5X e armazenamento SSD de 1 TB. A unidade interna segue o formato M.2 2280 e poderá ser substituída pelo usuário.",
      },
      {
        type: "paragraph",
        text: "A expansão de armazenamento também pode ser feita por meio de cartões microSD Express. O padrão oferece velocidades superiores às dos cartões microSD tradicionais, embora o leitor continue compatível com modelos mais antigos.",
      },
      {
        type: "paragraph",
        text: "Para sustentar o desempenho, o X20 utiliza uma bateria de 80 Wh e um sistema de resfriamento modificado. A nova estrutura direciona o fluxo de ar ao processador e utiliza ventoinhas de maior capacidade.",
      },
      {
        type: "paragraph",
        text: "O sistema operacional é o Windows 11, mas o aparelho pode ser iniciado no Xbox Mode, interface otimizada para navegação com os controles. A proposta é reunir jogos do Xbox e de outras lojas de PC em uma única biblioteca acessível pelo portátil.",
      },
      {
        type: "paragraph",
        text: "Essa flexibilidade continua sendo uma das principais diferenças entre computadores portáteis com Windows e consoles fechados. Em contrapartida, o sistema precisa equilibrar compatibilidade, consumo de energia e uma interface originalmente criada para computadores convencionais.",
      },
      { type: "heading", text: "Controles também foram redesenhados" },
      {
        type: "paragraph",
        text: "A ASUS adotou joysticks com sensores magnéticos TMR, tecnologia desenvolvida para ampliar a precisão e diminuir o risco de stick drift. A zona morta informada pela fabricante foi reduzida para 3%.",
      },
      {
        type: "paragraph",
        text: "O direcional também recebeu uma solução incomum. Chamado de Transforming D-pad, ele pode ser levantado e girado em 90 graus para alternar entre quatro e oito direções.",
      },
      {
        type: "paragraph",
        text: "A primeira configuração favorece jogos retrô e títulos que exigem movimentos mais precisos. A segunda pode ser mais adequada para jogos de luta e comandos diagonais.",
      },
      {
        type: "paragraph",
        text: "Gatilhos, botões frontais e empunhaduras foram redesenhados. As laterais receberam revestimento emborrachado, enquanto os botões ABXY ficaram mais alinhados à superfície quando pressionados.",
      },
      {
        type: "paragraph",
        text: "O editor Sean Hollister, que experimentou o aparelho para o site The Verge, destacou justamente o refinamento da experiência física.",
      },
      {
        type: "quote",
        text: "Ele pode ser o portátil Windows mais refinado e confortável de usar.",
        by: "Sean Hollister, editor sênior do The Verge",
      },
      {
        type: "paragraph",
        text: "A avaliação preliminar também recomenda aguardar testes completos antes da compra, especialmente porque desempenho, aquecimento e duração da bateria ainda precisam ser analisados em condições reais.",
      },
      { type: "heading", text: "Design comemorativo cobra preço elevado" },
      {
        type: "paragraph",
        text: "O acabamento utiliza uma carcaça preta semitranslúcida, estrutura interna dourada, iluminação nos joysticks e botão Xbox verde. O conjunto inclui ainda detalhes alusivos ao aniversário de 20 anos da ROG.",
      },
      {
        type: "paragraph",
        text: "A versão avulsa custa US$ 1.299,99. Também será comercializado um pacote de US$ 2.499,99 com óculos ROG XREAL R1 Edition 20, capa protetora desenvolvida pela dbrand e uma maleta rígida personalizada da Pelican.",
      },
      {
        type: "paragraph",
        text: "Os óculos utilizam duas telas Micro-OLED e simulam uma imagem de até 171 polegadas. O acessório é conectado ao portátil por um cabo USB-C.",
      },
      {
        type: "paragraph",
        text: "O preço coloca o X20 acima de muitos notebooks gamers e dos principais portáteis disponíveis atualmente. A tela OLED, os controles aperfeiçoados e o acabamento comemorativo ajudam a diferenciar o produto, mas não transformam a compra em uma escolha acessível.",
      },
      {
        type: "paragraph",
        text: "Até o momento, ASUS e Xbox não divulgaram preço, início das vendas ou disponibilidade oficial do ROG Xbox Ally X20 no Brasil. A ausência dessas informações também impede estimar quanto o portátil custaria no mercado nacional.",
      },
      {
        type: "paragraph",
        text: "O X20 mostra que a disputa pelos jogos portáteis está entrando em uma fase de maior segmentação. Enquanto alguns dispositivos buscam alcançar mais jogadores, a ASUS aposta em um modelo de coleção, com tela avançada, hardware potente e preço compatível com um produto de nicho.",
      },
    ],
    sources: [
      { label: "ASUS ROG — página oficial do ROG Xbox Ally X20", url: "https://rog.asus.com/gaming-handhelds/rog-ally/rog-xbox-ally-x20-2026/" },
      { label: "ASUS ROG — pré-venda, preço e data de lançamento", url: "https://rog.asus.com/articles/rog-ally/pre-order-your-rog-xbox-ally-x20-today-standalone-or-as-part-of-an-incredible-rog-20th-anniversary-bundle/" },
      { label: "Xbox Wire — início da pré-venda", url: "https://news.xbox.com/en-us/2026/08/25/preorder-the-rog-xbox-ally-x20-starting-today/" },
      { label: "The Verge — primeiras impressões e análise do preço", url: "https://www.theverge.com/games/984139/the-oled-xbox-ally-x20-officially-starts-at-1300" },
    ],
  },
  {
    title: "Samsung apresenta nova geração Galaxy Z e amplia disputa por smartphones com IA",
    category: "Tecnologia",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Galaxy Z Fold8 Ultra, Fold8 e Flip8 combinam formatos dobráveis com ferramentas de inteligência artificial adaptadas a diferentes formas de uso.",
    tags: ["samsung", "galaxy-z", "galaxy-ai", "smartphones-dobraveis", "inteligencia-artificial", "galaxy-z-fold8-ultra", "galaxy-z-fold8", "galaxy-z-flip8"],
    blocks: [
      {
        type: "paragraph",
        text: "A Samsung iniciou no Brasil a entrega do Galaxy Z Fold8 Ultra, Galaxy Z Fold8 e Galaxy Z Flip8, nova geração de smartphones dobráveis da marca. Os aparelhos chegam ao mercado com mudanças no design, nas câmeras e no desempenho, mas é a integração com a inteligência artificial que ocupa o centro da estratégia.",
      },
      {
        type: "paragraph",
        text: "Apresentada globalmente em 22 de julho, a linha começou a ser entregue aos consumidores brasileiros em 21 de agosto. A proposta da Samsung é oferecer três experiências diferentes: produtividade avançada no Fold8 Ultra, equilíbrio entre trabalho e entretenimento no Fold8 e portabilidade no Flip8.",
      },
      {
        type: "paragraph",
        text: "Mais do que atualizar especificações, a empresa tenta mostrar que a inteligência artificial pode se adaptar ao formato físico de cada dispositivo.",
      },
      { type: "heading", text: "Três dobráveis para diferentes formas de uso" },
      {
        type: "paragraph",
        text: "O Galaxy Z Fold8 Ultra ocupa o topo da nova família. O aparelho tem tela interna de 8 polegadas, espessura de 4,1 milímetros quando aberto, câmera principal de 200 megapixels e bateria de 5.000 mAh.",
      },
      {
        type: "paragraph",
        text: "O modelo foi pensado para atividades que se beneficiam de uma tela maior, como edição de documentos, criação de conteúdo, execução simultânea de aplicativos e consumo de vídeos.",
      },
      {
        type: "paragraph",
        text: "O Galaxy Z Fold8 mantém a estrutura de smartphone que se transforma em uma pequena tela de trabalho. Pesando 201 gramas, o dispositivo utiliza o processador Snapdragon 8 Elite Gen 5 for Galaxy e traz mudanças na proporção das telas externa e interna.",
      },
      {
        type: "paragraph",
        text: "Já o Galaxy Z Flip8 aposta em um formato mais compacto. O aparelho pesa 180 gramas, tem 6,1 milímetros de espessura quando aberto e recebeu uma nova versão da FlexWindow, tela externa que permite consultar informações e utilizar recursos sem abrir completamente o telefone.",
      },
      {
        type: "highlight",
        text: "A Samsung não está oferecendo apenas três tamanhos. Cada formato recebeu ferramentas de IA voltadas a uma experiência diferente: produtividade no Ultra, multitarefa no Fold e acesso rápido no Flip.",
      },
      { type: "heading", text: "Inteligência artificial integrada ao formato" },
      {
        type: "paragraph",
        text: "A nova geração chega com recursos como Now Brief, Now Nudge e Gemini Intelligence. As ferramentas podem organizar informações do cotidiano, sugerir ações e acessar diferentes aplicativos para executar tarefas solicitadas pelo usuário.",
      },
      {
        type: "paragraph",
        text: "No Fold8 Ultra, a tela maior permite utilizar assistentes de IA ao lado de documentos, vídeos ou páginas abertas. O usuário pode, por exemplo, consultar informações sem abandonar o conteúdo principal ou trabalhar com diferentes aplicativos simultaneamente.",
      },
      {
        type: "paragraph",
        text: "No Flip8, parte dessas interações pode acontecer pela tela externa. A proposta é permitir o acesso a resumos, notificações e comandos rápidos sem exigir que o aparelho seja aberto a todo momento.",
      },
      {
        type: "paragraph",
        text: "A adaptação da inteligência artificial ao formato representa um passo importante para a categoria. Em vez de apresentar a IA apenas como uma lista de funções adicionais, a Samsung tenta incorporá-la à maneira como cada aparelho é utilizado.",
      },
      {
        type: "quote",
        text: "À medida que a IA se torna mais autônoma, os dispositivos móveis serão a porta de entrada mais pessoal para experiências adaptadas a cada usuário.",
        by: "TM Roh, CEO e responsável pela divisão Device eXperience da Samsung",
      },
      {
        type: "paragraph",
        text: "A declaração foi publicada pela Samsung durante o anúncio global dos aparelhos, em 22 de julho de 2026.",
      },
      { type: "heading", text: "Câmeras e criação de conteúdo continuam em evidência" },
      {
        type: "paragraph",
        text: "As câmeras também foram ajustadas para aproveitar os formatos dobráveis. O Fold8 Ultra utiliza um sensor principal de 200 megapixels e uma nova câmera ultrawide de 50 megapixels.",
      },
      {
        type: "paragraph",
        text: "O Fold8 possui duas câmeras de 50 megapixels e recursos como o My FanCam, criado para acompanhar pessoas em movimento durante gravações.",
      },
      {
        type: "paragraph",
        text: "No Flip8, a combinação da câmera principal de 50 megapixels com o modo FlexCam permite apoiar o aparelho parcialmente dobrado e fotografar sem tripé. A tela externa também pode ser usada para visualizar o enquadramento.",
      },
      {
        type: "paragraph",
        text: "Essas possibilidades interessam especialmente a quem produz vídeos, fotografias ou transmissões para redes sociais. O formato dobrável transforma o próprio aparelho em suporte e facilita gravações individuais ou em grupo.",
      },
      {
        type: "paragraph",
        text: "A abordagem evita limitar a comunicação do Flip8 apenas à aparência ou às opções de cores. Recursos de câmera, personalização e mobilidade podem ser relevantes para diferentes perfis de criadoras e usuárias, sem recorrer à ideia de que determinados produtos precisam ser simplificados para alcançar o público feminino.",
      },
      { type: "heading", text: "Privacidade passa a fazer parte da disputa" },
      {
        type: "paragraph",
        text: "O avanço dos assistentes de IA também aumenta as dúvidas sobre quais informações são analisadas e armazenadas pelos dispositivos.",
      },
      {
        type: "paragraph",
        text: "A Samsung afirma que a linha utiliza recursos como Knox Vault, Privacy Alerts e AI Assistant Activity. O painel permite visualizar quais aplicativos e assistentes tiveram acesso a determinadas informações, enquanto os alertas procuram identificar atividades consideradas sensíveis.",
      },
      {
        type: "paragraph",
        text: "A One UI 9 também reúne controles relacionados à inteligência artificial e à privacidade. A presença dessas ferramentas não elimina a necessidade de atenção, mas indica que a transparência sobre o uso dos dados começa a fazer parte da competição entre fabricantes.",
      },
      {
        type: "highlight",
        text: "Quanto mais os assistentes conhecem hábitos, aplicativos e informações pessoais, mais importantes se tornam os controles que mostram quando e como esses dados foram utilizados.",
      },
      { type: "heading", text: "A disputa agora é pela utilidade da IA" },
      {
        type: "paragraph",
        text: "A inteligência artificial já deixou de ser uma novidade isolada nos smartphones premium. O desafio atual é demonstrar que ela consegue resolver tarefas reais sem tornar a experiência mais complicada.",
      },
      {
        type: "paragraph",
        text: "Com três formatos, a Samsung amplia sua aposta em uma categoria que ainda procura alcançar um público maior. O Fold8 Ultra representa a proposta mais ambiciosa, enquanto o Fold8 busca equilibrar produtividade e entretenimento. O Flip8 tenta levar recursos avançados para um aparelho menor e mais fácil de transportar.",
      },
      {
        type: "paragraph",
        text: "O sucesso dessa estratégia dependerá de fatores como preço, durabilidade das telas, autonomia de bateria e qualidade dos recursos de IA em português. Também será necessário avaliar se as ferramentas continuarão úteis depois do impacto inicial do lançamento.",
      },
      {
        type: "paragraph",
        text: "A nova geração Galaxy Z mostra, porém, que a próxima disputa dos smartphones não acontecerá somente pela melhor câmera ou pelo processador mais rápido. Ela também será definida pela capacidade de transformar inteligência artificial em uma experiência prática, transparente e adaptada à vida de cada pessoa.",
      },
    ],
    sources: [
      { label: "Samsung Global Newsroom — Galaxy Z Fold8 Ultra, Fold8 e Flip8", url: "https://news.samsung.com/global/samsung-galaxy-z-fold8-ultra-fold8-and-flip8foldables-perfected-for-every-way-of-living" },
      { label: "Samsung Newsroom Brasil — apresentação da linha Galaxy Z no Brasil", url: "https://news.samsung.com/br/samsung-apresenta-os-novos-galaxy-z-fold8-galaxy-z-fold8-ultra-e-galaxy-z-flip8-no-brasil" },
      { label: "Samsung Newsroom Brasil — início das entregas da nova linha", url: "https://news.samsung.com/br/sucesso-na-pre-venda-samsung-inicia-entrega-do-novo-galaxy-z-series-no-brasil-nesta-sexta-feira-21" },
      { label: "Samsung Mobile Press — informações oficiais dos aparelhos", url: "https://www.samsungmobilepress.com/articles/galaxy-z-fold8-ultra-fold8-flip8-perfected-every-way-living" },
    ],
  },
  {
    title: "Scott Pilgrim EX transforma Kim Pine e Knives Chau em estilos próprios de combate",
    category: "Games",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "DLC Back in the Band reúne a formação da Sex Bob-omb e mostra como silhueta, postura e animação traduzem personalidade em jogabilidade.",
    tags: ["scott-pilgrim-ex", "back-in-the-band", "knives-chau", "kim-pine", "tribute-games", "pixel-art", "animacao-2d"],
    blocks: [
      {
        type: "paragraph",
        text: "Scott Pilgrim EX recebeu em 27 de agosto o DLC pago Back in the Band, que adiciona Stephen Stills, Kim Pine e Knives Chau ao elenco jogável. O conteúdo reúne a formação completa da Sex Bob-omb e chega acompanhado por Coin-Op Chaos, atualização gratuita com modo Arcade, cooperação e suporte entre plataformas.",
      },
      {
        type: "paragraph",
        text: "Mais do que ampliar a seleção de personagens, o lançamento revela como a Tribute Games usa animação para transformar personalidade em regras de combate. Kim, Knives e Stephen não aparecem apenas com roupas e golpes diferentes: postura, ritmo, alcance e pequenas expressões ajudam a comunicar quem são antes mesmo de a partida começar.",
      },
      { type: "heading", text: "A tela de seleção virou uma pequena apresentação" },
      {
        type: "paragraph",
        text: "Com três novos nomes, a equipe precisou reorganizar a tela de seleção sem perder clareza. O animador Artem Samoilov trabalhou a composição para equilibrar o elenco e, ao mesmo tempo, conduzir o olhar para as novas opções.",
      },
      {
        type: "paragraph",
        text: "Cada animação ociosa foi pensada como uma introdução. Kim Pine demonstra confiança contida e uma dose de atitude. Knives Chau transmite energia e prontidão para se mover. Stephen Stills parece relaxado, mas deixa escapar uma expressão breve de surpresa.",
      },
      {
        type: "quote",
        text: "Cada animação de seleção foi criada como uma pequena performance.",
        by: "Artem Samoilov, animador 2D da Tribute Games",
      },
      {
        type: "paragraph",
        text: "Esses gestos podem passar despercebidos conscientemente, mas cumprem uma função. Em poucos segundos, indicam ritmo e temperamento sem depender de uma ficha de personagem. É uma forma de narrativa visual adequada a um jogo de ação, no qual a leitura precisa acontecer enquanto o público decide com quem jogar.",
      },
      { type: "heading", text: "Silhueta e postura conectam quadrinhos e pixel art" },
      {
        type: "paragraph",
        text: "Antes de chegar aos sprites finais, os novos personagens passaram por esboços que definiram silhueta, postura e personalidade. Pequenas alterações no ângulo do corpo, na expressão ou na amplitude de um gesto ajudam a manter cada figura legível em meio às cores e aos efeitos de um combate cooperativo.",
      },
      {
        type: "paragraph",
        text: "A equipe também precisava permanecer reconhecível para quem acompanha as criações de Bryan Lee O’Malley. O desafio não era copiar um desenho estático, mas traduzir sua identidade para movimentos repetidos centenas de vezes durante uma partida.",
      },
      {
        type: "highlight",
        text: "Em pixel art, poucos quadros precisam cumprir várias funções ao mesmo tempo: indicar personalidade, antecipar o golpe e manter o personagem legível em uma tela cheia de inimigos.",
      },
      {
        type: "paragraph",
        text: "Essa preocupação mostra por que animação de jogos não é apenas acabamento. Uma pose prepara a expectativa de velocidade; uma pausa comunica peso; o alcance de um acessório interfere na distância segura para atacar. O visual ensina o sistema enquanto constrói a caracterização.",
      },
      { type: "heading", text: "Knives Chau ganha velocidade e combate de aproximação" },
      {
        type: "paragraph",
        text: "Knives foi desenhada como uma lutadora rápida, voltada a entrar e sair do alcance dos inimigos. O cachecol funciona como elemento visual e arma, ampliando alguns ataques e reforçando o movimento acrobático. Golpes de faca completam um estilo baseado em pressão e mobilidade.",
      },
      {
        type: "paragraph",
        text: "Essa decisão é importante porque evita transformar a personagem em simples variação de outro lutador. A Tribute Games afirma que o objetivo era traduzir sua personalidade para a jogabilidade. Energia inquieta, rapidez e iniciativa aparecem tanto nas animações quanto na maneira de controlar Knives.",
      },
      {
        type: "paragraph",
        text: "Kim Pine segue uma direção diferente. Sua presença mais firme e controlada combina com a baterista que observa o caos ao redor com expressão pouco impressionada. Mesmo quando o material divulgado não detalha cada número ou combinação, a equipe deixa claro que postura e tempo ajudam a diferenciar sua atuação.",
      },
      {
        type: "paragraph",
        text: "O recorte também amplia o espaço de duas personagens femininas que, em adaptações anteriores, muitas vezes orbitavam os conflitos afetivos de Scott. Como lutadoras selecionáveis, Kim e Knives passam a ser definidas por decisões de design, habilidades e formas próprias de ocupar a tela.",
      },
      { type: "heading", text: "Back in the Band é pago, mas a atualização Arcade é gratuita" },
      {
        type: "paragraph",
        text: "O pacote Back in the Band custa US$ 3,99 no mercado internacional e adiciona os três personagens, novos assistentes, movimentos, combinações e paletas. Preço e disponibilidade na loja brasileira devem ser conferidos antes da publicação, porque conversão, impostos e condições regionais podem alterar o valor.",
      },
      {
        type: "paragraph",
        text: "Ao mesmo tempo, Coin-Op Chaos chega gratuitamente. A atualização introduz um modo Arcade baseado em vidas, créditos, pontuação e ranking local. Também oferece cooperação, entrada e saída durante a sessão e suporte multiplataforma.",
      },
      {
        type: "highlight",
        text: "O conteúdo foi dividido em duas partes: personagens adicionais no DLC pago e um modo Arcade gratuito para toda a base do jogo.",
      },
      {
        type: "paragraph",
        text: "A separação permite que o estúdio venda a expansão de elenco sem colocar a nova estrutura Arcade atrás do mesmo pagamento. Ainda assim, a recepção dependerá do equilíbrio dos personagens, da integração com o elenco original e do valor cobrado em cada região.",
      },
      { type: "heading", text: "Personalidade não precisa parar na aparência" },
      {
        type: "paragraph",
        text: "Scott Pilgrim sempre reuniu quadrinhos, música, games e referências à cultura pop. Em Scott Pilgrim EX, essa mistura só funciona quando cada linguagem participa da experiência, em vez de servir como decoração nostálgica.",
      },
      {
        type: "paragraph",
        text: "O trabalho apresentado pela Tribute Games mostra um processo de observação e iteração. Conceitos estabelecem silhuetas; sprites testam leitura; expressões quase invisíveis dão humanidade; golpes transformam traços de personalidade em escolhas mecânicas.",
      },
      {
        type: "paragraph",
        text: "Kim Pine e Knives Chau são bons exemplos do resultado possível quando personagens conhecidas recebem espaço para agir com identidade própria. Uma é marcada por confiança contida; a outra, por velocidade e energia. Nenhuma precisa ser reduzida à relação que mantém com Scott.",
      },
      {
        type: "paragraph",
        text: "Ao reunir a Sex Bob-omb e expandir o elenco, Back in the Band entrega conteúdo novo. Seu aspecto mais interessante, porém, está nos bastidores: a demonstração de que alguns poucos pixels, quando bem dirigidos, conseguem dizer quem uma personagem é e como ela quer lutar.",
      },
    ],
    sources: [
      { label: "PlayStation Blog — processo criativo de Back in the Band", url: "https://blog.playstation.com/2026/08/27/scott-pilgrim-ex-bringing-three-new-heroes-to-life-in-back-in-the-band-dlc/" },
      { label: "GamesPress — comunicado oficial de lançamento do DLC e da atualização", url: "https://www.gamespress.com/SCOTT-PILGRIM-EX-BRINGS-THE-BAND-BACK-TOGETHER-WITH-NEW-PAID-DLC-AND-F" },
      { label: "Nintendo Everything — disponibilidade no Nintendo Switch", url: "https://nintendoeverything.com/scott-pilgrim-ex-reveals-back-in-the-band-dlc-and-free-coin-op-chaos-update/" },
      { label: "Polygon — desenvolvimento e colaboração com Bryan Lee O’Malley", url: "https://www.polygon.com/gaming/604420/scott-pilgrim-ex-new-game-release" },
    ],
  },
  {
    title: "Star Wars Zero Company estreia com estratégia e liberdade para criar seu próprio esquadrão",
    category: "Star Wars",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Novo jogo da Bit Reactor leva as Guerras Clônicas para uma campanha centrada em personalização, vínculos e decisões que afetam toda a equipe.",
    tags: ["star-wars", "star-wars-zero-company", "games", "bit-reactor", "lucasfilm-games", "electronic-arts"],
    blocks: [
      {
        type: "paragraph",
        text: "Star Wars Zero Company chegou em 27 de agosto ao PC, PlayStation 5 e Xbox Series X|S com uma proposta diferente de boa parte dos jogos da franquia: colocar o jogador no comando de uma equipe personalizável em batalhas táticas por turnos.",
      },
      {
        type: "paragraph",
        text: "Desenvolvido pela Bit Reactor em colaboração com a Lucasfilm Games e publicado pela Electronic Arts, o título se passa no período final das Guerras Clônicas. Em vez de acompanhar novamente os personagens mais conhecidos da saga, a campanha apresenta um grupo que trabalha nas sombras do conflito.",
      },
      {
        type: "paragraph",
        text: "O jogador assume o controle de Hawks, antiga liderança militar da República e atual comandante da Zero Company, uma organização formada por mercenários, ex-soldados, alienígenas, droides e especialistas de diferentes origens.",
      },
      {
        type: "paragraph",
        text: "A missão do grupo é impedir os planos de Kundri Fathom, líder da Infinite Coil, organização ligada aos Separatistas que ameaça espalhar uma praga pela galáxia.",
      },
      {
        type: "highlight",
        text: "Mais do que comandar personagens predeterminados, o jogador pode construir sua própria liderança e definir quem fará parte da Zero Company.",
      },
      { type: "heading", text: "Uma história construída ao redor da equipe" },
      {
        type: "paragraph",
        text: "Hawks ocupa a posição central da campanha, mas pode ter nome, aparência, espécie, voz, roupas e especialização definidos pelo jogador.",
      },
      {
        type: "paragraph",
        text: "A equipe também combina personagens desenvolvidos pela Bit Reactor com operadores personalizados. Esses novos integrantes recebem identidade visual, equipamentos, habilidades e funções escolhidas de acordo com o estilo de cada campanha.",
      },
      {
        type: "paragraph",
        text: "Essa liberdade permite formar um esquadrão ofensivo, priorizar especialistas em suporte, investir em ataques de longa distância ou equilibrar diferentes funções.",
      },
      {
        type: "paragraph",
        text: "A personalização não fica restrita aos combates. Segundo a Bit Reactor, a maioria das cenas é processada em tempo real para que os personagens criados apareçam durante os principais momentos da história.",
      },
      {
        type: "paragraph",
        text: "Hawks, portanto, não precisa corresponder a um único gênero, aparência ou origem previamente estabelecida. A liderança da companhia também funciona como um espaço de identificação dentro do universo de Star Wars.",
      },
      { type: "heading", text: "Mulheres ocupam posições centrais no conflito" },
      {
        type: "paragraph",
        text: "A campanha apresenta personagens femininas em diferentes lados da guerra e não as concentra apenas em funções de apoio.",
      },
      {
        type: "paragraph",
        text: "Tel-Rea Vokoss é uma padawan Tognath que tenta honrar o legado de sua mestra Jedi. Cly Kullervo pertence a um antigo clã de guerreiros mandalorianos e se aproxima da companhia durante sua busca por vingança.",
      },
      {
        type: "paragraph",
        text: "Jae Mordant exerce influência política e econômica na história. Depois de perder seu território para a Infinite Coil, ela participa diretamente da contratação da Zero Company.",
      },
      {
        type: "paragraph",
        text: "Kundri Fathom também ocupa uma posição de autoridade própria: é ela quem lidera a organização que o esquadrão precisa enfrentar.",
      },
      {
        type: "paragraph",
        text: "A campanha completa mostrará se todas essas personagens receberam o mesmo cuidado narrativo. O que já chama atenção é a variedade de funções que exercem — liderança, combate, estratégia, poder político e oposição.",
      },
      {
        type: "paragraph",
        text: "Para o público feminino geek, essa construção possui um valor que vai além da quantidade de mulheres presentes. Representatividade também envolve tomar decisões, liderar equipes e participar ativamente dos conflitos que movimentam a história.",
      },
      {
        type: "quote",
        text: "Em Zero Company, a personalização mais interessante não está apenas na aparência de Hawks, mas na possibilidade de imaginar diferentes pessoas ocupando a posição de liderança.",
        by: "Shirley Brito, ARS GEEK",
      },
      { type: "heading", text: "Cada decisão pode colocar o esquadrão em risco" },
      {
        type: "paragraph",
        text: "As batalhas acontecem em turnos e utilizam uma câmera isométrica. Cada integrante possui pontos de ação que podem ser usados para movimentação, ataques e habilidades especiais.",
      },
      {
        type: "paragraph",
        text: "Cobertura, distância, linha de visão e probabilidade de acerto interferem nos confrontos. O jogador também precisa combinar as capacidades dos operadores, já que nenhuma personagem foi criada para resolver todas as situações sozinha.",
      },
      {
        type: "paragraph",
        text: "As consequências podem ser permanentes. Na dificuldade padrão, um operador que acumular três ferimentos pode morrer definitivamente. A base da companhia possui até mesmo um memorial dedicado aos integrantes perdidos durante a campanha.",
      },
      {
        type: "paragraph",
        text: "O sistema aumenta o peso de cada escolha. Arriscar uma posição para concluir um objetivo pode colocar em perigo alguém que participou de várias missões e desenvolveu relações com o restante do grupo.",
      },
      { type: "heading", text: "Vínculos também fazem parte da estratégia" },
      {
        type: "paragraph",
        text: "Entre as missões, o esquadrão retorna ao Den, sua base de operações no Anel de Kafrene. O local permite recrutar integrantes, tratar ferimentos, melhorar equipamentos e conversar com os membros da companhia.",
      },
      {
        type: "paragraph",
        text: "Personagens que lutam juntos desenvolvem vínculos capazes de desbloquear benefícios permanentes. Algumas decisões tomadas por Hawks também podem fortalecer uma relação e prejudicar outra.",
      },
      {
        type: "paragraph",
        text: "O recurso não transforma o jogo em um simulador de relacionamentos, mas acrescenta uma dimensão humana à estratégia. O jogador não administra apenas habilidades e equipamentos: também precisa lidar com confiança, discordâncias e perdas.",
      },
      {
        type: "highlight",
        text: "Os vínculos entre operadores podem liberar vantagens permanentes, enquanto escolhas realizadas durante a campanha alteram a relação entre os integrantes da companhia.",
      },
      { type: "heading", text: "Uma nova perspectiva para as Guerras Clônicas" },
      {
        type: "paragraph",
        text: "As Guerras Clônicas já foram exploradas em filmes, séries, animações, livros e outros jogos. A novidade de Zero Company não está no período escolhido, mas no ponto de vista.",
      },
      {
        type: "paragraph",
        text: "O jogo deixa os grandes heróis da saga em segundo plano e concentra sua história em uma equipe formada por personagens que dificilmente apareceriam nos registros oficiais da guerra.",
      },
      {
        type: "paragraph",
        text: "A proposta combina personalização, combate tático e relações entre integrantes do esquadrão. Seu sucesso dependerá do equilíbrio das batalhas, da variedade das missões e da capacidade da campanha de fazer cada escolha parecer realmente importante.",
      },
      {
        type: "paragraph",
        text: "Mais do que permitir escolher a aparência de Hawks, o desafio da Bit Reactor será fazer o jogador acreditar que aquela companhia — com suas diferenças, vínculos e perdas — realmente lhe pertence.",
      },
    ],
    sources: [
      { label: "Electronic Arts — Lead Zero Company to Victory", url: "https://www.ea.com/games/starwars/zero-company/news/lead-zero-company-to-victory" },
      { label: "Electronic Arts — Answering the Internet’s Biggest Questions", url: "https://www.ea.com/games/starwars/zero-company/news/answering-biggest-questions" },
      { label: "StarWars.com — Final Trailer de Star Wars Zero Company", url: "https://www.starwars.com/news/star-wars-zero-company-gameplay-trailer" },
    ],
  },
  {
    title: "Whisper of the House transforma organização em narrativa e chega ao PS5",
    category: "Games",
    author: "Shirley Brito",
    date: "2026-08-28",
    excerpt:
      "Jogo cozy da GD Studio combina mais de 1.800 móveis, liberdade de decoração e pequenos mistérios contados pelos objetos deixados em cada ambiente.",
    tags: ["whisper-of-the-house", "gd-studio", "jogos-cozy", "playstation-5", "xbox-series", "pixel-art", "narrativa-ambiental"],
    blocks: [
      {
        type: "paragraph",
        text: "Whisper of the House chegou ao PlayStation 5 em 27 de agosto. Desenvolvido pela GD Studio, o jogo coloca o público no papel de uma pessoa responsável por organizar mudanças, abrir lojas, arrumar cômodos e ajudar moradores de Whisper Town — tarefas que parecem simples, mas escondem histórias sobre quem viveu em cada espaço.",
      },
      {
        type: "paragraph",
        text: "O lançamento amplia a presença de um tipo de game que encontra desafio fora do combate. Aqui, observar, escolher, combinar e interpretar importam mais do que derrotar inimigos. A proposta conversa com quem procura experiências tranquilas, mas não se limita à decoração: objetos, cartas e detalhes estranhos formam uma camada de mistério que recompensa a curiosidade.",
      },
      { type: "heading", text: "Cada cômodo funciona como retrato de uma pessoa" },
      {
        type: "paragraph",
        text: "Os pedidos começam com problemas concretos. Um morador precisa se instalar em uma casa nova; outro quer remover a desordem; uma loja deve ser preparada para abrir. Enquanto o ambiente ganha forma, os objetos indicam hábitos, lembranças e planos interrompidos.",
      },
      {
        type: "paragraph",
        text: "Uma xícara esquecida perto da cama, uma planta virada para a janela ou uma carta escondida atrás dos livros pode revelar mais do que um diálogo expositivo. A GD Studio descreve os cômodos como pequenos retratos de seus proprietários, construídos pela relação entre objetos e espaço.",
      },
      {
        type: "paragraph",
        text: "Essa escolha aproxima Whisper of the House da narrativa ambiental. O jogador não recebe todas as respostas prontas. Precisa observar o que foi guardado, o que está fora do lugar e quais combinações sugerem algo sobre a pessoa que pediu ajuda.",
      },
      {
        type: "quote",
        text: "Queríamos que os jogadores sentissem o prazer de tornar um cômodo funcional enquanto também se perguntavam por que ele era daquele jeito.",
        by: "Zhicheng, produtor da GD Studio",
      },
      { type: "heading", text: "Organizar não significa encontrar uma única resposta" },
      {
        type: "paragraph",
        text: "O jogo evita transformar todo pedido em uma lista rígida. Algumas encomendas exigem compreender uma necessidade específica; outras dão liberdade para montar o espaço de acordo com a interpretação de quem joga.",
      },
      {
        type: "paragraph",
        text: "O catálogo reúne mais de 1.800 peças de mobiliário e mais de dez plantas de casas. Papéis de parede, pisos e determinados móveis podem receber ajustes de cor ou textura. A variedade permite criar desde um escritório coberto de estantes até uma estufa iluminada ou um abrigo cheio de suprimentos.",
      },
      {
        type: "highlight",
        text: "Com mais de 1.800 móveis e mais de dez plantas, Whisper of the House usa a personalização como parte da narrativa, não apenas como recompensa estética.",
      },
      {
        type: "paragraph",
        text: "Essa liberdade também evita uma mensagem comum em jogos de organização: a ideia de que existe somente uma casa correta, vazia e visualmente perfeita. A GD Studio afirma que o objetivo não é fazer todos os ambientes parecerem iguais, mas compreender o que importa para cada morador e criar um lugar onde sua história possa continuar.",
      },
      { type: "heading", text: "Pequenas interações sustentam o ritmo cozy" },
      {
        type: "paragraph",
        text: "A quantidade de móveis não é o único elemento apresentado pelo estúdio. Muitos objetos respondem ao toque: um gramofone pode ser acionado, um pato de borracha apertado e uma folha retirada de uma caixa de lenços.",
      },
      {
        type: "paragraph",
        text: "Essas ações nem sempre avançam uma missão. Elas existem para tornar o cenário tátil e recompensar quem experimenta. O desenho de som acompanha essa intenção com ruídos de cerâmica, páginas, vento e outros detalhes próximos de uma atmosfera ASMR.",
      },
      {
        type: "paragraph",
        text: "O resultado procura oferecer um ritmo sem urgência. Pegar, mover e posicionar um objeto deve ser satisfatório por si só. É uma filosofia diferente da progressão baseada em velocidade ou pontuação, embora ainda exija atenção para interpretar os pedidos e descobrir soluções.",
      },
      {
        type: "paragraph",
        text: "Jogos cozy são frequentemente tratados como uma categoria menor ou associada de forma automática a um único perfil de público. Whisper of the House ajuda a mostrar por que essa leitura é limitada. Design de sistemas, narrativa ambiental, interação e composição visual continuam presentes; apenas trabalham com outros tipos de tensão e recompensa.",
      },
      { type: "heading", text: "A cidade acolhedora também guarda segredos" },
      {
        type: "paragraph",
        text: "Whisper Town não é completamente comum. O estúdio cita um número 42 flutuando dentro de um museu, rumores sobre um fantasma perto do poço, rachaduras que escondem algo impossível e cartas que levantam novas perguntas.",
      },
      {
        type: "paragraph",
        text: "A equipe chama essa camada de “investigação cozy”. Os mistérios não interrompem o ritmo nem obrigam o jogador a correr para a próxima revelação. Eles permanecem ao lado das tarefas de organização, esperando que alguém note uma inconsistência.",
      },
      {
        type: "highlight",
        text: "O mesmo olhar usado para escolher o lugar de uma lembrança também pode revelar que existe algo estranho naquele cômodo.",
      },
      {
        type: "paragraph",
        text: "Essa combinação amplia a motivação para continuar explorando. Arrumar uma casa produz satisfação imediata; compreender o que aconteceu com seus moradores cria continuidade. O mistério nasce dos mesmos espaços e objetos usados na decoração, em vez de parecer um sistema separado.",
      },
      { type: "heading", text: "Um lançamento que valoriza atenção e cuidado" },
      {
        type: "paragraph",
        text: "Whisper of the House já estava disponível para computadores e recebeu agora versões para PS5 e Xbox Series. No PlayStation 5, o lançamento foi acompanhado por desconto de 20% por tempo limitado; preço e duração da oferta podem variar conforme a região, por isso devem ser confirmados diretamente na loja brasileira antes da publicação.",
      },
      {
        type: "paragraph",
        text: "Mais do que oferecer um catálogo extenso, o jogo propõe outra relação com os ambientes virtuais. Uma casa não é apenas um tabuleiro a ser limpo nem uma vitrine pronta para receber itens raros. Ela guarda escolhas, ausências e lembranças.",
      },
      {
        type: "paragraph",
        text: "Ao transformar organização em forma de escuta, a GD Studio constrói uma experiência que encontra história nas coisas pequenas. Whisper of the House pode parecer silencioso diante de lançamentos maiores, mas justamente por isso oferece um espaço diferente: um jogo em que prestar atenção é a principal habilidade.",
      },
    ],
    sources: [
      { label: "PlayStation Blog — anúncio oficial da chegada ao PS5", url: "https://blog.playstation.com/2026/08/27/whisper-of-the-house-opens-its-doors-on-ps5-today/" },
      { label: "PlayStation Store — página oficial de Whisper of the House", url: "https://store.playstation.com/" },
      { label: "Xbox Wire — pré-venda e lançamento nos consoles Xbox", url: "https://news.xbox.com/en-us/2026/08/14/whisper-of-the-house-unpacks-cozy-xbox-preorders-today/" },
      { label: "Gematsu — confirmação de plataformas e conteúdo", url: "https://www.gematsu.com/2026/08/whisper-of-the-house-coming-to-ps5-xbox-series-on-august-27" },
    ],
  },
];

/**
 * Ordena e decora os posts. A ordem do array define a home: o primeiro item é
 * o destaque principal, os dois seguintes são os cards laterais e os seis
 * seguintes preenchem a seção "Recentes".
 */
const ORDER: string[] = [
  "Gemini Omni 1.1 Flash leva vídeo por IA a 4K e amplia o controle dos criadores",
  "Mercado de segurança para inteligência artificial pode alcançar US$ 4,8 bilhões em 2027",
  "Metal Gear Solid 4 deixa o PlayStation 3 após 18 anos com a Master Collection Vol. 2",
  "ROG Xbox Ally X20 aposta em tela OLED e hardware premium",
  "Samsung apresenta nova geração Galaxy Z e amplia disputa por smartphones com IA",
  "Scott Pilgrim EX transforma Kim Pine e Knives Chau em estilos próprios de combate",
  "Star Wars Zero Company estreia com estratégia e liberdade para criar seu próprio esquadrão",
  "Whisper of the House transforma organização em narrativa e chega ao PS5",
  "Resident Evil Requiem: como a Capcom reencontrou a essência de Resident Evil",
  "Star Wars: A Caçada por Ben Solo nasceu de uma ideia de Adam Driver, mas nunca recebeu sinal verde da Disney",
  "God of War Laufey: Faye assume o centro da franquia em novo capítulo oficial",
  "Kevin Feige projeta MCU mais simples após Guerras Secretas, com X-Men no centro",
  "Trailer final de Homem-Aranha: Um Novo Dia relembra Peter antes da estreia no Brasil",
  "Crunchyroll retira 15 títulos no Brasil em julho de 2026 - veja a lista completa",
  "Fatal Fury: City of the Wolves confirma Season 3 para julho — mas o line-up de lutadores ainda é segredo",
  "Bleach se aproxima do fim: a temporada final encerra a jornada de Ichigo Kurosaki",
  "The Odyssey: o épico de US$ 250 milhões de Nolan chega nesta semana, todo em IMAX",
  "NVIDIA Vera Rubin: a plataforma de seis chips que redefine a régua da IA em 2026",
  "GTA VI: a espera até 19 de novembro — anatomia dos dois adiamentos do jogo mais aguardado da história",
  "Windows 10 ganha sobrevida até 2027 — e o que isso diz sobre os 400 milhões de PCs sem upgrade",
  "Supergirl divide opiniões, mas confirma a aposta do DCU em autores — e em riscos",
  "Criptografia pós-quântica vira maioria: mais de 60% do tráfego web já resiste ao computador quântico",
  "Vingadores: Doomsday em dezembro — Robert Downey Jr. como Doutor Destino e o maior elenco da história do MCU",
  "Frieren encerra a 2ª temporada e já tem a 3ª marcada: a jornada continua em outubro de 2027",
  "The Mandalorian and Grogu: o que os US$ 340 milhões dizem sobre o futuro de Star Wars no cinema",
  "Homem-Aranha: Um Novo Dia estreia dia 31 — Peter Parker contra o Hulk, quatro anos depois do feitiço",
  "Switch 2, um ano depois: recordes, freio na produção e o dilema do preço",
  "Demon Slayer: Castelo Infinito é o maior filme japonês da história — e os recordes não param de cair",
  "Superman, um ano depois: os US$ 618 milhões que reergueram a DC",
  "Star Wars: Starfighter já está filmado — tudo o que sabemos do filme de Ryan Gosling",
  "Avatar: Fire and Ash fecha em US$ 1,49 bilhão — e a franquia de Cameron cruza os US$ 6 bilhões",
  "Silksong, dez meses depois: o que os 7 milhões de cópias ensinam sobre paciência e escopo",
  "Chainsaw Man – O Filme: Arco da Reze prova que a MAPPA sabia exatamente o que estava fazendo",
  "The Batman: Parte II em produção — o que se sabe do retorno de Pattinson a Gotham",
  "StageCraft: como a tecnologia criada para The Mandalorian reinventou os sets de Hollywood",
  "Como Duna: Parte Dois venceu os Oscars de Som e Efeitos Visuais — a engenharia do deserto",
  "Um ano de Quarteto Fantástico: Primeiros Passos — o filme que salvou o ano da Marvel e armou Doomsday",
];

function decorate(seed: Seed, index: number): Post {
  const category = getCategory(seed.category);
  const slug = slugify(seed.title);
  const cover = COVERS[slug];
  if (!cover) throw new Error(`Imagem de capa não cadastrada para o artigo: ${slug}`);
  return {
    ...seed,
    ...cover,
    slug,
    author: seed.author ?? AUTHOR,
    date: seed.date ?? PUBLISH_DATE,
    code: `${category.code}${String(index + 1).padStart(3, "0")}`,
    color: category.color,
    colorDim: hexToRgba(category.color, 0.4),
    tint: hexToRgba(category.color, 0.1),
    tintDeep: hexToRgba(category.color, 0.28),
    initials: initials(seed.author ?? AUTHOR),
  };
}

export const POSTS: Post[] = ORDER.map((title, index) => {
  const seed = SEEDS.find((s) => s.title === title);
  if (!seed) throw new Error(`Post não encontrado na ordenação: ${title}`);
  return decorate(seed, index);
});

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
