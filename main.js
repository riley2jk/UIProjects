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
