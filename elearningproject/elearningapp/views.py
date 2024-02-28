from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.shortcuts import render
from rest_framework import viewsets, status, permissions
from .models import *
from .serializers import *
from django.utils import timezone
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
import logging
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from rest_framework.permissions import IsAuthenticated
from .permissions import IsTeacher, IsStudent
from rest_framework.decorators import api_view, permission_classes


logger = logging.getLogger(__name__)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_roles(request):
    # Here I assume a user can have multiple groups
    roles = request.user.groups.all().values_list('name', flat=True)
    print("the roles are ...")
    print(roles)
    return Response({"roles": list(roles)})
    


@api_view(['POST'])
def register_user(request):
    print("Request data:", request.data)
    username = request.data.get('username')
    password = request.data.get('password')
    first_name = request.data.get('first_name')
    last_name = request.data.get('last_name')
    age = request.data.get('age')
    university = request.data.get('university')


    if User.objects.filter(username=username).exists():
        return Response({"message": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.first_name = first_name
    user.last_name = last_name
    user.save()

    # I create a student/teacher instance depending on the role
    role = request.data.get('role')
    if role == 'Students':
        Student.objects.create(user=user, 
                               first_name=first_name, 
                               last_name=last_name,
                               age=age,
                               university=university
                               )
    elif role == 'Teachers':
        Teacher.objects.create(user=user, 
                               first_name=first_name, 
                               last_name=last_name,
                               age=age,
                               university=university
                               )    
    # I Assign user to group based on selected role
    
    if role in ['Students', 'Teachers']:  # Safety check
        group, created = Group.objects.get_or_create(name=role)
        user.groups.add(group)
    else:
        return Response({"message": "Invalid role specified"}, status=status.HTTP_400_BAD_REQUEST)

    # I Automatically log in the user
    login(request, user)
    return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

# login view
@api_view(['POST'])
def login_request(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({"message": "Authentication successful"}, status=status.HTTP_200_OK)
    else:
        return Response({"message": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
    

# endpoints that tells the front end which user is logged in
@api_view(['GET'])
@login_required
def get_logged_in_student_info(request):
    try:
        student = Student.objects.get(user=request.user)
        serializer = StudentSerializer(student)
        return Response(serializer.data)
    except Student.DoesNotExist:
        return Response({"message": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

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
    """
    A viewset that returns status updates for the currently authenticated user.
    """
    serializer_class = StatusUpdateSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        """
        This view should return a list of all status updates
        for the currently authenticated user.
        """
        user = self.request.user
        return StatusUpdate.objects.filter(student__user=user)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    # only teachers can create, update, and delete courses
    def get_permissions(self):
        if self.action in ['create', 'update', 'patch', 'destroy']:
            permission_classes = [IsTeacher]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]


class EnrollmentViewSet(viewsets.ModelViewSet):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

    def get_queryset(self):
        """
        Optionally filters based on the logged in user
        """
        queryset = super().get_queryset()
        user = self.request.user
        if not user.is_anonymous:
            student = Student.objects.filter(user=user).first()
            if student:
                queryset = queryset.filter(student=student)
        return queryset

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

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        if self.action == 'create':
            permission_classes = [IsTeacher]
        else:
            permission_classes = [permissions.IsAuthenticatedOrReadOnly]
        return [permission() for permission in permission_classes]

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


