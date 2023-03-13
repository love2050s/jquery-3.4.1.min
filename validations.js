function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}
function isValidString(theInput, message){
	return true;
//	var thePattern = /^([a-z]|[A-Z]|\d|[\.\,\-\'\`\ @+#])*$/;
//	var matchArray = thePattern.test(theInput.value);
//	if (!matchArray){
//		theInput.value = '';
//		var inputId = theInput.getAttribute('id');
//		markInvalidField(inputId);
//		theInput.focus();
//		setTimeout("document.getElementById('"+inputId+"').focus()",1);
//		alert(message); 
//		return matchArray;
//	}
//	return matchArray;
}
function isValidEmail(theInput, message){
//	var thePattern = /^[a-zA-Z0-9\._%\-]+@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]+$/;
	var thePattern = /^[\-!#-'\*\+/-9=\?A-Z\^-~]+(\.[\-!#-'\*\+/-9=\?A-Z\^-~]+)*@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+$/;
	var matchArray = thePattern.test(theInput.value);
	if (theInput.value != '' && !matchArray){
		var inputId = theInput.getAttribute('id');
		markInvalidField(inputId);
		theInput.focus();
		setTimeout("document.getElementById('"+inputId+"').focus()",1);
		alert(message); 
		return matchArray;
	}
	return matchArray;
}
function isBiggerOrEqualAthanB(A,B){
	var theInput = document.getElementById(A);
	var theInputB = document.getElementById(B);

	var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
	var matchArray = theInput.value.match(datePat);

	var day=matchArray[1];
	var month=matchArray[3]-1;
	var year=matchArray[4];
	var dateA = new Date(year,month,day);//sets the new date
	
	var matchArray = theInputB.value.match(datePat);
	var day=matchArray[1];
	var month=matchArray[3]-1;
	var year=matchArray[4];
	var dateB = new Date(year,month,day);//sets the new date
	
	dif = dateA-dateB;//difference in milliseconds
	dif = Math.ceil(dif/1000/60/60/24);//difference in days 
	if (dif<0) {
		return false;
	} else {
		return true;
	}
}

function isBiggerAthanB(A,B){
	var theInput = document.getElementById(A);
	var theInputB = document.getElementById(B);

	var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
	var matchArray = theInput.value.match(datePat);

	var day=matchArray[1];
	var month=matchArray[3]-1;
	var year=matchArray[4];
	var dateA = new Date(year,month,day);//sets the new date
	
	var matchArray = theInputB.value.match(datePat);
	var day=matchArray[1];
	var month=matchArray[3]-1;
	var year=matchArray[4];
	var dateB = new Date(year,month,day);//sets the new date
	
	dif = dateA-dateB;//difference in milliseconds
	dif = Math.ceil(dif/1000/60/60/24);//difference in days 
	if (dif<=0) {
		return false;
	} else {
		return true;
	}
}

function validateArrivalDates(dateMustBeInFuture,departureMustBeBigger){
	var dateOfArrival =  document.getElementById('application.dateOfArrival').value;
	var dateOfDeparture = document.getElementById('application.dateOfDeparture').value;
	if (!isFutureDate('application.dateOfArrival')){
		markInvalidField('application.dateOfArrival');
		document.getElementById('application.dateOfArrival').focus();
		setTimeout("document.getElementById('application.dateOfArrival').focus()",1);
		alert(dateMustBeInFuture); 
		return false;
	}
	if(!isFutureDate('application.dateOfDeparture')){
		markInvalidField('application.dateOfDeparture');
		document.getElementById('application.dateOfDeparture').focus();
		setTimeout("document.getElementById('application.dateOfDeparture').focus()",1);
		alert(dateMustBeInFuture); 
		return false;
	}
	// bolo povodne isBiggerAthanB ale chceme aby sa dali ziadat aj viza na jeden den
	if (!isBiggerOrEqualAthanB('application.dateOfDeparture','application.dateOfArrival')){
		markInvalidField('application.dateOfDeparture');
		document.getElementById('application.dateOfDeparture').focus();
		setTimeout("document.getElementById('application.dateOfDeparture').focus()",1);
		alert(departureMustBeBigger); 
		return false;
	}
	return true;	
}
function isFutureDate(inputId){
	var theInput = document.getElementById(inputId);
	var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
	var matchArray = theInput.value.match(datePat);
	if (matchArray==null){
		theInput.value='';
		markInvalidField(inputId);
		theInput.focus();
		setTimeout("document.getElementById('"+inputId+"').focus()",1); 
		return false;		
	}
	var day=matchArray[1];
	var month=matchArray[3]-1;
	var year=matchArray[4];
	var newDate = new Date(year,month,day);//sets the new date
	var today = new Date();//sets the today date
	dif = newDate-today;//difference in milliseconds
	dif = Math.ceil(dif/1000/60/60/24);//difference in days 
	if (dif<=0) {
		return false;
	} else {
		return true;
	}
}

function isFuturePseudoDate(inputId){
	var theInput = document.getElementById(inputId);
	//var madafada = /^((0[0-9]|[12][0-9]|3[01])|(0[0-9]|[12][0-9]|3[01]))[/.]((0[0-9]|[0-9]|1[0-2]))[/.](\d{4})$/;
	// prazdny datum je OK
	if (theInput.value!=''){		
//		var retVal = madafada.test(theInput.value);
		var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
		var matchArray = theInput.value.match(datePat);
		if (matchArray==null){
				theInput.value='';
				markInvalidField(inputId);
				theInput.focus();
				setTimeout("document.getElementById('"+inputId+"').focus()",1); 
				return false;		
		}
		var day=matchArray[1];
		var month=matchArray[3]-1;
		var year=matchArray[4];
		var today = new Date();//sets the today date
		var retval = false;
		if (today.getFullYear()<year){
			retval = true;
		}
		if (year==today.getFullYear()&&month>today.getMonth()){
			retval = true;
		}
		if (year==today.getFullYear()&&month==today.getMonth()&&day>today.getDay()){
			retval = true;
		}
		return retval;
	} 
	return false;
}
function isValidDate(inputId){
	var theInput = document.getElementById(inputId);
	var madafada = /^((0[0-9]|[12][0-9]|3[01])|([0-9]|[12][0-9]|3[01]))[/.]((0[1-9]|[1-9]|1[0-2]))[/.](\d{4})$/;
	// prazdny datum je OK
	if (theInput.value!=''){		
		var retVal = madafada.test(theInput.value);
		var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
		var matchArray = theInput.value.match(datePat);
		if (matchArray==null){
				theInput.value='';
				markInvalidField(inputId);
				theInput.focus();
				setTimeout("document.getElementById('"+inputId+"').focus()",1); 
				return false;		
		}
		var day=matchArray[1];
		var month=matchArray[3];
		var year=matchArray[4];
		
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
				if (day>29 || (day==29 && !isleap)) {
				theInput.value='';
				markInvalidField(inputId);
				theInput.focus();
				setTimeout("document.getElementById('"+inputId+"').focus()",1); 
				return false;
				}
		}
		if (!retVal){
			theInput.value='';
			markInvalidField(inputId);
			theInput.focus();
			setTimeout("document.getElementById('"+inputId+"').focus()",1);
		}
		return retVal;
	} 
	return true;
}

