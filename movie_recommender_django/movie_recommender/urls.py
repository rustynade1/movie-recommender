from django.urls import path
from .views import AutocompleteView

urlpatterns = [
    path('room', AutocompleteView.as_view()),
]