from django.shortcuts import render
from django.http import JsonResponse
import subprocess

# Create your views here.


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
