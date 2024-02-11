# Anotações aula 3

- Para keys de map pode-se usar o: `crypto.randomUUID()` para gerar um id unico do tipo string
- Ao criar um state em um text area sempre é necessário tem uma função de set no onChange e o valor da variável no value, pois assim mudanças na variável refletem no textarea
- Json(javascript object notation) é uma forma de representação de objetos do javascript muito usado para armazenar dados no local storage e enviar dados entra aplicações
- Animações padrão do tailwind em https://tailwindcss.com/docs/animation
  - `animate-spin` faz o elemento girar
  - `animate-ping` faz o elemento piscar
  - `animate-bounce` faz o elemento pular
  - `animate-pulse` faz o elemento piscar
- Verificar se o navegador aceita o speech recognition, o site lista os navegadores que suportam: https://caniuse.com/?search=speechrecognition
- instalar o dom-speech-recognition para o typescript identificar o tipo do speech recognition que é uma funcionalidade recente e não vem por padrão: `npm install -D @types/dom-speech-recognition`
- O tailwind tem padrões de tamanho de tela para responsividade condicional em:
- Por padrão o tailwind é mobile first, sendo recomendado fazer o design para telas pequenas e incrementalmente criando condicionais de alteração para telas maiores
- No react passar uma função com () a executa na geração do elemento, para ser executado apenas na ativação da action basta adicionar uma arrow function, como no exemplo: `onClick={() => onNoteDeleted(note.id)}`
