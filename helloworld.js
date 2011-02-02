Ext.setup({
    onReady: function() {

        var mainPanel = new Ext.Panel({
		fullscreen: true,
		cls: "helloWorld",
		scroll:"vertical",
		layout:"hbox",
        html:"blah blah blah",
        height:200,
            	
        });

     	var toolBar = new Ext.Toolbar({
            //dock: 'top',
            title: "Toolbar",
            items: [{text:"Back", ui:"back"},{xtype:"spacer"},{text:"Info"}],
        });


	




	var tabBar = new Ext.TabStrip({
            items:[
            {text:"Files",icon:'buttonimg.png', badgeText:'2', handler: function(){alert("bite me");} },
            {text:"Featured",icon:'spotlight.png'},
            {text:"Categories",icon:'categories.png'},
            {text:"Top 25",icon:'star.png'},
            {text:"Search",icon:'search.png'},
            ],
	});


	//mainPanel.addDocked(tabBar);
	//mainPanel.addDocked(toolBar);
	mainPanel.doComponentLayout();

	var tapHandler = function(e,t) {
		console.log("click " + e.type);

		 console.log(e);

		cont = draggablePanel;
		activeitem = cont.getActiveItem();
		cardid =  cont.items.indexOf(activeitem);
		if (cardid == 0)  
			cont.setCard(1,{type: 'flip', direction: 'left',  duration: 500})
		else 
			cont.setCard(0,{type: 'flip', direction: 'right', duration: 500})

	};
	

	alert("done");
	
    },
});