function isValidPseudoDate(inputId){
	var theInput = document.getElementById(inputId);
	var madafada = /^((0[0-9]|[12][0-9]|3[01])|(0[0-9]|[12][0-9]|3[01]))[/.]((0[0-9]|[0-9]|1[0-2]))[/.](\d{4})$/;
	// prazdny datum je OK
	if (theInput.value!=''){
		var retVal = madafada.test(theInput.value);
		var datePat = /^(\d{1,2})(\/|-|.)(\d{1,2})\2(\d{2}|\d{4})$/;
		var matchArray = theInput.value.match(datePat);
		if (matchArray==null){
				theInput.value='';
				markInvalidField(inputId);
				theInput.focus();
				setTimeout("document.getElementById('"+inputId+"').focus()",1); 
				return false;		
		}
		var day=matchArray[1];
		var month=matchArray[3];
		var year=matchArray[4];
		
		if (month == 2) { // check for february 29th
			var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
				if (day>29 || (day==29 && !isleap)) {
				theInput.value='';
				markInvalidField(inputId);
				theInput.focus();
				setTimeout("document.getElementById('"+inputId+"').focus()",1);
				return false;
				}
		}
		if (!retVal||isFuturePseudoDate(inputId)){
			theInput.value='';
			markInvalidField(inputId);
			theInput.focus();
			setTimeout("document.getElementById('"+inputId+"').focus()",1);
			return false;
		}
		return retVal;
	} 
	return true;
}

function isNumber(inputId){
	theInput = document.getElementById(inputId);
	var theRegExp = /^\d*$/;
	var retVal = theRegExp.test(theInput.value); 
	if (!retVal){
/*		alert ('Hodnota mus\u00ED by\u0165 \u010D\u00EDslo !');*/		
		theInput.value='';
		markInvalidField(inputId);
		theInput.focus();
		setTimeout("document.getElementById('"+inputId+"').focus()",1);
	}
	return retVal;
}
function isDouble(inputId){
	theInput = document.getElementById(inputId);
	var theRegExp = /^(\d*)$|^\d*([\.])[\d*]$/;
	var retVal = theRegExp.test(theInput.value); 
	if (!retVal){
/*		alert ('Hodnota mus\u00ED by\u0165 cel\u00E9, alebo desatinn\u00E9 \u010D\u00EDslo ! Desatiny odde\u013Eova\u0165 bodkou!'); */		
		theInput.value='';
		markInvalidField(inputId);
		theInput.focus();
		setTimeout("document.getElementById('"+inputId+"').focus()",1);
	}
	return retVal;
}

