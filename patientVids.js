document.getElementById("work-content1-button").addEventListener("click", showVidModal);

function showVidModal(e) {
    document.getElementById("darkOverlay").style.display = "block";
    document.getElementById("patientManagementModal").style.display = "block";
}

document.getElementById("darkOverlay").addEventListener("click", hideVidModal);
document.getElementById("closeVidModal").addEventListener("click", hideVidModal);
function hideVidModal(e) {
    document.getElementById("darkOverlay").style.display = "none";
    document.getElementById("patientManagementModal").style.display = "none";

}

//note: there is a trigger in parallax.js closing this if one scrolls towards the 
//top after opening the modal. 