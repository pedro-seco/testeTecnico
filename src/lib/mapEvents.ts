'use client'

type FlyToEvent = {
  lng: number;
  lat: number;
};

export const mapEvents = new EventTarget();

export function flyToPOI(lng: number, lat: number) {
  mapEvents.dispatchEvent(
    new CustomEvent<FlyToEvent>('fly-to', {
      detail: { lng, lat },
    })
  );
}