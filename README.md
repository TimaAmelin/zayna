## Настройка окружения:  
cd services/client && npm install && cd ../../  
cd services/node_backend && npm install && cd ../../

## Выкатка фронтенда:
make start-dev -- (параметры докера)

<!-- ngrok http 3000 -->
зайти в https://dashboard.ngrok.com/cloud-edge/edges и создать edge  
после этого нажать на start_tunnel и скопировать команду для запуска в командной строке  
ngrok tunnel --label edge=edghts_*** http://localhost:3000  

добавь ссылку из ngrok в .env.local

## Выкатка бэкенда:  
docker compose up -d  
Пример запроса:  
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "username":"hello"}' -v http://127.0.0.1:8000/login/
### Подключение к БД:  
sqlite3 zaynadb.sqlite3 