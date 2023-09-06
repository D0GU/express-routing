const e = require("express");
const express = require("express");
const { mode, median } = require("mathjs");

const app = express();

function parseNums(string) {
  if (string == "" || string == null) {
    return [400, "invalid input: field empty"];
  }

  let numArray = [];
  let strArray = string.split(",");

  for (let index = 0; index < strArray.length; index++) {
    element = strArray[index];
    let num = parseInt(element);

    if (isNaN(num)) {
      return [400, `${element} is not a valid number`];
    }
    numArray.push(num);
  }

  return numArray;
}

app.listen(3000, function () {
  console.log("App on port 3000");
});

app.get("/median", function (request, response) {
  let result;
  let nums = parseNums(request.query.nums);

  if (nums[0] == 400) {
    return response.status(nums[0]).json([nums[1]]);
  }

  result = median(nums);

  return response.json({ operation: "median", value: result });
});

app.get("/mean", function (request, response) {
  let nums = parseNums(request.query.nums);
  console.log(nums);

  if (nums[0] == 400) {
    return response.status(nums[0]).json([nums[1]]);
  }

  let mean = nums.reduce((a, b) => a + b, 0) / nums.length;

  return response.json({ operation: "mean", value: mean });
});

app.get("/mode", function (request, response) {
  let nums = parseNums(request.query.nums);

  if (nums[0] == 400) {
    return response.status(nums[0]).json([nums[1]]);
  }

  let result = mode(nums);

  return response.json({ operation: "mode", value: result });
});
