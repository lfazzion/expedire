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
- `contact-config.js`: e-mail e X oficiais; WhatsApp opcional.
- `assets/brand/`: logo e arte principal gerados com a ferramenta integrada de imagens.
- `assets/fonts/`: fontes locais e licenças.
- `DESIGN.md`, `PRODUCT.md`, `docs/BRAND-ASSETS.md`: identidade e documentação.

## Publicar

- **Vercel:** importe o repositório como site estático, sem comando de build. `vercel.json` serve o produto em `/whatsapp`.
- **GitHub Pages:** publique a raiz. `whatsapp/index.html` encaminha `/whatsapp/` à página do produto. Os links relativos funcionam em subdiretórios.
- O domínio e os links canônicos continuam definidos como `expedire.com.br`.

Esta revisão não altera DNS, configuração de hospedagem ou a versão publicada automaticamente. Revise e integre a branch conforme o fluxo de publicação do projeto.

## Verificação desta revisão

Verificação estática de páginas, links, âncoras, imagens/fontes locais, rótulos, títulos e metadados; conferência de delimitadores do CSS; validação de sintaxe de JavaScript e verificação de espaços no diff. A interface ainda requer revisão visual no navegador do ambiente de publicação. Não houve teste em navegador nesta sessão.
