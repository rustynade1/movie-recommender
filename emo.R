

library(tidytext)
library(dplyr)
library(textdata)
library(stringr)
# Sample text
sentence <- data.frame(text = "I like this movie because it reminds me of my childhood.")
sentence_words <- sentence %>%
  unnest_tokens(word, text) %>%
  anti_join(stop_words)

bing_lexicon <- get_sentiments("bing")

emotion_analysis <- sentence_words %>%
  inner_join(bing_lexicon, by = "word")

emotion_summary <- emotion_analysis %>%
  group_by(sentiment) %>%
  summarize(count = n())

print(emotion_summary)


