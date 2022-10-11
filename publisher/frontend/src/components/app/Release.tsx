import ReleaseStyle from "../../assets/css/components/app/release.module.css"
import FormStyle from "../../assets/css/form.module.css"
import ButtonStyle from "../../assets/css/button.module.css"
import { ReleaseProps } from "../../interfaces/release"
import { Dropdown } from "react-bootstrap"
import { useState } from "react"
function Release(props: ReleaseProps): JSX.Element {
  const [selectedBuild, setSelectedBuild] = useState(null)
  const handleReleaseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    props.onReleaseSave()
  }
  const handleOnSelect = (evntkey: any, evnt: Object) => {
    setSelectedBuild(evntkey)
  }
  return (
    <div className={ReleaseStyle["app-release"]}>
      <h2>Latest Release</h2>
      <div className={ReleaseStyle["build"]}>
        <div className={ReleaseStyle["build-info"]}>
          <label>Build</label>
          <p>1</p>
        </div>
        <div className={ReleaseStyle["build-info"]}>
          <label>Updates</label>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            delectus laborum dolorem beatae quo rem cum veritatis iusto labore,
            maiores hic, provident veniam perspiciatis laboriosam inventore
            ipsum voluptates nesciunt reprehenderit.
          </p>
        </div>
      </div>

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
                { selectedBuild && <>{"Selected Build " + selectedBuild}</>}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                { props.builds && Object.values(props.builds).map( (item, index) => (
                  <Dropdown.Item eventKey={item.number}>{item.number}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div
            className={`${FormStyle["form-body"]} ${FormStyle["form-body-full"]}`}
          >
            <label>Updates</label>
            <textarea name="updates" placeholder="updates" />
          </div>
        </div>
        <div className={`${ButtonStyle["group-flex-end"]}`}>
          <button className={ButtonStyle["ghost-with-border"]}>Cancel</button>
          <button
            className={ButtonStyle["primary"]}
            onClick={handleReleaseClick}
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  )
}
export default Release
