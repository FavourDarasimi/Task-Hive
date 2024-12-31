from django.contrib import admin
from .models import Task,Team,Project,Invitation,Notification

admin.site.register(Task)
admin.site.register(Team)
admin.site.register(Project)
admin.site.register(Invitation)
admin.site.register(Notification)


# Register your models here.
