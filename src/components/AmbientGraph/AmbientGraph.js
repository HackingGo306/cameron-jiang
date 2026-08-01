"use client";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react";

const UnavailableGraph = forwardRef(function UnavailableGraph() {
  return null;
});

const ForceGraph = dynamic(
  () => import("react-force-graph-3d").catch(() => UnavailableGraph),
  { ssr: false },
);

const GRAPH_PROFILES = {
  hero: {
    count: 300,
    largeCount: 350,
    seed: 306,
    fallbackDistance: 1200,
    startAngle: 0,
  },
  contact: {
    count: 50,
    largeCount: 50,
    seed: 912,
    fallbackDistance: 550,
    startAngle: 0,
  },
};

const ORBIT_RADIANS_PER_MILLISECOND = (Math.PI * 2) / 96_000;
const INITIAL_EXPANSION_TICKS = 180;

function seededRandom(seed) {
  let value = seed % 2147483647;
  if (value <= 0) value += 2147483646;

  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildGraph(count, seed) {
  const random = seededRandom(seed);
  const nodes = Array.from({ length: count }, (_, id) => ({ id }));
  const links = nodes.slice(1).map((node) => ({
    source: node.id,
    target: Math.round(random() * (node.id - 1)),
  }));

  return { nodes, links };
}

function measureGraphSpread(nodes) {
  let squaredDistance = 0;
  let positionedNodes = 0;

  nodes.forEach((node) => {
    if (![node.x, node.y, node.z].every(Number.isFinite)) return;
    squaredDistance += node.x ** 2 + node.y ** 2 + node.z ** 2;
    positionedNodes += 1;
  });

  return positionedNodes > 0 ? Math.sqrt(squaredDistance / positionedNodes) : 0;
}

function getCssToken(name, fallback) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

export default function AmbientGraph({ variant = "hero" }) {
  const theme = useTheme();
  const wideScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const extraLargeScreen = useMediaQuery(theme.breakpoints.up("xl"));
  const reducedMotion = useReducedMotion();
  const profile = GRAPH_PROFILES[variant] || GRAPH_PROFILES.hero;
  const nodeCount =
    variant === "hero" && extraLargeScreen ? profile.largeCount : profile.count;
  const wrapperRef = useRef(null);
  const graphRef = useRef(null);
  const frameRef = useRef(0);
  const firstTickRef = useRef(false);
  const startupTickRef = useRef(0);
  const startupCompleteRef = useRef(false);
  const orbitAngleRef = useRef(profile.startAngle);
  const [graphInstance, setGraphInstance] = useState(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [webglAvailable, setWebglAvailable] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [graphReady, setGraphReady] = useState(false);
  const [startupComplete, setStartupComplete] = useState(false);
  const graph = useMemo(
    () => buildGraph(nodeCount, profile.seed),
    [nodeCount, profile.seed],
  );
  const cameraDistance = useMemo(() => {
    if (variant === "contact") return 550;
    if (extraLargeScreen) return 1200;
    if (dimensions.width <= 0 || dimensions.height <= 0) {
      return profile.fallbackDistance;
    }
    if (wideScreen) {
      return 1_000_000 / Math.pow(Math.min(dimensions.width, dimensions.height), 1.03);
    }
    return 1200 * (dimensions.height / dimensions.width);
  }, [dimensions.height, dimensions.width, extraLargeScreen, profile.fallbackDistance, variant, wideScreen]);

  useEffect(() => {
    const element = wrapperRef.current;
    if (!element) return undefined;

    const visibleObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.12 },
    );
    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width: Math.round(width), height: Math.round(height) });
    });

    visibleObserver.observe(element);
    resizeObserver.observe(element);

    return () => {
      visibleObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (!wideScreen || reducedMotion) {
        setWebglAvailable(false);
        return;
      }

      const canvas = document.createElement("canvas");
      const context =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setWebglAvailable(Boolean(context));
      context?.getExtension?.("WEBGL_lose_context")?.loseContext();
    });

    return () => cancelAnimationFrame(frame);
  }, [reducedMotion, wideScreen]);

  const eligibleForLive = wideScreen && !reducedMotion;
  const canRenderGraph =
    eligibleForLive &&
    webglAvailable &&
    dimensions.width > 0 &&
    dimensions.height > 0;
  const active =
    canRenderGraph && pageVisible && (!startupComplete || visible);
  const graphMode = canRenderGraph ? "live" : "hidden";
  const graphState = graphMode === "live" ? (active ? "active" : "paused") : graphMode;

  const assignGraphRef = useCallback((instance) => {
    graphRef.current = instance;
    setGraphInstance(instance);
    if (!instance) {
      firstTickRef.current = false;
      startupTickRef.current = 0;
      startupCompleteRef.current = false;
      wrapperRef.current?.removeAttribute("data-graph-initial-spread");
      wrapperRef.current?.removeAttribute("data-graph-final-spread");
      setGraphReady(false);
      setStartupComplete(false);
    }
  }, []);

  const readNodeColor = useCallback(
    () => getCssToken("--signature-graph-node", getCssToken("--color-brand", "#0f6fff")),
    [],
  );
  const readLinkColor = useCallback(
    () => getCssToken("--color-text-primary", "#0c1728"),
    [],
  );

  useEffect(() => {
    orbitAngleRef.current = profile.startAngle;
  }, [graphInstance, profile.startAngle]);

  useEffect(() => {
    if (!graphInstance) return undefined;

    if (active) {
      graphInstance.resumeAnimation?.();
    } else {
      graphInstance.pauseAnimation?.();
    }

    return () => graphInstance.pauseAnimation?.();
  }, [active, graphInstance]);

  useEffect(() => {
    if (!graphInstance) return undefined;
    return () => graphInstance.d3Force?.("drift", null);
  }, [graphInstance]);

  useEffect(() => {
    if (!graphInstance) return undefined;

    const scene = graphInstance.scene?.();
    let disposed = false;
    let appliedFog = null;
    const applyTheme = async () => {
      wrapperRef.current?.setAttribute(
        "data-graph-theme",
        document.documentElement.getAttribute("data-mui-color-scheme") || "light",
      );
      if (variant === "hero" && scene) {
        const { Fog } = await import("three");
        if (disposed) return;
        appliedFog = new Fog(
          getCssToken(
            "--signature-graph-fog",
            getCssToken("--color-text-primary", "#0c1728"),
          ),
          100,
          2000,
        );
        scene.fog = appliedFog;
      }
      graphInstance.refresh?.();
    };
    const themeObserver = new MutationObserver(applyTheme);

    applyTheme();
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-mui-color-scheme"],
    });

    return () => {
      disposed = true;
      themeObserver.disconnect();
      if (variant === "hero" && scene?.fog === appliedFog) scene.fog = null;
    };
  }, [graphInstance, variant]);

  useEffect(() => {
    if (!graphReady) return undefined;

    const canvas = wrapperRef.current?.querySelector("canvas");
    if (!canvas) return undefined;

    const onContextLost = (event) => {
      event.preventDefault();
      setGraphReady(false);
      setWebglAvailable(false);
    };

    canvas.addEventListener("webglcontextlost", onContextLost);
    return () => canvas.removeEventListener("webglcontextlost", onContextLost);
  }, [graphReady]);

  useEffect(() => {
    cancelAnimationFrame(frameRef.current);
    if (!active || !graphReady || !graphRef.current) return undefined;

    let previous = performance.now();
    const orbit = (now) => {
      const elapsed = Math.min(now - previous, 48);
      previous = now;
      orbitAngleRef.current += elapsed * ORBIT_RADIANS_PER_MILLISECOND;
      graphRef.current?.cameraPosition({
        x: cameraDistance * Math.sin(orbitAngleRef.current),
        y: 0,
        z: cameraDistance * Math.cos(orbitAngleRef.current),
      });
      frameRef.current = requestAnimationFrame(orbit);
    };

    frameRef.current = requestAnimationFrame(orbit);
    return () => cancelAnimationFrame(frameRef.current);
  }, [active, cameraDistance, graphReady]);

  return (
    <Box
      ref={wrapperRef}
      data-ambient-graph={variant}
      data-graph-mode={graphMode}
      data-graph-state={graphState}
      data-graph-nodes={nodeCount}
      data-graph-camera-distance={Math.round(cameraDistance)}
      data-graph-simulation="continuous"
      data-graph-startup="expand-out"
      data-graph-startup-state={
        canRenderGraph ? (startupComplete ? "complete" : "expanding") : "waiting"
      }
      aria-hidden="true"
      sx={{
        position: "relative",
        display: eligibleForLive ? "block" : "none",
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {canRenderGraph ? (
        <Box
          data-graph-live={graphReady ? "ready" : "loading"}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: 1,
            transition: "none",
          }}
        >
          <ForceGraph
            key={`${variant}-${nodeCount}`}
            ref={assignGraphRef}
            width={dimensions.width}
            height={dimensions.height}
            graphData={graph}
            showNavInfo={false}
            backgroundColor="rgba(0, 0, 0, 0)"
            nodeColor={readNodeColor}
            nodeOpacity={0.9}
            nodeRelSize={4}
            linkColor={readLinkColor}
            linkOpacity={0.2}
            linkWidth={0.8}
            cooldownTicks={Infinity}
            cooldownTime={Infinity}
            d3VelocityDecay={0.7}
            enableNodeDrag={false}
            enableNavigationControls={false}
            enablePointerInteraction={false}
            onEngineTick={() => {
              startupTickRef.current += 1;
              if (startupTickRef.current === 1) {
                wrapperRef.current?.setAttribute(
                  "data-graph-initial-spread",
                  measureGraphSpread(graph.nodes).toFixed(2),
                );
              }
              if (
                !startupCompleteRef.current &&
                startupTickRef.current >= INITIAL_EXPANSION_TICKS
              ) {
                startupCompleteRef.current = true;
                wrapperRef.current?.setAttribute(
                  "data-graph-final-spread",
                  measureGraphSpread(graph.nodes).toFixed(2),
                );
                setStartupComplete(true);
              }
              if (firstTickRef.current) return;
              firstTickRef.current = true;
              const instance = graphRef.current;
              instance?.cameraPosition({ x: 0, y: 0, z: cameraDistance });
              instance?.d3Force("drift", () => {
                const time = Date.now() * 0.001;
                graph.nodes.forEach((node, index) => {
                  node.vx += Math.sin(time + index) * 0.2;
                  node.vy += Math.cos(time + index * 1.1) * 0.2;
                  node.vz += Math.sin(time * 0.8 + index) * 0.2;
                });
              });
              setGraphReady(true);
            }}
          />
        </Box>
      ) : null}
    </Box>
  );
}
