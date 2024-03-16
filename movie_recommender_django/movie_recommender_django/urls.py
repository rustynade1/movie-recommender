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
from django.urls import path, include
# from movie_recommender.views import recommend_movie
# from movie_recommender.views import suggest_items
# from movie_recommender.views import AutocompleteView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('movie_recommender.urls')),
    path('', include ('frontend.urls'))
    # path('suggest_movies/', AutocompleteView.as_view(), name='suggest_movies'),
    # path('recommend_movie/', recommend_movie, name='recommend_movie'),
] #+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
