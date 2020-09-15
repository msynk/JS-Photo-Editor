!function (state, appCtx, options, template) {
    var slider = template(function (ctx) {
        var selectedMenuIndex = 0;

        ctx.sliderInput.oninput = function (e) {
            options[selectedMenuIndex].value = e.target.value;
            var filters = options.map(function (o) { return o.property + '(' + o.value + o.unit + ')' })
            appCtx.imageContainer.setAttribute('style', 'filter:' + filters.join(' '));
        }

        state('selectedMenu').sub(function (val) {
            ctx.sliderInput.min = options[val].min;
            ctx.sliderInput.max = options[val].max;
            ctx.sliderInput.value = options[val].value;
            selectedMenuIndex = val;
        });
    });

    appCtx.sliderContainer.appendChild(slider);

}(app.state, app.context, app.options, app.template('sliderTemplate'));