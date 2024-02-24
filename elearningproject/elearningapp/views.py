from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import viewsets, status
from .models import *
from .serializers import *
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import logging
from django.db import IntegrityError

logger = logging.getLogger(__name__)


def index(request):
   return render(request, 'elearningapp/index.html' ) # this is the index.html as specified in settings.py templates[0].DIRS

def room(request, room_name):
   return render(request, 'elearningapp/room.html', {'room_name': room_name })

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer

class StatusUpdateViewSet(viewsets.ModelViewSet):
    queryset = StatusUpdate.objects.all()
    serializer_class = StatusUpdateSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def create(self, request, *args, **kwargs):
        student_id = request.data.get('student')
        course_id = request.data.get('course')

        try:
            student = Student.objects.get(pk=student_id)
            course = Course.objects.get(pk=course_id)

            if Enrollment.objects.filter(student=student, course=course).exists():
                return Response({'message': 'Student already enrolled.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                # Attempt to create the Enrollment
                Enrollment.objects.create(student=student, course=course, enrollment_date=timezone.now())
                logger.info("Enrollment created successfully.")
                
                try:
                    # Attempt to create the StatusUpdate
                    StatusUpdate.objects.create(
                        content=f"{student.first_name} {student.last_name} enrolled in {course.title}",
                        posted_at=timezone.now(),
                        student=student
                    )
                    logger.info("StatusUpdate created successfully.")
                except Exception as e:
                    logger.error(f"Failed to create StatusUpdate: {e}")
                
                return Response({'message': 'Enrollment successful.'}, status=status.HTTP_201_CREATED)
            except IntegrityError as e:
                logger.error("Failed to create enrollment due to IntegrityError.")
                return Response({'message': 'Failed to create enrollment due to a database integrity error.'}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                logger.error("Failed to create enrollment due to an unexpected error.")
                return Response({'message': 'Failed to create enrollment due to an unexpected error.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
         
        except Student.DoesNotExist:
            logger.error("Student not found.")
            return Response({'message': 'Student not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Course.DoesNotExist:
            logger.error("Course not found.")
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
        

class ContentViewSet(viewsets.ModelViewSet):
    queryset = Content.objects.all()
    serializer_class = ContentSerializer

    def create(self, request, *args, **kwargs):
        logger.debug(request.data)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        else:
            logger.error(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_queryset(self):
            """
            Optionally filters the returned contents by course.
            """
            queryset = self.queryset
            course_id = self.request.query_params.get('course', None)
            if course_id is not None:
                queryset = queryset.filter(course__id=course_id)
            return queryset


class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class SubmissionViewSet(viewsets.ModelViewSet):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer


