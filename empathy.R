#if (!require(transforEmotion)) install.packages("transforEmotion")
#library(transforEmotion)


#testText <- ("this movie is dogshit i dont want to watch it ever again")

# cat(testText)


# Obtain "emotions" data
#data("emotions")

## Not run:
# Obtain emoxicon scores for first 10 tweets
#testEmotions <- emoxicon_scores(text = testText, lexicon = emotions)
## End(Not run)

#print(testEmotions)



library(tidytext)
library(dplyr)
library(textdata)
# Sample text
text <- "I like this movie; I feel warm inside."

# Perform sentiment analysis
#sentiments <- get_sentiments("bing")  # Using Bing lexicon for sentiment analysis
#tokens <- data_frame(text = text) %>%
#  unnest_tokens(word, text) %>%
#  inner_join(sentiments)

# Print sentiment scores
#print(tokens)

# Perform emotion detection
emotions <- get_sentiments("nrc")  # Using NRC lexicon for emotion detection
tokens_emotion <- data_frame(text = text) %>%
  unnest_tokens(word, text) %>%
  inner_join(emotions)

# Print emotion scores
print(tokens_emotion)



