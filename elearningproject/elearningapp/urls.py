from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views  # Assuming your views are in the same directory
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import *

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'statusupdates', StatusUpdateViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'contents', ContentViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'submissions', SubmissionViewSet)


urlpatterns = [
    path('api/', include(router.urls)),  # Prefix all DRF URLs with 'api/'    re_path('.*', TemplateView.as_view(template_name='index.html')),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

# Serving static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
