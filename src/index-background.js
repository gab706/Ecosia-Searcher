// ==UserScript==
// @name         Ecosia Searcher - Background
// @namespace    https://www.ecosia.org/?c=en
// @version      1.0
// @description  Background script for fetching random words
// @author       Gabriel
// @match        *://*/*
// @grant        GM_xmlhttpRequest
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

const apiUrl = 'https://random-word.ryanrk.com/api/en/word/random';
const counterKey = 'ecosiaSearcherCounter';

function fetchRandomWord(callback, errorCallback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: apiUrl,
        onload: function(response) {
            try {
                const data = JSON.parse(response.responseText);
                callback(data);
            } catch (error) {
                errorCallback(error);
            }
        },
        onerror: function(error) {
            errorCallback(error);
        }
    });
}

function incrementCounter() {
    const currentCount = GM_getValue(counterKey, 0);
    GM_setValue(counterKey, currentCount + 1);
}

function logTree() {
    const currentCount = GM_getValue(counterKey, 0);
    console.log(`You have planted ${currentCount} tree${currentCount != 1 ? 's' : ''}\n\n${ascii_tree()}`);
}

unsafeWindow.fetchRandomWord = fetchRandomWord;

incrementCounter();

fetchRandomWord(function(randomWord) {
    logTree();
});


function ascii_tree() {
    return `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⡰⡇⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠰⢾⠇⠨⡦⠀⠂⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⡀⠀⢈⣹⠜⠻⢾⠃⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠁⢠⣿⡵⠾⣻⣶⠿⠦⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠀⢀⣠⣮⣦⡶⠻⠛⢶⣄⡀⠁⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣽⠏⠁⣠⣂⣦⣈⣝⣦⣄⠀⠈⠁⠀
⠀⠀⠀⠀⠁⣠⣾⣵⣾⣾⠟⡙⠟⠿⣍⡉⠀⠀⠆⠀⠀
⠀⠰⠀⠀⠄⣠⣶⣾⣭⡶⠟⠻⣶⡰⣜⣳⣦⣄⠀⡀⠀
⠀⠀⠀⢀⣠⣴⣿⣋⡴⣪⠎⣄⡙⠻⠿⣯⣉⠉⠀⠀⠀
⠀⠂⠀⢀⣉⡭⢿⡛⣛⣵⠎⠀⠙⢾⣶⣦⣭⣷⣦⠐⠀
⠀⠀⢈⣙⣿⡿⠿⠟⣋⢅⡄⡄⡐⣄⢤⣉⠷⢦⣄⣀⠠
⠐⠾⠿⢽⣷⡶⠶⡿⣓⣭⣾⣿⢷⣬⣓⢿⠿⠿⣯⣉⣁
⠀⠀⠀⠉⠉⠉⠛⠛⠉⢀⣿⢿⡀⠙⠋⠓⠿⠿⠏⠉⠉
⠀⠀⠀⠀⠀⠀⠠⠤⠶⠾⢿⡯⠷⠶⠤⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
    `;
}