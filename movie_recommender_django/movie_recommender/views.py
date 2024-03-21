from django.shortcuts import render
from rpy2.robjects import r
from django.conf import settings

from django.views import View

from django.http import JsonResponse
from .models import Movie

import os
import csv

print("Current working directory:", os.getcwd())
from rpy2.robjects import conversion, default_converter

# Create your views here.
current_file_path = os.path.abspath(__file__)
r_script_path = os.path.join(os.path.dirname(current_file_path), 'r_scripts', 'movie_review_script.R')

def recommend_movie (request):
    print(settings.BASE_DIR)
    with open(r_script_path, 'r') as file:
        r_script = file.read()

    r(r_script)

    if request.method == 'POST':
        movie_title = request.POST.get('movie-title')
        movie_review = request.POST.get('movie-review')
        result = r.movie_review(movie_title, "", movie_review)
        result = list(result)
        return render(request, 'recommendation_results.html', {'reaction':result[0][0],'result': list(result[1])})
    else:
        return render(request, 'movie_review.html')


def suggest_items(request):
    query = request.GET.get('term', '')
    movies = Movie.objects.filter(names__icontains=query)[:10]
    suggestions = [movie.names for movie in movies]
    return JsonResponse(suggestions, safe=False)

def read_csv_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        reader = csv.reader(file)
        next(reader) # Skip the header row
        data = [row for row in reader]
    return data

def past_reviews(request):
    #state previous reviews here
    #link for missing incase need https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg
    return render(request, 'past_reviews.html', ) # {'reaction':result[0][0],'result': list(result[1])} similar to this 

class AutocompleteView(View):
    def get(self, request):
        query = request.GET.get('term', '')
        data = read_csv_file('movie_recommender/r_scripts/netflix_cleaned.csv')
        filtered_data = [item[0] for item in data if item[0].lower().startswith(query.lower())]
        return JsonResponse(filtered_data, safe=False)
