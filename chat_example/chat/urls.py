from django.urls import path, re_path
from django.views.generic import TemplateView
from . import views  # Assuming your views are in the same directory
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

# Serving static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
