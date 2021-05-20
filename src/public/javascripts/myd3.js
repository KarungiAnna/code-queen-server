// dashboard data endpoint
const sampleData = [
    {
      cohort: '1',
	  applicants: 60,
	  graduates: 30,
      
    },
    {
      cohort: '2',
	  applicants: 40,
	  graduates: 20,
    },
    {
      cohort: '3',
      applicants: 30,
	  graduates: 20,
    },
    {
      cohort: '4',
	  applicants: 70,
	  graduates: 10,
    },
    
];

//student information

//dummie data

var data = [
  { "Name" : 'Nalumansi Margret', "age" : 22, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": 'student', "results": {"HTML": " 55", "CSS": "67 ", "JavaScript": "90 ", "Facilitator Rating":" "}},
  { "Name" : 'Mirembe Daniella', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student",  "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Kisaakye Danae', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student",  "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nakasi sarah Mercy', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nalumansi Florence', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nabwami Patricia', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nakyejwe Christine', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nabwanika Aisha', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Namutebi Daphne', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Mbabazzi Doris Cynthia', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nalubega Geraldine', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
  { "Name" : 'Nalubega Christine', "age" : 33, "email": "nmargeret@gmail.com", "Phone": "0700326481", "Date of birth": "26/04/1982", "Cohort": 2, "Status": "student", "results": {"HTML": " ", "CSS": " ", "JavaScript": " ", "Facilitator Rating":" "}},
]
		
function tabulate(data, columns) {
	var table = d3.select('#student-table').append('table')
	var thead = table.append('thead').append('tr')
	var	tbody = table.append('tbody');

  
	// append the header row
	thead.selectAll('th')
	  .data(columns).enter()
	  .append('th')
	    .text(function (column) { return column; });


	// create a row for each object in the data
	var rows = tbody.selectAll('tr')
	  .data(data)
	  .enter()
	  .append('tr');

	// create a cell in each row for each column
	var cells = rows.selectAll('td')
	  .data(function (row) {
	    return columns.map(function (column) {
	      return {column: column, value: row[column]};
	    });
	  })
	  .enter()
	  .append('td')
	    .text(function (d) { return d.value; });
	
	thead.append("th").text('Results');
	rows.selectAll("td.button")  
	//use a class so you don't re-select the existing <td> elements
          .data(function(d) {return [d];})
          .enter()
            .append("td")
            .attr("class", "button")
			.attr("data-toggle", "modal")
			.attr("data-target", "#studentModal")
            .append("button")
            .text(function(d){return "Edit"})
            // .on("click", function(d){ console.log(d); alert("hello")}); 

	thead.append("th").text('State');
	rows.selectAll("td.button2")  
	//use a class so you don't re-select the existing <td> elements
		.data(function(d) {return [d];})
		.enter()
			.append("td")
			.attr("class", "button2")
			.append("button")
			.text(function(d){return "Inactivate"})
			.on("click", function(d){ console.log(d); alert("helo, student inactivated")}); 

  return table;
}

// render the tabless
tabulate(data, [ "Name", "age", "email", "Phone", "Date of birth", "Cohort", "Status" ]); // table with only date column




