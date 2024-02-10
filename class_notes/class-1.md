# Anotações da aula 1

- `react-dom` fica junto com a dependencia do react pq é o port/bridge para o document object manager do javascript web, no caso do mobile é o `react-native`
- A primeira letra de um componente deve ser maiuscula sempre
- Tailwind: estilos usando apenas classes, bom para forçar padronização nos estilos, pois ele já limita algumas escolhas.
  - seguir o tutorial vite: [Install Tailwind CSS with Vite](https://tailwindcss.com/docs/guides/vite)
  - Instalar extensões do vscode:
    - Tailwind CSS intelliSense
    - opcional: PostCSS Language support

### Dicas tailwind:

- a métrica dele é sempre x4 o valor em px
- Pode-se estender opções de estilo do tailwind adicionando elas ao tailwind.config.js como por exemplo:
  ```json
  fontFamily: {
  sans: ['Inter', 'sans-serif']
  }
  ```
- para usar pseudo classes no tailwind, tipo hover, basta colocar ela e :, EX: hover:ring-2,
- focus visible e o focus, se diferenciam pelo fato do focus-visible ser mostrado apenas quando na navegação pelo teclado
- O tailwind tem parametros que não existem no css como:
  - space-y-6 que da espaço em todos elementos subsequentes abaixo do elemento aplicado de 6( lembrando do\*4)px que por debaixo dos panos adiciona padding 24px acima dos elementos subsequentes
- m = margin, my = margin no eixo y, p = padding,
- Para usar um px usar como no no EX: h-px(altura de 1 px), para dois h-0.5(0.5 \* 4 px = 2 px)
- Para usar um valor não usual é necessário adicionar um `-[valor]` no final do nome da classe EX: `auto-rows-[250px]`
- a classe ring do tailwind cria um box shadow similar à um border, que serve melhor em casos de hover que o border, pois o mesmo altera os elementos internos ao aparecer
- Para fazer um gradiente usamos: bg-gradient-to-t(a direção que vai: de baixo para cima) from-black/60(começando de preto 60% de opacidade) to-black/0(para preto 0% de opacidade)
