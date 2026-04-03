// @media print {
//   body * {
//     visibility: hidden; /* Hides all elements by default */
//   }
//   #agreement-form, #agreement-form * {
//     visibility: visible; /* Shows the specific section and its children */
//   }
//   #agreement-form {
//     position: absolute;
//     left: 0;
//     top: 0;
//   }
// }

function download_pdf(){
  const pdf = document.getElementById("agreement-form");

  html2pdf().from(pdf).save();
}