import moment from 'moment';
import jsPDF from "jspdf";
import 'jspdf-autotable';

export const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
  return phoneRegex.test(phoneNumber) && phoneNumber.length === 12;
};


export const formatDate = (dateString) => {
  const date = moment(dateString);
  return date.format('DD/MM/YYYY');
};


/**
 * Génère un PDF avec des options personnalisées.
 * @param {string} title - Le titre du document.
 * @param {Array} headers - Les en-têtes de la table.
 * @param {Array} data - Les données de la table.
 * @param {string} footerText - Le texte du pied de page.
 * @param {string} fileName - Le nom du fichier PDF à enregistrer.
 */
export const generatePDF = ({ title, headers, data, footerText, fileName }) => {
  const doc = new jsPDF();

  // Ajout du titre
  doc.text(title, 14, 10);

  // Génération de la table
  doc.autoTable({
    head: [headers],
    body: data,
    margin: { top: 20 },
    didDrawPage: (data) => {

      const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
      const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
      const xPosition = 14;
      const yPosition = pageHeight - 10;

      doc.text(footerText, xPosition, yPosition, { align: 'left' });

      // Numérotation des pages
      const pageNumber = data.pageNumber;
      const totalPages = data.pageCount;
      doc.text(`Page ${pageNumber} de ${totalPages}`, pageWidth - 20, yPosition , { align: 'right' });
    }
  });

  // Enregistrement du fichier PDF
  doc.save(fileName);
};


