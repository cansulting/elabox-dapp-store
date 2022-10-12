import ReleaseStyle from "../../assets/css/components/app/release.module.css"
import FormStyle from "../../assets/css/form.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import { Dropdown, Form } from "react-bootstrap"
import { useEffect, useState } from "react"
import { BuildInfo, BuildList } from "../../data/buildInfo"
import { ReleaseInfo } from "../../data/releaseInfo"
import { useUtilState } from "../../states/utils"


export interface ReleaseProps {
  packageId: string
  info: ReleaseInfo
  retrieveBuilds: () => Promise<BuildList>
  onReleaseSave?: (release: ReleaseInfo) => void
}


function Release(props: ReleaseProps): JSX.Element {
  const [selectedBuild, setSelectedBuild] = useState(null)
  const [releaseDesc, setReleaseDesc] = useState("")
  const [builds, setBuilds] = useState(null as BuildList)
  const { addToast } = useUtilState()
  const handleReleaseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const newRelease : ReleaseInfo = {prod:{
      desc: releaseDesc,
      build: selectedBuild as BuildInfo,
      version: "0.0.1"
    }}
    setSelectedBuild(null)
    setReleaseDesc("")
    props.onReleaseSave(newRelease)
    addToast("Wait for few minutes before it will become available.", "Released " + props.packageId)
  }
  const handleOnSelect = (evntkey: any, evnt: Object) => {
    setSelectedBuild(builds[evntkey])
  }
  const handleDescChanged = (evnt:any) => {
    setReleaseDesc(evnt.target.value)
  }
  useEffect( () => {
      if (!builds) {
          props.retrieveBuilds().then( _builds => setBuilds(_builds))
      }
  }, [])
  return (
    <div className={ReleaseStyle["app-release"]}>
      <h2>Latest Release</h2>
      {props.info?.prod && <>
        <div className={ReleaseStyle["build"]}>
          <div className={ReleaseStyle["build-info"]}>
            <label>Build</label>
            <p>{props.info.prod.build.number}</p>
          </div>
          <div className={ReleaseStyle["build-info"]}>
            <label>Updates</label>
            <p>{props.info.prod.desc}</p>
          </div>
        </div>
        </>
      }
      {(!props.info || !props.info.prod) && <p>No Active Release</p>}

      <h2>Add New Release</h2>
      <form className={FormStyle["form"]}>
        <div
          className={`${FormStyle["form-body"]} ${FormStyle["form-body-column"]}`}
        >
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Build</label>
            <Dropdown onSelect={handleOnSelect}>
              <Dropdown.Toggle>
                { !selectedBuild && <>Select Build</>}
                { selectedBuild && <>{"Build " + selectedBuild.number + " selected"}</>}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                { builds && Object.values(builds).map( (item, index) => (
                  <Dropdown.Item eventKey={item.number}>{item.number}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Updates</label>
            <Form.Control as="textarea" onChange={handleDescChanged} value={releaseDesc} placeholder="Updates"/>
          </div>
        </div>
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost-with-border"]}>Cancel</button>
          <button
            className={ButtonStyle["primary"]}
            onClick={handleReleaseClick}
            disabled={!selectedBuild || releaseDesc === ""}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}
export default Release
