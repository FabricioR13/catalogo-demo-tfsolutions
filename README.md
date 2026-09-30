# Catálogo Demonstrativo — TF Solutions

Catálogo online de demonstração, usado pela **TF Solutions** para mostrar a empreendedores de Cachoeirinha/RS (bairros Girassóis e Campo Belo) como funciona uma loja com catálogo, carrinho, pedido direto pelo WhatsApp e um painel administrativo completo.

Ao abrir o site, o visitante escolhe o tipo de negócio mais parecido com o dele (hamburgueria, galeteria, doces e salgados, semijoias, roupas, açaí ou crepe) e vê a loja funcionando com produtos de exemplo daquele nicho, com fotos reais de categoria. Um pedido de teste feito na demo cai direto no WhatsApp da TF Solutions.

## Arquivos

- `index.html` / `style.css` / `script.js` — a vitrine pública (loja).
- `nichos.js` — dados de exemplo de cada nicho (produtos, categorias, cores, textos, fotos). É o arquivo que troca "a cara" da demo, sem precisar mexer no `script.js` ou no `admin.html`.
- `admin.html` — painel administrativo (produtos, categorias, cupons, PDV, relatório e configurações), carregado com os dados do mesmo nicho escolhido na vitrine. **É todo simulado, de propósito**: não existe banco de dados de verdade por trás — qualquer e-mail/senha entra, e qualquer alteração feita (editar produto, lançar uma venda no PDV, mudar configurações) vive só na memória daquela aba do navegador. Ao recarregar a página, tudo volta ao ponto de partida. Isso deixa a demonstração segura pra qualquer cliente mexer à vontade, sem risco de bagunçar dados de verdade nem de misturar o que um cliente fez com o que o próximo vai ver.

## Como abrir a demo direto num nicho

`index.html?nicho=acai` (troque `acai` pela chave do nicho desejado em `nichos.js`) pula a tela de escolha e abre já naquele nicho — útil para mandar um link direto pra alguém.

O mesmo vale para o admin: `admin.html?nicho=acai` abre o painel já carregado com os produtos daquele nicho. Sem o parâmetro, ele abre no primeiro nicho da lista, e dá pra trocar pelo seletor no topo do painel.

---
Projeto desenvolvido por **TF Solutions**.
