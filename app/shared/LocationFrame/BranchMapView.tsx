"use client";

import React, { useEffect, useMemo } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import type { BranchLocation } from "./types";
import "leaflet/dist/leaflet.css";

export interface BranchMapViewProps {
  branch: BranchLocation;
  onLocate?: () => void;
  locateLabel?: string;
}

const DEFAULT_ZOOM = 14;

function MapCenterUpdater({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], DEFAULT_ZOOM, { duration: 0.8 });
  }, [lat, lng, map]);

  return null;
}

function MapControls({
  onLocate,
  locateLabel = "Find nearest branch",
}: {
  onLocate?: () => void;
  locateLabel?: string;
}) {
  const map = useMap();

  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-md ring-1 ring-input-border transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <span className="text-lg leading-none">+</span>
      </button>
      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-text-primary shadow-md ring-1 ring-input-border transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
      >
        <span className="text-lg leading-none">−</span>
      </button>
      {onLocate && (
        <button
          type="button"
          aria-label={locateLabel}
          onClick={onLocate}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white shadow-md transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
          </svg>
        </button>
      )}
    </div>
  );
}

function createBranchIcon() {
  const iconHtml = `
    <div style="display:flex;flex-direction:column;align-items:center;">
      <div style="display:flex;height:40px;width:40px;align-items:center;justify-content:center;border-radius:9999px;background:#b91317;box-shadow:0 4px 12px rgba(0,0,0,0.2);border:4px solid #fff;">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
          <path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
        </svg>
      </div>
      <div style="margin-top:4px;height:8px;width:8px;rotate:45deg;background:#b91317;"></div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: "branch-marker-icon",
    iconSize: [40, 52],
    iconAnchor: [20, 52],
    popupAnchor: [0, -48],
  });
}

const BranchMapView = ({
  branch,
  onLocate,
  locateLabel,
}: BranchMapViewProps) => {
  const markerIcon = useMemo(() => createBranchIcon(), []);
  const position: [number, number] = [branch.lat, branch.lng];

  return (
    <div className="relative h-[320px] w-full overflow-hidden rounded-2xl ring-1 ring-input-border sm:h-[400px] lg:h-[520px]">
      <MapContainer
        center={position}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterUpdater lat={branch.lat} lng={branch.lng} />
        <Marker position={position} icon={markerIcon}>
          <Popup closeButton={false}>
            <span className="text-sm font-semibold text-text-primary">
              {branch.name} Branch
            </span>
          </Popup>
        </Marker>
        <MapControls onLocate={onLocate} locateLabel={locateLabel} />
      </MapContainer>
    </div>
  );
};

export default BranchMapView;
