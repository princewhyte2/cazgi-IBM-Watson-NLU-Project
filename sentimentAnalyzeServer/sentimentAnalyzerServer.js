const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

function getNLUInstance() {
  let api_key = process.env.API_KEY;
  let api_url = process.env.API_URL;

  const NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
  const { IamAuthenticator } = require("ibm-watson/auth");

  const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: "2020-08-01",
    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),
    serviceUrl: api_url,
  });
  return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static("client"));

const cors_app = require("cors");
const { json } = require("express");
app.use(cors_app());

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/url/emotion", (req, res) => {
  let urlToAnalyze = req.query.url;
  let nluInstance = getNLUInstance();

  const analyzeParams = {
    url: urlToAnalyze,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
      },
      keywords: {
        emotion: true,
        sentiment: true,
      },
    },
  };
  nluInstance
    .analyze(analyzeParams)
    .then((analysisResult) => {
      console.log("the result is", JSON.stringify(analysisResult.result));
      res.send(analysisResult.result.entities[0].emotion);
    })
    .catch((err) => res.send(err.toString()));
});

app.get("/url/sentiment", (req, res) => {
  let urlToAnalyze = req.query.url;
  let nluInstance = getNLUInstance();

  const analyzeParams = {
    url: urlToAnalyze,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
      },
      keywords: {
        emotion: true,
        sentiment: true,
      },
    },
  };
  nluInstance
    .analyze(analyzeParams)
    .then((analysisResult) => {
      console.log("the result is", analysisResult);
      res.send(analysisResult.result.entities[0].sentiment.label);
    })
    .catch((err) => res.send(err.toString()));
});

app.get("/text/emotion", (req, res) => {
  let textToAnalyze = req.query.text;
  let nluInstance = getNLUInstance();

  const analyzeParams = {
    text: textToAnalyze,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
      },
      //   keywords: {
      //     emotion: true,
      //     sentiment: true,
      //   },
    },
  };
  nluInstance
    .analyze(analyzeParams)
    .then((analysisResult) => {
      console.log("the result is", JSON.stringify(analysisResult));
      res.send(analysisResult.result.entities[0].emotion);
    })
    .catch((err) => res.send(err.toString()));
});

app.get("/text/sentiment", (req, res) => {
  let textToAnalyze = req.query.text;
  let nluInstance = getNLUInstance();

  const analyzeParams = {
    text: textToAnalyze,
    features: {
      entities: {
        emotion: true,
        sentiment: true,
      },
      //   keywords: {
      //     emotion: true,
      //     sentiment: true,
      //   },
    },
  };
  nluInstance
    .analyze(analyzeParams)
    .then((analysisResult) => {
      console.log("the result is", analysisResult);
      res.send(analysisResult.result.entities[0].sentiment.label);
    })
    .catch((err) => res.send(err.toString()));
});

let server = app.listen(8080, () => {
  console.log("Listening", server.address().port);
});
