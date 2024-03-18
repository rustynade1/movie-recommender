library(syuzhet)
library(proxy)
dataset <- read.csv("netflix_cleaned.csv")

# Preliminary: add sentiment to all movies based on the description given
dataset$movie_sentiment <- get_nrc_sentiment(dataset$description)
#print(head(dataset,1))

# Sample review format (maybe add release year later)
movie_review <- data.frame(
  
  title = "RRR (Hindi)",
  status = "",
  userText = "I hate it!"
)

cat("Sample Review:\n Title: ",movie_review$title,"\nReview: ",movie_review$userText,"\n\n")

# Obtain movie description from title (and release year?) given by the user
movie_desc <- dataset$description[movie_review$title == dataset$names]
#print(movie_desc)

# Get NRC sentiment of movie description (may be an unnecessary step later)
desc_emotion <- get_nrc_sentiment(movie_desc)
#print(desc_emotion[1:8])

# Get sentiment from user review
review_emotion <- get_nrc_sentiment(movie_review$userText)
print(review_emotion)

# Sets status to recommended if the sentiment is detected as positive, not recommended otherwise
if (review_emotion$positive > review_emotion$negative){
  
  movie_review$status = "Recommended"
  
}else{
  
  movie_review$status = "Not Recommended"
  
}

#print(movie_review$status)

# == CALCULATE TOP 5 SIMILAR MOVIES == 

if (movie_review$status == "Recommended"){
  
  # Select the columns with sentiment scores (excluding the movie column)
  sentiment_matrix <- dataset[, -1]
  
  # Find the sentiment scores for input movie
  input_scores <- subset(dataset, dataset$names == movie_review$title)[,-1]
  
  # Calculate cosine similarity with input movie
  cosine_similarity <-  proxy::simil(x = as.matrix(sentiment_matrix), y = as.matrix(input_scores), method = "cosine")
  
  # Extract the top 5 most similar movies
  top_indices <- order(cosine_similarity, decreasing = TRUE)[2:length(cosine_similarity)]  # 2 because excluding self-similarity
  top_similar_movies <- dataset$names[top_indices]
  
  # Ensure at least 5 unique similar movies
  while (length(unique(top_similar_movies)) < 5 && length(top_indices) < length(cosine_similarity)) {
    top_indices <- c(top_indices, which(!top_indices %in% top_indices))  # add the next index
    top_similar_movies <- dataset$names[top_indices]
  }
  
  # Take the top 5 unique similar movies
  top_similar_movies <- head(unique(top_similar_movies), 5)
  
  # Display the top unique similar movies
  cat("Top 5 Similar Movies: \n")
  cat(paste(top_similar_movies,"\n"))
  
}else{
  # Select the columns with sentiment scores (excluding the movie column)
  sentiment_matrix <- dataset[, -1]
  
  # Find the sentiment scores for input movie
  input_scores <- subset(dataset, dataset$names == movie_review$title)[,-1]
  
  # Calculate cosine similarity with input movie
  cosine_similarity <-  proxy::simil(x = as.matrix(sentiment_matrix), y = as.matrix(input_scores), method = "cosine")
  
  # Extract the top 5 LEAST  similar movies
  top_indices <- order(cosine_similarity)
  top_notSimilar_movies <- dataset$names[top_indices]
  
  # Ensure at least 5 unique similar movies
  while (length(unique(top_notSimilar_movies)) < 5 && length(top_indices) < length(cosine_similarity)) {
    top_indices <- c(top_indices, which(!top_indices %in% top_indices))  # add the next index
    top_notSimilar_movies <- dataset$names[top_indices]
  }
  
  # Take the top 5 unique similar movies
  top_similar_movies <- head(unique(top_notSimilar_movies), 5)
  
  # Display top 5 least similar movies
  cat("We're sorry to here that. Perhaps these are more to your liking? \n")
  cat(paste(top_similar_movies,"\n"))
}





