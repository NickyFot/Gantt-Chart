example();

function example() {
    var tasks = [];

    var taskStatus = {};
    var url_string = window.location.href;
    var url = new URL(url_string);
    var idx = url.searchParams.get("id");
    var client = url.searchParams.get("client");
    var json_location = "https://storage.googleapis.com/video_extraction/" + client + "/" + idx + ".json"
    d3.json(json_location, function(error, json) {
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
	    else
	    {
	        start_time = 0;
	    }
//	    console.log(json_shot_annotations[i].segments);
//		var role = json[i].values[j]["Role"];
//		var company = json[i].values[j]["Company"];
//		var roleAndCompany = role + "(" + company + ")";
//		var name = json[i]["name"];
        if(!taskNames.includes(label))
        {
            taskNames.push(label);
        }
        var end_time = json_shot_annotations[i].segments[j].segment.end_time_offset.seconds;
        function toDateTime(secs) {
            var t = new Date(null); // Epoch
            t.setSeconds(secs);
            return t;
        }
		tasks.push({
		    "startDate" : toDateTime(start_time),
		    "endDate" : toDateTime(end_time),
		    "taskName" : label,
		    "status" : label
		});
		taskStatus.name = "bar-blue";
	    }
	}
	var format = "d";
	console.log(tasks);
	var gantt = d3.gantt().taskTypes(taskNames).taskStatus(taskStatus).tickFormat(format);
	gantt(tasks);
    });

};

