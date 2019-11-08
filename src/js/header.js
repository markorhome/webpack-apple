export default (text = 'hello') => {

    var ele = document.createElement('div');
    ele.innerHTML = text;
    return ele;
}