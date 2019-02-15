'use strict'

let toggle = document.getElementById("theme-toggle")

let body = document.body;

(function () {
    toggle.append(document.createElement('i'))
    toggle.firstElementChild.setAttribute('id', 'toggle-button')
    toggle.firstElementChild.setAttribute('title', 'Theme change!')
})()


function init() {
    let theme = read()
    var el = toggle.firstElementChild

    if (theme == "") {
        // cookie doesn't exist, set the light theme
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    } else if (theme == "light") {
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    } else if (theme == "dark") {
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', 'dark-mode')
    }
}

function toggleTheme() {
    let theme = read()
    var el = toggle.firstElementChild

    clear(el)

    if (theme == "") {
        // cookie doesn't exist, set the light theme
        set("light")
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', '')
        return
    } else if (theme == "light") {
        set("dark")
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', 'dark-mode')
    } else if (theme == "dark") {
        set("light")
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    }
}

/**
 * Reads the cookie value of the theme key.
 */
function read() {
    let cookie = document.cookie.split(';')

    let result = ""

    for (var i = 0; i < cookie.length; i++) {
        var c = cookie[i];
        // Is the value read to be read?
        var readIt = false
        // The key that will be formed as it reads the cookie
        var key = ''

        for (var j = 0; j < c.length; j++) {
            if (readIt == false) {
                key += c[j]
            } else {
                result += c[j]
            }

            if (key == 'theme' && !readIt) {
                readIt = true
                j++
            }
        }
    }

    return result;
}

/**
 * Sets the cookie value of the theme key.
 */
function set(value) {
    var date = new Date()
    date.setTime(date.getTime() + (30 * 60 * 60 * 24 * 1000))

    document.cookie = "theme=" + value + ";expires=" + date.toUTCString() + ";path=/"
}

function clear(element) {
    element.setAttribute('class', '')
}

init()

var button = document.getElementById('toggle-button')

button.addEventListener('click', function() { toggleTheme() })
