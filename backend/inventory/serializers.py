from rest_framework import serializers

from users.serializers import UserSerializer

from .models import Category, Product, Customer, Order, OrderItem


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


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    Customer = CustomerSerializer()
    created_by = UserSerializer()
    order_items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = "__all__"
        read_only_fields = ["id"]

    def get_order_items(self, obj):
        items = obj.order_items.all()
        serilizer = OrderItemSerializer(items, many=True)
        return serilizer.data
