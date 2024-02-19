python3 $1/manage.py loaddata helloworld/initial.json
python3 $1/manage.py makemigrations
python3 $1/manage.py migrate
