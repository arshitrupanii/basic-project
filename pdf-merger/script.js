const input = document.getElementById("pdfFiles");
const preview = document.querySelector(".preview");
const mergeBtn = document.getElementById("mergeBtn");

input.addEventListener("change", showPreview);
mergeBtn.addEventListener("click", mergePDFs);


// -------- Preview Files --------
function showPreview() {
  preview.innerHTML = "";

  [...input.files].forEach(file => {
    const div = document.createElement("div");
    div.textContent = file.name;
    preview.appendChild(div);
  });
}


// -------- Merge PDFs --------
async function mergePDFs() {
  if (input.files.length === 0) return;

  const { PDFDocument } = PDFLib;
  const mergedPdf = await PDFDocument.create();

  for (const file of input.files) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(arrayBuffer);

    const pages = await mergedPdf.copyPages(
      pdf,
      pdf.getPageIndices()
    );

    pages.forEach(page => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  downloadPDF(mergedBytes);
}


// -------- Download --------
function downloadPDF(bytes) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "merged.pdf";
  a.click();

  URL.revokeObjectURL(url);
}
