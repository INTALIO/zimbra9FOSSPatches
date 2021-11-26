/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2008, 2009, 2010, 2012, 2014, 2015, 2016 Synacor, Inc.
 *
 * The contents of this file are subject to the Common Public Attribution License Version 1.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at: https://www.zimbra.com/license
 * The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15
 * have been added to cover use of software over a computer network and provide for limited attribution
 * for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied.
 * See the License for the specific language governing rights and limitations under the License.
 * The Original Code is Zimbra Open Source Web Client.
 * The Initial Developer of the Original Code is Zimbra, Inc.  All rights to the Original Code were
 * transferred by Zimbra, Inc. to Synacor, Inc. on September 14, 2015.
 *
 * All portions of the code are Copyright (C) 2008, 2009, 2010, 2012, 2014, 2015, 2016 Synacor, Inc. All Rights Reserved.
 *
 * ***** END LICENSE BLOCK *****
 */
//	WebHelp 5.10.002
if (! window.gbIE4 && (window.gbNav6 || gbSafari3) && !document.childNodes[0].insertAdjacentHTML){

HTMLElement.prototype.insertAdjacentElement = function(where,parsedNode)
{
	switch (where){
	case 'beforeBegin':
		this.parentNode.insertBefore(parsedNode,this);
		break;
	case 'afterBegin':
		this.insertBefore(parsedNode,this.firstChild);
		break;
	case 'beforeEnd':
		this.appendChild(parsedNode);
		break;
	case 'afterEnd':
		if (this.nextSibling){
		this.parentNode.insertBefore(parsedNode,this.nextSibling);
		} else {
		this.parentNode.appendChild(parsedNode);
		}
		break;
	}
}

HTMLElement.prototype.insertAdjacentHTML = function(where,htmlStr){

	var r = this.ownerDocument.createRange();
	r.setStartBefore(this);
	var parsedHTML = r.createContextualFragment(htmlStr);
	this.insertAdjacentElement(where,parsedHTML);
}


HTMLElement.prototype.insertAdjacentText = function(where,txtStr){

	var parsedText = document.createTextNode(txtStr);
	this.insertAdjacentElement(where,parsedText);
}
}

function testScroll() {
	// Initialize scrollbar cache if necessary
	if (window._pageXOffset==null) {
		window._pageXOffset = window.pageXOffset;
		window._pageYOffset = window.pageYOffset;
	}
	// Expose Internet Explorer compatible object model
	document.scrollTop = window.pageYOffset;
	document.scrollLeft = window.pageXOffset;
	window.document.scrollHeight = document.height;
	window.document.scrollWidth = document.width;
	window.document.clientWidth = window.innerWidth;
	window.document.clientHeight = window.innerHeight;

	// If cache!=current values, call the onscroll event
	if (((window.pageXOffset!=window._pageXOffset) || (window.pageYOffset!=window._pageYOffset)) && (window.onscroll)) 
		window.onscroll();
	// Cache new values
	window._pageXOffset = window.pageXOffset;
	window._pageYOffset = window.pageYOffset;
	}

// Create compatibility layer for Netscape
if (window.gbNav6 && !window.gbNav7) {
	setInterval("testScroll()",50)
}