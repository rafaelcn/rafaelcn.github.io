'use strict'

let toggle = document.getElementById("theme-toggle")
let body = document.body;

(function () {
    toggle.append(document.createElement('i'))
    toggle.firstElementChild.setAttribute('id', 'toggle-button')
    toggle.firstElementChild.setAttribute('title', 'Theme change!')
})()

let el = toggle.firstElementChild

function init() {
    if (read() == "" || read() === undefined) {
        // cookie doesn't exist, set the light theme
        set("light")
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    } else if (read() == "light") {
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    } else if (read() == "dark") {
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', 'dark-mode')
    }
}

function toggleTheme() {
    clear(el)

    if (read() == "") {
        // cookie doesn't exist, set the light theme
        set("light")
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', '')
        return
    } else if (read() == "light") {
        set("dark")
        el.setAttribute('class', 'fa fa-sun-o')
        body.setAttribute('class', 'dark-mode')
    } else if (read() == "dark") {
        set("light")
        el.setAttribute('class', 'fa fa-moon-o')
        body.setAttribute('class', '')
    }
}

function read() {
    return Cookies.get('theme')
}

function set(value) {
    Cookies.set('theme', value)
}

function clear(element) {
    element.setAttribute('class', '')
}

init()

var button = document.getElementById('toggle-button')

button.addEventListener('click', function() { toggleTheme() })
