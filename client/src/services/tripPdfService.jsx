import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateTripPDF = (trip) => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Trip Details Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Trip ID: ${trip._id}`, 14, 28);

  autoTable(doc, {
    startY: 35,
    head: [["Field", "Value"]],
    body: [
      ["Start Location", trip.startLocation],
      ["End Location", trip.endLocation],
      ["Start Date", new Date(trip.startDate).toLocaleString()],
      ["End Date", new Date(trip.endDate).toLocaleString()],
      ["Status", trip.status],
      ["Fuel (Liters)", trip.fuelLiters ?? "-"],
      ["Remarks", trip.remarks || "-"]
    ],
    styles: { fontSize: 10 }
  });

  doc.text("Truck Information", 14, doc.lastAutoTable.finalY + 10);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Field", "Value"]],
    body: [
      ["Plate Number", trip.truckId.plateNumber],
      ["Brand", trip.truckId.brand],
      ["Model", trip.truckId.model],
      ["Current KM", trip.truckId.currentKm],
      ["Status", trip.truckId.status]
    ],
    styles: { fontSize: 10 }
  });

  doc.text("Trailer Information", 14, doc.lastAutoTable.finalY + 10);

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 15,
    head: [["Field", "Value"]],
    body: [
      ["Plate Number", trip.trailerId.plateNumber],
      ["Brand", trip.trailerId.brand],
      ["Model", trip.trailerId.model],
      ["Current KM", trip.trailerId.currentKm],
      ["Status", trip.trailerId.status]
    ],
    styles: { fontSize: 10 }
  });

  doc.save(`trip-${trip._id}.pdf`);
};
