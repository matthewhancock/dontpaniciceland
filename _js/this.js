var lastSelected;
var navigating = false;
window.onpopstate = function (event) { OutputState(event.state); };

function link(linkDOM) {
    if (history.pushState) {
        if (lastSelected == null || linkDOM.id !== lastSelected.id) { // don't do anything if clicking same link...
            if (!navigating) {
                navigating = true;
                document.getElementById("nav").classList.add("collapsed");

                var r = new XMLHttpRequest();
                r.addEventListener("load", function (response) {
                    if (r.readyState == 4) {
                        var d = JSON.parse(r.responseText);
                        var state = { href: linkDOM.href, title: d.title, hrefid: linkDOM.id, content: d.content };
                        for (p in linkDOM.dataset) {
                            state[p] = linkDOM.dataset[p];
                        }
                        history.pushState(state, state.title, state.href);
                        OutputState(state, linkDOM);
                        navigating = false;
                    }
                });
                r.addEventListener("error", function (response) {
                    //e.innerHTML = "Error....";
                    //e.classList.remove("hide");
                }, false);
                r.open('GET', "/json/" + linkDOM.dataset.page);
                r.send(null);
            }
        }
        return false;
    } else {
        return true;
    }
}
function burger_click() {
    document.getElementById("nav").classList.toggle("collapsed");
}
function OutputState(state, linkDOM) {
    if (lastSelected) {
        lastSelected.classList.remove("selected");
    }
    if (state) {
        // if linkDOM is passed...this is from trigger
        // else it's from back button - get from ID on passed state...
        if (!linkDOM) {
            linkDOM = document.getElementById(state.hrefid);
        }
        linkDOM.classList.add("selected");
        if (!lastSelected || lastSelected.id != linkDOM.id) { // if this is the first click or unique click then do something...
            var contentDiv = document.getElementById("content");
            contentDiv.className = state.page;
            var main = document.getElementById("main");
            if (state.content) {
                main.innerHTML = state.content;
            }
            if (state.title) {
                document.title = state.title;
            }
        }
    } else {
        // reload page, null state!
        // or initial post on Chrome...
    }
}





function hide(control) {
    control.style.display = "none";
}
function show(control) {
    control.style.display = "inline";
}
function hideById(controlID) {
    document.getElementById(controlID).style.display = "none";
}
function launchVideo(id, title, playerType, height) {
    var p = new meshNet.modal("1200px");
    var i = document.createElement("iframe");
    var src;
    if (playerType = "vimeo") {
        src = "http://player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0&color=7f9fb8";
    } else {
        src = "http://www.youtube.com/embed/" + id;
    }
    i.src = src; i.style.border = "none"; i.style.width = "1200px"; i.style.height = (height ? height : "675") + "px";
    p.appendChild(i);
    p.setTitle(title);
    p.open();
}

function trim(string) {
    string = string.replace(/^\s+/, '');
    for (var i = string.length - 1; i >= 0; i--) {
        if (/\S/.test(string.charAt(i))) {
            string = string.substring(0, i + 1);
            break;
        }
    }
    return string;
}
function validatePhoneNumber(txtBox) {
    var text = txtBox.value;
    var output = "";
    if (text.length > 0) {
        for (var i = 0, len = text.length; i < len; i++) {
            var char = text.charAt(i);
            if (i == 0) {
                if (char != "(") {
                    output = "(";
                    if (isNumber(char)) {
                        output += char;
                    }
                } else {
                    output += char;
                }
            } else if (i == 4) {
                if (char != ")") {
                    output += ")";
                    if (isNumber(char)) {
                        output += char;
                    }
                } else {
                    output += char;
                }
            } else if (i == 5) {
                if (char != " ") {
                    output += " ";
                    if (isNumber(char)) {
                        output += char;
                    }
                } else {
                    output += char;
                }
            } else if (i == 9) {
                if (char != "-") {
                    output += "-";
                    if (isNumber(char)) {
                        output += char;
                    }
                } else {
                    output += char;
                }
            } else {
                if (isNumber(char)) {
                    output += char;
                }
            }
        }
    }
    txtBox.value = output;
}
function isNumber(number) {
    var numbers = "0123456789";
    return numbers.indexOf(number) > -1;
}

