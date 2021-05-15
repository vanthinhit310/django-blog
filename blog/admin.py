from django.contrib import admin
from .models import Category, Post

# Register your models here.
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
    )
    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "is_featured",
        "views",
        "published_on",
        "status",
        "category_id",
        "slug",
    )
    prepopulated_fields = {
        "slug": ("name",),
    }
