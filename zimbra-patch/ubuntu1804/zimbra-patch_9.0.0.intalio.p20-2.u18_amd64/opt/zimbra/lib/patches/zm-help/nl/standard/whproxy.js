/*
 * ***** BEGIN LICENSE BLOCK *****
 * Zimbra Collaboration Suite Web Client
 * Copyright (C) 2009, 2012, 2014, 2016 Synacor, Inc.
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
 * All portions of the code are Copyright (C) 2009, 2012, 2014, 2016 Synacor, Inc. All Rights Reserved.
 * ***** END LICENSE BLOCK *****
 */
//	WebHelp 5.10.001
var gbInited=false;
var gWndStubPage=null;
function getStubPage()
{
	if(!gbInited)
	{
		gWndStubPage=getStubPage_inter(window);
		gbInited=true;
	}
	return gWndStubPage;
}

function getStubPage_inter(wCurrent)
{
	if(null==wCurrent.parent||wCurrent.parent==wCurrent)
		return null;

	if(typeof(wCurrent.parent.whname)=="string"&&"wh_stub"==wCurrent.parent.whname)
		return wCurrent.parent;
	else
		if(wCurrent.parent.frames.length!=0&&wCurrent.parent!=wCurrent)
			return getStubPage_inter(wCurrent.parent);
		else
			return null;
}

function RegisterListener(framename,nMessageId)
{
	var wSP=getStubPage();
	if(wSP&&wSP!=this)
		return wSP.RegisterListener(framename,nMessageId);
	else
		return false;
}

function RegisterListener2(oframe,nMessageId)
{
	var wSP=getStubPage();
	if(wSP&&wSP!=this)
		return wSP.RegisterListener2(oframe,nMessageId);
	else
		return false;
}

function UnRegisterListener2(oframe,nMessageId)
{
	var wSP=getStubPage();
	if(wSP&&wSP!=this&&wSP.UnRegisterListener2)
		return wSP.UnRegisterListener2(oframe,nMessageId);
	else
		return false;
}

function SendMessage(oMessage)
{
	var wSP=getStubPage();
	if(wSP&&wSP!=this&&wSP.SendMessage)
		return wSP.SendMessage(oMessage);
	else
		return false;
}

var gbWhProxy=true;

var gbPreview=false;
gbPreview=false; 
if (gbPreview)
	document.oncontextmenu=contextMenu;

function contextMenu()
{
	return false;
}
