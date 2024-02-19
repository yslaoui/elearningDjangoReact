#!/bin/bash
# Step 1: startDjangoProjectandApp.sh Create a Django app  
# Step 2 : reactSetup.sh copy react template at the same level as the django project
# step 3: buildrunserver.sh create a build of the react project, copy it into the django project, ann run the dhango project: 


if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <django_project_directory>"
    exit 1
fi

DJANGO_PROJECT_DIR=$1
# Build react app, copy it into django app
cd frontend
npm run build

# Create directory for React build in Django project
# Path is  adjusted to place build folder directly in static/react
cd ..
REACT_BUILD_DIR="$DJANGO_PROJECT_DIR/static/react"
mkdir -p "$REACT_BUILD_DIR"

# Note: The trailing slash in ./frontend/build/ is important
# It copies the contents of the build folder, not the folder itself
rsync -av ./frontend/build/ "$REACT_BUILD_DIR"

# Run a django project called $1 where cd is a ../$1
python3 $1/manage.py runserver 127.0.0.1:8080

