from django.db import models

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
    phone = models.PositiveBigIntegerField(unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.name


class Order(models.Model):
    created_by = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL)
    customer = models.ForeignKey(
        Customer, related_name="orders", null=True, on_delete=models.SET_NULL
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.customer.name


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="order_items", on_delete=models.CASCADE
    )
    item = models.ForeignKey(
        Product,
        related_name="order_items",
        null=True,
        on_delete=models.SET_NULL,
    )
    item_name = models.CharField(max_length=255, null=True)
    item_code = models.CharField(max_length=20, null=True)
    quantity = models.PositiveIntegerField()
    amount = models.FloatField(null=True)

    def save(self, *args, **kwargs):
        if self.item.quantity < self.quantity:
            raise Exception(
                f"item with code {self.item.code} does not have enough quantity"
            )

        self.item_name = self.item.name
        self.item_code = self.item.code

        self.amount = self.quantity * self.item.price
        self.item.quantity = self.item.quantity - self.quantity
        self.item.save()

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.item_code} - {self.quantity}"
