from django.conf import settings
from django.db import models

STATUS_CHOICES = (
    ("published", "Published"),
    ("draft", "Draft"),
)

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, null=False, unique=True)


class Post(models.Model):
    name = models.CharField(max_length=255)
    description = models.CharField(max_length=250)
    image = models.ImageField(upload_to="posts/%Y/%m/%d/", blank=False)
    slug = models.SlugField(max_length=255, null=False, unique=True)
    content = models.TextField()
    status = models.CharField(
        max_length=60, choices=STATUS_CHOICES, default="published"
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
    )
    category = models.ForeignKey(
        "Category",
        on_delete=models.CASCADE,
    )
    views = models.BigIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    published_on = models.DateTimeField(auto_now_add=True)
    updated_time = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
