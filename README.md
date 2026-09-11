# Expedire

Site institucional em português para um estúdio de automação com IA. HTML, CSS e JavaScript estáticos, sem build, dependências de runtime ou chamadas externas de fontes.

## Testar localmente

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000 e http://localhost:8000/whatsapp.html.

## Contatos

Canais confirmados pelo proprietário:

- E-mail: **contato@expedire.com.br**
- X: **https://x.com/getexpedire**

`contact-config.js` centraliza os canais. Os links oficiais também estão no HTML para funcionar sem JavaScript; ao mudar um canal, atualize os fallbacks das duas páginas. Nenhum telefone comercial foi informado, por isso o canal WhatsApp permanece vazio e oculto.

O formulário prepara assunto e corpo de um e-mail, abre o aplicativo de e-mail do visitante e permite revisar antes de enviar. Não há backend, armazenamento remoto, analytics ou envio automático. O download local do briefing continua disponível, inclusive se o dispositivo não tiver um aplicativo de e-mail configurado. Links `mailto:` longos podem depender dos limites do aplicativo; o download oferece uma alternativa.

Nome e empresa são opcionais. O texto do projeto é obrigatório. Sem JavaScript, os canais diretos e a navegação continuam acessíveis, e o formulário orienta o uso do e-mail direto.

## Estrutura

- `index.html`: marca, soluções, produto, método, princípios, FAQ e contato.
- `whatsapp.html`: produto, demonstração ilustrativa, benefícios, públicos, método, FAQ e contato.
- `style.css`: identidade compartilhada, layout responsivo, foco e redução de movimento.
- `script.js`: menu, canais de contato, preparação de e-mail e download do briefing.
- `motion.js`: conversas animadas, digitação, pausa/replay, entradas e progresso do método.
- `oferta/index.html`: oferta comercial aprovada; recursos e links resolvidos a partir da subpasta.
- `contact-config.js`: e-mail e X oficiais; WhatsApp opcional.
- `assets/brand/`: logo e arte principal gerados com a ferramenta integrada de imagens.
- `assets/fonts/`: fontes locais e licenças.
- `DESIGN.md`, `PRODUCT.md`, `docs/BRAND-ASSETS.md`: identidade e documentação.

## Publicar

- **Vercel:** importe o repositório como site estático, sem comando de build. `vercel.json` serve o produto em `/whatsapp`.
- **GitHub Pages:** publique a raiz. `whatsapp/index.html` encaminha `/whatsapp/` à página do produto. Os links relativos funcionam em subdiretórios.
- O domínio e os links canônicos continuam definidos como `expedire.com.br`.

Esta revisão não altera DNS, configuração de hospedagem ou a versão publicada automaticamente. Revise e integre a branch conforme o fluxo de publicação do projeto.

## Verificação

Servidor local: `python3 -m http.server 8000`.

Teste de comportamento das animações, com Playwright disponível:

```sh
node tests/motion.cjs
```

Se o módulo estiver fora do projeto, informe seu caminho em `PLAYWRIGHT_MODULE`. O teste cobre pausa global, movimento reduzido, ordem das mensagens e repetição. Nenhuma dependência foi adicionada ao site.

Revisão no Chromium das três páginas em 1440, 768, 390 e 320px. Conferir: erros de recursos/JavaScript, overflow, menu/Escape, contato direto e download, links/âncoras e fallback sem JavaScript. A oferta mantém o texto aprovado do commit 0659f1d.
