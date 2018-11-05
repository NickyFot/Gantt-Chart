example();

function example() {
    var tasks = [];

    var taskStatus = {};
    d3.json("https://storage.googleapis.com/video_extraction/Saxo%20Bank/-KsDmIRJ70o.json", function(error, json) {
	if (error)
	    return console.warn(error);
	var taskNames = [];
//	console.log(json.annotation_results[0].shot_label_annotations);
	var json_shot_annotations = json.annotation_results[0].shot_label_annotations;
	for ( var i = 0; i < json_shot_annotations.length; i++) {
	    for ( var j = 0; j < json_shot_annotations[i].segments.length; j++) {
	    var label = json_shot_annotations[i].entity.description;
	    var start_time = 0;
	    if (json_shot_annotations[i].segments[j].segment["start_time_offset"].hasOwnProperty("seconds"))
	    {
	        start_time = json_shot_annotations[i].segments[j].segment.start_time_offset.seconds;
	    }
//	    console.log(json_shot_annotations[i].segments);
//		var role = json[i].values[j]["Role"];
//		var company = json[i].values[j]["Company"];
//		var roleAndCompany = role + "(" + company + ")";
//		var name = json[i]["name"];
		taskNames.push(label);
		tasks.push({
		    "startDate" : start_time,
		    "endDate" : json_shot_annotations[i].segments[j].segment.end_time_offset.seconds,
		    "taskName" : label,
		    "status" : label
		});
		taskStatus.name = "bar-blue";
	    }
	}
	var format = "%b-%e-%y";
	var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
	gantt(tasks);
    });

};

