from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, "pages/home.html")


def category(request, slug):
    return render(request, "pages/category.html", {"slug": slug})


def contact(request):
    return render(request, "pages/contact.html")


# Create your views here.
