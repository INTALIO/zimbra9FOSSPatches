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
// this value should be identical to the value used in whproxy.js
window.whname = "wh_stub";

// this file will be used by Topic and NavBar and NavPane and other components
// and this file is used in child frame html.
// and the whstub.js will be used in the start page.
// see reference in whstub.js.
// Internal Area
var gbInited = false;
var gWndStubPage = null;
function getStubPage()
{
	if (!gbInited)
	{
		gWndStubPage = getStubPage_inter(window);
		gbInited = true;
	}
	return gWndStubPage;
}

function getStubPage_inter(wCurrent) {
	if (null == wCurrent.parent || wCurrent.parent == wCurrent)
		return null;

	if (wCurrent.parent.whname && "wh_stub" == wCurrent.parent.whname) 
		return wCurrent.parent;
	else
		if (wCurrent.parent.frames.length != 0 && wCurrent.parent != wCurrent)
			return getStubPage_inter(wCurrent.parent);
		else 
			return null;
}

// Public interface begin here................
function RegisterListener(framename, nMessageId)
{
	var wStartPage = getStubPage();
	if (wStartPage && wStartPage != this) {
		return wStartPage.RegisterListener(framename, nMessageId);
	}
	else 
		return false;
}

function RegisterListener2(oframe, nMessageId)
{
	var wStartPage = getStubPage();
	if (wStartPage && wStartPage != this) {
		return wStartPage.RegisterListener2(oframe, nMessageId);
	}
	else 
		return false;
}

function UnRegisterListener2(oframe, nMessageId)
{
	var wStartPage = getStubPage();
	if (wStartPage && wStartPage != this && wStartPage.UnRegisterListener2) {
		return wStartPage.UnRegisterListener2(oframe, nMessageId);
	}
	else 
		return false;
}

function SendMessage(oMessage)
{
	var nMsgId = oMessage.nMessageId;
	if (nMsgId == WH_MSG_ISINFRAMESET && oMessage.wSender != this)
		return true;
	var wStartPage = getStubPage();
	if (wStartPage && wStartPage != this && wStartPage.SendMessage) 
	{
		return wStartPage.SendMessage(oMessage);
	}
	else 
		return false;
}
var gbWhProxy=true;