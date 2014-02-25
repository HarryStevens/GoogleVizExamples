/**
 * @author Harry
 */

/* 
 * Script Outline:
 * (1) Set up $(document).ready() with a function to load when everything is loaded.
 * (2) Load Google Viz library.
 * (3) Load data.
 * (4) Feed data to library to put chart on page.
 * 	(a) Get data into format that library can consume. This means we need to turn the JSON into an array of arrays.
 * 		The data I want to convert is from "observations," specifically "date" and "value"
 * 	(b) Create for loop for this
 */



//UNEMPDATA is local name of the json file that I just loaded
function dataLoaded(UNEMPDATA){
	//(4)(a)
	var myObsData = UNEMPDATA.observations;
	var myHeaders = ["Date","Number of long-term unemployed"];
	var myDataArray = [];
	myDataArray.push(myHeaders);
	//(4)(b)
	for(var i=0; i<myObsData.length; i++){
		
		var currObj = myObsData[i];
		var currArray = [currObj.date, Number(currObj.value*1000)];
		myDataArray.push(currArray);
	
	}//end for
	
	//This comes from the Google documentation at https://developers.google.com/chart/interactive/docs/gallery/linechart
	var data = google.visualization.arrayToDataTable(myDataArray);
	var options = {
		title: 'Long-term Unemployment 1980-present',
		hAxis: {title:'Date', format:'MMM, d, y'},
		vAxis: {title:'Civilians unemployed for 27 weeks or more', ticks:[
			1000000,
			2000000,
			3000000,
			4000000,
			5000000,
			6000000,
			7000000,
			8000000]},
		curveType: 'function',
		height: 550,
		width: 1400,
		
	};
	var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
	chart.draw(data, options);

}//end dataLoaded



//this is the function to call when the google viz package is loaded
function googleLoaded(){
	//(3) This loads the data from the json file and names the callback function
	$.get("UEMP270V_data.json", dataLoaded, "json");
}//end googleLoaded


//this is the function to call when the document is ready
function pageLoaded(){
	// (2) Load Google Viz library
	google.load("visualization", "1", {packages:["corechart"], callback: "googleLoaded"});
}//end pageLoaded


//(1) Document ready w/ pageLoaded as function
$(document).ready(pageLoaded);
