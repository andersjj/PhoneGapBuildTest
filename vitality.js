
Globals = {}

Globals.mapurl = "";
Globals.secs_since_last_sample = 0;
Globals.calories = 0;
Globals.currentRoute;


route = {
        points: 0,
        point_data: [],
};

totaldist = 0;


function doit() {
    //alert("here");
    //window.scrollTo(0, 0);
}




Ext.setup({

    phoneStartupScreen: 'splash.png',
    icon: 'icon_home.png',
    glossOnIcon: false,
  
  
    onReady: function() {


    localStorage.setItem("route_0",JSON.stringify({"points":2,"point_data":[{"lat":"42.32667","long":"-88.09004"},{"lat":"42.32654","long":"-88.09031"}]}) )
    localStorage.setItem("route_1",JSON.stringify({"points":3,"point_data":[{"lat":"42.32667","long":"-88.09004"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"}]}) )
    localStorage.setItem("route_2",JSON.stringify({"points":4,"point_data":[{"lat":"42.32667","long":"-88.09004"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"}]}) )
    localStorage.setItem("route_3",JSON.stringify({"points":5,"point_data":[{"lat":"42.32667","long":"-88.09004"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"},{"lat":"42.32654","long":"-88.09031"}]}) )
    localStorage.setItem("route_cnt",4);




    var vitid = localStorage.getItem("vitid");
    //alert(vitid);
    var wt = localStorage.getItem("wt");
    var bday = localStorage.getItem("bday");

	Globals.clock_timeout = 0;
	Globals.clock_secs = 0;
	Globals.log_secs = 0;

    if (localStorage.getItem("route_cnt") == null) {
        localStorage.setItem("route_cnt",0)
    }
    
    Globals.route_cnt = parseInt(localStorage.getItem("route_cnt")) + parseInt(0);
    //Globals.route_cnt = 15;

        var logPosition = function() {
            Ext.Ajax.request({
                url: '/dbinsert.asp',
                method:'GET',
                success: function(response, opts) {
                      console.log("logged OK");
                }
            });
        };


	
        var makeAjaxRequest = function() {
            //Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
            Ext.Ajax.request({
                url: 'help.html',
                method:'GET',
                success: function(response, opts) {
                      console.log("got it");
                      console.log(response.responseText);
                    //Ext.getCmp('content').update(response.responseText);
                    //Ext.getCmp('status').setTitle('Static test.json file loaded');
                    //Ext.getBody().unmask();
                    helpPanel.update(response.responseText);
                }
            });
        };


        var mainPanel = new Ext.Panel({
		fullscreen: true,
		cls: "helloWorld",
		scroll:"vertical",
		layout:"card",
        });


	var helpPanel = new Ext.Panel({
		contentEl:"helpHTML",
		cls:"helpPanel",
		scroll:"vertical",
	})


	var onListTap = function(btn, e) {
		//console.log("tappy tappy");
		//console.log(btn.itemId);

		if (btn.itemId == 10) {
			mainPanel.setActiveItem(setVitalityId,{type: 'slide', direction: 'left', cover: false, easing: 'ease-in', duration: 300}); 	
            toolBar.setTitle('Vitality ID');
            saveButton.hide();
			toolBar.items.items[0].show({type:"fade"});
			console.log("after show");
            
             
            
            
            
            
            
            
            
            
            
		}

		if (btn.itemId == 22) {
			mainPanel.setActiveItem(setBirthDay,{type: 'slide', direction: 'left', cover: false, easing: 'ease-in', duration: 300}); 	
            toolBar.setTitle('Birthday');
            saveButton.hide();
			toolBar.items.items[0].show({type:"fade"});
			console.log("after show");
		}
	
		if (btn.itemId == 21) {
			mainPanel.setActiveItem(setWeight,{type: 'slide', direction: 'left', cover: false, easing: 'ease-in', duration: 300}); 	
            toolBar.setTitle('Weight');
            saveButton.hide();
			toolBar.items.items[0].show({type:"fade"});
			console.log("after show");
            
		}

    
    }

   

	var setVitalityId = new Ext.chevronItemList({
		items: [
			{itemId:4, text1:"Existing ID", cls:"listTitle", rightImage:"blank.gif"},
			{itemId:5, text1:"<input  onFocus=doit() type='number' id='vitid' name='vitid' value='" + vitid + "'>", cls:"listItem lastItem firstItem", rightImage:"blank.gif", handler:onListTap},

		]
	});

	var setBirthDay = new Ext.chevronItemList({
		items: [
			{text1:"Birthday", cls:"listTitle", rightImage:"blank.gif"},
			{text1:"<input  onFocus=doit() type='number' id='bday' name='bday' value='" + localStorage.getItem("bday") + "'>", cls:"listItem lastItem firstItem", rightImage:"blank.gif", handler:onListTap},

		]
	});

	var setWeight = new Ext.chevronItemList({
		items: [
			{text1:"Weight", cls:"listTitle", rightImage:"blank.gif"},
			{text1:"<input type='number' id='wt' name='wt' value='" + localStorage.getItem("wt") + "'>", cls:"listItem lastItem firstItem", rightImage:"blank.gif", handler:onListTap},
		]
	});



    var kp_row1 = new Ext.Panel({
        layout:"hbox",
        items:[{text:"1"},{text:"2"},{text:"3"}]
    
    })

    var keypad = new Ext.Panel({
        layout:"vbox",
        items:[kp_row1]
    
    })



	var segmentedButton = new Ext.SegmentedButton({
	    allowMultiple: false,
	    cls:"vit_record_multiselect",
	    items: [
			{text: 'Run'},
			{text: 'Walk'},
			{text: 'Bike'}
	    	   ],
	});


	var formatSecs = function(secs) {
		console.log(secs);
		h = 0; m = 0; s = 0;
		h = parseInt(secs/3600);
		if (h < 10) { h = "0" + h };
		secs = secs - (h*3600);
		m = parseInt(secs/60);
		if (m < 10) { m = "0" + m };
		secs = secs - (m*60);
		s = secs;		
		if (s < 10) { s = "0" + s };

		return h + ":" + m + ":" + s
	
	}



	var runTimer = function() {
	
	
		if (Globals.clock_timeout != 0) {

			Globals.log_secs += 1;
            Globals.secs_since_last_sample += 1;
            
			if (Globals.log_secs == 15) {
				Globals.log_secs = 0;
				//logPosition();
			}

			//tabBar.items.items[0].setBadge(" ");
			Globals.clock_secs += 1;
			recordBox.items.items[1].update(formatSecs(Globals.clock_secs));
			Globals.clock_timeout = setTimeout(runTimer,1000);
		}
	}


       var registerVitalityID = function() {
       
            //alert("here in register");
       
       
            vitid = localStorage.getItem("vitid");
			bday = localStorage.getItem("bday")
		   
			var xhReq = new XMLHttpRequest();
			//alert(xhReq);
			xhReq.open("POST", "https://integration.powerofvitality.com/rest/iphoneApp/register", false);
			xhReq.send("<registration_request><vitality_id>" + vitid + "</vitality_id><submission_time></submission_time><date_of_birth>" + bday + "</date_of_birth><partner_id>8</partner_id></registration_request>");
			var serverResponse = xhReq.responseText;
			//alert(serverResponse); // Shows "15"

		  
			resp = xml2json.parser(serverResponse);
		  
		  if (resp.registration_response.status == "Failure") {
			alert(resp.registration_response.error_description);
		  }
		  
		  
		  
		  //if (registration_response.status == "Failure") {
		//	alert(registration_response.error_description);
		 // }
		  
		  
		  
		  
            //wt = localStorage.getItem("wt");
       
            //wt = document.getElementById("wt").value;
            //localStorage.setItem("wt",wt);
            
       
/*       
            //Ext.getBody().mask(false, '<div class="demos-loading">Loading&hellip;</div>');
            Ext.Ajax.request({
                //url: 'https://integration.powerofvitality.com/rest/iphoneApp/register',
				//url:'http://myoce.oceusa.com/iptest/testit.asp',
				//url: 'reg_vitality_id.asp?vitid=' + vitid + '&wt=' + wt + '&dob=1971-01-17',
                //url: 'http://www.google.com',
                method:'GET',
				//params:{data:'<registration_request><vitality_id></vitality_id><submission_time></submission_time><date_of_birth></date_of_birth><partner_id>8</partner_id></registration_request>'},
				params:{'<registration_request><vitality_id></vitality_id><submission_time></submission_time><date_of_birth></date_of_birth><partner_id>8</partner_id></registration_request>'},
				failure: function(response, opts) {
                    alert('got a failure');
                    debug.log(response);
                
                },
                success: function(response, opts) {
                      alert('got it');
                      alert(response.responseText);
					  
					  debug.log(response.responseText);
							 
							 
                      resp = xml2json.parser(response.responseText);

                      console.log(resp);
                      
                      if (resp.registration_response.error_description > "") {
                        alert(resp.registration_response.error_description);
                      }
                      
							 //debug.log(resp);
                      
                      
                    //Ext.getCmp('content').update(response.responseText);
                    //Ext.getCmp('status').setTitle('Static test.json file loaded');
                    //Ext.getBody().unmask();
                    //helpPanel.update(response.responseText);
                }
            });

 
 */
 
 
	};




    var saveClick = function(b,e) {
        //alert("Saving Information");
        
        //localStorage.setItem("vitid",document.getElementById('vitid').value);
        //localStorage.setItem("weight",document.getElementById('wt').value);
        //localStorage.setItem("bday",document.getElementById('bday').value);
        
        registerVitalityID();
    };
    
    
    var calcCalories = function(mph) {
    
    
        //alert("here in calc calories");
        //alert(Globals.calories);
        
        //alert("here in calories");
        //alert(mph);
        
        mode_id = segmentedButton.getPressed()
        
        if (mode_id != null) {
            //alert(mode_id.text);

            mph = parseFloat(mph)

            if (mode_id.text == "Run") {
                if ((mph>=5) && (mph<5.2)) { retval = .064 }
                if ((mph>=5.2) && (mph<6)) { retval = .072 }
                if ((mph>=6) && (mph<6.7)) { retval = .080 }
                if ((mph>=6.7) && (mph<7.5)) { retval = .088 }
                if ((mph>=7.5) && (mph<8.6)) { retval = .100 }
                if ((mph>=8.6) && (mph<10)) { retval = .116 }
                if ((mph>=8.6) && (mph<10)) { retval = .116 }
                if (mph>10) { retval = .132 }
            }

            if (mode_id.text == "Walk") {
                if ((mph>=3.5) && (mph<4.0)) { retval = .032 }
                if ((mph>=4.0) && (mph<4.5)) { retval = .036 }
                if ((mph>=4.5) ) { retval = .040 }
            }
            
            if (mode_id.text == "Bike") {
                if ((mph>=12) && (mph<14)) { retval = .064 }
                if ((mph>=14) && (mph<16)) { retval = .080 }
                if ((mph>=16) ) { retval = .090 }
            }


        }
        
        
        //retval = .050;
        alert("weight = " + wt);
        
        
        cal = parseFloat(wt) * (parseFloat(Globals.secs_since_last_sample)/parseFloat(60)) * parseFloat(retval);
        
        alert("calories = " + cal);
        
        Globals.calories = parseInt(Globals.calories) + parseInt(10);
        
        //alert("after calc");
        recordListOptions.items.items[3].setText2(Globals.calories);
        //alert("after set");
        
        //if (mode == "Run") {
        //    if (MPH => 5 && MPH <= 
        //}
    
        //alert("end of calories");

    
    };
    
    var successFunc = function(position) {

	//alert(position.coords.accuracy);
	
    //console.log(recordListOptions.items.items[4]);
    //alert(position.coords.accuracy);
    
    
    recordListOptions.items.items[4].setText2(position.coords.accuracy + " - " + Globals.secs_since_last_sample);
    
    //alert("after set");

    //consloe.log(Globals.secs_since_last_sample);
    
    //alert(   (parseInt(Globals.secs_since_last_sample) > parseInt(10))    );
    

	if ( (parseInt(position.coords.accuracy) < parseInt(200)) && (parseInt(Globals.secs_since_last_sample) > parseInt(10)) ) {	
		if(Globals.clock_timeout != 0) {
            //alert("loggina  point");
		    
	    tabBar.items.items[0].setBadge(route.points);
        alert("logged a point");
            
                
                    
                            
            lat = parseFloat(position.coords.latitude);
            lat = lat.toFixed(5);
            long = parseFloat(position.coords.longitude);
            long = long.toFixed(5);
            
            route.point_data[route.points] = {lat:lat,long:long};
            Globals.secs_since_last_sample = 0;
            
            // we need to calculate calories, distance and MPH here
            
			
            if (parseInt(route.points) > parseInt(0)) {
                
                //alert("inside loop");
                last_lat = Geo.parseDMS(route.point_data[route.points-1].lat);
                last_long = Geo.parseDMS(route.point_data[route.points-1].long);

                //alert(route.points);
                //alert(position.coords.speed);
            
                var p1 = new LatLon(parseFloat(last_lat),parseFloat(last_long));
                var p2 = new LatLon(parseFloat(lat),parseFloat(long));

                //alert("here 2");
                dist = p1.distanceTo(p2);    
                //alert("after distance");    
            	totaldist = parseFloat(totaldist) + parseFloat(dist);
                //alert(dist + " " + totaldist);
                miles = parseFloat(totaldist)
                recordListOptions.items.items[1].setText2( miles.toFixed(3) + " miles");
                MPH = parseFloat(position.coords.speed) * parseFloat(2.23693629);
                
                calcCalories(MPH);
                
                recordListOptions.items.items[2].setText2( MPH.toFixed(2) + " MPH");
                
                currentSpeed = (parseFloat(dist) / Globals.clock_secs);
            
            }
            
            route.points += 1;
            
            
		    //setTimeout(getCurrentLocation,10000);
		}
	} else {
		//setTimeout(getCurrentLocation,1000);
	}


    };
    
    var failureFunc = function(positionError) {
    
    };
    
    var getCurrentLocation = function() {
        //navigator.geolocation.getCurrentPosition(successFunc,failureFunc,{maximumAge:5000,enableHighAccuracy:true});
        
        navigator.geolocation.watchPosition(successFunc,failureFunc,{maximumAge:5000,enableHighAccuracy:true});

        console.log("requesting geo location...");
    };
    
    
    
	var recButtonClick = function(b,e) {
	

		if (b.el.dom.className.indexOf("recMode") == -1) {
			b.removeCls("stopMode");
			b.addCls("recMode");
			tabBar.items.items[0].setBadge("0");
            
            localStorage.setItem("route_" + Globals.route_cnt,JSON.stringify(route));
            
            //alert(localStorage.getItem("route_" + Globals.route_cnt));
            
            
            //alert("after route data save");
            
            
            //alert("route_" + Globals.route_cnt);
            clearTimeout(Globals.clock_timeout);
            // save course info here

            
            Globals.route_cnt += 1;
            localStorage.setItem("route_cnt",Globals.route_cnt);
            
            Globals.clock_timeout = 0;
		
        
        } else {
			b.removeCls("recMode");
			b.addCls("stopMode");
			Globals.clock_timeout = setTimeout(runTimer,1000);
			console.log("starting timer " + Globals.clock_timeout);
            
            getCurrentLocation();
			
		}
		
	}

	var recordBox = new Ext.Panel({
		cls: "vit_recordBox",

		items:[		
			{
				xtype:"button", 
				cls:"recControl recMode",
				height:65,
				handler:recButtonClick,
			},
			{
				cls:"recTimer", 
				html:"00:00:00"
			}
		      ],

		layout:"hbox"
	});


	var recordListOptions = new Ext.chevronItemList({

		cls:"reclist",
		items: [	{itemId:0, text1:"Distance", text2:"0.000 miles",  cls:"listItem firstItem", rightImage:"blank.gif"},
				{itemId:1, text1:"Current Speed", text2:"0.00 MPH", cls:"listItem ", rightImage:"blank.gif"},
				{itemId:2, text1:"Calories", text2:"0", cls:"listItem", rightImage:"blank.gif"},
				{itemId:3, text1:"Accuracy", text2:"0", cls:"listItem lastItem", rightImage:"blank.gif"},

			]
	});


	var recordBtns1 = new Ext.Panel ({
		cls:"recordBtns1",
		layout:{type:"hbox",pack:"center",},
		items:[	{cls:"btnSubmit", xtype:"button",text:"Submit"},
			{cls:"btnReset", xtype:"button",text:"Reset"}],
	})




	var recordPanel = new Ext.Panel({
		scroll:"none",
		items:[segmentedButton,recordBox, recordListOptions,recordBtns1],
	
	});



    
    
    if ((wt == null) || (wt=="null")) {
        wt = "";
    }
    
    if (bday == null || (bday=="null") ) {
        bday = ""
    };
    //alert(wt);
    
    

	var settingsItems = new Ext.chevronItemList({
		items: [	
                {itemId:0, text1:"Account Information", cls:"listTitle", rightImage:"blank.gif"},
				{itemId:10, text1:"Vitality ID", cls:"listItem lastItem firstItem", text2:vitid, rightImage:"icon_options.png", handler:onListTap},
                {itemId:2, text1:"Personal Information", cls:"listTitle", rightImage:"blank.gif"},
				
                
                {itemId:21, text1:"Weight", cls:"listItem  firstItem", text2:localStorage.getItem("wt"), handler:onListTap,  rightImage:"icon_options.png" },
                {itemId:22, text1:"Birthday", cls:"listItem  lastItem", text2:localStorage.getItem("bday"), handler:onListTap, rightImage:"icon_options.png" },
                
                {itemId:4, cls:"listTitle", text1:"", rightImage:"blank.gif"},
                {itemId:5, cls:"listTitle", text1:"",  rightImage:"blank.gif"},
                ],

	});
    
    
   //var settingsItems = new Ext.chevronItemList({
   // 	//cls:"historyItems",
   //	scroll:"vertical",
   // 	height:370
   // });

    //settingsItems.add({itemID:1,  text1:"Vitality ID", cls:"listItem lastItem firstItem", rightImage:"icon_options.png", handler:function(){alert("click")}  });
	settingsItems.doComponentLayout();
    





	//settingsItems.on({
	//	tap: onListTap,
	//});

    var cancelClick = function() {


        //alert(toolBar.title);
        
        if (toolBar.title == "Route Details") {
            mapCancelClick();
            cancelButton.hide();
        }
        else {
            anim = {type: 'slide', direction: 'right', cover: false, easing: 'ease-in', duration: 300}
            mainPanel.setActiveItem(settingsPane,anim); 
            mainPanel.doComponentLayout();
            toolBar.setTitle("Settings");
            toolBar.items.items[0].hide({type:"fade"});
            saveButton.show();
            //alert(document.getElementById('vitid').value);
            
            
            if (document.getElementById('vitid') != null) {
                settingsItems.items.items[2].setText2(document.getElementById('vitid').value);
                localStorage.setItem("vitid",document.getElementById('vitid').value);
            }

            //alert(document.getElementById('vitid').value)
            //document.getElementById('vitid').blur();
            
            if (document.getElementById('bday') != null) {
                //alert("bday = " + document.getElementById('bday').value);
                localStorage.setItem("bday", document.getElementById('bday').value)
                settingsItems.items.items[5].setText2(document.getElementById('bday').value);
                //document.getElementById('bday').blur();

            }
        
            if (document.getElementById('wt') != null) {
                //alert("here in wt");
                //alert("wt = " + document.getElementById('wt').value);
                localStorage.setItem("wt", document.getElementById('wt').value);
                settingsItems.items.items[4].setText2(document.getElementById('wt').value);
                document.getElementById('wt').style.visibility = "hidden";
                //alert("after disp");
            
            }
        
            //localStorage.setItem("bday",document.getElementById('bday').value);
            //localStorage.setItem("wt",document.getElementById('wt').value);
        
            
        
        
        } 
        



    };

	var settingsPane = new Ext.Panel({  
	})
    settingsPane.add(settingsItems);
    
    

    var historyItems = new Ext.chevronItemList({
    	cls:"historyItems",
    	scroll:"vertical",
    	height:370
    });

	var historyPane = new Ext.Panel({
		//html:"history items to be added here"
		scroll:"none",
	});
    
    
    historyPane.add(historyItems);
    //historyPane.add(settingsItems);
    


    var routeMap = new Ext.Panel({
        cls:"routeMap",
        width:320,
        height:320,
    })
    
    
    var mapCancelClick = function(btn,evt) {
        mainPanel.setActiveItem(historyPane,{type: 'slide', direction: 'right', cover: false, easing: 'ease-in', duration: 300});
        toolBar.setTitle("History");  
    };
    
    var urlPanel = new Ext.Panel({
        html:"<textarea id='mapurl'>abcde</textarea>",
    });
    
    var paddingPanel = new Ext.Panel({
        height:50
    });
    
    
    
    var mapDeleteRouteCallBack = function(text) {
        
        if (text == "yes") {

            //alert(Globals.currentRoute);
            //alert(localStorage.getItem("route_cnt"));
            //rts = localStorage.getItem("route_cnt");
            //cur_rte = Globals.currentRoute;
            
            if (localStorage.getItem("route_cnt") == Globals.currentRoute) {
            //    //localStorage.setItem("route_cnt",parseInt(localStorage.getItem("route_cnt") - parseInt(1));
            //    alert("do something here");
            } 
            else {
                for (i=Globals.currentRoute;i<(localStorage.getItem("route_cnt")-1 );i++) {
                    //alert(i);
                    var rnum = parseInt(i) + parseInt(1);
                    localStorage.setItem("route_" + i,localStorage.getItem("route_" + rnum))   ;
                }
            }
             
            Globals.route_cnt -= 1;
            localStorage.setItem("route_cnt",Globals.route_cnt);
            showHistory();
        

        
        }
    }


    var mapDeleteRoute = function() {
        //alert("are you sure you want to delete");
        Ext.Msg.confirm("Confirmation", "Are you sure you want to do that?", mapDeleteRouteCallBack);
    };

    var mapUploadRoute = function() {
    
		  //alert("here in upload");
		  
		  vitid = localStorage.getItem("vitid");
		  bday = localStorage.getItem("bday")
		  
		  var xhReq = new XMLHttpRequest();
		  xhReq.open("POST", "https://integration.powerofvitality.com/rest/iphoneApp/submitActivity", false);
		  xmldata = "<submit_activity_request><member_entity_no>" + vitid + "</member_entity_no><distance></distance><steps></steps><pace></pace><total_duration></total_duration><calories></calories><submission_time></submission_time><activity_type></activity_type></submit_activity_request>"
		  xhReq.send(xmldata);
		  
		  var serverResponse = xhReq.responseText;
		  
		  //alert(serverResponse);
		  //debug.log(xml2json.parser(serverResponse,"","compact"));
		  
		  resp = xml2json.parser(serverResponse);
		  
		  
		  if (resp.submit_activity_response.status == "Failed") {
			alert(resp.submit_activity_response.error_description);
		  }
    };
    


		  
	var mapPane = new Ext.Panel({
        scroll:"vertical",
        cls:"mapPane",
        items: [routeMap,
                {xtype:"button",text:"Delete Route",width:"200", cls:"mapCancel", handler:mapDeleteRoute},
                {xtype:"button",text:"Upload Route",width:"200", cls:"mapCancel", handler:mapUploadRoute},
                //urlPanel,
                paddingPanel
        ]
    });
    
    
    var cancelButton = new Ext.Button({
        text: "Back",
        handler: cancelClick,
    });
    var saveButton = new Ext.Button({
        text: "Save",
        handler: saveClick,
    });


     	var toolBar = new Ext.Toolbar({
            dock: "top",
            title: "Vitality",
            items: [    cancelButton,
                        {xtype:"spacer"},
                        saveButton
                        ],

        });

	
    
    var historyItemsHandler = function(btn, e) {
        //alert("here in history handler");
        //alert(btn.routeId);
        
        mainPanel.setActiveItem(mapPane,{type: 'slide', direction: 'left', cover: false, easing: 'ease-in', duration: 300});
      
        
        //alert("route_" + btn.routeId);
        
        route_data = JSON.parse(localStorage.getItem("route_" + btn.routeId));
        Globals.currentRoute = btn.routeId;
        //alert(route_data.point_data[1].lat);
        
        //alert(route_data.points);
        
        
        //mapurl = "http://maps.google.com/maps/api/staticmap?center=" + route_data.point_data[1].lat + "," + route_data.point_data[1].long + "&zoom=14&size=280x280&sensor=true"
        
        
        Globals.mapurl = "http://maps.google.com/maps/api/staticmap?size=320x320&path=color:0x0000ff|weight:5"
        coords = "";
        
        for (i=1;i<route_data.points;i+=1) {
            //alert("working on a point");
            //alert( route_data.point_data[i].long);
            
            //alert(route_data.point_data[i].lat + "," & route_data.point_data[i].long + "|");
            
            //alert(Globals.mapurl);
            coords += "|" + route_data.point_data[i].lat + "," + route_data.point_data[i].long
            
            //if (i < route_data.points-1) {
            //    coords += "|";
            //}
            
        }
        
        coords += "&sensor=true";
        
        Globals.mapurl = Globals.mapurl + coords;
        
        //alert(Globals.mapurl);
        //Globals.mapurl += "&sensor=true"
        
        console.log(Globals.mapurl);
        
        routeMap.update("<img src='" + Globals.mapurl + "'>");  
        toolBar.setTitle("Route Details")
        cancelButton.show();
        


    };


    var showHistory = function() {
            mainPanel.setActiveItem(historyPane); 
            toolBar.setTitle("History"); 
            //alert(Globals.route_cnt);
            //historyItems.add({text1:"hi there"});
            //historyItems.refresh();
            
            historyItems.removeAll();
                       
            
            for (i=0;i<Globals.route_cnt;i+=1) {

                    var clsdata = "";
                    if (i==0)           { clsdata = "historyFirst firstItem listItem" }
                    if ((i>0) && (i<Globals.route_cnt))  {clsdata = "listItem" }
                    if (i==Globals.route_cnt-1)           { clsdata = "listItem lastItem historyLast" }
                    if (Globals.route_cnt == 1) {clsdata = "listItem lastItem historyFirst historyLast" }
                    itmId = "routeId_" + parseInt(i);
                    historyItems.add({itemID:itmId,  routeId:i, text1:"Route " + i , cls:clsdata, rightImage:"icon_options.png", handler:historyItemsHandler  });

            }
            
            //historyItems.add({itemID:200,text1:"bite me", cls:"firstItem listItem", rightImage:"icon_options.png", handler:function(){alert("bite me"); } });
            //historyItems.add({itemID:201,text1:"bite me", cls:"listItem", rightImage:"icon_options.png"});
            //alert(historyItems.items.length);
            historyItems.doComponentLayout();
            //alert("after history add");
    
    
    }


	var tabHandler = function(t,e) {

		console.log(t.itemId);
		saveButton.hide();
		
		if ( (mainPanel.dockedItems.length ==1) && (t.itemId != 0)) {
			mainPanel.addDocked(toolBar);
		}
		
        
        
		if (t.itemId == 0) { 
            mainPanel.setActiveItem(recordPanel); 
            mainPanel.removeDocked(toolBar,false); 


            //transMode = segmentedButton.getActiveItem();
            console.log(segmentedButton.getPressed().text);

            
        }
		
        if (t.itemId == 1) { 
        
            /*
            mainPanel.setActiveItem(historyPane); 
            toolBar.setTitle("History"); 
            //alert(Globals.route_cnt);
        
            //historyItems.add({text1:"hi there"});
            //historyItems.refresh();
            
            historyItems.removeAll();
                       
            
            for (i=0;i<Globals.route_cnt;i+=1) {
            
            
                    var clsdata = "";
                    
                    if (i==0)           { clsdata = "historyFirst firstItem listItem" }
                    if ((i>0) && (i<Globals.route_cnt))  {clsdata = "listItem" }
                    if (i==Globals.route_cnt-1)           { clsdata = "listItem lastItem historyLast" }
                    
                    if (Globals.route_cnt == 1) {clsdata = "listItem lastItem historyFirst historyLast" }
                    
                    
                    itmId = "routeId_" + parseInt(i);
                    historyItems.add({itemID:itmId,  routeId:i, text1:"Route " + i , cls:clsdata, rightImage:"icon_options.png", handler:historyItemsHandler  });
                    
            
            
            }
            
            //historyItems.add({itemID:200,text1:"bite me", cls:"firstItem listItem", rightImage:"icon_options.png", handler:function(){alert("bite me"); } });
            //historyItems.add({itemID:201,text1:"bite me", cls:"listItem", rightImage:"icon_options.png"});
             
            //alert(historyItems.items.length);
            historyItems.doComponentLayout();
            //alert("after history add");
            */
            showHistory();
            
        
        }
		
        if (t.itemId == 2) { 
            saveButton.show();
            mainPanel.setActiveItem(settingsPane); toolBar.setTitle("Settings")
            
            }
		if (t.itemId == 3) { 
			makeAjaxRequest();
			mainPanel.setActiveItem(helpPanel); 
			toolBar.setTitle("Help") 
			}


	}


	var tabBar = new Ext.TabStrip({
            items:[
            {itemId: 0, text:"Record",icon:'record.gif' ,  handler: tabHandler},
            {itemId: 1, text:"History",icon:'cal.gif', handler: tabHandler},
            {itemId: 2, text:"Settings",icon:'settings.gif', handler: tabHandler},
            {itemId: 3, text:"Help",icon:'help.gif', handler: tabHandler},
            ],
	});
    
    
       
    
	mainPanel.addDocked(tabBar);
	mainPanel.addDocked(toolBar);
	mainPanel.doComponentLayout();


	cancelButton.hide();
	saveButton.hide();
    
    
    
    
    toolBar.setTitle("Vitality App");
	
    },
});