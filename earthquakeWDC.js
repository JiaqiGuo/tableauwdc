(function() {
    var myConnector = tableau.makeConnector();

    myConnector.getSchema = function(schemaCallback) {

    };

    myConnector.getData = function(table, doneCallback) {

    };
    
    myConnector.init = function(initCallback) {
        initCallback();
        tableau.submit();
    };

    tableau.registerConnector(myConnector);
})();