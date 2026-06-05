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
  className?: string;
  popupLabel?: string;
}

const DEFAULT_ZOOM = 15;

/** Smoothly re-centres the map whenever the selected branch changes. */
function MapCenterUpdater({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();

  useEffect(() => {
    map.flyTo([lat, lng], DEFAULT_ZOOM, { duration: 0.75, easeLinearity: 0.25 });
  }, [lat, lng, map]);

  return null;
}

/** Custom zoom + locate controls anchored to bottom-right. */
function MapControls({
  onLocate,
  locateLabel = "Find nearest branch",
}: {
  onLocate?: () => void;
  locateLabel?: string;
}) {
  const map = useMap();

  const btnBase =
    "flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md " +
    "ring-1 ring-black/10 transition-all duration-150 hover:bg-neutral-50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary";

  return (
    <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
      <button
        type="button"
        aria-label="Zoom in"
        onClick={() => map.zoomIn()}
        className={btnBase}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        aria-label="Zoom out"
        onClick={() => map.zoomOut()}
        className={btnBase}
      >
        <svg width="14" height="2" viewBox="0 0 14 2" fill="none" aria-hidden="true">
          <path d="M1 1h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      {onLocate && (
        <button
          type="button"
          aria-label={locateLabel}
          onClick={onLocate}
          className={
            "flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-white shadow-md " +
            "transition-all duration-150 hover:brightness-110 active:scale-95 " +
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
          }
        >
          {/* Crosshair / locate icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
          </svg>
        </button>
      )}
    </div>
  );
}

/** Opens the popup automatically whenever the branch changes. */
function AutoOpenPopup({ branchId }: { branchId: string }) {
  const map = useMap();

  useEffect(() => {
    const timer = setTimeout(() => {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          layer.openPopup();
        }
      });
    }, 820); // fire after flyTo settles (~0.75 s)

    return () => clearTimeout(timer);
  }, [branchId, map]);

  return null;
}

function createBranchMarkerIcon() {
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.25));">
      <div style="
        display:flex;height:42px;width:42px;align-items:center;justify-content:center;
        border-radius:9999px;background:#b91317;border:3.5px solid #ffffff;
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
          fill="none" stroke="#fff" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/>
          <path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>
        </svg>
      </div>
      <div style="width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-top:8px solid #b91317;margin-top:-1px;"></div>
    </div>
  `;

  return L.divIcon({
    html,
    className: "branch-marker-icon",
    iconSize: [42, 58],
    iconAnchor: [21, 58],
    popupAnchor: [0, -60],
  });
}

const BranchMapView = ({
  branch,
  onLocate,
  locateLabel,
  className = "",
  popupLabel,
}: BranchMapViewProps) => {
  const markerIcon = useMemo(() => createBranchMarkerIcon(), []);
  const position: [number, number] = [branch.lat, branch.lng];
  const containerClassName =
    className ||
    "h-[340px] rounded-2xl ring-1 ring-input-border sm:h-[420px] lg:h-[520px]";

  return (
    <div
      className={[
        "relative w-full overflow-hidden",
        containerClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <MapContainer
        center={position}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom
        className="h-full w-full"
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        <MapCenterUpdater lat={branch.lat} lng={branch.lng} />
        <AutoOpenPopup branchId={branch.id} />

        <Marker position={position} icon={markerIcon}>
          <Popup closeButton={false} offset={[0, -4]}>
            <span className="font-semibold">
              {popupLabel ?? `${branch.name} Branch`}
            </span>
          </Popup>
        </Marker>

        <MapControls onLocate={onLocate} locateLabel={locateLabel} />
      </MapContainer>

      {/* Attribution — custom bottom-left overlay */}
      <p className="absolute bottom-2 left-3 z-[1000] text-[10px] text-black/40 pointer-events-none select-none">
        © OpenStreetMap contributors
      </p>
    </div>
  );
};

export default BranchMapView;