function markInvalidField(inputId){
	theInput = document.getElementById(inputId);
	theInput.value='';
	var originCssClass = theInput.getAttribute('originCssClass');
	if (originCssClass==''||originCssClass==null){
		originCssClass = theInput.getAttribute('class');
	}
	if (originCssClass==''||originCssClass==null){
		originCssClass = theInput.getAttribute('className');
	}
	if (originCssClass!=''){
		theInput.setAttribute('originCssClass',originCssClass);
		theInput.setAttribute('class',originCssClass+'Highlited');
		theInput.setAttribute('className',originCssClass+'Highlited');
		
		setTimeout("document.getElementById('"+inputId+"').setAttribute('class','"+originCssClass+"')",1800);
		setTimeout("document.getElementById('"+inputId+"').setAttribute('className','"+originCssClass+"')",1800);
	}
	theInput.focus();
}
function markInvalidField2(inputId,text){
	theInput = document.getElementById(inputId);
	if (theInput!=null) {
		var originCssClass = theInput.getAttribute('originCssClass');
		if (originCssClass==''||originCssClass==null){
			originCssClass = theInput.getAttribute('class');
		}
		if (originCssClass==''||originCssClass==null){
			originCssClass = theInput.getAttribute('className');
		}
		if (originCssClass!=''){
			theInput.setAttribute('originCssClass',originCssClass);
			theInput.setAttribute('class',originCssClass+'Highlited');
			theInput.setAttribute('className',originCssClass+'Highlited');
			theInput.setAttribute('title',text);
		}
	}
}
function notEmptyList(elementId){
	var theList = document.getElementById(elementId);
	if (theList.length<1){
		return false;
	}
	return true;
}
function notEmpty(elementId){
	var theElement = document.getElementById(elementId);
	if (theElement.value==null||theElement.value==''||theElement.value==-1||trim(theElement.value)==''){
		theElement.focus();
		return false;
	}
	return true;
}
function isSet(elementId){
	var theElement = document.getElementById(elementId);
	if (theElement.value==null||theElement.value==''||theElement.value==-1){
		return false;
	}
	return true;
}
function validateSpouse(fnMsg,dobmsg,sexMsg,checkIfEmpty,pobMsg,cobMsg){
	if (notEmpty('spouse.firstnames.sourceValue')||
		notEmpty('spouse.surnames.sourceValue')||
		notEmpty('spouse.dateOfBirth')||
		notEmpty('spouse.sex')){
		if (!notEmpty('spouse.firstnames.sourceValue')){
			alert(fnMsg);
			markInvalidField('spouse.firstnames.sourceValue');
			return false;
		}
		if (!notEmpty('spouse.surnames.sourceValue')){
			alert(fnMsg);
			markInvalidField('spouse.surnames.sourceValue');
			return false;
		}
		if (!notEmpty('spouse.dateOfBirth')||!isValidPseudoDate('spouse.dateOfBirth')){
			alert(dobmsg);
			markInvalidField('spouse.dateOfBirth');
			return false;
		}
		if (!notEmpty('spouse.sex')){
			alert(sexMsg);
			markInvalidField('spouse.sex');
			return false;
		}
	} else if (!notEmpty('spouse.firstnames.sourceValue')&&
				!notEmpty('spouse.surnames.sourceValue')&&
				!notEmpty('spouse.dateOfBirth')&&
				!notEmpty('spouse.sex')){
				if(checkIfEmpty=='true'){
					alert(fnMsg);
					markInvalidField('spouse.firstnames.sourceValue');
					return false;
				} else {
					return true;
				}
	}
	if (isSet('spouse.placeOfBirth.nationality.nationalityId')&&!notEmpty('spouse.placeOfBirth.place')){
		alert(pobMsg);
		markInvalidField('spouse.placeOfBirth.place');
		return false;
	}
	if(notEmpty('spouse.placeOfBirth.place')&&!isSet('spouse.placeOfBirth.nationality.nationalityId')){
		alert(cobMsg);
		markInvalidField('spouse.placeOfBirth.nationality.nationalityId');
		return false;
	}
	return true;
}
function validatePreviousStay(countryMsg,dateMsg){
	if (!isSet('previousStay.country.countryId')){
		markInvalidField('previousStay.country.countryId');
		alert (countryMsg);
		return false;
	}
	if (!notEmpty('previousStay.dateFrom')||!isValidDate('previousStay.dateFrom')){
		markInvalidField('previousStay.dateFrom');
		alert (dateMsg);
		return false;
	}
	if (!notEmpty('previousStay.dateTo')||!isValidDate('previousStay.dateTo')){
		markInvalidField('previousStay.dateTo');
		alert (dateMsg);
		return false;
	}
	return true;
}
function isValidHostCompany(){
	if(isSet('application.host.hostCompany.address.country.countryId')&&
	   notEmpty('application.host.hostCompany.address.city')&&
	   notEmpty('application.host.hostCompany.companyName')&&
	   notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')&&
	   notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
				return true;
			}
		return false;
}
function isValidHostPerson(){
		if (notEmpty('application.host.hostPerson.firstnames.sourceValue')&&
			notEmpty('application.host.hostPerson.surnames.sourceValue')&&
			notEmpty('application.host.hostPerson.address.city')&&
			isSet('application.host.hostPerson.address.country.countryId')){
				return true;
			} 
		return false;
}
function isSetHostCompany(){
	if(isSet('application.host.hostCompany.address.country.countryId')||
	   notEmpty('application.host.hostCompany.address.city')||
	   notEmpty('application.host.hostCompany.companyName')||
	   notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')||
	   notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')||
	   notEmpty('application.host.hostCompany.contactPersonCity')){
				return true;
			}
		return false;
}
function isSetHostPerson(){
		if (notEmpty('application.host.hostPerson.firstnames.sourceValue')||
			notEmpty('application.host.hostPerson.surnames.sourceValue')||
			notEmpty('application.host.hostPerson.address.city')||
			isSet('application.host.hostPerson.address.country.countryId')){
				return true;
			} 
		return false;
}

