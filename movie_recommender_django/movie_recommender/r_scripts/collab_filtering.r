library(syuzhet)
library(proxy)
library(tm)
library(SnowballC)
library(stopwords)
library(lares)
library(dplyr)
library(recommenderlab)

# -- USER INPUT --
# * array of objects where objects contain:
#   + title
#   + userText

movie_review <- data.frame(
  title = "Up",
  userText = "One of the best films to ever exist. Outstanding."
)

movie_review2 <- data.frame(
  title = "The Conjuring",
  userText = "I am too much of a scaredy cat to watch this. I hated the watching experience."
)

movie_review3 <- data.frame(
  title = "The Legend of Tarzan",
  userText = "This is more my style of movie. I'm amazed at how it was animated. Kudos to the animation team."
)

# -- DATA CLEANING --

review_array <- rbind(movie_review, movie_review2, movie_review3)

# [FUNCTION]: Cleans the content of reviews in the review_array
review_cleaning <- function(array) {
  ratings_arr <- vector()
  for (i in 1:nrow(review_array)) {
    column_value <- review_array[i, "userText"]
    print(column_value)
    review_corpus <- Corpus(VectorSource(column_value))
    review_corpus <- tm_map(review_corpus, content_transformer(tolower))
    review_corpus <- tm_map(review_corpus, removeNumbers)
    review_corpus <- tm_map(review_corpus, removeWords, stopwords("english"))
    review_corpus <- tm_map(review_corpus, removePunctuation)
    review_corpus <- tm_map(review_corpus, stripWhitespace)
    
    clean_review <- as.character(review_corpus[[1]])
    
    clean_review <- trimws(clean_review)
    
    print(clean_review)
    word_vector <- strsplit(clean_review, "\\s+")[[1]]
    
    # Remove all neutral words
    afinn_sa <- get_sentiment(word_vector, method="afinn")
    afinn_sa_no_neutral <- afinn_sa[afinn_sa != 0]
    print(afinn_sa_no_neutral)
    
    # Normalize score
    
    max_current <- 5
    min_current <- -5
    max_target <- 5
    min_target <- 0
    
    normalized_score = (afinn_sa_no_neutral - min_current) / (max_current - min_current) * (max_target - min_target) + min_target
    ratings_arr <- append(ratings_arr,mean(normalized_score))
  }
  cat("Ratings Arr:")
  print(ratings_arr)
  return (ratings_arr)
}

ratings_arr <- review_cleaning(review_array)

# -- COLLABORATIVE FILTERING --

# Load CSV Files
movies_df <- read.csv("movies_metadata.csv", header = TRUE)
ratings_df <- read.csv("ratings_small.csv", header = TRUE)
links_df <- read.csv("links_small.csv", header = TRUE)

movies_df <- movies_df[!duplicated(movies_df$title), ]
movies_df <- movies_df[, c("title", "imdb_id")]
ratings_df <- ratings_df[, c("userId", "movieId", "rating")]

# Match the IMDB ID format in links_df
movies_df$imdb_id <- substr(movies_df$imdb_id, 3, nchar(movies_df$imdb_id))
movies_df$imdb_id <- gsub("^0+", "", movies_df$imdb_id)

# Join the CSV files
movies_link_df <- merge(movies_df, links_df, by.x = "imdb_id", by.y = "imdbId")
link_ratings_df <- merge(movies_link_df, ratings_df, by = "movieId")

# Check for NA values
na_df <- link_ratings_df[!complete.cases(link_ratings_df), ]
#print(na_df)

# Order dataframe by userId
ordered_df <- link_ratings_df[order(link_ratings_df$userId),]

# Rearrange columns
rearranged_df <- ordered_df[,c("userId", "title", "rating")]

# -- MACHINE LEARNING --

# Get last userId
last_value <- tail(rearranged_df$userId, n=1)

# [FUNCTION]: Adds the user ratings to the modelling dataframe
append_user_review <- function(user_index, df){
  df_copy <- df
  for (i in 1:nrow(review_array)) {
    print(ratings_arr[i])
    movie_title <- review_array[i, "title"]
    user_input <- data.frame(userId = user_index+1, title = movie_title, rating = ratings_arr[i])
    df_copy <- rbind(df_copy,user_input) 
  }
  return(df_copy)
}

print(tail(rearranged_df, 10))
rating_matrix <- as(rearranged_df, "realRatingMatrix")
print(rating_matrix)

row_counts <- rowCounts(rating_matrix)
col_counts <- colCounts(rating_matrix)

# Keep users with at least 50 reviews
rows_to_keep <- row_counts > 50
filtered_rating_matrix <- rating_matrix[rows_to_keep,]

users <- names(rowCounts(filtered_rating_matrix))
print(filtered_rating_matrix)

# Create evaluation scheme
eval_joined <- evaluationScheme(filtered_rating_matrix, method="split", train=.9, given=3)
eval_joined

# Initialize training and testing dataset
train_mat <- getData(eval_joined, "train")
test_known <- getData(eval_joined, "known")
test_unknown <- getData(eval_joined, "unknown")

print("Training Model")
# Train the model
recommending_model <- Recommender(train_mat, "UBCF")

print("Doing training set")
pred_movies <- predict(recommending_model, test_known, type = "ratings", n=5)


print("Doing testing set")
prediction_accuracy <- calcPredictionAccuracy(pred_movies, test_unknown)
acc <- rbind(IBCF=prediction_accuracy)
print(acc)

#saveRDS(recommending_model, "cf_model.rds")

#prediction <- predict(recommending_model, test_known, n=5)
#top_movies <- as(prediction, "list")

# -- RESULTS --
#print("Making matrix")
#rating_matrix_w_user <- as(rearranged_df, "realRatingMatrix")

#print("Predict with new user")
#prediction_w_user <- predict(recommending_model, rating_matrix_w_user, n=5)

#print("Listing")
#top_movies_of_user <- as(prediction_w_user, "list")
#cat("Top Movies With User:")
#print(top_movies_of_user[last_value+1])
