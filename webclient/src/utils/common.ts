import React, { SetStateAction } from "react";
import { debounceConditionalVenueSearch, readFacility, readVenue, selectVenue, venue } from "@/types/task";
// import { handleFacilitySearch } from "@/functions/users/adduser";
// import venueApi from "@/api/venue/venueApi";

// countires

export const defaultCountries: string[] = ["Canada - CA"];
// export const defaultCountries: string[] = ["Iraq - IQ", "Canada - CA"];


export const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>,
  setEmail: React.Dispatch<React.SetStateAction<string>>) => {
  const inputValue = e.target.value;
  setEmail(inputValue);
  // setIsValid(validateEmail(inputValue));
};


const handleExistingVenueSearch = async (query: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setVenues: React.Dispatch<React.SetStateAction<readVenue[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  prevVenueIDs: string[]
) => {

  // const VenueApi = new venueApi();


  setLoading(true);
  setError(null); // Reset error
  try {
    // const response = await VenueApi.FilterExistingVenues(query, prevVenueIDs); // Call the search API
    // setVenues(response?.output?.data || []); // Assuming response is structured with `venues`
  } catch (err) {
    setError('Error searching for venues');
  } finally {
    setLoading(false);
  }
};



// debounceSearch for venuess
// export const debounceVenueSearch = (
//   { searchQuery, country,
//     setLoading, setVenues, setError, prevVenueIDs }: debounceConditionalVenueSearch) => {
//   const delayDebounceFn = setTimeout(() => {
//     if (searchQuery && prevVenueIDs) {
//       handleExistingVenueSearch(searchQuery, setLoading, setVenues, setError, prevVenueIDs)
//     } else {
//       if (searchQuery) {
//         handleVenueSearch(searchQuery,country, setLoading, setVenues, setError);
//       } else {
//         setVenues([]); // Clear results if input is cleared
//       }
//     }
//   }, 300); // Wait 300ms before making the API call after typing

//   return () => clearTimeout(delayDebounceFn); // Cleanup function
// };

// debounceSearch for facilities

export const debounceFacilitySearch = (facilityQuery: string, selectedVenueArenasID: any, setFacilityLoading: React.Dispatch<SetStateAction<boolean>>, setFacilities: React.Dispatch<SetStateAction<readFacility[]>>, setFacilityError: React.Dispatch<SetStateAction<string | null>>) => {
  const delayDebounceFn = setTimeout(() => {
    if (facilityQuery) {
      // handleFacilitySearch(facilityQuery, selectedVenueArenasID, setFacilityLoading, setFacilities, setFacilityError);
    } else {
      setFacilities([]); // Clear results if input is cleared
    }
  }, 300); // Wait 300ms before making the API call after typing

  return () => clearTimeout(delayDebounceFn); // Clean up
}
