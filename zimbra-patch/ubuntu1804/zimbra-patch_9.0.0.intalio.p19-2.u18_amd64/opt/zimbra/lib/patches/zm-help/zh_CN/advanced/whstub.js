/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2008, 2010, 2012, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2008, 2010, 2012, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */
//	WebHelp 5.10.002
window.whname="wh_stub";
function getframehandle(frames,framename)
{
	var frame=null;
	if(null==frames) return null;
	for(var i=0;i<frames.length;i++)
	{
		if(typeof(frames[i].name)!="unknown")
		{
			if(frames[i].name==framename)
				return frames[i];
		}
		if(frames[i].frames.length>0)
		{
			frame=getframehandle(frames[i].frames,framename);
			if(null!=frame)
				return frame;
		}
	}
	return frame;
}

function AddToArray(arr,obj)
{
	var bFound=false;
	for(var i=0;i<arr.length;i++){
		if(arr[i]==obj){
			bFound=true;
			break;
		}
		else if(arr[i]==null){
			break;
		}
	}
	if(!bFound) arr[i]=obj;
}

var gArrayRegistedMessage=new Array();
var gArrayCompoentsArray=new Array();

function GetComponentsArray(nMessageId)
{
	var len=gArrayRegistedMessage.length;
	for(var i=0;i<len;i++)
	{
		if(gArrayRegistedMessage[i]==nMessageId){
			if(gArrayCompoentsArray.length>i)
				return gArrayCompoentsArray[i];
			else
				return null;
		}
	}
	return null;
}

function CreateComponentsArray(nMessageId)
{
	var len=gArrayRegistedMessage.length;
	gArrayRegistedMessage[len]=nMessageId;
	gArrayCompoentsArray[len]=new Array();
	return gArrayCompoentsArray[len];
}

function listener(sName,oWindow)
{
	this.sName=sName;
	this.oWindow=oWindow;
}

function RegisterListener(windowName,nMessageId)
{
	var arrayComponents=GetComponentsArray(nMessageId);
	if(arrayComponents==null)
		arrayComponents=CreateComponentsArray(nMessageId);
	
	if(arrayComponents!=null)
	{
		for (var i=0;i<arrayComponents.length;i++)
		{
			if (arrayComponents[i].sName == windowName)
				return false;
		}
		var oListener=new listener(windowName,null);
		AddToArray(arrayComponents,oListener);
		return true;
	}
	else
		return false;
}

function RegisterListener2(oWindow,nMessageId)
{
	var arrayComponents=GetComponentsArray(nMessageId);
	if(arrayComponents==null)
		arrayComponents=CreateComponentsArray(nMessageId);
	
	if(arrayComponents!=null)
	{
		var oListener=new listener("",oWindow);
		AddToArray(arrayComponents,oListener);
		return true;
	}
	else
		return false;
}

function UnRegisterListener2(oWindow,nMessageId)
{
	var arrayComponents=GetComponentsArray(nMessageId);
	if(arrayComponents!=null)
	{
		for(var i=0;i<arrayComponents.length;i++)
		{
			if(arrayComponents[i].oWindow==oWindow)
			{
				removeItemFromArray(arrayComponents,i);
				return true;
			}
		}
	}
	else
		return false;
}

function SendMessage(oMessage)
{
	var bDelivered=false;
	var arrayComponents=GetComponentsArray(oMessage.nMessageId);
	if(arrayComponents!=null&&arrayComponents.length>0){
		for(var i=0;i<arrayComponents.length;i++)
		{
			if(null!=arrayComponents[i])
			{
				var pFrame;
				if(arrayComponents[i].oWindow==null)
					pFrame=getframehandle(frames,arrayComponents[i].sName);
				else
					pFrame=arrayComponents[i].oWindow;
				if(null!=pFrame)
				{
					if(pFrame.onSendMessageX)
					{
						bDelivered=true;
						if(!pFrame.onSendMessageX(oMessage))
							break;
					}
					if(pFrame.onSendMessage)
					{
						bDelivered=true;
						if(!pFrame.onSendMessage(oMessage))
							break;
					}
				}
			}
		}
	}
	return bDelivered;
}