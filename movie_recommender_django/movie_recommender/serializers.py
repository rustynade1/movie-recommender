from rest_framework import serializers
from .models import MovieReview


class RecommendMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieReview
        fields = ('movieTitle', 'movieReviewContent')