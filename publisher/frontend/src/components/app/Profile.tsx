
import ProfileStyle from "../../assets/css/components/app/profile.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import FormStyle from "../../assets/css/form.module.css"
import { useEffect, useState } from "react"
import IpfsImage from '../IpfsImage'
import { PackageInfo } from "../../data/packageInfo"
import { retrieveIconPath, STORE_PATH } from "../../constants"

export interface ProfileProps {
  info: PackageInfo
  onProfileSave?: (newPkg:PackageInfo) => void
}

function Profile(props: ProfileProps): JSX.Element {
  const [updatedProfile, updateProfile] = useState(props.info)
  const [dirty, setDirty] = useState(false)
  useEffect( () => {
    if (updatedProfile.id !== props.info.id) 
      updateProfile(props.info)
  }, [props.info])
  const onUpdatedInput = (evnt:any) => {
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
  const onUploadedIcon = (ipfsCID:string) => {
    updateProfile({...updatedProfile, iconcid:ipfsCID})
    setDirty(true)
  }
  return (
    <div className={ProfileStyle["app-profile"]}>
      <form className={FormStyle["form"]}>
        <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}>
          <IpfsImage 
            hivePath={retrieveIconPath(props.info.id)}
            uploadEnable 
            width={200} 
            height={200} 
            onUploaded={onUploadedIcon}/>
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Name</label>
            <input id="name" type="text" name="name" placeholder="Name" value={updatedProfile.name} onChange={onUpdatedInput}/>            
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Package Id</label>
            <p>{updatedProfile.id}</p>
          </div>          
          <div className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}>
            <label>Description</label>
            <textarea id="desc" name="description" placeholder="Description" value={updatedProfile.desc} onChange={onUpdatedInput}/>          
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
