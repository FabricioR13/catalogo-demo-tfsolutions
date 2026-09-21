// ─── DEMO TF SOLUTIONS ──────────────────────────────────────────────────────────
// Esta é uma cópia de demonstração: a vitrine pública não usa mais Firebase — os
// dados vêm do arquivo nichos.js (carregado antes deste script), escolhidos pelo
// visitante na tela inicial. Ver nichos.js para os dados de cada nicho.
// ─────────────────────────────────────────────────────────────────────────────

// ─── CRÉDITO DO PRODUTOR (TF SOLUTIONS) ────────────────────────────────────────
// WhatsApp da TF Solutions, produtora deste site/sistema — usado só no link de
// crédito do rodapé.
const TF_SOLUTIONS_WHATSAPP = "5551982165186";
// ─────────────────────────────────────────────────────────────────────────────

// ─── SELETOR DE NICHO (só nesta demo) ──────────────────────────────────────────
// Determina qual nicho mostrar: pela URL (?nicho=acai, pra link direto de um
// nicho específico) ou pela escolha do visitante na tela inicial.
const escolherNicho = () => new Promise((resolve) => {
    const overlay = document.getElementById("nicho-selector");
    const params = new URLSearchParams(window.location.search);
    const nichoUrl = params.get("nicho");
    if (nichoUrl && NICHOS[nichoUrl]) {
        overlay.remove();
        resolve(nichoUrl);
        return;
    }
    const grid = overlay.querySelector(".nicho-selector-grid");
    grid.innerHTML = NICHOS_ORDEM.map((chave) => {
        const n = NICHOS[chave];
        return `
            <button class="nicho-card" data-nicho="${chave}" style="--nicho-cor:${n.config.corPrimaria}">
                <i class="fa-solid ${n.meta.icone}" aria-hidden="true"></i>
                <span>${n.meta.label}</span>
            </button>`;
    }).join("");
    grid.querySelectorAll(".nicho-card").forEach((btn) => {
        btn.addEventListener("click", () => {
            const chave = btn.dataset.nicho;
            const url = new URL(window.location.href);
            url.searchParams.set("nicho", chave);
            window.history.replaceState({}, "", url);
            overlay.classList.add("nicho-selector--saindo");
            setTimeout(() => overlay.remove(), 350);
            resolve(chave);
        });
    });
});
// ─────────────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", async () => {
    // --- SELETORES GLOBAIS ---
    const cartIcon = document.querySelector(".cart-icon"),
        cartSidebar = document.querySelector(".cart-sidebar"),
        cartOverlay = document.querySelector(".cart-overlay"),
        closeCartBtn = document.querySelector(".close-cart-btn"),
        cartBody = document.querySelector(".cart-body"),
        cartBadge = document.querySelector(".cart-badge"),
        cartIconTotalElem = document.getElementById("cart-icon-total");
    const deliveryToggleBtns = document.querySelectorAll(".delivery-btn");
    const deliveryForm = document.getElementById("delivery-form-container"),
        pickupForm = document.getElementById("pickup-form-container");
    const trocoContainer = document.getElementById("troco-container");
    const couponInput = document.getElementById("coupon-input"),
        applyCouponBtn = document.getElementById("apply-coupon-btn"),
        couponFeedback = document.getElementById("coupon-feedback");
    const subtotalElem = document.getElementById("cart-subtotal"),
        cartDiscountElem = document.getElementById("cart-discount"),
        discountLineElem = document.querySelector(".discount-line"),
        totalElem = document.getElementById("cart-total");
    const finishOrderBtn = document.getElementById("finish-order-btn"),
        finishOrderTotalElem = document.getElementById("finish-order-total");
    // Seletores da barra inferior
    const viewCartBanner = document.querySelector(".view-cart-banner");
    const bannerTotalElem = document.getElementById("banner-total");
    const viewCartBannerBtn = document.querySelector(".view-cart-banner-btn");

    // Seletores das etapas do carrinho (1: itens, 2: entrega/retirada, 3: pagamento,
    // 4: identificação, 5: resumo — mais a tela de sucesso, fora da numeração)
    const cartStepsIndicator = document.getElementById("cart-steps-indicator"),
        cartStepsWrap = document.querySelector(".cart-steps-wrap"),
        cartSteps = document.querySelectorAll(".cart-step[data-step]"),
        cartStepDots = document.querySelectorAll(".cart-step-dot"),
        cartItemsCountElem = document.getElementById("cart-items-count"),
        cartStep1TotalElem = document.getElementById("cart-step1-total-valor"),
        cartNavButtons = document.getElementById("cart-nav-buttons"),
        cartNavVoltar = document.getElementById("cart-nav-voltar"),
        cartNavAvancar = document.getElementById("cart-nav-avancar"),
        cartNavAvancarTotalElem = document.getElementById("cart-nav-avancar-total"),
        cartStepSucesso = document.getElementById("cart-step-sucesso"),
        pedidoSucessoCodigoElem = document.getElementById("pedido-sucesso-codigo"),
        novoPedidoBtn = document.getElementById("cart-btn-novo-pedido"),
        resumoItensBloco = document.getElementById("resumo-itens-bloco"),
        resumoEntregaBloco = document.getElementById("resumo-entrega-bloco"),
        resumoPagamentoBloco = document.getElementById("resumo-pagamento-bloco"),
        resumoIdentificacaoBloco = document.getElementById("resumo-identificacao-bloco");
    let etapaAtual = 1;
    let etapaMaxAlcancada = 1;
    const idsPedidoGerados = new Set();

    // Seletores do modal de detalhes do produto (carrossel de fotos)
    const detailOverlay = document.getElementById("detail-overlay"),
        detailModal = document.getElementById("detail-modal"),
        detailClose = document.getElementById("detail-close"),
        detailTrack = document.getElementById("detail-carousel-track"),
        detailPrev = document.getElementById("detail-prev"),
        detailNext = document.getElementById("detail-next"),
        detailDots = document.getElementById("detail-dots"),
        detailBadgeDestaque = document.getElementById("detail-badge-destaque"),
        detailCodigoEl = document.getElementById("detail-codigo"),
        detailNomeEl = document.getElementById("detail-nome"),
        detailDetailsEl = document.getElementById("detail-details"),
        detailDescricaoEl = document.getElementById("detail-descricao"),
        detailSizeSelect = document.getElementById("detail-size-select"),
        detailTagEl = document.getElementById("detail-tag"),
        detailPriceEl = document.getElementById("detail-price"),
        detailComprarBtn = document.getElementById("detail-comprar-btn");

    // Seletores do modal "Guia de tamanho de anel" (acessível só de um lugar: ao lado das categorias)
    const guiaOverlay = document.getElementById("guia-overlay"),
        guiaModal = document.getElementById("guia-modal"),
        guiaClose = document.getElementById("guia-close"),
        guiaTamanhoLink = document.getElementById("guia-tamanho-link");

    // Seletores do logo (ícone padrão ou imagem própria, definida pelo admin)
    const logoImgEl = document.getElementById("logo-img");

    // Seletores para o sistema de filtro
    const categoriesBar = document.querySelector(".categories-bar");
    const searchInput = document.querySelector(".search-input");

    // --- ESCOLHA DO NICHO (só nesta demo) ---
    const nichoEscolhido = await escolherNicho();
    const nichoData = NICHOS[nichoEscolhido];

    // --- CARREGAR PRODUTOS DO NICHO ESCOLHIDO ---
    let produtos = (nichoData.produtos || []).map((p) => ({ ...p })).filter((p) => p.ativo !== false);

    // --- CARREGAR CUPONS DO NICHO ESCOLHIDO ---
    let coupons = (nichoData.cupons || []).map((c, i) => ({ docId: String(i), ...c }));

    // --- CARREGAR CATEGORIAS DO NICHO ESCOLHIDO ---
    const CATEGORIAS_PADRAO = [
        { id: "anéis", nome: "Anéis", icone: "fa-ring" },
        { id: "pulseiras", nome: "Pulseiras", icone: "fa-circle-notch" },
        { id: "brincos", nome: "Brincos", icone: "fa-gem" },
    ];
    let categorias = (nichoData.categorias || []).filter((c) => c.id !== "all");
    if (!categorias.length) categorias = CATEGORIAS_PADRAO;

    // --- CARREGAR CONFIGURAÇÕES DA LOJA DO NICHO ESCOLHIDO ---
    const CONFIG_PADRAO = {
        nomeLoja: "PG Semi Joias",
        whatsapp: "558182362638",
        retiradaDias: [0, 1, 2, 3, 4, 5, 6],
        retiradaHoraInicio: "08:00",
        retiradaHoraFim: "18:00",
        retiradaIntervalo: 60,
        retiradaPausaInicio: "",
        retiradaPausaFim: "",
        bannerUrl: "",
        corPrimaria: "#B08D57",
        corSecundaria: "#1C1B1F",
        corDestaque: "#D4AF37",
        heroTag: "Coleção Exclusiva",
        heroTitulo: "Peças feitas para brilhar",
        heroSubtitulo: "Joias selecionadas com carinho para todos os momentos",
        heroCorFundo: "#0B1220",
        heroCorFundoFim: "",
        logoUrl: "",
        entregaDisponivel: true,
        retiradaDisponivel: true,
        sobreNome: "",
        sobreTexto: "",
        sobreFoto: "",
        sobreLink: "",
    };
    let configLoja = { ...CONFIG_PADRAO, ...(nichoData.config || {}) };

    // --- ESTADO DA APLICAÇÃO ---
    // (declarado antes de aplicarConfiguracoesDaLoja porque ela pode ajustar tipoEntrega)
    let carrinho = [],
        tipoEntrega = "delivery",
        appliedCoupon = null;

    // Variáveis de estado para filtros
    let categoriaAtiva = "all";
    let termoBusca = "";

    // Calcula se uma cor hexadecimal é "clara" (pra decidir se o texto por cima
    // dela deve ficar branco ou escuro, e continuar legível).
    const corEhClara = (hex) => {
        const c = (hex || "").replace("#", "");
        if (c.length !== 6) return false;
        const r = parseInt(c.substr(0, 2), 16) / 255,
            g = parseInt(c.substr(2, 2), 16) / 255,
            b = parseInt(c.substr(4, 2), 16) / 255;
        const lin = (v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        const luminancia = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
        return luminancia > 0.5;
    };

    const aplicarConfiguracoesDaLoja = () => {
        document.title = configLoja.nomeLoja;

        const headerEl = document.querySelector("header");
        if (headerEl && configLoja.bannerUrl) {
            headerEl.style.backgroundImage = `url("${configLoja.bannerUrl}")`;
            headerEl.classList.add("header--banner");
        }

        const root = document.documentElement;
        if (configLoja.corPrimaria) root.style.setProperty("--primary-color", configLoja.corPrimaria);
        if (configLoja.corSecundaria) root.style.setProperty("--secondary-color", configLoja.corSecundaria);
        if (configLoja.corDestaque) root.style.setProperty("--accent-color", configLoja.corDestaque);

        const logoTitleEl = document.querySelector(".logo h1");
        if (logoTitleEl) logoTitleEl.textContent = configLoja.nomeLoja;

        // Logo: imagem própria (definida pelo admin) — sem imagem cadastrada, o espaço fica vazio
        if (configLoja.logoUrl) {
            logoImgEl.src = configLoja.logoUrl;
            logoImgEl.alt = configLoja.nomeLoja;
            logoImgEl.hidden = false;
        } else {
            logoImgEl.hidden = true;
        }

        const heroTagEl = document.querySelector(".hero-tag"),
            heroTituloEl = document.querySelector(".hero-content h2"),
            heroSubtituloEl = document.querySelector(".hero-content p"),
            heroSectionEl = document.querySelector(".hero-section");
        if (heroTagEl && configLoja.heroTag) heroTagEl.textContent = configLoja.heroTag;
        if (heroTituloEl && configLoja.heroTitulo) heroTituloEl.textContent = configLoja.heroTitulo;
        if (heroSubtituloEl && configLoja.heroSubtitulo) heroSubtituloEl.textContent = configLoja.heroSubtitulo;
        if (heroSectionEl && configLoja.heroCorFundo) {
            if (configLoja.heroCorFundoFim) {
                // Degradê entre as duas cores escolhidas pelo admin
                root.style.setProperty("--hero-bg-color", `linear-gradient(135deg, ${configLoja.heroCorFundo}, ${configLoja.heroCorFundoFim})`);
                // Só troca pra texto escuro se as DUAS cores forem claras — com uma cor escura no meio,
                // o texto branco continua legível em praticamente todo o degradê.
                heroSectionEl.classList.toggle("hero-section--claro", corEhClara(configLoja.heroCorFundo) && corEhClara(configLoja.heroCorFundoFim));
            } else {
                root.style.setProperty("--hero-bg-color", configLoja.heroCorFundo);
                // Se a cor escolhida for clara, troca o texto/tag pra tons escuros (senão fica ilegível)
                heroSectionEl.classList.toggle("hero-section--claro", corEhClara(configLoja.heroCorFundo));
            }
        }

        const footerEl = document.querySelector("footer p");
        if (footerEl) {
            const ano = new Date().getFullYear();
            footerEl.textContent = `${ano} - ${configLoja.nomeLoja}. Todos os direitos reservados`;
        }

        // Crédito da TF Solutions (produtora do site/sistema) no rodapé
        const footerCreditLinkEl = document.getElementById("footer-credit-link");
        if (footerCreditLinkEl) {
            const msg = "Olá! Vi o site da " + configLoja.nomeLoja + " e queria saber mais sobre esse site/sistema.";
            footerCreditLinkEl.href = `https://wa.me/${TF_SOLUTIONS_WHATSAPP}?text=${encodeURIComponent(msg)}`;
        }

        const pickupDateInput = document.getElementById("pickup-date");
        if (pickupDateInput) {
            const hoje = new Date();
            pickupDateInput.min = hoje.toISOString().split("T")[0];
        }

        const pickupTimeSelect = document.getElementById("pickup-time");
        if (pickupTimeSelect) {
            const [hIni, mIni] = configLoja.retiradaHoraInicio.split(":").map(Number);
            const [hFim, mFim] = configLoja.retiradaHoraFim.split(":").map(Number);
            const inicioMin = hIni * 60 + mIni;
            const fimMin = hFim * 60 + mFim;
            const passo = configLoja.retiradaIntervalo || 60;
            // Horário bloqueado pelo admin (ex: pausa/compromisso pessoal) — some das opções, se configurado
            let pausaInicioMin = null, pausaFimMin = null;
            if (configLoja.retiradaPausaInicio && configLoja.retiradaPausaFim) {
                const [hPI, mPI] = configLoja.retiradaPausaInicio.split(":").map(Number);
                const [hPF, mPF] = configLoja.retiradaPausaFim.split(":").map(Number);
                pausaInicioMin = hPI * 60 + mPI;
                pausaFimMin = hPF * 60 + mPF;
            }
            let opcoes = `<option value="" disabled selected>Selecione</option>`;
            for (let m = inicioMin; m <= fimMin; m += passo) {
                if (pausaInicioMin !== null && m >= pausaInicioMin && m < pausaFimMin) continue;
                const h = String(Math.floor(m / 60)).padStart(2, "0");
                const min = String(m % 60).padStart(2, "0");
                opcoes += `<option value="${h}:${min}">${h}:${min}</option>`;
            }
            pickupTimeSelect.innerHTML = opcoes;
        }

        // Disponibilidade de Entrega/Retirada (configurável pelo admin, ex: motoboy indisponível no dia)
        const entregaBtn = document.querySelector('.delivery-btn[data-option="delivery"]');
        const pickupBtn = document.querySelector('.delivery-btn[data-option="pickup"]');
        const entregaDisponivel = configLoja.entregaDisponivel !== false;
        const retiradaDisponivel = configLoja.retiradaDisponivel !== false;
        if (entregaBtn) entregaBtn.hidden = !entregaDisponivel;
        if (pickupBtn) pickupBtn.hidden = !retiradaDisponivel;
        if (!entregaDisponivel && retiradaDisponivel) {
            tipoEntrega = "pickup";
            entregaBtn?.classList.remove("active");
            entregaBtn?.setAttribute("aria-selected", "false");
            pickupBtn?.classList.add("active");
            pickupBtn?.setAttribute("aria-selected", "true");
            deliveryForm.style.display = "none";
            pickupForm.style.display = "block";
        } else if (entregaDisponivel && !retiradaDisponivel) {
            tipoEntrega = "delivery";
            pickupBtn?.classList.remove("active");
            pickupBtn?.setAttribute("aria-selected", "false");
            entregaBtn?.classList.add("active");
            entregaBtn?.setAttribute("aria-selected", "true");
            pickupForm.style.display = "none";
            deliveryForm.style.display = "block";
        }

        // Seção "Sobre a empreendedora" (opcional — só aparece se houver texto configurado)
        const aboutSection = document.getElementById("about-section");
        if (aboutSection && configLoja.sobreTexto) {
            const aboutNomeEl = document.getElementById("about-nome"),
                aboutTextoEl = document.getElementById("about-texto"),
                aboutPhotoEl = document.getElementById("about-photo");
            aboutNomeEl.textContent = configLoja.sobreNome || "";
            aboutTextoEl.textContent = configLoja.sobreTexto;
            if (configLoja.sobreFoto) {
                aboutPhotoEl.src = configLoja.sobreFoto;
                aboutPhotoEl.alt = configLoja.sobreNome || "";
                aboutPhotoEl.hidden = false;
            } else {
                aboutPhotoEl.hidden = true;
            }
            const aboutLinkEl = document.getElementById("about-link");
            if (aboutLinkEl) {
                if (configLoja.sobreLink) {
                    aboutLinkEl.href = configLoja.sobreLink;
                    aboutLinkEl.hidden = false;
                } else {
                    aboutLinkEl.hidden = true;
                }
            }
            const aboutWhatsappEl = document.getElementById("about-whatsapp-link");
            if (aboutWhatsappEl) {
                if (configLoja.whatsapp) {
                    const msg = "Olá! Vi a loja " + configLoja.nomeLoja + " e gostaria de saber mais.";
                    aboutWhatsappEl.href = `https://wa.me/${configLoja.whatsapp}?text=${encodeURIComponent(msg)}`;
                    aboutWhatsappEl.hidden = false;
                } else {
                    aboutWhatsappEl.hidden = true;
                }
            }
            aboutSection.hidden = false;
            const navSobreEl = document.getElementById("nav-sobre-link");
            if (navSobreEl) navSobreEl.hidden = false;
        }
    };
    aplicarConfiguracoesDaLoja();

    const formatarMoeda = (v) =>
        v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    // Código do produto: usa o código cadastrado pelo admin (etiqueta própria dele) ou,
    // se não tiver, o número sequencial do produto — sempre existe um código pra mostrar,
    // pra facilitar a empreendedora identificar a peça certa na hora de separar o pedido.
    const codigoDoProduto = (p) => p.codigo || `#${p.id}`;
    const getScrollbarWidth = () =>
        window.innerWidth - document.documentElement.clientWidth;
    const lockScroll = () => {
        document.body.style.paddingRight = `${getScrollbarWidth()}px`;
        document.body.classList.add("no-scroll");
    };
    const unlockScroll = () => {
        document.body.style.paddingRight = "";
        document.body.classList.remove("no-scroll");
    };
    const abrirCarrinho = () => {
        cartSidebar.classList.add("show");
        cartOverlay.classList.add("show");
        lockScroll();
    };
    const fecharCarrinho = () => {
        cartSidebar.classList.remove("show");
        cartOverlay.classList.remove("show");
        unlockScroll();
    };

    // --- ETAPAS DO CARRINHO (1: itens · 2: entrega/retirada · 3: pagamento · 4: identificação · 5: resumo) ---
    // Gera um código de pedido de 8 caracteres (2 letras + 6 alfanuméricos), sem usar
    // caracteres fáceis de confundir (O/0, I/1). Não há como garantir 100% de unicidade
    // contra pedidos antigos sem gravar todos os pedidos no Firestore (o que mudaria o
    // schema do banco) — mas o espaço de combinações é enorme (mais de 600 bilhões), então
    // a chance de repetição é desprezível na prática. Dentro da mesma sessão, ainda
    // evitamos repetir gerando de novo em caso de colisão.
    const gerarIdPedido = () => {
        const LETRAS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
        const ALFANUM = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        const sorteia = (chars) => chars[Math.floor(Math.random() * chars.length)];
        let id;
        do {
            id = sorteia(LETRAS) + sorteia(LETRAS);
            for (let i = 0; i < 6; i++) id += sorteia(ALFANUM);
        } while (idsPedidoGerados.has(id));
        idsPedidoGerados.add(id);
        return id;
    };

    const validarCampos = (ids) => {
        let valid = true;
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            let isFieldValid = el.value.trim() !== "";

            if (id.includes("nome") && isFieldValid) {
                if (el.value.trim().split(" ").filter((word) => word).length < 2) {
                    isFieldValid = false;
                }
            }

            if (!isFieldValid) {
                el.classList.add("error");
                valid = false;
            } else {
                el.classList.remove("error");
            }
        });
        if (!valid) {
            alert("Por favor, preencha todos os campos obrigatórios marcados em vermelho.");
        }
        return valid;
    };

    const validarEtapaAtual = () => {
        if (etapaAtual === 1) {
            if (carrinho.length === 0) {
                alert("Seu carrinho está vazio. Adicione produtos antes de continuar.");
                return false;
            }
            return true;
        }
        if (etapaAtual === 2) {
            if (tipoEntrega === "pickup") {
                const dataInput = document.getElementById("pickup-date");
                if (dataInput.value) {
                    const [ano, mes, dia] = dataInput.value.split("-").map(Number);
                    const diaSemana = new Date(ano, mes - 1, dia).getDay();
                    if (!configLoja.retiradaDias.includes(diaSemana)) {
                        dataInput.classList.add("error");
                        alert("A loja não realiza retiradas no dia selecionado. Escolha outra data.");
                        return false;
                    }
                }
                return validarCampos(["pickup-date", "pickup-time"]);
            }
            return validarCampos(["delivery-cep", "delivery-address"]);
        }
        if (etapaAtual === 4) {
            return validarCampos(["identificacao-nome", "identificacao-telefone"]);
        }
        return true;
    };

    const renderResumo = () => {
        const subtotal = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        const discountAmount = calcularDesconto(subtotal);

        resumoItensBloco.innerHTML = `
            <h5>Itens (${carrinho.reduce((acc, i) => acc + i.quantidade, 0)})</h5>
            <ul class="resumo-lista">
                ${carrinho.map((item) => `
                    <li>
                        <span>${item.quantidade}x [${codigoDoProduto(item)}] ${item.nome}${item.tamanhoSelecionado ? ` (Tam. ${item.tamanhoSelecionado})` : ""}</span>
                        <span class="resumo-item-valor">${formatarMoeda(item.preco * item.quantidade)}</span>
                    </li>`).join("")}
            </ul>`;

        if (tipoEntrega === "delivery") {
            const cep = document.getElementById("delivery-cep").value;
            const endereco = document.getElementById("delivery-address").value;
            resumoEntregaBloco.innerHTML = `
                <h5>Entrega (Moto)</h5>
                <p>CEP: ${cep}</p>
                <p>Endereço: ${endereco}</p>`;
        } else {
            const dataInput = document.getElementById("pickup-date").value;
            const hora = document.getElementById("pickup-time").value;
            let dataFormatada = "";
            if (dataInput) {
                const [year, month, day] = dataInput.split("-");
                dataFormatada = `${day}/${month}/${year}`;
            }
            resumoEntregaBloco.innerHTML = `
                <h5>Retirada</h5>
                <p>Data: ${dataFormatada}</p>
                <p>Hora: ${hora}</p>`;
        }

        const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value || "";
        const personalizacao = document.getElementById("personalizacao-input")?.value.trim();
        const embrulharPresente = document.getElementById("gift-wrap-checkbox")?.checked;
        let pagamentoHtml = `<h5>Pagamento</h5><p>${paymentMethod}`;
        if (paymentMethod === "Dinheiro") {
            const troco = document.getElementById("troco-para").value;
            pagamentoHtml += troco ? ` (Troco para R$ ${troco})` : " (Não precisa de troco)";
        }
        pagamentoHtml += "</p>";
        if (personalizacao) pagamentoHtml += `<p>Gravação/personalização: ${personalizacao}</p>`;
        if (embrulharPresente) pagamentoHtml += `<p>Embalagem para presente: Sim</p>`;
        if (appliedCoupon) pagamentoHtml += `<p>Cupom: ${appliedCoupon.codigo} (- ${formatarMoeda(discountAmount)})</p>`;
        resumoPagamentoBloco.innerHTML = pagamentoHtml;

        const nome = document.getElementById("identificacao-nome").value;
        const telefone = document.getElementById("identificacao-telefone").value;
        resumoIdentificacaoBloco.innerHTML = `
            <h5>Seus dados</h5>
            <p>${nome}</p>
            <p>${telefone}</p>`;
    };

    const mostrarEtapa = (n) => {
        etapaAtual = n;
        if (n > etapaMaxAlcancada) etapaMaxAlcancada = n;
        cartSteps.forEach((el) => { el.hidden = Number(el.dataset.step) !== n; });
        cartStepDots.forEach((dot) => {
            const step = Number(dot.dataset.step);
            dot.classList.toggle("active", step === n);
            // "done" também controla se o ponto é clicável (CSS: cursor:pointer só em .done) —
            // por isso usa etapaMaxAlcancada (até onde o cliente já validou), não só "step < n".
            dot.classList.toggle("done", step !== n && step <= etapaMaxAlcancada);
        });
        cartNavVoltar.hidden = n === 1;
        cartNavAvancar.hidden = n === 5;
        finishOrderBtn.hidden = n !== 5;
        if (n === 5) renderResumo();
        cartStepsWrap.scrollTop = 0;
    };

    const mostrarSucesso = (pedidoId) => {
        cartSteps.forEach((el) => { el.hidden = true; });
        cartStepsIndicator.hidden = true;
        cartNavButtons.hidden = true;
        pedidoSucessoCodigoElem.textContent = pedidoId;
        cartStepSucesso.hidden = false;
        cartStepsWrap.scrollTop = 0;
    };

    const iniciarNovoPedido = () => {
        carrinho = [];
        appliedCoupon = null;
        couponInput.value = "";
        couponFeedback.textContent = "";
        couponFeedback.classList.remove("success", "error");
        const personalizacaoInput = document.getElementById("personalizacao-input");
        if (personalizacaoInput) personalizacaoInput.value = "";
        const giftWrap = document.getElementById("gift-wrap-checkbox");
        if (giftWrap) giftWrap.checked = false;
        atualizarCarrinho();
        cartStepsIndicator.hidden = false;
        cartNavButtons.hidden = false;
        cartStepSucesso.hidden = true;
        etapaMaxAlcancada = 1;
        mostrarEtapa(1);
        fecharCarrinho();
    };

    // --- MODAL DE DETALHES DO PRODUTO (carrossel de fotos) ---
    // Mostra a foto principal + fotos extras (campo "galeria", cadastrado no admin) num
    // carrossel, além dos detalhes do produto. Abre ao clicar na foto do card.
    let detailFotos = [];
    let detailIndice = 0;
    let detailProdutoAtual = null;

    const renderDetailCarrossel = () => {
        detailTrack.innerHTML = detailFotos
            .map((src) => `<img src="${src}" alt="${detailProdutoAtual ? detailProdutoAtual.nome : ""}">`)
            .join("");
        const multiplas = detailFotos.length > 1;
        detailPrev.hidden = !multiplas;
        detailNext.hidden = !multiplas;
        detailDots.hidden = !multiplas;
        if (multiplas) {
            detailDots.innerHTML = detailFotos
                .map((_, i) => `<span data-i="${i}"></span>`)
                .join("");
        }
        atualizarPosicaoCarrossel();
    };

    const atualizarPosicaoCarrossel = () => {
        detailTrack.style.transform = `translateX(-${detailIndice * 100}%)`;
        detailDots.querySelectorAll("span").forEach((dot, i) => {
            dot.classList.toggle("active", i === detailIndice);
        });
    };

    const moverCarrossel = (delta) => {
        if (!detailFotos.length) return;
        detailIndice = (detailIndice + delta + detailFotos.length) % detailFotos.length;
        atualizarPosicaoCarrossel();
    };

    const abrirDetalhe = (produtoId) => {
        const produto = produtos.find((p) => p.id === produtoId);
        if (!produto) return;
        detailProdutoAtual = produto;
        detailFotos = [produto.imagem, ...(Array.isArray(produto.galeria) ? produto.galeria : [])].filter(Boolean);
        detailIndice = 0;
        renderDetailCarrossel();

        detailBadgeDestaque.hidden = !produto.destaque;
        detailCodigoEl.textContent = `Código: ${codigoDoProduto(produto)}`;
        detailNomeEl.textContent = produto.nome;

        const detalhes = [produto.material, produto.pedra, produto.tamanho].filter(Boolean).join(" · ");
        if (detalhes) { detailDetailsEl.textContent = detalhes; detailDetailsEl.hidden = false; }
        else { detailDetailsEl.hidden = true; }

        detailDescricaoEl.textContent = produto.descricao || "";

        const esgotado = produto.estoque !== undefined && produto.estoque !== null && Number(produto.estoque) <= 0;
        if (esgotado) {
            detailTagEl.textContent = "Esgotado";
            detailTagEl.className = "product-tag tag-esgotado";
            detailTagEl.hidden = false;
        } else if (produto.disponibilidade === "encomenda") {
            detailTagEl.textContent = `Sob encomenda${produto.prazoDias ? ` · ${produto.prazoDias} dias` : ""}`;
            detailTagEl.className = "product-tag tag-encomenda";
            detailTagEl.hidden = false;
        } else {
            detailTagEl.hidden = true;
        }

        // Seletor de tamanho: só aparece quando o produto tem mais de um tamanho
        // cadastrado no admin (campo "tamanhos") — o cliente precisa escolher antes de comprar.
        const temTamanhos = Array.isArray(produto.tamanhos) && produto.tamanhos.length > 1;
        if (temTamanhos) {
            detailSizeSelect.innerHTML =
                `<option value="" selected disabled>Escolha o tamanho</option>` +
                produto.tamanhos.map((t) => `<option value="${t}">${t}</option>`).join("");
            detailSizeSelect.hidden = false;
        } else {
            detailSizeSelect.hidden = true;
        }

        detailPriceEl.textContent = formatarMoeda(produto.preco);
        detailComprarBtn.disabled = esgotado;
        detailComprarBtn.textContent = esgotado ? "Esgotado" : "Adicionar ao carrinho";

        detailOverlay.classList.add("show");
        detailModal.classList.add("show");
        lockScroll();
    };

    const fecharDetalhe = () => {
        detailOverlay.classList.remove("show");
        detailModal.classList.remove("show");
        detailProdutoAtual = null;
        unlockScroll();
    };

    detailClose.addEventListener("click", fecharDetalhe);
    detailOverlay.addEventListener("click", fecharDetalhe);
    detailPrev.addEventListener("click", () => moverCarrossel(-1));
    detailNext.addEventListener("click", () => moverCarrossel(1));
    detailDots.addEventListener("click", (e) => {
        const dot = e.target.closest("span[data-i]");
        if (!dot) return;
        detailIndice = Number.parseInt(dot.dataset.i);
        atualizarPosicaoCarrossel();
    });
    detailComprarBtn.addEventListener("click", () => {
        if (!detailProdutoAtual || detailComprarBtn.disabled) return;
        if (!detailSizeSelect.hidden && !detailSizeSelect.value) {
            alert("Escolha o tamanho antes de adicionar ao carrinho.");
            detailSizeSelect.focus();
            return;
        }
        adicionarAoCarrinho(detailProdutoAtual.id, null, detailSizeSelect.hidden ? null : detailSizeSelect.value);
        fecharDetalhe();
    });

    // --- MODAL "GUIA DE TAMANHO DE ANEL" ---
    const abrirGuia = (e) => {
        if (e) e.preventDefault();
        guiaOverlay.classList.add("show");
        guiaModal.classList.add("show");
        lockScroll();
    };
    const fecharGuia = () => {
        guiaOverlay.classList.remove("show");
        guiaModal.classList.remove("show");
        unlockScroll();
    };
    guiaClose.addEventListener("click", fecharGuia);
    guiaOverlay.addEventListener("click", fecharGuia);
    guiaTamanhoLink.addEventListener("click", abrirGuia);

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            if (guiaModal.classList.contains("show")) fecharGuia();
            else if (detailModal.classList.contains("show")) fecharDetalhe();
        }
        if (detailModal.classList.contains("show") && detailFotos.length > 1) {
            if (e.key === "ArrowLeft") moverCarrossel(-1);
            if (e.key === "ArrowRight") moverCarrossel(1);
        }
    });

    const animacaoVoarParaCarrinho = (productCard) => {
        const productImg = productCard.querySelector(".product-img"),
            imgRect = productImg.getBoundingClientRect(),
            cartRect = cartIcon.getBoundingClientRect(),
            flyingImg = document.createElement("img");
        flyingImg.src = productImg.src;
        flyingImg.classList.add("product-image-fly");
        flyingImg.style.left = `${imgRect.left}px`;
        flyingImg.style.top = `${imgRect.top}px`;
        flyingImg.style.width = `${imgRect.width}px`;
        flyingImg.style.height = `${imgRect.height}px`;
        document.body.appendChild(flyingImg);
        requestAnimationFrame(() => {
            flyingImg.style.left = `${cartRect.left + cartRect.width / 2}px`;
            flyingImg.style.top = `${cartRect.top + cartRect.height / 2}px`;
            flyingImg.style.width = "0px";
            flyingImg.style.height = "0px";
            flyingImg.style.opacity = "0";
        });
        flyingImg.addEventListener("transitionend", () => flyingImg.remove());
    };

    // Monta a barra de categorias a partir da coleção "categorias" do Firestore
    const renderCategorias = () => {
        const botaoTodos = `
            <button class="category-btn active" data-category="all">
                <i class="fa-solid fa-border-all" aria-hidden="true"></i> Todos
            </button>`;
        const botoesCategorias = categorias
            .map(
                (c) => `
            <button class="category-btn" data-category="${c.id}">
                <i class="fa-solid ${c.icone || "fa-gem"}" aria-hidden="true"></i> ${c.nome}
            </button>`,
            )
            .join("");
        categoriesBar.innerHTML = botaoTodos + botoesCategorias;
    };

    // Função para filtrar e mostrar produtos
    const filtrarEMostrarProdutos = () => {
        let produtosFiltrados = produtos;

        // Filtro por categoria
        if (categoriaAtiva !== "all") {
            produtosFiltrados = produtosFiltrados.filter(
                (produto) => produto.categoria === categoriaAtiva,
            );
        }

        // Filtro por busca
        if (termoBusca.trim() !== "") {
            const termo = termoBusca.toLowerCase();
            produtosFiltrados = produtosFiltrados.filter(
                (produto) =>
                    produto.nome.toLowerCase().includes(termo) ||
                    (produto.descricao || "").toLowerCase().includes(termo),
            );
        }

        // Produtos em destaque aparecem primeiro (mantendo a ordem entre eles estável)
        produtosFiltrados = [...produtosFiltrados].sort(
            (a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0),
        );

        // Renderizar produtos filtrados
        const container = document.querySelector(".products-container");
        if (produtosFiltrados.length === 0) {
            container.innerHTML = `
                        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #999;">
                            <i class="fa-solid fa-box-open" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                            <p style="font-size: 1.2rem; font-weight: 600;">Nenhum produto encontrado</p>
                        </div>
                    `;
        } else {
            container.innerHTML = produtosFiltrados
                .map((p) => {
                    const detalhes = [p.material, p.pedra, p.tamanho]
                        .filter(Boolean)
                        .join(" · ");
                    const tagEncomenda =
                        p.disponibilidade === "encomenda"
                            ? `<span class="product-tag tag-encomenda">Sob encomenda${p.prazoDias ? ` · ${p.prazoDias} dias` : ""}</span>`
                            : "";
                    const esgotado =
                        p.estoque !== undefined &&
                        p.estoque !== null &&
                        Number(p.estoque) <= 0;
                    const tagEsgotado = esgotado
                        ? `<span class="product-tag tag-esgotado">Esgotado</span>`
                        : "";
                    const badgeDestaque = p.destaque
                        ? `<span class="product-badge-destaque"><i class="fa-solid fa-star" aria-hidden="true"></i> Destaque</span>`
                        : "";
                    // Seletor de tamanho: só aparece quando há mais de um tamanho cadastrado —
                    // o cliente precisa escolher um antes de conseguir comprar.
                    const temTamanhos = Array.isArray(p.tamanhos) && p.tamanhos.length > 1;
                    const seletorTamanho = temTamanhos
                        ? `<select class="product-size-select" aria-label="Escolha o tamanho de ${p.nome}">
                                <option value="" selected disabled>Escolha o tamanho</option>
                                ${p.tamanhos.map((t) => `<option value="${t}">${t}</option>`).join("")}
                           </select>`
                        : "";
                    return `
                        <div class="product-card${esgotado ? " produto-esgotado" : ""}" data-id="${p.id}">
                            ${badgeDestaque}
                            <img class="product-img" src="${p.imagem}" alt="${p.nome}" loading="lazy">
                            <div class="product-info">
                                <p class="product-code">Código: ${codigoDoProduto(p)}</p>
                                <h3 class="product-name">${p.nome}</h3>
                                ${detalhes ? `<p class="product-details">${detalhes}</p>` : ""}
                                <p class="product-description">${p.descricao}</p>
                                ${esgotado ? tagEsgotado : tagEncomenda}
                                <p class="product-price">${formatarMoeda(p.preco)}</p>
                                ${seletorTamanho}
                                <button class="product-button"${esgotado ? " disabled" : ""}>${esgotado ? "Esgotado" : "Adicionar ao carrinho"}</button>
                            </div>
                        </div>
                    `;
                })
                .join("");
        }
    };

    // Produtos com mais de um tamanho geram uma "chave" própria por tamanho no carrinho
    // (produtoId + tamanho), pra dar pra ter o mesmo produto em tamanhos diferentes como
    // itens separados. O controle de estoque continua somando as quantidades de TODOS os
    // tamanhos do mesmo produto, já que o estoque é cadastrado por produto, não por tamanho.
    const adicionarAoCarrinho = (produtoId, productCard, tamanho) => {
        const produto = produtos.find((p) => p.id === produtoId);
        if (!produto) return;

        const chave = tamanho ? `${produtoId}__${tamanho}` : String(produtoId);
        const qtdAtualTotal = carrinho
            .filter((item) => item.id === produtoId)
            .reduce((acc, item) => acc + item.quantidade, 0);
        if (
            produto.estoque !== undefined &&
            produto.estoque !== null &&
            qtdAtualTotal + 1 > Number(produto.estoque)
        ) {
            alert(
                `Ops! Só temos ${produto.estoque} unidade(s) de "${produto.nome}" disponível(is) no momento.`,
            );
            return;
        }

        if (productCard) animacaoVoarParaCarrinho(productCard);
        const itemNoCarrinho = carrinho.find((item) => item._chave === chave);
        if (itemNoCarrinho) itemNoCarrinho.quantidade++;
        else carrinho.push({ ...produto, quantidade: 1, tamanhoSelecionado: tamanho || null, _chave: chave });
        atualizarCarrinho();
    };

    const alterarQuantidade = (chave, acao) => {
        const item = carrinho.find((i) => i._chave === chave);
        if (!item) return;
        if (acao === "aumentar") {
            const produto = produtos.find((p) => p.id === item.id);
            const qtdAtualTotal = carrinho
                .filter((i) => i.id === item.id)
                .reduce((acc, i) => acc + i.quantidade, 0);
            if (
                produto &&
                produto.estoque !== undefined &&
                produto.estoque !== null &&
                qtdAtualTotal + 1 > Number(produto.estoque)
            ) {
                alert(
                    `Ops! Só temos ${produto.estoque} unidade(s) de "${produto.nome}" disponível(is) no momento.`,
                );
                return;
            }
            item.quantidade++;
        } else if (acao === "diminuir") {
            item.quantidade--;
            if (item.quantidade <= 0)
                carrinho = carrinho.filter((i) => i._chave !== chave);
        }
        atualizarCarrinho();
    };

    const atualizarCarrinho = () => {
        if (carrinho.length === 0) {
            cartBody.innerHTML = `<div class="cart-empty"><i class="fa-solid fa-box-open"></i><p>Seu carrinho está vazio.</p></div>`;
        } else {
            cartBody.innerHTML = carrinho
                .map(
                    (item) =>
                        `<div class="cart-item" data-key="${item._chave}">
                            <img src="${item.imagem}" alt="${item.nome}" class="cart-item-img">
                            <div class="cart-item-info">
                                <p class="cart-item-codigo">Código: ${codigoDoProduto(item)}</p>
                                <h4 class="cart-item-name">${item.nome}${item.tamanhoSelecionado ? ` <span class="cart-item-size">(Tam. ${item.tamanhoSelecionado})</span>` : ""}</h4>
                                ${item.descricao ? `<p class="cart-item-desc">${item.descricao.length > 70 ? item.descricao.substring(0, 70) + "…" : item.descricao}</p>` : ""}
                                <p class="cart-item-price">${formatarMoeda(item.preco)}${item.quantidade > 1 ? ` <span class="cart-item-price-total">(${item.quantidade}x = ${formatarMoeda(item.preco * item.quantidade)})</span>` : ""}</p>
                                <div class="cart-item-controls">
                                    <button class="quantity-btn" data-action="diminuir">-</button>
                                    <span class="quantity">${item.quantidade}</span>
                                    <button class="quantity-btn" data-action="aumentar">+</button>
                                </div>
                            </div>
                            <button class="remove-item-btn">&times;</button>
                        </div>`,
                )
                .join("");
        }
        const qtdTotalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        cartItemsCountElem.textContent = `${qtdTotalItens} ${qtdTotalItens === 1 ? "item" : "itens"}`;
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0,
        );

        if (
            appliedCoupon &&
            appliedCoupon.valorMinimo &&
            subtotal < appliedCoupon.valorMinimo
        ) {
            appliedCoupon = null;
            couponFeedback.textContent =
                "Cupom removido: o pedido não atinge mais o valor mínimo exigido.";
            couponFeedback.classList.remove("success");
            couponFeedback.classList.add("error");
        }

        const discountAmount = calcularDesconto(subtotal);
        const total = subtotal - discountAmount;
        subtotalElem.textContent = formatarMoeda(subtotal);
        if (discountAmount > 0) {
            cartDiscountElem.textContent = `- ${formatarMoeda(discountAmount)}`;
            discountLineElem.style.display = "flex";
        } else {
            discountLineElem.style.display = "none";
        }
        totalElem.textContent = formatarMoeda(total);
        cartBadge.textContent = qtdTotalItens;
        cartIconTotalElem.textContent = formatarMoeda(total);
        cartStep1TotalElem.textContent = formatarMoeda(total);
        cartNavAvancarTotalElem.textContent = `(${formatarMoeda(total)})`;
        finishOrderTotalElem.textContent = `— ${formatarMoeda(total)}`;
        cartNavAvancar.disabled = carrinho.length === 0 && etapaAtual === 1;
        finishOrderBtn.disabled = carrinho.length === 0;

        if (carrinho.length > 0 && window.innerWidth <= 768) {
            bannerTotalElem.textContent = formatarMoeda(total);
            viewCartBanner.classList.add("show");
        } else {
            viewCartBanner.classList.remove("show");
        }
    };

    const calcularDesconto = (subtotal) => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.tipo === "fixo")
            return Math.min(appliedCoupon.valor, subtotal);
        return subtotal * (appliedCoupon.valor / 100);
    };

    const applyCoupon = () => {
        const code = couponInput.value.trim().toUpperCase();
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0,
        );
        const foundCoupon = coupons.find((c) => c.codigo === code);
        couponFeedback.classList.remove("success", "error");

        if (!foundCoupon) {
            appliedCoupon = null;
            couponFeedback.textContent = "Cupom inválido.";
            couponFeedback.classList.add("error");
        } else if (foundCoupon.ativo === false) {
            appliedCoupon = null;
            couponFeedback.textContent = "Este cupom não está mais disponível.";
            couponFeedback.classList.add("error");
        } else if (
            foundCoupon.validade &&
            new Date(`${foundCoupon.validade}T23:59:59`) < new Date()
        ) {
            appliedCoupon = null;
            couponFeedback.textContent = "Este cupom expirou.";
            couponFeedback.classList.add("error");
        } else if (
            foundCoupon.valorMinimo &&
            subtotal < foundCoupon.valorMinimo
        ) {
            appliedCoupon = null;
            couponFeedback.textContent = `Pedido mínimo de ${formatarMoeda(
                foundCoupon.valorMinimo,
            )} para usar este cupom.`;
            couponFeedback.classList.add("error");
        } else {
            appliedCoupon = foundCoupon;
            couponFeedback.textContent = "Cupom aplicado!";
            couponFeedback.classList.add("success");
        }
        atualizarCarrinho();
    };

    const finalizarPedido = () => {
        // Rede de segurança: os campos já foram validados etapa a etapa, mas confere
        // de novo aqui (ex: caso o cliente volte numa etapa pelos pontinhos e apague algo).
        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        const fieldsToValidate = tipoEntrega === "delivery"
            ? ["delivery-cep", "delivery-address", "identificacao-nome", "identificacao-telefone"]
            : ["pickup-date", "pickup-time", "identificacao-nome", "identificacao-telefone"];

        if (!validarCampos(fieldsToValidate)) return;

        const pedidoId = gerarIdPedido();
        const numeroWhatsApp = configLoja.whatsapp;
        const itensPedido = carrinho
            .map((item) => `  - ${item.quantidade}x [${codigoDoProduto(item)}] ${item.nome}${item.tamanhoSelecionado ? ` (Tam. ${item.tamanhoSelecionado})` : ""}`)
            .join("\n");
        const subtotal = carrinho.reduce(
            (acc, item) => acc + item.preco * item.quantidade,
            0,
        );
        const discountAmount = calcularDesconto(subtotal);
        let cupomInfo = "";
        if (appliedCoupon) {
            cupomInfo = `\n*Cupom Aplicado:* ${appliedCoupon.codigo} (${formatarMoeda(
                discountAmount,
            )})`;
        }

        const personalizacao = document.getElementById("personalizacao-input")?.value.trim();
        const embrulharPresente = document.getElementById("gift-wrap-checkbox")?.checked;
        let extrasInfo = "";
        if (personalizacao) extrasInfo += `\n*Gravação/Personalização:* ${personalizacao}`;
        if (embrulharPresente) extrasInfo += `\n*Embalagem para presente:* Sim`;

        const total = subtotal - discountAmount;
        let mensagem = `*-- NOVO PEDIDO ${configLoja.nomeLoja} --*\n*Nº do Pedido:* #${pedidoId}\n\n*Itens:*\n${itensPedido}\n\n*Subtotal:* ${formatarMoeda(
            subtotal,
        )}${cupomInfo}\n*Total:* ${formatarMoeda(
            total,
        )}${extrasInfo}\n\n-------------------------\n\n`;

        const paymentMethod = document.querySelector(
            'input[name="payment"]:checked',
        ).value;
        let paymentInfo = `*Forma de Pagamento:* ${paymentMethod}`;
        if (paymentMethod === "Dinheiro") {
            const troco = document.getElementById("troco-para").value;
            paymentInfo += troco
                ? ` (Troco para R$ ${troco})`
                : " (Não precisa de troco)";
        }

        const nome = document.getElementById("identificacao-nome").value;
        const telefone = document.getElementById("identificacao-telefone").value;

        if (tipoEntrega === "delivery") {
            const address = document.getElementById("delivery-address").value;
            const cep = document.getElementById("delivery-cep").value;

            mensagem += `*Tipo de Pedido:* Entrega (Moto)\n\n*Nome:* ${nome}\n*Telefone:* ${telefone}\n*CEP:* ${cep}\n*Endereço:* ${address}\n\n${paymentInfo}`;
        } else {
            const dataInput = document.getElementById("pickup-date").value;
            const hora = document.getElementById("pickup-time").value;
            const [year, month, day] = dataInput.split("-");
            const dataFormatada = `${day}/${month}/${year}`;

            mensagem += `*Tipo de Pedido:* Retirada\n\n*Nome para Retirada:* ${nome}\n*Telefone:* ${telefone}\n*Data Agendada:* ${dataFormatada}\n*Hora Agendada:* ${hora}\n\n${paymentInfo}`;
        }

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
        mostrarSucesso(pedidoId);
    };

    // --- EVENT LISTENERS ---
    cartIcon.addEventListener("click", abrirCarrinho);
    closeCartBtn.addEventListener("click", fecharCarrinho);
    cartOverlay.addEventListener("click", fecharCarrinho);
    applyCouponBtn.addEventListener("click", applyCoupon);
    finishOrderBtn.addEventListener("click", finalizarPedido);
    viewCartBannerBtn.addEventListener("click", abrirCarrinho);

    // Event listener para botões de categoria (delegado, pois os botões são gerados dinamicamente)
    categoriesBar.addEventListener("click", (e) => {
        const btn = e.target.closest(".category-btn");
        if (!btn) return;
        // Remove classe active de todos os botões
        categoriesBar
            .querySelectorAll(".category-btn")
            .forEach((b) => b.classList.remove("active"));
        // Adiciona classe active no botão clicado
        btn.classList.add("active");
        // Atualiza categoria ativa
        categoriaAtiva = btn.dataset.category;
        // Filtra e mostra produtos
        filtrarEMostrarProdutos();
    });

    // Event listener para campo de busca
    searchInput.addEventListener("input", (e) => {
        termoBusca = e.target.value;
        filtrarEMostrarProdutos();
    });

    document
        .querySelector(".products-container")
        .addEventListener("click", (e) => {
            const productCard = e.target.closest(".product-card");
            if (!productCard) return;
            if (e.target.closest(".product-size-select")) return; // deixa o <select> funcionar normalmente
            if (e.target.matches(".product-button")) {
                const seletor = productCard.querySelector(".product-size-select");
                if (seletor && !seletor.value) {
                    alert("Escolha o tamanho antes de adicionar ao carrinho.");
                    seletor.focus();
                    return;
                }
                adicionarAoCarrinho(
                    Number.parseInt(productCard.dataset.id),
                    productCard,
                    seletor ? seletor.value : null,
                );
            } else {
                // Clicar em qualquer outra parte do card (foto, nome, descrição)
                // abre os detalhes do produto — só o botão "Adicionar ao carrinho" adiciona direto.
                abrirDetalhe(Number.parseInt(productCard.dataset.id));
            }
        });
    cartBody.addEventListener("click", (e) => {
        const cartItem = e.target.closest(".cart-item");
        if (cartItem) {
            const chave = cartItem.dataset.key;
            if (e.target.matches(".quantity-btn"))
                alterarQuantidade(chave, e.target.dataset.action);
            if (e.target.matches(".remove-item-btn")) {
                carrinho = carrinho.filter((i) => i._chave !== chave);
                atualizarCarrinho();
            }
        }
    });

    deliveryToggleBtns.forEach((btn) =>
        btn.addEventListener("click", () => {
            deliveryToggleBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            tipoEntrega = btn.dataset.option;
            if (tipoEntrega === "delivery") {
                deliveryForm.style.display = "block";
                pickupForm.style.display = "none";
            } else {
                deliveryForm.style.display = "none";
                pickupForm.style.display = "block";
            }
        }),
    );

    document.querySelectorAll('input[name="payment"]').forEach((radio) => {
        radio.addEventListener("change", (e) => {
            trocoContainer.style.display =
                e.target.value === "Dinheiro" ? "block" : "none";
            document
                .querySelectorAll(".payment-option")
                .forEach((label) => label.classList.remove("selected"));
            e.target.closest(".payment-option").classList.add("selected");
        });
    });

    // Remove o erro ao digitar
    document
        .querySelectorAll(
            "#delivery-form-container input[required], #pickup-form-container input[required], #pickup-form-container select[required], #cart-step-4 input[required]",
        )
        .forEach((input) => {
            input.addEventListener("input", () => {
                if (input.value.trim() !== "") input.classList.remove("error");
            });
        });

    // Navegação entre as 5 etapas do carrinho
    cartNavAvancar.addEventListener("click", () => {
        if (!validarEtapaAtual()) return;
        if (etapaAtual < 5) mostrarEtapa(etapaAtual + 1);
    });
    cartNavVoltar.addEventListener("click", () => {
        if (etapaAtual > 1) mostrarEtapa(etapaAtual - 1);
    });
    cartStepsIndicator.addEventListener("click", (e) => {
        const dot = e.target.closest(".cart-step-dot");
        if (!dot) return;
        const step = Number(dot.dataset.step);
        if (step <= etapaMaxAlcancada) mostrarEtapa(step);
    });
    novoPedidoBtn.addEventListener("click", iniciarNovoPedido);

    // --- INICIALIZAÇÃO ---
    renderCategorias();
    filtrarEMostrarProdutos();
    atualizarCarrinho();
    mostrarEtapa(1);
});
