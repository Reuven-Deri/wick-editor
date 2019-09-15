/*
 * Copyright 2019 WICKLETS LLC
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

Wick.GUIElement.ActionButtonsContainer = class extends Wick.GUIElement {
    constructor (model) {
        super(model);

        this.copyFrameForwardButton = new Wick.GUIElement.ActionButton(this.model, {
            tooltip: 'Copy Frame Forward',
            icon: 'add_tween',
            clickFn: () => {
                this.model.project.copySelectedFrameForward();
            }
        });

        this.cutFrameButton = new Wick.GUIElement.ActionButton(this.model, {
            tooltip: 'Cut Frame',
            icon: 'add_tween',
            clickFn: () => {
                this.model.project.cutSelectedFrames();
            }
        });

        this.deleteFrameButton = new Wick.GUIElement.ActionButton(this.model, {
            tooltip: 'Delete',
            icon: 'trashcan',
            clickFn: () => {
                this.model.project.deleteSelectedObjects();
            }
        });

        this.addTweenButton = new Wick.GUIElement.ActionButton(this.model, {
            tooltip: 'Add Tween',
            icon: 'add_tween',
            clickFn: () => {
                this.model.activeFrame && this.model.activeFrame.createTween();
            }
        });
    };

    draw () {
        var ctx = this.ctx;

        // Background
        ctx.fillStyle = Wick.GUIElement.TIMELINE_BACKGROUND_COLOR;
        ctx.beginPath();
        ctx.rect(0, 0, Wick.GUIElement.LAYERS_CONTAINER_WIDTH, Wick.GUIElement.NUMBER_LINE_HEIGHT);
        ctx.fill();

        // Copy Frame Forward button
        ctx.save();
        ctx.translate(85, 20);
            this.copyFrameForwardButton.draw();
        ctx.restore();

        // Cut Frame button
        ctx.save();
        ctx.translate(115, 20);
            this.cutFrameButton.draw();
        ctx.restore();

        // Delete Frame button
        ctx.save();
        ctx.translate(145, 20);
            this.deleteFrameButton.draw();
        ctx.restore();

        // Add Tween button
        ctx.save();
        ctx.translate(175, 20);
            this.addTweenButton.draw();
        ctx.restore();
    };
};
