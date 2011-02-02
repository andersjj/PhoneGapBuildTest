/**
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 * @xtype button
 */
Ext.TabStrip = Ext.extend(Ext.Toolbar, {

	dock: 'bottom',
	ui: 'bottomTabBar',
	layout: {
		pack: 'center'
	},
	defaults: {
		ui: "bottomTab",
		xtype:"tabstripbutton",
	},

	lastClickedButton: '',

	tapHandler : function() {
		alert(this.el.dom.innerHTML);
	},

	clickHandler : function() {
        //console.log("here in clickhandler");
		btn_obj = this;
		obj = btn_obj.ownerCt;		
		if (obj.lastClickedButton != "") {
			obj.lastClickedButton.removeCls("x-button-active");
		};
		btn_obj.addCls("x-button-active");
		obj.lastClickedButton = btn_obj;
	},
});
Ext.reg('tabstrip', Ext.TabStrip);


Ext.TabStripButton = Ext.extend(Ext.Button, {
        afterRender : function() {
        	Ext.TabStripButton.superclass.afterRender.call(this);
		this.ownerCt.mon(this.el,"tapstart",this.ownerCt.clickHandler,this);
	},
});
Ext.reg('tabstripbutton', Ext.TabStripButton);



/**
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 * @xtype button
 */
Ext.chevronListItem = Ext.extend(Ext.Button, {

    //ui: "floatBtn",

    /*****
     * Custom method added to my custom button class
     * button class is based on standard button, just added some 
     * functionality to mimic iOS standard UI elements more easily
     */

    cls: "listItem",
    text1: "default1",
    text2: "default2",
    rightImage: "",
    leftImage: "",
    hideImgOnLoad: true,


    getText1 : function() {
    	return this.text1;
    },
    
    getText2 : function() {
    	return this.text2;
    },

    setText1 : function(text) {
    	this.text1 = text;
    },
    
    setText2 : function(text) {
    	this.text2 = text;
        Ext.chevronListItem.superclass.update.call(this,this.getTemplate());
    },

    setText : function() {
    	//alert("here in settext");
	if (this.rendered) {
	
	};	
	
	Ext.chevronListItem.superclass.setText.call(this,this.getTemplate());
    },


    afterRender : function() {
    	Ext.chevronListItem.superclass.afterRender.call(this);
	
	
	if (this.hideImgOnLoad !="") {

		this.hideImg(this.hideImgOnLoad);
    		this.hideImgOnLoad = "";

    	}
   
    	if (this.leftImage == "") {
    		this.hideLeftImg();
    	}
    },

	
    getTemplate : function() {
    	v = "";
    	if (this.leftImage == "") {
    		v = "style='display:none'";
    	}
    
	return 	tpl = "<table ><tr><td align='left'><img " + v + " src='" + this.leftImage + "'></td><td align='left'>" + this.text1 + "</td><td align='right'>" + this.text2 + "</td><td align='right'><img src='" + this.rightImage + "'></td></tr></table>";
    },

    hideLeftImg : function() {
	tdel = Ext.DomQuery.selectNode("span table tr td:nth-child(1)", this.el.dom);
	tdel.style.display = "none";
    },



    hideImg : function(showFlag) {

	img = Ext.DomQuery.selectNode("span table tr td:nth-child(4) img", this.el.dom);
	if (showFlag) { img.style.visibility = "hidden" };
	if (!showFlag) { img.style.visibility = "visible" };

    },
});

Ext.reg('chevronlistitem', Ext.chevronListItem);





