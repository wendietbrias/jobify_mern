import "./style.css";
import { FormItem } from "../../../components";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UpdateUserData } from "../../../action/auth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: auth?.user?.name,
    lastName: "Last Name",
    email: auth?.user?.email,
    location: "My Location",
  });

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(UpdateUserData({ ...formData, _id: auth?.user?._id }));
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h3>Profile</h3>
        <form onSubmit={updateHandler}>
          <FormItem
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            label="Name"
            name="name"
            element="input"
          />
          <FormItem
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            label="Last Name"
            name="lastName"
            element="input"
          />
          <FormItem
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            label="Email"
            name="email"
            element="input"
          />
          <FormItem
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, [e.target.name]: e.target.value })
            }
            label="My Location"
            name="location"
            element="input"
          />
          <button type="submit" className="save">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
