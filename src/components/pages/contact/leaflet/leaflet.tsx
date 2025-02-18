import * as L from 'leaflet';
import { LatLngExpression } from 'leaflet';
import { GestureHandling } from 'leaflet-gesture-handling';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'gatsby-plugin-react-i18next';
import {
  CircleMarker,
  LayersControl,
  MapContainer,
  Marker,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import styled from 'styled-components';
import { theme } from '../../../layout/theme';
import { up } from '../../../support/breakpoint';
import { BringMeHome } from './bring-home';
import { SatellytesMarkerIcon } from './sy-marker';

const MAP_VIEW_ZOOM = 14;

const OFFICE_COORDINATES: LatLngExpression = [48.13479, 11.56839];
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoic3ktYmVlcCIsImEiOiJja291MXRiZTAwMWNyMm5tcGc3Ymt6N2lkIn0.GqMzCE54VnlA8_XOqIPgyg';
const MAPBOX_TILE_LAYER_DEFAULT = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;
const MAPBOX_TILE_LAYER_DARK = `https://api.mapbox.com/styles/v1/sy-beep/ckou1zo8004q917pout1cyhcy/tiles/{z}/{x}/{y}?access_token=${MAPBOX_ACCESS_TOKEN}`;

/**
 * ⚠️ Attribution is mandatory to fulfill the license and please update accordingly if using a different source than mapbox
 * Resource: https://docs.mapbox.com/help/getting-started/attribution/
 */
const MAPBOX_ATTRIBUTION = `© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>`;

// We need to give the leaflet container itself an explicit height
// and a distinct z-index to move underneath the fixed header;
const MapContainerWithHeight = styled(MapContainer)`
  height: 520px;

  ${up('md')} {
    height: 640px;
  }
  z-index: 0;

  &.leaflet-container {
    background-color: ${theme.palette.background.body};
  }
`;

const MapPlaceholder = styled.div`
  height: 344px;

  ${up('md')} {
    height: 560px;
  }
`;

const MapWrapper = styled.div`
  z-index: 0;
  position: relative;
`;

export const Leaflet = () => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  });

  const { t } = useTranslation();

  // we don't want to render leaflet outside of the browser (SSR)
  if (!isBrowser) {
    return <MapPlaceholder />;
  }

  L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);

  const MapView = (
    <MapContainerWithHeight
      zoomControl={false}
      center={OFFICE_COORDINATES}
      zoom={MAP_VIEW_ZOOM}
      scrollWheelZoom={true}
      /* eslint-disable */
      // @ts-ignore the following props are for leaflet-gesture-handling, but there is no type provided
      // https://github.com/elmarquis/Leaflet.GestureHandling for possible options
      gestureHandling={true}
      gestureHandlingText={{
        touch: t<string>('contact.leaflet.touch'),
        scroll: t<string>('contact.leaflet.scroll'),
        scrollMac: t<string>('contact.leaflet.scrollMac'),
      }}
    >
      {/*Introduce a LayerControl so we can offer multiple tile layers if people want to explore the city
      without the minimal skin (and if they are curious enough to find the layer toggle of course)*/}
      <LayersControl position="bottomright">
        <ZoomControl position="bottomleft" />

        <LayersControl.BaseLayer checked name="Satellytes World">
          {/*use a bigger tile (512 instead of 256) combined with an offset of the zoom level (to match the other zoom level) set to make the labels larger*/}
          {/*via https://stackoverflow.com/questions/37040494/street-labels-in-mapbox-tile-layer-too-small*/}
          <TileLayer
            maxZoom={22}
            attribution={MAPBOX_ATTRIBUTION}
            tileSize={512}
            zoomOffset={-1}
            url={MAPBOX_TILE_LAYER_DARK}
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Default (Light & Streets)">
          <TileLayer
            maxZoom={22}
            tileSize={512}
            zoomOffset={-1}
            attribution={MAPBOX_ATTRIBUTION}
            url={MAPBOX_TILE_LAYER_DEFAULT}
          />
        </LayersControl.BaseLayer>
      </LayersControl>

      <Marker position={OFFICE_COORDINATES} icon={SatellytesMarkerIcon} />

      <CircleMarker
        center={OFFICE_COORDINATES}
        pathOptions={{ color: '#668CFF', opacity: 0.2 }}
        radius={170}
      />

      <BringMeHome center={OFFICE_COORDINATES} zoom={MAP_VIEW_ZOOM}>
        Lost?{' '}
        <span
          role={'img'}
          aria-label={"see no evil monkey emoji, because it's embarassing"}
        >
          🙈
        </span>{' '}
        Click here.
      </BringMeHome>
    </MapContainerWithHeight>
  );

  return (
    <MapWrapper>
      <Helmet>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
        />
        <link
          rel="stylesheet"
          href="//unpkg.com/leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css"
          type="text/css"
        />
        <script src="//unpkg.com/leaflet-gesture-handling"></script>
      </Helmet>
      {MapView}
    </MapWrapper>
  );
};
