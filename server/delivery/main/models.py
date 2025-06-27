from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
import uuid
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError(_('The Email field must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    STATUS_CHOICES = [
        ("online", "Online"),
        ("offline", "Offline"),
        ("delivering", "Delivering"),
    ]
    first_name = models.CharField(max_length=40, blank=True, null=True)
    last_name = models.CharField(max_length=40, blank=True, null=True)
    email = models.EmailField(_('email address'), unique=True)
    phone = models.CharField(max_length=15, blank=True, null=True, unique=True)
    dob = models.DateField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    postal_code = models.CharField(max_length=12, blank=True, null=True)
    country = models.CharField(max_length=30, blank=True, null=True, default="United Kingdom")
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_verified = models.BooleanField(default=False)
    rating = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="offline")
    total_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_deliveries = models.IntegerField(default=0)
    acceptance_rate = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    objects = CustomUserManager()

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

class Order(models.Model):
    ORDER_STATUS = [
        ("pending", "Pending"),
        ("searching_rider", "Searching for Rider"),
        ("rider_accepted", "Rider Accepted"),
        ("rider_arrived", "Rider Arrived at Restaurant"),
        ("picked_up", "Picked Up"),
        ("in_progress", "In Progress"),
        ("arriving", "Arriving"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
    ]
    PAYMENT_STATUS = [
        ("pending", "Pending"),
        ("completed", "Completed"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    ]
    buyer = models.IntegerField(null=True)  # ID from main app
    buyer_phone = models.CharField(max_length=15, blank=True, null=True)  # Phone from main app
    buyer_name = models.CharField(max_length=100, blank=True, null=True)  # Name from main app
    rider = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='orders_as_rider')
    order_id = models.CharField(max_length=20, unique=True, default=uuid.uuid4)
    main_app_order_id = models.CharField(max_length=50, unique=True)  # Order ID from main app
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True)
    picked_up_time = models.DateTimeField(blank=True, null=True)
    delivery_time = models.DateTimeField(blank=True, null=True)
    estimated_delivery_time = models.DateTimeField(blank=True, null=True)
    instruction = models.TextField(blank=True, null=True)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    delivery_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    service_fee = models.DecimalField(max_digits=6, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS, default="pending")
    distance = models.DecimalField(max_digits=10, decimal_places=2, default=0)  # in kilometers
    estimated_preparation_time = models.IntegerField(default=0)  # in minutes
    is_priority = models.BooleanField(default=False)
    restaurant_name = models.CharField(max_length=100)  # Name from main app
    restaurant_phone = models.CharField(max_length=15, blank=True, null=True)  # Phone from main app
    restaurant_id = models.IntegerField()  # ID from main app

    def __str__(self):
        return f"Order {self.order_id} - {self.status}"

class DeliverySession(models.Model):
    rider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='delivery_sessions')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    total_earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_deliveries = models.IntegerField(default=0)
    total_distance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Session for {self.rider.email} on {self.start_time.date()}"

class Earnings(models.Model):
    EARNING_TYPE = [
        ("delivery_fee", "Delivery Fee"),
        ("tip", "Tip"),
        ("bonus", "Bonus"),
        ("incentive", "Incentive"),
    ]
    rider = models.ForeignKey(User, on_delete=models.CASCADE, related_name='earnings')
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True, related_name='earnings')
    session = models.ForeignKey(DeliverySession, on_delete=models.CASCADE, related_name='session_earnings')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    earning_type = models.CharField(max_length=20, choices=EARNING_TYPE)
    created_at = models.DateTimeField(auto_now_add=True)
    description = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"{self.rider.email} - {self.amount} - {self.earning_type}"
    

class Transaction(models.Model):
    TRANSACTION_TYPE = [
        ("refund", "Refund"),
        ("withdrawal", "Withdrawal"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='transactions')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE)
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    
class Wallet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wallet')
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_updated = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):  
        return f"{self.user.email} - {self.balance}"
    

class Rating(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='ratings')
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Rating for {self.to_user.email} - {self.rating}"

class Vehicle(models.Model):
    VEHICLE_TYPE_CHOICES = [
        ("car", "Car"),
        ("motorcycle", "Motorcycle"),
        ("bicycle", "Bicycle"),
        ("scooter", "Scooter"),
    ]
    VEHICLE_STATUS = [
        ("active", "Active"),
        ("maintenance", "Maintenance"),
        ("inactive", "Inactive"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_vehicles")
    vehicle_type = models.CharField(max_length=20, choices=VEHICLE_TYPE_CHOICES)
    registration_number = models.CharField(max_length=20, blank=True, null=True)
    make = models.CharField(max_length=50)
    model = models.CharField(max_length=50)
    year = models.IntegerField()
    color = models.CharField(max_length=20)
    insurance_number = models.CharField(max_length=50, blank=True, null=True)
    insurance_expiry = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=VEHICLE_STATUS, default="active")
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.email} - {self.vehicle_type} - {self.registration_number}"

