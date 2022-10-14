function getPlot() {
    var yValues = [17,22,25,18,15,29,14];
        
    new Chart("myPlot", {
        type: "line",
        data: {
            labels: ["Mon","Tues","Wed","Thur","Fri","Sat","Cur"],
            datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "#00cdff",
                borderColor: "#fff",
                color: "#fff",
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
};

$("#tempSlider").roundSlider({
    sliderType: "min-range",
    editableTooltip: false,
    circleShape: "pie",
    startAngle: "315",
    lineCap: "round",
    radius: 60,
    width: 5,
    handleSize: "+8",
    readOnly: true,

    min: 51,
    max: 71,

    tooltipFormat: "tempFormat",
    
    svgMode: true,
	pathColor: "#bbb",
	borderWidth: 0,
    
	startValue: 61,
    
    valueChange: function (e) {
        var color = "";
        if (e.value > 61) {
            color = "#ff2a00"
        }
        else if (e.value < 61) {
            color = "#00cdff"
        }
        else {
            color = "#fff"
        }
      
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
    
    tooltipFormat: "levelFormat",

    svgMode: true,
	pathColor: "#eee",
    tooltipColor: "#fff",
	borderWidth: 0,
    
	startValue: 0,
});

function tempFormat(e) {
	return e.value + "°F"
}

function levelFormat(e) {
	return e.value + " ounces"
}

var tempSliderObj = $("#tempSlider").data("roundSlider");
var levelSliderObj = $("#levelSlider").data("roundSlider");
tempSliderObj.setValue(60);
levelSliderObj.setValue(12);
