from django.contrib.auth.models import User
from django.db import models

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default = 'defaultfirstname')
    last_name = models.CharField(max_length=100, default = 'defaultlastname')
    age = models.PositiveIntegerField(null=True, blank=True)  # Optional
    university = models.CharField(max_length=255, null=True, blank=True)  # Optional
    enrollment_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} "   

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default = 'defaultfirstname')
    last_name = models.CharField(max_length=100, default = 'defaultlastname')
    age = models.PositiveIntegerField(null=True, blank=True)  # Optional
    university = models.CharField(max_length=255, null=True, blank=True)  # Optional
    hire_date = models.DateField()

    def __str__(self):
        return f"{self.first_name} {self.last_name} "   


class StatusUpdate(models.Model):
    content = models.TextField()
    posted_at = models.DateTimeField(auto_now_add=True)
    student = models.ForeignKey('Student', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.content[:50]}..."  # I Display the first 50 characters


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    # Linking course to a teacher

    def __str__(self):
        return self.title   

class Enrollment(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrollment_date = models.DateField()
    grade = models.CharField(max_length=2, blank=True, null=True)
    # Grade is optional and can be left blank

class Content(models.Model):
    course = models.ForeignKey(Course, related_name='contents', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveIntegerField() #the sequence in which content items (such as videos, PDFs, or any other educational materials) should be presented within a course
    content_type = models.CharField(max_length=50)
    file = models.FileField(upload_to='course_contents/', blank=True, null=True)
    # File can be a video or a PDF, determined by content_type

class Assignment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()

# Submission Model
class Submission(models.Model):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    submission_file = models.FileField(upload_to='submissions/')
    submission_date = models.DateField(auto_now_add=True)
    grade = models.CharField(max_length=2, blank=True, null=True)
    # Grade is optional and can be left blank
