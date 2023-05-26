import React from "react";
import Leaflet from "leaflet";

function MapCounties(props) {
    const [municipiosData, setMunicipiosData] = React.useState(null);

    async function fetchData() {
        let url = `https://servicodados.ibge.gov.br/api/v3/malhas/municipios/${props.codIbge}?formato=application/vnd.geo+json`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            setMunicipiosData(json.features);
        } catch (error) {
            console.log("error", error);
        }
    };

    // Criação da referência do mapa
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    React.useEffect(() => {
        fetchData();
        if (mapRef.current == null) {
            mapRef.current = Leaflet.map("map", {
                center: [0, 0],
                zoom: 5
            });
            Leaflet.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                // attribution: "&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>"
            }).addTo(mapRef.current);
            layerRef.current = Leaflet.layerGroup().addTo(mapRef.current);
        }
    }, []);

    React.useEffect(function () {
        layerRef.current.clearLayers();
        let layer = Leaflet.geoJSON(municipiosData).addTo(layerRef.current);
        layer.setStyle({
            color: "#FF425F",
            stroke: false,
            fillOpacity: 0.7
        })
        if (municipiosData != null) {
            mapRef.current.fitBounds(layer.getBounds());
        }
    }, [municipiosData]);

    React.useEffect(function () {
        fetchData();
    }, [props]);

    return (
        <div>
            <div className="map" id="map"></div>
        </div>
    );
}

export default MapCounties;