## Настройка окружения:  
cd services/client && npm install && cd ../../  
cd services/node_backend && npm install && cd ../../

https://github.com/pyenv/pyenv?tab=readme-ov-file#installation  
apt install postgresql  
cd backend  
pyenv virtualenv 3.10.8 zay  
pyenv activate zay  
pip3 install --upgrade pip  
pip3 install -r requirements.txt
## Выкатка фронта:
make start-dev -- (параметры докера)

<!-- ngrok http 3000 -->
зайти в https://dashboard.ngrok.com/cloud-edge/edges и создать edge  
после этого нажать на start_tunnel и скопировать команду для запуска в командной строке  
ngrok tunnel --label edge=edghts_*** http://localhost:3000  

добавь ссылку из ngrok в .env.local

## Выкатка бэка:
cd backend  
./manage.py migrate  
./manage.py runserver  
### Подключение к БД:  
sudo -u postgres psql  
'NAME': 'zaynadb',  
'USER': 'zayats',  
'PASSWORD': 'volk',  