// ==UserScript==
// @name         Ecosia Searcher
// @namespace    https://www.ecosia.org/?c=en
// @version      2.1.2
// @description  Plant trees by leaving your computer on
// @author       Gabriel
// @match        https://www.ecosia.org/*
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

const url = window.location.pathname;

function fetchRandomWord(callback, errorCallback) {
    if (typeof unsafeWindow.fetchRandomWord === 'function') {
        unsafeWindow.fetchRandomWord(callback, errorCallback);
    } else {
        errorCallback('fetchRandomWord function not found');
    }
}

function redirectToSearch(randomWord) {
    const redirectURL = `https://www.ecosia.org/search?method=index&q=${randomWord}`;
    window.location.href = redirectURL;
}

function redirectToHomepage() {
    window.location.href = 'https://www.ecosia.org/';
}

function handleApiError() {
    alert('Error fetching random word from the API. Please try again later.');
    window.close();
}

$(document).ready(function() {
    setTimeout(function() {
        if (url === '/') {
            fetchRandomWord(function(randomWord) {
                redirectToSearch(randomWord);
            }, handleApiError);
        } else {
            redirectToHomepage();
        }
    }, 5000);
});