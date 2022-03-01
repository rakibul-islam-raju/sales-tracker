from django.urls import path

from .views import (
    CategoryListCreateView,
    CategoryDetailView,
    ProductListCreateView,
    ProductDetailView,
)

urlpatterns = [
    path("categories/", CategoryListCreateView.as_view(), name="category_list_create"),
    path("categories/<int:pk>/", CategoryDetailView.as_view(), name="category_details"),
    path("products/", ProductListCreateView.as_view(), name="product_list_create"),
    path("products/<int:pk>/", ProductDetailView.as_view(), name="product_details"),
]
