// Reusable pink "Download PDF" button with cycling border + orbiting spark.
// Styled via .download-pdf in App.less.
export default function DownloadPdfButton({ className = '' }) {
  return (
    <a className={`download-pdf ${className}`.trim()} href="/resume.pdf" download>
      <span className="download-pdf__spark" aria-hidden="true" />
      Download PDF
    </a>
  )
}
