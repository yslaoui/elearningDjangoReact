#!/bin/bash
# Creates a django project $1 and, inside it, a django app $2

# Step 1: startDjangoProjectandApp.sh Create a Django app  
# Step 2 : reactSetup.sh copy react template at the same level as the django project
# step 3: buildrunserver.sh create a build of the react project, copy it into the django project, ann run the dhango project: 



django-admin startproject $1
cd $1
python3 manage.py startapp $2
cd ..
mkdir -p $1/$2/templates/$2
touch $1/$2/templates/$1/index.html
touch $1/$2/api.py
touch $1/$2/serializers.py
touch $1/$2/urls.py

