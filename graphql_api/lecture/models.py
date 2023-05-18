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

class Test(models.Model):
    lecture = models.ForeignKey(Lecture,related_name='test_lecture', on_delete=models.CASCADE, blank=True, null=True)
    question = models.CharField(max_length=1000)
    option1 = models.CharField(max_length=1000)
    option2 = models.CharField(max_length=1000)
    option3 = models.CharField(max_length=1000)
    option4 = models.CharField(max_length=1000)
    answer = models.CharField(max_length=1000)

    def __str__(self):
        return self.question

class Score(models.Model):
    lecture = models.ForeignKey(Lecture,related_name='score_lecture', on_delete=models.CASCADE, blank=True, null=True)
    user = models.ForeignKey(get_user_model(),related_name='score_user', on_delete=models.CASCADE, blank=True, null=True)
    score = models.IntegerField()

    def __str__(self):
        return self.user.username