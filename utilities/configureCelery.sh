# configure celery inside django project $1 and django app $2

dir_path="$1/$2"
# Check if the directory exists
if [ ! -d "$dir_path" ]; then
    echo "Directory $dir_path does not exist."
    exit 1
fi

cat > "./$1/$1/celery.py" <<EOF
from __future__ import absolute_import
import os
import time
from celery import Celery
from django.conf import settings

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'image_store.settings')

app = Celery("$1", broker='redis://localhost/', backend='redis://localhost/')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
EOF

echo "celery.py has been created in ./$1/$1/"

touch $1/$2/tasks.py

# Append the Python code to __init__.py
cat >> "./$1/$1/__init__.py" <<EOF
from .celery import app as celery_app
__all__ = ('celery_app',)
EOF

echo "__init__.py has been updated in $dir_path"