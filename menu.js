  var xmlHttp;
  var debug = 1;
  var basicClass ="";
  var basicColor = "";
  var blocker = true;
  var possible=false;
  var previousX=0;
  var previousY=0;
  var JSversion = "js.v1";
  var modalWindowsCount = 0;
  var boxCount = 0;
  //var nodeOpenedPath = '../images/nodeOpened.gif';
  //var nodeClosedPath = '../images/nodeClosed.gif';
  //var nodeEmptyPath = '../images/nodeEmpty.gif';
  //var branchPath = '../images/branch.gif';
  var nodeOpenedPath = './images/nodeOpened.gif';
  var nodeClosedPath = './images/nodeClosed.gif';
  var nodeEmptyPath = './images/nodeEmpty.gif';
  var branchPath = './images/branch.gif';   
  
  try
    {
    // Firefox, Opera 8.0+, Safari
    xmlHttp=new XMLHttpRequest();
    xmlDoc=document.implementation.createDocument("","",null);
    browser = 1;
    }
  catch (e)
    {
    // Internet Explorer
    try
      {
      xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
	  xmlDoc.async="false";
      }
    catch (e)
      {
      try
        {
        xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async="false";
        }
      catch (e)
        {
        alert("Your browser does not support AJAX!");
        }
      }
    }
function getData(dataSource, divID) {
	if (xmlHttp) {
		var obj = document.getElementById(divID);
		xmlHttp.open("GET", dataSource);
		xmlHttp.onreadystatechange = function() {
			if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				obj.innerHTML = xmlHttp.responseText;
			}
		}
		xmlHttp.send(null);
	}
}    
function addElement(elementHeader){
	var mainDiv = document.getElementById('mainDiv');
	var numi = document.getElementById('divCount');
	var num = (document.getElementById("divCount").value -1)+ 2;
	numi.value = num;
	var divIdName = "Div_"+num;
	var newDiv = document.createElement('div');
	mainDiv.innerHTML = mainDiv.innerHTML +'<div id=\'inner_div_'+divIdName+'\' onMouseOver="javascript:glow(\'inner_div_'+divIdName+'\');" onMouseOut="javascript:unGlow(\'inner_div_'+divIdName+'\');" class=\'rootNode\' onClick="javascript:showHideDiv(\''+divIdName+'\');" align=left valign=top><img src=\'../images/nodeEmpty.gif\' border=0 id="image_'+divIdName+'">&nbsp;'+elementHeader+'</div>';
	newDiv.setAttribute('id',divIdName);
	newDiv.setAttribute('name',divIdName);
	newDiv.setAttribute('style','display:none;');
	try {
  	  newDiv.style.display="none";
  	} catch (e) {
  	  
  	}
	
	mainDiv.appendChild(newDiv);
	return newDiv;
}
function addRow(theDiv,row){
	    divName = theDiv.id;
		theImage = document.getElementById('image_'+divName);
		if (theImage.src.indexOf('nodeEmpty.gif')>0){theImage.src=nodeClosedPath;}
		var numi = document.getElementById('divCount');
		var num = (document.getElementById("divCount").value -1)+ 2;
		numi.value = num;
		theDiv.innerHTML = theDiv.innerHTML + '<div id=\'row_'+num+'\' onMouseOver="javascript:glow(\'row_'+num+'\');" onMouseOut="javascript:unGlow(\'row_'+num+'\');" valign=\'middle\' align=\'left\' class=\'menuNode\'><img src=\''+branchPath+'\'>&nbsp;'+row+'<div>';
}
function loadXML(xmlFile){
	xmlDoc.async=false;
	xmlDoc.load(xmlFile);

	var x=xmlDoc.documentElement;
	var y=xmlDoc.documentElement.childNodes;
	var _class = "";
	var _url = "";
	var _text = "";
	var _target ="";
    var nestedNodes = new Array(0);
	var _nodeRepresentation_ = "";
	for (i=0;i<y.length;i++)
  	{
  	if (y[i].nodeType!=3)
    	{
    		for (z=0;z<y[i].childNodes.length;z++)
      		{
      			if (y[i].childNodes[z].nodeType!=3)
        			{        		
        				
        				switch (y[i].childNodes[z].nodeName){
        					case 'cssClass': _class = y[i].childNodes[z].childNodes[0].nodeValue; break
        					case 'target': _target = y[i].childNodes[z].childNodes[0].nodeValue; break
        					case 'url': try {_url = y[i].childNodes[z].childNodes[0].nodeValue;} catch(e){_url="";} break
        					case 'text': _text = y[i].childNodes[z].childNodes[0].nodeValue; break
        				}
        				if (_url==""){
        					_rootNode_=_text;
        				} else {
							_rootNode_='<a onClick="javascript:showStatus(\'statusDialog\',\'\');" class=\'menuItem\' href=\''+_url+'\' target=\''+_target+'\' class=\''+_class+'\'>'+_text+'</a>';
						}
    					if (y[i].childNodes[z].childNodes.length>1) {      				
    						
    						_class_ = "";
							_url_ = "";
							_text_ = "";
							_target_ = "";
							
    						for (j=0;j<y[i].childNodes[z].childNodes.length;j++){
    							if (y[i].childNodes[z].childNodes[j].nodeType!=3){
    								
		        					switch (y[i].childNodes[z].childNodes[j].nodeName){
        								case 'cssClass': _class_ = y[i].childNodes[z].childNodes[j].childNodes[0].nodeValue; break
        								case 'target': _target_ = y[i].childNodes[z].childNodes[j].childNodes[0].nodeValue; break
        								case 'url': _url_ = y[i].childNodes[z].childNodes[j].childNodes[0].nodeValue; break
        								case 'text': _text_ = y[i].childNodes[z].childNodes[j].childNodes[0].nodeValue; break
        							}
		    					    
		    					}
    						}
				      		nestedNodes.push('<a onClick="javascript:showStatus(\'statusDialog\',\'\');"  class=\'menuItem\' href=\''+_url_+'\' target=\''+_target_+'\' class=\''+_class_+'\'>'+_text_+'</a>');
    					}
        			}
      		}
      		var _nodeRepresentation_ = "";
			var theDiv = addElement(_rootNode_);
			_rootNode_="";

      		for (j=0;j<nestedNodes.length;j++){
	      		addRow(theDiv,nestedNodes[j]);
      		}
      		nestedNodes = new Array(0);
			_class = "";
			_url = "";
			_text = "";
    	}
  }
  return false;
}  
function showHideDiv(divName){
	var theDiv = document.getElementById(divName);
	var theImage = document.getElementById('image_'+divName);
	if (theImage.src.indexOf('nodeEmpty.gif')>0) return;
	if (blocker&&theDiv.style.display == 'none'){
		theDiv.style.display = 'block'; 
		theImage.src=nodeOpenedPath;
	} else if (blocker) {
		theDiv.style.display = 'none'; 
		theImage.src=nodeClosedPath;
	}; 
}
function glow(divName){
	var theDiv = document.getElementById(divName);
	basicClass = theDiv.getAttribute('class');
	if (basicClass===null){
		basicClass = theDiv.getAttribute('className');
	}
	if (divName.indexOf('row_')>=0){
		theDiv.setAttribute('class','selectedRow');
		theDiv.setAttribute('className','selectedRow');
	} else {
		theDiv.setAttribute('class','selectedNode');
		theDiv.setAttribute('className','selectedNode');
	}
}

