from django.shortcuts import render
from rpy2.robjects import r
from django.conf import settings

from django.views import View

from django.http import JsonResponse
from .models import Movie

import os
import csv
import json

print("Current working directory:", os.getcwd())
from rpy2.robjects import conversion, default_converter

# Create your views here.
current_file_path = os.path.abspath(__file__)
r_script_path = os.path.join(os.path.dirname(current_file_path), 'r_scripts', 'collab_filtering_w_import.R')
csv_file_path = os.path.join(os.path.dirname(current_file_path), 'r_scripts', 'past_reviews.csv')

def recommend_movie (request):

    print(settings.BASE_DIR)
    with open(r_script_path, 'r') as file:
        r_script = file.read()

    r(r_script)

    if request.method == 'POST':

        movie_title = request.POST.get('movie-title')
        movie_review = request.POST.get('movie-review')

        reviews_list = []

        review1 = {
            "title": movie_title,
            "userText": movie_review,
            "recommendations": [],
            "rating": 0,
            "poster_path": "",
            "genre": ""
        }

        empty = os.stat(csv_file_path).st_size == 0
        current_reviews = []

        # Get previous reviews
        if not empty:
            # Open the CSV file
            with open(csv_file_path, mode='r', newline='', encoding='cp1252') as file:

                reader = csv.DictReader(file)

                for row in reader:
                    current_reviews.append(row)

        new = True
        # Check for duplicates
        for review in current_reviews:
            if review['title'] == movie_title:
                review['userText'] = movie_review
                new = False
                break
            else:
                new = True

        if new:
            current_reviews.append(review1)

        reviews_json = json.dumps(current_reviews)
        result = r.recommend_movie(reviews_json)
        result_list = str(result)
        result_json = json.loads(result_list)
        print("RESULT")
        print(result_json[0][0])
        print(type(result_json[0][0]['genre']))
        print(result_json[0][0]['poster_path'])
        genre_string = result_json[0][0]['genre'].replace("'", '"')
        genre_json = json.loads(str(genre_string))

        # Write down recommendations
        for i in range(len(current_reviews)):
            # current_reviews[i]['recommendations'] = result_json[1]
            # current_reviews[i]['rating'] = result_json[0][0]['rating'][0]
            # current_reviews[i]['poster_path'] = "https://image.tmdb.org/t/p/original" + result_json[0][0]['poster_path'][0]
            # current_reviews[i]['genre'] = genre_json[0]['name']
            break

        # Rewrite past_reviews file
        with open(csv_file_path, mode='w', newline='', encoding='cp1252') as file:
            writer = csv.DictWriter(file, fieldnames=current_reviews[0].keys())
            writer.writeheader()
            writer.writerows(current_reviews)

        titles = [item['title'] for item in result_json[1]]
        return render(request, 'recommendation_results.html', {'reaction':"Awesome! Here are some movies that are watched by users like you!",'result': titles})
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
    past_reviews = []
    with open(csv_file_path, mode='r', newline='', encoding='cp1252') as file:
        reader = csv.DictReader(file)
        for row in reader:
            past_reviews.append(row)

    print("PAST REVIEWS:")
    print(past_reviews[0]['userText'])

    return render(request, 'past_reviews.html', {'reviews': past_reviews}) # {'reaction':result[0][0],'result': list(result[1])} similar to this

def recommendations_page(request):
    #state list of recommended movies here
    #link for missing incase need https://t3.ftcdn.net/jpg/03/45/05/92/360_F_345059232_CPieT8RIWOUk4JqBkkWkIETYAkmz2b75.jpg

    print(settings.BASE_DIR)
    with open(r_script_path, 'r') as file:
        r_script = file.read()

    r(r_script)

    empty = os.stat(csv_file_path).st_size == 0
    current_reviews = []

    # Get previous reviews
    if not empty:
        # Open the CSV file
        with open(csv_file_path, mode='r', newline='', encoding='cp1252') as file:

            reader = csv.DictReader(file)

            for row in reader:
                current_reviews.append(row)

    reviews_json = json.dumps(current_reviews)
    result = r.recommend_movie(reviews_json)
    result_list = str(result)
    result_json = json.loads(result_list)
    print("RESULT")
    print(result_json[0][0])
    print(type(result_json[0][0]['genre']))
    print(result_json[0][0]['poster_path'])

    result_dict = result_json[0][0]
    # rating = result_dict['genres'][0]
    # print("KEYWORD genre TEST: ")
    # print(rating)

    recommended_movies = []

    for movie in result_json[1]:
        # # Parse the genre string into a Python list of dictionaries
        # genre_list = json.loads(movie['genres'])
        
        # # Extract the 'name' of each genre into a list
        # genre_names = [genre['name'] for genre in genre_list]
        
        # # Join the genre names into a single string, separated by commas
        # genre_string = ', '.join(genre_names)

        movie_details = {
            "title": movie['title'],
            # "genre": genre_string, # Assuming genre is a string or can be directly converted to a string
            # "rating": movie['rating'],
            "poster_image_url": movie['poster_path'],
        }
        recommended_movies.append(movie_details)
    
    print("RECOMMENDED MOVIES: ")
    print(recommended_movies)
    return render(request, 'recommended_movies.html', {'recommended_movies': recommended_movies}) # {'reaction':result[0][0],'result': list(result[1])} similar to this 

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