class Notification(models.Model):
    NOTIFICATION_TYPE = [
        ("new_order", "New Order"),
        ("order_update", "Order Update"),
        ("payment", "Payment"),
        ("system", "System"),
        ("promotion", "Promotion"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=255)
    message = models.TextField()
    notification_type = models.CharField(max_length=20, choices=NOTIFICATION_TYPE)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    data = models.JSONField(null=True, blank=True)  # For additional data like order_id, etc.

    def __str__(self):
        return f"{self.user.email} - {self.title}"
    

class PickupLocation(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_pickup_locations")
    address = models.TextField(blank=True, null=True, default=None)
    city = models.CharField(max_length=20, blank=True, null=True, default=None)
    postal_code = models.CharField(max_length=20, blank=True, null=True, default=None)
    country = models.CharField(max_length=20, blank=True, null=True, default=None)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, default=None)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, default=None)

    def __str__(self):
        return f"{self.order.order_id} - {self.address} - {self.city} - {self.postal_code} - {self.country} - {self.latitude} - {self.longitude}"
    

class DeliveryLocation(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_delivery_locations")
    address = models.TextField(blank=True, null=True, default=None)
    city = models.CharField(max_length=20, blank=True, null=True, default=None)
    postal_code = models.CharField(max_length=20, blank=True, null=True, default=None)
    country = models.CharField(max_length=20, blank=True, null=True, default=None)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, default=None)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True, default=None)#

    def __str__(self):
        return f"{self.order.order_id} - {self.address} - {self.city} - {self.postal_code} - {self.country} - {self.latitude} - {self.longitude}"
    


class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name="order_items")
    item_name = models.CharField(max_length=100)  # Increased length
    quantity = models.IntegerField(default=1)
    main_app_item_id = models.IntegerField()  # ID from main app
    special_instructions = models.TextField(blank=True, null=True)
    is_temperature_sensitive = models.BooleanField(default=False)
    requires_separate_bag = models.BooleanField(default=False)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.order.order_id} - {self.item_name} - {self.quantity}"
    
    
class Device(models.Model):
    DEVICE_TYPE_CHOICES = [
        ("android", "Android"),
        ("ios", "iOS"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_devices")
    device_id = models.CharField(max_length=20, blank=True, null=True)
    device_type = models.CharField(max_length=20, choices=DEVICE_TYPE_CHOICES)
    device_token = models.CharField(max_length=20, blank=True, null=True)
    device_model = models.CharField(max_length=20, blank=True, null=True)
    is_current = models.BooleanField(default=False)
    last_login = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.device_id} - {self.device_type} - {self.is_current}"
    

    

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_addresses")
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=20, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=20, blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    def __str__(self):
        return f"{self.address}, {self.city}, {self.postal_code}, {self.country}"
    

class BankAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_bank_accounts")
    bank_name = models.CharField(max_length=20, blank=True, null=True)
    account_number = models.CharField(max_length=20, blank=True, null=True)
    account_name = models.CharField(max_length=20, blank=True, null=True)
    account_type = models.CharField(max_length=20, blank=True, null=True)
    iban = models.CharField(max_length=20, blank=True, null=True)
    bic = models.CharField(max_length=20, blank=True, null=True)
    swift_code = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.bank_name}, {self.account_number}, {self.account_name}, {self.account_type}, {self.account_holder_name}, {self.iban}, {self.bic}, {self.swift_code}"


# Create your models here.

class Issue(models.Model):
    ISSUE_STATUS = [
        ("open", "Open"),
        ("in_progress", "In Progress"),
        ("resolved", "Resolved"),
        ("closed", "Closed"),
    ]
    ISSUE_TYPE = [
        ("delivery_delay", "Delivery Delay"),
        ("wrong_item", "Wrong Item"),
        ("damaged_item", "Damaged Item"),
        ("rider_behavior", "Rider Behavior"),
        ("technical", "Technical"),
        ("other", "Other"),
    ]
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='issues')
    reported_by = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reported_issues')
    issue_type = models.CharField(max_length=20, choices=ISSUE_TYPE)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=ISSUE_STATUS, default="open")
    created_at = models.DateTimeField(auto_now_add=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    resolution_notes = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"Issue {self.id} - {self.issue_type} - {self.status}"
