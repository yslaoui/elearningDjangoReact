#!/bin/bash

# Check if an argument is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <django_app_name>"
    exit 1
fi

# Assign the first argument to a variable
DJANGO_APP_NAME=$1

# Run the Celery worker
cd $1
celery --app=${DJANGO_APP_NAME}.celery:app worker --loglevel=INFO --pidfile=celery.pid
