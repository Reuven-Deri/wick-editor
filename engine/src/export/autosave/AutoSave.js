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
 * Utility class for autosaving projects.
 */
Wick.AutoSave = class {
    /**
     * The key used to store the list of autosaved projects.
     * @type {string}
     */
    static get AUTOSAVES_LIST_KEY () {
        return 'autosaveList';
    }

    /**
     *
     * @type {string}
     */
    static get AUTOSAVE_DATA_PREFIX () {
        return 'autosave_';
    }

    /**
     * Saves a given project to localforage.
     * @param {Wick.Project} project - the project to store in the AutoSave system.
     */
    static save (project, callback) {
        var autosaveData = this.generateAutosaveData(project);
        this.addAutosaveToList(autosaveData, () => {
            this.writeAutosaveData(autosaveData, () => {
                callback();
            })
        });
    }

    /**
     * Loads a given project from localforage.
     * @param {string} uuid - the UUID of the project to load from the AutoSave system.
     * @param {function} callback
     */
    static load (uuid, callback) {
        this.readAutosaveData(uuid, autosaveData => {
            this.generateProjectFromAutosaveData(autosaveData, project => {
                callback(project);
            })
        });
    }

    /**
     * Deletes a project with a given UUID in the autosaves.
     * @param {string} uuid - uuid of project ot delete.
     * @param {function} callback
     */
    static delete (uuid) {
        this.removeAutosaveFromList(uuid, () => {
            this.deleteAutosaveData(uuid, () => {
                callback();
            });
        });
    }

    /**
     *
     * @param {Wick.Project} project -
     */
    static generateAutosaveData (project) {
        var projectData = project.serialize();
        var objectsData = Wick.ObjectCache.getActiveObjects(project).map(object => {
            return object.serialize();
        });
        var lastModified = projectData.metadata.lastModified;

        return {
            projectData: projectData,
            objectsData: objectsData,
            lastModified: lastModified,
        };
    }

    /**
     *
     * @param {object} autosaveData -
     */
    static generateProjectFromAutosaveData (autosaveData, callback) {
        // Deserialize all objects in the project so they are added to the ObjectCache
        autosaveData.objectsData.forEach(objectData => {
            var object = Wick.Base.fromData(objectData);
        });

        // Deserialize the project itself
        var project = Wick.Base.fromData(autosaveData.projectData);

        // Load source files for assets from localforage
        Wick.FileCache.loadFilesFromLocalforage(project, () => {
            callback(project);
        });
    }

    /**
     * Adds autosaved project data to the list of autosaved projects.
     * @param {Object} projectData -
     */
    static addAutosaveToList (autosaveData, callback) {
        this.getAutosavesList((list) => {
            list.push({
                uuid: autosaveData.projectData.uuid,
                lastModified: autosaveData.lastModified,
            });
            this.updateAutosavesList(list, () => {
                callback();
            })
        });
    }

    /**
     * Removes autosaved project data to the list of autosaved projects.
     * @param {string} uuid -
     */
    static removeAutosaveFromList (uuid, callback) {
        this.getAutosavesList((list) => {
            list = list.filter(item => {
                return item.uuid !== uuid;
            })
            this.updateAutosavesList(list, () => {
                callback();
            })
        });
    }

    /**
     * Get the list of autosaved projects currently in the AutoSave system.
     * @param {function} callback - function to be passed object containing all autosaved projects.
     */
    static getAutosavesList (callback) {
        localforage.getItem(this.AUTOSAVES_LIST_KEY).then(result => {
            var projectList = result || [];

            // Sort by lastModified
            projectList.sort((a,b) => {
                return b.lastModified - a.lastModified;
            });

            callback(projectList);
        });
    }

    /**
     * Updates the list of autosaved projects currently in the AutoSave system.
     * @param {Object} autosaveList - the list of projects
     * @param {function} callback - called when saving is finished
     */
    static updateAutosavesList (autosaveList, callback) {
        localforage.setItem(this.AUTOSAVES_LIST_KEY, autosaveList).then(result => {
            callback();
        });
    }

    /**
     *
     */
    static writeAutosaveData (autosaveData, callback) {
        localforage.setItem(this.AUTOSAVE_DATA_PREFIX + autosaveData.projectData.uuid, autosaveData).then(() => {
            callback();
        });
    }

    /**
     *
     */
    static deleteAutosaveData (uuid, callback) {
        localforage.removeItem(this.AUTOSAVE_DATA_PREFIX + uuid).then(() => {
            callback();
        });
    }

    /**
     *
     */
    static readAutosaveData (uuid, callback) {
        localforage.getItem(this.AUTOSAVE_DATA_PREFIX + uuid).then(result => {
            if(!result) {
                console.error('Could not load autosaveData for project: ' + uuid);
            }
            callback(result);
        });
    }
}
