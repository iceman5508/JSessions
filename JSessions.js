var JSession = function(){

    var cookie = false;
    var runnable = false;
    /**
     * Check if the browser is compatible with 
     * the storage method
     */
    this.compatible = function () {
            if (typeof(Storage) !== "undefined") {
                runnable = true;
            } else {
                if(navigator.cookieEnabled){
                    cookie = true;
                    runnable = true;
                }
            }
        }
    
    this.compatible();

    /**
     * Create a local storage data
     * @param key - the key
     * @param value - the value
     */
    this.put = function (key, value) {
            if(runnable){
                if(cookie){
                    setCookie(key,value, 7);
                }else{
                    localStorage.setItem(key, value);
                }
                return true;
            }else{
                alert("Your browser does not support our storage method! Application will not work as expected!");
                return false;
            }
        }

    /**
     * Return the storage value
     * @param key
     * @returns {*}
     */
    this.get = function(key){
        if(runnable){
            if(cookie){
                return getCookie(key)
            }else{
                return localStorage.getItem(key);
            }
        }else{
            alert("Your browser does not support our storage method! Application will not work as expected!");
        }
    }

    /**
     * Remove a storage from memory
     * @param key
     * @returns {boolean}
     */
    this.delete = function(key){
        if(runnable){
            if(cookie){
                eraseCookie(key);
            }else{
               localStorage.removeItem(key);
            }
            return true;
        }else{
            alert("Your browser does not support our storage method! Application will not work as expected!");
            return false;
        }
    }

    /**
     * Clear all storage from memory
     * @returns {boolean}
     */
    this.clearAll = function () {
        if(runnable){
            if(cookie){
                var cookies = document.cookie.split(";");
                for (var i = 0; i < cookies.length; i++){
                    eraseCookie(cookies[i].split("=")[0]);
                }

            }else{
                localStorage.clear();
            }
            return true;
        }else{
            alert("Your browser does not support our storage method! Application will not work as expected!");
            return false;
        }
    }

    /**
     * Check if a specific storgae instance exists
     * @param key
     */
    this.exists = function (key) {
        if(runnable){
            if(cookie){
                if(getCookie(key) == null){
                    return false;
                }
                return true
            }else{
                if (localStorage.getItem(key) === null) {
                    return false;
                }
                return true;
            }
        }else{
            alert("Your browser does not support our storage method! Application will not work as expected!");
            return false;
        }
    }

    function setCookie(name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    function eraseCookie(name) {
        document.cookie = name+'=; Max-Age=-99999999;';
    }
    
    
}