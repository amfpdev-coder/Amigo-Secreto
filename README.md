# Amigo Secreto

Aplicação web para sorteio de amigo secreto com modo local e online em tempo real.

## Funcionalidades

- **Modo local** — cadastre os participantes e sorteie no mesmo dispositivo, cada pessoa vê apenas o seu resultado atraves de uma roleta animada
- **Modo online** — crie uma sala com código, compartilhe o link e cada participante revela seu amigo secreto do proprio celular
- **Regra personalizada** — defina um valor (ex: "Presentes até R$50") e o tema visual muda automaticamente com emojis e cores
- **Modo claro/escuro** — alterne com um clique no botao de sol/lua
- **Persistencia** — lista de participantes salva localmente e histórico de sorteios salvo no Firebase

## Tecnologias

- HTML, CSS e JavaScript (vanilla)
- Firebase Firestore (modo online e histórico)
- Canvas API (roleta animada)
- CSS custom properties (temas dinamicos)
- Google Fonts (Poppins)

## Como usar

1. Abra `index.html` no navegador
2. Escolha entre jogar no mesmo dispositivo ou criar uma sala online
3. Opcional: defina uma regra no campo abaixo do titulo (ex: "Presentes ate R$80")
4. Cadastre os participantes e inicie o sorteio
5. Pode acessar o site também: 

## Estrutura

```
index.html    — pagina principal
styles.css    — estilos e temas
app.js        — logica do sorteio, Firebase e personalizacao
assets/       — avatar e favicon
```

## Creditos

- [People illustrations by Storyset](https://storyset.com/people)
