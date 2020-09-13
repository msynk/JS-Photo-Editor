+function () {

    var options = [{
        name: 'Brightness',
        property: 'brightness',
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    }, {
        name: 'Contrast',
        property: 'contrast',
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    }, {
        name: 'Saturation',
        property: 'saturate',
        value: 100,
        min: 0,
        max: 200,
        unit: '%'
    }, {
        name: 'Grayscale',
        property: 'grayscale',
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    }, {
        name: 'Sepia',
        property: 'sepia',
        value: 0,
        min: 0,
        max: 100,
        unit: '%'
    }, {
        name: 'Hue Rotate',
        property: 'hue-rotate',
        value: 0,
        min: 0,
        max: 360,
        unit: 'deg'
    }, {
        name: 'Blur',
        property: 'blur',
        value: 0,
        min: 0,
        max: 20,
        unit: 'px'
    }];
    var app = JSV.init('app');
    var sliderTemplate = JSV.template('sliderTemplate');
    var menuItemTemplate = JSV.template('menuItemTemplate');

    app.sliderContainer.appendChild(sliderTemplate(function (ctx) {
        var selectedMenuIndex = 0;
        JSV.state('selectedMenu').sub(function (val) {
            ctx.sliderInput.min = options[val].min;
            ctx.sliderInput.max = options[val].max;
            ctx.sliderInput.value = options[val].value;
            selectedMenuIndex = val;
        });
        ctx.sliderInput.oninput = function (e) {
            options[selectedMenuIndex].value = e.target.value;
            app.imageContainer.setAttribute('style', getImageStyle());
        }
    }));

    options.forEach(function (m, idx) {
        app.menuContainer.appendChild(menuItemTemplate(function (ctx) {
            JSV.state('selectedMenu').sub(function (val) {
                ctx.btnMenu.classList[val == idx ? 'add' : 'remove']('active');
            });
            ctx.btnMenu.textContent = m.name;
            ctx.btnMenu.onclick = function (e) { JSV.state('selectedMenu').pub(idx); };
        }));
    });
    JSV.state('selectedMenu').pub(0);

    // ========================================================================

    function getImageStyle() {
        var filters = options.map(function (o) { return o.property + '(' + o.value + o.unit + ')' })
        return 'filter:' + filters.join(' ');
    }
}();