// ─────────────────────────────────────────────────────────────────────────────
// CATÁLOGO DEMONSTRATIVO — TF SOLUTIONS
// ─────────────────────────────────────────────────────────────────────────────
// Este arquivo substitui o Firebase na vitrine pública desta DEMO: em vez de
// carregar produtos/categorias/configurações do Firestore de um cliente real,
// a loja carrega um destes "nichos" prontos, escolhido pelo visitante na tela
// inicial. Nada aqui é gravado em nenhum banco de dados — é só front-end.
//
// A maioria dos nichos usa fotos reais (Unsplash, licença livre), uma por
// categoria de produto. Os nichos "lingerie" e "sex shop" são exceção:
// mantêm o cartão colorido com o nome do produto (placehold.co) em vez de
// fotografia, por uma questão de discrição/sensibilidade a pedido do
// cliente. As fotos das "sobre a loja" (dona do negócio) também usam esse
// cartão colorido em todos os nichos, já que não há foto real de pessoa.
//
// O WhatsApp de todos os nichos aponta pro número da TF Solutions: qualquer
// "pedido de teste" feito na demo cai direto numa conversa de verdade.
// ─────────────────────────────────────────────────────────────────────────────

const TF_WHATSAPP_DEMO = "5551982165186";

// Gera a URL do "cartão" de produto: fundo neutro + nome do produto na cor
// principal do nicho (mesma técnica já usada no seed original do projeto).
const swatch = (corHex, nome) =>
    `https://placehold.co/500x500/F3F1EC/${corHex.replace("#", "")}?text=${encodeURIComponent(nome)}`;

// Foto real de categoria (Unsplash, licença livre) — usada nos nichos onde
// fotos de produto fazem sentido. Lingerie e sex shop mantêm o swatch()
// acima por uma questão de discrição/sensibilidade, a pedido do cliente.
const foto = (unsplashId) =>
    `https://images.unsplash.com/photo-${unsplashId}?w=600&h=600&fit=crop&q=80&auto=format`;

const NICHOS = {};

