/*
 * ***** BEGIN LICENSE BLOCK *****
 *
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2011, 2012, 2014, 2015, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2011, 2012, 2014, 2015, 2016 Synacor, Inc. All Rights Reserved.
 *
 * ***** END LICENSE BLOCK *****
 */

function XmlReadWriteHelper()
{
	this.strFilePath = null;

	this.bSucceed = false;				//out

	this.xmlDoc = null;

	this.xmlHttp = null;

	this.loadFromFile = function( bAsync )
	{
		this.loadDataXML( this.strFilePath, bAsync);
	}

	this.getElementsByTagName = function(a_strTagName)
	{
		return this.xmlDoc.getElementsByTagName(a_strTagName);
    }

    this.getXmlDoc = function() {
        if (this.bSucceed) {
            if (!gbIE5 && !gbNav6)
                this.xmlDoc = this.xmlHttp.responseXML;
            return this.xmlDoc;
        }
        return null;
    }

	this.loadDataXML = function (sFileName, bAsync)
	{
		try
		{
		var sCurrentDocPath=_getPath(document.location.href);
		var bAsyncReq = true ;
		if (typeof(bAsync) !='undefined' )
			bAsyncReq = bAsync ;
		sdocPath=_getFullPath(sCurrentDocPath,sFileName);
		//alert(sdocPath);
		if(gbIE5)
		{	
			this.xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
			this.xmlDoc.async=bAsyncReq;
			this.xmlDoc.load(sdocPath);
		}
		else if(gbNav6)
		{
			var req=new XMLHttpRequest();
     			req.open("GET", sdocPath, false);   
			req.send(null);   
			if (req.responseXML != null)
				this.xmlDoc = req.responseXML;
			else
			{
				this.onLoadXMLError();
				return ;
			}
		}
		else /*if(gbSafari)*/
		{
       		if(window.XMLHttpRequest && !(window.ActiveXObject)) 
    		{
    		    this.xmlHttp = new XMLHttpRequest();
			    if(this.xmlHttp)
			    {
    			    this.xmlHttp.onreadystatechange= this.onXMLResponse;
    		        this.xmlHttp.open("GET", sdocPath, false);
    		        this.xmlHttp.send(null);
		        }
    		}
		}
		this.bSucceed = true;
		}
		catch(e)
		{
    			this.onLoadXMLError();
		}
	}

	this.onXMLResponse = function()
	{
	    if (this.readyState == 4) {
	        if (this.responseXML == null) 
	        {
	            this.onLoadXMLError();
	        }
	    }	
	}

	this.onLoadXMLError = function ()
	{
		//alert("Cannot read xml file: " + this.strFilePath);
		this.bSucceed = false;
	}
	
}
