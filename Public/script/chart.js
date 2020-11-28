window.onload = function () {
    var dps1 = []; // dataPoints
    var dps2 = [];
    var dps3 = [];
    var dps4 = [];

    

    var chart1 = new CanvasJS.Chart("ESP32-1", {
        title: {
            text: 'ESP32-1'
        },
            axisX: {
                valueFormatString: "hh:mm:ss"
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            dataPoints: dps1
        }]
    });


    var chart2 = new CanvasJS.Chart("ESP32-2", {
        title: {
            text: 'ESP32-2'
        },
            axisX: {
                valueFormatString: "hh:mm:ss"
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            dataPoints: dps2
        }]
    });

    var chart3 = new CanvasJS.Chart("ESP32-3", {
        title: {
            text: 'ESP32-3'
        },
            axisX: {
                valueFormatString: "hh:mm:ss"
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            dataPoints: dps3
        }]
    });
    var chart4 = new CanvasJS.Chart("ESP32-4", {
        title: {
            text: 'ESP32-4'
        },
            axisX: {
                valueFormatString: "hh:mm:ss"
        },
        data: [{
            type: "line",
            xValueType: "dateTime",
            dataPoints: dps4
        }]
    });

    var SensorVal1 = 0;
    var SensorVal2 = 0;
    var SensorVal3 = 0;
    var SensorVal4 = 0;

    var updateInterval = 500;
    var dataLength = 20; // number of dataPoints visible at any point
    var time = new Date();

    
    

    var updateChart = function () {
        


        var sensors1Select = document.getElementById("sensors1");
        var sensors2Select = document.getElementById("sensors2");
        var sensors3Select = document.getElementById("sensors3");
        var sensors4Select = document.getElementById("sensors4");

        var array1length=dataArr1.length-1;
        var array2length=dataArr2.length-1;
        var array3length=dataArr3.length-1;
        var array4length=dataArr4.length-1;

        SensorVal1 =  dataArr1[array1length];
        SensorVal2 =  dataArr2[array2length];
        SensorVal3 =  dataArr3[array3length];
        SensorVal4 =  dataArr4[array4length];dataArr4[array4length];

        console.log(SensorVal1 + " " + SensorVal2 + " " + SensorVal3 + " " + SensorVal4 )

        SensorVal1 =  parseInt(SensorVal1);
        SensorVal2 =  parseInt(SensorVal2);
        SensorVal3 =  parseInt(SensorVal3);
        SensorVal4 =  parseInt(SensorVal4);


        if (sensors1Select.selectedIndex == 0) {
            SensorVal1 = 0;
        }

        if ((sensors1Select.selectedIndex < 5) && (sensors1Select.selectedIndex != 0)) {
            SensorVal1 = Math.floor(Math.random() * 2);
        }

        if (sensors1Select.selectedIndex == 5) {
            SensorVal1 = (SensorVal1 * 0.04) - 55;
        }

        if (sensors1Select.selectedIndex == 6) {
            SensorVal1 = SensorVal1 * 100 / 4095
        }

        if (sensors1Select.selectedIndex == 7) {
            SensorVal1 = SensorVal1;
        }


        if (sensors2Select.selectedIndex == 0) {
            SensorVal2 = 0;
        }

        if ((sensors2Select.selectedIndex < 5) && (sensors2Select.selectedIndex != 0)) {
            SensorVal2 = Math.floor(Math.random() * 2);
        }

        if (sensors2Select.selectedIndex == 5) {
            SensorVal2 = (SensorVal2 * 0.04) - 55;
        }

        if (sensors2Select.selectedIndex == 6) {
            SensorVal2 = SensorVal2 * 100 / 4095
        }

        if (sensors2Select.selectedIndex == 7) {
            SensorVal2 = SensorVal2;
        }


        if (sensors3Select.selectedIndex == 0) {
            SensorVal3 = 0;
        }

        if ((sensors3Select.selectedIndex < 5) && (sensors3Select.selectedIndex != 0)) {
            SensorVal3 = Math.floor(Math.random() * 2);
        }

        if (sensors3Select.selectedIndex == 5) {
            SensorVal3 = (SensorVal3 * 0.04) - 55;
        }

        if (sensors3Select.selectedIndex == 6) {
            SensorVal3 = SensorVal3 * 100 / 4095
        }

        if (sensors3Select.selectedIndex == 7) {
            SensorVal3 = SensorVal3;
        }


        if (sensors4Select.selectedIndex == 0) {
            SensorVal4 = 0;
        }

        if ((sensors4Select.selectedIndex < 5) && (sensors4Select.selectedIndex != 0)) {
            SensorVal4 = Math.floor(Math.random() * 2);
        }

        if (sensors4Select.selectedIndex == 5) {
            SensorVal4 = (SensorVal4 * 0.04) - 55;
        }

        if (sensors4Select.selectedIndex == 6) {
            SensorVal4 = SensorVal4 * 100 / 4095
        }

        if (sensors3Select.selectedIndex == 7) {
            SensorVal3 = SensorVal3;
        }


        document.getElementById('Graphreset1').onclick = function () {
            for (var reset = 0; reset < dataLength; reset++) {
                dps1.splice(0, dps1.length)
            }
            SensorVal1=0;
        }

        document.getElementById('Graphreset2').onclick = function () {
            for (var reset = 0; reset < dataLength; reset++) {
                dps2.splice(0, dps2.length)
            }
            SensorVal2=0;
        }

        document.getElementById('Graphreset3').onclick = function () {
            for (var reset = 0; reset < dataLength; reset++) {
                dps3.splice(0, dps3.length)
            }
            SensorVal3=0;
        }

        document.getElementById('Graphreset4').onclick = function () {
            for (var reset = 0; reset < dataLength; reset++) {
                dps4.splice(0, dps4.length)
            }
            SensorVal4=0;
        }

        time.setSeconds(time.getSeconds() + 1);

        dps1.push({
            x: time.getTime(),
            y: SensorVal1
        });

        dps2.push({
            x: time.getTime(),
            y: SensorVal2
        });

        dps3.push({
            x: time.getTime(),
            y: SensorVal3
        });

        dps4.push({
            x: time.getTime(),
            y: SensorVal4
        });


        if (dps1.length > dataLength) {
            dps1.shift();
        }

        if (dps2.length > dataLength) {
            dps2.shift();
        }

        if (dps3.length > dataLength) {
            dps3.shift();
        }

        if (dps4.length > dataLength) {
            dps4.shift();
        }


        chart1.render();
        chart2.render();
        chart3.render();
        chart4.render();
    };


    updateChart(dataLength);
    setInterval(function () {
        updateChart()
    }, updateInterval);
}