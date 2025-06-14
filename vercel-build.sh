#!/bin/bash
set -e

# Exibir informações de debug
echo "Iniciando script de build..."
echo "Diretório atual: $(pwd)"
echo "Listando arquivos: $(ls -la)"

# Copiar variáveis de ambiente
echo "Copiando variáveis de ambiente..."
cp .env.production .env

# Instalar dependências Python
echo "Instalando dependências Python..."
pip install -r requirements.txt

# Construir frontend
echo "Construindo frontend..."
cd frontend
npm install
npm run build:vercel

# Voltar para o diretório raiz
cd ..

# Criar diretório de saída
echo "Criando diretório de saída..."
mkdir -p .vercel/output/static
mkdir -p .vercel/output/functions/api

# Copiar arquivos estáticos
echo "Copiando arquivos estáticos..."
cp -r frontend/dist/football-dashboard/browser/* .vercel/output/static/
# Configurar função serverless
echo "Configurando função serverless..."
cp app.py .vercel/output/functions/api/index.py
cp -r requirements.txt .vercel/output/functions/api/

# Criar arquivo de configuração
echo "Criando arquivo de configuração..."
cat > .vercel/output/config.json << EOL
{
  "version": 3,
  "routes": [
    { "src": "/api/(.*)", "dest": "/api" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
EOL

echo "Build concluído com sucesso!" 
