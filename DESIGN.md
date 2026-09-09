---
name: Expedire
description: Tecnologia aplicada, com precisão editorial e fluxos visíveis.
colors:
  gold: "oklch(84% 0.19 80.46)"
  patina: "oklch(70% 0.12 188)"
  lacquer-black: "oklch(7% 0.006 95)"
  surface: "#11130f"
  raised: "#1a1e18"
  champagne: "#eeeade"
  muted: "#acae9f"
  line: "#34392f"
  product-surface: "#dcdccd"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(44px, 5.5vw, 78px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  control: "3px"
  conversation: "7px"
spacing:
  small: "12px"
  medium: "24px"
  large: "40px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.lacquer-black}"
    rounded: "{rounded.control}"
    padding: "15px 23px"
---
## Overview
Identidade editorial técnica. O símbolo combina linhas de processo e uma seta de avanço. Diagramas explicam o trabalho; a tipografia sustenta a marca.
## Colors
Ouro para ações principais; pátina para processos e conexões; champagne para leitura. A superfície clara destaca o produto dentro da marca.
## Typography
Manrope nos títulos e marca; DM Sans na leitura e controles. Fontes servidas localmente. Hierarquia com escala e espaço; textos secundários HTML a partir de 12px.
## Layout
Conteúdo limitado a 1240px. Duas colunas para narrativa e demonstração. Abaixo de 700px, uma coluna e menu expansível. Margens de 20px em telas pequenas; seções de 66px no mobile e 108px no desktop.
## Elevation & Depth
Superfícies opacas e divisórias finas. Sombra suave restrita à demonstração de conversa.
## Shapes
Controles discretamente arredondados; balões de conversa com direções distintas. SVG próprio para fluxos e ícones lineares.
## Components
Menu com estado expandido e Escape. FAQ com details nativo. Formulário local com validação e aviso explícito de não envio. Links de contato ativados apenas com destinatário configurado.
## Do's and Don'ts
**Regra do movimento:** mostrar origem, processamento e destino quando um diagrama for útil.
**Regra da evidência:** não fabricar métricas, clientes, depoimentos ou resultados.
Respeitar redução de movimento. Foco visível em ouro. Sem gradientes decorativos ou bibliotecas de interface.
