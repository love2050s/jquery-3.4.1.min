var currentVisibleTab = null;
var currentVisibleDiv = null;
var basicClass;
var timeOutId = null;

function resetTimeout(expression,timeout){
	if (timeOutId!=null){
		clearTimeout(timeOutId);
	}
	timeOutId = setTimeout(expression,timeout*1000);
	
	
}
function getKeyCode(e) {
	if (window.event)
		return window.event.keyCode;
	else if (e)
		return e.which;
	else
		return null;
}

function keyRestrict(e, validchars) {
 var key='', keychar='';
 key = getKeyCode(e);
 if (key == null) return true;
 keychar = String.fromCharCode(key);
 keychar = keychar.toUpperCase();
 validchars = validchars.toUpperCase();

 if (validchars.indexOf(keychar) != -1){
  return true;
 }
 if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 ){ 	
  	return true;
  }
 return false;
}

function glowSquare(squareId){
	tmp = document.getElementById(squareId);
	if (tmp.getAttribute('class')!=null){
		tmp.setAttribute('originallClass',tmp.getAttribute('class'));
	} else if (tmp.getAttribute('className')){
		tmp.setAttribute('originallClass',tmp.getAttribute('className'));
	}
	tmp.setAttribute('class','glowSquare');
	tmp.setAttribute('className','glowSquare');
}
function glow(divName){
	var theDiv = document.getElementById(divName);
	basicClass = theDiv.getAttribute('class');
	if (basicClass==null){
		basicClass = theDiv.getAttribute('className');
	}
	if (basicClass==null){
		basicClass = theDiv.getAttribute('class');
	}
	theDiv.setAttribute('class','listTableRowGlow');
	theDiv.setAttribute('className','listTableRowGlow');
}

function unGlow(divName){
	var theDiv = document.getElementById(divName);
	theDiv.setAttribute('class',basicClass);
	theDiv.setAttribute('className',basicClass);	
}

function openUrl(url){
	window.location = url;
}
function openUrlInModalWindow(url){
	window.showModalDialog(url,null,'center:yes;status:PDF;');
}

function switchTab(tabId,divId){

	var theTab = document.getElementById(tabId);
	var theDiv = document.getElementById(divId);
	
	if (currentVisibleTab!=null){
		var tmp = document.getElementById(currentVisibleTab);
		tmp.setAttribute('class',tmp.getAttribute('baseClass'));
		tmp.setAttribute('className',tmp.getAttribute('baseClass'));
	}
	if (currentVisibleDiv!=null){
		var tmp = document.getElementById(currentVisibleDiv);
		tmp.setAttribute('class',tmp.getAttribute('baseClass'));
		tmp.setAttribute('className',tmp.getAttribute('baseClass'));
	}
	
	currentVisibleTab = tabId;
	currentVisibleDiv = divId;
	
	if (theTab.getAttribute('class')!=null&&theTab.getAttribute('class')!=''){
		theTab.setAttribute('baseClass',theTab.getAttribute('class'));
		theTab.setAttribute('class',theTab.getAttribute('class')+'Selected');
	}
	if (theTab.getAttribute('className')!=null&&theTab.getAttribute('className')!=''){
		theTab.setAttribute('baseClass',theTab.getAttribute('className'));
		theTab.setAttribute('className',theTab.getAttribute('className')+'Selected');
	}
	
	if (theDiv.getAttribute('class')!=null&&theDiv.getAttribute('class')!=''){
		theDiv.setAttribute('baseClass',theDiv.getAttribute('class'));
		theDiv.setAttribute('class',theDiv.getAttribute('class')+'Selected');
	}
	if (theDiv.getAttribute('className')!=null&&theDiv.getAttribute('className')!=''){
		theDiv.setAttribute('baseClass',theDiv.getAttribute('className'));
		theDiv.setAttribute('className',theDiv.getAttribute('className')+'Selected');
	}		
}
function showHint(hintText){
	theDiv = document.getElementById('hints');
	theDiv.innerHTML=hintText;	
}
function markAsSelected(cell){
    var rows = document.getElementById('calendarDayTable').rows;
    for (var j=0;j<rows.length;j++){
        var cells = rows[j].cells;
    for (var i=0;i<cells.length;i++){
        if (cells[i].getAttribute('originCssClass')=='calendarDayTableRowSelected') {
            cells[i].setAttribute('originCssClass','calendarDayTableRow');
        }
        if (cells[i].getAttribute('class')=='calendarDayTableRowSelected') {
            cells[i].setAttribute('class','calendarDayTableRow');
        }
        if (cells[i].getAttribute('className')=='calendarDayTableRowSelected') {
            cells[i].setAttribute('className','calendarDayTableRow');
        }
    }
    }
    cell.setAttribute('originCssClass','calendarDayTableRowSelected');
    cell.setAttribute('class','calendarDayTableRowSelected');
    cell.setAttribute('className','calendarDayTableRowSelected');
}

// DATE MANIPULATION
function filterMask (key, textbox) {
	var val = textbox.value;
	regExp=/\\s/;
	if (!regExp.test(val)) {	
		return KeyCheckX(textbox,key);
	}else{
	
	rExp = new RegExp("\\s");
	if (((key>47) && (key<58) )  || (key==0) || ((key>95) && (key<106))) {
		var into = fromKeyCode(key);
		results = val.replace(rExp, into);
		
		if (((key>47) && (key<58) )  || ((key>95) && (key<106))){
			if (val.length==2||val.length==5){
				results+=".";
			}
		}
		textbox.value = results;
		
		return true;
	}else if ((key==9) || (key==8) || (key==46)){
		return true;
	}	
	
	return false;
	}
}
function KeyCheckX(myfield,e) {
	var keycode;
	if (window.event){
		keycode = window.event.keyCode;
	} else if (e){
		if(e.which!=null){
			keycode = e.which;
		} else {
			keycode = e;
		}
	} else return true;

	if (((keycode>47) && (keycode<58) )  || ((keycode>95) && (keycode<106) ) || (keycode==8) || (keycode==0) || (keycode==43) || (keycode==45)) {

	     if (((keycode>47) && (keycode<58) )  || ((keycode>95) && (keycode<106))){
	        if (myfield.value.length==2||myfield.value.length==5){
				myfield.value+=".";
	        }
		 }
		 return true;
	}else if ((keycode==9) || (keycode==8) || (keycode==46)){
		return true;
	}
	return false;
}
function fromKeyCode(key){

	switch(key){
		case 96:
			return 0;
			break;
		case 97:
			return 1;
			break;
		case 98:
			return 2;
			break;
		case 99:
			return 3;
			break;
		case 100:
			return 4;
			break;
		case 101:
			return 5;
			break;
		case 102:
			return 6;
			break;
		case 103:
			return 7;
			break;
		case 104:
			return 8;
			break;
		case 105:
			return 9;
			break;
		case 48:
			return 0;
			break;
		case 49:
			return 1;
			break;
		case 50:
			return 2;
			break;
		case 51:
			return 3;
			break;
		case 52:
			return 4;
			break;
		case 53:
			return 5;
			break;
		case 54:
			return 6;
			break;
		case 55:
			return 7;
			break;
		case 56:
			return 8;
			break;
		case 57:
			return 9;
			break;
	}
}