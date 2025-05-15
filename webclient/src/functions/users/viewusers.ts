import usersApi from "@/api/user/userApi";
// import venueApi from "@/api/venue/venueApi";
import { Member, User, Users } from "@/types/users";
import { message } from "antd";
import PhoneInput from "react-phone-input-2";

// function for the country filter
export const handleCountryFilter = async(
  e: React.ChangeEvent<HTMLSelectElement>,
  setCountry: React.Dispatch<React.SetStateAction<string>>,
  currentPage: number,
  setUsers: React.Dispatch<React.SetStateAction<User[]>>,
  setIsFilterClicked: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>

)=>{
  e.preventDefault();
  const selectedCountry = e.target.value;
  setCountry(selectedCountry);
  setIsFilterClicked(true);
  setIsLoading(true);
  const UserAPI = new usersApi();

  const output = await UserAPI.ReadUser({country: selectedCountry,  page: currentPage});
  const getusers = output?.output?.outputResponse;
  setIsLoading(false);
  setUsers(getusers);
  

}
export const getUsers = async (setUsers: React.Dispatch<React.SetStateAction<Member[]>>, setPages: React.Dispatch<React.SetStateAction<number[]>>, currentPage: number,
  shouldSetPages: boolean
) => {

  const UserAPI = new usersApi();

  const output = await UserAPI.ReadUser({ filter: {}, page: currentPage, permission: "viewUsers" })
  const getUsers = output?.output?.outputResponse;
  console.log('getusers', output);
  if (shouldSetPages && output.output.totalCount) {
    const count = Math.ceil(output.output.totalCount / 10);
    const pages = await getPages(count);
    setPages(pages);
  }
    setUsers(getUsers);
  
}

const getPages = async (count: number) => {
  let arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push(i);
  }
  return arr;
}






