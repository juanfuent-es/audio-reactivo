const SVG_URL = "./img/next-station.svg";
const TOTAL_DURATION = 3; // seconds

const SVG_STROKE_SELECTORS = [
	"path",
	"line",
	"polyline",
	"polygon",
	"circle",
	"ellipse",
	"rect"
].join(",");

async function loadSvg(url) {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`No se pudo cargar el SVG: ${response.status} ${response.statusText}`);
	}
	return response.text();
}

function mountSvg(svgMarkup) {
	const container = document.createElement("div");
	container.id = "next-station-container";

	container.innerHTML = svgMarkup;
	document.body.appendChild(container);

	return container.querySelector("svg");
}

function prepareStrokeDrawing(elements) {
	let totalLength = 0;
	const segments = [];

	elements.forEach((element) => {
		if (typeof element.getTotalLength !== "function") {
			return;
		}

		const length = element.getTotalLength();
		if (!Number.isFinite(length) || length <= 0) {
			return;
		}

		// Start fully hidden: no visible dash yet.
		element.style.strokeDasharray = `0 ${length}`;
		element.style.strokeDashoffset = "0";
		element.style.vectorEffect = "non-scaling-stroke";

		totalLength += length;
		segments.push({ element, length });
	});

	return { segments, totalLength };
}

function buildDrawTimeline(segments, totalLength, durationSeconds) {
	const timeline = gsap.timeline({ paused: true });
	const minSegmentDuration = 0.08;

	segments.forEach(({ element, length }) => {
		const proportionalDuration = totalLength > 0
			? (length / totalLength) * durationSeconds
			: durationSeconds / Math.max(segments.length, 1);

		timeline.to(element, {
			strokeDasharray: `${length} 0`,
			duration: Math.max(proportionalDuration, minSegmentDuration),
			ease: "none",
			onComplete: () => {
				// Force exact final state to avoid sub-pixel leftovers.
				element.style.strokeDasharray = "none";
				element.style.strokeDashoffset = "0";
			}
		});
	});

	return timeline;
}

async function initSvgDraw() {
	try {
		const svgMarkup = await loadSvg(SVG_URL);
		const svg = mountSvg(svgMarkup);

		if (!svg) {
			throw new Error("El contenedor no tiene un SVG válido.");
		}

		svg.style.visibility = "hidden";

		const strokeElements = Array.from(svg.querySelectorAll(SVG_STROKE_SELECTORS));
		const { segments, totalLength } = prepareStrokeDrawing(strokeElements);

		if (segments.length === 0) {
			throw new Error("No se encontraron trazos animables en el SVG.");
		}

		const timeline = buildDrawTimeline(segments, totalLength, TOTAL_DURATION);
		svg.style.visibility = "visible";
		timeline.play(0);
	} catch (error) {
		console.error("Error inicializando la animación del SVG:", error);
	}
}

initSvgDraw();
