# Generated by Django 4.0.2 on 2022-03-11 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0008_alter_customer_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='phone',
            field=models.PositiveBigIntegerField(unique=True),
        ),
    ]