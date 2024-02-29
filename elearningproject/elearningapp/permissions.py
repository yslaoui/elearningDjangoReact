# permissions.py
from rest_framework import permissions
from .models import *
from django.shortcuts import get_object_or_404

class IsTeacher(permissions.BasePermission):
    """
    Custom permission to only allow teachers to create or modify courses/content.
    """

    def has_permission(self, request, view):
        return request.user.groups.filter(name='Teachers').exists()

class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students certain access.
    """

    def has_permission(self, request, view):
        return request.user.groups.filter(name='Students').exists()


class IsEnrolled(permissions.BasePermission):
    """
    Allows access only to students who are enrolled in the course.
    """
    def has_permission(self, request, view):
        user = request.user
        course_id = view.kwargs.get('pk')

        if not user.is_authenticated:
            return False

        try:
            student = Student.objects.get(user=user)
        except Student.DoesNotExist:
            return False  # User is not a student

        return Enrollment.objects.filter(student=student, course_id=course_id).exists()
    
class IsEnrolledOrIsTeacher(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user.is_authenticated:
            course = obj.course
            if hasattr(request.user, 'teacher'):
                # Assuming a direct relationship or a flag that identifies a user as a teacher
                return True
            elif hasattr(request.user, 'student'):
                enrolled = Enrollment.objects.filter(student=request.user.student, course=course).exists()
                return enrolled
        return False