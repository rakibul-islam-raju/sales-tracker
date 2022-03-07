from django.urls import path

from .views import (
    LoginView,
    UserListCreateView,
    UserDetailView,
    passwordChangeView,
    MyTokenObtainPairView,
)

urlpatterns = [
    path("", UserListCreateView.as_view(), name="user_list_create"),
    # path("login/", LoginView.as_view(), name="user_login"),
    path("login/", MyTokenObtainPairView.as_view(), name="user_login"),
    path("<int:pk>/", UserDetailView.as_view(), name="user_details"),
    path("password-change/", passwordChangeView.as_view(), name="user_password_change"),
]