function unGlow(divName){
	var theDiv = document.getElementById(divName);
	theDiv.setAttribute('class',basicClass);
	theDiv.setAttribute('className',basicClass);	
}
function showHideDivForModal(divName,visibility){
	if ((browser=="Microsoft Internet Explorer") && (version<4))
	{
		var inputsAreaDiv = document.getElementById('inputsArea');
		inputsAreaDiv.style.visibility = 'hidden';
	}
	var theDiv = document.getElementById(divName);
	theDiv.style.visibility = visibility;
	var browser=navigator.appName;
	var b_version=navigator.appVersion;
	var version=parseFloat(b_version);
}
function showHideRow(rowName,showorhide) {
	var therow = document.getElementById(rowName);
	if (showorhide) {
		therow.style.display = 'table-row';
	} else {
		therow.style.display = 'none';
	}
}
function showHostPersonClearCompany() {
	document.getElementById('tableHostPerson').style.display = 'table';
	document.getElementById('tableHostCompany').style.display = 'none';
	document.getElementById('application.host.hostCompany.companyName').value = '';
	document.getElementById('application.host.hostCompany.address.street').value = '';
	document.getElementById('application.host.hostCompany.address.houseNumber').value = '';
	document.getElementById('application.host.hostCompany.address.city').value = '';
	document.getElementById('application.host.hostCompany.address.zipCode').value = '';
	document.getElementById('application.host.hostCompany.address.email').value = '';
	document.getElementById('application.host.hostCompany.address.telephoneNumber').value = '';
	document.getElementById('application.host.hostCompany.address.country.countryId').selectedIndex = 0;
	document.getElementById('application.host.hostCompany.contactPersonSurnames.sourceValue').value = '';
	document.getElementById('application.host.hostCompany.contactPersonFirstnames.sourceValue').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.street').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.houseNumber').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.city').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.zipCode').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.email').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.telephoneNumber').value = '';
	document.getElementById('application.host.hostCompany.contactPersonAddress.Country.countryId').selectedIndex = 0;
}
function showHostCompanyClearPerson() {
	document.getElementById('tableHostPerson').style.display = 'none';
	document.getElementById('tableHostCompany').style.display = 'table';
	document.getElementById('application.host.hostPerson.surnames.sourceValue').value = '';
	document.getElementById('application.host.hostPerson.firstnames.sourceValue').value = '';
	document.getElementById('application.host.hostPerson.address.street').value = '';
	document.getElementById('application.host.hostPerson.address.houseNumber').value = '';
	document.getElementById('application.host.hostPerson.address.city').value = '';
	document.getElementById('application.host.hostPerson.address.zipCode').value = '';
	document.getElementById('application.host.hostPerson.address.email').value = '';
	document.getElementById('application.host.hostPerson.address.telephoneNumber').value = '';
	document.getElementById('application.host.hostPerson.address.country.countryId').selectedIndex = 0;
}