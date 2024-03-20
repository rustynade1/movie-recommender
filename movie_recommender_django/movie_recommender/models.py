from django.db import models

# Create your models here.

class Movie(models.Model):
    names = models.CharField(max_length=100)

    class Meta:
        app_label = 'movie_recommender'

class MovieReview(models.Model):
    title = models.CharField(max_length=100)
    userInput = models.TextField()