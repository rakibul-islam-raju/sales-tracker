from datetime import datetime
from django.contrib.auth import authenticate
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import CustomUser
from .serializers import (
    MyTokenObtainPairSerializer,
    UserCreateSerializer,
    LoginSerializer,
    UserSerializer,
    ChangePasswordSerializer,
)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class LoginView(APIView):
    serializer_class = LoginSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data.get("email"),
            password=serializer.validated_data.get("password", None),
        )

        if not user:
            return Response(
                ("Invalid email or password"),
                status=status.HTTP_400_BAD_REQUEST,
            )

        # last login
        user.last_login = datetime.now()
        user.save()

        return Response({"detail": self.serializer_class(user).data})


class UserListCreateView(generics.ListCreateAPIView):
    serializer_class = UserCreateSerializer
    queryset = CustomUser.objects.all()
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = ["is_active", "is_staff", "is_superuser"]
    search_fields = ["fullname", "=email"]

    def get_permissions(self):
        if self.request.method == "POST":
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAdminUser]

        return super(UserListCreateView, self).get_permissions()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [IsAdminUser]


class passwordChangeView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChangePasswordSerializer
    queryset = CustomUser.objects.filter(is_active=True)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()

            return Response(
                {"detail": LoginSerializer(self.get_object()).data},
                status=status.HTTP_200_OK,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
