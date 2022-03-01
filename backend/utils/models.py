from django.db import models

from users.models import CustomUser


class BaseModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=False)
    created_by = models.ForeignKey(
        CustomUser, on_delete=models.SET_NULL, blank=True, null=True
    )

    class Meta:
        abstract = True
