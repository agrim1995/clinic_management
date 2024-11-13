const AddPresc = async (event) => {
  event.preventDefault();

  // Construct the request object using values from refs
  const prescriptionData = {
    symptoms: symptomsBox.current.value || appointment.symptoms || "",
    observation: observationBox.current.value || "",
    diseases: diseasesBox.current.value || "",
    next_visit_date: nextVisitDateBox.current.value || "",
    advice: adviceBox.current.value || "",
    doctor_id: logindata.uid || "", // Use doctor_id from logged-in user
    visit_id: appointment.visit_id || "", // Use visit_id from appointment
  };

  try {
    setLoading(true); // Start loading indicator

    // Make API call to save the prescription
    const response = await Apiservice.PostApiCallWithToken(
      urls.Add_Prescription,
      prescriptionData,
      logindata.token
    );

    console.log(response);

    // Handle API response
    if (response.data.status) {
      setMsg(response.data.msg || "Prescription saved successfully");
    } else {
      setMsg(response.data.msg || "Failed to save prescription");
    }
  } catch (error) {
    console.error("Error:", error); // Print the entire error object
    console.error("Error message:", error.message); // Print just the error message
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request data:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error message:", error.message);
    }
    setMsg("An error occurred while saving the prescription.");
  } finally {
    setLoading(false); // Stop loading indicator
  }
};
