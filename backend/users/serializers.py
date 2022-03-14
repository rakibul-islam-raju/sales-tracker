from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import CustomUser


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["email"] = user.email
        token["fullname"] = user.fullname
        token["is_staff"] = user.is_staff
        token["is_superuser"] = user.is_superuser

        return token


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    access = serializers.SerializerMethodField(read_only=True)
    refresh = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "fullname",
            "is_staff",
            "is_superuser",
            "password",
            "access",
            "refresh",
        ]
        read_only_fields = ("fullname", "is_staff", "is_superuser")
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def get_access(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_refresh(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token)


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "fullname",
            "email",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
            "password",
        ]
        read_only_fields = (
            "id",
            "is_active",
            "is_staff",
            "is_superuser",
            "last_login",
        )
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            fullname=validated_data["fullname"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ["password"]


class ChangePasswordSerializer(serializers.Serializer):
    model = CustomUser
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
