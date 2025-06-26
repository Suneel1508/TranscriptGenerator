import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (transcriptData) => {
  try {
    // Get the transcript preview element
    const element = document.getElementById('transcript-preview')
    if (!element) {
      throw new Error('Transcript preview element not found')
    }

    // Configure html2canvas options for better quality
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      width: element.scrollWidth,
      height: element.scrollHeight,
      scrollX: 0,
      scrollY: 0
    })

    // Calculate PDF dimensions
    const imgWidth = 210 // A4 width in mm
    const pageHeight = 295 // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    // Add the first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    // Generate filename
    const studentName = transcriptData.studentName || 'Student'
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${studentName.replace(/\s+/g, '_')}_Transcript_${timestamp}.pdf`

    // Save the PDF
    pdf.save(filename)
    
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}

export const generatePDFBlob = async (transcriptData) => {
  try {
    const element = document.getElementById('transcript-preview')
    if (!element) {
      throw new Error('Transcript preview element not found')
    }

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    })

    const imgWidth = 210
    const pageHeight = 295
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    let heightLeft = imgHeight

    const pdf = new jsPDF('p', 'mm', 'a4')
    let position = 0

    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

    return pdf.output('blob')
  } catch (error) {
    console.error('Error generating PDF blob:', error)
    throw error
  }
}