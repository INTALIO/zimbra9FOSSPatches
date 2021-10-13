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
//	WebHelp 5.10.001
var gTEA = new Array();
function aTE()
{
	gTEA[gTEA.length] = new tocEntry(aTE.arguments);
}

function tocEntry(fn_arguments) 
{
	if (fn_arguments.length < 3)	
	{
		alert ("data format wrong!!!");
		return;
	}
	
	this.nType = fn_arguments[0];
	this.nContents = fn_arguments[1];
	this.sItemName = fn_arguments[2];
	
	if (this.nType == 1 || this.nType == 2 || this.nType == 16)
	{
		if (fn_arguments.length > 3)
		{
			this.sItemURL = fn_arguments[3];
			if (fn_arguments.length > 4)
			{
				this.sTarget = fn_arguments[4];
				if (fn_arguments.length > 5)
					this.sIconRef = fn_arguments[5];
			}
		}
	}
	if (this.nType == 4 || this.nType == 8)
	{
		if (fn_arguments.length > 3)
		{
			this.sRefURL = fn_arguments[3];
			if (this.nType == 4)
			{
				if(this.sRefURL.lastIndexOf("/")!=this.sRefURL.length-1)
					this.sRefURL+="/";
			}
			if (fn_arguments.length > 4)
			{
				this.sItemURL = fn_arguments[4];
				if (fn_arguments.length > 5)
				{
					this.sTarget = fn_arguments[5];
					if (fn_arguments.length > 6)
						this.sIconRef = fn_arguments[6];
				}
			}
		}
	}
}


function window_OnLoad()
{
	if (parent && parent != this && parent.putData) {
		parent.putData(gTEA);
	}
}
window.onload = window_OnLoad;