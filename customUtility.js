function serialize(obj,lvl)
{  
	
	//console.log("level = " + lvl);
	spc = "                                            ";
	
	console.log("type = " + obj.defaultType);
	
	for (attr in obj) {
	

		outval = "";		
		ot = typeof(obj[attr]);

		if (ot == "function") {
			outval = "function";				
		}
		
		if (ot == "string") {
			outval = obj[attr];
		}
		
		if (ot == "boolean") {
			outval = obj[attr];
		} 
		
		if (ot == "object") {
			outval = "object";
		}


		if (ot == "number") {
			outval = obj[attr];
		}


		if (obj.hasOwnProperty(attr) == true) {
			
			console.log (spc.substring(0,(lvl*3)) + lvl + ":" + attr + "(" + ot + ") = " + outval);

			if ((ot == "object") && lvl < 2 ) {
				serialize(obj[attr],lvl+1);
			}
		}
	}

}