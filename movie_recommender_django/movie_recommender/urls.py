from django.urls import path
from .views import AutocompleteView, RecommendMovieView

urlpatterns = [
    path('recommend-movie', RecommendMovieView.as_view()),
]