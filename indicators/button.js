/* Panel Indicators GNOME Shell extension
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

const { St, Shell, Clutter } = imports.gi;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;

var CustomButtonXYZ = new Lang.Class({
    Name: "Button",
    Extends: PanelMenu.Button,

    _init: function (name) {
	this.virtualDevice = null;
        this.settings = Convenience.getSettings();
        this.parent(0.5, name);
        this.name = name;
        this._center = false;
        this.box = new St.BoxLayout({
            vertical: false,
            style_class: "panel-status-menu-box"
        });
        this.add_child(this.box);
    },
    _openApp: function (app) {
        Shell.AppSystem.get_default().lookup_app(app).activate();
    },
    set_spacing: function (spacing) {
        this._default_spacing = spacing;
        this.update_spacing(15);
    },
    update_spacing: function (spacing) {
        if (spacing) {
            let style = '-natural-hpadding: %dpx'.format(spacing);
            if (spacing < 6) {
                style += '; -minimum-hpadding: %dpx'.format(spacing);
            }
            this.set_style(style);
        }
        this.set_style("");
    },
    calculate_spacing: function () {
        let style = this.get_style();
        if (style) {
            let start = style.indexOf("-natural-hpadding: ");
            let end = style.indexOf("px;");
            let val = parseInt(style.substring(start + 19, end));
            return val;
        }
        return NaN
    },
    keyPressed: function(keyval) { 
            if (this.virtualDevice) { 
                this.virtualDevice.notify_keyval( 
                       Clutter.get_current_event_time(), 
                       keyval, 
                       Clutter.KeyState.PRESSED); 
            } 
    }, 
    keyReleased: function(keyval) { 
            if (this.virtualDevice) { 
                this.virtualDevice.notify_keyval( 
                       Clutter.get_current_event_time(), 
                       keyval, 
                       Clutter.KeyState.RELEASED); 
            } 
    },
    destroy: function () {
        this.parent();
    }
});
