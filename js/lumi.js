(function (){
    const elements = document.getElementsByClassName('lumi');
    const box = document.createElement('div');
    Object.assign(box.style, {position: 'fixed',display: 'none',justifyContent: 'center',alignItems: 'center',width: '100%',height: '100%',left: '0',top: '0',backgroundColor: 'rgba(0,0,0,.9)',zIndex: '10000'});
    const img = document.createElement('img');
    img.classList.add('lumiCursorZoomout');
    Object.assign(img.style, {maxWidth: '100%',maxHeight: '100%'});
    box.appendChild(img);
    box.addEventListener('click', function () {
        box.style.display = 'none';
    });
    document.body.prepend(box);
    
    for(element of elements) {
        element.addEventListener('click', function (e) {
            box.style.display = 'flex';
            img.setAttribute('src', e.target.getAttribute('src'));
        });
        element.classList.add('lumiCursorZoomin');
    }
})();