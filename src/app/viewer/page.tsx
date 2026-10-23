"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import Link from "next/link";
import {
  RotateCcw,
  Play,
  Pause,
  Sun,
  Moon,
  Maximize2,
  Upload,
  ArrowLeft,
  Sparkles,
  Info,
  Layers,
  Box,
} from "lucide-react";

export default function ModelViewerPage() {
  const [modelSrc, setModelSrc] = useState<string>("/RikModelExport22.glb");
  const [modelName, setModelName] = useState<string>("RikModelExport22.glb");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [bgDark, setBgDark] = useState<boolean>(true);
  const [exposure, setExposure] = useState<number>(1.2);
  const [shadowIntensity, setShadowIntensity] = useState<number>(1);
  const [availableAnimations, setAvailableAnimations] = useState<string[]>([]);
  const [selectedAnimation, setSelectedAnimation] = useState<string>("");
  const [modelLoaded, setModelLoaded] = useState<boolean>(false);
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setModelLoaded(true);
      if (viewer.availableAnimations && viewer.availableAnimations.length > 0) {
        setAvailableAnimations(viewer.availableAnimations);
        setSelectedAnimation(viewer.availableAnimations[0]);
        viewer.animationName = viewer.availableAnimations[0];
        viewer.play();
      }
    };

    viewer.addEventListener("load", handleLoad);
    return () => viewer.removeEventListener("load", handleLoad);
  }, [modelSrc]);

  // Handle drag and drop or file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelSrc(url);
      setModelName(file.name);
      setModelLoaded(false);
    }
  };

  const handleResetCamera = () => {
    const viewer = viewerRef.current;
    if (viewer) {
      viewer.cameraOrbit = "0deg 75deg 105%";
      viewer.fieldOfView = "auto";
      viewer.jumpCameraToGoal();
    }
  };

  const toggleAnimation = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    if (isPlaying) {
      viewer.pause();
      setIsPlaying(false);
    } else {
      viewer.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col transition-colors duration-500 ${
        bgDark ? "bg-[#0E1110] text-[#F7F5F0]" : "bg-[#F7F5F0] text-[#242522]"
      }`}
    >
      {/* Load Google's official 3D Model Viewer Web Component */}
      <Script
        type="module"
        src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"
        strategy="afterInteractive"
      />

      {/* TOP COMMAND BAR */}
      <header
        className={`px-6 py-4 flex flex-wrap items-center justify-between gap-4 border-b ${
          bgDark ? "border-white/10 bg-[#141816]/90" : "border-[#242522]/10 bg-white/90"
        } backdrop-blur-md sticky top-0 z-40`}
      >
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-sm font-mono uppercase tracking-wider text-[#B79A70] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Studio</span>
          </Link>

          <span className="opacity-30">|</span>

          <div className="flex items-center space-x-2">
            <Box className="w-4 h-4 text-[#B79A70]" />
            <h1 className="font-serif text-lg font-normal tracking-wide truncate max-w-[280px] sm:max-w-none">
              3D GLB Inspector: <span className="text-[#B79A70]">{modelName}</span>
            </h1>
          </div>
        </div>

        {/* Quick Actions Deck */}
        <div className="flex items-center flex-wrap gap-2 text-sm font-mono">
          {/* File Upload Trigger */}
          <label className="cursor-pointer inline-flex items-center space-x-1.5 px-3 py-1.5 border border-[#B79A70]/50 hover:bg-[#B79A70] hover:text-white transition-all shadow-sm">
            <Upload className="w-3.5 h-3.5" />
            <span>Load Different .GLB</span>
            <input
              type="file"
              accept=".glb,.gltf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => setBgDark(!bgDark)}
            className={`p-2 border transition-all ${
              bgDark
                ? "border-white/15 bg-white/5 hover:bg-white/10 text-white"
                : "border-[#242522]/15 bg-black/5 hover:bg-black/10 text-[#242522]"
            }`}
            title="Toggle Studio Lighting / Dark Mode"
          >
            {bgDark ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* 3D CANVAS VIEWPORT AREA */}
      <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden min-h-[600px] p-4 sm:p-8">
        {/* Loading Indicator */}
        {!modelLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none bg-black/40 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full border-2 border-[#B79A70] border-t-transparent animate-spin mb-3" />
            <p className="text-sm font-mono uppercase tracking-widest text-[#B79A70]">
              Synthesizing 3D Mesh &amp; PBR Textures...
            </p>
          </div>
        )}

        {/* Google <model-viewer> Web Component */}
        {/* @ts-ignore */}
        <model-viewer
          ref={viewerRef}
          src={modelSrc}
          alt={modelName}
          auto-rotate={autoRotate ? "" : undefined}
          camera-controls=""
          touch-action="pan-y"
          interaction-prompt="auto"
          shadow-intensity={shadowIntensity.toString()}
          shadow-softness="0.8"
          exposure={exposure.toString()}
          environment-image="neutral"
          autoplay=""
          style={{
            width: "100%",
            height: "100%",
            minHeight: "560px",
            maxHeight: "82vh",
            outline: "none",
          }}
        >
          {/* Progress Bar inside viewer */}
          <div
            className="progress-bar hide"
            slot="progress-bar"
            style={{ width: "100%", height: "3px", backgroundColor: "#B79A70" }}
          />
        {/* @ts-ignore */}
        </model-viewer>

        {/* FLOATING INTERACTIVE CONTROLS HUD (BOTTOM CENTER) */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-5 py-3 rounded-full border shadow-2xl backdrop-blur-xl flex items-center flex-wrap justify-center gap-3 sm:gap-5 text-sm font-mono ${
            bgDark
              ? "bg-[#181D1A]/90 border-white/15 text-white"
              : "bg-white/90 border-[#242522]/15 text-[#242522]"
          }`}
        >
          {/* Play/Pause Animation (if model has animations) */}
          <button
            type="button"
            onClick={toggleAnimation}
            className="flex items-center space-x-1.5 hover:text-[#B79A70] transition-colors"
            title={isPlaying ? "Pause 3D Animation" : "Play 3D Animation"}
          >
            {isPlaying ? <Pause className="w-4 h-4 text-[#B79A70]" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? "Pause Animation" : "Play Animation"}</span>
          </button>

          <span className="opacity-20">|</span>

          {/* Auto Rotate Toggle */}
          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`flex items-center space-x-1.5 transition-colors ${
              autoRotate ? "text-[#B79A70] font-bold" : "hover:text-[#B79A70]"
            }`}
            title="Toggle 360 Turntable Auto-Rotation"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Turntable</span>
          </button>

          <span className="opacity-20">|</span>

          {/* Camera Reset */}
          <button
            type="button"
            onClick={handleResetCamera}
            className="flex items-center space-x-1.5 hover:text-[#B79A70] transition-colors"
            title="Reset Camera View to Origin"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Reset Camera</span>
          </button>

          {/* Available Animations Picker (if any) */}
          {availableAnimations.length > 0 && (
            <>
              <span className="opacity-20">|</span>
              <div className="flex items-center space-x-1.5">
                <Layers className="w-3.5 h-3.5 text-[#B79A70]" />
                <select
                  value={selectedAnimation}
                  onChange={(e) => {
                    setSelectedAnimation(e.target.value);
                    if (viewerRef.current) {
                      viewerRef.current.animationName = e.target.value;
                      viewerRef.current.play();
                      setIsPlaying(true);
                    }
                  }}
                  className={`bg-transparent border-0 text-sm font-mono focus:outline-none cursor-pointer ${
                    bgDark ? "text-white" : "text-[#242522]"
                  }`}
                >
                  {availableAnimations.map((anim) => (
                    <option key={anim} value={anim} className="bg-[#181D1A] text-white">
                      Anim: {anim}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </div>

        {/* TOP RIGHT TELEMETRY CARD */}
        <div
          className={`hidden lg:block absolute top-6 right-6 z-20 p-4 border shadow-xl backdrop-blur-md max-w-xs text-sm font-mono space-y-2 ${
            bgDark ? "bg-[#181D1A]/85 border-white/10 text-white/90" : "bg-white/90 border-[#242522]/10 text-[#242522]"
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-current/10">
            <span className="text-[#B79A70] font-semibold uppercase text-[10px] tracking-widest flex items-center space-x-1">
              <Sparkles className="w-3 h-3" />
              <span>Model Telemetry</span>
            </span>
            <span className="text-[9px] px-1.5 py-0.5 bg-[#B79A70]/20 text-[#B79A70]">GLB 2.0</span>
          </div>

          <div className="space-y-1 text-[11px] text-[#77766F]">
            <p className="flex justify-between">
              <span>File:</span> <strong className="text-current truncate max-w-[140px]">{modelName}</strong>
            </p>
            <p className="flex justify-between">
              <span>Size:</span> <span className="text-current">13.84 MB</span>
            </p>
            <p className="flex justify-between">
              <span>Engine:</span> <span className="text-current">WebGL / PBR</span>
            </p>
            <p className="flex justify-between">
              <span>Blender Exporter:</span> <span className="text-current">v5.2.39</span>
            </p>
            <p className="flex justify-between">
              <span>Rigged Bones:</span> <span className="text-[#B79A70]">22 Joints</span>
            </p>
          </div>

          <div className="pt-2 border-t border-current/10 text-[10px] text-[#77766F] leading-relaxed">
            <Info className="w-3 h-3 inline mr-1 text-[#B79A70]" />
            Left-click &amp; drag to rotate. Right-click to pan. Scroll to zoom.
          </div>
        </div>
      </div>
    </div>
  );
}
