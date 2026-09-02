# 🚀 Master Mobile App Design & Architecture Prompt

> **How to use this prompt:**  
> Copy and paste the text in the prompt block below into any AI Assistant (such as Claude, ChatGPT, Gemini, or Antigravity) or pass it directly to your UI/UX design and mobile development team to guide the full implementation of your mobile app.

---

```markdown
# MASTER PROMPT: Production-Grade Geospatial & AI-Powered Real Estate Mobile App

## 📌 Context & Objective
You are tasked with designing and architecting a production-grade, cross-platform mobile application for iOS and Android built using **React Native with Expo (SDK 54)**. The platform is a **Map-First, Geospatial Intelligence-driven Real Estate Marketplace** designed for scale (1M+ users, 100K+ listings). 

The mobile app must seamlessly integrate with a **NestJS GraphQL/REST backend**, **PostgreSQL + PostGIS database**, **Martin Vector Tile Server**, **Python Geospatial AI Microservices (XGBoost Price Prediction, H3 Heatmaps, Isochrones)**, and support immersive **3D/360° XR property experiences**.

---

## 🎨 1. Visual Design System & Aesthetics Guidelines

### 1.1 Color Palette & Theme Tokens
- **Theme Support:** System-aware Dark Mode & Light Mode with instant toggle.
- **Primary / Brand:** Deep Emerald / Geospatial Teal (`#0F766E` / `#14B8A6`) — represents precision, nature, and trust.
- **Secondary / Accent:** Warm Amber / Gold (`#F59E0B` / `#D97706`) — for pricing badges, AI scores, and premium listings.
- **Geospatial Overlay Tones:**
  - *Flood Risk:* Cyan (`#06B6D4`) low risk to Crimson (`#EF4444`) critical risk.
  - *Infrastructure & Amenities:* Metro Blue (`#3B82F6`), School Green (`#10B981`), Hospital Rose (`#F43F5E`).
- **Dark Mode Backgrounds:** Slate/Zinc dark grey (`#0F172A`, `#1E293B`, `#334155`) with high contrast text.
- **Light Mode Backgrounds:** Clean Off-White (`#F8FAFC`, `#F1F5F9`) with crisp charcoal typography (`#0F172A`).
- **Surface Styling:** Glassmorphic blurred cards (`BlurView` with background opacity and `borderWidth: 1` subtle borders).

### 1.2 Typography & Motion
- **Font Stack:** Modern Sans-Serif (`Inter`, `Outfit`, or `Roboto`).
- **Hierarchy:** Bold section headers (20-24pt), clear price labels (18-22pt bold), metadata chips (12-14pt medium).
- **Micro-Animations (React Native Reanimated v3):**
  - Smooth bottom-sheet snapping and expansion (`@gorhom/bottom-sheet`).
  - Haptic feedback (`expo-haptics`) on saving properties, dragging map sliders, and placing map pins.
  - Spring transitions for floating action buttons (FABs), card pressables, and tab bar switching.

---

## 🛠️ 2. Technical Stack & Architecture Constraints

- **Framework:** React Native with Expo SDK 54, Expo Router v6 / React Navigation 7.
- **Language:** 100% Strict TypeScript.
- **Mapping Engine:** `@maplibre/maplibre-react-native` integrated with custom Vector Tile Server (Martin/MapTiler) & OpenStreetMap.
- **State Management:** **Zustand v4** with modular slice architecture (`authStore`, `searchStore`, `mapStore`, `propertyStore`, `chatStore`, `uiStore`).
- **API & Data Fetching:** Apollo Client v3 for GraphQL (Queries, Mutations, Subscriptions) & Axios for REST microservices.
- **Spatial Calculations:** `@turf/turf` for client-side spatial buffers, bounding box calculations, and polygon manipulation.
- **Media & XR:** `expo-av` for media, `expo-image-picker` for uploads, WebView engine (`react-native-webview`) for Three.js 3D floor plans, Pannellum 360° panoramas, and IFC.js BIM models.
- **Local Storage:** `@react-native-async-storage/async-storage` for offline caching and session state.

---

## 📱 3. Core Mobile Screens & Navigation Architecture

