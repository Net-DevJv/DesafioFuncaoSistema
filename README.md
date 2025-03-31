# Teste técnico – Função Sistemas

Este projeto foi desenvolvido como parte do processo seletivo para a vaga de Desenvolvedor .NET FullStack na [Função Sistemas](https://www.funcao.com.br/).

## Projeto

A solicitação do teste foi baseada em um [projeto existente](https://github.com/Net-DevJv/DesafioFuncaoSistema/tree/main/FI.WebAtividadeEntrevista) de cadastro de clientes, com os seguintes pontos principais:

- Vincular a tela de cadastro de clientes e a entidade Cliente no banco de dados um CPF, garantindo que um CPF é único para cada cliente e que ele é válido segundo a Receita Federal.
- Adicionar uma lista de beneficiários a cada cada Cliente, contendo Nome e CPF, garantido o vinculo de 1 para n entre Cliente e Beneficiario.
  - Adicionar modal para controle de Beneficiários na tela de Clientes.
  - Criar estrutura de entidades e scripts de banco de dados para tabela e procedures.

## Features adicionadas

- Adição do CPF à entidade e tela de Cliente com máscara respeitando a formatação do CPF.
- Botão e Modal de gerenciamento de Beneficiários de um Cliente, na criação e alteração de registro.
- Entidades de código e banco de dados para Beneficiário.

## Melhorias implementadas

- Visualização de CPF a lista de Clientes
- Ação de remoção de Clientes e Beneficiários vinculados na lista de Clientes

## Pendências e novas features

- Adicionar máscara para número de telefone
- Utilizar lista dinâmica para UF e Cidade, remover valores fixos do HTML
