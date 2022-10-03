import { ProfileProps } from "../../interfaces/profile"
import ProfileStyle from "../../assets/css/components/app/profile.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import FormStyle from "../../assets/css/form.module.css"
function Profile(props: ProfileProps): JSX.Element {
  return (
    <div className={ProfileStyle["app-profile"]}>
      <form className={FormStyle["form"]}>
        <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Name</label>
            <input type="text" name="name" placeholder="Name" />            
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Package Id</label>
            <input type="text" name="name" placeholder="packageId" />
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Description</label>
            <textarea name="description" placeholder="Description" />          
          </div>          
        </div>
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost-with-border"]}>Cancel</button>
          <button className={ButtonStyle["primary"]}>Apply</button>
        </div>
      </form>
    </div>
  )
}

export default Profile
