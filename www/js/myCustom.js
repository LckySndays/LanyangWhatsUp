if(sessionStorage.length == 1){
	startAPP();
}

function startAPP(){
	if(sessionStorage.length == 1){
		idleDetect();
		parse = JSON.parse(sessionStorage.DataArray);	
		socket = io('https://lanyang-chat.herokuapp.com/');
		gravatar = "https://www.gravatar.com/avatar/" + md5(parse.stu_school_email) + "?d=wavatar";
		
		document.getElementById("user").innerHTML = 'Logged in as : ' + parse.stu_nameCH + "( " + parse.stu_ID + " )" + " - " + parse.stu_dept;
		socket.emit('user-join', {"name": parse.stu_nameCH, "id": parse.stu_ID, "dept": parse.stu_dept, "gravatar": gravatar});
		feedTransmit(parse.stu_nameCH + " has logged in");

		/*Get the total of users online from the server*/
		socket.on('user_online', function(data){
			document.getElementById("online").innerHTML = "ONLINE USERS (" + data + ")";
		});

		//Add the online users to the list one by one
		chatCount = 0;
		socket.on('user-list-append', function(data){
			
			if (chatCount%2 == 1){
				var side = 'right';
			}else{
				var side = 'left';
			}
			
			var div = document.createElement('div');
			div.className = 'chat-box-online-' + side;
			
			var img = document.createElement('img');
			img.src = data.gravatar;
			img.alt = 'bootstrap Chat box user image';
			img.className = 'img-circle';
			
			div.appendChild(img);
			var name2 = document.createTextNode(" - " + data.name);
			div.appendChild(name2);
			
			var br = document.createElement('br');
			div.appendChild(br);
			
			var name3 = document.createTextNode(" ( ");
			div.appendChild(name3);
			
			div5 = document.createElement('small');
			var name4 = document.createTextNode(data.dept + " - " + data.id);
			div5.appendChild(name4);
			
			div.appendChild(div5);
			
			var name5 = document.createTextNode(" ) ");
			div.appendChild(name5);
			
			var div6 = document.createElement('hr');
			div6.className = 'hr-clas-low';
			div.appendChild(div6);
			
			$('#users').append(div);
			chatCount += 1;
		});

		//If there is an user who leave the chat, Delete current online user list and request the new one
		socket.on('user_leave', function(){
		
				if($("#messages").length || $("#users").length){
					document.getElementById("users").innerHTML = '';
				}
				
				chatCount = 0;
				socket.emit('update', "online-users");
				
			
		});

		//Add the message received from the server to the message box
		chatCount2 = 0;
		socket.on('chat', function(msg){
			//console.dir(msg);
			
			if(window.location.pathname.indexOf("chat") <= -1){
				alertify.warning('New message from ' + msg.info.name);
			}
				
			if($("#messages").length){
				if (chatCount2%2 == 1){
					var side2 = 'right';
				}else{
					var side2 = 'left';
				}

				var div1 = document.createElement('div');
				div1.className = 'chat-box-' + side2;
				
				
				//Message Filter
				if(msg.message.indexOf("<script>") > -1){
					msg.message = msg.message.replace("<script>", "<*script>") + " <font color=red><h1>Script Blocked</h1></font>";
				}
				if(msg.message.indexOf("<img") > -1){
					msg.message = msg.message.replace("<img", "<img style='max-width: 100%'");
					
					if(msg.message.match("http://")){
						msg.message = msg.message.replace("http://", "https://") + " <i><p>(Auto Change to SSL Protocol, This Image may not load properly)</i>";
					}
				}
				
				if(msg.message.indexOf("{video}") == 0){
					msg.message = msg.message.replace("{video}", "");
					
					var videoDiv = document.createElement('div');
					videoDiv.id = "vid" + Math.floor(Math.random() * (100000 - 1) + 1);
					videoDiv.style = "max-width: 100%";
					
					div1.appendChild(videoDiv);
					//$('#messages').append(videoDiv);
					var video = true;

				}else if(msg.message.indexOf("{code}") == 0){
					msg.message = msg.message.replace("{code}", "");
					div1.innerHTML = "<pre><code class='language-markup'>" + html_beautify(msg.message, {}).replace(/</g,"&lt;") + "</code></pre>";
					var code = true;
					
				}else if(msg.message.indexOf("{code-js}") == 0){
					msg.message = msg.message.replace("{code-js}", "");
					
					//div1.innerHTML = "<pre><code>" + js_beautify(msg.message.replace(/</g,"&lt;")) + "</code></pre>";
					div1.innerHTML = "<pre><code class='language-javascript'>" + js_beautify(msg.message, {}).replace(/</g,"&lt;") + "</code></pre>";
					var code = true;
				
				}else if(msg.message.indexOf("{code-css}") == 0){
					msg.message = msg.message.replace("{code-css}", "");
					
					//div1.innerHTML = "<pre><code>" + js_beautify(msg.message.replace(/</g,"&lt;")) + "</code></pre>";
					div1.innerHTML = "<pre><code class='language-css'>" + css_beautify(msg.message, {}) + "</code></pre>";
					var code = true;
				
				}else{
				
					div1.innerHTML = msg.message;
				
				}
				
				var div2 = document.createElement('div');
				div2.className = 'chat-box-name-' + side2;
				
				var img = document.createElement('img');
				img.src = msg.info.gravatar;
				img.alt = 'bootstrap Chat box user image';
				img.className = 'img-circle';
				
				div2.appendChild(img);
				var name = document.createTextNode(" - " + msg.info.name);
				div2.appendChild(name);
				
				var div3 = document.createElement('hr');
				div3.className = 'hr-clas';
				
				$('#messages').append(div1);
				$('#messages').append(div2);
				$('#messages').append(div3);
				
				
				if(msg.message.indexOf("<code") > -1){
					Prism.highlightAll();
				}
				
				if(video == true){
					var playerInstance = jwplayer(videoDiv.id);
						playerInstance.setup({
						file: msg.message,
						height: 360
					});
					
					setTimeout(function(){ 
						var chat_div = document.getElementById('messages');
						chat_div.scrollTop = chat_div.scrollHeight;
					}, 1000);
					
				}else if(code == true){
				
					Prism.highlightAll();
				}
				
				var chat_div = document.getElementById('messages');
				chat_div.scrollTop = chat_div.scrollHeight;

				chatCount2 += 1;
				
			}

		});
		
		socket.on('feed', function(data){
			
			if(window.location.pathname.indexOf("chat") <= -1){
				alertify.set('notifier','position', 'bottom-right');
				alertify.warning(data);
			}else{
				alertify.set('notifier','position', 'bottom-left');
				alertify.warning(data);
			}
			
		});
		
		$(window).bind('storage', function(e)
		{
			if(e.originalEvent.storageArea===sessionStorage){
				disconnect();
			}
			// else, event is caused by an update to localStorage, ignore it
		});
		
	}
}

