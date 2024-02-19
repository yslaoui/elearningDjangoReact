if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <django_project_directory>"
    exit 1
fi

DJANGO_PROJECT_DIR=$1

cd ${DJANGO_PROJECT_DIR}

uvicorn ${DJANGO_PROJECT_DIR}.asgi:application

