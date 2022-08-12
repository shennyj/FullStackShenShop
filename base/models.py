from django.db import models
from django.contrib.auth.models import User
# Create your models here.
#create db

#build database table
#django will use models to create db tables
#models are just classes
#class name is the db table

#tables are db objects
#in tables, data is organized in row and col format

#any attribute in class are db cols
#django already gives us user model to work with

#user connected with product
#produc can have multiple reviews
#product needs a user
#user can write multiple reveiews
#user can build an order
#inside order we have order item
#order item connected to product
#order needs a shipping address table too

#build product model

#create models here
#models.Model turns class into model
#user can have multiple products
#set so whenever user that creates a product gets deleted, product doesnt get deleted
#if null= True, Django will store empty values as NULL in the database. Default is False.
#if blank= True, the field is allowed to be blank. Default is False.

class Product(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True,blank=True,default='/placeholder.png')
    brand = models.CharField(max_length=200, null=True, blank=True)
    category = models.CharField(max_length=200, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    rating = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    numReviews = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    countInStock = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return self.name

#product and user are relationship fields we connect
class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    rating = models.IntegerField(null=True, blank=True, default=0)
    comment = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True,editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return str(self.rating)

class Order(models.Model):
    user = models.ForeignKey(User,on_delete=models.SET_NULL, null=True)
    paymentMethod = models.CharField(max_length=200, null=True, blank=True)
    taxPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    totalPrice = models.DecimalField(max_digits=7, decimal_places=2,null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    isDelivered = models.BooleanField(default=False)
    deliveredAt = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.createdAt)

#foreignkey allows many-to-one relationship
class OrderItem(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    qty = models.IntegerField(null=True, blank=True, default=0)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.name)
#shipping address and order is one-to-one relationship
#shipping address can only have one order
#models.cascade=will delete shipping address if order gets deleted
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE, null=True, blank = True)
    address = models.CharField(max_length=200, null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    postalCode = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    shippingPrice = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    _id = models.AutoField(primary_key=True,editable=False)

    def __str__(self):
        return str(self.address)