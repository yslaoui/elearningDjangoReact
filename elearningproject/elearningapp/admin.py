from django.contrib import admin
from .models import *

# Register your models here.

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'age', 'university', 'enrollment_date')
    search_fields = ('user__username', 'first_name', 'last_name')

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ('user', 'first_name', 'last_name', 'age', 'university', 'hire_date')
    search_fields = ('user__username', 'first_name', 'last_name')

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date', 'end_date', 'teacher')
    search_fields = ('title', 'teacher__first_name', 'teacher__last_name')


@admin.register(StatusUpdate)
class StatusUpdateAdmin(admin.ModelAdmin):
    list_display = ('content', 'posted_at', 'student')
    search_fields = ('content',)



@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'enrollment_date', 'grade')
    search_fields = ('student__user__username', 'course__title')

@admin.register(Content)
class ContentAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'order', 'content_type')
    search_fields = ('course__title', 'title')

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('course', 'title', 'due_date')
    search_fields = ('course__title', 'title')

@admin.register(Submission)
class SubmissionAdmin(admin.ModelAdmin):
    list_display = ('assignment', 'student', 'submission_date', 'grade')
    search_fields = ('assignment__title', 'student__user__username')
