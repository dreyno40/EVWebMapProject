equire([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/LayerList",
    "esri/widgets/BasemapGallery",
    "esri/renderers/ClassBreaksRenderer"
], function (
    Map, MapView, FeatureLayer,
    LayerList, BasemapGallery, ClassBreaksRenderer
) {
    // Create map
    const map = new Map({
        basemap: "streets-navigation-vector"
    });

    // Create view
    const view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-98.5795, 39.8283], // USA center
        zoom: 4
    });

    // Create renderer based on median income field
    const incomeRenderer = new ClassBreaksRenderer({
        field: "Median_Household_Income",
        classBreakInfos: [
            {
                minValue: 0,
                maxValue: 40000,
                symbol: {
                    type: "simple-marker",
                    color: "#d73027",
                    size: 6
                },
                label: "< $40k"
            },
            {
                minValue: 40001,
                maxValue: 60000,
                symbol: {
                    type: "simple-marker",
                    color: "#fee08b",
                    size: 6
                },
                label: "$40k - $60k"
            },
            {
                minValue: 60001,
                maxValue: 80000,
                symbol: {
                    type: "simple-marker",
                    color: "#1a9850",
                    size: 6
                },
                label: "$60k - $80k"
            },
            {
                minValue: 80001,
                maxValue: 200000,
                symbol: {
                    type: "simple-marker",
                    color: "#2166ac",
                    size: 6
                },
                label: "> $80k"
            }
        ]
    });

    // Feature Layer from shared service
    const combinedLayer = new FeatureLayer({
        url: "https://services1.arcgis.com/0MSEUqKaxRlEPj5g/arcgis/rest/services/Electric_Vehicle_Charging_Stations_and_Census_Analysis_WFL1/FeatureServer/0",
        title: "EV Charging Stations + Income Data",
        renderer: incomeRenderer,
        popupTemplate: {
            title: "{Station_Name}",
            content: `
        <b>Fuel Type:</b> {Fuel_Type_Code}<br>
        <b>Access:</b> {Access_Days_Time}<br>
        <b>Median Income:</b> $ {Median_Household_Income}<br>
        <b>City:</b> {City}
      `
        }
    });

    // Add to map
    map.add(combinedLayer);

    // Add widgets
    view.ui.add(new LayerList({ view: view }), "top-right");
    view.ui.add(new BasemapGallery({ view: view }), "top-left");
});

