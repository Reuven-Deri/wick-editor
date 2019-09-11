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

/**
 * The Timeline is responsible for drawing the following GUI elements:
 * - The Breadcrumbs
 * - The Frames Container
 * - The Layers Container
 * - The Horizontal Scrollbar
 * - The Vertical Scrollbar
 * - The Number Line
 */
Wick.GUIElement.Timeline = class extends Wick.GUIElement {
    /**
     * Create a new GUIElement
     */
    constructor (model) {
        super(model);

        this.breadcrumbs = new Wick.GUIElement.Breadcrumbs(model);
        this.layersContainer = new Wick.GUIElement.LayersContainer(model);
        this.framesContainer = new Wick.GUIElement.FramesContainer(model);
        //this.numberLine = new Wick.GUIElement.NumberLine(model);
        //this.horizontalScrollbar = new Wick.GUIElement.ScrollbarHorizontal(model);
        //this.verticalScrollbar = new Wick.GUIElement.ScrollbarVertical(model);
    }

    /**
     * Draw this GUIElement
     */
    draw () {
        var ctx = this.ctx;

        // Frames
        ctx.save();
        ctx.translate(Wick.GUIElement.LAYERS_CONTAINER_WIDTH, Wick.GUIElement.BREADCRUMBS_HEIGHT);
            this.framesContainer.draw();
        ctx.restore();

        // Layers
        ctx.save();
        ctx.translate(0, Wick.GUIElement.BREADCRUMBS_HEIGHT);
            this.layersContainer.draw();
        ctx.restore();

        // Breadcrumbs
        this.breadcrumbs.draw();
    }
}