var meshNet = { path: null, sessionID: null};
meshNet.External = { javascript: ['//www.youtube.com/player_api', '//platform.twitter.com/widgets.js', 'https://apis.google.com/js/plusone.js', '//connect.facebook.net/en_US/all.js'] };
meshNet.External.Facebook = { initiated: false, applicationID: null };
meshNet.External.Facebook.User = { loggedIn: false, ID: null, accessToken: null, firstName: null, lastName: null, displayName: null, url: null, username: null, lastUpdate: null };
meshNet.External.Twitter = {  };

// meshNet
meshNet.load = function () {
    this.div = document.getElementById("meshNet-div");
    //this.External.load();
    meshNet.resize.add(meshNet.resizeModal);
}
meshNet.AsyncPostback = function (sender, args) {
    meshNet.resizeModal();
}
meshNet.resizeModal = function () {
    var docWidth = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : (document.body.clientWidth ? document.body.clientWidth : 0));
    var docHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : (document.body.clientHeight ? document.body.clientHeight : 0));

    var resize = function (modalControl) {
        var style = modalControl.style;
        var width = modalControl.clientWidth;
        var height = modalControl.clientHeight;
        var posX = (docWidth - width) / 2;
        var posY = (docHeight - height) / 2;
        if (width > docWidth) {
            style.width = docWidth;
        }
        if (height > docHeight) {
            style.height = docHeight;
        }
        style.left = posX > 0 ? posX + "px" : 0 + "px";
        style.top = posY > 0 ? posY + "px" : 0 + "px";
    };

    if (docWidth > 0 && docHeight > 0) {
        var controlList = document.getElementsByName(constants.MODAL_NAME);
        for (var i = 0, len = controlList.length; i < len; i++) {
            resize(controlList[i]);
        }
    }
}
meshNet.loginSuccess = function () { };
meshNet.loginError = function (message) { };

meshNet.callback = function () {
    var f = [];
    var fst = null;
    this.add = function (callback) {
        f[f.length] = callback;
    };
    this.complete = function (lastCallback) {
        if (fst != null) {
            fst();
        }
        var len = f.length;
        if (len > 0) {
            for (var i = 0; i < len; i++) {
                if (f[i] != null) {
                    f[i]();
                }
            }
        }
        if (lastCallback && (typeof lastCallback === 'function')) {
            lastCallback();
        }
    };
    this.first = function (firstCallback) {
        fst = firstCallback;
    };
};
meshNet.resize = new meshNet.callback();
window.onresize = meshNet.resize.complete;


// constants
var constants = { MODAL_NAME: "vo-modal", ROOT_DIV_ID: "vo-div" };
// language
this.language = { close: "Close" };
// util
var util = {};
util.create = function (tagName, cssClass) {
    var e = document.createElement(tagName);
    if (cssClass != null) {
        e.setAttribute("class", cssClass)
    }
    return e;
}

meshNet.modal = function (width, height) {
    var table = util.create("table", "vo-modal-panelwrapper");
    var tr = util.create("tr"); table.appendChild(tr);
    var td = util.create("td"); tr.appendChild(td);
    var div = util.create("div", "vo-modal-panel");
    var div_title = util.create("div", "vo-modal-panel-title");
    var div_content = util.create("div", "vo-modal-panel-content");
    div.setAttribute("name", constants.MODAL_NAME);
    if (width) {
        div.style.width = width;
    }
    if (height) {
        div.style.height = height;
    }
    this.open = function () {
        meshNet.div.appendChild(table);
        meshNet.div.appendChild(div);
        this.resize();
        td.onclick = this.close;
        meshNet.resize.complete(this.resize);
    };
    this.close = function () {
        meshNet.div.removeChild(table);
        meshNet.div.removeChild(div);
    };
    this.resize = function () {
        var docWidth = window.innerWidth ? window.innerWidth : (document.documentElement.clientWidth ? document.documentElement.clientWidth : (document.body.clientWidth ? document.body.clientWidth : 0));
        var docHeight = window.innerHeight ? window.innerHeight : (document.documentElement.clientHeight ? document.documentElement.clientHeight : (document.body.clientHeight ? document.body.clientHeight : 0));

        var style = div.style;
        var width = div.clientWidth;
        var height = div.clientHeight;
        var posX = (docWidth - width) / 2;
        var posY = (docHeight - height) / 2;
        if (width > docWidth) {
            style.width = docWidth;
        }
        if (height > docHeight) {
            style.height = docHeight;
        }
        style.left = posX > 0 ? posX + "px" : 0;
        style.top = posY > 0 ? posY + "px" : 0;
    };
    this.appendChild = function (element) {
        div_content.appendChild(element);
    };
    this.setInnerHTML = function (html) {
        div_content.innerHTML = html;
    };
    var t = util.create("span", "vo-modal-panel-title-label");
    this.setTitle = function (title) {
        t.innerHTML = title;
    }
    div_title.appendChild(t);
    var a = util.create("a", "vo-modal-panel-title-closelink");
    a.href = "javascript:;"; a.onclick = this.close; a.innerHTML = language.close;
    div_title.appendChild(a);
    div.appendChild(div_title);
    div.appendChild(div_content);
};
// meshNet.External
meshNet.External.load = function () {
    // define async methods...
    // facebook
    window.fbAsyncInit = function () { meshNet.External.Facebook.load() };
    // load javascript files
    this.loadJavascript();
}
meshNet.External.loadJavascript = function () {
    for (var i = 0, len = this.javascript.length; i < len; i++) {
        var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
        po.src = this.javascript[i];
        meshNet.div.appendChild(po);
    }
}

