from rest_framework import serializers

from users.serializers import UserSerializer

from .models import Category, Product, Customer, Sale, SaleItem


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["id"]


class CategoryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ["id"]

    def validate_name(self, value):
        # check if category already exists with this name
        review_instance = Category.objects.filter(
            name__icontains=value,
        ).exists()
        if review_instance:
            raise serializers.ValidationError("Category already exists.")

        return value


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["id"]


class ProductCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["id"]

    def validate_name(self, value):
        # check if product already exists with this name
        review_instance = Product.objects.filter(
            name__icontains=value,
        ).exists()
        if review_instance:
            raise serializers.ValidationError("Product already exists.")

        return value


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = "__all__"
        read_only_fields = ["id"]


class SaleItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SaleItem
        fields = "__all__"


class SaleCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = "__all__"


class SaleSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()
    created_by = UserSerializer()
    sale_items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Sale
        fields = "__all__"
        read_only_fields = ["id"]

    def get_sale_items(self, obj):
        items = obj.sale_items.all()
        serilizer = SaleItemSerializer(items, many=True)
        return serilizer.data


class SaleReportSerializer(serializers.ModelSerializer):
    sale_items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Sale
        fields = "__all__"
        read_only_fields = ["id"]

    def get_sale_items(self, obj):
        items = obj.sale_items.all()
        serilizer = SaleItemSerializer(items, many=True)
        return serilizer.data
