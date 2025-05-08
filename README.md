# Quorly

## 📋 Visão Geral

O **Quorly** é uma aplicação web simples e eficiente para criar, compartilhar e participar de votações. Usuários autenticados podem criar votações com opções personalizáveis, gerar links únicos e compartilhá-los com participantes, que votam informando apenas nome e e-mail, sem necessidade de cadastro. O criador acompanha os resultados em tempo real por meio de um dashboard interativo, e todos os votantes recebem os resultados por e-mail após o término da votação.

O objetivo é facilitar decisões coletivas em grupos, como escolha de líderes, aprovação de propostas ou enquetes casuais, com uma interface intuitiva e acessível.

## 🎯 Funcionalidades Principais

- **Criação de Votações:** Usuários autenticados criam votações com título, descrição (opcional), opções de voto e data limite.
- **Participação Simples:** Votantes acessam um link único, inserem nome e e-mail, e votam sem precisar de conta.
- **Dashboard do Criador:** Exibe resultados em tempo real (com gráficos), lista de votantes, número de acessos e notificações ao vivo para novos votos.
- **Notificações e E-mails:** Notificações em tempo real para o criador e e-mails com resultados enviados aos votantes após o prazo.
- **Segurança:** Limitação de votos por e-mail, modo anônimo opcional e validação de e-mails.
- **Exportação de Dados:** Resultados exportáveis em CSV para análise.

## 🚀 Tecnologias Utilizadas

- **Backend:** NestJS, Postgres, Socket.IO (notificações em tempo real), Bull (filas para e-mails), Nodemailer (envio de e-mails).
- **Frontend:** React, Vite, Tailwind CSS, React Router, Axios e Tanstack Query.


## 📊 Status do Projeto

O projeto está na fase de desenvolvimento do **MVP**, com as seguintes funcionalidades já planejadas ou implementadas:

- [ ]  Autenticação de usuários (cadastro e login).
- [ ]  Criação e gerenciamento de votações.
- [ ]  Página de votação dinâmica.
- [ ]  Notificações em tempo real via Socket.IO.
- [ ]  Envio de e-mails com resultados.
- [ ]  Exportação de resultados em CSV.


## 📝 Licença

Este projeto está licenciado sob a [MIT License](https://grok.com/chat/LICENSE).

## 📬 Contato

Para sugestões, dúvidas ou feedback, entre em contato:

- **E-mail:** [wgsousa12@gmail.com](mailto:wgsousa12@gmail.com)
- **GitHub Issues:** [Crie uma issue](https://github.com/gsousa12/Quorly/issues)

---

Feito com 💻 por @gsousa12
