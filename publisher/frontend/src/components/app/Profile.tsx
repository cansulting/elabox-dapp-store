import { ProfileProps } from "../../interfaces/profile"
import ProfileStyle from "../../assets/css/components/app/profile.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import FormStyle from "../../assets/css/form.module.css"
function Profile(props: ProfileProps): JSX.Element {
  return (
    <div className={ProfileStyle["app-profile"]}>
      <form className={FormStyle["form"]}>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name" />
        <label>Package Id</label>
        <input type="text" name="name" placeholder="packageId" />
        <label>Description</label>
        <textarea name="description" placeholder="Description" />
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost"]}>Cancel</button>
          <button className={ButtonStyle["primary"]}>Apply</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
