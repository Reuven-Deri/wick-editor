/*
 * Copyright 2018 WICKLETS LLC
 *
 * This file is part of Wick Engine.
 *
 * Wick Engine is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Wick Engine is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Wick Engine.  If not, see <https://www.gnu.org/licenses/>.
 */

Wick.GUIElement.Tween = class extends Wick.GUIElement.Draggable {
    /**
     *
     */
    constructor (model) {
        super(model);

        this.on('mouseOver', () => {
            this.build();
        });

        this.on('mouseDown', (e) => {
            if(!e.modifiers.shift && !this.model.isSelected) {
                this.model.project.selection.clear();
            }
            if(!this.model.isSelected) {
                this.model.project.selection.select(this.model);
                this.model.project.guiElement.build();
            }
            this.build();
        });

        this.on('mouseLeave', () => {
            this.build();
        });

        this.on('dragStart', () => {

        });

        this.on('drag', () => {

        });

        this.on('dragEnd', () => {

        });
    }

    /**
     *
     */
    get x () {
        return (this.model.playheadPosition-1) * this.gridCellWidth;
    }

    /**
     *
     */
    get y () {
        return 0;
    }

    /**
     *
     */
    get width () {
        return 10;
    }

    /**
     *
     */
    get height () {
        return 10;
    }

    /**
     *
     */
    build () {
        super.build();

        var tweenRect = new this.paper.Path.Rectangle({
            from: new this.paper.Point(0, 0),
            to: new this.paper.Point(this.width, this.height),
            fillColor: this.isHoveredOver ? '#0000ff' : '#aaaaff',
            strokeColor: this.model.isSelected ? '#ff9933' : '#000000',
            strokeWidth: this.model.isSelected ? 3 : 1,
        });
        this.item.addChild(tweenRect);

        this.item.position = new paper.Point(this.x, this.y);
    }
}