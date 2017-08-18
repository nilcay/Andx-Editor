ANDX = {};
function get(a){return arguments[1] ? arguments[1].getElementsByTagName(a) : document.getElementById(a)}
ANDX.Editor = function(id, objectId, config) {
	var self = this;
	this.frame;
	this.viewFull = false;
	this.viewSource = false;
	this.path = "";
	this.cssFile = "";
	this.editorHtml = "";
	this.frameHtml = "";
	this.textareaValue = "";
	this.charset = "utf-8";
	this.tool = [];
	this.tool["format"] = {
		"type": "select",
		"action": "formatblock",
		"option": [
			["",
			{
				"en-us": "Block",
				"zh-cn": "段落"
			}],
			["<p>",
			{
				"en-us": "P",
				"zh-cn": "P"
			}],
			["<pre>",
			{
				"en-us": "Code",
				"zh-cn": "代码"
			}],
			["<h1>",
			{
				"en-us": "H1",
				"zh-cn": "H1"
			}],
			["<h2>",
			{
				"en-us": "H2",
				"zh-cn": "H2"
			}],
			["<h3>",
			{
				"en-us": "H3",
				"zh-cn": "H3"
			}]
		]
	};
	this.tool["color"] = {
		"type": "select",
		"action": "forecolor",
		"option": [
			["",
			{
				"en-us": "Color",
				"zh-cn": "颜色"
			}],
			["black",
			{
				"en-us": "Black",
				"zh-cn": "黑色"
			}],
			["blue",
			{
				"en-us": "Blue",
				"zh-cn": "蓝色"
			}],
			["brown",
			{
				"en-us": "Brown",
				"zh-cn": "棕色"
			}],
			["green",
			{
				"en-us": "Green",
				"zh-cn": "绿色"
			}],
			["grey",
			{
				"en-us": "Grey",
				"zh-cn": "灰色"
			}],
			["orange",
			{
				"en-us": "Orange",
				"zh-cn": "橙色"
			}],
			["purple",
			{
				"en-us": "Purple",
				"zh-cn": "紫色"
			}],
			["pink",
			{
				"en-us": "Pink",
				"zh-cn": "粉红"
			}],
			["red",
			{
				"en-us": "Red",
				"zh-cn": "红色"
			}],
			["white",
			{
				"en-us": "White",
				"zh-cn": "白色"
			}],
			["yellow",
			{
				"en-us": "Yellow",
				"zh-cn": "黄色"
			}]
		]
	};
	this.tool["size"] = {
		"type": "select",
		"action": "fontsize",
		"option": [
			["",
			{
				"en-us": "Size",
				"zh-cn": "大小"
			}],
			["1",
			{
				"en-us": "1",
				"zh-cn": "一号"
			}],
			["2",
			{
				"en-us": "2",
				"zh-cn": "二号"
			}],
			["3",
			{
				"en-us": "3",
				"zh-cn": "三号"
			}],
			["4",
			{
				"en-us": "4",
				"zh-cn": "四号"
			}],
			["5",
			{
				"en-us": "5",
				"zh-cn": "五号"
			}],
			["6",
			{
				"en-us": "6",
				"zh-cn": "六号"
			}],
			["7",
			{
				"en-us": "7",
				"zh-cn": "七号"
			}]
		]
	};
	this.tool["bold"] = {
		"icon": 0,
		"type": "button",
		"action": "bold",
		"title": {
			"en-us": "Bold",
			"zh-cn": "粗体"
		}
	};
	this.tool["italic"] = {
		"icon": 1,
		"type": "button",
		"action": "italic",
		"title": {
			"en-us": "Italic",
			"zh-cn": "斜体"
		}
	};
	this.tool["underline"] = {
		"icon": 2,
		"type": "button",
		"action": "underline",
		"title": {
			"en-us": "Underline",
			"zh-cn": "下划线"
		}
	};
	this.tool["left"] = {
		"icon": 3,
		"type": "button",
		"action": "justifyleft",
		"title": {
			"en-us": "Left",
			"zh-cn": "居左"
		}
	};
	this.tool["center"] = {
		"icon": 4,
		"type": "button",
		"action": "justifycenter",
		"title": {
			"en-us": "Center",
			"zh-cn": "居中"
		}
	};
	this.tool["right"] = {
		"icon": 5,
		"type": "button",
		"action": "justifyright",
		"title": {
			"en-us": "Right",
			"zh-cn": "居右"
		}
	};
	this.tool["ol"] = {
		"icon": 6,
		"type": "button",
		"action": "insertorderedlist",
		"title": {
			"en-us": "Ordered List",
			"zh-cn": "有序列表"
		}
	};
	this.tool["ul"] = {
		"icon": 7,
		"type": "button",
		"action": "insertunorderedlist",
		"title": {
			"en-us": "Unordered List",
			"zh-cn": "无序列表"
		}
	};
	this.tool["outdent"] = {
		"icon": 8,
		"type": "button",
		"action": "outdent",
		"title": {
			"en-us": "Outdent",
			"zh-cn": "外缩进"
		}
	};
	this.tool["indent"] = {
		"icon": 9,
		"type": "button",
		"action": "indent",
		"title": {
			"en-us": "Indent",
			"zh-cn": "内缩进"
		}
	};
	this.tool["link"] = {
		"icon": 10,
		"type": "button",
		"action": "createlink",
		"title": {
			"en-us": "Link",
			"zh-cn": "插入链接"
		},
		"notice": {
			"en-us": "Input the URL",
			"zh-cn": "请输入链接网址"
		}
	};
	this.tool["unlink"] = {
		"icon": 11,
		"type": "button",
		"action": "unlink",
		"title": {
			"en-us": "Unlink",
			"zh-cn": "清除链接"
		}
	};
	this.tool["image"] = {
		"icon": 12,
		"type": "button",
		"action": "insertimage",
		"title": {
			"en-us": "Image",
			"zh-cn": "插入图片"
		},
		"notice": {
			"en-us": "Input the URL of image",
			"zh-cn": "请输入图片网址"
		}
	};
	this.tool["source"] = {
		"icon": 14,
		"type": "panel",
		"action": "toggleSource",
		"title": {
			"en-us": "Switch modes",
			"zh-cn": "切换编辑模式"
		}
	};
	this.tool["full"] = {
		"icon": 15,
		"type": "panel",
		"action": "toggleFull",
		"title": {
			"en-us": "Full screen",
			"zh-cn": "缩放"
		}
	};
	this.error = {
		"constructor": "Id or ObjectId is error.",
		"idNotExist": "Id(" + this.id + ") is not exist.",
		"content": "ObjectId(" + this.objectId + "):get null."
	};
	this.browser = {
		"ie": Boolean(document.body.currentStyle),
		"gecko": (navigator.userAgent.toLowerCase().indexOf("gecko") != -1)
	};
	if (!id || !objectId) {
		alert(this.error.constructor)
	}
	this.id = id;
	this.objectId = objectId;
	this.lng = (config.language && this.tool["bold"].title[config.language]) ? config.language : "en-us";
	this.width = config.width || "500";
	this.height = config.height || "300";
	this.icon_w = config.icon_width || "32";
	this.icon_h = config.icon_height || "32";
	this.textareaValue = config.content || "";
	this.init = function() {
		if (get && document.createElement && document.designMode && (this.browser.ie || this.browser.gecko)) {
			if (!get(this.id)) {
				alert(this.error.idNotExist);
				return
			}
			if (this.textareaValue == "")
			{
				this.textareaValue = get(this.id).value;
				this.textareaValue = this.textareaValue.replace(/#lt;/g, "&lt;");
				this.textareaValue = this.textareaValue.replace(/#gt;/g, "&gt;");
			}
			var xeditor = document.createElement("div");
			get(this.id).parentNode.replaceChild(xeditor, get(this.id));
			xeditor.id = this.id + "-xeditor";
			xeditor.innerHTML = this.editorHtml ? this.editorHtml : this.getEditorHtml();
			if (this.browser.ie) {
				this.frame = frames[this.id + "-frame"]
			} else {
				if (this.browser.gecko) {
					this.frame = get(this.id + "-frame").contentWindow
				}
			}
			this.frame.document.designMode = "on";
			this.frame.document.open();
			this.frame.document.write(this.frameHtml ? this.frameHtml : this.getFrameHtml());
			this.frame.document.close();
			insertHtmlFromTextarea()
		}
	};

	function lockUrls(s) {
		if (self.browser.gecko) {
			return s
		}
		return s.replace(/href=["']([^"']*)["']/g, 'href="andxeditor://andxeditor/$1"')
	}
	function unlockUrls(s) {
		if (self.browser.gecko) {
			return s
		}
		return s.replace(/href=["']andxeditor:\/\/andxeditor\/([^"']*)["']/g, 'href="$1"')
	}
	function insertHtmlFromTextarea() {
		try {
			self.frame.document.body.innerHTML = lockUrls(self.textareaValue)
		} catch (e) {
			setTimeout(insertHtmlFromTextarea, 10)
		}
	}
	this.getEditorHtml = function() {
		var html = "";
		html += '<input type="hidden" id="' + this.id + '" name="' + this.id + '" value="">';
		html += '<div class="xeditor" id="' + this.id + '-xeidtor" style="width:' + this.width + 'px">';
		html += '<div class="bar" id="' + this.id + '-xbar"><ul class="tools" id="' + this.id + '-tools">';
		if (config.tools) {
			for (i = 0; i < config.tools.length; i++) {
				var tool = this.tool[config.tools[i]];
				if (tool.type == "button") {
					tid = this.id + "-tools-" + config.tools[i];
					html += '<li><input type="button" id="' + tid + '" style="background-position:0px -' + (tool.icon * this.icon_h) + 'px" title="' + tool.title[this.lng] + '" onmouseover="' + this.objectId + ".onmouse('" + tid + "'," + tool.icon + ',1)" onmouseout="' + this.objectId + ".onmouse('" + tid + "'," + tool.icon + ',0)" onclick="' + this.objectId + ".execCommand('" + tool.action + "')\"></li>"
				} else {
					if (tool.type == "select") {
						html += '<li><select onchange="' + this.objectId + ".execCommand('" + tool.action + "', this.value);this.selectedIndex=0;\">";
						for (n = 0; n < tool.option.length; n++) {
							html += '<option value="' + tool.option[n][0] + '">' + tool.option[n][1][this.lng] + "</option>"
						}
						html += "</select></li>"
					}
				}
			}
		}
		html += '</ul><ul class="xpanel">';
		if (config.panel) {
			for (i = 0; i < config.panel.length; i++) {
				var tool = this.tool[config.panel[i]];
				if (tool.type == "panel") {
					tid = this.id + "-view" + config.panel[i];
					html += '<li id="' + tid + '" style="background-position:0px -' + (tool.icon * this.icon_h) + 'px" title="' + tool.title[this.lng] + '" onclick="' + this.objectId + "." + tool.action + '()"></li>'
				}
			}
		}
		html += '</ul></div><div class="frame" id="' + this.id + '-xframe" style="height:' + this.height + 'px"><iframe id="' + this.id + '-frame" frameborder="0"></iframe></div>';
		html += "</div>";
		return html
	};
	this.getFrameHtml = function() {
		var html = "";
		html += '<!DOCTYPE html>';
		html += "<html><head>";
		html += '<meta http-equiv="Content-Type" content="text/html; charset=' + this.charset + '">';
		html += "<title>AndxEditor Frame</title>";
		html += '<style type="text/css">pre {background-color: #eeeeee; padding: 0.75em 1.5em; border: 1px solid #dddddd;}</style>';
		if (this.cssFile) {
			html += '<link rel="stylesheet" type="text/css" href="' + this.cssFile + '">'
		}
		html += '<style type="text/css">html,body {cursor: text;} body {margin: 0.5em; padding: 0;}</style>';
		html += "</head><body></body></html>";
		return html
	};
	this.openWindow = function(url, width, height) {
		var x = (screen.width / 2 - width / 2);
		var y = (screen.height / 2 - height / 2);
		window.open(url, "", "scrollbars=yes,width=" + width + ",height=" + height + ",screenX=" + (x) + ",screenY=" + y + ",left=" + x + ",top=" + y)
	};
	this.onmouse = function(id, icon, type) {
		var w = type * this.icon_w;
		var h = icon * this.icon_h;
		get(id).style.backgroundPosition = "-" + w + "px -" + h + "px"
	};
	this.toggleSource = function() {
		var html, text;
		if (this.browser.ie) {
			if (!this.viewSource) {
				html = this.frame.document.body.innerHTML;
				this.frame.document.body.innerText = unlockUrls(html);
				get(this.id + "-tools").style.visibility = "hidden";
				this.viewSource = true
			} else {
				text = this.frame.document.body.innerText;
				this.frame.document.body.innerHTML = lockUrls(text);
				get(this.id + "-tools").style.visibility = "visible";
				this.viewSource = false
			}
		} else {
			if (this.browser.gecko) {
				if (!this.viewSource) {
					html = document.createTextNode(this.frame.document.body.innerHTML);
					this.frame.document.body.innerHTML = "";
					this.frame.document.body.appendChild(html);
					get(this.id + "-tools").style.visibility = "hidden";
					this.viewSource = true
				} else {
					html = this.frame.document.body.ownerDocument.createRange();
					html.selectNodeContents(this.frame.document.body);
					this.frame.document.body.innerHTML = html.toString();
					get(this.id + "-tools").style.visibility = "visible";
					this.viewSource = false
				}
			}
		}
		get(this.id + "-viewsource").className = this.viewSource ? "active" : "";
		this.onmouse(this.id + "-viewsource", this.tool["source"].icon, (this.viewSource ? 1 : 0));
		get(this.id + "-viewsource").blur()
	};
	this.toggleFull = function() {
		if (!this.viewFull) {
			get(this.id + "-xeidtor").className = "xeditor viewFull";
			get(this.id + "-xeidtor").style.width = "100%";
			var bodyHeight = document.documentElement.clientHeight;
			var barHeight = get(this.id + "-xbar").offsetHeight;
			var frameHeight = bodyHeight - barHeight - 3;
			get(this.id + "-xframe").style.height = frameHeight + "px";
			get(this.id + "-viewfull").className = "active";
			this.onmouse(this.id + "-viewfull", this.tool["full"].icon, 1);
			this.viewFull = true
		} else {
			get(this.id + "-xeidtor").className = "xeditor";
			get(this.id + "-xeidtor").style.width = this.width + "px";
			get(this.id + "-xframe").style.height = this.height + "px";
			get(this.id + "-viewfull").className = "";
			this.onmouse(this.id + "-viewfull", this.tool["full"].icon, 0);
			this.viewFull = false
		}
	};
	this.execCommand = function(cmd, value) {
		if (this.viewSource) return;
		if (cmd == "createlink" && !value) {
			var url = prompt(this.tool["link"].notice[this.lng], "");
			if (url) {
				this.frame.focus();
				this.frame.document.execCommand("unlink", false, null);
				if (this.browser.ie) {
					this.frame.document.execCommand(cmd, false, "andxeditor://andxeditor/" + url)
				} else {
					if (this.browser.gecko) {
						this.frame.document.execCommand(cmd, false, url)
					}
				}
				this.frame.focus()
			}
		} else {
			if (cmd == "insertimage" && !value) {
				var imageUrl = prompt(this.tool["image"].notice[this.lng], "");
				if (imageUrl) {
					this.frame.focus();
					this.frame.document.execCommand(cmd, false, imageUrl);
					this.frame.focus()
				}
			} else {
				this.frame.focus();
				this.frame.document.execCommand(cmd, false, value);
				this.frame.focus()
			}
		}
	};
	this.isOn = function() {
		return Boolean(this.frame)
	};
	this.getContent = function() {
		try {
			return unlockUrls(this.frame.document.body.innerHTML)
		} catch (e) {
			alert(this.error.content)
		}
	};
	this.post = function() {
		if (this.isOn()) {
			if (this.viewSource) {
				this.toggleSource()
			}
			var sPost = this.getContent();
			sPost = sPost.replace(/\s+/g, " ");
			sPost = sPost.replace(/<![^>]+>/g, "");
			sPost = sPost.replace(/<base[^>]+>/g, "");
			sPost = sPost.replace(/<input[^>]+>/g, "");
			sPost = sPost.replace(/<link[^>]+>/g, "");
			sPost = sPost.replace(/<meta[^>]+>/g, "");
			sPost = sPost.replace(/<body([\S\s\t]*?)<\/body>/g, "");
			sPost = sPost.replace(/<head([\S\s\t]*?)<\/head>/g, "");
			sPost = sPost.replace(/<html([\S\s\t]*?)<\/html>/g, "");
			sPost = sPost.replace(/<iframe([\S\s\t]*?)<\/iframe>/g, "");
			sPost = sPost.replace(/<script([\S\s\t]*?)<\/script>/g, "");
			sPost = sPost.replace(/<style([\S\s\t]*?)<\/style>/g, "");
			sPost = sPost.replace(/<title([\S\s\t]*?)<\/title>/g, "");
			get(this.id).value = sPost
		}
	}
};