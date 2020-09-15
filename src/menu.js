!function (state, appCtx, options, template) {
    options.forEach(function (m, idx) {
        var menuItem = template(function (ctx) {
            state('selectedMenu').sub(function (val) { ctx.btnMenu.classList[val == idx ? 'add' : 'remove']('active'); });
            ctx.btnMenu.textContent = m.name;
            ctx.btnMenu.onclick = function (e) { state('selectedMenu').pub(idx); };
        });
        appCtx.menuContainer.appendChild(menuItem);
    });

    state('selectedMenu').pub(0);
}(app.state, app.context, app.options, app.template('menuItemTemplate'));