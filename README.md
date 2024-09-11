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
Список возможных запросов:  
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "username":"hello"}' -v http://127.0.0.1:8000/login/
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "username":"hello", "from": 1234, "photo": "https://img.freepik.com/free-vector/colorful-bird-illustration-gradient_343694-1741.jpg?t=st=1726046141~exp=1726049741~hmac=9879309f3a1bfb3f0871c02d4341e869ee1477e8aacce5445442dda4362acd77&w=740"}' -v http://127.0.0.1:8000/login/
curl -X PUT -H "Content-Type: application/json" -d '{"id":123, "tokens_count":10}' -v http://127.0.0.1:8000/tokens_batch/
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/tokens_count?id=123
curl -X POST -H "Content-Type: application/json" -d '{"field":[[0,0,0],[0,1,0],[0,0,0]], "id": 123}' -v http://127.0.0.1:8000/tic_tac_toe/
curl -X PUT -H "Content-Type: application/json" -d '{"sender_id": 123, "project_id": 1}' -v http://127.0.0.1:8000/present/
curl -X PUT -H "Content-Type: application/json" -d '{"sender_id": 123, "receiver_id": 1234, "project_id": 1}' -v http://127.0.0.1:8000/present/
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 123, "present_id": 1}' -v http://127.0.0.1:8000/present/
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/projects/
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 123, "project_id": 1}' -v http://127.0.0.1:8000/participate/
curl -X POST -H "Content-Type: application/json" -d '{"id": 123, "name": "meme"}' -v http://127.0.0.1:8000/change_name/
curl -X DELETE -H "Content-Type: application/json" -v http://127.0.0.1:8000/delete_user/123/
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/friends?id=123
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/daily?id=123
curl -X GET -H "Content-Type: application/json" -v http://127.0.0.1:8000/get_daily?id=123
### Подключение к БД:  
sqlite3 zaynadb.sqlite3 

### Запуск приложение в режиме разработки
/start_dev_2416256