'use strict'

let toggle = document.getElementById("theme-toggle")
let body = document.body;

let image = document.getElementById('logo');
let image_dark = '/res/img/lambda_white.svg';
let image_light = '/res/img/lambda.svg';

(function () {
    toggle.append(document.createElement('i'))
    toggle.firstElementChild.setAttribute('id', 'toggle-button')
    toggle.firstElementChild.setAttribute('title', 'Theme change!')
})()

let el = toggle.firstElementChild

let icon_theme_light = 'fas fa-sun'
let icon_theme_dark = 'fas fa-moon'

function init() {
    if (read() == "" || read() === undefined) {
        // cookie doesn't exist, set the light theme
        set("light")
        el.setAttribute('class', icon_theme_dark)
        body.setAttribute('class', '')
        image.setAttribute('src', image_light)
    } else if (read() == "light") {
        el.setAttribute('class', icon_theme_dark)
        body.setAttribute('class', '')
        image.setAttribute('src', image_light)
    } else if (read() == "dark") {
        el.setAttribute('class', icon_theme_light)
        body.setAttribute('class', 'dark-mode')
        image.setAttribute('src', image_dark)
    }
}

function toggleTheme() {
    clear(el)

    if (read() == "") {
        // cookie doesn't exist, set the light theme
        set("light")
        el.setAttribute('class', icon_theme_light)
        body.setAttribute('class', '')
        return
    } else if (read() == "light") {
        set("dark")
        el.setAttribute('class', icon_theme_light)
        body.setAttribute('class', 'dark-mode')
        image.setAttribute('src', image_dark)
    } else if (read() == "dark") {
        set("light")
        el.setAttribute('class', icon_theme_dark)
        body.setAttribute('class', '')
        image.setAttribute('src', image_light)
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

document.getElementById('toggle-button')
        .addEventListener('click', function() {
            toggleTheme()
        })