Ext.navigationController = Ext.extend(Ext.Panel, {




  curLevel:0,
  captions: null,
  test: "data",
  
  add : function(card) {
  	this.mainPanel.add(card);
  },


  btnBackHandler : function() {
	this.ownerCt.ownerCt.layout.prev({type: 'slide', direction: "right", cover:false,  duration: 500});
  	
  	obj = Ext.getCmp(this.saveId);
	console.log("cur level = " + obj.curLevel);  	
	obj.captions.items.items[obj.curLevel].hide({type: 'slidefade', weightXin: '0.5', weightXout: '0.65', direction: "right", duration: 500});
	obj.captions.items.items[obj.curLevel-1].show({type: 'slidefade', weightXin: '0.5', weightXout: '0.65', direction: "right", duration: 500});
	obj.curLevel -= 1;
	
  },

  
  goBack : function() {
  	console.log("here in go back");
  	console.log(this);
  },
  
  setCard : function(card,animation) {
    
	console.log("here in my setCard");
  	this.mainPanel.setCard(card,animation);

	cur_page = this.mainPanel.getActiveItem();
	
	
	if (card == 0 ) {
		this.captions.items.items[this.curLevel].update(cur_page.pageTitle);
	}
	else {
		
		this.curLevel += 1;
		
		this.captions.items.items[this.curLevel].hide();
		this.captions.items.items[this.curLevel].update(cur_page.pageTitle);

		this.captions.items.items[this.curLevel-1].hide({type: 'slidefade', weightXin: '0.5', weightXout: '0.65', direction: "left", duration: 500});
		this.captions.items.items[this.curLevel].show({type: 'slidefade', weightXin: '0.5', weightXout: '0.65', direction: "left", duration: 500});
		
		console.log("current level = " + this.curLevel);

	}

	
	this.backBtn.setText(cur_page.backBtnTitle);
	this.rightBtn.setText(cur_page.rightBtnTitle);
	


  },

  initComponent : function() {
  

	this.backBtn = new Ext.Button({
		ui: "back",
		handler: this.btnBackHandler,
		saveId: this.id,
	});

	this.rightBtn = new Ext.Button({
	});


	this.captions = new Ext.Container({
		defaults: {cls:"x-toolbar-title",xtype:"component"},
		items:[{},{},{},{},{},{},{},{},{},{}]
	});


	this.toolBar = new Ext.Toolbar({
		dock: "top",
		items: [this.backBtn,this.captions,{xtype:"spacer"},this.rightBtn],
		itemId: "navToolBar",
	});

  	
	this.mainPanel = new Ext.Panel({
		fullscreen:true,
		cls: "peMain",
		dockedItems: [this.toolBar],
		layout:"card",
	});


  	//this.curLevel = 1 * -1;
  	Ext.navigationController.superclass.initComponent.call(this);
  	//this.curLevel = -1;
  
  },



});

Ext.reg('navigationController', Ext.navigationController);










/**
 * @constructor
 * Create a new button
 * @param {Object} config The config object
 * @xtype button
 */
Ext.checkedItemList = Ext.extend(Ext.Panel, {

	cls: "itemList",
	lastClickedItemId: -1,
	lastClickedButton: '',
	changeTap: '',
	isSelectList : false,
	listCaption: "",
	
   	initComponent : function() {

		//this.items.insert
 		Ext.checkedItemList.superclass.initComponent.call(this);
	},
	

	selectItemId : function(idnum) {
		for (i=0;i<this.items.length-1;i++) {
			this.items.get(i).hideImg(true)
			if (i == idnum) { this.items.get(i).hideImg(false); }
		}
	},
	
	clickHandler : function(button,event) {

    /*
		obj = button.ownerCt;
		
		if (obj.isSelectList == true) {
			if (obj.lastClickedButton != '') {
				obj.lastClickedButton.hideImg(true);
			}
			button.hideImg(false);
		}
		
		obj.lastClickedButton = button;
		obj.lastClickedItemId = button.getItemId();
		obj.lastClickedIndex = 	obj.items.indexOf(button);
		
		obj.changeTap(obj,event);
    */
    
	},


        afterRender : function() {
        	Ext.checkedItemList.superclass.afterRender.call(this);

		var listClass = "listItem";
		if (this.listCaption == "") { listClass = "emptyCaption" }

		var captionPanel = new Ext.Panel({
			cls: listClass,
			html: this.listCaption,
		});
		this.items.insert(0,captionPanel);


        	for (i=0;i<this.items.length;i++) {
        		tmpobj = this.items.get(i);
     			tmpobj.handler = this.clickHandler;
     			if (!tmpobj.hideImgOnLoad) {
     				this.lastClickedButton = tmpobj;
				this.lastClickedItemId = tmpobj.getItemId();
     			}
        	}
        },


});

Ext.reg('checkedItemList', Ext.checkedItemList);




Ext.chevronItemList = Ext.extend(Ext.checkedItemList, {


	//changeTap: itemListClick1,
	itemId: "List 1",
	isSelectList: false,
	defaults: {
		xtype: "chevronlistitem",
		rightImage: "chevron.gif",
		text2: "",
		hideImgOnLoad: false,
		leftImage: "",
	},


  	initComponent : function() {

		//this.items.insert
 		Ext.chevronItemList.superclass.initComponent.call(this);
		console.log(this.items.length);
	},





	onAdd :  function (comp) {
		
		//console.log(comp);
		//console.log(comp.ownerCt);
		//comp.setText1("bite me");
	},
	
	
});


Ext.reg('chevronItemList', Ext.chevronItemList);