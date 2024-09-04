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
Пересобрать образ:  
docker compose -f compose.yaml build web  
Примеры запросов:  
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "username":"hello"}' -v http://127.0.0.1:8000/login/
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "tokens_count":10}' -v http://127.0.0.1:8000/tokens_batch/
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/tokens_count?id=123
curl -X POST -H "Content-Type: application/json" -d '{"field":[[1,-1,-1],[-1,1,0],[0,0,1]]}' -v http://127.0.0.1:8000/tic_tac_toe/
curl -X PUT -H "Content-Type: application/json" -d '{"sender": 123, "receiver": 1234, "tokens_count": 1}' -v http://127.0.0.1:8000/present/
### Подключение к БД:  
sqlite3 zaynadb.sqlite3 

### Запуск приложение в режиме разработки
/start_dev_2416256