function validateHostPerson(cityMsg,countryMsg,fnmsg,snMsg){
	if (!notEmpty('application.host.hostPerson.address.city')){
		markInvalidField('application.host.hostPerson.address.city');
		alert (cityMsg);
		return false;
	}
	if (!isSet('application.host.hostPerson.address.country.countryId')){
		markInvalidField('application.host.hostPerson.address.country.countryId');
		alert (countryMsg);
		return false;
	}
	if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')){
		markInvalidField('application.host.hostPerson.firstnames.sourceValue');
		alert (fnMsg);
		return false;
	}
	if (!notEmpty('application.host.hostPerson.surnames.sourceValue')){
		markInvalidField('application.host.hostPerson.surnames.sourceValue');
		alert (snMsg);
		return false;
	}
	return true;
}
function validateHostCompany(cityMsg,countryMsg,fnMsg,snMsg,comMsg){
	if (!notEmpty('application.host.hostCompany.address.city')){
		markInvalidField('application.host.hostCompany.address.city');
		alert (cityMsg);
		return false;	
	}
	if (!notEmpty('application.host.hostCompany.address.country.countryId')){
		markInvalidField('application.host.hostCompany.address.country.countryId');
		alert (countryMsg);
		return false;	
	}
	if (!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
		markInvalidField('application.host.hostCompany.contactPersonFirstnames.sourceValue');
		alert (fnMsg);
		return false;	
	}
	if (!notEmpty('application.host.hostCompany.contactPersonCity')){
		markInvalidField('application.host.hostCompany.contactPersonCity');
		alert(cityMsg);
		return false;
	}
	if (!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')){
		markInvalidField('application.host.hostCompany.contactPersonSurnames.sourceValue');
		alert (snMsg);
		return false;	
	}
	if (!notEmpty('application.host.hostCompany.companyName')){
		markInvalidField('application.host.hostCompany.companyName');
		alert (comMsg);
		return false;	
	}
	return true;
}
/*
function validateHost(personOrCompanyMsg){
	if (!validateHostPerson()&&!validateHostCompany()){
		alert(personOrCompanyMsg);
		return false;
	}
	return true;
}
*/
function validateChild(fnMsg,dobmsg,sexMsg){
	if(notEmpty('child.firstnames.sourceValue')||
		notEmpty('child.surnames.sourceValue')||
		notEmpty('child.dateOfBirth')||
		notEmpty('child.sex')){
		if (!notEmpty('child.firstnames.sourceValue')){
			alert(fnMsg);
			markInvalidField('child.firstnames.sourceValue');
			return false;
		}
		if (!notEmpty('child.surnames.sourceValue')){
			alert(fnMsg);
			markInvalidField('child.surnames.sourceValue');
			return false;
		}
		if (!notEmpty('child.dateOfBirth')||!isValidPseudoDate('child.dateOfBirth')){
			alert(dobmsg);
			markInvalidField('child.dateOfBirth');
			return false;
		}
		if (!notEmpty('child.sex')){
			alert(sexMsg);
			markInvalidField('child.sex');
			return false;
		}
	}
	return true;
}
function validateOtherNationality(message) {
	if (!isSet('otherNationality.nationalityId')){
		alert(message);
		markInvalidField('otherNationality.nationalityId');
		return false; 
	}
	return true;
}
function validateMainDestination(message) {
	if (!isSet('mainDestination.countryId')){
		alert(message);
		markInvalidField('mainDestination.countryId');
		return false; 
	}
	return true;
}
function isSetOccupations(){
	if (isSet('occupation.occupationsType.occupationsId')||
		notEmpty('occupation.employerName')||
		isSet('occupation.address.country.countryId')||
		notEmpty('occupation.address.city')){
				return true;
		}
	return false;
}
function isValidOccupations(){
	if (isSet('occupation.occupationsType.occupationsId')&&
		notEmpty('occupation.employerName')&&
		isSet('occupation.address.country.countryId')&&
		notEmpty('occupation.address.city')){
					return true;
		}
	return false;
}
function validateOccupations(otMsg,enMsg,citCountMsg){
	var count = document.getElementById('occupationsCount').value;
	if (count>0 || (isSet('occupation.occupationsType.occupationsId')&&
					notEmpty('occupation.employerName')&&
					isSet('occupation.address.country.countryId')&&
					notEmpty('occupation.address.city'))
					){
					return true;
					}
					
	if (!isSet('occupation.occupationsType.occupationsId')){
		alert(otMsg);
		markInvalidField('occupation.occupationsType.occupationsId');
		return false;
	}
	if (!notEmpty('occupation.employerName')){
		alert(enMsg);
		markInvalidField('occupation.employerName');
		return false;
	}
	if (!isSet('occupation.address.country.countryId')){
		alert(citCountMsg);
		markInvalidField('occupation.address.country.countryId');
		return false;
	}
	if (!notEmpty('occupation.address.city')){
		alert(citCountMsg);
		markInvalidField('occupation.address.city');
		return false;
	}
	return true;
}

