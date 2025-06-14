#!/bin/bash

# Instalar dependências do backend
pip install -r requirements.txt

# Navegar para o diretório frontend
cd frontend

# Instalar dependências do frontend
npm install

# Construir o frontend
npm run build:vercel

# Voltar para o diretório raiz
cd ..

# Criar diretório de saída
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions/api

# Copiar os arquivos do frontend para a pasta de saída
cp -r frontend/dist/football-dashboard/browser/* .vercel/output/static/

# Criar arquivo de configuração
cat > .vercel/output/config.json << EOL
{
  "version": 3,
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOL 