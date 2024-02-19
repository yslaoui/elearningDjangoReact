#!/bin/bash

# Step 1: startDjangoProjectandApp.sh Create a Django app  
# Step 2 : reactSetup.sh copy react template at the same level as the django project
# step 3: buildrunserver.sh create a build of the react project, copy it into the django project, ann run the dhango project: 

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <django_project_directory>"
    exit 1
fi

DJANGO_PROJECT_DIR=$1


# copy react template and install react 
if [ -d "frontend" ]; then
    rm -r frontend
fi
rsync -av ../frontend .
cd frontend
npm install