function validateSponsor(stMsg){
	var count = document.getElementById('sponsorsCount').value;
	if (count>0||isSet('sponsor.sponsorType.sponsorTypeId')){
		return true;
	} 
	if(!isSet('sponsor.sponsorType.sponsorTypeId')){
		alert(stMsg);
		markInvalidField('sponsor.sponsorType.sponsorTypeId');
		return false;
	}
	return true;
}
function validateTravelDocument(tdtMsg,tdnMsg,tdvalidityMsg,dateMsg,tdIssuedBybMsg){
	if (!isSet('application.travelDocument.travelDocumentType.travelDocumentTypeId')){
		alert(tdtMsg);
		markInvalidField('application.travelDocument.travelDocumentType.travelDocumentTypeId');
		return false;
	}
	if (!notEmpty('application.travelDocument.travelDocumentNumber')){
		alert(tdnMsg);
		markInvalidField('application.travelDocument.travelDocumentNumber');
		return false;
	}
	if (!notEmpty('application.travelDocument.validUntil')){
		alert(tdvalidityMsg);
		markInvalidField('application.travelDocument.validUntil');
		return false;
	}
	if (!notEmpty('application.travelDocument.validUntil')||!isValidDate('application.travelDocument.validUntil')){
		alert(dateMsg);
		markInvalidField('application.travelDocument.validUntil');
		return false;
	}
	if (!notEmpty('application.travelDocument.dateOfIssue')||!isValidDate('application.travelDocument.dateOfIssue')){
		alert(dateMsg);
		markInvalidField('application.travelDocument.dateOfIssue');
		return false;
	}
	if (!notEmpty('application.travelDocument.issuedBy')){
		alert(tdIssuedBybMsg);
		markInvalidField('application.travelDocument.issuedBy');
		return false;
	}
	
	return true;
}
function validateEUCitizen(noPassportNo,noFamilyRelationShipt,noDob,EuFnMsg,EuSnMsg){

	if (notEmpty('application.euCitizen.passportNumber')||
		notEmpty('application.euCitizen.familyRelationShip')||
		notEmpty('application.euCitizen.dateOfBirth')||
		notEmpty('application.euCitizen.firstnames.sourceValue')||
		notEmpty('application.euCitizen.surnames.sourceValue')){
		
		if (!notEmpty('application.euCitizen.passportNumber')){
			alert(noPassportNo);
			markInvalidField('application.euCitizen.passportNumber');
			return false;
		}
		if (!notEmpty('application.euCitizen.familyRelationShip')){
			alert(noFamilyRelationShipt);
			markInvalidField('application.euCitizen.familyRelationShip');
			return false;
		}
		if (!notEmpty('application.euCitizen.dateOfBirth')||!isValidDate('application.euCitizen.dateOfBirth')){
			alert(noDob);
			markInvalidField('application.euCitizen.dateOfBirth');
			return false;
		}
		if (!notEmpty('application.euCitizen.firstnames.sourceValue')){
			alert(EuFnMsg);
			markInvalidField('application.euCitizen.firstnames.sourceValue');
			return false;
		}
		if (!notEmpty('application.euCitizen.surnames.sourceValue')){
			alert(EuSnMsg);
			markInvalidField('application.euCitizen.surnames.sourceValue');
			return false;
		}	
	}
	return true;
}
function validateSupports(nstMsg,dateMsg){
	var count = document.getElementById('supportsCount').value;
	if (count>0||(isSet('support.supportType.supportTypeId')&&notEmpty('support.validUntil'))){
		return true;
	} 
	if(!isSet('support.supportType.supportTypeId')||
		!notEmpty('support.validUntil')){
		if (!isSet('support.supportType.supportTypeId')){
			alert(nstMsg);
			markInvalidField('support.supportType.supportTypeId');
			return false;	
		}
		if (notEmpty('support.validUntil')&&!isValidDate('support.validUntil')){
				alert(dateMsg);
				markInvalidField('support.validUntil');
				return false;	
		}
	}
	return true;
}
function isValidEuCitizen(){
	if (!notEmpty('application.euCitizen.passportNumber')||
		!notEmpty('application.euCitizen.familyRelationShip')||
		!notEmpty('application.euCitizen.dateOfBirth')||
		!notEmpty('application.euCitizen.firstnames.sourceValue')||
		!notEmpty('application.euCitizen.surnames.sourceValue')){
		return false;
	}
	
	return true;
}

