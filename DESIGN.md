# Expedire — precisão em movimento

## Direção visual
Identidade editorial expressiva para um estúdio brasileiro de automação com IA. A abertura une uma composição tipográfica monumental, a escultura original em ouro/pátina e uma conversa flutuante. A relação solicitação → resposta → ação é o gesto de movimento central. Superfícies champagne e verde profundo dão ritmo à leitura; os serviços são linhas editoriais, sem uma grade de cartões repetidos.

## Sistema
- Preto laca `#101815`, fundo profundo `#0a100d`.
- Ouro champagne `#d5bc7f`, pátina `#9ec3b2`, papel `#eeeae1`.
- Área do produto `#203b30`; texto escuro em superfícies claras.
- Manrope para títulos principais/assinatura, DM Sans para leitura e subtítulos de interface, Fraunces com itálico real para ênfase. Fontes locais; pesos declarados correspondem aos arquivos.
- Layout de até 1392px, margens fluidas, menu móvel até 800px. Hero com composição própria no celular; conteúdo testado a partir de 320px.
- Logo e escultura do PR #1 preservados, incluindo masters e documentação em docs/BRAND-ASSETS.md.

## Ícones e acabamento
SVGs lineares com traço de 1,6, pontas arredondadas e margem interna no viewBox. Dimensões quadradas, alinhamento óptico e espaço de segurança nos botões também em hover. Títulos menores usam espaçamento de letras mais aberto.

## Movimento
`motion.js` usa Web Animations API e IntersectionObserver, sem biblioteca de runtime. Balões entram em sequência, mostram digitação e conduzem à confirmação. Traços conectam as etapas. A abertura tem flutuação finita, recorte tipográfico e paralaxe discreta da arte em dispositivos com ponteiro preciso. O método acompanha o progresso de leitura; a assinatura final aparece por recorte.

Pausa global e repetição por conversa. Animações ficam suspensas fora da tela ou com a aba oculta. `prefers-reduced-motion` mostra o conteúdo completo, estático. Sem JavaScript, os textos, conversas e contatos continuam disponíveis. A rolagem é nativa.

## Páginas e conteúdo
Inicial, WhatsApp e oferta compartilham identidade. A oferta incorporada do commit 0659f1d conserva integralmente o texto comercial aprovado; somente marcação semântica, recursos e caminhos foram ajustados. Não foram criados clientes, métricas, depoimentos ou preços.

## Contato
Canais oficiais em contact-config.js: contato@expedire.com.br e https://x.com/getexpedire. Nenhum telefone comercial presumido. O formulário prepara uma mensagem no aplicativo do visitante; o download local do briefing é alternativo. Não há envio automático ou armazenamento remoto.