Structure the application around a **5-Tab Bottom Navigation** layout with smooth stack transitions for deep screens:

```
App Navigation Hierarchy
├── (Tabs Navigation)
│   ├── 🗺️ Map Search Screen (Home / Map-First Discovery)
│   ├── 🔍 Advanced Search & Filter Screen
│   ├── ❤️ Saved & Compared Properties Screen
│   ├── 💬 Messages / Inquiries Screen
│   └── 👤 Profile / Account & Seller Dashboard Screen
├── (Stack Routes)
│   ├── 🏠 Property Detail Screen (`/property/[id]`)
│   │   ├── 360° Virtual Tour View
│   │   ├── 3D Floor Plan / BIM View
│   │   ├── Locality Score & Infrastructure Breakdown
│   │   └── Schedule Visit & Inquiry Modal
│   ├── ✏️ Draw Polygon Search Screen
│   ├── ⏱️ Commute Isochrone Search Screen
│   ├── 💬 Chat Detail Screen (`/chat/[id]`)
│   ├── ➕ Add/Edit Property Listing Screen
│   └── 🔒 Auth Flow (Login, Signup, Phone OTP Verification)
```

---

## ⚡ 4. Feature Specifications & Technical Requirements

### 4.1 Map-First Discovery (Home Tab)
- **MapLibre Integration:** Full-screen vector map with custom map tiles, supporting smooth gestures, pinch-to-zoom, and 3D camera tilt angle.
- **Interactive Property Clusters:** Cluster pins dynamically with property count tags. Uncluster on zoom into individual price-tag markers (`$450k` or `₹1.2Cr`).
- **Interactive Layers Floating Controls:**
  - Toggle **Price Heatmap Layer** (H3 hexagon grid overlay).
  - Toggle **Flood Risk Zone Overlay** (colored polygons for low/medium/high risk).
  - Toggle **Infrastructure POIs** (Schools, Hospitals, Metro lines with distance indicators).
- **Interactive Bottom Sheet (`@gorhom/bottom-sheet`):**
  - **Collapsed state:** Shows count of properties visible in current map viewport ("48 Properties Found").
  - **Half-expanded state:** Scrollable horizontal/vertical feed of `PropertyCard` items matching visible map bounds.
  - **Full-expanded state:** List view taking full screen with sorting toggles (Price: Low to High, AI Score, Recency).
- **Spatial Map Tools:**
  - Floating action button for "Draw on Map" (Custom Polygon Search).
  - Floating action button for "Commute Time Search" (Isochrone filter: 15/30/45 mins via transit/car).

### 4.2 Property Detail & Immersive XR Experience (`/property/[id]`)
- **Hero Image Carousel:** High-res image slider with pagination dots, pinch-to-zoom support, and video tour preview badge.
- **Key Metrics Header:** Title, Address with "Navigate via Maps" button, Price, Price per SqFt, BHK, Bathrooms, Carpet Area, Furnishing Status.
- **AI & Geospatial Intelligence Widgets:**
  - **AI Estimated Price Card:** Displays XGBoost predicted valuation range, market confidence meter (e.g., 94% confidence), and estimated rental yield.
  - **Locality Score Radar/Gauge (0-100):** Multi-factor rating breaking down Safety, Connectivity, Infrastructure, and Environmental Quality.
  - **Fraud Risk Warning Banner:** Displays safety verification badge (Verified Listing vs flagged duplicate warning).
  - **Commute & Nearby POI Distance Breakdown:** Live PostGIS query displaying nearest metro station (0.4 km), top school (1.2 km), hospital (2.1 km).
- **Interactive 3D / 360° Tab Viewers:**
  - **360° Virtual Tour:** Embedded Pannellum Webview with device gyro movement support for looking around rooms.
  - **3D Floor Plan:** Interactive Three.js Webview enabling rotation and layer-by-layer room examination.
- **Action Sticky Bar:** 
  - "Chat with Owner" button (opens GraphQL real-time chat).
  - "Book Guided Visit" button (opens date/time selector with call-masking option).

