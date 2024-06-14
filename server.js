/********************************************************************************
 *  WEB322 – Assignment 02
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: _______Hao Han Kao______________ Student ID: _____151604220_________ Date: ____2024/6/13__________
 *
 ********************************************************************************/

const express = require("express");
const legoSets = require("./modules/legoSets");
console.log("legoSets", legoSets);
const app = express();
//express 可以用public folder的東西
app.use(express.static("public"));
//串資料夾路徑 path
const path = require("path");
const port = 3001;
legoSets.initialize();
app.get("/", (req, res) => {
  //sendFile
  //使用path.join()
  //放dirname(當前路徑)和路徑位子
  res.sendFile(path.join(__dirname, "views/home.html"));
});

app.get("/lego/sets", (req, res) => {
  //找一個篩選的資料
  let query = req.query;
  let theme = query.theme;
  // console.log("query", query);
  // console.log("theme", theme);
  //如果把query 放進去那空的情況下他還是 true 像這樣 if(query) 所以應該要放if(theme) theme undefined
  if (theme) {
    legoSets
      .getSetsByTheme(theme)
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(404);
      });
  } else {
    legoSets
      .getAllSets()
      .then((data) => {
        res.send(data);
      })
      .catch((error) => {
        res.sendStatus(404);
      });
  }
});
//另一種寫法一樣在request裡面

app.get("/lego/sets/:set_num", (req, res) => {
  let setNum = req.params.set_num;
  legoSets
    .getSetByNum(setNum)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(404);
    });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views/about.html"));
});
//404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
