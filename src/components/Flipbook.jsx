import React from "react";
import HTMLFlipBook from "react-pageflip";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import pdf from "./Kỷ yếu Hội bảo trợ NKT.pdf";
// import pdf from "./Kỷ yếu Hội bảo trợ NKT-1-15.pdf";

// import pdf from "./ByteBeatJan2024.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Pages = React.forwardRef((props, ref) => {
	return (
		<div className="demoPage" ref={ref}>
			<p>{props?.children ?? ""}</p>
			{/* <p>Page number: {props.number}</p> */}
		</div>
	);
});

Pages.displayName = "Pages";

function Flipbook() {
	const [numPages, setNumPages] = useState();

	const [pageSize, setPageSize] = useState({
		width: 900,
		height: 755,
	});

	function onDocumentLoadSuccess({ numPages }) {
		setNumPages(numPages);
	}
	useEffect(() => {
		function updatePageSize() {
			const w = window.innerWidth;
			const h = window.innerHeight;
			const isMobile = w <= 768 || h <= 500;
			const isLandscape = w > h;

			const width = isMobile
				? isLandscape
					? h * 0.95 // landscape phone
					: h * 0.5
				: 900;
			const height = isMobile
				? isLandscape
					? h * 0.75 // landscape phone
					: h * 0.5 // portrait phone
				: 755;

			setPageSize({ width, height });
		}

		updatePageSize();
		window.addEventListener("resize", updatePageSize);
		return () => window.removeEventListener("resize", updatePageSize);
	}, []);

	return (
		<>
			<div className="w-screen h-screen flex flex-col items-center justify-center bg-blue-300 overflow-hidden p-4">
				<HTMLFlipBook
					width={pageSize.width}
					height={pageSize.height}
					className="w-full"
					showCover={true}
					mobileScrollSupport={true}
				>
					{[...Array(numPages).keys()].map((pNum) => (
						<Pages key={pNum} number={pNum + 1}>
							<Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
								<Page
									pageNumber={pNum + 1}
									width={pageSize.width}
									height={pageSize.height}
									renderAnnotationLayer={false}
									renderTextLayer={false}
								/>
							</Document>
						</Pages>
					))}
				</HTMLFlipBook>
			</div>
		</>
	);
}

export default Flipbook;
