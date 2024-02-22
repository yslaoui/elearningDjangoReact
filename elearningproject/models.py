from django.db import models
from django.contrib.auth.models import User


#User
class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    organization = models.CharField(max_length=256, null=True, blank=True)
    
    def __str__(self):
        return self.user.username