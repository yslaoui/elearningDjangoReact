from django.conf import settings
import os

file_path = os.path.join(settings.MEDIA_ROOT, 'course_contents/LAAAAA.pdf')
print(os.path.exists(file_path))