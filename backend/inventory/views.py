from datetime import datetime
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics

from inventory.models import Category, Product, Shop, Order, OrderItem

from .serializers import (
    CategorySerializer,
    ProductSerializer,
    ShopSerializer,
    OrderSerializer,
    OrderItemSerializer,
)


class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]


class ProductListCreateView(generics.ListCreateAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]


class ShopListCreateView(generics.ListCreateAPIView):
    serializer_class = ShopSerializer
    queryset = Shop.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ShopDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ShopSerializer
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
