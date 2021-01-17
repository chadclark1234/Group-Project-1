$(document).ready(function () {
  //user searches through api data

  var foodInformation;
  var foodData;
  var userInput = JSON.parse(localStorage.getItem(userInput)) || [];
  // SUBMIT EVENT LISTENER \\
  $("#submitFood").on("click", function (event) {
    event.preventDefault();

    // SETTING VARIABLES FOR UI INPUT TO MAKE FOODSTRINGAPI \\
    let foodQuantity = $("#quantity-of-food").val().trim();
    let foodMeasurement = $("#measurement").val().trim();
    let foodType = $("#type-of-food").val().trim();
    // CONCATENATE USER UI INPUT PREPARE TO SEND TO API \\
    let foodStringAPI = `${foodQuantity} ${foodMeasurement} ${foodType}`;
    console.log(foodStringAPI);

    // LOCAL STORAGE \\
    userInput.push(foodStringAPI);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    function renderButtons() {
      $("#foodList").empty();
      for (var i = 0; i < foodStringAPI.length; i++) {
        var addList = $("<li>");
        addList.addClass("foodStringAPI");
        var foodButton = $("<button>");
        foodButton.addClass("btn rounded");
        foodButton.text(foodStringAPI[i]);

        var tRow = $("<tr>");
        var displayFoodName = $("<td>").text(foodInformation);
        var displayCalories = $("<td>").text(foodData);
        tRow.append(displayFoodName, displayCalories);
      }
    }
    // NUTRIENTS API AJAX \\
    let queryFoodURL = `https://api.edamam.com/api/nutrition-data?app_id=c502f564&app_key=a522a1a262d4a5a3968b56ede64ba74a&ingr=${foodStringAPI}`;

    $.ajax({
      url: queryFoodURL,
      method: "GET",
    }).then(function (response) {
      foodInformation = $("#foodList").text(response.ingredients[0].text);
      foodData = $("#foodList").text(response.ingredients[0].calories);
    });
    console.log(foodInformation, foodData);

    renderButtons();
  });
});
