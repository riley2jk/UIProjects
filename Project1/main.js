let data = {level: 10, target: 61, active: 2, feet: 5, inch: 10, goal: 24, temp: 60, consum: 13, YVals: [17,22,25,18,15,29,23,14], XVals: ["Mon","Tues","Wed","Thur","Fri","Sat","Sun","Cur"]};

function setValues() {
    document.getElementById("modal-target-temp").value = data.target;
    document.getElementById("modal-target-active").value = data.active;
    document.getElementById("modal-target-feet").value = data.feet;
    document.getElementById("modal-target-inch").value = data.inch;
    document.getElementById("goal-num").innerHTML = data.goal.toString();
    document.getElementById("consum-num").innerHTML = data.consum.toString();
    document.getElementById("target-num").innerHTML = "Target: " + data.target + "°F";
}

var tmodal = document.getElementById("tmodal");
var amodal = document.getElementById("amodal");
var tbtn = document.getElementById("topen");
var abtn = document.getElementById("aopen");
var tspan = document.getElementsByClassName("close")[0];
var aspan = document.getElementsByClassName("close")[1];
setInterval(tempChange, 5000);

function getPlot(newDay) {
    var yValues = getYVals(newDay, data.YVals);
        
    new Chart("myPlot", {
        type: "line",
        data: {
            labels: newDay == 0 ? getXVals(data.XVals) : data.XVals,
            datasets: [{
                fill: true,
                lineTension: 0,
                backgroundColor: "#00cdff",
                borderColor: "#fff",
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

function getYVals(newDay, YVals) {
    switch (newDay) {
        case 0:
            YVals[7] = data.consum;
            break;
        case 1:
            for (let i = 0; i < 7; i++) {
                YVals[i] = YVals[i+1];
            }
            YVals[7] = 0;
            data.consum = 0;
            break;
        default:
            break;
    }

    data.YVals = YVals;
    return data.YVals;
}

function getXVals(XVals) {
    let temp = XVals[0];
    for (let i = 0; i < 6; i++) {
        XVals[i] = XVals[i+1];
    }
    XVals[6] = temp;
    data.XVals = XVals;
    return data.XVals;
}

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

    min: data.target - 10,
    max: data.target + 10,

    tooltipFormat: "tempFormat",
    
    svgMode: true,
	pathColor: "#bbb",
	borderWidth: 0,
    
	startValue: 61,
    
    valueChange: function (e) {
        var color = "";
        if (e.value > data.target) {
            color = "#ff2a00"
        }
        else if (e.value < data.target) {
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

var tempSliderObj = $("#tempSlider").data("roundSlider");
var levelSliderObj = $("#levelSlider").data("roundSlider");
tempSliderObj.setValue(data.temp);
levelSliderObj.setValue(data.level);

function tempFormat(e) {
	return e.value + "°F"
}

function levelFormat(e) {
	return e.value + " ounces"
}

tbtn.onclick = function() {
    tmodal.style.display = "block";
}

abtn.onclick = function() {
    amodal.style.display = "block";
}

tspan.onclick = function() {
    tmodal.style.display = "none";
    setModalStatus();
}

aspan.onclick = function() {
    amodal.style.display = "none";
    setModalStatus();
}

function setModalStatus() {
    data.inch = Math.floor(document.getElementById("modal-target-inch").value);
    data.feet = Math.floor(document.getElementById("modal-target-feet").value);
    data.active = Math.floor(document.getElementById("modal-target-active").value);
    data.target = Math.floor(document.getElementById("modal-target-temp").value);

    data.goal = (2 * data.feet) + data.active + Math.floor((data.inch / 5)) + 10;

    setValues();

    resetTempSlider();
}

function resetTempSlider() {
    $("#tempSlider").roundSlider("option", "min", data.target - 10);
    $("#tempSlider").roundSlider("option", "max", data.target + 10);

    var color = "";
    if (data.temp > data.target) {
        color = "#ff2a00"
    }
    else if (data.temp < data.target) {
        color = "#00cdff"
    }
    else {
        color = "#fff"
    }
      
    $("#tempSlider").roundSlider("option", "rangeColor", color);
    $("#tempSlider").roundSlider("option", "tooltipColor", color);
}

document.addEventListener("keydown", (e) => {
    switch(e.key) {
        case "d":
            if (data.level > 0) {
                data.level -= 1;
                data.consum += 1;
                levelSliderObj.setValue(data.level);
                setValues();
                getPlot(0);
            }
            break;
        case "f":
            data.level = 24;
            levelSliderObj.setValue(data.level);
            break;
        case "n":
            getPlot(1);
            setValues();
            break;
        default:
            break;
    }
})

function tempChange() {
    if (data.temp > data.target) {
        data.temp -= 1;
        tempSliderObj.setValue(data.temp);
    }
    else if (data.temp < data.target) {
        data.temp += 1;
        tempSliderObj.setValue(data.temp);
    }
    
    resetTempSlider();
}
