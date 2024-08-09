## Настройка окружения:  
cd services/client && npm install && cd ../../  
cd services/node_backend && npm install && cd ../../

cd backend  
pyenv virtualenv zay  
pyenv activate zay  
pip3 install -r requirements.txt
## Выкатка фронта:
make start-dev -- (параметры докера)

<!-- ngrok http 3000 -->
зайти в https://dashboard.ngrok.com/cloud-edge/edges и создать edge  
после этого нажать на start_tunnel и скопировать команду для запуска в командной строке  
ngrok tunnel --label edge=edghts_*** http://localhost:3000  

добавь ссылку из ngrok в .env.local

## Выкатка бэка:
./manage.py migrate  
./manage.py runserver  
### Подключение к БД:  
sudo -u postgres psql  
'NAME': 'zaynadb',  
'USER': 'zayats',  
'PASSWORD': 'volk',  