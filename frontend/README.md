# Dashboard de Estatísticas do Philippe Coutinho

Este projeto é um dashboard interativo que mostra estatísticas de desempenho do jogador Philippe Coutinho, comparando seu desempenho na Stars League (Qatar) e Premier League (Inglaterra) durante a temporada de 2023.

## Tecnologias Utilizadas

- Angular 19
- Angular Material
- Chart.js / ng2-charts
- SCSS para estilização

## Estrutura do Projeto

- **components/**: Componentes reutilizáveis
  - **player-profile/**: Exibe informações básicas do jogador
  - **league-stats/**: Mostra estatísticas específicas de uma liga
  - **performance-charts/**: Gráficos comparativos entre ligas
  - **detailed-stats/**: Análise detalhada das estatísticas
- **services/**: Serviços para comunicação com a API
  - **football-api.service.ts**: Serviço para comunicação com o backend Flask
- **models/**: Interfaces e tipos para os dados
  - **player.model.ts**: Interfaces para os dados do jogador e estatísticas

## Como executar

### Pré-requisitos

- Node.js
- npm
- Angular CLI

### Instalação

1. Clone o repositório
2. Navegue até a pasta do projeto: `cd frontend`
3. Instale as dependências: `npm install`
4. Inicie o servidor de desenvolvimento: `npm start`

O aplicativo será aberto automaticamente no navegador em `http://localhost:4200`.

### Construção para produção

Para construir o projeto para produção, execute: `npm run build`

Os arquivos de build serão armazenados no diretório `dist/`.

## API Backend

O frontend se comunica com um backend Flask que fornece os seguintes endpoints:

- `/api/coutinho/comparacao`: Dados básicos de comparação
- `/api/player/<player_id>/stats`: Estatísticas detalhadas por liga

Certifique-se de que o servidor backend esteja em execução na porta 5000 antes de iniciar o frontend.
