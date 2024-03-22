from django.shortcuts import render
from rpy2.robjects import r
from django.conf import settings

from django.views import View

from django.http import JsonResponse
from .models import Movie
import pandas as pd
from rpy2.robjects import pandas2ri

import os
import csv
import json

print("Current working directory:", os.getcwd())
from rpy2.robjects import conversion, default_converter

# Create your views here.
current_file_path = os.path.abspath(__file__)
r_script_path = os.path.join(os.path.dirname(current_file_path), 'r_scripts', 'collab_filtering_w_import.R')

def recommend_movie (request):
    print(settings.BASE_DIR)
    with open(r_script_path, 'r') as file:
        r_script = file.read()

    r(r_script)

    if request.method == 'POST':

        pandas2ri.activate()

        movie_title = request.POST.get('movie-title')
        movie_review = request.POST.get('movie-review')

        reviews_list = []

        review1 = {
            "title": movie_title,
            "userText": movie_review
        }

        review2 = {
            "title": "Up",
            "userText": "Breathtaking"
        }

        reviews_list.append(review1)
        reviews_list.append(review2)

        reviews_json = json.dumps(reviews_list)
        result = r.recommend_movie(reviews_json)
        return render(request, 'recommendation_results.html', {'reaction':"Awesome! Here are some movies that are watched by users like you!",'result': list(result)})
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

def recommendations_page(request):
    #state list of recommended movies here
    #link for missing incase need https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg
    return render(request, 'recommended_movies.html', ) # {'reaction':result[0][0],'result': list(result[1])} similar to this 

class AutocompleteView(View):
    def get(self, request):
        query = request.GET.get('term', '')
        data = read_csv_file('movie_recommender/r_scripts/movie_selection.csv')

        filtered_data = []

        for item in data:
            if item[0].lower().startswith(query.lower()):
                filtered_data.append(item[0])
                # Stop adding items if filtered_data reaches the maximum length
                if len(filtered_data) == 10:
                    break

        return JsonResponse(filtered_data, safe=False)
