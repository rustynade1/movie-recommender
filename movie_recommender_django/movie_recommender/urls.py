from django.urls import path
from .views import AutocompleteView, RecommendMovieView
from . import views

urlpatterns = [
    #path('recommend-movie', RecommendMovieView.as_view()),
    path('recommend-movie', RecommendMovieView.as_view(), name='recommend_movie'),
]
