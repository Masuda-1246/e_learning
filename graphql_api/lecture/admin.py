from django.contrib import admin
from .models import Lecture, Register, Test, Score

# Register your models here.
admin.site.register(Lecture)
admin.site.register(Register)
admin.site.register(Test)
admin.site.register(Score)