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

const { St, Gio, Clutter } = imports.gi;
const Lang = imports.lang;
const Main = imports.ui.main;
const PopupMenu = imports.ui.popupMenu;
const Gettext = imports.gettext.domain("bigSur-StatusArea");
const _ = Gettext.gettext;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const CustomButtonXYZ = Extension.imports.indicators.button.CustomButtonXYZ;

var UndoIndicator = new Lang.Class({
    Name: "UndoIndicator",
    Extends: CustomButtonXYZ,

    _init: function (virtualDevice) {
        this.parent("UndoIndicator");
        this.menu.actor.add_style_class_name("aggregate-menu");
	this.virtualDevice = virtualDevice;
   
	let undoCancel = Gio.icon_new_for_string(`${Extension.path}/images/cancel.png`);
        this._undoCancelIcon = new St.Icon({
            gicon: undoCancel,
            reactive: true,
//	    icon_name: 'edit-undo-symbolic',
            style_class: "system-status-icon"
        });
        this.box.add_child(this._undoCancelIcon);
        this.eventHandler = this._undoCancelIcon.connect('button-press-event', () => {
            log('Undo ...');
            this.keyPressed(Clutter.KEY_Control_L);
            this.keyPressed(Clutter.KEY_Z);
            this.keyReleased(Clutter.KEY_Z);
            this.keyReleased(Clutter.KEY_Control_L);
        });
    },
    destroy: function () {
	this._undoCancelIcon.disconnect(this.eventHandler);
        this.box.remove_child(this._undoCancelIcon);
        this.parent();
    }
});
