/*
Copyright (c) 2017, Magnus Bodin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
'use strict';

var phonemes = ['ba','be','bi','bo','bu','by','da','de','di','do','du','dy','fa',
            'fe','fi','fo','fu','fy','ga','ge','gi','go','gu','gy','ha','he',
            'hi','ho','hu','hy','ja','je','ji','jo','ju','jy','ka','ke','ki',
            'ko','ku','ky','la','le','li','lo','lu','ly','ma','me','mi','mo',
            'mu','my','na','ne','ni','no','nu','ny','pa','pe','pi','po','pu',
            'py','ra','re','ri','ro','ru','ry','sa','se','si','so','su','sy',
            'ta','te','ti','to','tu','ty','va','ve','vi','vo','vu','vy','bra',
            'bre','bri','bro','bru','bry','dra','dre','dri','dro','dru','dry',
            'fra','fre','fri','fro','fru','fry','gra','gre','gri','gro','gru',
            'gry','pra','pre','pri','pro','pru','pry','sta','ste','sti','sto',
            'stu','sty','tra','tre'];

// Encode unsigned integer value to Koremutake string
exports.encode = function (value)
{
    var key = "";
    if (value < 0) {
        return;
    }
    if (value == 0) {
        return phonemes[0];
    }
    while (value > 0) {
        var digit = value % phonemes.length;
        value = parseInt(value / phonemes.length);
        key = phonemes[digit] + key;
    }
    return key;
}

//Decode Koremutake string to unsigned integer value
exports.decode = function (value)
{
    var x = 0;
    while (value) {
        if (phonemes.indexOf(value.slice(0,2)) >= 0) {
            var bit = value.slice(0,2);
            value = value.slice(2);
        }
        else {
            var bit = value.slice(0,3);
            value = value.slice(3);
        }
        x = x * phonemes.length + phonemes.indexOf(bit);
    }
    return x;
}