function disconnect(){
	
	if(sessionStorage.length == 1){
		sessionStorage.clear();
		socket.disconnect();
		document.getElementById("user").innerHTML = '';
	}
	redir('');
}

function redir(url){

	if(url == "presentation"){
	
		if(sessionStorage.length == 1 && parse.stu_ID == "403850398"){
			$('#view').injector().get('$location').path('presentation');
			$('#view').scope().$apply();
		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('You don\'t have access to this page');
		}
		
	}else if (url == "chat"){
	
		if(sessionStorage.length == 1){
			$('#view').injector().get('$location').path('chat');
			$('#view').scope().$apply();
		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Login First');
		}
		
	}else if (url == "online"){
	
		if(sessionStorage.length == 1){
			$('#view').injector().get('$location').path('online');
			$('#view').scope().$apply();
		}else{
			alertify.set('notifier','position', 'bottom-right');
			alertify.error('Please Login First');
		}
	
	}else{
	
		$('#view').injector().get('$location').path(url);
		$('#view').scope().$apply();
	
	}

}

function idleDetect(){
	$(document).ready(function () {
		var idleState = false;
		var idleTimer = null;
		$('*').bind('mousemove click mouseup mousedown keydown keypress keyup submit change mouseenter scroll resize dblclick', function () {
			clearTimeout(idleTimer);
			if (idleState == true) { 
				disconnect();
				//console.log("test");
			}
			idleState = false;
			idleTimer = setTimeout(function () { 
				disconnect();
				idleState = true; }, 300000);
				//console.log("test2");
		});
		$("body").trigger("mousemove");
	});
}

function feedTransmit(data){
	
	socket.emit('feed', data);

}

function autoFill(){
	
	if(sessionStorage.length == 1){
		document.getElementById("feed_name").value = parse.stu_nameCH;
		document.getElementById("feed_email").value = parse.stu_school_email;
		document.getElementById("feed_phone").value = parse.stu_phone;
		document.getElementById("feed_addr").value = parse.stu_addr_1;
	}else{
		alertify.set('notifier','position', 'bottom-right');
		alertify.error('Login to use the feature');
	}
	
}
