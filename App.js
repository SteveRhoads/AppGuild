Ext.define('CustomApp', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items:{ html:'<a href="https://help.rallydev.com/apps/2.0rc3/doc/">App SDK 2.0rc3 Docs</a>'},
    launch: function() {
        this.iterationCombobox = this.add({
            xtype: 'rallyiterationcombobox',
            listeners: {
                ready: this._onIterationComboboxLoad,
                select: this._onIterationComboboxChanged,
                scope: this
            }
        });
    },
    _onIterationComboboxLoad: function(){
        var addNewConfig = {
            xtype: 'rallyaddnew',
            recordTypes: ['User Story','Defect'],
            ignoredRequiredFields: ['Name','ScheduleState','Project']
        };
        this.addNew = this.add(addNewConfig);

        var cardBoardConfig = {
            xtype: 'rallycardboard',
            types: ['Defect','User Story'],
            attribute: 'ScheduleState',
            storeConfig: {
                filters: [this.iterationCombobox.getQueryFromSelected()]
            }
        };
        this.cardBoard = this.add(cardBoardConfig);
    },
    _onIterationComboboxChanged: function(){
        var config = {
            storeConfig: {
                filters: [this.iterationCombobox.getQueryFromSelected()]
            }
        };
        this.cardBoard.refresh(config);
    }
});
