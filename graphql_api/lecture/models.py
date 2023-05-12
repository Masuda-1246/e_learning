from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class Lecture(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    lecture_image_url = models.CharField(max_length=1000)
    lecture_video_element = models.TextField()
    author = models.CharField(max_length=100)

    def __str__(self):
        return self.title

class Register(models.Model):
    lecture = models.ForeignKey(Lecture,related_name='lecture', on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(get_user_model(),related_name='register_user', on_delete=models.CASCADE, blank=True, null=True)
    is_completed = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username