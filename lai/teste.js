var _               = require('underscore'); 
var s               = require('underscore.string'); 


var str = 'Paulo, você tem razão, essa rua nunca teve radar automático na <em>cidade</em>. Estamos tirando essa informação do sistema. mas não conseguiremos te mandar a planilha atualizada';

var r = s(str).strRight('<em>');


var term = s(r._wrapped).strLeft('</em>');

var termCount = term._wrapped.length + 9;


var left = s(str).strLeft('<em>')._wrapped;
var right = s(str).strRight('</em>')._wrapped;


// console.log(r._wrapped);
// console.log(l._wrapped);


console.log(termCount);

console.log('******************************************');
console.log(left);
console.log('******************************************');
console.log(right);
console.log('******************************************');

var totalCount = 100;

var sideCount = Math.floor((totalCount - termCount) / 2);

var leftDiff = left.length - sideCount;
var leftTrimmed = '';

if (left.length > (sideCount)) {
    leftTrimmed  =  '...' + left.substring(leftDiff, left.length);
} else {
    leftTrimmed = left;
}


var rightDiff = right.length - sideCount;
var rightTrimmed = '';

if (right.length > (sideCount)) {
    rightTrimmed  =  right.substring(0, (right.length - rightDiff)) + '...';
} else {
    rightTrimmed = right;
}




console.log(leftTrimmed);
console.log(rightTrimmed);


// Paulo, você tem razão, essa rua nunca teve radar automático na



