from django.db import models

from utils.models import BaseModel


class Category(BaseModel):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name


class Product(BaseModel):
    categoty = models.ForeignKey(
        Category, on_delete=models.SET_NULL, blank=True, null=True
    )
    name = models.CharField(max_length=100, unique=True)
    quantity = models.PositiveIntegerField(default=0)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    description = models.TextField()

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    @property
    def total_price(self):
        return self.quantity * self.price
