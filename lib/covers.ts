import type { PostCover } from "./types";

/**
 * Imagens de capa dos artigos — arquivos locais em /public/images/articles,
 * organizados por categoria. Todas baixadas do Wikimedia Commons com licença
 * compatível com uso editorial (CC0, domínio público, CC BY ou CC BY-SA).
 * O registro completo, com URLs e datas de acesso, está em IMAGE_CREDITS.md.
 *
 * Chaveado pelo slug do artigo; o merge acontece em lib/posts.ts (decorate).
 */
export const COVERS: Record<string, PostCover> = {
  "the-odyssey-o-epico-de-us-250-milhoes-de-nolan-chega-nesta-semana-todo-em-imax": {
    coverImage: "/images/articles/filmes/the-odyssey-arte-oficial.webp",
    coverImageAlt: "Arte oficial de The Odyssey: Odisseu de armadura e elmo diante do Cavalo de Troia em chamas",
    imageCredit: "Universal Pictures",
    imageSource: "https://www.odysseymovie.com/",
    imageLicense: "Material promocional oficial",
  },
  "avatar-fire-and-ash-fecha-em-us-1-49-bilhao-e-a-franquia-de-cameron-cruza-os-us-6-bilhoes": {
    coverImage: "/images/articles/filmes/avatar-fire-ash-poster-oficial.webp",
    coverImageAlt: "Pôster oficial de Avatar: Fire and Ash com a vilã Varang, a família Sully e as paisagens de Pandora",
    imageCredit: "20th Century Studios / Disney",
    imageSource: "https://www.avatar.com/movies/avatar-fire-and-ash",
    imageLicense: "Material promocional oficial",
  },
  "como-duna-parte-dois-venceu-os-oscars-de-som-e-efeitos-visuais-a-engenharia-do-deserto": {
    coverImage: "/images/articles/filmes/duna-parte-dois-deserto.webp",
    coverImageAlt: "Dunas de areia do deserto de Erg Chebbi ao pôr do sol, paisagem que remete a Arrakis",
    imageCredit: "Thomas Fuhrmann",
    imageSource: "https://commons.wikimedia.org/wiki/File:Erg_Chebbi_sunset.jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "the-mandalorian-and-grogu-o-que-os-us-340-milhoes-dizem-sobre-o-futuro-de-star-wars-no-cinema": {
    coverImage: "/images/articles/star-wars/the-mandalorian-and-grogu-cosplay.webp",
    coverImageAlt: "Cosplayer com armadura completa do Mandaloriano em concurso de cosplay da GalaxyCon",
    imageCredit: "John Manard",
    imageSource: "https://commons.wikimedia.org/wiki/File:Saturday_Cosplay_Contest_Mandalorian_Cosplay_at_GalaxyCon_Richmond_2022_01.jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "star-wars-starfighter-ja-esta-filmado-tudo-o-que-sabemos-do-filme-de-ryan-gosling": {
    coverImage: "/images/articles/star-wars/starfighter-xwing-replica.webp",
    coverImageAlt: "Réplica em escala real de um caça estelar X-wing T-65B, símbolo dos starfighters de Star Wars, em exposição",
    imageCredit: "ZLEA",
    imageSource: "https://commons.wikimedia.org/wiki/File:Incom_T-65B_X-wing_replica_(6-17-2025).jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "stagecraft-como-a-tecnologia-criada-para-the-mandalorian-reinventou-os-sets-de-hollywood": {
    coverImage: "/images/articles/star-wars/stagecraft-estudio-producao-virtual.webp",
    coverImageAlt: "Estúdio de produção virtual com painéis de LED exibindo cenário espacial em tempo real, câmeras e mesa de controle",
    imageCredit: "Tim Sheerman-Chase",
    imageSource: "https://commons.wikimedia.org/wiki/File:University_of_Portsmouth_CCIXR_1_Virtual_Production_and_Mixed_Reality_Studio.jpg",
    imageLicense: "CC BY 2.0",
  },
    "star-wars-a-cacada-por-ben-solo-nasceu-de-uma-ideia-de-adam-driver-mas-nunca-recebeu-sinal-verde-da-disney": {
    coverImage: "/images/articles/star-wars/ben-solo-hunt-oficial.jpg",
    coverImageAlt:
      "Ben Solo caracterizado como Kylo Ren em imagem promocional oficial de Star Wars",
    imageCredit: "Lucasfilm Ltd.",
    imageSource: "https://www.starwars.com/",
    imageLicense: "Material promocional oficial",
  },
  "vingadores-doomsday-em-dezembro-robert-downey-jr-como-doutor-destino-e-o-maior-elenco-da-historia-do-mcu": {
    coverImage: "/images/articles/marvel/avengers-doomsday-robert-downey-jr.webp",
    coverImageAlt: "Robert Downey Jr., intérprete do Doutor Destino, em painel da San Diego Comic-Con",
    imageCredit: "Gage Skidmore",
    imageSource: "https://commons.wikimedia.org/wiki/File:Robert_Downey,_Jr._SDCC_2014.jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "homem-aranha-um-novo-dia-estreia-dia-31-peter-parker-contra-o-hulk-quatro-anos-depois-do-feitico": {
    coverImage: "/images/articles/marvel/spider-man-brand-new-day-tom-holland.webp",
    coverImageAlt: "Tom Holland, intérprete do Homem-Aranha, sorrindo em evento de divulgação",
    imageCredit: "Gage Skidmore",
    imageSource: "https://commons.wikimedia.org/wiki/File:Tom_Holland_(28652888235).jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "um-ano-de-quarteto-fantastico-primeiros-passos-o-filme-que-salvou-o-ano-da-marvel-e-armou-doomsday": {
    coverImage: "/images/articles/marvel/quarteto-fantastico-pedro-pascal.webp",
    coverImageAlt: "Pedro Pascal, o Reed Richards de Quarteto Fantástico: Primeiros Passos, no festival SXSW 2025",
    imageCredit: "Bea Phi",
    imageSource: "https://commons.wikimedia.org/wiki/File:Pedro_Pascal,_actor,_at_SXSW_2025_01.jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "supergirl-divide-opinioes-mas-confirma-a-aposta-do-dcu-em-autores-e-em-riscos": {
    coverImage: "/images/articles/dc/supergirl-arte-oficial.webp",
    coverImageAlt: "Arte oficial de Supergirl: Milly Alcock de uniforme, ajoelhada diante do brasão da personagem",
    imageCredit: "Warner Bros. / DC Studios",
    imageSource: "https://www.supergirlmovie.com/",
    imageLicense: "Material promocional oficial",
  },
  "superman-um-ano-depois-os-us-618-milhoes-que-reergueram-a-dc": {
    coverImage: "/images/articles/dc/superman-david-corenswet.webp",
    coverImageAlt: "David Corenswet caracterizado como Clark Kent durante as filmagens de Superman em Cleveland",
    imageCredit: "Erik Drost",
    imageSource: "https://commons.wikimedia.org/wiki/File:David_Corenswet_as_Clark_Kent_(53817593908).jpg",
    imageLicense: "CC BY 2.0",
  },
  "the-batman-parte-ii-em-producao-o-que-se-sabe-do-retorno-de-pattinson-a-gotham": {
    coverImage: "/images/articles/dc/the-batman-arte-oficial.webp",
    coverImageAlt: "Arte oficial de The Batman (2022): o Batman de Robert Pattinson sob chuva, com Catwoman, Pinguim e Charada",
    imageCredit: "Warner Bros. Pictures",
    imageSource: "https://www.thebatman.com/",
    imageLicense: "Material promocional oficial",
  },
  "frieren-encerra-a-2-temporada-e-ja-tem-a-3-marcada-a-jornada-continua-em-outubro-de-2027": {
    coverImage: "/images/articles/animes/frieren-cosplay.webp",
    coverImageAlt: "Dupla de cosplayers caracterizada como Frieren e Himmel, do anime Frieren e a Jornada para o Além",
    imageCredit: "Allervous",
    imageSource: "https://commons.wikimedia.org/wiki/File:Cosplay_of_Frieren_and_Himmel_(20250207152727).jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "demon-slayer-castelo-infinito-e-o-maior-filme-japones-da-historia-e-os-recordes-nao-param-de-cair": {
    coverImage: "/images/articles/animes/demon-slayer-castelo-infinito-cosplay.webp",
    coverImageAlt: "Cosplayers de Zenitsu, Tanjiro e Nezuko, protagonistas de Demon Slayer, na FanimeCon",
    imageCredit: "LX-Designs",
    imageSource: "https://commons.wikimedia.org/wiki/File:Cosplay_of_Zenitsu_Agatsuma,_Tanjiro_Kamado_and_Nezuko_Kamado_from_Demon_Slayer_Kimetsu_no_Yaiba_at_FanimeCon_2023_(53055055502).jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "chainsaw-man-o-filme-arco-da-reze-prova-que-a-mappa-sabia-exatamente-o-que-estava-fazendo": {
    coverImage: "/images/articles/animes/chainsaw-man-reze-cosplay.webp",
    coverImageAlt: "Cosplayer caracterizado como Chainsaw Man, com a máscara de serras do personagem Denji",
    imageCredit: "John Manard",
    imageSource: "https://commons.wikimedia.org/wiki/File:Chainsaw_Man_Cosplayer_-_54467246521.jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "gta-vi-a-espera-ate-19-de-novembro-anatomia-dos-dois-adiamentos-do-jogo-mais-aguardado-da-historia": {
    coverImage: "/images/articles/games/gta-vi-arte-oficial.webp",
    coverImageAlt: "Arte promocional oficial de Grand Theft Auto VI com Jason, Lucia e cenas de Vice City",
    imageCredit: "Rockstar Games",
    imageSource: "https://www.rockstargames.com/VI",
    imageLicense: "Material promocional oficial",
  },
  "switch-2-um-ano-depois-recordes-freio-na-producao-e-o-dilema-do-preco": {
    coverImage: "/images/articles/games/nintendo-switch-2-console.webp",
    coverImageAlt: "Console Nintendo Switch 2 encaixado no dock, com os Joy-Con 2 nas laterais",
    imageCredit: "Crisco 1492",
    imageSource: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Docking_Console.jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "nvidia-vera-rubin-a-plataforma-de-seis-chips-que-redefine-a-regua-da-ia-em-2026": {
    coverImage: "/images/articles/tecnologia/nvidia-vera-rubin-jensen-huang.webp",
    coverImageAlt: "Jensen Huang, CEO da NVIDIA, gesticulando durante apresentação no palco",
    imageCredit: "Maurizio Pesce",
    imageSource: "https://commons.wikimedia.org/wiki/File:Nvidia_CEO_Jensen_Huang_gestikuliert.jpg",
    imageLicense: "CC BY 2.0",
  },
  "windows-10-ganha-sobrevida-ate-2027-e-o-que-isso-diz-sobre-os-400-milhoes-de-pcs-sem-upgrade": {
    coverImage: "/images/articles/tecnologia/windows-10-notebook.webp",
    coverImageAlt: "Notebook Surface Laptop 2 exibindo a tela inicial do Windows 10 em uma loja",
    imageCredit: "Donald Trung Quoc Don",
    imageSource: "https://commons.wikimedia.org/wiki/File:Windows_10_Surface_Laptop_2_at_the_Media_Markt_Sontplein,_Groningen_(2020).jpg",
    imageLicense: "CC BY-SA 4.0",
  },
  "criptografia-pos-quantica-vira-maioria-mais-de-60-do-trafego-web-ja-resiste-ao-computador-quantico": {
    coverImage: "/images/articles/tecnologia/criptografia-pos-quantica-ibm-q.webp",
    coverImageAlt: "Computador quântico IBM Q System One instalado em sala de exibição, dentro de sua câmara de vidro",
    imageCredit: "IBM Research",
    imageSource: "https://commons.wikimedia.org/wiki/File:IBM_Q_System_One_(Fraunhofer)_installation.jpg",
    imageLicense: "CC BY 2.0",
  },
  "silksong-dez-meses-depois-o-que-os-7-milhoes-de-copias-ensinam-sobre-paciencia-e-escopo": {
    coverImage: "/images/articles/games/silksong-key-art.webp",
    coverImageAlt: "Arte oficial de Hollow Knight: Silksong com a protagonista Hornet empunhando sua agulha",
    imageCredit: "Team Cherry",
    imageSource: "https://hollowknightsilksong.com/",
    imageLicense: "Press kit oficial",
  },
  "fatal-fury-city-of-the-wolves-confirma-season-3-para-julho-mas-o-line-up-de-lutadores-ainda-e-segredo": {
    coverImage: "/images/articles/games/fatal-fury-city-of-the-wolves-rock-howard.webp",
    coverImageAlt: "Rock Howard, protagonista de Fatal Fury: City of the Wolves, invocando chamas roxas com as duas mãos em cena de gameplay",
    imageCredit: "SNK Corporation",
    imageSource: "https://store.steampowered.com/app/2492040/",
    imageLicense: "Material promocional oficial",
  },
  "god-of-war-laufey-faye-assume-o-centro-da-franquia-em-novo-capitulo-oficial": {
    coverImage: "/images/articles/games/god-of-war-laufey-faye-oficial.webp",
    coverImageAlt: "Faye, protagonista de God of War Laufey, em cenário de fantasia da arte oficial de revelação do jogo",
    imageCredit: "PlayStation / Santa Monica Studio",
    imageSource: "https://www.youtube.com/watch?v=HLMX2w3cwuE",
    imageLicense: "Material promocional oficial — miniatura do vídeo de revelação",
  },
  "bleach-se-aproxima-do-fim-a-temporada-final-encerra-a-jornada-de-ichigo-kurosaki": {
    coverImage: "/images/articles/animes/bleach-tybw-the-calamity-key-visual.webp",
    coverImageAlt: "Arte-chave oficial de Bleach: Thousand-Year Blood War – The Calamity, com Ichigo diante de uma entidade sombria e espadas quebradas, e a data de estreia de 25 de julho de 2026",
    imageCredit: "Tite Kubo / Shueisha / TV TOKYO / dentsu / Pierrot",
    imageSource: "https://bleach-anime.com/",
    imageLicense: "Material promocional oficial",
  },
  "resident-evil-requiem-como-a-capcom-reencontrou-a-essencia-de-resident-evil": {
  coverImage: "/images/articles/games/resident-evil-requiem-leon-kennedy.jpg",
  coverImageAlt: "Leon Kennedy em Resident Evil Requiem.",
  imageCredit: "Capcom",
  imageSource: "",
  imageLicense: "Material promocional oficial",
},
  "crunchyroll-retira-15-titulos-no-brasil-em-julho-de-2026-veja-a-lista-completa": {
    coverImage: "/images/articles/animes/crunchyroll-catalogo-brasil.webp",
    coverImageAlt: "Logotipo laranja da Crunchyroll, representando mudanças no catálogo brasileiro de animes",
    imageCredit: "Crunchyroll",
    imageSource: "https://commons.wikimedia.org/wiki/File:Crunchyroll_logo_2024.png",
    imageLicense: "CC0 1.0",
  },
  "kevin-feige-projeta-mcu-mais-simples-apos-guerras-secretas-com-x-men-no-centro": {
    coverImage: "/images/articles/filmes/kevin-feige-futuro-mcu.webp",
    coverImageAlt: "Kevin Feige fala ao microfone durante painel da San Diego Comic-Con, usando boné dos Vingadores",
    imageCredit: "Gage Skidmore",
    imageSource: "https://commons.wikimedia.org/wiki/File:Kevin_Feige_(48462887397).jpg",
    imageLicense: "CC BY-SA 2.0",
  },
  "trailer-final-de-homem-aranha-um-novo-dia-relembra-peter-antes-da-estreia-no-brasil": {
    coverImage: "/images/articles/filmes/homem-aranha-um-novo-dia-trailer-final.webp",
    coverImageAlt: "MJ é carregada pelo Homem-Aranha entre prédios de Nova York na arte oficial do trailer final dublado",
    imageCredit: "Sony Pictures Brasil / Marvel Studios",
    imageSource: "https://www.youtube.com/watch?v=bwt2-nyEP0A",
    imageLicense: "Material promocional oficial",
  },
  // ── EDIÇÃO 28/08/2026 ───────────────────────────────────────────────
  "gemini-omni-1-1-flash-leva-video-por-ia-a-4k-e-amplia-o-controle-dos-criadores": {
    coverImage: "/images/articles/tecnologia/gemini-omni-1-1-flash-video-ia-4k.webp",
    coverImageAlt:
      "Logotipo Gemini Omni 1.1 Flash cercado por quadros de vídeos criados com inteligência artificial.",
    imageCredit: "Google",
    imageSource: "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-omni-1-1-flash/",
    imageLicense: "Material institucional oficial de divulgação",
  },
  "mercado-de-seguranca-para-inteligencia-artificial-pode-alcancar-us-4-8-bilhoes-em-2027": {
    coverImage: "/images/articles/tecnologia/seguranca-inteligencia-artificial-nist.webp",
    coverImageAlt:
      "Ilustração do NIST mostra marcações maliciosas em uma via desviando a inteligência artificial de um veículo autônomo.",
    imageCredit: "N. Hanacek/NIST",
    imageSource: "https://www.nist.gov/news-events/news/2024/01/nist-identifies-types-cyberattacks-manipulate-behavior-ai-systems",
    imageLicense: "Imagem institucional ilustrativa do NIST",
  },
  "metal-gear-solid-4-deixa-o-playstation-3-apos-18-anos-com-a-master-collection-vol-2": {
    coverImage: "/images/articles/games/metal-gear-solid-master-collection-vol-2.webp",
    coverImageAlt:
      "Arte oficial de Metal Gear Solid: Master Collection Vol. 2, coleção que reúne Metal Gear Solid 4, Peace Walker e conteúdos adicionais.",
    imageCredit: "Konami Digital Entertainment",
    imageSource: "https://www.playstation.com/en-us/games/metal-gear-solid-master-collection-vol-2/",
    imageLicense: "Material promocional oficial",
  },
  "rog-xbox-ally-x20-aposta-em-tela-oled-e-hardware-premium": {
    coverImage: "/images/articles/games/rog-xbox-ally-x20.webp",
    coverImageAlt:
      "ROG Xbox Ally X20 com tela ligada e controles acoplados diante da embalagem comemorativa de 20 anos da linha ROG.",
    imageCredit: "ASUS / Xbox",
    imageSource: "https://news.xbox.com/en-us/2026/08/25/preorder-the-rog-xbox-ally-x20-starting-today/",
    imageLicense: "Material promocional oficial",
  },
  "samsung-apresenta-nova-geracao-galaxy-z-e-amplia-disputa-por-smartphones-com-ia": {
    coverImage: "/images/articles/tecnologia/samsung-galaxy-z-fold8-flip8.webp",
    coverImageAlt:
      "Galaxy Z Flip8, Galaxy Z Fold8 Ultra e Galaxy Z Fold8 apresentados lado a lado em imagem oficial da Samsung.",
    imageCredit: "Samsung Electronics",
    imageSource: "https://news.samsung.com/global/samsung-galaxy-z-fold8-ultra-fold8-and-flip8foldables-perfected-for-every-way-of-living",
    imageLicense: "Material promocional oficial",
  },
  "scott-pilgrim-ex-transforma-kim-pine-e-knives-chau-em-estilos-proprios-de-combate": {
    coverImage: "/images/articles/games/scott-pilgrim-ex-back-in-the-band.webp",
    coverImageAlt:
      "Arte em pixel art de Scott Pilgrim EX Back in the Band com Stephen Stills, Kim Pine e Knives Chau.",
    imageCredit: "Tribute Games / PlayStation",
    imageSource: "https://blog.playstation.com/2026/08/27/scott-pilgrim-ex-bringing-three-new-heroes-to-life-in-back-in-the-band-dlc/",
    imageLicense: "Material promocional oficial",
  },
  "star-wars-zero-company-estreia-com-estrategia-e-liberdade-para-criar-seu-proprio-esquadrao": {
    coverImage: "/images/articles/star-wars/star-wars-zero-company.webp",
    coverImageAlt:
      "Arte oficial de Star Wars Zero Company com Hawks e integrantes do esquadrão reunidos diante do logotipo do jogo.",
    imageCredit: "Electronic Arts / Bit Reactor / Lucasfilm Games",
    imageSource: "https://www.ea.com/games/starwars/zero-company/news/lead-zero-company-to-victory",
    imageLicense: "Material promocional oficial",
  },
  "whisper-of-the-house-transforma-organizacao-em-narrativa-e-chega-ao-ps5": {
    coverImage: "/images/articles/games/whisper-of-the-house-ps5.webp",
    coverImageAlt:
      "Ambiente em pixel art de Whisper of the House com móveis, plantas e objetos organizados em diferentes cômodos.",
    imageCredit: "GD Studio / PlayStation",
    imageSource: "https://blog.playstation.com/2026/08/27/whisper-of-the-house-opens-its-doors-on-ps5-today/",
    imageLicense: "Screenshot promocional oficial",
  },
};
