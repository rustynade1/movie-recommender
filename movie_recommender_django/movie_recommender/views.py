import json

from django.shortcuts import render
from rpy2.robjects import r
from django.conf import settings

from django.views import View

from django.http import JsonResponse
from .models import Movie

import os
import csv
import subprocess

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import RecommendMovieSerializer



print("Current working directory:", os.getcwd())
from rpy2.robjects import conversion, default_converter

# Create your views here.
current_file_path = os.path.abspath(__file__)
r_script_path = os.path.join(os.path.dirname(current_file_path), 'r_scripts', 'movie_review_script.R')

# def recommend_movie (request):
#     print(settings.BASE_DIR)
#     with open(r_script_path, 'r') as file:
#         r_script = file.read()
#
#     r(r_script)
#
#     if request.method == 'POST':
#         movie_title = request.POST.get('movie-title')
#         movie_review = request.POST.get('movie-review')
#         result = r.movie_review(movie_title, "", movie_review)
#         result = list(result)
#         return render(request, 'recommendation_results.html', {'reaction':result[0][0],'result': list(result[1])})
#     else:
#         return render(request, 'movie_review.html')


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

class AutocompleteView(View):
    def get(self, request):
        query = request.GET.get('term', '')
        data = read_csv_file('movie_recommender/r_scripts/netflix_cleaned.csv')
        filtered_data = [item[0] for item in data if item[0].lower().startswith(query.lower())]
        return JsonResponse(filtered_data, safe=False)

class RecommendMovieView(APIView):
    def post(self, request, format=None):
        csv_file_path = 'past_reviews.csv'

        data_to_append = request.data.get('reviewDetails')

        empty = os.stat(csv_file_path).st_size == 0
        print(data_to_append)
        current_reviews = []

        if empty:
            current_reviews.append(data_to_append[0])
        else:
            # Open the CSV file
            current_reviews.append(data_to_append[0])
            with open(csv_file_path, mode='r', newline='') as file:

                reader = csv.DictReader(file)

                for row in reader:
                    current_reviews.append(row)

        print(current_reviews)
        review_details = current_reviews
        print(review_details)
        serialized_review_details = json.dumps(review_details)
        print(serialized_review_details)
        result = subprocess.run(['C:/Program Files/R/R-4.3.3/bin/x64/Rscript', 'C:/Users/ASUS/Documents/GitHub/movie-recommender-2/movie_recommender_django/movie_recommender/collab_filtering.r', serialized_review_details], capture_output=True,
                            text=True)
        print(result.stdout)
        # Assuming result.stdout contains the JSON string
        json_output = result.stdout

        # Parse the JSON string into a Python list
        result_list = json.loads(json_output)

        new_review_obj = data_to_append
        new_review_obj[0]['recommendations'] = result_list

        print (new_review_obj)

        if current_reviews:
            # Open the CSV file in append mode
            with open(csv_file_path, mode='a', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=new_review_obj[0].keys())
                if empty:
                    writer.writeheader()
                writer.writerows(data_to_append)
        else:
            current_reviews.append(new_review_obj)
            with open(csv_file_path, mode='w', newline='') as file:
                writer = csv.DictWriter(file, fieldnames=current_reviews[0].keys())
                writer.writeheader()

                #for review in current_reviews:
                    #writer.writerows(review)
                writer.writerows(current_reviews)

        # Now result_list is a Python list containing the data returned by the R script
        print(result_list)
        return JsonResponse({'result': result_list})


