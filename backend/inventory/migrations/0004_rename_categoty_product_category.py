# Generated by Django 4.0.2 on 2022-03-04 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0003_shop_is_active_alter_product_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='product',
            old_name='categoty',
            new_name='category',
        ),
    ]
