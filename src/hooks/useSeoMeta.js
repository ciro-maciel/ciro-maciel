import { useEffect } from "react";

const BASE_URL = "https://ciromaciel.click";
const DEFAULT_IMAGE = `${BASE_URL}/opengraph.webp`;

export function useSeoMeta({ title, description, url, image, type = "website" }) {
  useEffect(() => {
    // The name joins the title only while the whole stays under 65 characters (scripts/seo-guard.js).
    const named = title ? `${title} — Ciro Cesar Maciel` : "Ciro Cesar Maciel";
    const fullTitle = title && named.length > 65 ? title : named;
    const fullUrl = url ? `${BASE_URL}${url}` : BASE_URL;
    const ogImage = image || DEFAULT_IMAGE;

    document.title = fullTitle;

    setMeta("name", "description", description || "");
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description || "");
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", type);
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description || "");
    setMeta("name", "twitter:image", ogImage);

    setLink("canonical", fullUrl);

    return () => {
      document.title = "Ciro Cesar Maciel";
    };
  }, [title, description, url, image, type]);
}

function setMeta(attr, name, content) {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