function isValidLegalGuardian(){
	var someValueSet = false;
	if (notEmpty('applicant.legalGuardian.address.country.countryId')){
		someValueSet  = true;
	}
	if (notEmpty('applicant.legalGuardian.address.city')){
		someValueSet  = true;
	}
	if (notEmpty('applicant.legalGuardian.nationality.nationalityId')){
		someValueSet  = true;
	}
	if (notEmpty('applicant.legalGuardian.sex')){
		someValueSet  = true;
	}
	if (notEmpty('applicant.legalGuardian.surnames.sourceValue')){
		someValueSet  = true;
	}
	if (notEmpty('applicant.legalGuardian.firstnames.sourceValue')){
		someValueSet  = true;
	}
	
	if(someValueSet){
		if (!notEmpty('applicant.legalGuardian.address.country.countryId')){
			markInvalidField('applicant.legalGuardian.address.country.countryId');
			return false;
		}
		if (!notEmpty('applicant.legalGuardian.address.city')){
			markInvalidField('applicant.legalGuardian.address.city');
			return false;
		}
		if (!notEmpty('applicant.legalGuardian.nationality.nationalityId')){
			markInvalidField('applicant.legalGuardian.nationality.nationalityId');
			return false;
		}
		if (!notEmpty('applicant.legalGuardian.sex')){
			markInvalidField('applicant.legalGuardian.sex');
			return false;
		}
		if (!notEmpty('applicant.legalGuardian.surnames.sourceValue')){
			markInvalidField('applicant.legalGuardian.surnames.sourceValue');
			return false;
		}
		if (!notEmpty('applicant.legalGuardian.firstnames.sourceValue')){
			markInvalidField('applicant.legalGuardian.firstnames.sourceValue');
			return false;
		}
	}
	return true;
}
function validateHost(onlyOneMsg){
	if (isSetHostCompany()&&isSetHostPerson()){
		alert(onlyOneMsg);
		return false;
	}
	return true;	
}
function validateApplicationForm(fnMsg,snMsg,msMsg,countryMsg,cityMsg,dobMsg,sexMsg,tdtMsg,tdnMsg,tdvalidityMsg,doaMsg,dateMsg,dodMsg,dosMsg,numberMsg,noeMsg,visaTypeMsg,pobMsg,bofeMsg,porMsg,tdIssuedBybMsg,hpfnMsg,hpsnMsg,cpfnMsg,cpsnMsg,cnMsg,noSupportTypeMsg,childFnMsg,childDobMsg,childSexMsg,stMsg,otMsg,enMsg,citCountMsg,meansOfTranspMsg,purposeOfTravelMsg,hostPersonOrCompanyMsg,EuFnMsg,EuSnMsg,familyRelationshipMsg,permitIssuedBy,permitForResidence,spousePobMsg,cobMsg,dateMustBeInFuture,departureMustBeBigger,noStreet,noHouseNo){
	
	if (notEmpty('application.fpScannedOn')){
		if (!isValidDate('application.fpScannedOn')){
			alert(dateMsg);
			markInvalidField('application.fpScannedOn');
			return false;
		}
	}
	if (!notEmpty('applicant.firstnames.sourceValue')){
		alert(fnMsg);
		markInvalidField('applicant.firstnames.sourceValue');
		return false;
	}
	if (!notEmpty('applicant.surnames.sourceValue')){
		alert(snMsg);
		markInvalidField('applicant.surnames.sourceValue');
		return false;
	}
	if (!notEmpty('applicant.surnameAtBirth.sourceValue')){
		alert(snMsg);
		markInvalidField('applicant.surnameAtBirth.sourceValue');
		return false;
	}
	if (!isSet('applicant.maritalStatus.maritalStatusId')){
		alert(msMsg);
		markInvalidField('applicant.maritalStatus.maritalStatusId');
		return false;
	}
	if (!isSet('applicant.sex')){
		alert(sexMsg);
		markInvalidField('applicant.sex');
		return false;
	}
	if (!isSet('applicant.nationalityForApplication.nationalityId')){
		alert(countryMsg);
		markInvalidField('applicant.nationalityForApplication.nationalityId');
		return false;
	}
	if (!isSet('application.mainDestination.countryId')){
		alert(countryMsg);
		markInvalidField('application.mainDestination.countryId');
		return false;
	}
	
	if (!notEmpty('applicant.placeOfBirth.place')){
		alert(pobMsg);
		markInvalidField('applicant.placeOfBirth.place');
		return false;
	}
	if (!isSet('applicant.placeOfBirth.nationality.nationalityId')){
		alert(countryMsg);
		markInvalidField('applicant.placeOfBirth.nationality.nationalityId');
		return false;
	}
	if (!isSet('applicant.address.country.countryId')){
		alert(countryMsg);
		markInvalidField('applicant.address.country.countryId');
		return false;
	}
	if (!isSet('applicant.address.city')){
		alert(cityMsg);
		markInvalidField('applicant.address.city');
		return false;
	}
	if (!notEmpty('applicant.dateOfBirth')||!isValidPseudoDate('applicant.dateOfBirth')){
		alert(dobMsg);
		markInvalidField('applicant.dateOfBirth');
		return false;
	}
	if (!validateTravelDocument(tdtMsg,tdnMsg,tdvalidityMsg,dateMsg,tdIssuedBybMsg)){
		return false;
	}
	if (!isValidLegalGuardian()){
		return false;
	}
	if (!isValidEuCitizen()){
		if (!notEmpty('application.dateOfArrival')){
			alert(doaMsg);
			markInvalidField('application.dateOfArrival');
			return false;
		}
		if (!isValidDate('application.dateOfArrival')){
			alert(dateMsg);
			markInvalidField('application.dateOfArrival');
			return false;
		}
		if (!notEmpty('application.dateOfDeparture')){
			alert(dodMsg);
			markInvalidField('application.dateOfDeparture');
			return false;
		}
		if (!isValidDate('application.dateOfDeparture')){
			alert(dateMsg);
			markInvalidField('application.dateOfDeparture');
			return false;
		}
		if (!validateArrivalDates(dateMustBeInFuture,departureMustBeBigger)){
			return false;
		}
	}
	if ( (notEmpty('application.dateOfArrival')&&isValidDate('application.dateOfArrival'))||
		( (notEmpty('application.dateOfDeparture')&&isValidDate('application.dateOfDeparture')) )){
		if (!validateArrivalDates(dateMustBeInFuture,departureMustBeBigger)){
			return false;
		}
	}
	if (!notEmpty('application.durationOfStayRequested')){
		alert(dosMsg);
		markInvalidField('application.durationOfStayRequested');
		return false;
	}
	if (!isNumber('application.durationOfStayRequested')){
		alert(numberMsg);
		markInvalidField('application.durationOfStayRequested');
		return false;
	}
	if (!isSet('application.numberOfEntriesRequested.numberOfEntriesId')){
		alert(noeMsg);
		markInvalidField('application.numberOfEntriesRequested.numberOfEntriesId');
		return false;
	}
	if (!isSet('application.visaTypeRequested.visaTypeId')){
		alert(visaTypeMsg);
		markInvalidField('application.visaTypeRequested.visaTypeId');
		return false;
	}
	if (isSet('application.visaTypeRequested.visaTypeId')&&
		(document.getElementById('application.visaTypeRequested.visaTypeId').value==document.getElementById('transitVisaAId').value||
		document.getElementById('application.visaTypeRequested.visaTypeId').value==document.getElementById('transitVisaBId').value)&&
		document.getElementById('application.permitForFinalDestination1').checked){
			if (!notEmpty('application.permitForFinalDestinationValidUntil')||!isValidDate('application.permitForFinalDestinationValidUntil')){
				alert(dateMsg);
				markInvalidField('application.permitForFinalDestinationValidUntil');
				return false;
			}
			if (!notEmpty('application.permitForFinalDestinationIssuedBy')){
				alert(permitIssuedBy);
				markInvalidField('application.permitForFinalDestinationIssuedBy');
				return false;
			}
		}
	/*
	if (!notEmpty('application.purposeOfTravel')){
		alert(visaTypeMsg);
		markInvalidField('application.purposeOfTravel.purpose_of_travel_id');		
		return false;
	}
	*/
	if (!isSet('application.borderOfFirstEntry.countryId')){
		alert(bofeMsg);
		markInvalidField('application.borderOfFirstEntry.countryId');
		return false;
	}	
	/*
	if (!notEmpty('application.placeOfRequest.place')){
		alert(porMsg);
		markInvalidField('application.placeOfRequest.place');
		return false;
	}
*/
	if (!isValidEuCitizen()){
		if (!validateEUCitizen(tdnMsg,familyRelationshipMsg,dobMsg,EuFnMsg,EuSnMsg)){
			return false;
		}	
		if ( (!isValidHostCompany()&&isValidHostPerson())||(isValidHostCompany()&&!isValidHostPerson())){
				//do nothing
				if (isSetHostCompany()){
					if (!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
						alert(hpfnMsg);
						markInvalidField('application.host.hostCompany.contactPersonFirstnames.sourceValue');
						return false;
					}	
					if (!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')){
						alert(cpfnMsg);
						markInvalidField('application.host.hostCompany.contactPersonSurnames.sourceValue');
						return false;
					}
					if (!notEmpty('application.host.hostCompany.companyName')){
						alert(cnMsg);
						markInvalidField('application.host.hostCompany.companyName');
						return false;
					}
					if (!notEmpty('application.host.hostCompany.address.street')){
						alert(noStreet);
						markInvalidField('application.host.hostCompany.address.street');
						return false;
					}
					if (!notEmpty('application.host.hostCompany.address.houseNumber')){
						alert(noHouseNo);
						markInvalidField('application.host.hostCompany.address.houseNumber');
						return false;
					}
					if (!notEmpty('application.host.hostCompany.address.city')){
						alert(cityMsg);
						markInvalidField('application.host.hostCompany.address.city');
						return false;
					}
					if (!isSet('application.host.hostCompany.address.country.countryId')){
						alert(countryMsg);
						markInvalidField('application.host.hostCompany.address.country.countryId');
						return false;
					}
				}
				if (isSetHostPerson()){
					if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')){
						alert(hpfnMsg);
						markInvalidField('application.host.hostPerson.firstnames.sourceValue');
						return false;			
					}
					if (!notEmpty('application.host.hostPerson.surnames.sourceValue')){
						alert(hpsnMsg);
						markInvalidField('application.host.hostPerson.surnames.sourceValue');
						return false;			
					}
//					if (!notEmpty('application.host.hostPerson.address.street')){
//						alert(noStreet);
//						markInvalidField('application.host.hostPerson.address.street');
//						return false;
//					}
//					if (!notEmpty('application.host.hostPerson.address.houseNumber')){
//						alert(noHouseNo);
//						markInvalidField('application.host.hostPerson.address.houseNumber');
//						return false;
//					}
					if (!notEmpty('application.host.hostPerson.address.city')){
						alert(cityMsg);
						markInvalidField('application.host.hostPerson.address.city');
						return false;
					}
					if (!isSet('application.host.hostPerson.address.country.countryId')){
						alert(countryMsg);
						markInvalidField('application.host.hostPerson.address.country.countryId');
						return false;
					}	
				}
			}  else {
				if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')&&
					!notEmpty('application.host.hostPerson.surnames.sourceValue')&&
					!notEmpty('application.host.hostPerson.address.city')&&
					!isSet('application.host.hostPerson.address.country.countryId')&&
					!isSet('application.host.hostCompany.address.country.countryId')&&
					!notEmpty('application.host.hostCompany.address.city')&&
					!notEmpty('application.host.hostCompany.companyName')&&
					!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')&&
					!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
						if (!isValidHostCompany()&&!isValidHostPerson()){
							alert(hostPersonOrCompanyMsg);
							return false;
						}
					}
				if(!isSetHostCompany()){
					if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')||
						!notEmpty('application.host.hostPerson.surnames.sourceValue')||
						!notEmpty('application.host.hostPerson.address.city')||
						!isSet('application.host.hostPerson.address.country.countryId')){
						if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')){
							alert(hpfnMsg);
							markInvalidField('application.host.hostPerson.firstnames.sourceValue');
							return false;			
						}
						if (!notEmpty('application.host.hostPerson.surnames.sourceValue')){
							alert(hpsnMsg);
							markInvalidField('application.host.hostPerson.surnames.sourceValue');
							return false;			
						}
						if (!notEmpty('application.host.hostPerson.address.street')){
							alert(noStreet);
							markInvalidField('application.host.hostPerson.address.street');
							return false;
						}
						if (!notEmpty('application.host.hostPerson.address.houseNumber')){
							alert(noHouseNo);
							markInvalidField('application.host.hostPerson.address.houseNumber');
							return false;
						}
						if (!notEmpty('application.host.hostPerson.address.city')){
							alert(cityMsg);
							markInvalidField('application.host.hostPerson.address.city');
							return false;
						}
						if (!isSet('application.host.hostPerson.address.country.countryId')){
							alert(countryMsg);
							markInvalidField('application.host.hostPerson.address.country.countryId');
							return false;
						}	
					}
				}
				if (!isSetHostPerson()){
					if (!isSet('application.host.hostCompany.address.country.countryId')||
						!notEmpty('application.host.hostCompany.address.city')||
						!notEmpty('application.host.hostCompany.companyName')||
						!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')||
						!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
						if (!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
							alert(hpfnMsg);
							markInvalidField('application.host.hostCompany.contactPersonFirstnames.sourceValue');
							return false;
						}	
						if (!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')){
							alert(cpfnMsg);
							markInvalidField('application.host.hostCompany.contactPersonSurnames.sourceValue');
							return false;
						}
						if (!notEmpty('application.host.hostCompany.companyName')){
							alert(cnMsg);
							markInvalidField('application.host.hostCompany.companyName');
							return false;
						}
						if (!notEmpty('application.host.hostCompany.address.street')){
							alert(noStreet);
							markInvalidField('application.host.hostCompany.address.street');
							return false;
						}
						if (!notEmpty('application.host.hostCompany.address.houseNumber')){
							alert(noHouseNo);
							markInvalidField('application.host.hostCompany.address.houseNumber');
							return false;
						}
						if (!notEmpty('application.host.hostCompany.address.city')){
							alert(cityMsg);
							markInvalidField('application.host.hostCompany.address.city');
							return false;
						}
						if (!isSet('application.host.hostCompany.address.country.countryId')){
							alert(countryMsg);
							markInvalidField('application.host.hostCompany.address.country.countryId');
							return false;
						}
					}
				}
		}	
	} else {
		if (notEmpty('application.host.hostPerson.firstnames.sourceValue')||
			notEmpty('application.host.hostPerson.surnames.sourceValue')||
			notEmpty('application.host.hostPerson.address.city')||
			isSet('application.host.hostPerson.address.country.countryId')){
			if (!notEmpty('application.host.hostPerson.firstnames.sourceValue')){
				alert(hpfnMsg);
				markInvalidField('application.host.hostPerson.firstnames.sourceValue');
				return false;			
			}
			if (!notEmpty('application.host.hostPerson.surnames.sourceValue')){
				alert(hpsnMsg);
				markInvalidField('application.host.hostPerson.surnames.sourceValue');
				return false;			
			}
						if (!notEmpty('application.host.hostPerson.address.street')){
							alert(noStreet);
							markInvalidField('application.host.hostPerson.address.street');
							return false;
						}
						if (!notEmpty('application.host.hostPerson.address.houseNumber')){
							alert(noHouseNo);
							markInvalidField('application.host.hostPerson.address.houseNumber');
							return false;
						}
			if (!notEmpty('application.host.hostPerson.address.city')){
				alert(cityMsg);
				markInvalidField('application.host.hostPerson.address.city');
				return false;
			}
			if (!isSet('application.host.hostPerson.address.country.countryId')){
				alert(countryMsg);
				markInvalidField('application.host.hostPerson.address.country.countryId');
				return false;
			}	
		}
		if (isSet('application.host.hostCompany.address.country.countryId')||
			notEmpty('application.host.hostCompany.address.city')||
			notEmpty('application.host.hostCompany.companyName')||
			notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')||
			notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
			if (!notEmpty('application.host.hostCompany.contactPersonFirstnames.sourceValue')){
				alert(hpfnMsg);
				markInvalidField('application.host.hostCompany.contactPersonFirstnames.sourceValue');
				return false;
			}	
			if (!notEmpty('application.host.hostCompany.contactPersonSurnames.sourceValue')){
				alert(cpfnMsg);
				markInvalidField('application.host.hostCompany.contactPersonSurnames.sourceValue');
				return false;
			}
					if (!notEmpty('application.host.hostCompany.address.street')){
						alert(noStreet);
						markInvalidField('application.host.hostCompany.address.street');
						return false;
					}
					if (!notEmpty('application.host.hostCompany.address.houseNumber')){
						alert(noHouseNo);
						markInvalidField('application.host.hostCompany.address.houseNumber');
						return false;
					}
			if (!notEmpty('application.host.hostCompany.companyName')){
				alert(cnMsg);
				markInvalidField('application.host.hostCompany.companyName');
				return false;
			}
			if (!notEmpty('application.host.hostCompany.address.city')){
				alert(cityMsg);
				markInvalidField('application.host.hostCompany.address.city');
				return false;
			}
			if (!isSet('application.host.hostCompany.address.country.countryId')){
				alert(countryMsg);
				markInvalidField('application.host.hostCompany.address.country.countryId');
				return false;
				}
		}
	}
	/* */
	if (isSet('previousStay.country.countryId')||
		notEmpty('previousStay.dateFrom')||
		notEmpty('previousStay.dateTo')){
		if (!validatePreviousStay(countryMsg,dateMsg)){
			return false;
		}
	}
	if (!isValidEuCitizen()){
		if (!validateEUCitizen(tdnMsg,familyRelationshipMsg,dobMsg,EuFnMsg,EuSnMsg)){
			return false;
		}	
		if (!validateSponsor(stMsg)){
			return false;
		}
		if (!validateSupports(noSupportTypeMsg,dateMsg)){
			return false;
		}
		if (!validateOccupations(otMsg,enMsg,citCountMsg)){
			return false;
		}
		
//		if (!isSet('application.meansOfTransport.means_of_transport_id')){
//			alert(meansOfTranspMsg);
//			markInvalidField('application.meansOfTransport.means_of_transport_id');
//			return false;
//		}
	}
	if (!isSet('application.purposeOfTravel.purposeOfTravelId')){
		alert(purposeOfTravelMsg);
		markInvalidField('application.purposeOfTravel.purposeOfTravelId');
		return false;
	}
	if (isSetOccupations()&&!isValidOccupations()){
		if (!validateOccupations(otMsg,enMsg,citCountMsg)){
			return false;
		}
	}
	if (!validateEUCitizen(tdnMsg,familyRelationshipMsg,dobMsg,EuFnMsg,EuSnMsg)){
		return false;
	}	
	if (notEmpty('application.permitForResidenceCountry')&&
		(!notEmpty('application.permitForResidenceCountryValidUntil')||
		 !isValidDate('application.permitForResidenceCountryValidUntil'))){
			alert(dateMsg);
			markInvalidField('application.permitForResidenceCountryValidUntil');
			return false;
	}
	if (notEmpty('application.permitForResidenceCountryValidUntil')&&isValidDate('application.permitForResidenceCountryValidUntil')&&!notEmpty('application.permitForResidenceCountry')){
			alert(permitForResidence);
			markInvalidField('application.permitForResidenceCountry');
			return false;
	}
	return true;
}