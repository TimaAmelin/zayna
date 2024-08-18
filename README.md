## Настройка окружения:  
cd services/client && npm install && cd ../../  
cd services/node_backend && npm install && cd ../../

## Выкатка фронта:
make start-dev -- (параметры докера)

<!-- ngrok http 3000 -->
зайти в https://dashboard.ngrok.com/cloud-edge/edges и создать edge  
после этого нажать на start_tunnel и скопировать команду для запуска в командной строке  
ngrok tunnel --label edge=edghts_*** http://localhost:3000  

добавь ссылку из ngrok в .env.local

## Выкатка бэка:
cd backend  
docker build -t zayna-backend .  
docker run --name backend -p 8000:8000 zayna-backend  

### Подключение к БД:  
sqlite3 zaynadb.sqlite3 

### Запуск приложение в режиме разработки
/start_dev_2416256