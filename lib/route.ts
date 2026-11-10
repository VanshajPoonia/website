// Shared between the example log and the 3D scene. Kept apart from scene.ts
// so importing the event name never pulls three.js into the main bundle.
export type StationId = "website" | "crm" | "inbox" | "calendar";
export const ROUTE_EVENT = "kv:route";
export type RouteDetail = { from: StationId; to: StationId };

export function sendRoute(from: StationId, to: StationId) {
  window.dispatchEvent(new CustomEvent<RouteDetail>(ROUTE_EVENT, { detail: { from, to } }));
}
