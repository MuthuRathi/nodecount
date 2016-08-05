/*
   Author: Muthu Rathi Lavanya Suresh
   Date:   5/18/2016

   Filename: node.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   attCount
      Running count of all attribute nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   setup() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeTree(sourceNode, nestedList) 
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   writeElemLI(elemNode, nestedList) 
      Writes a single list item based on the contents of an element node
      and then appends that list item to nestedList

   writeTextLI(textNode, nestedList) 
      Writes a single list item based on the contents of a text node
      and then appends that list item to nestedList

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't

*/

var nodeCount = 0;
var elemCount = 0;
var attCount = 0;
var textCount = 0;
var wsCount = 0;

window.onload = setup;

function writeElemLl(elemNode,nestedList){
	var liElem = document.createElement("li");
	var text1 = document.createTextNode("+--");
	liElem.appendChild(text1);
	var spanElem = document.createElement("span");
	spanElem.setAttribute("class","elemLl");
	var elemText = "<" + elemNode.nodeName;
	var elemAttributes = elemNode.attributes;
	
	for(var i=0; i<elemAttributes.length; i++ )
	{
		elemText += " "  + elemAttributes[i].name + "='" + elemAttributes[i].value + "' ";
	}
	
	elemText += ">";
	var elemTextNode = document.createTextNode(elemText);
	spanElem.appendChild(elemTextNode);
	liElem.appendChild(spanElem);
	nestedList.appendChild(liElem);
	
}

function writeTextLl(textNode,nestedList){
	var liElem = document.createElement("li");
	var text1 = document.createTextNode("+--");
	liElem.appendChild(text1);
	var spanElem = document.createElement("span");
	var textString = textNode.nodeValue;
	isWhiteSpaceNode(textString);
	if(isWhiteSpaceNode == true)
	{
		wsCount++;
		spanElem.setAttribute("class","wsLl");
		spanElem.innerHTML = "#text";
	}
	else{
		spanElem.setAttribute("class","textLl");
		spanElem.innerHTML = textNode.nodeValue;
	}
	liElem.appendChild(spanElem);
	nestedList.appendChild(liElem);
}


function makeTree(sourceNode,nestedList){
	if(sourceNode == undefined)
		return;
	
	nodeCount++;
	var type = sourceNode.nodeType;
	if(type == "1"){
		elemCount++;
		writeElemLl(sourceNode,nestedList);
	}
	else if(type == "3"){
		elemCount++;
		writeTextLl(sourceNode,nestedList);
	}
	if(sourceNode.childNodes.length >= 1){
		var newList = document.createElement("ol");
		var text1 = document.createTextNode("|");
		newList.appendChild(text1);
		for(var i=0;i<=sourceNode.childNodes.length;i++){
			makeTree(sourceNode.childNodes[i],newList);
		}
		nestedList.appendChild(newList);
	}
	

}

function setup(){
	var sourceNode = document.getElementById("topArticle");
	var treeBox = document.createElement("aside");
	treeBox.setAttribute("id","treeBox");
	treeBox.innerHTML = "<h1>Node Tree<h1>";
	var newList = document.createElement("ol");
	makeTree(sourceNode,newList);
	treeBox.appendChild(newList);
	var section1 = document.getElementById("main");
	section1.appendChild(treeBox);
	
}



function isWhiteSpaceNode(tString) {
   return !(/[^\t\n\r ]/.test(tString));
}
