import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import wordsToNumbers from 'words-to-numbers';

import useStyles from "./styles";
import NewsCards from "./components/NewsCards/NewsCards";

const alanKey =
  "939ab5c01685cdf40314f7cc2a41f67c2e956eca572e1d8b807a3e2338fdd0dc/stage";

// newaapi.org api key 40c6681fd2ae4ea99cdf1b73543ed39c

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles , number }) => {
        if (command === "newHeadlines") {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if(command === "open") {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number , {fuzzy: true}) : number;
          const article = articles[[parsedNumber - 1]];
          
          if(parsedNumber > 20 ) {
            alanBtn().playText('Please try that again.');
          } else if(article) {
            window.open(article.url, "_blank");
            alanBtn().playText('Opening ... ')
          }
        }
      },
    });
  }, []);

  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