// ═══════════════════════════════════════════════════════════════════════════
// 1. HAMBURGUERIA
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.hamburgueria = {
    meta: { label: "Hamburgueria", icone: "fa-burger" },
    config: {
        nomeLoja: "Bairro Burger",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#C1272D", corSecundaria: "#1C1B1F", corDestaque: "#F2A93B",
        heroTag: "Feito na chapa, na hora do pedido",
        heroTitulo: "O hambúrguer que o bairro pediu",
        heroSubtitulo: "Blends artesanais, pão brioche e muito queijo derretendo",
        heroCorFundo: "#1C1B1F", heroCorFundoFim: "#C1272D",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [2, 3, 4, 5, 6], retiradaHoraInicio: "18:00", retiradaHoraFim: "23:00", retiradaIntervalo: 15,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "hamburgueres", nome: "Hambúrgueres", icone: "fa-burger" },
        { id: "acompanhamentos", nome: "Acompanhamentos", icone: "fa-utensils" },
        { id: "bebidas", nome: "Bebidas", icone: "fa-glass-water" },
    ],
    produtos: [
        { id: 1, nome: "Cheddar Bacon", categoria: "hamburgueres", preco: 28.90, descricao: "Blend 160g, cheddar cremoso, bacon crocante e molho da casa.", imagem: foto("1757834787931-ddd70f3379a5"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Duplo Smash", categoria: "hamburgueres", preco: 32.90, descricao: "Duas carnes smash, queijo prato duplo e cebola caramelizada.", imagem: foto("1757834787931-ddd70f3379a5"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Veggie da Casa", categoria: "hamburgueres", preco: 27.90, descricao: "Hambúrguer de grão-de-bico e legumes, para quem não come carne.", imagem: foto("1757834787931-ddd70f3379a5"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Batata Frita G", categoria: "acompanhamentos", preco: 16.00, descricao: "Porção generosa, crocante por fora.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Onion Rings", categoria: "acompanhamentos", preco: 18.00, descricao: "Anéis de cebola empanados, porção com 10 unidades.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Refrigerante Lata", categoria: "bebidas", preco: 6.50, descricao: "Lata 350ml, gelada.", imagem: foto("1563439633017-3bf254e037c9"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Suco Natural", categoria: "bebidas", preco: 9.00, descricao: "Feito na hora, sabores da casa.", imagem: foto("1563439633017-3bf254e037c9"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "X-Salada", categoria: "hamburgueres", preco: 24.90, descricao: "Blend 150g, queijo, alface, tomate e maionese da casa.", imagem: foto("1757834787931-ddd70f3379a5"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "X-Egg Bacon", categoria: "hamburgueres", preco: 26.90, descricao: "Blend 150g, ovo, bacon e queijo prato.", imagem: foto("1757834787931-ddd70f3379a5"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 10, nome: "Nuggets (10un)", categoria: "acompanhamentos", preco: 17.00, descricao: "Crocantes por fora, macios por dentro.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 11, nome: "Milk-shake", categoria: "bebidas", preco: 14.00, descricao: "Cremoso, sabores chocolate, morango ou baunilha.", imagem: foto("1563439633017-3bf254e037c9"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 2. GALETERIA
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.galeteria = {
    meta: { label: "Galeteria", icone: "fa-drumstick-bite" },
    config: {
        nomeLoja: "Galeto do Seu Nelson",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#8B4513", corSecundaria: "#2B1B10", corDestaque: "#E8A33D",
        heroTag: "Tradição de família",
        heroTitulo: "Galeto no espeto como antigamente",
        heroSubtitulo: "Receita da casa, temperada de véspera e assada na hora",
        heroCorFundo: "#2B1B10", heroCorFundoFim: "#8B4513",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [0, 4, 5, 6], retiradaHoraInicio: "11:00", retiradaHoraFim: "21:00", retiradaIntervalo: 30,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "galetos", nome: "Galetos", icone: "fa-drumstick-bite" },
        { id: "acompanhamentos", nome: "Acompanhamentos", icone: "fa-utensils" },
        { id: "bebidas", nome: "Bebidas", icone: "fa-glass-water" },
    ],
    produtos: [
        { id: 1, nome: "Galeto Inteiro", categoria: "galetos", preco: 65.00, descricao: "Galeto inteiro ao espeto, tempero da casa.", imagem: foto("1777891257551-bd5ecdb71c7e"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Meio Galeto", categoria: "galetos", preco: 35.00, descricao: "Meia porção, ideal pra uma pessoa.", imagem: foto("1777891257551-bd5ecdb71c7e"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Espetinho de Galeto", categoria: "galetos", preco: 12.00, descricao: "Espetinho individual, direto na brasa.", imagem: foto("1777891257551-bd5ecdb71c7e"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Polenta Frita", categoria: "acompanhamentos", preco: 14.00, descricao: "Porção crocante por fora, macia por dentro.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Farofa da Casa", categoria: "acompanhamentos", preco: 10.00, descricao: "Farofa temperada, receita de família.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Refrigerante 2L", categoria: "bebidas", preco: 14.00, descricao: "Garrafa 2 litros, sabores variados.", imagem: foto("1563439633017-3bf254e037c9"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Frango a Passarinho", categoria: "galetos", preco: 38.00, descricao: "Porção frita, temperada na hora.", imagem: foto("1777891257551-bd5ecdb71c7e"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "Costelinha de Porco", categoria: "galetos", preco: 42.00, descricao: "Costelinha assada na brasa, ao molho barbecue.", imagem: foto("1777891257551-bd5ecdb71c7e"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "Salada de Repolho", categoria: "acompanhamentos", preco: 8.00, descricao: "Salada fresca, tempero da casa.", imagem: foto("1668891296479-c88fd8a68509"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 10, nome: "Suco Natural", categoria: "bebidas", preco: 9.00, descricao: "Feito na hora, sabores da casa.", imagem: foto("1563439633017-3bf254e037c9"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 3. DOCES E SALGADOS
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.doceria = {
    meta: { label: "Doces e Salgados", icone: "fa-cookie" },
    config: {
        nomeLoja: "Doces da Vizinha",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#E85D8A", corSecundaria: "#3B2A2A", corDestaque: "#D4AF37",
        heroTag: "Feito em casa, com carinho",
        heroTitulo: "Docinhos que lembram festa de aniversário",
        heroSubtitulo: "Encomendas para festas, datas especiais ou só porque hoje é dia de doce",
        heroCorFundo: "#3B2A2A", heroCorFundoFim: "#E85D8A",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [1, 2, 3, 4, 5, 6], retiradaHoraInicio: "09:00", retiradaHoraFim: "19:00", retiradaIntervalo: 30,
        sobreNome: "Cida Ramos", sobreTexto: "Comecei fazendo doces pra festa dos meus filhos e hoje é o meu negócio. Cada docinho sai da minha cozinha com a mesma receita que uso em casa.", sobreFoto: swatch("#E85D8A", "Cida"), sobreLink: "",
    },
    categorias: [
        { id: "doces", nome: "Doces", icone: "fa-cookie" },
        { id: "salgados", nome: "Salgados", icone: "fa-bowl-food" },
        { id: "bolos", nome: "Bolos", icone: "fa-cake-candles" },
        { id: "festas", nome: "Kits Festa", icone: "fa-gift" },
    ],
    produtos: [
        { id: 1, nome: "Brigadeiro Gourmet", categoria: "doces", preco: 3.50, descricao: "Chocolate belga, granulado crocante. Unidade.", imagem: foto("1503153888445-cd465dba5c3a"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Beijinho", categoria: "doces", preco: 3.50, descricao: "Coco fresquinho, receita da vó. Unidade.", imagem: foto("1503153888445-cd465dba5c3a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Coxinha de Frango", categoria: "salgados", preco: 6.00, descricao: "Massa cremosa, recheio generoso. Unidade.", imagem: foto("1562967914-608f82629710"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Empada de Palmito", categoria: "salgados", preco: 6.50, descricao: "Massa amanteigada, recheio cremoso. Unidade.", imagem: foto("1562967914-608f82629710"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Bolo no Pote", categoria: "bolos", preco: 14.00, descricao: "Camadas de bolo, recheio e cobertura no pote de 300ml.", imagem: foto("1572897305697-f8adb93dae8f"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Kit Docinhos (100un)", categoria: "festas", preco: 180.00, descricao: "Cento de docinhos sortidos para festa, sob encomenda.", imagem: foto("1710077717714-976db5604dd7"), ativo: true, disponibilidade: "encomenda", prazoDias: 3 },
        { id: 7, nome: "Kit Salgados (100un)", categoria: "festas", preco: 150.00, descricao: "Cento de salgadinhos fritos sortidos, sob encomenda.", imagem: foto("1710077717714-976db5604dd7"), ativo: true, disponibilidade: "encomenda", prazoDias: 3 },
        { id: 8, nome: "Trufa", categoria: "doces", preco: 4.50, descricao: "Casquinha crocante, recheio cremoso. Unidade.", imagem: foto("1503153888445-cd465dba5c3a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "Palha Italiana", categoria: "doces", preco: 5.00, descricao: "Biscoito com chocolate, corte quadrado. Unidade.", imagem: foto("1503153888445-cd465dba5c3a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 10, nome: "Esfiha de Carne", categoria: "salgados", preco: 6.00, descricao: "Massa fina, recheio suculento. Unidade.", imagem: foto("1562967914-608f82629710"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 11, nome: "Torta de Limão (fatia)", categoria: "bolos", preco: 12.00, descricao: "Base crocante, recheio cremoso e cobertura de limão.", imagem: foto("1572897305697-f8adb93dae8f"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 4. SEMIJOIAS
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.semijoias = {
    meta: { label: "Semijoias", icone: "fa-gem" },
    config: {
        nomeLoja: "Encanto Semijoias",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#B08D57", corSecundaria: "#1C1B1F", corDestaque: "#D4AF37",
        heroTag: "Coleção Exclusiva",
        heroTitulo: "Peças feitas para brilhar",
        heroSubtitulo: "Joias selecionadas com carinho para todos os momentos",
        heroCorFundo: "#1C1B1F", heroCorFundoFim: "#B08D57",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [1, 2, 3, 4, 5, 6], retiradaHoraInicio: "09:00", retiradaHoraFim: "18:00", retiradaIntervalo: 60,
        sobreNome: "Paula Gonçalves", sobreTexto: "Revendo semijoias há 3 anos, sempre buscando peças de qualidade que caibam no bolso de quem trabalha muito pra chegar onde chegou.", sobreFoto: swatch("#B08D57", "Paula"), sobreLink: "",
    },
    categorias: [
        { id: "aneis", nome: "Anéis", icone: "fa-ring" },
        { id: "pulseiras", nome: "Pulseiras", icone: "fa-circle-notch" },
        { id: "brincos", nome: "Brincos", icone: "fa-gem" },
        { id: "colares", nome: "Colares", icone: "fa-link" },
    ],
    produtos: [
        { id: 1, nome: "Anel Solitário", categoria: "aneis", preco: 89.90, material: "Prata 925", pedra: "Zircônia", tamanho: "Aro 18", tamanhos: ["14", "16", "18", "20"], descricao: "Anel solitário delicado, acabamento polido.", imagem: foto("1598560917807-1bae44bd2be8"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Anel Cravejado", categoria: "aneis", preco: 119.90, material: "Folheado a ouro", pedra: "Zircônias", tamanhos: ["16", "18", "20"], descricao: "Aro fino cravejado, ideal para uso diário.", imagem: foto("1598560917807-1bae44bd2be8"), ativo: true, disponibilidade: "encomenda", prazoDias: 5 },
        { id: 3, nome: "Pulseira Riviera", categoria: "pulseiras", preco: 149.90, material: "Prata 925", tamanho: "18cm", descricao: "Pulseira riviera com fecho reforçado.", imagem: foto("1655255114527-d0a834d9a774"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Pulseira Elos", categoria: "pulseiras", preco: 79.90, material: "Aço inoxidável", tamanho: "19cm", descricao: "Pulseira de elos, antialérgica, não escurece.", imagem: foto("1655255114527-d0a834d9a774"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Brinco Argola", categoria: "brincos", preco: 69.90, material: "Folheado a ouro", descricao: "Argola média, fecho click, leve para o dia a dia.", imagem: foto("1677913842001-3941986ca979"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Brinco Ponto de Luz", categoria: "brincos", preco: 59.90, material: "Prata 925", pedra: "Zircônia", descricao: "Ponto de luz clássico, combina com tudo.", imagem: foto("1677913842001-3941986ca979"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Colar Choker", categoria: "colares", preco: 99.90, material: "Aço inoxidável", tamanho: "38cm", descricao: "Choker ajustável, acabamento fosco.", imagem: foto("1680068098871-9275069a4003"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "Anel Infinito", categoria: "aneis", preco: 74.90, material: "Prata 925", tamanhos: ["14", "16", "18"], descricao: "Símbolo do infinito, acabamento liso.", imagem: foto("1598560917807-1bae44bd2be8"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "Colar Gravata", categoria: "colares", preco: 129.90, material: "Folheado a ouro", tamanho: "45cm", descricao: "Colar gravata, caimento elegante.", imagem: foto("1680068098871-9275069a4003"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 10, nome: "Brinco Argola Grande", categoria: "brincos", preco: 79.90, material: "Folheado a ouro", descricao: "Argola grande, leve para o dia a dia.", imagem: foto("1677913842001-3941986ca979"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 11, nome: "Pulseira Berloques", categoria: "pulseiras", preco: 89.90, material: "Prata 925", tamanho: "17cm", descricao: "Pulseira com berloques removíveis.", imagem: foto("1655255114527-d0a834d9a774"), ativo: true, disponibilidade: "encomenda", prazoDias: 4 },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 5. ROUPAS
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.roupas = {
    meta: { label: "Roupas", icone: "fa-shirt" },
    config: {
        nomeLoja: "Closet da Bia",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#1F2937", corSecundaria: "#111827", corDestaque: "#E11D48",
        heroTag: "Moda que cabe no seu dia a dia",
        heroTitulo: "Estilo sem pesar no bolso",
        heroSubtitulo: "Peças novas toda semana, do básico ao produzido",
        heroCorFundo: "#111827", heroCorFundoFim: "#1F2937",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [1, 2, 3, 4, 5, 6], retiradaHoraInicio: "10:00", retiradaHoraFim: "19:00", retiradaIntervalo: 30,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "femininas", nome: "Femininas", icone: "fa-shirt" },
        { id: "masculinas", nome: "Masculinas", icone: "fa-shirt" },
        { id: "infantil", nome: "Infantil", icone: "fa-child" },
        { id: "acessorios", nome: "Acessórios", icone: "fa-bag-shopping" },
    ],
    produtos: [
        { id: 1, nome: "Blusa Cropped", categoria: "femininas", preco: 39.90, tamanhos: ["P", "M", "G"], descricao: "Tecido leve, caimento soltinho.", imagem: foto("1761090617068-f1b3257d27ad"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Vestido Midi", categoria: "femininas", preco: 79.90, tamanhos: ["P", "M", "G", "GG"], descricao: "Estampado, ideal para o dia a dia ou sair.", imagem: foto("1761090617068-f1b3257d27ad"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Camiseta Básica", categoria: "masculinas", preco: 34.90, tamanhos: ["P", "M", "G", "GG"], descricao: "100% algodão, várias cores.", imagem: foto("1563902575-bc2309dc76e4"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Calça Jeans", categoria: "masculinas", preco: 99.90, tamanhos: ["38", "40", "42", "44"], descricao: "Jeans reforçado, corte reto.", imagem: foto("1563902575-bc2309dc76e4"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Conjunto Infantil", categoria: "infantil", preco: 49.90, tamanhos: ["2", "4", "6", "8"], descricao: "Camiseta + shorts, tecido macio.", imagem: foto("1756626287301-5c73d6139282"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Boné", categoria: "acessorios", preco: 29.90, descricao: "Aba curva, ajuste no fecho traseiro.", imagem: foto("1521369909029-2afed882baee"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Short Jeans", categoria: "femininas", preco: 44.90, tamanhos: ["36", "38", "40", "42"], descricao: "Cintura alta, barra desfiada.", imagem: foto("1761090617068-f1b3257d27ad"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "Jaqueta Corta-Vento", categoria: "masculinas", preco: 89.90, tamanhos: ["P", "M", "G", "GG"], descricao: "Impermeável, ideal para o dia a dia.", imagem: foto("1563902575-bc2309dc76e4"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "Legging", categoria: "femininas", preco: 39.90, tamanhos: ["P", "M", "G"], descricao: "Tecido com leve compressão, ótima para o dia a dia.", imagem: foto("1761090617068-f1b3257d27ad"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 10, nome: "Conjunto Infantil Verão", categoria: "infantil", preco: 44.90, tamanhos: ["2", "4", "6", "8"], descricao: "Camiseta e bermuda leves para o calor.", imagem: foto("1756626287301-5c73d6139282"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 6. LINGERIE
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.lingerie = {
    meta: { label: "Lingerie", icone: "fa-heart" },
    config: {
        nomeLoja: "Charme Íntimo",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#9C4B57", corSecundaria: "#2B1B1F", corDestaque: "#E8C4C4",
        heroTag: "Conforto e delicadeza",
        heroTitulo: "Peças íntimas com cuidado nos detalhes",
        heroSubtitulo: "Tamanhos variados, atendimento discreto e sem julgamento",
        heroCorFundo: "#2B1B1F", heroCorFundoFim: "#9C4B57",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [1, 2, 3, 4, 5, 6], retiradaHoraInicio: "10:00", retiradaHoraFim: "19:00", retiradaIntervalo: 30,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "sutias", nome: "Sutiãs", icone: "fa-heart" },
        { id: "calcinhas", nome: "Calcinhas", icone: "fa-heart" },
        { id: "conjuntos", nome: "Conjuntos", icone: "fa-gift" },
        { id: "pijamas", nome: "Pijamas", icone: "fa-moon" },
    ],
    produtos: [
        { id: 1, nome: "Sutiã Renda Clássico", categoria: "sutias", preco: 49.90, tamanhos: ["P", "M", "G"], descricao: "Bojo com renda delicada, alça ajustável.", imagem: swatch("#9C4B57", "Sutia Renda"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Calcinha Algodão", categoria: "calcinhas", preco: 19.90, tamanhos: ["P", "M", "G", "GG"], descricao: "Modelo básico, tecido macio para o dia a dia.", imagem: swatch("#9C4B57", "Calcinha Basica"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Conjunto Renda Delicada", categoria: "conjuntos", preco: 89.90, tamanhos: ["P", "M", "G"], descricao: "Sutiã e calcinha combinando, embalagem para presente.", imagem: swatch("#9C4B57", "Conjunto Renda"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Pijama Alcinha", categoria: "pijamas", preco: 59.90, tamanhos: ["P", "M", "G"], descricao: "Tecido leve, conjunto blusa e short.", imagem: swatch("#9C4B57", "Pijama Alcinha"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Sutiã Sem Costura", categoria: "sutias", preco: 44.90, tamanhos: ["P", "M", "G"], descricao: "Modelagem lisa, sem marcas na roupa.", imagem: swatch("#9C4B57", "Sutia Sem Costura"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Calcinha Renda", categoria: "calcinhas", preco: 24.90, tamanhos: ["P", "M", "G", "GG"], descricao: "Detalhe em renda, tecido confortável.", imagem: swatch("#9C4B57", "Calcinha Renda"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Body Renda", categoria: "conjuntos", preco: 69.90, tamanhos: ["P", "M", "G"], descricao: "Body com detalhe em renda, fecho na base.", imagem: swatch("#9C4B57", "Body Renda"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 7. SEX SHOP (tratamento discreto: sem fotografia, nomes genéricos de catálogo)
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.sexshop = {
    meta: { label: "Sex Shop", icone: "fa-spa" },
    config: {
        nomeLoja: "Prazer & Cia",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#4B2E63", corSecundaria: "#1A1A1A", corDestaque: "#C89B3C",
        heroTag: "Atendimento discreto",
        heroTitulo: "Bem-estar e cuidado para o casal",
        heroSubtitulo: "Entrega discreta, sem identificação na embalagem",
        heroCorFundo: "#1A1A1A", heroCorFundoFim: "#4B2E63",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [1, 2, 3, 4, 5], retiradaHoraInicio: "10:00", retiradaHoraFim: "18:00", retiradaIntervalo: 30,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "bem-estar", nome: "Bem-estar", icone: "fa-spa" },
        { id: "presentes", nome: "Presentes", icone: "fa-gift" },
        { id: "aromaticos", nome: "Aromáticos", icone: "fa-fire" },
        { id: "jogos", nome: "Jogos de Casal", icone: "fa-dice" },
    ],
    produtos: [
        { id: 1, nome: "Óleo de Massagem", categoria: "bem-estar", preco: 39.90, descricao: "Óleo hidratante para massagem relaxante, 100ml.", imagem: swatch("#4B2E63", "Oleo de Massagem"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Gel Íntimo", categoria: "bem-estar", preco: 34.90, descricao: "Gel à base de água, sem perfume, 50ml.", imagem: swatch("#4B2E63", "Gel Intimo"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Kit Casal Surpresa", categoria: "presentes", preco: 89.90, descricao: "Caixa fechada com itens variados, embalagem para presente.", imagem: swatch("#C89B3C", "Kit Casal"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Vela Aromática", categoria: "aromaticos", preco: 29.90, descricao: "Vela de massagem com óleo aromático, queima lenta.", imagem: swatch("#C89B3C", "Vela Aromatica"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Jogo de Casal", categoria: "jogos", preco: 44.90, descricao: "Jogo de cartas para casais, embalagem discreta.", imagem: swatch("#1A1A1A", "Jogo de Casal"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Loção Hidratante Íntima", categoria: "bem-estar", preco: 29.90, descricao: "Fórmula suave, sem perfume, 100ml.", imagem: swatch("#4B2E63", "Locao Hidratante"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Kit Boas-Vindas", categoria: "presentes", preco: 69.90, descricao: "Seleção de itens de bem-estar, embalagem para presente.", imagem: swatch("#C89B3C", "Kit Boas Vindas"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 8. AÇAÍ
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.acai = {
    meta: { label: "Açaí", icone: "fa-bowl-food" },
    config: {
        nomeLoja: "Açaí da Quadra",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#5B2C6F", corSecundaria: "#1B3B2F", corDestaque: "#8BC34A",
        heroTag: "Refrescante e na medida certa",
        heroTitulo: "Açaí cremoso, do jeito que você pedir",
        heroSubtitulo: "Monte o seu, com os acompanhamentos que quiser",
        heroCorFundo: "#1B3B2F", heroCorFundoFim: "#5B2C6F",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [0, 1, 2, 3, 4, 5, 6], retiradaHoraInicio: "12:00", retiradaHoraFim: "22:00", retiradaIntervalo: 15,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "copos", nome: "Copos de Açaí", icone: "fa-bowl-food" },
        { id: "adicionais", nome: "Adicionais", icone: "fa-seedling" },
        { id: "bebidas", nome: "Bebidas", icone: "fa-glass-water" },
    ],
    produtos: [
        { id: 1, nome: "Açaí 300ml", categoria: "copos", preco: 14.00, descricao: "Copo 300ml, açaí batido na hora.", imagem: foto("1536628099736-beb96f0b3119"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Açaí 500ml", categoria: "copos", preco: 20.00, descricao: "Copo 500ml, açaí batido na hora.", imagem: foto("1536628099736-beb96f0b3119"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Açaí 700ml", categoria: "copos", preco: 26.00, descricao: "Copo 700ml, açaí batido na hora.", imagem: foto("1536628099736-beb96f0b3119"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Granola", categoria: "adicionais", preco: 3.00, descricao: "Porção de granola crocante.", imagem: foto("1725883691833-97103ecd582a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Leite Condensado", categoria: "adicionais", preco: 3.00, descricao: "Um fiozinho a mais de doçura.", imagem: foto("1725883691833-97103ecd582a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Água de Coco 300ml", categoria: "bebidas", preco: 8.00, descricao: "Gelada, natural.", imagem: foto("1590520160218-f11877232674"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Morango Picado", categoria: "adicionais", preco: 4.00, descricao: "Porção de morango fresco picado.", imagem: foto("1725883691833-97103ecd582a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "Paçoca Triturada", categoria: "adicionais", preco: 3.00, descricao: "Porção de paçoca triturada.", imagem: foto("1725883691833-97103ecd582a"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 9, nome: "Açaí 1 Litro", categoria: "copos", preco: 34.00, descricao: "Pote 1 litro, açaí batido na hora.", imagem: foto("1536628099736-beb96f0b3119"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// ═══════════════════════════════════════════════════════════════════════════
// 9. CREPE
// ═══════════════════════════════════════════════════════════════════════════
NICHOS.crepe = {
    meta: { label: "Crepe", icone: "fa-utensils" },
    config: {
        nomeLoja: "Crepe na Chapa",
        whatsapp: TF_WHATSAPP_DEMO,
        corPrimaria: "#B5651D", corSecundaria: "#3E2723", corDestaque: "#F4A261",
        heroTag: "Na chapa, na hora",
        heroTitulo: "Crepe quentinho pra qualquer hora do dia",
        heroSubtitulo: "Salgados e doces, feitos um a um",
        heroCorFundo: "#3E2723", heroCorFundoFim: "#B5651D",
        entregaDisponivel: true, retiradaDisponivel: true,
        retiradaDias: [2, 3, 4, 5, 6, 0], retiradaHoraInicio: "17:00", retiradaHoraFim: "22:30", retiradaIntervalo: 15,
        sobreNome: "", sobreTexto: "", sobreFoto: "", sobreLink: "",
    },
    categorias: [
        { id: "salgados", nome: "Crepes Salgados", icone: "fa-utensils" },
        { id: "doces", nome: "Crepes Doces", icone: "fa-ice-cream" },
        { id: "bebidas", nome: "Bebidas", icone: "fa-glass-water" },
    ],
    produtos: [
        { id: 1, nome: "Frango com Catupiry", categoria: "salgados", preco: 22.00, descricao: "Recheio generoso de frango desfiado com catupiry.", imagem: foto("1737513916865-63c7fd3b67a7"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 2, nome: "Carne Seca", categoria: "salgados", preco: 24.00, descricao: "Carne seca desfiada com cebola caramelizada.", imagem: foto("1737513916865-63c7fd3b67a7"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 3, nome: "Romeu e Julieta", categoria: "doces", preco: 18.00, descricao: "Goiabada cremosa com queijo derretido.", imagem: foto("1565087170449-fa23854a6100"), ativo: true, destaque: true, disponibilidade: "pronta-entrega" },
        { id: 4, nome: "Nutella com Morango", categoria: "doces", preco: 20.00, descricao: "Nutella e morangos frescos picados.", imagem: foto("1565087170449-fa23854a6100"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 5, nome: "Suco Natural", categoria: "bebidas", preco: 9.00, descricao: "Feito na hora, sabores da casa.", imagem: foto("1600271886742-f049cd451bba"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 6, nome: "Frango com Requeijão", categoria: "salgados", preco: 21.00, descricao: "Frango desfiado com requeijão cremoso.", imagem: foto("1737513916865-63c7fd3b67a7"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 7, nome: "Queijo com Orégano", categoria: "salgados", preco: 18.00, descricao: "Queijo derretido com orégano.", imagem: foto("1737513916865-63c7fd3b67a7"), ativo: true, disponibilidade: "pronta-entrega" },
        { id: 8, nome: "Banana com Canela", categoria: "doces", preco: 16.00, descricao: "Banana caramelizada com canela e açúcar.", imagem: foto("1565087170449-fa23854a6100"), ativo: true, disponibilidade: "pronta-entrega" },
    ],
};

// Ordem de exibição no seletor de nicho
const NICHOS_ORDEM = [
    "hamburgueria", "galeteria", "doceria", "semijoias",
    "roupas", "lingerie", "sexshop", "acai", "crepe",
];
