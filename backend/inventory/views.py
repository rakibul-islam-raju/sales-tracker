import json
from datetime import datetime, timedelta
from rest_framework.permissions import (
    AllowAny,
    IsAdminUser,
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
)
from rest_framework import generics
from rest_framework import filters
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend

from inventory.models import Category, Product, Customer, Sale, SaleItem

from .serializers import (
    CategorySerializer,
    CategoryCreateSerializer,
    ProductSerializer,
    ProductCreateSerializer,
    CustomerSerializer,
    SaleSerializer,
    SaleItemSerializer,
    SaleCreateSerializer,
    SaleReportSerializer,
)


class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter,
    ]
    search_fields = ["name"]
    filterset_fields = ["is_active"]

    def get_serializer_class(self):
        if self.request.method == "GET":
            return CategorySerializer
        else:
            return CategoryCreateSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]


class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
    filter_backends = [
        filters.SearchFilter,
        filters.OrderingFilter,
        DjangoFilterBackend,
    ]
    filterset_fields = ["category", "is_active"]
    search_fields = ["name", "category__name"]
    ordering_fields = ["price", "quantity"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer_class(self):
        if self.request.method == "GET":
            return ProductSerializer
        else:
            return ProductCreateSerializer


class ProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer


class CustomerListCreateView(generics.ListCreateAPIView):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    search_fields = ["name", "phone", "email"]
    filterset_fields = ["phone", "is_active"]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CustomerSerializer
    queryset = Customer.objects.filter(is_active=True)
    permission_classes = [IsAuthenticated]


class SalesView(generics.ListCreateAPIView):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()
    permission_classes = [IsAuthenticated]
    filter_backends = [filters.SearchFilter]
    search_fields = ["customer__name", "customer__phone", "customer__email"]

    def post(self, request, *args, **kwargs):
        sale_items = request.data.get("sale_items")
        customer_id = request.data.get("customer_id")
        customer = request.data.get("customer")

        # validate
        new_customer = None
        if customer:
            customer_serializer = CustomerSerializer(data=customer)
            customer_serializer.is_valid(raise_exception=True)
            new_customer = customer_serializer.save(commit=False)
        elif customer_id:
            customer = Customer.objects.filter(id=customer_id).first()
            if not customer:
                return Response(
                    {"detail": "Customer not found!"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"customer": "Customer Required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if sale_items and len(sale_items) == 0:
            return Response(
                {"detail": "No Order Items!"}, status=status.HTTP_400_BAD_REQUEST
            )
        else:
            if new_customer:
                customer = new_customer.save()
            else:
                customer = customer
            # validate sale
            sale_serializer = SaleCreateSerializer(
                data={
                    "created_by": request.user.pk,
                    "customer": customer.pk,
                }
            )
            sale_serializer.is_valid(raise_exception=True)
            sale = sale_serializer.save()

            # validate sale items
            items = []
            for i in sale_items:
                validate_item = {**i, "sale": sale.pk}
                items.append(validate_item)

            sale_item_serializer = SaleItemSerializer(data=items, many=True)
            sale_item_serializer.is_valid(raise_exception=True)
            sale_item_serializer.save()

            data = self.serializer_class(sale, many=False)

            return Response(data.data)


class SaleDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SaleSerializer
    queryset = Sale.objects.all()
    permission_classes = [IsAuthenticated]


class SalesReportView(APIView):
    def get_queryset(self):
        return Sale.objects.filter(created_at__gte=datetime.now() - timedelta(days=7))

    def get(self, request, format=None):
        sales = SaleItem.objects.filter(
            created_at__gte=datetime.now() - timedelta(days=7)
        )
        data = {}
        for i in sales:
            if not data.get(str(i.created_at.date())):
                data[str(i.created_at.date())] = i.price
            else:
                data[str(i.created_at.date())] = (
                    data[str(i.created_at.date())] + i.price
                )

        return Response([data])
