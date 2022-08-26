import { ProfileProps } from "../../interfaces/profile"
import ProfileStyle from "../../assets/css/components/app/profile.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
function Profile(props: ProfileProps): JSX.Element {
  return (
    <div className={ProfileStyle["app-profile"]}>
      <form>
        <label>Name</label>
        <input type="text" name="name" placeholder="Name" />
        <label>Package Id</label>
        <input type="text" name="name" placeholder="packageId" />
        <label>Description</label>
        <textarea name="name" placeholder="Description" />
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost"]}>Cancel</button>
          <button className={ButtonStyle["primary"]}>Apply</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
