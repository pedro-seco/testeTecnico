# Meus Mapas

Teste técnico para estagiário em Desenvolvimento na [NerdMonster](https://nerdmonster.com/)

## Sumário

1. [Critérios](#Critérios)
2. [Sistema](#Sistema)  
2.1. [Tela 1](#tela-1)  
2.2. [Tela 2](#tela-2)

## Critérios

A avaliação será baseada em 5 critérios principais, começando por:  

- Critério 1 (20 pontos) – Fundamentos (Dev Web, Redes, POO e BD).: Avalia se o candidato domina a lógica básica e consegue transformar o problema em código funcional.  

- Critério 2 (20 pontos) – Funcionamento da Solução: Avalia se o sistema roda corretamente e entrega o que foi proposto.  

- Critério 3 (20 pontos) – Organização do Projeto: Avalia se o código e a estrutura do projeto estão organizados e fáceis de entender.  

- Critério 4 (20 pontos) – Uso de Banco de Dados: Avalia se o candidato consegue criar e manipular dados de forma simples e correta.  

- Critério 5 (20 pontos) – Clareza e Comunicação: Avalia se o candidato consegue explicar o que fez e documentar minimamente a solução.  

- Critério 6 (extras) - Fez a mais… Mostrou que sabe? Quis inovar? Isso é muito bem vindo e damos pontos para isso. Quero usar docker? use. Quero fazer deploy. Faça! Nos impressione! Entra no jogo!

## Sistema  

### Tela 1  

Listagem de Mapas será a tela inicial e deve permitir listar todos os mapas criados, exibir o nome do mapa e a quantidade de pontos cadastrados, além de possibilitar criar um novo mapa e acessar um mapa existente.

### Tela 2  

Ao acessar um mapa, o usuário será direcionado para a Tela 2 – Detalhe do Mapa (Cadastro de Pontos). Essa tela deve conter um mapa interativo, uma lista lateral ou inferior com todos os pontos cadastrados e um indicador visível com o total de pontos cadastrados naquele mapa. O usuário deverá conseguir clicar no mapa para adicionar um novo ponto, o que deve abrir um modal de cadastro, onde será possível informar o nome do ponto, com latitude e longitude preenchidas automaticamente. O sistema deve exibir todos os pontos tanto no mapa quanto na lista, permitir editar apenas o nome do ponto, excluir um ponto específico e também excluir todos os pontos do mapa através de um botão dedicado. Não é necessário permitir a alteração da posição do ponto após o cadastro.

## TODO

Sobre os objetivos (inclusive os extras) que eu tinha colocado aqui, eu, o pedro do passado, deixo uma reflexão ao pedro do futuro: "Falar é fácil, quero ver código"

Primeiro push está feito, api pronta e banco configurado(?).

- FAZER DOC
- DESCOBRIR SE O QUE EU FIZ NO POSTMAN SÃO TESTE UNITÁRIOS (são 1:30 e minha dor de cabeça não me deixa focar mais, eu to desde 10 am cozinhando esse projeto)

- Ajeitar o as pastas da aplicacao
- exportar uma collection do postman p disponibilizar a testagem
- Preparar o Deploy da aplicacaao
- Trocar latitude/longitude por lat/lng no projeto inteiro (começar pelo schema)
- CommonUtils -> setLoading
- Action -> FlyToPoint no ItemPOIs 
- Customizar confirm()?


DIAS DORMINDO MENOS DE 5 HORAS SEGUIDOS: 2
