from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_online = models.BooleanField(default=False,blank=True)

    

    def __str__(self) -> str:
        return self.username
# Create your models here.