// meshNet.External.Facebook
meshNet.External.Facebook.load = function () {
    if (!this.initiated && this.applicationID) {
        // add facebook div
        var fbDiv = document.createElement("div"); fbDiv.id = "fb-root"; meshNet.div.appendChild(fbDiv);
        // init facebook
        FB.init({
            appId: this.applicationID,
            status: true,
            cookie: true,
            xfbml: true,
            oauth: true,
            logging: false
        });
        // get login information, if it exists
        this.checkLoginStatus();
        // subscribe to events
        FB.Event.subscribe('edge.create', this.like);
        this.initiated = true;
    }
};
meshNet.External.Facebook.User.refresh = function (authResponse) {
    if (authResponse) {
        meshNet.External.Facebook.User.loggedIn = true;
        meshNet.External.Facebook.User.ID = authResponse.userID;
        meshNet.External.Facebook.User.accessToken = authResponse.accessToken;
        this.retrieveDetails();
    }
}
meshNet.External.Facebook.User.retrieveDetails = function () {
    FB.api('/me', this.fillDetails);
}
meshNet.External.Facebook.User.fillDetails = function (data) {
    meshNet.External.Facebook.User.firstName = data.first_name;
    meshNet.External.Facebook.User.lastName = data.last_name;
    meshNet.External.Facebook.User.displayName = data.name;
    meshNet.External.Facebook.User.url = data.link;
    meshNet.External.Facebook.User.lastUpdate = data.updated_time;
}
meshNet.External.Facebook.login = function () {
    FB.login(function(response) {
        meshNet.External.Facebook.User.refresh(response.authResponse);
    });
};
meshNet.External.Facebook.checkLoginStatus = function () {
    FB.getLoginStatus(function (response) {
        meshNet.External.Facebook.User.refresh(response.authResponse);
    });
};
meshNet.External.Facebook.like = function (response) {
    meshNet.External.Facebook.checkLoginStatus();
    var user = meshNet.External.Facebook.User;
    if (user.loggedIn) {
        jQuery.ajax({ type: "POST", url: meshNet.path + "/handlers/fb/like", data: { url: response, userID: user.ID }, success: function (data) {  } });
    }
};
meshNet.External.Facebook.ProfilePicture = function (callback) {
    FB.login(function (response) {
        if (response.authResponse) {
            meshNet.External.Facebook.User.refresh(response.authResponse);
            FB.api('/me/albums', function (response) {
                for (album in response.data) {
                    // Find the Profile Picture album
                    if (response.data[album].name == "Profile Pictures") {
                        // Get a list of all photos in that album.
                        FB.api(response.data[album].id + "/photos?return_ssl_resources=1", function (response) {
                            //The image link
                            callback(response.data[0].images[0].source);
                        });
                        break;
                    }
                }
            });
        } else {
            alert("Access to profile picture not granted.");
        }
    }, { scope: 'user_photos' });
};
// meshNet.External.Twitter