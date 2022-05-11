from django.db import models

from rest_framework.exceptions import ValidationError

from utils.models import BaseModel
from users.models import CustomUser


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(BaseModel):
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True
    )
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=10, unique=True, null=True)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    @property
    def total_price(self):
        return self.quantity * self.price


class Customer(BaseModel):
    created_by = models.ForeignKey(
        CustomUser, null=True, related_name="customers", on_delete=models.SET_NULL
    )
    name = models.CharField(max_length=50)
    phone = models.CharField(max_length=11, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name


class Sale(models.Model):
    created_by = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(
        Customer, related_name="sales", null=True, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.customer.name


class SaleItem(models.Model):
    sale = models.ForeignKey(Sale, related_name="sale_items", on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product,
        related_name="sale_items",
        null=True,
        on_delete=models.SET_NULL,
    )
    product_name = models.CharField(max_length=255, null=True)
    product_code = models.CharField(max_length=20, null=True)
    quantity = models.PositiveIntegerField()
    price = models.FloatField(null=True)
    created_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if self.product.quantity < self.quantity:
            raise ValidationError(
                f'Item with code "{self.product.code}" does not have enough quantity'
            )

        self.product_name = self.product.name
        self.product_code = self.product.code

        self.product.quantity = self.product.quantity - self.quantity
        self.product.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.product_code} - {self.quantity}"
