# Amigo Secreto

Aplicação web de sorteio de amigo secreto com modo local e online em tempo real — cada participante vê apenas o seu próprio resultado, sem expor os pares dos demais.

## Funcionalidades

- **Modo local** — cadastre os participantes e sorteie no mesmo dispositivo com roleta animada, som e luzes piscantes
- **Modo online** — crie uma sala com código, compartilhe o link e cada participante revela seu amigo secreto do próprio celular em tempo real
- **Regra personalizada** — defina um valor (ex: "Presentes até R$50") e o tema visual muda automaticamente com emojis e cores
- **Modo claro/escuro** — alterne com um clique no botão de sol/lua
- **Roleta premium** — borda dourada, luzinhas piscando, sons de tick e melodia de vitória
- **Persistência** — lista de participantes salva localmente e histórico de sorteios salvo no Firebase
- **Algoritmo de derangement** — garante que ninguém tira a si mesmo

## Tecnologias

- HTML5, CSS3 e JavaScript (vanilla)
- Firebase Firestore (modo online e histórico)
- Canvas API (roleta animada com efeitos visuais)
- Web Audio API (sons da roleta)
- CSS custom properties (temas dinâmicos)
- Google Fonts (Poppins)

## Como usar

1. Abra `index.html` no navegador
2. Escolha entre jogar no mesmo dispositivo ou criar uma sala online
3. Opcional: defina uma regra no campo abaixo do título (ex: "Presentes até R$80")
4. Cadastre os participantes e inicie o sorteio
5. Pode acessar o site também:

## Estrutura

```
index.html    — página principal
styles.css    — estilos e temas
app.js        — lógica do sorteio, Firebase e personalização
assets/       — avatar e favicon
```

## Créditos

- [People illustrations by Storyset](https://storyset.com/people)
