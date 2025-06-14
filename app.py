from flask import Flask, jsonify, Request
import requests
import pandas as pd
from dotenv import load_dotenv
import os
from flask_cors import CORS
import json

# Carrega as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas as rotas

# API configs
API_URL = os.getenv('API_URL', 'https://v3.football.api-sports.io/players')
HEADERS = {
    'x-rapidapi-key': os.getenv('API_KEY', 'bcd85d3d22c40a5debd42f5006ff10bf'),
    'x-rapidapi-host': os.getenv('API_HOST', 'v3.football.api-sports.io')
}

print("Configurações da API:")
print(f"API_URL: {API_URL}")
print(f"API_KEY: {os.getenv('API_KEY')}")
print(f"API_HOST: {os.getenv('API_HOST')}")

def get_player_data(player_id):
    params = {
        'id': player_id,
        'season': '2023'
    }
    print(f"Buscando dados para jogador {player_id}")
    print(f"Headers: {json.dumps(HEADERS)}")
    print(f"Params: {json.dumps(params)}")
    response = requests.get(API_URL, headers=HEADERS, params=params)
    print(f"Status da resposta: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        if 'response' in data and len(data['response']) > 0:
            print("Dados encontrados com sucesso!")
            return data
        else:
            print("Resposta da API não contém dados do jogador")
            print(f"Resposta: {response.text[:300]}...")
            return None
    else:
        print(f"Erro na requisição: {response.status_code}")
        print(f"Resposta: {response.text[:300]}...")
        return None

# Função para limpar e preparar dados para a API
def prepare_data_for_api(df):
    # Criar uma cópia para não modificar o original
    df_clean = df.copy()
    
    # Substituir None/NaN por 0 em colunas numéricas
    numeric_cols = ['games.appearences', 'games.minutes', 'goals.total', 'goals.assists', 
                   'shots.total', 'shots.on', 'passes.total', 'passes.key',
                   'duels.total', 'duels.won', 'dribbles.attempts', 'dribbles.success']
    for col in numeric_cols:
        if col in df_clean.columns:
            df_clean[col] = df_clean[col].fillna(0)
    
    # Calcular métricas
    if 'games.appearences' in df_clean.columns and df_clean['games.appearences'].sum() > 0:
        # Gols por jogo
        if 'goals.total' in df_clean.columns:
            df_clean['goals_per_game'] = round(df_clean['goals.total'] / df_clean['games.appearences'], 2)
        
        # Minutos por gol
        if 'games.minutes' in df_clean.columns and 'goals.total' in df_clean.columns:
            df_clean['minutes_per_goal'] = df_clean.apply(
                lambda x: round(x['games.minutes'] / x['goals.total'], 0) if x['goals.total'] > 0 else 0, 
                axis=1
            )
        
        # Precisão de chutes
        if 'shots.on' in df_clean.columns and 'shots.total' in df_clean.columns:
            df_clean['shot_accuracy'] = df_clean.apply(
                lambda x: round(x['shots.on'] / x['shots.total'] * 100, 1) if x['shots.total'] > 0 else 0, 
                axis=1
            )
        
        # Eficiência de dribles
        if 'dribbles.success' in df_clean.columns and 'dribbles.attempts' in df_clean.columns:
            df_clean['dribble_success_rate'] = df_clean.apply(
                lambda x: round(x['dribbles.success'] / x['dribbles.attempts'] * 100, 1) if x['dribbles.attempts'] > 0 else 0, 
                axis=1
            )
            
        # Taxa de vitória em duelos
        if 'duels.won' in df_clean.columns and 'duels.total' in df_clean.columns:
            df_clean['duel_win_rate'] = df_clean.apply(
                lambda x: round(x['duels.won'] / x['duels.total'] * 100, 1) if x['duels.total'] > 0 else 0, 
                axis=1
            )
    
    return df_clean

# Formatar dados para a API
def format_for_api(player_info, league_data):
    # Informações básicas do jogador
    player_basic = {
        'id': player_info['player']['id'],
        'name': player_info['player']['name'],
        'firstname': player_info['player']['firstname'],
        'lastname': player_info['player']['lastname'],
        'age': player_info['player']['age'],
        'nationality': player_info['player']['nationality'],
        'height': player_info['player']['height'],
        'weight': player_info['player']['weight'],
        'photo': player_info['player']['photo'],
        'birth_date': player_info['player']['birth']['date'],
        'birth_place': player_info['player']['birth']['place'],
        'birth_country': player_info['player']['birth']['country'],
    }
    
    # Estatísticas da liga
    league_stats = {}
    if not league_data.empty:
        row = league_data.iloc[0]
        
        # Informações da liga
        league_stats['league'] = {
            'id': int(row.get('league.id')) if pd.notna(row.get('league.id')) else None,
            'name': row.get('league.name'),
            'country': row.get('league.country'),
            'logo': row.get('league.logo'),
            'flag': row.get('league.flag'),
            'season': int(row.get('league.season')) if pd.notna(row.get('league.season')) else None
        }
        
        # Informações do time
        league_stats['team'] = {
            'id': int(row.get('team.id')) if pd.notna(row.get('team.id')) else None,
            'name': row.get('team.name'),
            'logo': row.get('team.logo')
        }
        
        # Estatísticas de jogos
        league_stats['games'] = {
            'appearences': int(row.get('games.appearences', 0)),
            'lineups': int(row.get('games.lineups', 0)),
            'minutes': int(row.get('games.minutes', 0)),
            'position': row.get('games.position'),
            'rating': float(row.get('games.rating', 0)) if pd.notna(row.get('games.rating')) else None
        }
        
        # Estatísticas de gols e chutes
        league_stats['goals_shots'] = {
            'goals': int(row.get('goals.total', 0)),
            'assists': int(row.get('goals.assists', 0)) if pd.notna(row.get('goals.assists')) else 0,
            'shots_total': int(row.get('shots.total', 0)),
            'shots_on': int(row.get('shots.on', 0)),
            'goals_per_game': float(row.get('goals_per_game', 0)),
            'shot_accuracy': float(row.get('shot_accuracy', 0))
        }
        
        # Estatísticas de passes e dribles
        league_stats['playmaking'] = {
            'passes_total': int(row.get('passes.total', 0)),
            'passes_key': int(row.get('passes.key', 0)) if pd.notna(row.get('passes.key')) else 0,
            'dribbles_attempts': int(row.get('dribbles.attempts', 0)),
            'dribbles_success': int(row.get('dribbles.success', 0)),
            'dribble_success_rate': float(row.get('dribble_success_rate', 0))
        }
        
        # Estatísticas defensivas
        league_stats['defensive'] = {
            'duels_total': int(row.get('duels.total', 0)),
            'duels_won': int(row.get('duels.won', 0)),
            'duel_win_rate': float(row.get('duel_win_rate', 0)),
            'tackles': int(row.get('tackles.total', 0)) if pd.notna(row.get('tackles.total')) else 0,
            'blocks': int(row.get('tackles.blocks', 0)) if pd.notna(row.get('tackles.blocks')) else 0,
            'interceptions': int(row.get('tackles.interceptions', 0)) if pd.notna(row.get('tackles.interceptions')) else 0
        }
        
        # Cartões
        league_stats['cards'] = {
            'yellow': int(row.get('cards.yellow', 0)),
            'red': int(row.get('cards.red', 0))
        }
    
    return {
        'player': player_basic,
        'stats': league_stats
    }

@app.route('/')
def index():
    return jsonify({
        "status": "online",
        "message": "API de estatísticas de futebol está funcionando",
        "endpoints": [
            "/api/coutinho/comparacao",
            "/api/player/<player_id>/stats"
        ]
    })

@app.route('/api/coutinho/comparacao')
def coutinho_comparacao():
    data = get_player_data(147)  # Id do Coutinho
    if not data or 'response' not in data:
        return jsonify({'error': 'Dados não encontrados'}), 404
    # Extrai as estatísticas do jogador
    player_info = data['response'][0]
    stats_df = pd.json_normalize(player_info['statistics'])

    
    stars_league = stats_df[stats_df['league.name'] == 'Stars League']
    premier_league = stats_df[stats_df['league.name'] == 'Premier League']

   
    def simplify_stats(df):
        # Seleciona as colunas que quer mostrar
        cols = ['league.name', 'team.name', 'games.appearences', 'goals.total', 'goals.assists', 'shots.on', 'passes.accuracy', 'cards.yellow', 'cards.red', 'minutes']
        filtered_cols = [col for col in cols if col in df.columns]
        return df[filtered_cols].to_dict(orient='records')

    response_json = {
        'player': player_info['player'],
        'comparacao': {
            'stars_league': simplify_stats(stars_league),
            'premier_league': simplify_stats(premier_league)
        }
    }
    return jsonify(response_json)

@app.route('/api/player/<int:player_id>/stats')
def player_stats(player_id):
    # Obter dados do jogador
    data = get_player_data(player_id)
    if not data or 'response' not in data:
        return jsonify({'error': 'Dados não encontrados'}), 404
    
    # Extrair informações do jogador
    player_info = data['response'][0]
    stats_df = pd.json_normalize(player_info['statistics'])
    
    # Filtrar por ligas
    stars_league = stats_df[stats_df['league.name'] == 'Stars League']
    premier_league = stats_df[stats_df['league.name'] == 'Premier League']
    
    # Processar dados
    stars_league_clean = prepare_data_for_api(stars_league)
    premier_league_clean = prepare_data_for_api(premier_league)
    
    # Formatar para API
    stars_league_api = format_for_api(player_info, stars_league_clean)
    premier_league_api = format_for_api(player_info, premier_league_clean)
    
    # Retornar JSON
    return jsonify({
        'player': stars_league_api['player'],
        'leagues': {
            'stars_league': stars_league_api['stats'],
            'premier_league': premier_league_api['stats']
        }
    })

# Handler para o Vercel
def handler(request):
    """
    Esta função é usada pelo Vercel para processar requisições serverless.
    Ela recebe um objeto de requisição e retorna uma resposta Flask.
    
    Para o Vercel, esta função é o ponto de entrada para todas as requisições HTTP.
    """
    with app.request_context(request.environ):
        return app(request.environ)

if __name__ == '__main__':
    app.run(debug=True)