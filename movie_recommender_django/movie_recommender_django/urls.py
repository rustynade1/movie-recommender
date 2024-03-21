"""
URL configuration for movie_recommender_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from movie_recommender.views import recommend_movie
from movie_recommender.views import suggest_items
from movie_recommender.views import past_reviews
from django.conf.urls.static import static
from django.conf import settings
from movie_recommender.views import AutocompleteView
from django.views.generic import RedirectView

urlpatterns = [
    path('suggest_movies/', AutocompleteView.as_view(), name='suggest_movies'),
    path('recommend_movie/', recommend_movie, name='recommend_movie'),
    path('', RedirectView.as_view(url='recommend_movie/'), name='home-redirect'),
    path('past_reviews/', past_reviews, name='past_reviews')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
