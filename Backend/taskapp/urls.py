from django.urls import path
from . import views

urlpatterns = [
    path('list/user/workspace', views.UserWorkSpace.as_view()),
    path('switch/workspace', views.SwitchWorkspace.as_view()),
    path('create/workspace', views.CreateWorkSpace.as_view()),
    path('create/task', views.CreateTaskView.as_view()),
    path('list/task', views.ListTaskView.as_view()),
    path('online/team/members', views.OnlineTeamMembersView.as_view()),
    path('task/due/today', views.TodaysDueTaskView.as_view()),
    path('task/status', views.StatusOfTasks.as_view()),
    path('team/memebers', views.TeamMembers.as_view()),
    path('list/project', views.ListProjectView.as_view()),
    path('create/project', views.CreateProjectView.as_view()),
    path('project/<int:pk>', views.DetailProjectView.as_view()),
    path('complete/task/<int:pk>', views.CompleteTaskView.as_view()),
    path('response/invitation/<int:pk>', views.ResponseToInvitationView.as_view()),
    path('send/invitation', views.SendInvitationView.as_view()),
    path('user/invitations', views.UserInvitationView.as_view()),
    path('user/notifications', views.NotificationView.as_view()),
    path('user/unread/notifications', views.UnReadNotificationView.as_view()),
    path('markasread/notifications/<int:pk>', views.MarkAsReadView.as_view()),
    path('markallasread/notifications', views.MarkAllAsReadView.as_view()),
]