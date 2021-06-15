function logindisplay(){
	document.getElementsByClassName('bg-register')[0].style.display='none';
	var tmp=document.getElementsByClassName('bg-login')[0];
	if(tmp.style.display=='block') tmp.style.display='none';
	else tmp.style.display='block';
}

function regdisplay(){
	document.getElementsByClassName('bg-login')[0].style.display='none';
	var tmp=document.getElementsByClassName('bg-register')[0];
	if(tmp.style.display=='block') tmp.style.display='none';
	else tmp.style.display='block';
}

function usrdisplay(){
	var tmp=document.getElementsByClassName('usrinfo')[0];
	if(tmp.style.display=='block') tmp.style.display='none';
	else tmp.style.display='block';
}

function usrlogout(){
}