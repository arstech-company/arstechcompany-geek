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
type Seed = Omit<PostSeed, "slug" | "author" | "date" | keyof PostCover> & { date?: string };

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
];

/**
 * Ordena e decora os posts. A ordem do array define a home: o primeiro item é
 * o destaque principal, os dois seguintes são os cards laterais e os seis
 * seguintes preenchem a seção "Recentes".
 */
const ORDER: string[] = [
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
    author: AUTHOR,
    date: seed.date ?? PUBLISH_DATE,
    code: `${category.code}${String(index + 1).padStart(3, "0")}`,
    color: category.color,
    colorDim: hexToRgba(category.color, 0.4),
    tint: hexToRgba(category.color, 0.1),
    tintDeep: hexToRgba(category.color, 0.28),
    initials: initials(AUTHOR),
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
