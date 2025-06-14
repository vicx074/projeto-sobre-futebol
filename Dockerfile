FROM python:3.9-slim

WORKDIR /app

# Instalar dependências de compilação
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Instalar numpy primeiro para evitar incompatibilidades
RUN pip install --no-cache-dir numpy==1.23.5

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY app.py .

EXPOSE 8080

CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"] 