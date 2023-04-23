---
layout: post
title: Avaliador de expressões
language: portuguese
snippet:
draft: true
---

# Introdução

Recentemente assisti a um vídeo onde o autor explica como a interpretação de
expressões simples é facilitada pela poder da expressividade de algumas
linguagens funcionais. Em especial, no vídeo citado, a linguagem utilizada era
Haskell e a tarefa era interpretar expressões que seguem a seguinte gramática.

``` ebnf
EXPR   ::= TERM + TERM | EXPR
TERM   ::= (TERM) | FACTOR
FACTOR ::= EXPR * EXPR | FACTOR
```

Todos lembram-se dela da aula de Linguagens Formais e Autômatos ou Compiladores.
A gramática apresentada denota as seguintes expressões: `2+3*5`,
É com o intuito de implementar um /parser/ em OCaml que aqui escrevo.
Prosseguimos.

# A aventura começa

OCaml é uma linguagem de paradigma funcional impura. Contém diversas
características que possibilitam a codificação desse avaliador de forma simples
dado que é possível se expressar de uma maneira muito mais complexa do que a
presente na maioria das linguagens de paradigma imperativo/orientado a objetos.

A expressividade da linguagem se revela na possibilidade de denotar tipos mais
complexos como os /sum types/ e os /product types/.
