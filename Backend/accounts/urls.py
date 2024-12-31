from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from . import views

urlpatterns = [
    path('api/token',views.CustomTokenObtainPairView.as_view()),
    path('api/refresh/token',TokenRefreshView.as_view()),
    path('signup',views.SignUpView.as_view()),
    path('logout',views.LogoutView.as_view()),
    path('is_authenticated',views.UserIsAutheticated.as_view()),
    
]