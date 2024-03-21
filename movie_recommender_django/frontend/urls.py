from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search-movies', index),
    path('write-review/<str:title>/', index),
    path('view-recommendations', index),
    path('view-reviews', index)
    # path('join', index),
    # path('create', index),
    # path('join/1', index)
]