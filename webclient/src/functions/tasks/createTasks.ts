import usersApi from "@/api/user/userApi";
import { GetMember } from "@/types/users";

export const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,
    isMemeberClicked: boolean,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!isMemeberClicked) {
      setSearchQuery(e.target.value); // Update search query state
    }
  };

  export const handleMemberClick = (member: GetMember,
    setSelectedMemberSend: React.Dispatch<React.SetStateAction<GetMember>>,
    setIsMemberClicked: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedMember: React.Dispatch<React.SetStateAction<string>>,
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setIsMemberClicked(true);
    setSelectedMember(member.name);
     const selected = {
            userID: member.userID,
            name: member.name
        }
        setSelectedMemberSend(selected);
    setSearchQuery(''); // Clear search query after selecting a venue
  }

  export const handleMemberSearch = async (
    query: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setVenues: React.Dispatch<React.SetStateAction<GetMember[]>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const UserApi = new usersApi();
  
    setLoading(true);
    setError(null); // Reset error
    try {
      // Pass both query and country to the API
      const response = await UserApi.SearchUser(query);
      
      // Assuming response is structured with `venues` in the `data`
      setVenues(response?.output?.data || []); 
    } catch (err) {
      setError('Error searching for venues');
    } finally {
      setLoading(false);
    }
  };
  