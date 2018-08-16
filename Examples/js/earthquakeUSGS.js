(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "email_address",
            alias: "Email",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "CITY",
            alias: "City",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "HOWHEAR",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "timestamp_opt",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "location",
            dataType: tableau.dataTypeEnum.geometry
        }];

        var tableSchema = {
            id: "earthquakeFeed",
            alias: "Earthquakes with magnitude greater than 4.5 in the last seven days",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.ajax({
            type: 'POST',
            data: "action=mailchimp_get_all",
            dataType: 'JSON',
            url: 'https://thekingsmen.ca/wp-admin/admin-ajax.php',
            // Work with the response
            success: function(response) {
                var members = response.result.members,
                    tableData = [];

                // Iterate over the JSON object
                for (var i = 0, len = members.length; i < len; i++) {
                    tableData.push({
                        "id": members[i].id,
                        "email_address": members[i].email_type,
                        "CITY": members[i].merge_fields.CITY,
                        "HOWHEAR": members[i].merge_fields.HOWHEAR,
                        "timestamp_opt": members[i].timestamp_opt,
                        "location": members[i].location,
                    });
                }

                table.appendRows(tableData);
                doneCallback();
            }
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "USGS Earthquake Feed"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();