library(syuzhet)
library(proxy)

dataset <- read.csv("imdb_top_1000.csv")

#unique(dataset$Genre)

#unique(dataset$Director)

# Preliminary: Get all unique genre values and create a vector object
allGenres <- unlist(strsplit(dataset$Genre,",\\s*"))
allUniqueGenres <- unique(allGenres)
#cat(allUniqueGenres)
genreVector <- as.vector(allUniqueGenres)

# Add all unique genres as columns in the dataset
for (i in seq_along(genreVector)) {
  if (genreVector[i] != "Genre") {  
    dataset <- cbind(dataset, 0)
    colnames(dataset)[ncol(dataset)] <- genreVector[i]
  }
}

# Iterate over each row in the dataset
for (i in seq_len(nrow(dataset))) {
  genres <- unlist(strsplit(dataset[i, "Genre"], ",\\s*"))
  #print(genres)
  for (genre in genres) {
    dataset[i, genre] <- 1
  }
}



movie_review <- data.frame(
  
  title = "The Lion King",
  rSentiment = "",
  userText = "It is my favorite movie of all time. I love animals!"
)

#print(head(dataset[44,]))

#dataset$movieGenres <- dataset$Genre[movie_review$title == dataset$Series_Title]
#print(movieGenres)
#cat(allUniqueGenres)


# Perform cosine similarity with other movies

matching_rows <- subset(dataset, dataset$Series_Title == movie_review$title)
selected_columns <- matching_rows[, allUniqueGenres]
input_matrix <- as.matrix(selected_columns)

all_movie_rows <- dataset[, allUniqueGenres]
movies_matrix <- as.matrix(all_movie_rows)

cosine_similarity <-  proxy::simil(x = as.matrix(movies_matrix), y = as.matrix(input_matrix), method = "cosine")
#print(cosine_similarity)
# Top 5
top_indices <- order(cosine_similarity, decreasing = TRUE)[2:length(cosine_similarity)]  # 2 because excluding self-similarity
top_similar_movies <- dataset$Series_Title[top_indices]

# Ensure at least 5 unique similar movies
while (length(unique(top_similar_movies)) < 5 && length(top_indices) < length(cosine_similarity)) {
  top_indices <- c(top_indices, which(!top_indices %in% top_indices))  # add the next index
  top_similar_movies <- dataset$Series_Title[top_indices]
}

# Take the top 5 unique similar movies
top_five <- head(top_similar_movies, 5)
cat(paste(top_five,"\n"))

