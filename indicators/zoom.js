/* Panel indicators GNOME Shell extension
 *
 * Copyright (C) 2019 Leandro Vital <leavitals@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const { St, Gio, UPowerGlib, Clutter } = imports.gi;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Gettext = imports.gettext.domain("bigSur-StatusArea");
const _ = Gettext.gettext;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const CustomButtonXYZ = Extension.imports.indicators.button.CustomButtonXYZ;

var ZoomIndicator = new Lang.Class({
    Name: "ZoomIndicator",
    Extends: CustomButtonXYZ,

    _init: function (virtualDevice) {
        this.parent("ZoomIndicator");
        this.menu.actor.add_style_class_name("aggregate-menu");
	this.virtualDevice = virtualDevice;
   
	let zoomMinus = Gio.icon_new_for_string(`${Extension.path}/images/zoom_moin.png`);
	let zoomSeparator = Gio.icon_new_for_string(`${Extension.path}/images/separator.png`);
 	let zoomAdd = Gio.icon_new_for_string(`${Extension.path}/images/zoom_plus.png`);
        this.zoomMinusIcon = new St.Icon({
            gicon: zoomMinus,
            reactive: true,
//             icon_name: 'zoom-out-symbolic',
            style_class: "system-status-icon"
        });
        this.box.add_child(this.zoomMinusIcon);

        this.zoomSeparatorIcon = new St.Icon({
            gicon: zoomSeparator,
            style_class: "separator-status-icon"
        });
        this.box.add_child(this.zoomSeparatorIcon);

        this.zoomAddIcon = new St.Icon({
//            icon_name: 'zoom-in-symbolic',
            reactive: true,
            gicon: zoomAdd,
            style_class: "system-status-icon"
        });
        this.box.add_child(this.zoomAddIcon);
	this.eventHandler1 = this.zoomMinusIcon.connect('button-press-event', () => {
            log('Zoom - ...');
            this.keyPressed(Clutter.KEY_Control_L);
            this.keyPressed(Clutter.KEY_KP_Subtract);
            this.keyReleased(Clutter.KEY_KP_Subtract);
            this.keyReleased(Clutter.KEY_Control_L);
        });
	this.eventHandler2 = this.zoomAddIcon.connect('button-press-event', () => {
            log('Zoom + ...');
            this.keyPressed(Clutter.KEY_Control_L);
            this.keyPressed(Clutter.KEY_KP_Add);
            this.keyReleased(Clutter.KEY_KP_Add);
            this.keyReleased(Clutter.KEY_Control_L);
        });
    },
    destroy: function () {
	this.zoomMinusIcon.disconnect(this.eventHandler1);
	this.zoomAddIcon.disconnect(this.eventHandler2);
        this.box.remove_child(this.zoomAddIcon);
        this.box.remove_child(this.zoomSeparatorIcon);
        this.box.remove_child(this.zoomMinusIcon);
        this.parent();
    }
});
