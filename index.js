//print
let renterName = document.getElementById("renter-name").value;
let selectedCar = null;
let displayModel = document.getElementById("display-model");

function download_pdf(){
  // window.scrollTo(0, 0);
  
  const pdf = document.getElementById("agreement-form");
  const wrapper = document.getElementById("pdf-render-wrapper");
  const clone = pdf.cloneNode(true);

  clone.style.transform = "none";
  clone.style.boxShadow = "none";

  wrapper.innerHTML = "";
  wrapper.appendChild(clone);

  pdf.style.boxShadow = "none";

  let dynamicFileName = null;

  if (renterName && selectedCar){
    dynamicFileName = `${renterName} (${selectedCar.model}) Rental-Agreement.pdf`;
  }
  else
    dynamicFileName = `Rental-Agreement.pdf`;
  
  const opt = {
    margin: 0,
    // if (renterName && displayModel)
    filename: dynamicFileName,
    image: {type: 'jpeg', quality: 0.98},
    html2canvas:{
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {unit:'in', format:[8.5, 14], orientation: 'portrait'}
  }

  try{
    html2pdf().set(opt).from(clone).save();
  }finally{
    wrapper.innerHTML="";
  }
}

async function print_pdf() {
  // window.scrollTo(0, 0);

  const element = document.getElementById("agreement-form");
  const wrapper = document.getElementById("pdf-render-wrapper");
  const clone = element.cloneNode(true);

  clone.style.transform = "none";
  clone.style.boxShadow = "none";

  wrapper.innerHTML = "";
  wrapper.appendChild(clone);
  
  let dynamicFileName = null;

  if (renterName && selectedCar){
    dynamicFileName = `${renterName} (${selectedCar.model}) Rental-Agreement.pdf`;
  }
  else
    dynamicFileName = `Rental-Agreement.pdf`;

  const opt = {
    margin: 0,
    filename: dynamicFileName,
    image: {type: 'jpeg', quality: 0.98},
    html2canvas:{
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {unit:'in', format:[8.5, 14], orientation: 'portrait'}
  }

  try{
     await html2pdf().set(opt).from(clone).toPdf().get('pdf').then(function (pdf) {
      window.open(pdf.output('bloburl'), '_blank').print();
    });
  } finally{
    wrapper.innerHTML="";
  }
}

function print_cdw(){
  // window.scrollTo(0, 0);
  const pdf = document.getElementById("cdw-form");
  const wrapper = document.getElementById("pdf-render-wrapper");
  const clone = pdf.cloneNode(true);

  clone.style.transform = "none";
  clone.style.boxShadow = "none";

  wrapper.innerHTML = "";
  wrapper.appendChild(clone);


  pdf.style.boxShadow = "none";

  let dynamicFileName = null;

  if (renterName && selectedCar){
    dynamicFileName = `${renterName} (${selectedCar.model}) CDW.pdf`;
  }
  else
    dynamicFileName = `CDW.pdf`;

  const opt = {
    margin: 0,
    filename: dynamicFileName,
    image: {type: 'jpeg', quality: 0.98},
    html2canvas:{
      scale: 2,
      useCORS: true,
      scrollY: 0,
      scrollX: 0,
    },
    jsPDF: {unit:'in', format:[8.5, 14], orientation: 'portrait'}
  }
  try{
    html2pdf().set(opt).from(clone).save();
  }finally{
    wrapper.innerHTML="";
  }
}

//change every update
var allInputs = document.querySelectorAll("input, select, textarea");

for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("input", update);
}


//functions
function update(){
  let rentalAgreementPDF = document.getElementById("agreement-form");

  //variables init
  let ownerName = "ANGELYN M. DADO";
  let agreementDate = formatDate(document.getElementById("agreement-date-form").value);
  renterName = document.getElementById("renter-name").value;
  let renterAddress = document.getElementById("renter-address").value;
  let startDate = document.getElementById("rental-start-datetime").value;
  let endDate = document.getElementById("rental-end-datetime").value;
  let destination = document.getElementById("destination").value;
  let isAutofill = document.getElementById("autofill").checked;
  let isCDW = document.getElementById("cdw").checked;

  //agreement fields init
  let displayAgreementDate = document.getElementById("display-date");
  let displayRenterName = document.getElementById("renter-name-display");
  let displayRenterAddress = document.getElementById("renter-address-display");
  let displayMake = document.getElementById("display-make");
  displayModel = document.getElementById("display-model");
  let displayPlate= document.getElementById("display-plate-number");
  let displayYear= document.getElementById("display-year");
  let displayColor = document.getElementById("display-color");
  let displayStartDate = document.getElementById("display-start-date");
  let displayEndDate = document.getElementById("display-end-date");
  let displayDestination = document.getElementById("display-destination");

  let signOwnername = document.getElementById("sign-owner-name");
  let signAgreementDate = document.getElementById("sign-agreement-date");

  let displayCDW = document.getElementById("damage-or-loss");
  let btnSaveCWD = document.getElementById("btnSaveCWD");

  //cdw fields init
  let displayAgreementDateCDW = document.getElementById("display-date-cdw");
  let displayRenterNameCDW = document.getElementById("renter-name-display-cdw");
  let displayMakeCDW = document.getElementById("display-make-cdw");
  let displayModelCDW = document.getElementById("display-model-cdw");
  let displayPlateCDW= document.getElementById("display-plate-number-cdw");
  let displayYearCDW= document.getElementById("display-year-cdw");
  let displayColorCDW = document.getElementById("display-color-cdw");
  let displayStartDateCDW = document.getElementById("display-start-date-cdw");
  let displayEndDateCDW = document.getElementById("display-end-date-cdw");

  //injection
  //--agreement bw--
  displayAgreementDate.innerHTML = agreementDate || "____________";
  displayRenterName.innerHTML = renterName || "____________";
  displayRenterAddress.innerHTML = renterAddress || "____________";

  //--rental vehicle--

  let selectedID = document.getElementById("rental-vehicle").value;
  selectedCar = null;
  for (let i = 0; i<fleet.length; i++){
    if (fleet[i].id === selectedID){
      selectedCar = fleet[i];
      break;
    }
  }
  if (selectedCar !== null){
    displayMake.innerHTML = selectedCar.make || "____________";
    displayModel.innerHTML = selectedCar.model || "____________";
    displayPlate.innerHTML = selectedCar.plate || "____________";
    displayYear.innerHTML = selectedCar.year || "____________";
    displayColor.innerHTML = selectedCar.color || "____________";
  }
  else{
    displayMake.innerHTML = "____________";
    displayModel.innerHTML = "____________";
    displayPlate.innerHTML = "____________";
    displayYear.innerHTML = "____________";
    displayColor.innerHTML = "____________";
  }


  //--rental period--
  displayStartDate.innerHTML = formatDateTime(startDate) || "____________";

  displayEndDate.innerHTML = formatDateTime(endDate) || "____________";
  
  displayDestination.innerHTML = destination || "____________";



  //--autofill--
  if (isAutofill){
    signOwnername.innerHTML = ownerName;
    signOwnername.style.textDecoration = "underline";

    signAgreementDate.innerHTML = agreementDate;
    signAgreementDate.style.textDecoration = "underline";
  }
  else{
    signOwnername.innerHTML = "_____________________";
    signAgreementDate.innerHTML = "_____________________";
    signOwnername.style.textDecoration = "none";
    signAgreementDate.style.textDecoration = "none";
  }

  

  //CDW
  if (isCDW){
    btnSaveCWD.style.display = "block";
    document.getElementById("mainCDWContainer").style.display="block";

    displayCDW.innerHTML = ("As permitted given the extent of the law, The Renter will only be responsible for risk of theft, damage, loss, or destruction of the Vehicle from any and every cause if upon investigation, if proven that the accident or damage was caused by the Renter's misuse, abuse, negligence or intentional act to damage the Owner's vehicle otherwise the Renter is freed of any financial responsibility for any collision damages. If while in the Renter's possession the Vehicle becomes damaged, the Collision Damage Waiver will cover any accident, vandalization, etc. including any damages from the car while parked. CDW however does not cover damages to other cars, bodily injury to other people, injuries to the Renter and the passengers, theft or damage to the Renter's personal items on the vehicle.")
  }
  else{
    btnSaveCWD.style.display = "none";
    document.getElementById("mainCDWContainer").style.display="none";

    displayCDW.innerHTML = ("The Renter will be responsible for risk of theft, damage, loss, or destruction of the Vehicle from any and every cause. If while in the Renter's possession the Vehicle becomes damaged, the Renter agrees to pay for any and all costs of repair, up to the current value of the Vehicle. If while in the Renter's possession, the Vehicle becomes lost, the Renter agrees to pay the Owner its current value. For minor scratches, the Renter will not pay for the damages. For deep scratches and dents, the Renter agrees to pay 5,000 pesos per panel and 2,000 pesos per day while the car is being fixed. For tire damages, the Renter agrees to replace the damaged tire. For major damages, the insurance will cover the damages but the Renter will pay the insurance participation fee and 1,500 pesos per day loss of income while car is being fixed. For total wreck damages or total loss, the Renter agrees to pay the Owner its current value of the Vehicle and agrees to pay for the towing services.")
  }


  displayAgreementDateCDW.innerHTML = agreementDate || "____________";
  displayRenterNameCDW.innerHTML = renterName || "____________";

  if (selectedCar !== null){
    displayMakeCDW.innerHTML = selectedCar.make || "____________";
    displayModelCDW.innerHTML = selectedCar.model || "____________";
    displayPlateCDW.innerHTML = selectedCar.plate || "____________";
    displayYearCDW.innerHTML = selectedCar.year || "____________";
    displayColorCDW.innerHTML = selectedCar.color || "____________";
  }
  else{
    displayMakeCDW.innerHTML = "____________";
    displayModelCDW.innerHTML = "____________";
    displayPlateCDW.innerHTML = "____________";
    displayYearCDW.innerHTML = "____________";
    displayColorCDW.innerHTML = "____________";
  }
  displayStartDateCDW.innerHTML = formatDateTimeCDW(startDate) || "____________";

  displayEndDateCDW.innerHTML = formatDateTimeCDW(endDate) || "____________";

  scalePDFPreview();
}

document.getElementById("rental-start-datetime").addEventListener("change", function() {
    if (this.value) {
        let date = new Date(this.value);
        
        // Add 1 day
        date.setDate(date.getDate() + 1);
        
        // Format it for the input field (YYYY-MM-DDTHH:mm)
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        //js .getMonth() starts counting at 0 so month gets a +1
        //padStart: 2 = 02, 3 = 003

        let nextDayString = `${year}-${month}-${day}T${hours}:${minutes}`;
        
        document.getElementById("rental-end-datetime").value = nextDayString;
        
        update();
    }
});

function formatDate(dateString) {
    if (!dateString) return "____________";
    
    // Create a new date object
    const date = new Date(dateString);
    
    // Format options
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    
    // Return in "January 25, 2026" format
    return date.toLocaleDateString('en-US', options);
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "____________";

    const dateObj = new Date(dateTimeString);

    // Format the Date: April 3, 2026
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);

    // Format the Time: 2:30 PM
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate}  &ensp; ${formattedTime}`;
}

function formatDateTimeCDW(dateTimeString) {
    if (!dateTimeString) return "____________";

    const dateObj = new Date(dateTimeString);

    // Format the Date: April 3, 2026
    const dateOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString('en-US', dateOptions);

    // Format the Time: 2:30 PM
    const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
    const formattedTime = dateObj.toLocaleTimeString('en-US', timeOptions);

    return `${formattedDate}  &ensp; Time: ${formattedTime}`;
}

//UNIT DATABASE
const fleet = [
  {
    id: "destinator",
    make: "Mitsubishi",
    model: "Destinator",
    year: "2026",
    color: "Quartz White Pearl",
    plate: "EAL 5960"
  },   
  {
    id: "fortuner",
    make: "Toyota",
    model: "Fortuner",
    year: "2024",
    color: "Platinum White Pearl",
    plate: "EAJ 5006"
  },
  {
    id: "vios-ativ",
    make: "Toyota",
    model: "Ativ Vios",
    year: "2026",
    color: "Metal Stream Metallic",
    plate: "EAL 4322"
  },
  {
    id: "vios-xle",
    make: "Toyota",
    model: "Vios XLE",
    year: "2025",
    color: "Silver Metallic",
    plate: "EAJ 4766"
  },  
  {
    id: "innova-e",
    make: "Toyota",
    model: "Innova E",
    year: "2023",
    color: "Red Mica Metallic",
    plate: "EAG 4368"
  },    
  {
    id: "avanza-e",
    make: "Toyota",
    model: "Avanza E",
    year: "2023",
    color: "Greenish Gunmetal",
    plate: "EAG 3625"
  },     
  {
    id: "brio-rs-blacktop",
    make: "Honda",
    model: "Brio RS Blacktop",
    year: "2023",
    color: "Carnival Yellow",
    plate: "NIF 1483"
  },   
  {
    id: "city",
    make: "Honda",
    model: "City",
    year: "2023",
    color: "Taffeta White",
    plate: "NIN 3324"
  },     
  {
    id: "brv-s-cvt",
    make: "Honda",
    model: "BRV S CVT",
    year: "2023",
    color: "Taffeta White",
    plate: "NEE 9612"
  },
  {
    id: "creta-gl-ivt",
    make: "Hyundai",
    model: "Creta GL IVT",
    year: "2023",
    color: "Creamy White Pearl",
    plate: "EAG 4405"
  },    
  {
    id: "tracker-ls",
    make: "Chevrolet",
    model: "Tracker LS",
    year: "2023",
    color: "Summit White",
    plate: "NIJ 2999"
  },   
];

let rentalVehicle = document.getElementById("rental-vehicle");
fleet.forEach(car =>{
  let option = document.createElement('option');
  option.value = car.id;
  option.text = `${car.make} ${car.model} (${car.year})`;
  rentalVehicle.add(option);
});

function scalePDFPreview() {
  // Select all potential PDF containers
  const previews = document.querySelectorAll('.pdf-container, .pdf-container-cdw');
  
  const padding = 20; 
  const screenWidth = window.innerWidth - padding;
  const pdfWidth = 816; // 8.5 inches at 96 DPI

  previews.forEach(preview => {
      // Find the specific viewport this preview belongs to
      const viewport = preview.closest('.pdf-preview-viewport');
      if (!viewport) return;

      if (screenWidth < pdfWidth) {
          const scaleFactor = screenWidth / pdfWidth;
          
          // Apply scale to the preview
          preview.style.transform = `scale(${scaleFactor})`;
          
          // Adjust the parent viewport height so there isn't massive empty space
          // (scale() doesn't collapse the original space taken by the element)
          viewport.style.height = (preview.offsetHeight * scaleFactor) + "px";
      } else {
          // Reset for desktop
          preview.style.transform = "scale(1)";
          viewport.style.height = "auto";
      }
  });
}


window.addEventListener('resize', scalePDFPreview);
window.addEventListener('load', scalePDFPreview);
