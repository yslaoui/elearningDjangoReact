from django.urls import path, re_path, include
from django.views.generic import TemplateView
from . import views  # Assuming your views are in the same directory
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'statusupdates', StatusUpdateViewSet, basename='statusupdate')
router.register(r'courses', CourseViewSet)
router.register(r'enrollments', EnrollmentViewSet)
router.register(r'contents', ContentViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'submissions', SubmissionViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/', register_user, name='register_user'),
    path('api/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# I Reintroduce the catch-all route for React so that it does not interfere with the routes above
urlpatterns += [re_path('.*', TemplateView.as_view(template_name='index.html'))]
