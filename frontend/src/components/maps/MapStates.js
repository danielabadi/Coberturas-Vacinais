import React from 'react';
import Leaflet from 'leaflet';
import { stateState } from '../../assets/states/atom';
import { useSetRecoilState } from "recoil";

function MapState(props) {
    const setState = useSetRecoilState(stateState);
    var legend = Leaflet.control({ position: 'bottomleft' });
    var popup = Leaflet.popup({ keepInView: true });
    const [states, setSates] = React.useState(null);
    const [coberturas, setCoberturas] = React.useState(null);


    // Gera a legenda
    legend.onAdd = function () {
        var div = Leaflet.DomUtil.create('div', 'mapa_estado_info'),
            grades = [0, 40, 50, 60, 70, 80, 90, 100];
        div.innerHTML += '<p>Cobertura vacinal</p>'
        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
                grades[i] + '%' + (grades[i + 1] ? ' &ndash; ' + (grades[i + 1] - 1) + '%<br>' : '+');
        }
        return div;
    };

    function getColor(d) {
        return d >= 100 ? '#ff425f' :
            d >= 90 ? '#ff6575' :
                d >= 80 ? '#ff818b' :
                    d >= 70 ? '#ff9ba1' :
                        d >= 60 ? '#ffb4b8' :
                            d >= 50 ? '#ffccce' :
                                d >= 40 ? '#ffe4e5' :
                                    '#ffffff';
    }

    function style(feature) {
        return {
            fillColor: getColor(coberturas[feature.properties.codarea]['cobertura']),
            weight: 1,
            opacity: 1,
            color: 'black',
            dashArray: '1',
            fillOpacity: 1
        };
    }

    // Criação da referência do mapa
    const mapRef = React.useRef(null);
    const layerRef = React.useRef(null);
    React.useEffect(() => {
        async function fetchData() {
            let url = `https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo+json&qualidade=intermediaria&intrarregiao=UF`;
            try {
                const response = await fetch(url);
                const json = await response.json();
                setSates(json.features);
            } catch (error) {
                console.log("error", error);
            }
        };

        if (mapRef.current == null) {
            mapRef.current = Leaflet.map("mapa_estado", {
                center: [0, 0],
                zoom: 5,
                minZoom: 2,
                maxZoom: 6,
                zoomDelta: 0.5,
                maxBounds: [[-90, -180], [90, 180]],
                maxBoundsViscosity: 1.0,
                zoomControl: false
            });
            fetchData();
        }
    }, []);

    React.useEffect(function () {
        if (states !== null) {
            layerRef.current = Leaflet.geoJson(states).addTo(mapRef.current);
            mapRef.current.fitBounds(layerRef.current.getBounds());
            legend.addTo(mapRef.current);
        }
    }, [states]);

    function handleClick(feature) {
        setState(feature.target.feature.properties.codarea);
        console.log(feature.target.feature.properties);
        console.log(coberturas[feature.target.feature.properties.codarea])
        popup.setLatLng(feature.target.getCenter())
            .setContent(`<h1 style="margin: 0; text-align: center; font-size: 20px" >${coberturas[feature.target.feature.properties.codarea]['estado_uf']}</h1>
                <p style="margin-top: 0">${coberturas[feature.target.feature.properties.codarea]['cobertura']}% de cobertura <br>
                ${coberturas[feature.target.feature.properties.codarea]['doses'].toLocaleString('pt-BR')} doses aplicadas</p>`)
            .openOn(mapRef.current);
    }

    function onEachFeature(feature, layer) {
        layer.on({
            click: handleClick
        });

        layer.bindTooltip(coberturas[feature.properties.codarea]['estado_uf'], {
            permanent: true,
            direction: 'center',
            className: 'mapa_estado_popup'
        });
    }

    React.useEffect(() => {
        async function fetchDataMapa() {
            let url = `http://localhost:5000/api/v1/states/cobertura_mapa?vaccine=${props.dado.vaccine}&year=${props.dado.year}`;
            try {
                const response = await fetch(url);
                const json = await response.json();
                setCoberturas(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchDataMapa();
        mapRef.current.closePopup();
    }, [props]);

    React.useEffect(() => {
        if (states !== null & coberturas !== null) {
            layerRef.current.clearLayers();
            Leaflet.geoJson(states, {
                onEachFeature: onEachFeature,
                style: style
            }).addTo(layerRef.current);
            mapRef.current.fitBounds(layerRef.current.getBounds());
        }
    }, [coberturas]);

    return (
        <div className="mapa_estado" id="mapa_estado"></div>
    );
}

export default MapState;