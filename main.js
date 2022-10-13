function getPlot() {
    var xValues = [1,2,3,4,5,6,7];
    var yValues = [17,22,25,18,15,29,14];
        
    new Chart("myPlot", {
        type: "line",
        data: {
            labels: ["Mon","Tues","Wed","Thur","Fri","Sat","Cur"],
            datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "rgba(0,205,255,1)",
                borderColor: "rgba(255,255,255,1)",
                color: "rgba(255,255,255,1)",
                data: yValues,
                }]
            },
        options: {
            legend: {display: false},
            scales: {
                yAxes: [{ticks: {min: 0, max:35}}]
            },
        },
        defaults: {
            color: "rgba(255,255,255,1)"
        }
    });
}

$("#tempSlider").roundSlider({
    sliderType: "min-range",
    editableTooltip: false,
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    width: 5,
    handleSize: "+8",
    readOnly: true,

    min: 41,
    max: 81,
    
    svgMode: true,
	  pathColor: "#eee",
	  borderWidth: 0,
    
	  startValue: 0,
    
    valueChange: function (e) {
    	var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#tempSlider").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

$("#levelSlider").roundSlider({
    sliderType: "min-range",
    editableTooltip: false,
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 80,
    handleSize: 0,
    readOnly: true,

    min: 0,
    max: 24,
    
    svgMode: true,
	  pathColor: "#eee",
	  borderWidth: 0,
    
	  startValue: 0,
    
    valueChange: function (e) {
    	var color = e.isInvertedRange ? "#FF5722" : "#8BC34A";
      
      $("#tempSlider").roundSlider({ "rangeColor": color, "tooltipColor": color });
    }
});

var tempSliderObj = $("#tempSlider").data("roundSlider");
var levelSliderObj = $("#levelSlider").data("roundSlider");
tempSliderObj.setValue(63);
levelSliderObj.setValue(10);