### 4.3 Saved Properties & Side-by-Side Comparison
- **Bookmark Sync:** Real-time updates with Zustand & local storage for offline viewing.
- **Property Comparison Matrix:** Select 2-4 saved properties and open a side-by-side spec comparison table (Price, SqFt, Locality Score, Amenities, Flood Risk Level, Commute Time to Work).

### 4.4 Real-Time Chat & Communications
- **GraphQL Subscriptions / WebSocket:** Real-time message push, read receipts, and typing indicators.
- **Call Masking Integration:** Action button to initiate privacy-protected phone inquiry.
- **Contextual Attachment:** Send property cards directly inside chat windows.

### 4.5 Seller / Builder Property Posting Dashboard
- **Step-by-Step Listing Wizard:**
  1. *Location Picker:* Drop a pinpoint on MapLibre or search via geocoding API. Auto-fetch city, state, postal code.
  2. *Property Details:* Type, BHK, bathrooms, total area, carpet area, facing, price, maintenance fee.
  3. *Amenities Checklist:* Multi-select chips with icons (Gym, Pool, Parking, Power Backup, CCTV).
  4. *Media Upload:* Capture photos via `expo-image-picker` with compression and auto-upload to storage CDN.
  5. *AI Description Generator:* "Generate Description" button calling backend LLM/AI to write a compelling real estate pitch based on specs.

---

## 🗄️ 5. State Management & API Integration Contracts

Define strict TypeScript types and Zustand store abstractions:

```typescript
// Property Data Contract
export interface Property {
  id: string;
  title: string;
  description: string;
  propertyType: 'residential' | 'commercial' | 'land';
  transactionType: 'buy' | 'rent';
  price: number;
  pricePerSqft: number;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    city: string;
    state: string;
  };
  bhkCount: number;
  bathroomCount: number;
  totalArea: number;
  featuredImageUrl: string;
  images: string[];
  tour360Url?: string;
  bimModelUrl?: string;
  aiDescription?: string;
  estimatedPrice?: number;
  localityScore?: number;
  fraudScore?: number;
  amenities: string[];
  isSaved?: boolean;
}

// Map Search Store (Zustand)
interface MapStoreState {
  center: { latitude: number; longitude: number };
  zoom: number;
  bounds: number[] | null; // [minLon, minLat, maxLon, maxLat]
  activeLayers: {
    heatmaps: boolean;
    floodZones: boolean;
    infrastructure: boolean;
  };
  selectedPolygon: number[][] | null; // Drawn spatial boundary
  isDrawingMode: boolean;
  setCenter: (center: { latitude: number; longitude: number }) => void;
  toggleLayer: (layerKey: 'heatmaps' | 'floodZones' | 'infrastructure') => void;
  setPolygon: (polygon: number[][] | null) => void;
}
```

---

## 🚀 6. Performance & Edge Case Handling Requirements

1. **Map Tile Optimization:** Implement tile caching via MapLibre disk cache to maintain responsive 60fps pan/zoom performance over 4G/5G connections.
2. **List Virtualization:** Use `FlashList` or optimized `FlatList` with `getItemLayout`, lazy-loaded images, and progressive image blur placeholders (`blurhash`).
3. **Offline Fallback:** Cash saved properties and recent search queries locally so users can access saved listings without network connection. Show an offline banner gracefully.
4. **Permissions Guard:** Handle GPS Location (`expo-location`), Camera (`expo-image-picker`), and Notifications permissions with user-friendly modal explanations before triggering system popups.
5. **Error & Skeleton States:** Provide shimmer skeleton loaders for property cards, map loading indicators, and graceful retry buttons for network query failures.

---

## 📋 7. Deliverable Requirements for Implementation

When generating code or UI designs based on this prompt, provide:
1. Production-ready TypeScript files structured according to Expo Router standards (`/app`, `/components`, `/store`, `/hooks`, `/lib`).
2. Clean separation of UI components, map controllers, custom hooks, and Zustand store slices.
3. Native-feeling React Native components utilizing custom stylesheets, responsive layouts, flexbox, safe-area insets (`react-native-safe-area-context`), and dark mode support.
4. Complete mock data generators for geospatial listings and PostGIS geometry layers for instant previewing.
```
