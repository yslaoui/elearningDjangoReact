# Generated by Django 5.0 on 2024-02-22 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('elearningapp', '0003_remove_student_student_id_remove_teacher_teacher_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='course',
            name='course_id',
        ),
    ]
