# Expedire

Site estático em português, sem build, dependências de runtime ou chamadas externas de fontes.

## Testar localmente

Na pasta do projeto:

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000 e http://localhost:8000/whatsapp.html.

## Contato: configuração necessária

O briefing não forneceu e-mail nem telefone oficial. Em `script.js`, configure `EXPEDIRE_CONTACT_URL` com o canal confirmado: `mailto:` seguido do e-mail ou `https://wa.me/` seguido do número internacional só com dígitos. Isso ativa o link de contato nas duas páginas.

Enquanto vazio, a seção permite apenas baixar um resumo em texto e explica que nenhuma informação é enviada. Não há backend, envio de formulário ou armazenamento remoto. Com JavaScript desativado, esse formulário fica desabilitado e exibe orientação.

## Publicar

- **Vercel:** importe a pasta/repositório como site estático, sem comando de build. `vercel.json` serve o produto em `/whatsapp`.
- **GitHub Pages:** publique a raiz do repositório. `whatsapp/index.html` encaminha `/whatsapp/` à página do produto. Os links entre páginas usam caminhos relativos, inclusive sob subdiretórios.
- O domínio e os links canônicos estão definidos como `expedire.com.br`. A implantação e DNS não foram alterados.

## Arquivos

- `index.html`: marca, soluções, produto e contato.
- `whatsapp.html`: produto, exemplo ilustrativo, benefícios, públicos, método e FAQ.
- `style.css`: tokens, layout responsivo, foco e redução de movimento.
- `script.js`: menu e contato configurável; download local do resumo.
- `assets/`: símbolo SVG e fontes locais.
- `DESIGN.md`, `PRODUCT.md`, `docs/`: identidade, contexto e plano breve.
- `.impeccable/design.json`: registro de tokens.
- `vercel.json`, `whatsapp/index.html`: suporte à rota do produto.

## Verificação

Verificados em Chromium: duas páginas em 1440, 390 e 320px, ausência de overflow horizontal, links internos, menu móvel e Escape, download do resumo. JavaScript validado com `node --check script.js`. Capturas desktop/mobile inspecionadas. Não há dados, preços ou depoimentos fictícios; a conversa é rotulada como ilustrativa.
