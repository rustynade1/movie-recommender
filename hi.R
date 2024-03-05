library(syuzhet)
dataset <- read.csv("netflix_cleaned.csv")


# Remove commas from the "mood" column
dataset$mood <- gsub(",", "", dataset$mood)

dataset$mood <- trimws(dataset$mood)
dataset$mood <- tolower(dataset$mood)

mood_filtered <- unique(dataset$mood)
print(mood_filtered)dsds

movie <- ("Drive (2019)\n")
#cat("Movie: ", movie)
sample_text <- "This movie gave me a profound feeling of sorrow. It was horribly executed and the writing was garbage."
sample_word <- "Four animal friends get a taste of the wild life when they break out of captivity at the Central Park Zoo and wash ashore on the island of Madagascar."

cat("Sample review: ",sample_text,"\n\n")
sample_sentences <- get_sentences(sample_text)
#print(sample_sentences)

sentiment_data <- get_nrc_sentiment(sample_sentences)

mood_sentiment <- get_nrc_sentiment(sample_word)
print(sentiment_data[1:8])
cat("Mood Sentiment:\n")
print(mood_sentiment[1:8])