from django.urls import path

from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ProductListCreateView,
    ProductDetailView,
    CustomerListCreateView,
    CustomerDetailView,
    SalesView,
    SaleDetailView,
    SalesReportView,
)

urlpatterns = [
    path("categories/", CategoryListCreateView.as_view(), name="category_list_create"),
    path("categories/<int:pk>/", CategoryDetailView.as_view(), name="category_details"),
    path("products/", ProductListCreateView.as_view(), name="product_list_create"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product_details"),
    path("customers/", CustomerListCreateView.as_view(), name="customer_list_create"),
    path("customers/<int:pk>/", CustomerDetailView.as_view(), name="customer_details"),
    path("sales/", SalesView.as_view(), name="sales_list_create"),
    path("sales/<int:pk>/", SaleDetailView.as_view(), name="sales_details"),
    path("sales/last-week/", SalesReportView.as_view(), name="last_week_sales"),
]
