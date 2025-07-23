import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({request}) => {
   const formData = await request.formData();
   const file = formData.get('avatar');
   const MAX_FILE_SIZE_BYTES = 1024 * 1024; // 1 MB
   if (file && file.size > MAX_FILE_SIZE_BYTES) {
     toast.error("Image size too large (max 1MB)");
     return null;
    }
    try {
    await customFetch.patch('/users/update-user', formData)
    toast.success('Profile updated successfully')
    
   } catch (error) {
    
  }
  return null;
};

const Profile = () => {
    const {user} = useOutletContext()
    const {name, lastName, email, location} = user
   
  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 1 mb)
            </label>
            <input
              type="file"
              className="form-input"
              id="avatar"
              accept="image/*"
              name="avatar"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          
          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
