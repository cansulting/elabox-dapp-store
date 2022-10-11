import { ProfileProps } from "../../interfaces/profile"
import ProfileStyle from "../../assets/css/components/app/profile.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import FormStyle from "../../assets/css/form.module.css"
import { useState } from "react"
function Profile(props: ProfileProps): JSX.Element {
  const [updatedProfile, updateProfile] = useState(props.info)
  const [dirty, setDirty] = useState(false)
  const onUpdatedInput = (evnt:any) => {
    //console.log(updatedProfile)
    const key = evnt.target.id as string
    const newVal : any = {...updatedProfile}
    newVal[key] = evnt.target.value
    updateProfile(newVal)
    // was the values changed
    if (!dirty && (props.info as any)[key] !== evnt.target.value) {
      setDirty(true)
    }
  }
  const onApply = (evnt:any) => {
    evnt.preventDefault()
    if (props.onProfileSave) 
      props.onProfileSave(updatedProfile)
    setDirty(false)
  }
  return (
    <div className={ProfileStyle["app-profile"]}>
      <form className={FormStyle["form"]}>
        <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Name</label>
            <input id="name" type="text" name="name" placeholder="Name" defaultValue={updatedProfile.name} onChange={onUpdatedInput}/>            
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Package Id</label>
            <input id="id" type="text" name="name" placeholder="packageId" defaultValue={updatedProfile.id} onChange={onUpdatedInput}/>
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Description</label>
            <textarea id="desc" name="description" placeholder="Description" defaultValue={updatedProfile.desc} onChange={onUpdatedInput}/>          
          </div>          
        </div>
        {dirty && <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost-with-border"]}>Cancel</button>
          <button className={ButtonStyle["primary"]} onClick={onApply}>Apply</button>
        </div>}
      </form>
    </div>
  )
}

export default Profile
