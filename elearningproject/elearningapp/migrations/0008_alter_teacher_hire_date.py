# Generated by Django 5.0 on 2024-02-27 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('elearningapp', '0007_alter_enrollment_enrollment_date_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='teacher',
            name='hire_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]