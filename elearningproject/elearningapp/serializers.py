from rest_framework import serializers, status
from .models import Student, Teacher, StatusUpdate, Course, Enrollment, Content, Assignment, Submission
from datetime import date
from rest_framework.response import Response

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['id', 'first_name', 'last_name', 'university']

class StatusUpdateSerializer(serializers.ModelSerializer):
    student = StudentSerializer(read_only=True)

    class Meta:
        model = StatusUpdate
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()  # Use TeacherSerializer for the teacher field

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'teacher']

class EnrollmentSerializer(serializers.ModelSerializer):
    student_detail = StudentSerializer(source='student', read_only=True)
    course_detail = CourseSerializer(source='course', read_only=True)
    enrollment_date = serializers.DateField(default=date.today, required=False)
    # Define student and course fields to explicitly include them in the serialized representation
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Enrollment
        # Explicitly list all fields you want to include in your API response
        fields = ['id', 'student', 'course', 'enrollment_date', 'grade', 'student_detail', 'course_detail']


class ContentSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)

    class Meta:
        model = Content
        fields = '__all__'

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class SubmissionSerializer(serializers.ModelSerializer):
    assignment = AssignmentSerializer(read_only=True)
    student = StudentSerializer(read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'
