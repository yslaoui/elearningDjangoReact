# permissions.py
from rest_framework import permissions

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
